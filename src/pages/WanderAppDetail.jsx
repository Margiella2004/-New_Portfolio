import ProjectDetailTemplate from '../components/ProjectDetailTemplate';
import { projectsData } from '../data/projectsData';

export default function WanderAppDetail() {
  return <ProjectDetailTemplate project={projectsData.wanderApp} />;
}
