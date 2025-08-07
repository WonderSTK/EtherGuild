import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Clock, DollarSign, User, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Web3JobPosting } from "@/components/Web3JobPosting";
import { Web3JobList } from "@/components/Web3JobList";
import { Web3ConnectionStatus } from "@/components/Web3ConnectionStatus";
import { useState } from "react";

const jobs = [
  {
    id: 1,
    title: "DeFi Protocol Smart Contract Audit",
    description: "Need comprehensive security audit for our new DeFi lending protocol. Must have experience with Solidity and security best practices. Looking for someone with proven track record in smart contract auditing.",
    budget: "15 ETH",
    timeframe: "2 weeks",
    skills: ["Solidity", "Security", "DeFi"],
    client: { name: "DecentraLend", rating: 4.8, jobs: 12 },
    proposals: 8,
    posted: "2 hours ago"
  },
  {
    id: 2,
    title: "NFT Marketplace Frontend Development",
    description: "Build a modern NFT marketplace with React and Web3 integration. Need clean UI/UX and wallet connectivity. Should support multiple wallet types and have responsive design.",
    budget: "8 ETH",
    timeframe: "3 weeks",
    skills: ["React", "Web3", "UI/UX"],
    client: { name: "ArtChain", rating: 4.9, jobs: 7 },
    proposals: 15,
    posted: "4 hours ago"
  },
  {
    id: 3,
    title: "Tokenomics Model & Whitepaper",
    description: "Design comprehensive tokenomics for new governance token including emission schedule, utility, and distribution. Need someone with economics background.",
    budget: "5 ETH",
    timeframe: "1 week",
    skills: ["Tokenomics", "Research", "Writing"],
    client: { name: "GovDAO", rating: 4.7, jobs: 23 },
    proposals: 6,
    posted: "1 day ago"
  },
  {
    id: 4,
    title: "Cross-Chain Bridge Development",
    description: "Develop secure cross-chain bridge between Ethereum and Polygon. Must implement proper security measures and gas optimization.",
    budget: "25 ETH",
    timeframe: "6 weeks",
    skills: ["Solidity", "Cross-chain", "Security"],
    client: { name: "BridgeTech", rating: 4.6, jobs: 5 },
    proposals: 12,
    posted: "6 hours ago"
  },
  {
    id: 5,
    title: "DAO Governance Interface",
    description: "Create user-friendly interface for DAO voting and proposal management. Should integrate with existing smart contracts.",
    budget: "10 ETH",
    timeframe: "4 weeks",
    skills: ["React", "DAO", "Web3"],
    client: { name: "CommunityDAO", rating: 4.8, jobs: 18 },
    proposals: 9,
    posted: "8 hours ago"
  },
  {
    id: 6,
    title: "Yield Farming Contract",
    description: "Develop yield farming smart contract with multiple reward tokens and time-locked staking options.",
    budget: "18 ETH",
    timeframe: "5 weeks",
    skills: ["Solidity", "DeFi", "Yield Farming"],
    client: { name: "FarmProtocol", rating: 4.5, jobs: 8 },
    proposals: 7,
    posted: "12 hours ago"
  }
];

const JobBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState("all");

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Web3 Job Board
          </h1>
          <p className="text-muted-foreground">Discover opportunities on the blockchain and traditional Web3 jobs</p>
        </div>

        <Tabs defaultValue="blockchain" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="blockchain">Blockchain Jobs</TabsTrigger>
            <TabsTrigger value="traditional">Traditional Jobs</TabsTrigger>
            <TabsTrigger value="post">Post Job</TabsTrigger>
          </TabsList>
          
          <TabsContent value="blockchain" className="mt-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Web3JobList />
              </div>
              <div>
                <Web3ConnectionStatus />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="traditional" className="mt-8">
            {/* Search and Filters */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search jobs, skills, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="audit">Security Audit</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Budget Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Budgets</SelectItem>
                    <SelectItem value="low">1-5 ETH</SelectItem>
                    <SelectItem value="medium">5-15 ETH</SelectItem>
                    <SelectItem value="high">15+ ETH</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Job Listings */}
            <div className="grid gap-6">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="bg-card/50 border border-border backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-elevated">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-semibold mb-2">{job.title}</CardTitle>
                        <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground ml-4">
                        <User className="w-4 h-4" />
                        {job.proposals}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-accent" />
                        <span className="font-medium text-accent">{job.budget}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.timeframe}
                      </div>
                      <span className="text-xs">Posted {job.posted}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {job.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-sm font-bold">
                          {job.client.name[0]}
                        </div>
                        <div>
                          <div className="font-medium">{job.client.name}</div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="w-3 h-3 fill-accent text-accent" />
                            {job.client.rating} ({job.client.jobs} jobs)
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button variant="surface" size="sm">
                          View Details
                        </Button>
                        <Button variant="hero" size="sm">
                          Submit Proposal
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="post" className="mt-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Web3JobPosting />
              </div>
              <div>
                <Web3ConnectionStatus />
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