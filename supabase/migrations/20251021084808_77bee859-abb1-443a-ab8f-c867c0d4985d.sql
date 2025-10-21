-- Remove thumbnail and duration columns from videos table
ALTER TABLE public.videos 
DROP COLUMN thumbnail,
DROP COLUMN duration;