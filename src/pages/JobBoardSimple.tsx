import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Web3ConnectionStatus } from "@/components/Web3ConnectionStatus";
import { SimpleWeb3Status } from "@/components/SimpleWeb3Status";

const JobBoard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Web3 Job Board
          </h1>
          <p className="text-muted-foreground">Test Web3 integration</p>
        </div>
        
        <Tabs defaultValue="test" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="test">Test</TabsTrigger>
            <TabsTrigger value="web3">Web3 Status</TabsTrigger>
          </TabsList>
          
          <TabsContent value="test" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Test Page</CardTitle>
              </CardHeader>
              <CardContent>
                <p>This is a test page to check basic functionality.</p>
                <Button className="mt-4">Test Button</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="web3" className="mt-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Web3 Test</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Testing Web3 components...</p>
                  </CardContent>
                </Card>
              </div>
              <div>
                <SimpleWeb3Status />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default JobBoard;
