import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { useJobBoardContract } from '@/hooks/useJobBoardContract'
import { parseEther } from 'viem'

export function Web3JobPosting() {
  const { address, isConnected } = useAccount()
  const { postJob, isLoading } = useJobBoardContract()
  const { toast } = useToast()
  
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [payment, setPayment] = useState('') // Payment in ETH

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to post a job.",
        variant: "destructive",
      })
      return
    }

    if (!title.trim() || !description.trim() || !payment.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in title, description, and payment.",
        variant: "destructive",
      })
      return
    }

    const paymentInWei = parseEther(payment)

    try {
      await postJob(title, description, paymentInWei)
      toast({
        title: "Job posted successfully!",
        description: "Your job has been posted to the blockchain.",
      })
      setTitle('')
      setDescription('')
      setPayment('')
    } catch (error) {
      toast({
        title: "Error posting job",
        description: "There was an error posting your job. Please try again.",
        variant: "destructive",
      })
      console.error('Error posting job:', error)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Post a Web3 Job</CardTitle>
        <CardDescription>
          {isConnected 
            ? `Connected: ${address?.slice(0, 6)}...${address?.slice(-4)}`
            : 'Connect your wallet to post jobs on the blockchain'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="job-title">Job Title</Label>
            <Input
              id="job-title"
              placeholder="e.g. Senior Solidity Developer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={!isConnected || isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="job-description">Job Description</Label>
            <Textarea
              id="job-description"
              placeholder="Describe the job requirements, responsibilities, and compensation..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={!isConnected || isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="job-payment">Payment (in ETH)</Label>
            <Input
              id="job-payment"
              placeholder="e.g. 0.5"
              type="number"
              step="0.01"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              disabled={!isConnected || isLoading}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={!isConnected || isLoading}
          >
            {isLoading 
              ? 'Posting Job...' 
              : isConnected 
                ? 'Post Job to Blockchain' 
                : 'Connect Wallet to Post Job'
            }
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}