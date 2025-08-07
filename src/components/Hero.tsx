import { Button } from "@/components/ui/button";
import { Wallet, Shield, Users, Zap } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { Link } from "react-router-dom";

const Hero = () => {
  const { isConnected, connect, isConnecting } = useWallet();
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary)_0%,_transparent_50%)] opacity-10" />
      <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_var(--accent)_0deg,_transparent_60deg,_transparent_300deg,_var(--primary)_360deg)] opacity-5" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Main heading */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
            EtherGuild
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            The first truly decentralized freelancing platform. Connect your wallet, build your reputation on-chain, and work without intermediaries.
          </p>
        </div>

        {/* Key features badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 px-4 py-2 bg-card/50 border border-border rounded-full backdrop-blur-sm">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Smart Contract Escrow</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-card/50 border border-border rounded-full backdrop-blur-sm">
            <Users className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium">DAO Disputes</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-card/50 border border-border rounded-full backdrop-blur-sm">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Zero Fees</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          {isConnected ? (
            <Button variant="accent" size="xl" className="w-full sm:w-auto" asChild>
              <Link to="/jobs">
                <Zap className="w-5 h-5" />
                Browse Jobs
              </Link>
            </Button>
          ) : (
            <Button 
              variant="wallet" 
              size="xl" 
              className="w-full sm:w-auto"
              onClick={connect}
              disabled={isConnecting}
            >
              <Wallet className="w-5 h-5" />
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          )}
          <Button variant="surface" size="xl" className="w-full sm:w-auto" asChild>
            <Link to={isConnected ? "/dashboard" : "/jobs"}>
              {isConnected ? 'Go to Dashboard' : 'Browse Jobs'}
            </Link>
          </Button>
        </div>

        {/* Stats preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">2.4K</div>
            <div className="text-sm text-muted-foreground">Active Freelancers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">156</div>
            <div className="text-sm text-muted-foreground">ETH in Escrow</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">890</div>
            <div className="text-sm text-muted-foreground">Jobs Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">99.2%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;