import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Download, Share2 } from "lucide-react";
import { toast } from "sonner";
import { getYouTubeThumbnail, getYouTubeVideoId } from "@/lib/youtube";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface VideoCardProps {
  title: string;
  description: string;
  category: string;
  videoUrl: string;
}

const VideoCard = ({ title, description, category, videoUrl }: VideoCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const thumbnail = getYouTubeThumbnail(videoUrl);
  const videoId = getYouTubeVideoId(videoUrl);
  
  const handleShare = () => {
    const text = `Tonton video: ${title} di Coinwise`;
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({ title, text, url });
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
      window.open(whatsappUrl, '_blank');
    }
    
    toast.success("Link video siap dibagikan!");
  };

  const handleDownload = () => {
    toast.info("Fitur download akan segera tersedia!");
  };

  return (
    <Card className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--shadow-card)]">
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-secondary">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        
        {/* Play Button Overlay */}
        <div 
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          onClick={() => setIsDialogOpen(true)}
        >
          <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-[var(--shadow-glow)] hover:scale-110 transition-transform">
            <Play className="h-8 w-8 text-white ml-1" fill="white" />
          </div>
        </div>

        <Badge className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm">
          {category}
        </Badge>
      </div>

      <CardHeader>
        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button 
          className="flex-1 bg-gradient-to-r from-primary to-primary-glow hover:shadow-[var(--shadow-glow)] transition-all"
          onClick={() => setIsDialogOpen(true)}
        >
          <Play className="mr-2 h-4 w-4" />
          Tonton
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleDownload}
          className="border-primary/50 hover:border-primary hover:bg-primary/10"
        >
          <Download className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleShare}
          className="border-primary/50 hover:border-primary hover:bg-primary/10"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl w-full p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full">
            {videoId && (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-b-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default VideoCard;
