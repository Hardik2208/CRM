import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lydfazfmdhuzydzwehnv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5ZGZhemZtZGh1enlkendlaG52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MDQ3NjYsImV4cCI6MjA2NDA4MDc2Nn0.-PS1XRdunZzD6pzYhVYj4DmqBbQoDGL83HXT8d6kGHo';
export const supabase = createClient(supabaseUrl, supabaseKey);
