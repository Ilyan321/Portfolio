import { HomeView } from '../components/home-view';
import { getVisibleProjects, getProfile } from '../lib/data';

export const revalidate = 60; // Revalidate data every 60 seconds

export default async function HomePage() {
  const [projects, profile] = await Promise.all([
    getVisibleProjects(),
    getProfile()
  ]);

  return <HomeView projects={projects} profile={profile} />;
}
