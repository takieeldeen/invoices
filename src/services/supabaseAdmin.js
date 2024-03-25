import { createClient } from "@supabase/supabase-js";
import supabase from "./supabase";

const key = process.env.DB_SERVICE_ROLL_KEY;
const url = process.env.DB_URL;

const supabaseAdmin = createClient(url, key);
export default supabaseAdmin;

cd src/services && echo -e "import { createClient } from '@supabase/supabase-js';\n\nconst url = 'https://kcyquyepiyimwvfsypdj.supabase.co';\nconst key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjeXF1eWVwaXlpbXd2ZnN5cGRqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMDQxOTgyMCwiZXhwIjoyMDI1OTk1ODIwfQ.qLAUFR4sgGAyFB2XnVzbSIrSx5N5pmuZj8VVEw2aNQQ';\n\nconst supabaseAdmin = createClient(url, key);\nexport default supabaseAdmin;" > supabaseAdmin.js && echo -e "import { createClient } from '@supabase/supabase-js';\n\nexport const supabaseUrl = 'https://kcyquyepiyimwvfsypdj.supabase.co';\nexport const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjeXF1eWVwaXlpbXd2ZnN5cGRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MTk4MjAsImV4cCI6MjAyNTk5NTgyMH0.vuoCi6PycyIN868P5eDGDlvqmNH-K-8wdzYxu694EIk';\n\nconst supabase = createClient(supabaseUrl, supabaseKey);\nexport default supabase;" > supabase.js