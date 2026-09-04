import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { CompilerNetwork } from '../components/ThreeScene/CompilerNetwork';
import { TributeMarquee } from '../components/TributeMarquee';
import { PrabhakarQuiz } from '../components/PrabhakarQuiz';
import { teachers } from '../data/teachers';

gsap.registerPlugin(ScrollTrigger);

const Prabhakar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = teachers.find(t => t.id === 'prabhakar');

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
    <div ref={containerRef} className="w-full min-h-screen bg-[#090a0f] text-[#e2e8f0] font-serif overflow-x-hidden relative selection:bg-[#f59e0b]/30">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 opacity-50 mix-blend-screen pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <fog attach="fog" args={['#090a0f', 5, 22]} />
          <CompilerNetwork />
        </Canvas>
      </div>

      {/* Code Syntax Subtle Overlay */}
      <div className="fixed inset-0 z-0 opacity-5 pointer-events-none font-mono text-xs text-[#f59e0b] overflow-hidden select-none p-4 leading-relaxed">
        <div>{`#include <iostream>`}</div>
        <div>{`using namespace std;`}</div>
        <div>{`class CompilerArchitect {`}</div>
        <div>{`  public: void teach() {`}</div>
        <div>{`    while(life) { learn(); debug(); innovate(); }`}</div>
        <div>{`  }`}</div>
        <div>{`};`}</div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 flex justify-between z-50 text-sm tracking-widest font-sans">
        <div className="text-[#f59e0b]/80 font-bold">TD 2026</div>
        <Link to="/" className="hover:text-[#f59e0b] transition-colors uppercase">← Return to Hub</Link>
      </nav>

      {/* Content wrapper */}
      <div className="relative z-10">
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
          <h2 className="hero-text text-3xl md:text-5xl font-bold text-[#f59e0b] tracking-widest uppercase mb-6 font-sans">
            Prabhakar Sir
          </h2>
          <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-bold mb-10 text-[#fafaf9] tracking-wide max-w-5xl leading-tight">
            “The One Who Taught Us to Debug Beyond the Code”
          </h1>
          <p className="hero-text text-xl md:text-3xl italic text-[#cbd5e1] max-w-3xl leading-relaxed border-t border-b border-[#f59e0b]/30 py-6">
            “You didn’t just teach us Compiler Design…
            <br className="hidden md:inline" />
            you taught us how to turn errors into lessons and code into endless possibilities.”
          </p>
        </section>

        {/* Short Appreciation Message */}
        <section className="scroll-section min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl mx-auto bg-[#12161f]/70 backdrop-blur-md border border-[#f59e0b]/30 p-10 md:p-16 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent opacity-60"></div>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#f59e0b] text-xs font-sans tracking-widest uppercase mb-8">
              <span>💻 Appreciation</span>
            </div>

            <h2 className="text-3xl md:text-5xl text-[#f59e0b] mb-10 font-bold">
              Turning Errors into Lessons
            </h2>
            
            <div className="space-y-8 text-xl md:text-2xl leading-relaxed text-[#cbd5e1] font-light">
              <p>
                From lexical analysis to code generation, you made Compiler Design feel structured, logical, and deeply rewarding.
              </p>
              <p>
                Beyond syntax and parsing, you taught us how to debug our mistakes with patience and write our futures with confidence.
              </p>
              <p className="text-[#fafaf9] font-medium italic pt-4 text-2xl md:text-3xl border-l-4 border-[#f59e0b] pl-6 my-6">
                Thank you, Prabhakar Sir, for guiding us through every layer of code! 💻✨
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Quiz Section */}
        <section className="scroll-section py-16">
          <PrabhakarQuiz />
        </section>

        {/* Final Thank You & Tribute Marquee */}
        <section className="scroll-section min-h-[80vh] flex flex-col items-center justify-center px-6 text-center pb-20">
          <TributeMarquee />
          <h2 className="text-5xl md:text-7xl font-sans font-bold text-[#fafaf9] mb-8 tracking-wide mt-8">
            Happy Teachers' Day
          </h2>
          <p className="text-2xl md:text-4xl text-[#f59e0b] italic mb-12 max-w-3xl leading-relaxed">
            “Thank you for helping us turn errors into lessons and code into possibilities.” 💻✨
          </p>
          <p className="text-xl md:text-2xl text-[#cbd5e1] mb-12 font-light tracking-wide">
            — Prabhakar Sir ❤️
          </p>
          
          <div className="mt-20 text-xs tracking-[0.3em] text-[#64748b] uppercase font-sans">
            Teachers' Day 2026 • Dedicated to Prabhakar Sir
          </div>
        </section>

      </div>
    </div>
  );
};

export default Prabhakar;
