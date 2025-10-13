import { useState } from "react";
import VideoCard from "./VideoCard";
import { Button } from "@/components/ui/button";

const VideosSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = ["Semua", "Budgeting", "Investasi", "Tabungan", "Tips & Trik"];

  const videos = [
    {
      title: "Tutorial Lengkap: Cara Membuat Budget Bulanan",
      description: "Video panduan step-by-step membuat budget bulanan yang efektif dan mudah diikuti",
      category: "Budgeting",
      duration: "15:30",
      thumbnail: "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?w=800&q=80",
      videoUrl: "#"
    },
    {
      title: "Investasi Saham untuk Pemula",
      description: "Pelajari dasar-dasar investasi saham dan cara memulainya dengan modal kecil",
      category: "Investasi",
      duration: "20:45",
      thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
      videoUrl: "#"
    },
    {
      title: "5 Cara Menabung yang Efektif",
      description: "Tips praktis untuk menabung dengan konsisten dan mencapai target finansial Anda",
      category: "Tabungan",
      duration: "12:20",
      thumbnail: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=800&q=80",
      videoUrl: "#"
    },
    {
      title: "Passive Income: 7 Cara Menghasilkan Uang Sambil Tidur",
      description: "Jelajahi berbagai sumber passive income yang bisa Anda mulai hari ini",
      category: "Tips & Trik",
      duration: "18:15",
      thumbnail: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80",
      videoUrl: "#"
    },
    {
      title: "Reksa Dana vs Saham: Mana yang Lebih Baik?",
      description: "Perbandingan lengkap antara investasi reksa dana dan saham untuk pemula",
      category: "Investasi",
      duration: "16:40",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      videoUrl: "#"
    },
    {
      title: "Cara Keluar dari Jerat Hutang",
      description: "Strategi praktis untuk melunasi hutang dan mencapai kebebasan finansial",
      category: "Tips & Trik",
      duration: "14:25",
      thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
      videoUrl: "#"
    }
  ];

  const filteredVideos = videos.filter(video => 
    selectedCategory === "Semua" || video.category === selectedCategory
  );

  return (
    <section id="videos" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
            Video Edukasi
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tonton video edukasi berkualitas tentang keuangan dan investasi
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
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

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <div 
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <VideoCard {...video} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideosSection;
