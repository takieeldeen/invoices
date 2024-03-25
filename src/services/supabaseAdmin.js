import { createClient } from "@supabase/supabase-js";

const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjeXF1eWVwaXlpbXd2ZnN5cGRqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMDQxOTgyMCwiZXhwIjoyMDI1OTk1ODIwfQ.qLAUFR4sgGAyFB2XnVzbSIrSx5N5pmuZj8VVEw2aNQQ";
const url = "https://kcyquyepiyimwvfsypdj.supabase.co";

const supabaseAdmin = createClient(url, key);
export default supabaseAdmin;
