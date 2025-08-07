import React from 'react'
import { useAccount } from 'wagmi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { useJobBoardContract, useJob } from '@/hooks/useJobBoardContract'

interface Web3JobCardProps {
  jobId: number
}

function Web3JobCard({ jobId }: Web3JobCardProps) {
  const { address } = useAccount()
  const { closeJob, isLoading } = useJobBoardContract()
  const { toast } = useToast()
  const { data: jobData } = useJob(jobId)

  if (!jobData) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const { id, poster, title, description, isOpen } = jobData

  const handleCloseJob = async () => {
    try {
      await closeJob(Number(id))
      toast({
        title: "Job closed successfully!",
        description: "The job has been marked as closed on the blockchain.",
      })
    } catch (error) {
      toast({
        title: "Error closing job",
        description: "There was an error closing the job. Please try again.",
        variant: "destructive",
      })
      console.error('Error closing job:', error)
    }
  }

  const isOwner = address?.toLowerCase() === poster.toLowerCase()

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>
              Posted by: {poster.slice(0, 6)}...{poster.slice(-4)}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant={isOpen ? "default" : "secondary"}>
              {isOpen ? "Open" : "Closed"}
            </Badge>
            <Badge variant="outline">#{Number(id)}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        
        {isOwner && isOpen && (
          <Button 
            variant="outline" 
            onClick={handleCloseJob}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Closing Job...' : 'Close Job'}
          </Button>
        )}
        
        {!isOwner && isOpen && (
          <Button className="w-full">
            Apply for Job
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

interface Web3JobListProps {
  maxJobs?: number
}

export function Web3JobList({ maxJobs = 10 }: Web3JobListProps) {
  const { nextJobId } = useJobBoardContract()
  
  const jobIds = Array.from(
    { length: Math.min(nextJobId, maxJobs) }, 
    (_, i) => nextJobId - 1 - i
  ).filter(id => id >= 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Web3 Job Board</h2>
        <p className="text-muted-foreground">
          Jobs posted on the blockchain • Total Jobs: {nextJobId}
        </p>
      </div>
      
      {jobIds.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No jobs posted yet. Be the first to post a job!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {jobIds.map((jobId) => (
            <Web3JobCard key={jobId} jobId={jobId} />
          ))}
        </div>
      )}
    </div>
  )
}
