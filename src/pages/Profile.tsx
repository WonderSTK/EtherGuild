import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, MapPin, Calendar, Star, TrendingUp, Wallet, ExternalLink, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data (in real app, this would come from Web3 wallet/IPFS)
  const user = {
    address: "0x742d35Cc6633C0532925a3b8D4852f4A8CC0C5A0",
    name: "Sarah Rodriguez",
    title: "Full-Stack Web3 Developer",
    location: "Barcelona, Spain",
    joinDate: "March 2023",
    bio: "Passionate Web3 developer with 5+ years of experience building decentralized applications. Specialized in React, Solidity, and creating seamless user experiences for complex DeFi protocols.",
    skills: ["React", "TypeScript", "Solidity", "Node.js", "Web3.js", "DeFi", "Smart Contracts", "IPFS"],
    hourlyRate: "0.05 ETH/hr",
    availability: "Available",
    stats: {
      jobsCompleted: 47,
      totalEarned: "234.5 ETH",
      rating: 4.9,
      responseTime: "< 1 hour"
    }
  };

  const recentJobs = [
    {
      id: 1,
      title: "DeFi Dashboard Frontend",
      client: "DeFiProtocol",
      earnings: "15 ETH",
      rating: 5,
      date: "Dec 2024",
      status: "Completed"
    },
    {
      id: 2,
      title: "NFT Marketplace Integration",
      client: "ArtChain",
      earnings: "8.5 ETH",
      rating: 5,
      date: "Nov 2024",
      status: "Completed"
    },
    {
      id: 3,
      title: "Smart Contract Audit UI",
      client: "SecureDAO",
      earnings: "12 ETH",
      rating: 4,
      date: "Oct 2024",
      status: "Completed"
    }
  ];

  const reviews = [
    {
      id: 1,
      client: "DeFiProtocol",
      rating: 5,
      comment: "Outstanding work on our dashboard. Sarah delivered exactly what we needed with excellent communication throughout the project.",
      date: "December 2024"
    },
    {
      id: 2,
      client: "ArtChain",
      rating: 5,
      comment: "Amazing developer! The NFT marketplace integration was flawless and delivered ahead of schedule. Highly recommend!",
      date: "November 2024"
    },
    {
      id: 3,
      client: "SecureDAO",
      rating: 4,
      comment: "Great attention to detail and clean code. The UI for our audit tool turned out beautiful and user-friendly.",
      date: "October 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card className="bg-card/50 border border-border backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="text-2xl font-bold">SR</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="surface"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {isEditing ? (
                    <Input defaultValue={user.name} className="font-bold text-lg" />
                  ) : (
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                  )}
                  
                  {isEditing ? (
                    <Input defaultValue={user.title} />
                  ) : (
                    <p className="text-muted-foreground">{user.title}</p>
                  )}
                </div>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Wallet className="w-4 h-4" />
                    <span className="font-mono">{user.address.slice(0, 6)}...{user.address.slice(-4)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {user.joinDate}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Bio</h3>
                    {isEditing ? (
                      <Textarea defaultValue={user.bio} rows={4} />
                    ) : (
                      <p className="text-sm text-muted-foreground">{user.bio}</p>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Rate & Availability</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Hourly Rate:</span>
                        <span className="font-medium text-accent">{user.hourlyRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <Badge variant="default" className="text-xs">
                          {user.availability}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-2">
                      <Button className="flex-1" onClick={() => setIsEditing(false)}>
                        Save Changes
                      </Button>
                      <Button variant="surface" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="bg-card/50 border border-border backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{user.stats.jobsCompleted}</div>
                    <div className="text-xs text-muted-foreground">Jobs Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">{user.stats.totalEarned}</div>
                    <div className="text-xs text-muted-foreground">Total Earned</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-500">{user.stats.rating}</div>
                    <div className="text-xs text-muted-foreground">Avg Rating</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500">{user.stats.responseTime}</div>
                    <div className="text-xs text-muted-foreground">Response Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="jobs" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="jobs">Recent Jobs</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              </TabsList>
              
              <TabsContent value="jobs" className="mt-6">
                <div className="space-y-4">
                  {recentJobs.map((job) => (
                    <Card key={job.id} className="bg-card/50 border border-border backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{job.title}</CardTitle>
                            <p className="text-muted-foreground">Client: {job.client}</p>
                          </div>
                          <Badge 
                            variant={job.status === 'Completed' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {job.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <span className="font-medium text-accent">{job.earnings}</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{job.rating}</span>
                            </div>
                            <span className="text-muted-foreground">{job.date}</span>
                          </div>
                          <Button variant="surface" size="sm">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id} className="bg-card/50 border border-border backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{review.client}</CardTitle>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                              <span className="ml-2 text-sm text-muted-foreground">{review.date}</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground italic">"{review.comment}"</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="portfolio" className="mt-6">
                <Card className="bg-card/50 border border-border backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Portfolio Coming Soon</h3>
                    <p className="text-muted-foreground mb-4">
                      Showcase your best work and projects to attract more clients.
                    </p>
                    <Button variant="surface">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Add Portfolio Items
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
