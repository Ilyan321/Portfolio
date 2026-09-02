import { createPublicClient } from './supabase';
import { cookies } from 'next/headers';

export async function verifyAdminSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('sb-access-token')?.value;
    if (!token) return false;
    
    const supabase = createPublicClient();
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    return !error && !!user;
  } catch (error) {
    return false;
  }
}
