// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cjpfmtbvsscoebanbzbt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqcGZtdGJ2c3Njb2ViYW5iemJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2ODM5MDMsImV4cCI6MjA1MDI1OTkwM30.FMCZL-LRe7mekhtlo0T5GoisJnbNym5W8ZrAzXTGC14";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);