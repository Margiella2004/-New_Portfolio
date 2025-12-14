import React, { useRef } from 'react';
import { Projects } from './components/Projects';
import { motion, useScroll, useTransform } from 'motion/react';

export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <div ref={containerRef} className="relative bg-black min-h-screen">
      
      {/* Sticky Hero Section */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden z-0">
        <motion.div 
          style={{ opacity, scale }} 
          className="flex flex-col items-center text-center px-4 max-w-4xl"
        >
          <h1 className="text-6xl md:text-8xl font-['Instrument_Serif',serif] text-white tracking-tight mb-6 leading-none">
            Selected <br/> Works
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto font-light tracking-wide mb-12">
            Engineering background meets design education to build the best products for users.
          </p>
          <div className="animate-bounce">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-50">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
            </svg>
          </div>
        </motion.div>
        
        {/* Background Gradient Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(50,50,50,0.4),_transparent_70%)] pointer-events-none" />
      </div>

      {/* Main Content Wrapper - Slides up over the sticky hero */}
      <div className="relative z-10 w-full">
        <Projects />
      </div>
      
    </div>
  );
}
