import { useState } from "react";
import VideoCard from "./VideoCard";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const VideosSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = ["Semua", "Budgeting", "Investasi", "Tabungan", "Tips & Trik"];

  const { data: videos = [], isLoading } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      return data.map((video) => ({
        title: video.title,
        description: video.description,
        category: video.category,
        videoUrl: video.video_url
      }));
    }
  });

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
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Memuat video...</p>
          </div>
        ) : (
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
        )}
      </div>
    </section>
  );
};

export default VideosSection;
