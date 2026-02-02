import { useState } from "react";
import { Header } from "@/app/components/Header";
import { ProjectRow } from "@/app/components/ProjectRow";

// Reverting to the previous lighter abstract background
const BG_IMAGE_URL = "https://images.unsplash.com/photo-1769882068890-1a57d4fc5a24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydGlzdGljJTIwc29mdCUyMHRleHR1cmUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2OTkwODc3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

const projects = [
  {
    title: "Synechron Cube",
    date: "April 2024 -May 2024",
    category: "Synechron",
    type: "UX/UI Design",
    description: "From April to May 2024, we can expect a vibrant transition as spring unfolds. This period will be marked by blooming flowers and warmer days.",
    image1: "https://images.unsplash.com/photo-1610497254766-c6a51afa9b64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydGlzdGljJTIwbWluaW1hbCUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3Njk5MTE0NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    image2: "https://images.unsplash.com/photo-1694098255907-a9e4a6ce96e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkZXNpZ24lMjBkZXRhaWwlMjBhYnN0cmFjdHxlbnwxfHx8fDE3Njk5MTE0NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    title: "SeeSaw Redesign",
    date: "April 2024 -May 2024",
    category: "Personal",
    type: "UX/UI Design",
    description: "A fresh take on social interaction, redesigning the way users connect and share moments with a focus on intuitive navigation and visual clarity.",
    image1: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    image2: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    title: "Gaurdian App",
    date: "Nov 2025 - Dec 2025",
    category: "Hackathon",
    type: "Creative Coding",
    description: "An innovative safety solution built during a hackathon, leveraging real-time data to provide users with peace of mind in urban environments.",
    image1: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    image2: "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    title: "Wander App",
    date: "July 2025 - Oct 2025",
    category: "AI For UX Research",
    type: "UX/UI Design",
    description: "Empowering UX researchers with AI-driven insights to uncover user patterns and streamline the journey from data to actionable design decisions.",
    image1: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    image2: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    title: "IHateMyCommute",
    date: "January 2025",
    category: "Personal",
    type: "Personal",
    description: "A satirical yet practical approach to solving daily commute frustrations, blending humor with utility to make the journey a bit more bearable.",
    image1: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    image2: "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  }
];

export default function App() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.type === filter);

  return (
    <>
      {/* Background Layer - Fixed to viewport */}
      <div 
        className="fixed inset-0 z-0"
        style={{ 
          backgroundImage: `url(${BG_IMAGE_URL})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Content Layer - White background scrolling over fixed image */}
      <div className="relative z-10 min-h-screen bg-white w-full flex justify-center py-[74px] px-[20px] font-['Plus_Jakarta_Sans',sans-serif] overflow-x-hidden">
         <div className="w-full flex flex-col gap-[151px]">
            <Header 
              currentFilter={filter} 
              onFilterChange={setFilter} 
              bgImageUrl={BG_IMAGE_URL}
            />
            
            <div className="flex flex-col w-full">
              {filteredProjects.map((project, index) => (
                <ProjectRow 
                  key={project.title} 
                  {...project} 
                  index={index} 
                  bgImageUrl={BG_IMAGE_URL}
                />
              ))}
               {/* Bottom border for the whole list visual completeness */}
               <div className="border-t border-[#1e1e1e] w-full" /> 
            </div>
         </div>
      </div>
    </>
  );
}
