import { useState, useCallback } from 'react'
import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi'

// SimpleJobBoard contract ABI (extracted from artifacts)
const JOB_BOARD_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "JobClosed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "poster",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "payment",
        "type": "uint256"
      }
    ],
    "name": "JobPosted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "freelancer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "score",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newTotalScore",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newReviewCount",
        "type": "uint256"
      }
    ],
    "name": "ReviewSubmitted",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "jobId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "freelancer",
        "type": "address"
      }
    ],
    "name": "assignFreelancer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "jobId",
        "type": "uint256"
      }
    ],
    "name": "closeJob",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "jobId",
        "type": "uint256"
      }
    ],
    "name": "getJob",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "poster",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "freelancer",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "payment",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isOpen",
            "type": "bool"
          }
        ],
        "internalType": "struct SimpleJobBoard.Job",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getReputation",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "totalScore",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "reviewCount",
            "type": "uint256"
          }
        ],
        "internalType": "struct SimpleJobBoard.Reputation",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "jobs",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "poster",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "freelancer",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "payment",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isOpen",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "jobId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "score",
        "type": "uint256"
      }
    ],
    "name": "leaveReview",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextJobId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "payment",
        "type": "uint256"
      }
    ],
    "name": "postJob",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "reputations",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "totalScore",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "reviewCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// Contract address from deployment (you can update this)
const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

export interface Job {
  id: bigint
  poster: string
  freelancer: string // New field
  title: string
  description: string
  payment: bigint // New field
  isOpen: boolean
}

export interface Reputation {
  totalScore: bigint;
  reviewCount: bigint;
}

export function useJobBoardContract() {
  const { address } = useAccount()
  const [isLoading, setIsLoading] = useState(false)

  // Write contract functions
  const { writeContract, data: hash, isPending } = useWriteContract()
  
  // Wait for transaction confirmation
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  // Read next job ID
  const { data: nextJobId } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: JOB_BOARD_ABI,
    functionName: 'nextJobId',
  })

  // Post a new job
  const postJob = useCallback(async (title: string, description: string, payment: bigint) => {
    if (!address) throw new Error('Wallet not connected')
    
    setIsLoading(true)
    try {
      writeContract({
          address: CONTRACT_ADDRESS,
          abi: JOB_BOARD_ABI,
          functionName: 'postJob',
          args: [title, description, payment],
          chain: undefined,
          account: address,
          value: payment,
      })
    } catch (error) {
      console.error('Error posting job:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [address, writeContract])

  // Assign a freelancer to a job
  const assignFreelancer = useCallback(async (jobId: number, freelancerAddress: string) => {
    if (!address) throw new Error('Wallet not connected');

    setIsLoading(true);
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: JOB_BOARD_ABI,
        functionName: 'assignFreelancer',
        args: [BigInt(jobId), freelancerAddress],
        chain: undefined,
        account: address,
      });
    } catch (error) {
      console.error('Error assigning freelancer:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [address, writeContract]);

  // Close a job
  const closeJob = useCallback(async (jobId: number) => {
    if (!address) throw new Error('Wallet not connected')
    
    setIsLoading(true)
    try {
      writeContract({
          address: CONTRACT_ADDRESS,
          abi: JOB_BOARD_ABI,
          functionName: 'closeJob',
          args: [BigInt(jobId)],
          chain: undefined,
          account: address
      })
    } catch (error) {
      console.error('Error closing job:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [address, writeContract])

  // Leave a review
  const leaveReview = useCallback(async (jobId: number, score: number) => {
    if (!address) throw new Error('Wallet not connected');

    setIsLoading(true);
    try {
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: JOB_BOARD_ABI,
        functionName: 'leaveReview',
        args: [BigInt(jobId), BigInt(score)],
        chain: undefined,
        account: address,
      });
    } catch (error) {
      console.error('Error leaving review:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [address, writeContract]);

  return {
    postJob,
    assignFreelancer,
    closeJob,
    leaveReview,
    nextJobId: nextJobId ? Number(nextJobId) : 0,
    isLoading: isLoading || isPending || isConfirming,
    isSuccess,
    contractAddress: CONTRACT_ADDRESS,
    abi: JOB_BOARD_ABI,
  }
}

// Hook to get a specific job
export function useJob(jobId: number) {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: JOB_BOARD_ABI,
    functionName: 'getJob',
    args: [BigInt(jobId)],
  })
}

// Hook to get a user's reputation
export function useReputation(userAddress: string) {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: JOB_BOARD_ABI,
    functionName: 'getReputation',
    args: [userAddress],
  })
}