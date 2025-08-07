import { Button } from "@/components/ui/button";
import { Github, Twitter, MessageCircle, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                EtherGuild
              </span>
            </div>
            <p className="text-muted-foreground">
              The future of decentralized freelancing. Built on Ethereum for global talent.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h4 className="font-semibold">Platform</h4>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Browse Jobs</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Find Freelancers</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Post a Job</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Dashboard</a>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Documentation</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Smart Contracts</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Security Audit</a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Bug Bounty</a>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h4 className="font-semibold">Community</h4>
            <div className="space-y-2">
              <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                Discord
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                Governance
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                Forum
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                Blog
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 EtherGuild. Decentralized freelancing platform.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Network Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;