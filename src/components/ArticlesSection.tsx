import { useState } from "react";
import ArticleCard from "./ArticleCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const ArticlesSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = ["Semua", "Budgeting", "Investasi", "Tabungan", "Pengelolaan Uang"];

  const articles = [
    {
      title: "Cara Membuat Budget Bulanan yang Efektif",
      description: "Pelajari langkah-langkah praktis untuk membuat budget bulanan yang sesuai dengan kondisi keuangan Anda. Termasuk tips alokasi dana untuk kebutuhan, tabungan, dan hiburan.",
      category: "Budgeting",
      date: "15 Januari 2025",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80"
    },
    {
      title: "Investasi untuk Pemula: Mulai dari Mana?",
      description: "Panduan lengkap memulai investasi bagi pemula. Kenali berbagai instrumen investasi, risiko, dan strategi yang cocok untuk Anda.",
      category: "Investasi",
      date: "12 Januari 2025",
      image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=800&q=80"
    },
    {
      title: "Menabung dengan Metode 50/30/20",
      description: "Metode 50/30/20 adalah cara sederhana dan efektif untuk mengelola keuangan. Alokasikan 50% untuk kebutuhan, 30% untuk keinginan, dan 20% untuk tabungan.",
      category: "Tabungan",
      date: "10 Januari 2025",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80"
    },
    {
      title: "Strategi Melunasi Hutang dengan Cepat",
      description: "Tips dan trik untuk melunasi hutang secara efektif. Pelajari metode snowball dan avalanche untuk bebas dari hutang.",
      category: "Pengelolaan Uang",
      date: "8 Januari 2025",
      image: "https://images.unsplash.com/photo-1633158829875-e5316a358c6f?w=800&q=80"
    },
    {
      title: "Pentingnya Dana Darurat dan Cara Membangunnya",
      description: "Dana darurat adalah pondasi keuangan yang kuat. Pelajari berapa jumlah ideal dan bagaimana cara mengumpulkannya dengan konsisten.",
      category: "Tabungan",
      date: "5 Januari 2025",
      image: "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?w=800&q=80"
    },
    {
      title: "Memahami Saham: Risiko dan Keuntungan",
      description: "Panduan komprehensif tentang investasi saham. Pelajari cara membaca laporan keuangan, analisis fundamental, dan teknikal.",
      category: "Investasi",
      date: "3 Januari 2025",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80"
    }
  ];

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

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Tidak ada artikel yang sesuai dengan pencarian Anda.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticlesSection;
