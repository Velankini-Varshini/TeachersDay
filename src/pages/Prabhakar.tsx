import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { NetworkNodes } from '../components/ThreeScene/NetworkNodes';
import { TributeMarquee } from '../components/TributeMarquee';
import { teachers } from '../data/teachers';

gsap.registerPlugin(ScrollTrigger);

const Prabhakar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = teachers.find(t => t.id === 'prabhakar');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.fromTo('.glitch-text',
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1.5, ease: 'power3.out', stagger: 0.2 }
      );

      // Section animations: Timeline
      const timelineWords = gsap.utils.toArray('.timeline-word');
      
      timelineWords.forEach((word: any) => {
        gsap.fromTo(word,
          { opacity: 0, scale: 0.5, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: word,
              start: 'top 85%',
            }
          }
        );
      });
      
      // Connect line animation
      gsap.fromTo('.connect-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 70%',
            end: 'bottom 50%',
            scrub: true
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const timeline = ["THINK", "QUESTION", "EXPLORE", "BUILD", "INNOVATE"];

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-gray-950 text-cyan-50 font-mono overflow-x-hidden relative selection:bg-cyan-900 selection:text-white">
      
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 15] }}>
          <fog attach="fog" args={['#030712', 10, 30]} />
          <NetworkNodes />
        </Canvas>
      </div>

      {/* Grid Overlay */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 flex justify-between z-50 text-cyan-400 text-xs tracking-[0.2em]">
        <div>TD 2026 // NODE_02</div>
        <Link to="/" className="hover:text-cyan-200 transition-colors uppercase">← Return to Hub</Link>
      </nav>

      <div className="relative z-10 w-full md:w-1/2 ml-auto">
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center px-8 md:px-20 border-l border-cyan-900/50 bg-gray-950/40 backdrop-blur-sm">
          <p className="glitch-text text-violet-400 tracking-[0.3em] uppercase text-sm mb-6">The Innovator</p>
          <h1 className="glitch-text text-6xl md:text-8xl font-black mb-8 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
            {data?.fullName?.toUpperCase()}
          </h1>
          <p className="glitch-text text-xl md:text-2xl text-cyan-200/80 max-w-xl leading-relaxed border-l-4 border-violet-500 pl-6">
            "You showed us that innovation isn't just about technology; it's a mindset."
          </p>
        </section>

        {/* Timeline Section */}
        <section className="timeline-container min-h-[150vh] flex flex-col px-8 md:px-20 py-32 relative border-l border-cyan-900/50 bg-gray-950/40 backdrop-blur-sm">
          
          <div className="absolute left-10 md:left-24 top-32 bottom-32 w-1 bg-cyan-900/50 origin-top overflow-hidden">
            <div className="connect-line w-full h-full bg-gradient-to-b from-cyan-400 to-violet-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] origin-top"></div>
          </div>
          
          <div className="ml-12 md:ml-20 h-full flex flex-col justify-between space-y-32">
            {timeline.map((word, i) => (
              <div key={i} className="timeline-word relative">
                <div className="absolute -left-[58px] md:-left-[90px] top-4 w-4 h-4 bg-gray-950 border-2 border-cyan-400 rounded-full z-10 shadow-[0_0_10px_rgba(6,182,212,1)]"></div>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white opacity-90 hover:text-cyan-300 transition-colors">{word}</h2>
              </div>
            ))}
          </div>
        </section>

        {/* Content Section */}
        <section className="min-h-screen flex flex-col justify-center px-8 md:px-20 border-l border-cyan-900/50 bg-gray-950/40 backdrop-blur-sm">
          <div className="bg-gray-900/50 p-10 border border-cyan-500/20 rounded-xl backdrop-blur-md hover:border-cyan-500/50 transition-colors duration-500">
            <h3 className="text-2xl text-violet-400 mb-6 font-bold tracking-widest">SYSTEM_LOG // MEMORY</h3>
            <p className="text-lg text-cyan-100 leading-relaxed mb-8">
              {data?.placeholders.message}
            </p>
            <div className="border-t border-cyan-900/50 pt-6">
              <p className="italic text-cyan-300/70">
                {data?.placeholders.memories[0]}
              </p>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <section className="min-h-[80vh] flex flex-col justify-center px-8 md:px-20 border-l border-cyan-900/50 bg-gray-950/40 backdrop-blur-sm pb-20 overflow-hidden">
          <TributeMarquee />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tighter mt-8">EXECUTE: THANK_YOU</h2>
          <p className="text-xl text-cyan-300 italic mb-16 leading-relaxed max-w-xl">
            {data?.placeholders.appreciation}
          </p>
          <div className="text-xs tracking-[0.4em] text-cyan-600 uppercase">
            END OF SEQUENCE
          </div>
        </section>

      </div>
    </div>
  );
};

export default Prabhakar;
