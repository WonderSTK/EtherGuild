import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWallet } from "@/hooks/useWallet";
import { Briefcase, User, Star, Clock, DollarSign } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const { isConnected, displayName } = useWallet();

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Connect Your Wallet</h1>
            <p className="text-xl text-muted-foreground mb-8">You need to connect your wallet to access the dashboard</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const activeJobs = [
    {
      id: 1,
      title: "Smart Contract Development",
      client: "DeFiCorp",
      budget: "12 ETH",
      deadline: "5 days",
      status: "In Progress"
    },
    {
      id: 2,
      title: "Frontend Development",
      client: "CryptoStartup",
      budget: "8 ETH",
      deadline: "2 weeks",
      status: "Pending Review"
    }
  ];

  const completedJobs = [
    {
      id: 3,
      title: "Token Contract Audit",
      client: "SafeDAO",
      budget: "15 ETH",
      completed: "2 days ago",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {displayName}</h1>
          <p className="text-muted-foreground">Manage your freelancing activities</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Active Jobs</TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">2</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">45.2 ETH</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.9 ⭐</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">27</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm">Submitted proposal for "NFT Marketplace"</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Milestone completed for DeFiCorp</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm">Received 5⭐ rating from SafeDAO</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Escrows</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">DeFiCorp Contract</span>
                    <Badge variant="secondary">6 ETH locked</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">CryptoStartup UI</span>
                    <Badge variant="secondary">4 ETH locked</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Active Jobs</h3>
              {activeJobs.map((job) => (
                <Card key={job.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">Client: {job.client}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-accent" />
                            <span className="text-sm">{job.budget}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{job.deadline}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-primary/10 text-primary">{job.status}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="proposals" className="space-y-6">
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Active Proposals</h3>
              <p className="text-muted-foreground mb-4">Browse jobs to submit your first proposal</p>
              <Button variant="hero">Browse Jobs</Button>
            </div>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-accent mb-2">45.2 ETH</div>
                <p className="text-muted-foreground">Total earnings across all completed jobs</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;