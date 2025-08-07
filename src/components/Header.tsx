import { Button } from "@/components/ui/button";
import { Wallet, Menu, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useWallet } from "@/hooks/useWallet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isConnected, connect, disconnect, displayName, isConnecting } = useWallet();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              EtherGuild
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/jobs" className="text-foreground hover:text-primary transition-colors">Browse Jobs</Link>
            <Link to="/find-talent" className="text-foreground hover:text-primary transition-colors">Find Talent</Link>
            <Link to="/how-it-works" className="text-foreground hover:text-primary transition-colors">How it Works</Link>
            <Link to="/community" className="text-foreground hover:text-primary transition-colors">Community</Link>
          </nav>

          {/* Wallet Connect Button */}
          <div className="hidden md:block">
            {isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="wallet" size="default">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    {displayName}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => disconnect()}>
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="wallet" 
                size="default" 
                onClick={connect}
                disabled={isConnecting}
              >
                <Wallet className="w-4 h-4" />
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link to="/jobs" className="text-foreground hover:text-primary transition-colors py-2">Browse Jobs</Link>
              <Link to="/find-talent" className="text-foreground hover:text-primary transition-colors py-2">Find Talent</Link>
              <Link to="/how-it-works" className="text-foreground hover:text-primary transition-colors py-2">How it Works</Link>
              <Link to="/community" className="text-foreground hover:text-primary transition-colors py-2">Community</Link>
              {isConnected ? (
                <div className="space-y-2 mt-4">
                  <Button variant="surface" size="default" className="w-full">
                    <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                    {displayName}
                  </Button>
                  <Button variant="ghost" size="default" onClick={() => disconnect()} className="w-full">
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="wallet" 
                  size="default" 
                  className="mt-4 w-full"
                  onClick={connect}
                  disabled={isConnecting}
                >
                  <Wallet className="w-4 h-4" />
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;