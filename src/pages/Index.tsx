import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ArticlesSection from "@/components/ArticlesSection";
import VideosSection from "@/components/VideosSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <ArticlesSection />
        <VideosSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
