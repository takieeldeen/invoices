import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = process.env.DB_URL;
export const supabaseKey = process.env.DB_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
