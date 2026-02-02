import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ProjectRowProps {
  title: string;
  date: string;
  category: string;
  index: number;
  bgImageUrl: string;
  description: string;
  image1: string;
  image2: string;
}

export function ProjectRow({ title, date, category, index, bgImageUrl, description, image1, image2 }: ProjectRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLParagraphElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const bgOverlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);

  // --- Layout Constants for Consistency ---
  const PADDING = 30;          // Consistent padding for Top, Bottom, Left, Right
  const GAP = 30;              // Gap between images (matches Padding)
  const EXPANDED_HEIGHT = 350; // Total height of the row when expanded
  
  // Image 1 (Large) - Stretches to fill vertical space minus padding
  const IMG1_WIDTH = 368;
  const IMG1_HEIGHT = EXPANDED_HEIGHT - (PADDING * 2); // 350 - 60 = 290px
  
  // Image 2 (Small) - Aligned to the bottom of Image 1
  const IMG2_WIDTH = 250;
  const IMG2_HEIGHT = 183;
  // Top position = (Top of Image 1 + Height of Image 1) - Height of Image 2
  const IMG2_TOP = (PADDING + IMG1_HEIGHT) - IMG2_HEIGHT; 

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleMouseEnter = contextSafe(() => {
    // Expand height FAST
    gsap.to(containerRef.current, {
      height: EXPANDED_HEIGHT,
      duration: 0.3,
      ease: "power2.out",
      overwrite: true
    });
    
    // Date and Category move UP (Bottom -> Top) and fade out
    gsap.to([dateRef.current, categoryRef.current], {
      y: -20,
      opacity: 0,
      duration: 0.15,
      ease: "power1.out",
      overwrite: true
    });

    // Description fades in and moves DOWN (Top -> Bottom)
    gsap.fromTo(descriptionRef.current, 
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.25,
        delay: 0.1, 
        ease: "power2.out",
        overwrite: true
      }
    );

    // Fade out white overlay to reveal fixed background
    gsap.to(bgOverlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
      overwrite: true
    });

    // Change title text to white
    gsap.to(titleRef.current, {
      color: "#FFFFFF",
      duration: 0.2,
      ease: "power2.out",
      overwrite: true
    });

    // Images move DOWN (Top -> Bottom)
    gsap.fromTo([image1Ref.current, image2Ref.current], 
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.35,
        stagger: 0.05,
        ease: "power2.out",
        overwrite: true
      }
    );
  });

  const handleMouseLeave = contextSafe(() => {
    // Restore height FAST
    gsap.to(containerRef.current, {
      height: 105,
      duration: 0.3,
      ease: "power2.out",
      overwrite: true
    });

    // Restore Date and Category (Move back DOWN from Top to position)
    gsap.to([dateRef.current, categoryRef.current], {
      y: 0,
      opacity: 1,
      duration: 0.25,
      delay: 0.1,
      ease: "power2.out",
      overwrite: true
    });

    // Description fades out and moves back UP (Bottom -> Top)
    gsap.to(descriptionRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.15,
      ease: "power1.out",
      overwrite: true
    });

    // Restore white overlay
    gsap.to(bgOverlayRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
      overwrite: true
    });

    // Restore title text color
    gsap.to(titleRef.current, {
      color: "#393939",
      duration: 0.2,
      ease: "power2.out",
      overwrite: true
    });

    // Images move back UP (Bottom -> Top) and fade out
    gsap.to([image1Ref.current, image2Ref.current], {
      y: -50,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      overwrite: true
    });
  });

  return (
    <div 
      ref={containerRef}
      className="w-full border-t border-[#1e1e1e] h-[105px] relative overflow-hidden cursor-pointer group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundImage: `url(${bgImageUrl})`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* White Overlay - Fades out on hover */}
      <div 
        ref={bgOverlayRef}
        className="absolute inset-0 bg-white z-0"
      />

      {/* Hover Images */}
      {/* Image 2 (Small Landscape) - Aligned to bottom of Image 1 */}
      <div 
        ref={image2Ref}
        className="absolute z-20 bg-cover bg-center opacity-0 translate-y-[-50px]"
        style={{ 
          backgroundImage: `url(${image2})`,
          width: `${IMG2_WIDTH}px`,
          height: `${IMG2_HEIGHT}px`,
          right: `${PADDING + IMG1_WIDTH + GAP}px`, // PADDING + IMG1_WIDTH + GAP
          top: `${IMG2_TOP}px`
        }}
      />
      
      {/* Image 1 (Large Square-ish) - Extended height */}
      <div 
        ref={image1Ref}
        className="absolute z-20 bg-cover bg-center opacity-0 translate-y-[-50px]"
        style={{ 
          backgroundImage: `url(${image1})`,
          width: `${IMG1_WIDTH}px`,
          height: `${IMG1_HEIGHT}px`,
          right: `${PADDING}px`,
          top: `${PADDING}px`
        }}
      />

      {/* Content Wrapper - Symmetric Padding */}
      <div 
        className="relative z-30 flex items-start justify-between w-full"
        style={{ 
          paddingTop: `${PADDING}px`,
          paddingLeft: `${PADDING}px`, 
          paddingRight: `${PADDING}px` 
        }}
      >
          {/* Left Side: Title */}
          <div className="shrink-0 relative z-40">
             <h2 
               ref={titleRef}
               className="font-['Instrument_Serif'] italic text-[40px] leading-[0.704] text-[#393939] tracking-[-2px]"
             >
                {title}
             </h2>
          </div>

          {/* Middle: Date/Description */}
          {/* Kept at 26% from left */}
          <div className="absolute left-[26%] top-0 w-[300px]" style={{ top: `${PADDING}px` }}>
             {/* Date (Default) - Left Aligned */}
             <p 
               ref={dateRef}
               className="font-sans text-[16px] leading-[0.704] text-black tracking-[-0.8px] text-left w-full relative z-30"
             >
                {date}
             </p>

             {/* Description (Hover) - Left Aligned */}
             <p 
               ref={descriptionRef}
               className="font-sans text-[16px] leading-[1.22] text-white tracking-[-0.8px] w-[280px] opacity-0 absolute top-0 left-0 text-left z-30"
             >
                {description}
             </p>
          </div>

          {/* Right Side: Category */}
          <div 
            ref={categoryRef}
            className="flex justify-end shrink-0 relative z-30"
          >
             <p className="font-sans text-[16px] leading-[0.704] text-black tracking-[-0.8px] text-right">
                {category}
             </p>
          </div>
      </div>
    </div>
  );
}
