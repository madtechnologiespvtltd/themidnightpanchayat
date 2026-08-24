import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://quetvvvaccwecohbnqlx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1ZXR2dnZhY2N3ZWNvaGJucWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczMzQ4NzcsImV4cCI6MjEwMjkxMDg3N30.3wC9kK7gqZ9-CA_Dl7EjpiVAQTDi9cih0xPGFLh0_54';
const supabase = createClient(supabaseUrl, supabaseKey);

async function clearImages() {
  console.log('Clearing image_url from all menu items...');
  const { error } = await supabase
    .from('menu_items')
    .update({ image_url: null })
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Dummy condition to update all rows
    
  if (error) {
    console.error('Error clearing images:', error);
  } else {
    console.log('Successfully cleared images!');
  }
}

clearImages();
