import gsap from "gsap";
import Draggable from "gsap/Draggable";
import React, { useEffect, useRef } from "react";
import { svgPaths } from "../utils/svgPaths";
import imgDesignEngineer from "figma:asset/b919943d44f3d20ab4b2764a9146a7eda4800b86.png";

gsap.registerPlugin(Draggable);

// --- Tab Components ---

// Reusable Tab Frame Component
function TabFrame({ text, color, width = "auto" }: { text: string; color: string; width?: string }) {
  return (
    <div className={`relative h-[32px] rounded-[22px] ${width !== "auto" ? width : ""} px-[20px] flex items-center justify-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] z-20`} style={{ backgroundColor: color }}>
      <p className="font-['Inter',sans-serif] font-medium text-[13.1px] leading-[17.7px] tracking-[-0.31px] text-center text-nowrap text-white relative z-10">
        {text}
      </p>
      <div 
        aria-hidden="true" 
        className="absolute inset-0 border-[1.1px] border-[rgba(255,255,255,0.74)] border-solid pointer-events-none rounded-[22px]" 
      />
    </div>
  );
}

// Reusable Arrow Component
function Arrow({ color, rotation, positionStyle, delay = 0 }: { color: string; rotation: number; positionStyle: React.CSSProperties, delay?: number }) {
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!arrowRef.current) return;

    gsap.set(arrowRef.current, { rotation });

    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "sine.inOut" },
      delay,
    });

    tl.to(arrowRef.current, { rotation: rotation + 3, x: 2.5, y: -2.5, duration: 2.25 })
      .to(arrowRef.current, { rotation: rotation - 3, x: -2.5, y: 2.5, duration: 2.25 })
      .to(arrowRef.current, { rotation, x: 0, y: 0, duration: 2 });

    return () => {
      tl.kill();
    };
  }, [rotation, delay]);

  return (
    <div 
      ref={arrowRef}
      className="absolute flex items-center justify-center w-[22px] h-[22px] z-10 pointer-events-none" 
      style={positionStyle}
    >
      <div className="w-full h-full">
        <svg className="block w-full h-full" fill="none" viewBox="0 0 20 20">
          <g>
            <path d={svgPaths.pe1f3e80} fill={color} />
            <path 
              d={svgPaths.p1361c940} 
              stroke="white" 
              strokeLinejoin="bevel" 
              strokeOpacity="0.74" 
              strokeWidth="1.09" 
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

// UI Design Tab (Green)
function UiDesignTab({ rotation }: { rotation: number }) {
  return (
    <div className="relative w-[138px] h-[32px] flex flex-col items-end">
      <TabFrame text="UI Design" color="#bad7a8" width="w-full" />
      <Arrow 
        color="#bad7a8" 
        rotation={rotation} 
        delay={0.2}
        positionStyle={{ 
          top: '100%', 
          right: '15px', 
          marginTop: '4px' 
        }} 
      />
    </div>
  );
}

// Typography Tab (Yellow)
function TypographyTab({ rotation }: { rotation: number }) {
  return (
    <div className="relative w-[152px] h-[32px] flex flex-col items-start">
      <TabFrame text="Typography" color="#d7d6a8" width="w-full" />
      <Arrow 
        color="#d7d6a8" 
        rotation={rotation} 
        delay={1.5}
        positionStyle={{ 
          top: '100%', 
          left: '15px', 
          marginTop: '4px' 
        }} 
      />
    </div>
  );
}

// Creative Direction Tab (Pink)
function CreativeDirectionTab({ rotation }: { rotation: number }) {
  return (
    <div className="relative w-[188px] h-[32px] flex flex-col items-start">
      <Arrow 
        color="#d7a8cc" 
        rotation={rotation} 
        delay={0.8}
        positionStyle={{ 
          top: '100%', 
          left: '50%', 
          marginLeft: '-11px',
          marginTop: '4px' 
        }} 
      />
      <TabFrame text="Creative Direction" color="#d7a8cc" width="w-full" />
    </div>
  );
}

// Branding Tab (Dark Pink/Red)
function BrandingTab({ rotation }: { rotation: number }) {
  return (
    <div className="relative w-[135px] h-[32px] flex flex-col items-end">
      <TabFrame text="Branding" color="#d7a8a8" width="w-full" />
      <Arrow 
        color="#d7a8a8" 
        rotation={rotation} 
        delay={2.1}
        positionStyle={{ 
          top: '100%', 
          right: '30px', 
          marginTop: '4px' 
        }} 
      />
    </div>
  );
}

// UX Research Tab (Purple)
function UxResearchTab({ rotation }: { rotation: number }) {
  return (
    <div className="relative w-[158px] h-[32px] flex flex-col items-start">
      <TabFrame text="UX Research" color="#aaa8d7" width="w-full" />
      <Arrow 
        color="#aaa8d7" 
        rotation={rotation} 
        delay={2.6}
        positionStyle={{ 
          top: '100%', 
          left: '30px', 
          marginTop: '4px' 
        }} 
      />
    </div>
  );
}

// --- Main Hero Component ---

export function Hero() {
  return (
    <div className="relative flex flex-col items-center w-full h-screen min-h-[800px] overflow-hidden">
      
      {/* Floating Elements Container */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        
        {/* Branding - Left, above "Design" */}
        <FloatingElement 
          className="bottom-[33%] left-[10%] md:left-[15%]"
          delay={2.1}
        >
          <BrandingTab rotation={105} />
        </FloatingElement>

        {/* UI Design - Center-Left, above "Design" */}
        <FloatingElement 
          className="bottom-[36%] left-[30%] md:left-[35%]"
          delay={0}
        >
          <UiDesignTab rotation={-74} />
        </FloatingElement>

        {/* Typography - Right, above "Engineer" */}
        <FloatingElement 
          className="bottom-[35%] right-[10%] md:right-[15%]"
          delay={1.5}
        >
          <TypographyTab rotation={-57} />
        </FloatingElement>

        {/* UX Research - Bottom Left, below "Design" */}
        <FloatingElement 
          className="bottom-[12%] left-[25%] md:left-[28%]"
          delay={2.6}
        >
          <UxResearchTab rotation={-38} />
        </FloatingElement>

        {/* Creative Direction - Bottom Right, below "Engineer" */}
        <FloatingElement 
          className="bottom-[10%] right-[20%] md:right-[25%]"
          delay={3}
        >
          <CreativeDirectionTab rotation={272} />
        </FloatingElement>

      </div>

      {/* Spacer to push text to bottom */}
      <div className="flex-grow" />

      {/* Bottom Main Title Image */}
      <div className="z-10 relative pointer-events-none w-full flex justify-center px-4 pb-[82px]">
        <img 
          src={imgDesignEngineer} 
          alt="Design Engineer" 
          className="w-full max-w-[1600px] h-auto object-contain drop-shadow-sm select-none opacity-90"
        />
      </div>

    </div>
  );
}

function FloatingElement({ children, className, delay }: { 
  children: React.ReactNode; 
  className?: string;
  delay: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    gsap.set(contentRef.current, { opacity: 0, scale: 0.8 });

    const tl = gsap.timeline({ delay });

    tl.to(contentRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
    });

    const floatY = gsap.to(contentRef.current, {
      y: -8,
      duration: 8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay,
    });

    const floatX = gsap.to(contentRef.current, {
      x: 4,
      duration: 9,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: delay + 0.5,
    });

    const hoverIn = () => gsap.to(contentRef.current, { scale: 1.05, duration: 0.2, ease: "power1.out" });
    const hoverOut = () => gsap.to(contentRef.current, { scale: 1, duration: 0.2, ease: "power1.out" });
    const press = () => gsap.to(contentRef.current, { scale: 1.1, duration: 0.15, ease: "power1.out" });
    const release = () => gsap.to(contentRef.current, { scale: 1, duration: 0.2, ease: "power1.out" });

    const node = contentRef.current;
    node.addEventListener("pointerenter", hoverIn);
    node.addEventListener("pointerleave", hoverOut);

    const draggable = Draggable.create(node, {
      type: "x,y",
      inertia: false,
      onPress() {
        node.style.cursor = "grabbing";
        node.style.zIndex = "50";
        press();
      },
      onRelease() {
        node.style.cursor = "grab";
        node.style.zIndex = "";
        release();
      },
      onDrag() {
        node.style.cursor = "grabbing";
      },
      onDragEnd() {
        node.style.cursor = "grab";
      },
    });

    node.style.cursor = "grab";

    return () => {
      tl.kill();
      floatX.kill();
      floatY.kill();
      draggable[0]?.kill();
      node.removeEventListener("pointerenter", hoverIn);
      node.removeEventListener("pointerleave", hoverOut);
    };
  }, [delay]);

  return (
    <div className={`absolute ${className} pointer-events-auto touch-none`}>
      <div ref={contentRef} className="transform -translate-x-1/2 -translate-y-1/2 relative">
        {children}
      </div>
    </div>
  );
}
