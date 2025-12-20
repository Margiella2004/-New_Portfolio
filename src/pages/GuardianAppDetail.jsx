import ProjectDetailTemplate from '../components/ProjectDetailTemplate';
import { projectsData } from '../data/projectsData';

export default function GuardianAppDetail() {
  return <ProjectDetailTemplate project={projectsData.guardianApp} />;
}
