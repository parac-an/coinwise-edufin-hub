-- Create articles table
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create videos table
CREATE TABLE public.videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  duration TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  video_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view articles"
  ON public.articles
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view videos"
  ON public.videos
  FOR SELECT
  USING (true);

-- Create policies for authenticated users to manage content
CREATE POLICY "Authenticated users can insert articles"
  ON public.articles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update articles"
  ON public.articles
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete articles"
  ON public.articles
  FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert videos"
  ON public.videos
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update videos"
  ON public.videos
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete videos"
  ON public.videos
  FOR DELETE
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_videos_updated_at
  BEFORE UPDATE ON public.videos
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Insert sample articles data
INSERT INTO public.articles (title, description, category, date, image) VALUES
  ('Cara Membuat Budget Bulanan yang Efektif', 'Pelajari langkah-langkah praktis untuk membuat budget bulanan yang sesuai dengan kondisi keuangan Anda. Termasuk tips alokasi dana untuk kebutuhan, tabungan, dan hiburan.', 'Budgeting', '2025-01-15', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80'),
  ('Investasi untuk Pemula: Mulai dari Mana?', 'Panduan lengkap memulai investasi bagi pemula. Kenali berbagai instrumen investasi, risiko, dan strategi yang cocok untuk Anda.', 'Investasi', '2025-01-12', 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=800&q=80'),
  ('Menabung dengan Metode 50/30/20', 'Metode 50/30/20 adalah cara sederhana dan efektif untuk mengelola keuangan. Alokasikan 50% untuk kebutuhan, 30% untuk keinginan, dan 20% untuk tabungan.', 'Tabungan', '2025-01-10', 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80'),
  ('Strategi Melunasi Hutang dengan Cepat', 'Tips dan trik untuk melunasi hutang secara efektif. Pelajari metode snowball dan avalanche untuk bebas dari hutang.', 'Pengelolaan Uang', '2025-01-08', 'https://images.unsplash.com/photo-1633158829875-e5316a358c6f?w=800&q=80'),
  ('Pentingnya Dana Darurat dan Cara Membangunnya', 'Dana darurat adalah pondasi keuangan yang kuat. Pelajari berapa jumlah ideal dan bagaimana cara mengumpulkannya dengan konsisten.', 'Tabungan', '2025-01-05', 'https://images.unsplash.com/photo-1621981386829-9b458a2cddde?w=800&q=80'),
  ('Memahami Saham: Risiko dan Keuntungan', 'Panduan komprehensif tentang investasi saham. Pelajari cara membaca laporan keuangan, analisis fundamental, dan teknikal.', 'Investasi', '2025-01-03', 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80');

-- Insert sample videos data
INSERT INTO public.videos (title, description, category, duration, thumbnail, video_url) VALUES
  ('Tutorial Lengkap: Cara Membuat Budget Bulanan', 'Video panduan step-by-step membuat budget bulanan yang efektif dan mudah diikuti', 'Budgeting', '15:30', 'https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?w=800&q=80', '#'),
  ('Investasi Saham untuk Pemula', 'Pelajari dasar-dasar investasi saham dan cara memulainya dengan modal kecil', 'Investasi', '20:45', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80', '#'),
  ('5 Cara Menabung yang Efektif', 'Tips praktis untuk menabung dengan konsisten dan mencapai target finansial Anda', 'Tabungan', '12:20', 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=800&q=80', '#'),
  ('Passive Income: 7 Cara Menghasilkan Uang Sambil Tidur', 'Jelajahi berbagai sumber passive income yang bisa Anda mulai hari ini', 'Tips & Trik', '18:15', 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80', '#'),
  ('Reksa Dana vs Saham: Mana yang Lebih Baik?', 'Perbandingan lengkap antara investasi reksa dana dan saham untuk pemula', 'Investasi', '16:40', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', '#'),
  ('Cara Keluar dari Jerat Hutang', 'Strategi praktis untuk melunasi hutang dan mencapai kebebasan finansial', 'Tips & Trik', '14:25', 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80', '#');