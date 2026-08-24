import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://quetvvvaccwecohbnqlx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1ZXR2dnZhY2N3ZWNvaGJucWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczMzQ4NzcsImV4cCI6MjEwMjkxMDg3N30.3wC9kK7gqZ9-CA_Dl7EjpiVAQTDi9cih0xPGFLh0_54';
const supabase = createClient(supabaseUrl, supabaseKey);

const imageMap = {
  'NOODLES': '/images/noodles.png',
  'RICE': '/images/rice.png',
  'CHILLI POTATOES': '/images/chilli_potatoes.png',
  'BURGER': '/images/burger.png',
  'SANDWICH': '/images/sandwich.png',
  'SPRING ROLLS': '/images/spring_rolls.png',
  'MOMOS': '/images/momos.png',
  'FRIES': '/images/fries.png',
  'PASTA': '/images/pasta.png',
  'MAGGI': '/images/maggi.png',
  'PIZZA': '/images/pizza.png',
  'MOJITO': '/images/mojito.png',
  'COFFEE': '/images/coffee.png',
  'SHAKES': '/images/shakes.png',
  'CHAI': '/images/chai.png'
};

async function updateImages() {
  console.log('Fetching categories...');
  const { data: categories } = await supabase.from('categories').select('*');
  
  if (!categories || categories.length === 0) {
    console.log('No categories found. Please run update_menu.sql first.');
    return;
  }

  for (const cat of categories) {
    const imageUrl = imageMap[cat.name];
    if (imageUrl) {
      console.log(`Updating items in ${cat.name} to use ${imageUrl}`);
      const { error } = await supabase
        .from('menu_items')
        .update({ image_url: imageUrl })
        .eq('category_id', cat.id);
        
      if (error) {
        console.error(`Error updating ${cat.name}:`, error);
      }
    }
  }
  
  console.log('Finished updating images!');
}

updateImages();
