import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Users, Calendar, ExternalLink, TrendingUp, Award, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const communityStats = [
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Active Members",
    value: "12,847",
    growth: "+23% this month"
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-accent" />,
    title: "Jobs Completed",
    value: "3,429",
    growth: "2,847 ETH paid"
  },
  {
    icon: <Award className="w-8 h-8 text-purple-500" />,
    title: "Top Rated",
    value: "847",
    growth: "5-star freelancers"
  },
  {
    icon: <Zap className="w-8 h-8 text-orange-500" />,
    title: "Countries",
    value: "84",
    growth: "Global reach"
  }
];

const discussions = [
  {
    id: 1,
    title: "Best practices for smart contract auditing in 2025",
    author: "AlexSecure",
    avatar: "AS",
    category: "Security",
    replies: 34,
    likes: 127,
    timeAgo: "2 hours ago",
    isHot: true
  },
  {
    id: 2,
    title: "How to price your Web3 development services",
    author: "DevMaster",
    avatar: "DM",
    category: "Career",
    replies: 23,
    likes: 89,
    timeAgo: "5 hours ago",
    isHot: false
  },
  {
    id: 3,
    title: "Layer 2 solutions comparison: Polygon vs Arbitrum vs Optimism",
    author: "ChainAnalyst",
    avatar: "CA",
    category: "Technology",
    replies: 56,
    likes: 203,
    timeAgo: "1 day ago",
    isHot: true
  },
  {
    id: 4,
    title: "Client communication tips for remote Web3 projects",
    author: "FreelanceGuru",
    avatar: "FG",
    category: "Business",
    replies: 18,
    likes: 67,
    timeAgo: "1 day ago",
    isHot: false
  },
  {
    id: 5,
    title: "NFT marketplace architecture: Database vs IPFS storage",
    author: "TechLead",
    avatar: "TL",
    category: "Development",
    replies: 41,
    likes: 156,
    timeAgo: "2 days ago",
    isHot: false
  }
];

const events = [
  {
    id: 1,
    title: "Web3 Security Workshop",
    date: "Jan 15, 2025",
    time: "2:00 PM UTC",
    type: "Online Workshop",
    attendees: 234,
    description: "Learn advanced smart contract security techniques from industry experts."
  },
  {
    id: 2,
    title: "DeFi Developer Meetup",
    date: "Jan 22, 2025",
    time: "6:00 PM UTC",
    type: "Virtual Meetup",
    attendees: 156,
    description: "Network with DeFi developers and discuss the latest protocols and trends."
  },
  {
    id: 3,
    title: "NFT Creator Showcase",
    date: "Feb 3, 2025",
    time: "3:00 PM UTC",
    type: "Community Event",
    attendees: 89,
    description: "Showcase your NFT projects and get feedback from the community."
  }
];

const topContributors = [
  { name: "CryptoExpert", avatar: "CE", contributions: 247, speciality: "DeFi" },
  { name: "SmartContractPro", avatar: "SC", contributions: 189, speciality: "Security" },
  { name: "Web3Designer", avatar: "WD", contributions: 156, speciality: "UI/UX" },
  { name: "BlockchainDev", avatar: "BD", contributions: 134, speciality: "Development" },
  { name: "TokenAnalyst", avatar: "TA", contributions: 98, speciality: "Tokenomics" }
];

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-surface">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              EtherGuild Community
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Join thousands of Web3 professionals sharing knowledge, networking, and building the future of work together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                <MessageCircle className="w-4 h-4 mr-2" />
                Join Discussions
              </Button>
              <Button variant="surface" size="lg">
                <Calendar className="w-4 h-4 mr-2" />
                View Events
              </Button>
            </div>
          </div>
        </section>

        {/* Community Stats */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {communityStats.map((stat, index) => (
                <Card key={index} className="bg-card/50 border border-border backdrop-blur-sm text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        {stat.icon}
                      </div>
                    </div>
                    <CardTitle className="text-3xl font-bold">{stat.value}</CardTitle>
                    <p className="text-muted-foreground">{stat.title}</p>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="text-xs">
                      {stat.growth}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 bg-gradient-surface">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Discussions */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Recent Discussions</h2>
                  <Button variant="surface" size="sm">
                    View All
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {discussions.map((discussion) => (
                    <Card key={discussion.id} className="bg-card/50 border border-border backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback>{discussion.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <CardTitle className="text-lg hover:text-primary cursor-pointer">
                                  {discussion.title}
                                </CardTitle>
                                {discussion.isHot && (
                                  <Badge variant="destructive" className="text-xs">
                                    🔥 Hot
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>by {discussion.author}</span>
                                <Badge variant="outline" className="text-xs">
                                  {discussion.category}
                                </Badge>
                                <span>{discussion.timeAgo}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {discussion.replies} replies
                          </div>
                          <div className="flex items-center gap-1">
                            <span>👍</span>
                            {discussion.likes} likes
                          </div>
                          <Button variant="ghost" size="sm" className="ml-auto">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Read More
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Upcoming Events */}
                <Card className="bg-card/50 border border-border backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Upcoming Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {events.map((event) => (
                        <div key={event.id} className="p-4 bg-background/50 rounded-lg">
                          <h4 className="font-semibold mb-2">{event.title}</h4>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div>{event.date} • {event.time}</div>
                            <div>{event.type}</div>
                            <div>{event.attendees} attending</div>
                          </div>
                          <p className="text-sm mt-2">{event.description}</p>
                          <Button variant="surface" size="sm" className="mt-3 w-full">
                            Join Event
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Contributors */}
                <Card className="bg-card/50 border border-border backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Top Contributors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {topContributors.map((contributor, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">{contributor.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{contributor.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {contributor.contributions} contributions • {contributor.speciality}
                            </div>
                          </div>
                          <div className="text-xs text-accent">#{index + 1}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Join CTA */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with like-minded Web3 professionals, share knowledge, and grow your career in the decentralized economy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                <MessageCircle className="w-4 h-4 mr-2" />
                Start a Discussion
              </Button>
              <Button variant="surface" size="lg">
                <Users className="w-4 h-4 mr-2" />
                Browse Members
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Community;
