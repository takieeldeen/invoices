import { createClient } from "@supabase/supabase-js";

const key = process.env.DB_SERVICE_ROLL_KEY;
const url = process.env.DB_URL;

const supabaseAdmin = createClient(url, key);
export default supabaseAdmin;
