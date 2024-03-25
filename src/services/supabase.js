import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://kcyquyepiyimwvfsypdj.supabase.co";
export const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjeXF1eWVwaXlpbXd2ZnN5cGRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MTk4MjAsImV4cCI6MjAyNTk5NTgyMH0.vuoCi6PycyIN868P5eDGDlvqmNH-K-8wdzYxu694EIk";

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
