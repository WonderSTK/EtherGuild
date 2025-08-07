import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function SimpleWeb3Status() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Web3 Connection</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Web3 functionality is being loaded...
        </p>
        <Badge variant="outline">Testing Mode</Badge>
        <div className="mt-4">
          <Button variant="outline">
            Connect Wallet
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
