import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { NetworkTopology } from '../components/ThreeScene/NetworkTopology';
import { TributeMarquee } from '../components/TributeMarquee';
import { NagaSirishaQuiz } from '../components/NagaSirishaQuiz';


gsap.registerPlugin(ScrollTrigger);

const NagaSirisha: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.fromTo('.hero-text', 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 2, stagger: 0.4, ease: 'power2.out', delay: 0.5 }
      );

      // Section animations on scroll
      const sections = gsap.utils.toArray('.scroll-section');
      sections.forEach((sec: any) => {
        gsap.fromTo(sec,
          { opacity: 0, y: 40 },
          {
            opacity: 1, 
            y: 0, 
            duration: 1.5, 
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
            }
          }
        );
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-[#09131d] text-[#e2e8f0] font-serif overflow-x-hidden relative selection:bg-[#06b6d4]/30">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 opacity-50 mix-blend-screen pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <fog attach="fog" args={['#09131d', 5, 22]} />
          <NetworkTopology />
        </Canvas>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 flex justify-between z-50 text-sm tracking-widest font-sans">
        <div className="text-[#06b6d4]/80 font-bold">TD 2026</div>
        <Link to="/" className="hover:text-[#06b6d4] transition-colors uppercase">← Return to Hub</Link>
      </nav>

      {/* Content wrapper */}
      <div className="relative z-10">
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
          <h2 className="hero-text text-3xl md:text-5xl font-bold text-[#06b6d4] tracking-widest uppercase mb-6 font-sans">
            Naga Sirisha Ma’am
          </h2>
          <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-bold mb-10 text-[#fafaf9] tracking-wide max-w-5xl leading-tight">
            “The One Who Kept Us Connected Beyond the Classroom”
          </h1>
          <p className="hero-text text-xl md:text-3xl italic text-[#cbd5e1] max-w-3xl leading-relaxed border-t border-b border-[#06b6d4]/30 py-6">
            “You didn’t just teach us Computer Networks…
            <br className="hidden md:inline" />
            you kept us connected to knowledge, guidance, and inspiration every single day.”
          </p>
        </section>

        {/* Short Appreciation Message */}
        <section className="scroll-section min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl mx-auto bg-[#0e1a26]/70 backdrop-blur-md border border-[#06b6d4]/30 p-10 md:p-16 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#06b6d4] to-transparent opacity-60"></div>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/30 text-[#06b6d4] text-xs font-sans tracking-widest uppercase mb-8">
              <span>🌐 Appreciation</span>
            </div>

            <h2 className="text-3xl md:text-5xl text-[#06b6d4] mb-10 font-bold">
              Connecting Minds & Bridging Learning
            </h2>
            
            <div className="space-y-8 text-xl md:text-2xl leading-relaxed text-[#cbd5e1] font-light">
              <p>
                From OSI layers to network protocols, you made Computer Networks feel seamless, intuitive, and engaging.
              </p>
              <p>
                Beyond data packets and routing, you taught us how to build strong connections and navigate life's challenges with confidence.
              </p>
              <p className="text-[#fafaf9] font-medium italic pt-4 text-2xl md:text-3xl border-l-4 border-[#06b6d4] pl-6 my-6">
                Thank you, Naga Sirisha Ma’am, for always keeping us connected to learning! 🌐✨
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Quiz Section */}
        <section className="scroll-section py-16">
          <NagaSirishaQuiz />
        </section>

        {/* Final Thank You & Tribute Marquee */}
        <section className="scroll-section min-h-[80vh] flex flex-col items-center justify-center px-6 text-center pb-20">
          <TributeMarquee />
          <h2 className="text-5xl md:text-7xl font-sans font-bold text-[#fafaf9] mb-8 tracking-wide mt-8">
            Happy Teachers' Day
          </h2>
          <p className="text-2xl md:text-4xl text-[#06b6d4] italic mb-12 max-w-3xl leading-relaxed">
            “Thank you for always keeping us connected to knowledge, even when our own networks seemed to disconnect!” 🌐❤️
          </p>
          <p className="text-xl md:text-2xl text-[#cbd5e1] mb-12 font-light tracking-wide">
            — Naga Sirisha Ma’am ❤️
          </p>
          
          <div className="mt-20 text-xs tracking-[0.3em] text-[#64748b] uppercase font-sans">
            Teachers' Day 2026 • Dedicated to Naga Sirisha Ma’am
          </div>
        </section>

      </div>
    </div>
  );
};

export default NagaSirisha;
