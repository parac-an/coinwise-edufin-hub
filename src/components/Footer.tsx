import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <span className="text-lg font-bold text-white">C</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Coinwise
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Platform edukasi keuangan gratis dalam Bahasa Indonesia untuk semua kalangan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Menu</h3>
            <ul className="space-y-2">
              <li>
                <a href="#articles" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Artikel
                </a>
              </li>
              <li>
                <a href="#videos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Video
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Kategori</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Budgeting</li>
              <li className="text-sm text-muted-foreground">Investasi</li>
              <li className="text-sm text-muted-foreground">Tabungan</li>
              <li className="text-sm text-muted-foreground">Pengelolaan Uang</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4">Ikuti Kami</h3>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-secondary border border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-secondary border border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-secondary border border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-secondary border border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-4">
              <a 
                href="mailto:info@coinwise.id" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                info@coinwise.id
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Coinwise. Semua hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
