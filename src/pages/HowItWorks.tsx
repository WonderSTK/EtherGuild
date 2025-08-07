import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Search, FileText, CheckCircle, Shield, Zap, Users, TrendingUp, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: <Wallet className="w-8 h-8 text-primary" />,
    title: "Connect Your Wallet",
    description: "Connect your Web3 wallet (MetaMask, WalletConnect) to start using EtherGuild. No email or password required.",
    forClients: "Ready to post jobs and pay in crypto",
    forFreelancers: "Ready to receive payments directly to your wallet"
  },
  {
    icon: <Search className="w-8 h-8 text-primary" />,
    title: "Discover & Connect",
    description: "Browse jobs on the blockchain or find top talent from our verified community of Web3 professionals.",
    forClients: "Post jobs or browse talent profiles",
    forFreelancers: "Search and apply for Web3 opportunities"
  },
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "Smart Contracts",
    description: "All job agreements are powered by smart contracts, ensuring transparency, security, and automatic payments.",
    forClients: "Escrow payments are secured by blockchain",
    forFreelancers: "Get paid automatically when milestones are met"
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-primary" />,
    title: "Complete & Get Paid",
    description: "Once work is completed and approved, payments are released automatically via smart contracts.",
    forClients: "Review work and approve payments",
    forFreelancers: "Receive instant payments in crypto"
  }
];

const features = [
  {
    icon: <Shield className="w-6 h-6 text-accent" />,
    title: "Blockchain Security",
    description: "All transactions and agreements secured by smart contracts on Ethereum"
  },
  {
    icon: <Zap className="w-6 h-6 text-accent" />,
    title: "Instant Payments",
    description: "No waiting for bank transfers - get paid instantly in cryptocurrency"
  },
  {
    icon: <Users className="w-6 h-6 text-accent" />,
    title: "Global Community",
    description: "Connect with Web3 professionals and projects from around the world"
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-accent" />,
    title: "Transparent Reputation",
    description: "On-chain reputation system you truly own and can't be manipulated"
  }
];

const faqs = [
  {
    question: "What cryptocurrencies can I use?",
    answer: "Currently we support ETH and major ERC-20 tokens. We're working on adding support for more chains like Polygon and Arbitrum."
  },
  {
    question: "How are disputes resolved?",
    answer: "We have a decentralized dispute resolution system where community members vote on dispute outcomes. This ensures fair and transparent resolution."
  },
  {
    question: "Are there any fees?",
    answer: "We charge a small platform fee (2.5%) on completed transactions. This is much lower than traditional freelancing platforms and helps maintain the platform."
  },
  {
    question: "What happens if I lose access to my wallet?",
    answer: "It's crucial to backup your wallet's recovery phrase. We cannot recover lost wallets, but we're building features to help with account recovery through social verification."
  }
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-surface">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              How EtherGuild Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              The first truly decentralized freelancing platform powered by blockchain technology. 
              Work with confidence, get paid instantly, and own your reputation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/jobs">Start Browsing Jobs</Link>
              </Button>
              <Button variant="surface" size="lg" asChild>
                <Link to="/find-talent">Find Talent</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Getting Started is Simple
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Four simple steps to start working in the decentralized economy
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <Card key={index} className="bg-card/50 border border-border backdrop-blur-sm text-center relative">
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-8 h-8 text-primary/30" />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        {step.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-accent">
                        <CheckCircle className="w-4 h-4" />
                        <span>Clients: {step.forClients}</span>
                      </div>
                      <div className="flex items-center gap-2 text-accent">
                        <CheckCircle className="w-4 h-4" />
                        <span>Freelancers: {step.forFreelancers}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-surface">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose EtherGuild?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Built for the future of work with cutting-edge blockchain technology
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-card/50 border border-border backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about EtherGuild
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="bg-card/50 border border-border backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-surface">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join the Future of Work?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect your wallet and start earning or hiring in the decentralized economy today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/jobs">Find Web3 Jobs</Link>
              </Button>
              <Button variant="surface" size="lg" asChild>
                <Link to="/find-talent">Hire Web3 Talent</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
