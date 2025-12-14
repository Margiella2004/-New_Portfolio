import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const projects = [
  {
    title: "Guardian App",
    description: "A series of my works that are personal projects and some I have done in past professional roles. One thing remains constant is combining both my engineering background and Design education in order to build the best product for my user.",
    tags: ["UX Design", "UX Research", "Engineering"],
    colors: ["bg-[#bad7a8]", "bg-[#aaa8d7]", "bg-[#d7d6a8]"],
    images: [
      "https://images.unsplash.com/photo-1533234944761-2f5337579079?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", // Main
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"  // Secondary
    ]
  },
  {
    title: "Wander App",
    description: "A series of my works that are personal projects and some I have done in past professional roles.",
    tags: ["UX Design", "UX Research"],
    colors: ["bg-[#bad7a8]", "bg-[#aaa8d7]"],
    images: [
      "https://images.unsplash.com/photo-1692681157014-2f7ee75c0ea0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    ]
  },
  {
    title: "Synechron Cube",
    description: "A series of my works that are personal projects and some I have done in past professional roles.",
    tags: ["3D Engineering", "Interaction Design"],
    colors: ["bg-[#d7a8a8]", "bg-[#d7a8cc]"],
    images: [
      "https://images.unsplash.com/photo-1626705343685-eb1e06c9271f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
    ]
  }
];

function Pill({ text, color }: { text: string; color: string }) {
  return (
    <div className={`${color} relative rounded-[13.2px] shrink-0 inline-flex`}>
      <div className="flex items-center justify-center px-[21.5px] py-[7.6px] relative rounded-[inherit] overflow-hidden">
        <p className="font-sans font-normal text-[10px] leading-[12px] text-white tracking-[-0.1px] whitespace-nowrap">
          {text}
        </p>
      </div>
      <div aria-hidden="true" className="absolute inset-[-1px] border border-[#f1f1f1] rounded-[14.2px] pointer-events-none" />
    </div>
  );
}

export function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    projects.forEach((_, index) => {
      const isHovered = hoveredIndex === index;
      const targetGradient = `.project-gradient-${index}`;
      const targetTitle = `.project-title-${index}`;
      const targetDesc = `.project-desc-${index}`;

      if (isHovered) {
        gsap.to(targetGradient, { opacity: 1, duration: 0.5, ease: "power2.inOut" });
        gsap.to(targetTitle, { color: "#ffffff", duration: 0.5, ease: "power2.inOut" });
        gsap.to(targetDesc, { color: "#fbfbfb", duration: 0.5, ease: "power2.inOut" });
      } else {
        gsap.to(targetGradient, { opacity: 0, duration: 0.5, ease: "power2.inOut" });
        gsap.to(targetTitle, { color: "#232125", duration: 0.5, ease: "power2.inOut" });
        gsap.to(targetDesc, { color: "#9f9fa9", duration: 0.5, ease: "power2.inOut" });
      }
    });
  }, { scope: containerRef, dependencies: [hoveredIndex] });

  return (
    <div className="bg-white w-full min-h-screen rounded-t-[40px] shadow-[0px_-4px_7.5px_-0.9px_rgba(0,0,0,0.07)] flex flex-col items-center">
      
      {/* Inner Content Container - Centered but allows background to stretch */}
      <div className="w-full max-w-[1400px] px-2 md:px-3 py-4 md:pt-16 md:pb-8 flex flex-col items-center">
        
        {/* Header Section */}
        <div className="flex flex-col items-center w-full mb-10">
          {/* Header Text */}
          <div className="w-full flex items-center justify-between mb-2 max-w-[530px] md:max-w-none">
            <h2 className="text-[32px] md:text-[32px] tracking-[-0.64px] text-[#4b4949] opacity-90 font-normal">
              Projects
            </h2>
            <span className="text-[10px] tracking-[-0.2px] text-[#4b4949] opacity-90">
              3 items
            </span>
          </div>

          {/* Intro Paragraph */}
          <div className="w-full max-w-[530px] md:max-w-none flex">
             <p className="text-[#9f9fa9] text-[14px] leading-[17px] tracking-[-0.15px] max-w-[541px]">
               A series of my works that are personal projects and some I have done in past professional roles. 
               One thing remains constant is combining both my engineering background and Design education 
               in order to build the best product for my user.
             </p>
          </div>
        </div>

        {/* Main Grid/Stack */}
        <div className="flex flex-col gap-10 items-center w-full" ref={containerRef}>
          
          {/* Card 1: Guardian App */}
          <div 
            onMouseEnter={() => setHoveredIndex(0)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative bg-white rounded-[32px] w-full max-w-[530px] md:max-w-none overflow-hidden flex flex-col md:flex-row md:min-h-[500px] cursor-pointer"
          >
            {/* Gradient Background (Hidden by default) */}
            <div className="project-gradient-0 absolute inset-0 bg-gradient-to-b from-[#af4b70] to-[#ffffff] opacity-0 pointer-events-none z-0" />

            {/* Border */}
            <div className="absolute inset-0 border-2 border-[rgba(99,99,99,0.17)] rounded-[32px] pointer-events-none z-20" />
            
            <div className="p-[38px] md:p-[34px] flex flex-col md:flex-row gap-[32px] md:gap-0 justify-between md:items-start relative z-10 w-full h-full">
              
              {/* Left Content (Text) */}
              <div className="flex flex-col gap-[26px] md:w-[427px] shrink-0 z-10">
                 <div className="flex flex-col gap-[8px]">
                   <h3 className="project-title-0 font-['Instrument_Serif',serif] text-[32px] leading-[30px] tracking-[-1.92px] text-[#232125]">
                     {projects[0].title}
                   </h3>
                   <p className="project-desc-0 text-[#9f9fa9] text-[14px] leading-[17px] tracking-[-0.15px] max-w-[416px]">
                     {projects[0].description}
                   </p>
                 </div>
                 <div className="flex gap-[9px] flex-wrap">
                   {projects[0].tags.map((tag, i) => (
                     <Pill key={i} text={tag} color={projects[0].colors[i]} />
                   ))}
                 </div>
              </div>

              {/* Right Content (Images) */}
              {/* Converted to pure flexbox layout */}
              <div className="flex-1 flex items-end justify-center md:justify-end gap-[40px] h-full pt-[20px]">
                  {/* Image 1 (Large) */}
                  <div className="rounded-[26px] overflow-hidden bg-gray-200 w-full md:w-[480px] h-[250px] md:h-[400px] shrink-0 shadow-sm relative group cursor-pointer">
                    <img 
                      src={projects[0].images[0]} 
                      alt={projects[0].title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Image 2 (Small) */}
                  <div className="hidden md:block rounded-[24px] overflow-hidden bg-gray-200 w-[260px] h-[240px] shrink-0 shadow-sm mb-[0px] group cursor-pointer">
                    <img 
                      src={projects[0].images[1]} 
                      alt="Detail" 
                      className="w-full h-full object-cover"
                    />
                  </div>
              </div>

            </div>
          </div>

          {/* Bottom Row: Wander App & Synechron Cube */}
          <div className="flex flex-col md:flex-row gap-10 w-full max-w-[530px] md:max-w-none justify-between">
            
            {/* Card 2: Wander App */}
            <div 
              onMouseEnter={() => setHoveredIndex(1)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative bg-white rounded-[32px] w-full md:w-1/2 flex-1 shrink-0 flex flex-col cursor-pointer overflow-hidden"
            >
               {/* Gradient Background */}
               <div className="project-gradient-1 absolute inset-0 bg-gradient-to-b from-[#af4b70] to-[#ffffff] opacity-0 pointer-events-none z-0" />

               <div className="absolute inset-0 border-2 border-[rgba(99,99,99,0.17)] rounded-[32px] pointer-events-none z-20" />
               <div className="p-[37px] py-[25px] flex flex-col h-full flex-1 relative z-10">
                  <div className="flex flex-col gap-[36px] w-full h-full flex-1">
                     {/* Text Section */}
                     <div className="flex flex-col gap-[16px] w-full md:max-w-[455px]">
                        <div className="flex flex-col gap-[12px]">
                          <h3 className="project-title-1 font-['Instrument_Serif',serif] text-[32px] leading-[30px] tracking-[-1.92px] text-[#232125]">
                            {projects[1].title}
                          </h3>
                          <p className="project-desc-1 text-[#9f9fa9] text-[14px] leading-[17px] tracking-[-0.15px]">
                            {projects[1].description}
                          </p>
                        </div>
                        <div className="flex gap-[9px] flex-wrap">
                          {projects[1].tags.map((tag, i) => (
                             <Pill key={i} text={tag} color={projects[1].colors[i]} />
                          ))}
                        </div>
                     </div>
                     
                     {/* Image Section */}
                     <div className="rounded-[26px] overflow-hidden bg-gray-200 w-full h-[250px] md:h-[284px] shrink-0 shadow-sm mt-auto group cursor-pointer">
                        <img 
                          src={projects[1].images[0]} 
                          alt={projects[1].title} 
                          className="w-full h-full object-cover"
                        />
                     </div>
                  </div>
               </div>
            </div>

            {/* Card 3: Synechron Cube */}
            <div 
              onMouseEnter={() => setHoveredIndex(2)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative bg-white rounded-[32px] w-full md:w-1/2 flex-1 shrink-0 flex flex-col cursor-pointer overflow-hidden"
            >
               {/* Gradient Background */}
               <div className="project-gradient-2 absolute inset-0 bg-gradient-to-b from-[#af4b70] to-[#ffffff] opacity-0 pointer-events-none z-0" />

               <div className="absolute inset-0 border-2 border-[rgba(99,99,99,0.17)] rounded-[32px] pointer-events-none z-20" />
               <div className="p-[44px] py-[25px] flex flex-col h-full flex-1 relative z-10">
                  <div className="flex flex-col gap-[36px] w-full h-full flex-1">
                     {/* Text Section */}
                     <div className="flex flex-col gap-[16px] w-full md:max-w-[455px]">
                        <div className="flex flex-col gap-[12px]">
                          <h3 className="project-title-2 font-['Instrument_Serif',serif] text-[32px] leading-[30px] tracking-[-1.92px] text-[#232125]">
                            {projects[2].title}
                          </h3>
                          <p className="project-desc-2 text-[#9f9fa9] text-[14px] leading-[17px] tracking-[-0.15px]">
                            {projects[2].description}
                          </p>
                        </div>
                        <div className="flex gap-[9px] flex-wrap">
                          {projects[2].tags.map((tag, i) => (
                             <Pill key={i} text={tag} color={projects[2].colors[i]} />
                          ))}
                        </div>
                     </div>
                     
                     {/* Image Section */}
                     <div className="rounded-[26px] overflow-hidden bg-gray-200 w-full h-[250px] md:h-[284px] shrink-0 shadow-sm relative mt-auto group cursor-pointer">
                        <img 
                          src={projects[2].images[0]} 
                          alt={projects[2].title} 
                          className="w-full h-full object-cover"
                        />
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
