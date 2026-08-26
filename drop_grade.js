import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// You can't drop columns via REST API, I'll need to run it via SQL.
// Actually, since this is just a minor field, I'll create a sql script for the user to run, 
// or I can leave the DB as is (it just ignores the column). But the user might want it clean.
