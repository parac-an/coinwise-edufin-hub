import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen, Video, Search } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <span className="text-lg font-bold text-white">C</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Coinwise
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('articles')}
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Artikel
            </button>
            <button 
              onClick={() => scrollToSection('videos')}
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <Video className="h-4 w-4" />
              Video
            </button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => scrollToSection('articles')}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border">
            <button 
              onClick={() => scrollToSection('articles')}
              className="flex items-center gap-2 w-full px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              Artikel
            </button>
            <button 
              onClick={() => scrollToSection('videos')}
              className="flex items-center gap-2 w-full px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
            >
              <Video className="h-4 w-4" />
              Video
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
