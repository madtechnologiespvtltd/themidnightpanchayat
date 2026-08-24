import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://quetvvvaccwecohbnqlx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1ZXR2dnZhY2N3ZWNvaGJucWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczMzQ4NzcsImV4cCI6MjEwMjkxMDg3N30.3wC9kK7gqZ9-CA_Dl7EjpiVAQTDi9cih0xPGFLh0_54';
const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
  console.log('Attempting to create an admin user...');
  
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@gmail.com',
    password: 'admin123_Password!' // Using a secure password
  });

  if (error) {
    console.error('Failed to create user:', error.message);
  } else {
    console.log('Successfully signed up user!');
    console.log('Email:', 'admin@gmail.com');
    console.log('Password:', 'admin123_Password!');
    if (data?.session === null && data?.user) {
      console.log('NOTE: Email confirmations might be enabled on your Supabase project. If so, you will need to confirm the email, or disable Email Confirmations in the Supabase Auth settings.');
    }
  }
}

createAdmin();
