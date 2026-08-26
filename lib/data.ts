import { createPublicClient } from './supabase';
import { toProjectItem, toProfileData, toCertificateItem, ProjectItem, ProfileData, CertificateItem } from './types';

export async function getVisibleProjects(): Promise<ProjectItem[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('visible', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return (data || []).map(toProjectItem);
}

export async function getProfile(): Promise<ProfileData | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return toProfileData(data);
}

export async function getVisibleCertificates(): Promise<CertificateItem[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('certificates')
    .select('*')
    .eq('visible', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching certificates:', error);
    return [];
  }

  return (data || []).map(toCertificateItem);
}
