import { createClient } from "@supabase/supabase-js";

const key = process.DB_SERVICE_ROLL_KEY;
const url = process.DB_URL;

const supabaseAdmin = createClient(url, key);
export default supabaseAdmin;
