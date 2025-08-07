import React from 'react'
import { useAccount, useDisconnect, useEnsName } from 'wagmi'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function Web3ConnectionStatus() {
  const { address, isConnected, chain } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { disconnect } = useDisconnect()

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Web3 Connection</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Connect your wallet to interact with the job board smart contract.
          </p>
          <w3m-button />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Web3 Connection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium">Connected Wallet</p>
          <p className="text-sm text-muted-foreground">
            {ensName ? `${ensName} (${address?.slice(0, 6)}...${address?.slice(-4)})` : `${address?.slice(0, 6)}...${address?.slice(-4)}`}
          </p>
        </div>
        
        <div>
          <p className="text-sm font-medium">Network</p>
          <div className="flex items-center gap-2">
            <Badge variant={chain?.id === 31337 ? "default" : "secondary"}>
              {chain?.name || 'Unknown'}
            </Badge>
            {chain?.id === 31337 && (
              <Badge variant="outline">Local Development</Badge>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <w3m-button />
          <Button variant="outline" onClick={() => disconnect()}>
            Disconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
