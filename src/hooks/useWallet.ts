import { useState, useCallback, useEffect } from 'react'
import { useAccount, useDisconnect, useEnsName } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'

export function useWallet() {
  const { address, isConnected, isConnecting: wagmiIsConnecting } = useAccount()
  const { open } = useWeb3Modal()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const [isActivelyConnecting, setIsActivelyConnecting] = useState(false)

  const connect = useCallback(async () => {
    setIsActivelyConnecting(true)
    try {
      await open()
    } catch (error) {
      console.error('Failed to open connect modal:', error)
      setIsActivelyConnecting(false)
    }
  }, [open])

  // Clear active connecting state when account becomes connected
  useEffect(() => {
    if (isConnected) {
      setIsActivelyConnecting(false)
    }
  }, [isConnected])

  // Clear active connecting state if wagmi stops connecting and we aren't connected
  // This helps handle modal cancellations if wagmi reflects them
  useEffect(() => {
    if (!wagmiIsConnecting && !isConnected && isActivelyConnecting) {
      const timer = setTimeout(() => setIsActivelyConnecting(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [wagmiIsConnecting, isConnected, isActivelyConnecting])

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const displayName = ensName || (address ? formatAddress(address) : '')

  return {
    address,
    isConnected,
    isConnecting: isActivelyConnecting || (wagmiIsConnecting && isActivelyConnecting),
    connect,
    disconnect,
    displayName,
    ensName
  }
}