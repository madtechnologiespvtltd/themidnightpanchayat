import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://quetvvvaccwecohbnqlx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1ZXR2dnZhY2N3ZWNvaGJucWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczMzQ4NzcsImV4cCI6MjEwMjkxMDg3N30.3wC9kK7gqZ9-CA_Dl7EjpiVAQTDi9cih0xPGFLh0_54'
const supabase = createClient(supabaseUrl, supabaseKey)

async function runTest() {
  const { data, error } = await supabase.from('categories').select('*')
  console.log('Categories:', data)
  console.log('Error:', error)
}
runTest();
