import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { WireframeStructure } from '../components/ThreeScene/WireframeStructure';
import { TributeMarquee } from '../components/TributeMarquee';
import { teachers } from '../data/teachers';

gsap.registerPlugin(ScrollTrigger);

const Sindhuja: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = teachers.find(t => t.id === 'sindhuja');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.fromTo('.blueprint-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: 'power3.inOut', stagger: 0.2 }
      );
      gsap.fromTo('.hero-text',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.5, stagger: 0.2 }
      );

      // SVG Path Drawing animation
      const path = document.querySelector('.blueprint-path') as SVGPathElement;
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true
          }
        });
      }

      // Reveal sections on scroll
      const reveals = gsap.utils.toArray('.blueprint-reveal');
      reveals.forEach((elem: any) => {
        gsap.fromTo(elem,
          { opacity: 0, filter: 'blur(10px)', x: -30 },
          {
            opacity: 1, 
            filter: 'blur(0px)',
            x: 0, 
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: elem,
              start: 'top 80%'
            }
          }
        );
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-[#0a1128] text-blue-100 font-mono overflow-x-hidden relative selection:bg-blue-500/30">
      
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <WireframeStructure />
        </Canvas>
      </div>

      {/* Technical Grid Overlay */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>

      {/* SVG Path line running down the page */}
      <div className="fixed top-0 left-[10%] md:left-1/2 w-full h-full z-0 pointer-events-none overflow-visible">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <path 
            className="blueprint-path" 
            d="M 0 0 V 300 H 200 V 600 H -200 V 1000 H 100 V 1500 H -100 V 2000 H 0 V 3000" 
            fill="none" 
            stroke="#38bdf8" 
            strokeWidth="2"
            style={{ filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.8))' }}
          />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 flex justify-between z-50 text-blue-400 font-bold text-xs uppercase tracking-widest border-b border-blue-900/30 bg-[#0a1128]/80 backdrop-blur-md">
        <div>TD 2026 // DRAFT_05</div>
        <Link to="/" className="hover:text-white transition-colors">← Return to Hub</Link>
      </nav>

      <div className="relative z-10 px-6 md:px-20 py-32 max-w-5xl mx-auto">
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center relative">
          <div className="blueprint-line h-px bg-blue-500/50 w-full mb-8 transform origin-left"></div>
          <div className="flex items-center gap-4 mb-4 hero-text">
            <span className="w-4 h-4 border-2 border-blue-400 rounded-sm inline-block"></span>
            <p className="text-blue-400 tracking-[0.3em] uppercase text-sm">The Architect</p>
          </div>
          <h1 className="hero-text text-5xl md:text-7xl font-bold mb-6 text-white tracking-tighter">
            MRS. SINDHUJA
          </h1>
          <p className="hero-text text-xl md:text-2xl text-blue-200/80 max-w-2xl leading-relaxed bg-[#0a1128]/50 p-4 border-l-2 border-blue-500 backdrop-blur-sm">
            "You laid the foundation for our analytical thinking. Step by step, you showed us how to deconstruct problems and engineer brilliant solutions."
          </p>
          <div className="blueprint-line h-px bg-blue-500/50 w-full mt-12 transform origin-right"></div>
        </section>

        {/* Blueprint Details Section */}
        <section className="min-h-screen flex flex-col justify-center py-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
            
            <div className="blueprint-reveal bg-[#0a1128]/80 border border-blue-900 p-8 md:p-12 backdrop-blur-xl relative group hover:border-blue-500 transition-colors duration-500">
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-400"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-blue-400"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-blue-400"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-400"></div>
              
              <h3 className="text-xl text-blue-400 mb-6 uppercase tracking-widest font-bold">STRUCTURAL INTEGRITY</h3>
              <p className="text-blue-100 leading-relaxed text-lg">
                {data?.placeholders.message}
              </p>
            </div>

            <div className="blueprint-reveal bg-[#0a1128]/80 border border-blue-900 p-8 md:p-12 backdrop-blur-xl relative mt-12 md:mt-32 group hover:border-blue-500 transition-colors duration-500">
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blue-400"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-blue-400"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-blue-400"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-blue-400"></div>
              
              <h3 className="text-xl text-blue-400 mb-6 uppercase tracking-widest font-bold">SCHEMATIC LOGS</h3>
              <p className="text-blue-100 leading-relaxed text-lg italic opacity-90">
                "{data?.placeholders.memories[0]}"
              </p>
            </div>
            
          </div>
        </section>

        {/* Footer Section */}
        <section className="min-h-[90vh] flex flex-col justify-center items-center text-center py-20 relative overflow-visible w-full">
          <div className="blueprint-line h-px bg-blue-500/50 w-full mb-16 transform origin-center"></div>
          
          <div className="w-[100vw] relative left-1/2 -translate-x-1/2">
            <TributeMarquee />
          </div>
          
          <h2 className="blueprint-reveal text-4xl md:text-6xl font-bold mt-8 mb-8 text-white">Happy Teachers' Day</h2>
          <p className="blueprint-reveal text-xl text-blue-300 italic mb-20 max-w-2xl bg-[#0a1128]/80 backdrop-blur-sm p-4 rounded-lg border border-blue-900/50">
            {data?.placeholders.appreciation}
          </p>

          <div className="w-full flex justify-between items-end border-b border-blue-900/50 pb-4 text-xs text-blue-500/50 uppercase tracking-[0.3em]">
            <span>SCALE: 1:1</span>
            <span>DATE: 05.09.2026</span>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Sindhuja;
