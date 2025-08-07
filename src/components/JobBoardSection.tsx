import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, User, Star } from "lucide-react";

const sampleJobs = [
  {
    id: 1,
    title: "DeFi Protocol Smart Contract Audit",
    description: "Need comprehensive security audit for our new DeFi lending protocol. Must have experience with Solidity and security best practices.",
    budget: "15 ETH",
    timeframe: "2 weeks",
    skills: ["Solidity", "Security", "DeFi"],
    client: {
      name: "DecentraLend",
      rating: 4.8,
      jobs: 12
    },
    proposals: 8
  },
  {
    id: 2,
    title: "NFT Marketplace Frontend Development",
    description: "Build a modern NFT marketplace with React and Web3 integration. Need clean UI/UX and wallet connectivity.",
    budget: "8 ETH",
    timeframe: "3 weeks",
    skills: ["React", "Web3", "UI/UX"],
    client: {
      name: "ArtChain",
      rating: 4.9,
      jobs: 7
    },
    proposals: 15
  },
  {
    id: 3,
    title: "Tokenomics Model & Whitepaper",
    description: "Design comprehensive tokenomics for new governance token including emission schedule, utility, and distribution.",
    budget: "5 ETH",
    timeframe: "1 week",
    skills: ["Tokenomics", "Research", "Writing"],
    client: {
      name: "GovDAO",
      rating: 4.7,
      jobs: 23
    },
    proposals: 6
  }
];

const JobBoard = () => {
  return (
    <section className="py-20 bg-gradient-surface">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Latest Opportunities
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover high-quality Web3 projects from verified clients worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sampleJobs.map((job) => (
            <Card key={job.id} className="bg-card/50 border border-border backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-elevated">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <CardTitle className="text-lg font-semibold leading-tight">{job.title}</CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    {job.proposals}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-accent" />
                    <span className="font-medium text-accent">{job.budget}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {job.timeframe}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {job.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-xs font-bold">
                      {job.client.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{job.client.name}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="w-3 h-3 fill-accent text-accent" />
                        {job.client.rating} ({job.client.jobs} jobs)
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="surface" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg">
            Browse All Jobs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobBoard;