import { createPublicClient } from './supabase';
import { toProjectItem, toProfileData, toCertificateItem, ProjectItem, ProfileData, CertificateItem } from './types';
import fallbackProjects from './fallback/projects.json';
import fallbackProfile from './fallback/profile.json';
import fallbackCertificates from './fallback/certificates.json';

export async function getVisibleProjects(): Promise<ProjectItem[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('visible', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) return fallbackProjects.map(toProjectItem);
    return data.map(toProjectItem);
  } catch (error) {
    console.error('Error fetching projects, using fallback JSON:', error);
    return fallbackProjects.map(toProjectItem);
  }
}

export async function getProfile(): Promise<ProfileData | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .limit(1)
      .single();

    if (error) throw error;
    if (!data) return toProfileData(fallbackProfile);
    return toProfileData(data);
  } catch (error) {
    console.error('Error fetching profile, using fallback JSON:', error);
    return toProfileData(fallbackProfile);
  }
}

export async function getVisibleCertificates(): Promise<CertificateItem[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('visible', true)
      .order('sort_order', { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) return fallbackCertificates.map(toCertificateItem);
    return data.map(toCertificateItem);
  } catch (error) {
    console.error('Error fetching certificates, using fallback JSON:', error);
    return fallbackCertificates.map(toCertificateItem);
  }
}
