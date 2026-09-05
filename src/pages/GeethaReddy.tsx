import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { CompilerNetwork } from '../components/ThreeScene/CompilerNetwork';
import { TributeMarquee } from '../components/TributeMarquee';
import { GeethaReddyQuiz } from '../components/GeethaReddyQuiz';

gsap.registerPlugin(ScrollTrigger);

const GeethaReddy: React.FC = () => {
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
    <div ref={containerRef} className="w-full min-h-screen bg-[#0a0507] text-[#e2e8f0] font-serif overflow-x-hidden relative selection:bg-pink-500/30">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 opacity-50 mix-blend-screen pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <fog attach="fog" args={['#0a0507', 5, 22]} />
          {/* Using CompilerNetwork as a background element, but you can change this if needed */}
          <CompilerNetwork />
        </Canvas>
      </div>

      {/* Subtle Overlay */}
      <div className="fixed inset-0 z-0 opacity-5 pointer-events-none font-mono text-xs text-pink-500 overflow-hidden select-none p-4 leading-relaxed">
        <div>{`DISCIPLINE_LEVEL = 100%`}</div>
        <div>{`ATTENDANCE_REQUIRED = true`}</div>
        <div>{`class BestHOD {`}</div>
        <div>{`  public: void guideStudents() {`}</div>
        <div>{`    while(academic_year) { care(); guide(); inspire(); }`}</div>
        <div>{`  }`}</div>
        <div>{`};`}</div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 flex justify-between z-50 text-sm tracking-widest font-sans">
        <div className="text-pink-500/80 font-bold">TD 2026</div>
        <Link to="/" className="hover:text-pink-500 transition-colors uppercase">← Return to Hub</Link>
      </nav>

      {/* Content wrapper */}
      <div className="relative z-10">
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
          <h2 className="hero-text text-3xl md:text-5xl font-bold text-pink-500 tracking-widest uppercase mb-6 font-sans">
            Geetha Reddy Mam
          </h2>
          <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-bold mb-10 text-[#fafaf9] tracking-wide max-w-5xl leading-tight">
            “The Best HOD We Could Ever Have”
          </h1>
          <p className="hero-text text-xl md:text-3xl italic text-[#cbd5e1] max-w-3xl leading-relaxed border-t border-b border-pink-500/30 py-6">
            “You didn’t just enforce discipline…
            <br className="hidden md:inline" />
            you guided us with care and pushed us to be the best versions of ourselves.”
          </p>
        </section>

        {/* Short Appreciation Message */}
        <section className="scroll-section min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl mx-auto bg-[#1a0f1c]/70 backdrop-blur-md border border-pink-500/30 p-10 md:p-16 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-60"></div>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-500 text-xs font-sans tracking-widest uppercase mb-8">
              <span>👑 Appreciation</span>
            </div>

            <h2 className="text-3xl md:text-5xl text-pink-500 mb-10 font-bold">
              Discipline with a Caring Heart
            </h2>
            
            <div className="space-y-8 text-xl md:text-2xl leading-relaxed text-[#cbd5e1] font-light">
              <p>
                From making sure we attend our classes to ensuring we excel in our academics, you have always been the pillar of strength for our department.
              </p>
              <p>
                Strict on the outside but incredibly caring on the inside, you truly are the best HOD we could ever ask for.
              </p>
              <p className="text-[#fafaf9] font-medium italic pt-4 text-2xl md:text-3xl border-l-4 border-pink-500 pl-6 my-6">
                Thank you, Mam, for always looking out for us! ✨
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Quiz Section */}
        <section className="scroll-section py-16">
          <GeethaReddyQuiz />
        </section>

        {/* Final Thank You & Tribute Marquee */}
        <section className="scroll-section min-h-[80vh] flex flex-col items-center justify-center px-6 text-center pb-20">
          <TributeMarquee />
          <h2 className="text-5xl md:text-7xl font-sans font-bold text-[#fafaf9] mb-8 tracking-wide mt-8">
            Happy Teachers' Day
          </h2>
          <p className="text-2xl md:text-4xl text-pink-500 italic mb-12 max-w-3xl leading-relaxed">
            “Thank you for keeping us disciplined, guiding us, and being the best HOD we could ever ask for.” ✨
          </p>
          <p className="text-xl md:text-2xl text-[#cbd5e1] mb-12 font-light tracking-wide">
            — Geetha Reddy Mam ❤️
          </p>
          
          <div className="mt-20 text-xs tracking-[0.3em] text-[#64748b] uppercase font-sans">
            Teachers' Day 2026 • Dedicated to Geetha Reddy Mam
          </div>
        </section>

      </div>
    </div>
  );
};

export default GeethaReddy;
