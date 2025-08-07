import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star, MapPin, Clock, Verified, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

const talents = [
  {
    id: 1,
    name: "Alex Chen",
    title: "Senior Smart Contract Developer",
    description: "Experienced Solidity developer with 5+ years in DeFi protocols. Built and audited $100M+ TVL contracts.",
    hourlyRate: "0.08 ETH/hr",
    location: "Singapore",
    availability: "Available",
    skills: ["Solidity", "DeFi", "Security Auditing", "Hardhat"],
    rating: 4.9,
    completedJobs: 47,
    totalEarned: "234 ETH",
    verified: true,
    profileImage: "AC"
  },
  {
    id: 2,
    name: "Sarah Rodriguez",
    title: "Frontend Web3 Developer",
    description: "React specialist with deep Web3 integration expertise. Created 20+ dApp frontends with seamless UX.",
    hourlyRate: "0.05 ETH/hr",
    location: "Barcelona, Spain",
    availability: "Available",
    skills: ["React", "TypeScript", "Web3.js", "Wagmi"],
    rating: 4.8,
    completedJobs: 32,
    totalEarned: "89 ETH",
    verified: true,
    profileImage: "SR"
  },
  {
    id: 3,
    name: "Marcus Johnson",
    title: "Blockchain Security Auditor",
    description: "Certified security researcher specializing in smart contract audits. Found 500+ vulnerabilities across various protocols.",
    hourlyRate: "0.12 ETH/hr",
    location: "Austin, TX",
    availability: "Busy until Jan 15",
    skills: ["Security", "Auditing", "Formal Verification", "Slither"],
    rating: 5.0,
    completedJobs: 28,
    totalEarned: "156 ETH",
    verified: true,
    profileImage: "MJ"
  },
  {
    id: 4,
    name: "Elena Petrov",
    title: "Tokenomics Designer",
    description: "Economist turned crypto expert. Designed tokenomics for 15+ successful projects with combined market cap of $2B+.",
    hourlyRate: "0.07 ETH/hr",
    location: "Berlin, Germany",
    availability: "Available",
    skills: ["Tokenomics", "Game Theory", "Economics", "Research"],
    rating: 4.7,
    completedJobs: 19,
    totalEarned: "67 ETH",
    verified: true,
    profileImage: "EP"
  },
  {
    id: 5,
    name: "Raj Patel",
    title: "Full-Stack Blockchain Developer",
    description: "End-to-end blockchain solutions architect. Built complete dApp ecosystems from smart contracts to mobile apps.",
    hourlyRate: "0.06 ETH/hr",
    location: "Mumbai, India",
    availability: "Available",
    skills: ["Solidity", "Node.js", "React Native", "IPFS"],
    rating: 4.6,
    completedJobs: 41,
    totalEarned: "123 ETH",
    verified: false,
    profileImage: "RP"
  }
];

const FindTalent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("all");
  const [selectedAvailability, setSelectedAvailability] = useState("all");

  const filteredTalents = talents.filter(talent => {
    const matchesSearch = talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         talent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         talent.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesAvailability = selectedAvailability === "all" || 
                               (selectedAvailability === "available" && talent.availability === "Available") ||
                               (selectedAvailability === "busy" && talent.availability !== "Available");
    
    return matchesSearch && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Find Web3 Talent
          </h1>
          <p className="text-muted-foreground">Discover top blockchain developers, designers, and experts from around the world</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, title, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSkill} onValueChange={setSelectedSkill}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Skill" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Skills</SelectItem>
                <SelectItem value="solidity">Solidity</SelectItem>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="defi">DeFi</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="available">Available Now</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Talent Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTalents.map((talent) => (
            <Card key={talent.id} className="bg-card/50 border border-border backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-elevated">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-lg font-bold">
                      {talent.profileImage}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{talent.name}</CardTitle>
                        {talent.verified && <Verified className="w-4 h-4 text-accent" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{talent.title}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    {talent.rating} ({talent.completedJobs} jobs)
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {talent.location}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className={`text-sm ${talent.availability === 'Available' ? 'text-accent' : 'text-orange-500'}`}>
                    {talent.availability}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {talent.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {talent.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {talent.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{talent.skills.length - 3} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-lg font-bold text-accent">{talent.hourlyRate}</div>
                    <div className="text-xs text-muted-foreground">Total earned: {talent.totalEarned}</div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="surface" size="sm" className="flex-1">
                    View Profile
                  </Button>
                  <Button variant="hero" size="sm" className="flex-1">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Hire
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTalents.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No talent found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default FindTalent;
