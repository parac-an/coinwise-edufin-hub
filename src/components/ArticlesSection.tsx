import { useState } from "react";
import ArticleCard from "./ArticleCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ArticlesSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = ["Semua", "Budgeting", "Investasi", "Tabungan", "Pengelolaan Uang"];

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("date", { ascending: false });
      
      if (error) throw error;
      
      return data.map((article) => ({
        ...article,
        date: new Date(article.date).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric"
        })
      }));
    }
  });

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="articles" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
            Artikel Edukasi
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Jelajahi berbagai artikel tentang keuangan pribadi, investasi, dan tips mengelola uang
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Cari artikel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-secondary border-border focus:border-primary"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-gradient-to-r from-primary to-primary-glow" 
                  : "border-primary/50 hover:border-primary hover:bg-primary/10"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <div 
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ArticleCard {...article} />
            </div>
          ))}
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Memuat artikel...</p>
          </div>
        )}

        {!isLoading && filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Tidak ada artikel yang sesuai dengan pencarian Anda.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticlesSection;
