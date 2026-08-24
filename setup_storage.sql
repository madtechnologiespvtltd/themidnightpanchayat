-- SQL Script to set up the Image Storage Bucket for the Menu

-- 1. Create the bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('menu-images', 'menu-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow public access to read the images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'menu-images');

-- 3. Allow anonymous uploads to the bucket
-- Note: In a production app, you would restrict this to authenticated users.
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'menu-images');

-- 4. Allow anonymous updates/deletes to the bucket
CREATE POLICY "Allow public updates"
ON storage.objects FOR UPDATE
USING (bucket_id = 'menu-images');

CREATE POLICY "Allow public deletes"
ON storage.objects FOR DELETE
USING (bucket_id = 'menu-images');
