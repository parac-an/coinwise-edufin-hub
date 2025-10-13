import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Share2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface ArticleCardProps {
  title: string;
  description: string;
  category: string;
  date: string;
  image: string;
}

const ArticleCard = ({ title, description, category, date, image }: ArticleCardProps) => {
  const handleShare = () => {
    const text = `Baca artikel: ${title} di Coinwise`;
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({ title, text, url });
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
      window.open(whatsappUrl, '_blank');
    }
    
    toast.success("Link artikel siap dibagikan!");
  };

  return (
    <Card className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--shadow-card)]">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <Badge className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm">
          {category}
        </Badge>
      </div>

      <CardHeader>
        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-xs">
          <Calendar className="h-3 w-3" />
          {date}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button 
          className="flex-1 bg-gradient-to-r from-primary to-primary-glow hover:shadow-[var(--shadow-glow)] transition-all group"
        >
          Baca Artikel
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
    </Card>
  );
};

export default ArticleCard;
