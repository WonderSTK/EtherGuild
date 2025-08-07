import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Zap, Lock, Vote, Globe } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Smart Contract Escrow",
    description: "Funds are automatically held in secure smart contracts until milestones are completed, protecting both freelancers and clients."
  },
  {
    icon: Lock,
    title: "Immutable Reputation",
    description: "Build your professional reputation on-chain. Reviews and ratings are permanently stored and cannot be manipulated."
  },
  {
    icon: Vote,
    title: "DAO Dispute Resolution",
    description: "Community-powered dispute resolution through decentralized voting ensures fair outcomes for all parties."
  },
  {
    icon: Zap,
    title: "Zero Platform Fees",
    description: "Keep 100% of your earnings. No hidden fees, no intermediaries taking a cut from your hard work."
  },
  {
    icon: Users,
    title: "Wallet-Based Identity",
    description: "One wallet, one identity. Connect with MetaMask or WalletConnect to access the entire platform."
  },
  {
    icon: Globe,
    title: "Global & Borderless",
    description: "Work with anyone, anywhere in the world. Payments are instant and cross-border without traditional banking."
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Why Choose EtherGuild?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of freelancing with blockchain-powered features that put control back in your hands
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="bg-card/50 border border-border backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-elevated group">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300">
                    <IconComponent className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;