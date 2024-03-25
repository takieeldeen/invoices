import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = process.env.DB_URL;
export const supabaseKey = process.env.DB_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;




echo -e "import { createClient } from '@supabase/supabase-js';\n\nexport const supabaseUrl = 'https://kcyquyepiyimwvfsypdj.supabase.co';\nexport const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjeXF1eWVwaXlpbXd2ZnN5cGRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MTk4MjAsImV4cCI6MjAyNTk5NTgyMH0.vuoCi6PycyIN868P5eDGDlvqmNH-K-8wdzYxu694EIk';\n\nconst supabase = createClient(supabaseUrl, supabaseKey);\nexport default supabase;" > test.js