import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet, polygon, sepolia } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal } from '@web3modal/wagmi/react'

const localhost = {
  id: 31_337,
  name: 'Localhost',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
  },
} as const

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID   

const metadata = {
  name: 'EtherGuild',
  description: 'Decentralized Freelancing Platform',
  url: 'https://ether-guild.vercel.app/', 
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [localhost, mainnet, sepolia, polygon, arbitrum] as const
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, 
  enableOnramp: true 
})

const queryClient = new QueryClient()

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config} reconnectOnMount={false}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}