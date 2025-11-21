
import React, { useState, useEffect, useMemo } from 'react'
import { useAccount } from 'wagmi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast'
import { useJobBoardContract, useJob, useReputation, Job, Reputation } from '@/hooks/useJobBoardContract'
import { Search, DollarSign, Star } from 'lucide-react'
import { formatEther } from 'viem'

interface Web3JobCardProps {
  job: Job
}

function Web3JobCard({ job }: Web3JobCardProps) {
  const { address } = useAccount()
  const { closeJob, assignFreelancer, leaveReview, isLoading } = useJobBoardContract()
  const { toast } = useToast()

  const [showAssignFreelancerDialog, setShowAssignFreelancerDialog] = useState(false)
  const [freelancerAddress, setFreelancerAddress] = useState('')
  const [showLeaveReviewDialog, setShowLeaveReviewDialog] = useState(false)
  const [reviewScore, setReviewScore] = useState('')

  const { id, poster, freelancer, title, description, payment, isOpen } = job

  const isOwner = address?.toLowerCase() === poster.toLowerCase()
  const isFreelancerAssigned = freelancer !== '0x0000000000000000000000000000000000000000'

  const { data: freelancerReputation } = useReputation(freelancer);

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

  const handleAssignFreelancer = async () => {
    if (!freelancerAddress) {
      toast({ title: "Error", description: "Freelancer address cannot be empty.", variant: "destructive" });
      return;
    }
    try {
      await assignFreelancer(Number(id), freelancerAddress);
      toast({ title: "Success", description: "Freelancer assigned successfully." });
      setShowAssignFreelancerDialog(false);
      setFreelancerAddress('');
    } catch (error) {
      toast({ title: "Error", description: "Failed to assign freelancer.", variant: "destructive" });
      console.error('Error assigning freelancer:', error);
    }
  }

  const handleLeaveReview = async () => {
    const score = parseInt(reviewScore);
    if (isNaN(score) || score < 1 || score > 5) {
      toast({ title: "Error", description: "Score must be between 1 and 5.", variant: "destructive" });
      return;
    }
    try {
      await leaveReview(Number(id), score);
      toast({ title: "Success", description: "Review submitted successfully." });
      setShowLeaveReviewDialog(false);
      setReviewScore('');
    } catch (error) {
      toast({ title: "Error", description: "Failed to submit review.", variant: "destructive" });
      console.error('Error submitting review:', error);
    }
  }

  const averageRating = useMemo(() => {
    if (freelancerReputation && Number(freelancerReputation.reviewCount) > 0) {
      return (Number(freelancerReputation.totalScore) / Number(freelancerReputation.reviewCount)).toFixed(1);
    }
    return 'N/A';
  }, [freelancerReputation]);


  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>
              Posted by: {poster.slice(0, 6)}...{poster.slice(-4)}
            </CardDescription>
            {isFreelancerAssigned && (
              <CardDescription>
                Freelancer: {freelancer.slice(0, 6)}...{freelancer.slice(-4)}
                {freelancerReputation && Number(freelancerReputation.reviewCount) > 0 && (
                  <span className="ml-2 flex items-center text-yellow-500">
                    <Star className="w-3 h-3 fill-yellow-500 mr-1" /> {averageRating} ({Number(freelancerReputation.reviewCount)} reviews)
                  </span>
                )}
              </CardDescription>
            )}
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
        <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-4 h-4 text-green-500" />
            <span className="text-md font-bold text-green-500">{formatEther(payment)} ETH</span>
        </div>
        
        {isOwner && isOpen && !isFreelancerAssigned && (
          <AlertDialog open={showAssignFreelancerDialog} onOpenChange={setShowAssignFreelancerDialog}>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="w-full mb-2">Assign Freelancer</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Assign Freelancer to Job #{Number(id)}</AlertDialogTitle>
                <AlertDialogDescription>
                  Enter the wallet address of the freelancer you wish to assign to this job.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Input 
                placeholder="0x..." 
                value={freelancerAddress} 
                onChange={(e) => setFreelancerAddress(e.target.value)} 
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleAssignFreelancer} disabled={isLoading}>
                  {isLoading ? 'Assigning...' : 'Assign'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        {isOwner && isOpen && (
          <Button 
            variant="outline" 
            onClick={handleCloseJob}
            disabled={isLoading}
            className="w-full mb-2"
          >
            {isLoading ? 'Closing Job...' : 'Close Job'}
          </Button>
        )}

        {isOwner && !isOpen && isFreelancerAssigned && (
            <AlertDialog open={showLeaveReviewDialog} onOpenChange={setShowLeaveReviewDialog}>
                <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full mb-2">Leave Review</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Leave Review for Job #{Number(id)}</AlertDialogTitle>
                    <AlertDialogDescription>
                    Enter a score for the freelancer (1-5).
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Input
                    placeholder="Score (1-5)"
                    type="number"
                    min="1"
                    max="5"
                    value={reviewScore}
                    onChange={(e) => setReviewScore(e.target.value)}
                />
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLeaveReview} disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit Review'}
                    </AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
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

function JobFetcher({ jobId, onJobFetched }: { jobId: number, onJobFetched: (job: Job) => void }) {
  const { data: jobData } = useJob(jobId);

  useEffect(() => {
    if (jobData) {
      onJobFetched(jobData as Job);
    }
  }, [jobData, onJobFetched]);

  return null;
}

export function Web3JobList() {
  const { nextJobId } = useJobBoardContract()
  const [jobs, setJobs] = useState<Job[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const handleJobFetched = (job: Job) => {
    setJobs(prevJobs => {
      // Avoid duplicates and replace if job already exists (e.g., status changed)
      const existingJobIndex = prevJobs.findIndex(j => j.id === job.id);
      if (existingJobIndex > -1) {
        const updatedJobs = [...prevJobs];
        updatedJobs[existingJobIndex] = job;
        return updatedJobs;
      }
      return [...prevJobs, job];
    });
  };

  const jobIds = useMemo(() => {
    const ids: number[] = [];
    for (let i = 0; i < nextJobId; i++) {
        ids.push(i);
    }
    return ids;
  }, [nextJobId]);

  const filteredJobs = useMemo(() => {
    return jobs
      .filter(job => {
        if (statusFilter === 'all') return true
        return statusFilter === 'open' ? job.isOpen : !job.isOpen
      })
      .filter(job => {
        const search = searchTerm.toLowerCase()
        return (
          job.title.toLowerCase().includes(search) ||
          job.description.toLowerCase().includes(search)
        )
      })
      .sort((a, b) => Number(b.id) - Number(a.id));
  }, [jobs, searchTerm, statusFilter])


  return (
    <div className="space-y-6">
        {jobIds.map(id => (
            <JobFetcher key={id} jobId={id} onJobFetched={handleJobFetched} />
        ))}
      <div>
        <h2 className="text-2xl font-bold mb-2">Web3 Job Board</h2>
        <p className="text-muted-foreground">
          Jobs posted on the blockchain • Total Jobs: {nextJobId}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {filteredJobs.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No jobs found matching your criteria.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredJobs.map((job) => (
            <Web3JobCard key={Number(job.id)} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}
