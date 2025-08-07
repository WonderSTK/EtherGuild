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
      }
    ],
    "name": "JobPosted",
    "type": "event"
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
        "internalType": "bool",
        "name": "isOpen",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
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
      }
    ],
    "name": "postJob",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

// Contract address from deployment (you can update this)
const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

export interface Job {
  id: bigint
  poster: string
  title: string
  description: string
  isOpen: boolean
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
  const postJob = useCallback(async (title: string, description: string) => {
    if (!address) throw new Error('Wallet not connected')
    
    setIsLoading(true)
    try {
      writeContract({
          address: CONTRACT_ADDRESS,
          abi: JOB_BOARD_ABI,
          functionName: 'postJob',
          args: [title, description],
          chain: undefined,
          account: address
      })
    } catch (error) {
      console.error('Error posting job:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [address, writeContract])

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

  return {
    postJob,
    closeJob,
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
