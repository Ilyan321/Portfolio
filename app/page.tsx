import { HomeView } from '../components/home-view';
import { getVisibleProjects, getProfile, getVisibleCertificates } from '../lib/data';

export const revalidate = 60; // Revalidate data every 60 seconds

export default async function HomePage() {
  const [projects, profile, certificates] = await Promise.all([
    getVisibleProjects(),
    getProfile(),
    getVisibleCertificates()
  ]);

  return <HomeView projects={projects} profile={profile} certificates={certificates} />;
}
