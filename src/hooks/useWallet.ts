import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'

export function useWallet() {
  const { address, isConnected, isConnecting } = useAccount()
  const { open } = useWeb3Modal()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })

  const connect = () => {
    open()
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const displayName = ensName || (address ? formatAddress(address) : '')

  return {
    address,
    isConnected,
    isConnecting,
    connect,
    disconnect,
    displayName,
    ensName
  }
}