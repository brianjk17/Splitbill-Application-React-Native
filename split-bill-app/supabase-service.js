import { createClient } from "@supabase/supabase-js";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import {SUPABASE_URL, SUPABASE_PUBLIC_KEY} from "@env"
import 'react-native-url-polyfill/auto'

export const supabase = createClient(SUPABASE_URL||'', SUPABASE_PUBLIC_KEY||'',
{
    auth: {
      persistSession: false,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
