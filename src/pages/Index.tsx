import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import JobBoard from "@/components/JobBoardSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <JobBoard />
      <Footer />
    </div>
  );
};

export default Index;
