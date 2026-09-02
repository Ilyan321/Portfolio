import { Suspense } from 'react';
import { HomeView } from '../components/home-view';
import { getVisibleProjects, getProfile, getVisibleCertificates } from '../lib/data';

export const revalidate = 60;

export default async function HomePage() {
  const [projects, profile, certificates] = await Promise.all([
    getVisibleProjects(),
    getProfile(),
    getVisibleCertificates()
  ]);

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1A1918]" />}>
      <HomeView projects={projects} profile={profile} certificates={certificates} />
    </Suspense>
  );
}
