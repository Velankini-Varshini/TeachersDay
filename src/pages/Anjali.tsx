import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { AINetwork } from '../components/ThreeScene/AINetwork';
import { TributeMarquee } from '../components/TributeMarquee';
import { AnjaliQuiz } from '../components/AnjaliQuiz';
import { teachers } from '../data/teachers';

gsap.registerPlugin(ScrollTrigger);

const Anjali: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = teachers.find(t => t.id === 'anjali');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle Intro animations
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
    <div ref={containerRef} className="w-full min-h-screen bg-[#090d16] text-[#e2e8f0] font-serif overflow-x-hidden relative">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 opacity-50 mix-blend-screen pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <fog attach="fog" args={['#090d16', 5, 22]} />
          <AINetwork />
        </Canvas>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 flex justify-between z-50 text-sm tracking-widest font-sans">
        <div className="text-[#38bdf8]/80 font-bold">TD 2026</div>
        <Link to="/" className="hover:text-[#38bdf8] transition-colors uppercase">← Return to Hub</Link>
      </nav>

      {/* Content wrapper */}
      <div className="relative z-10">
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
          <h2 className="hero-text text-3xl md:text-5xl font-bold text-[#38bdf8] tracking-widest uppercase mb-6 font-sans">
            Anjali Ma'am
          </h2>
          <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-bold mb-10 text-[#f8fafc] tracking-wide max-w-5xl leading-tight">
            “The One Who Inspired Us to Think Beyond Algorithms”
          </h1>
          <p className="hero-text text-xl md:text-3xl italic text-[#cbd5e1] max-w-3xl leading-relaxed border-t border-b border-[#38bdf8]/30 py-6">
            “You didn’t just teach us Artificial Intelligence…
            <br className="hidden md:inline" />
            you taught us to think smarter, question deeper, and see possibilities beyond what we already know.”
          </p>
        </section>

        {/* Short Appreciation Message */}
        <section className="scroll-section min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl mx-auto bg-[#0f172a]/60 backdrop-blur-md border border-[#38bdf8]/30 p-10 md:p-16 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent opacity-60"></div>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-[#38bdf8] text-xs font-sans tracking-widest uppercase mb-8">
              <span>🤖 Appreciation</span>
            </div>

            <h2 className="text-3xl md:text-5xl text-[#38bdf8] mb-10 font-bold">
              Shaping Intelligence & Inspiring Minds
            </h2>
            
            <div className="space-y-8 text-xl md:text-2xl leading-relaxed text-[#cbd5e1] font-light">
              <p>
                From neural networks to machine intelligence, you made even the most complex AI models clear, intuitive, and inspiring.
              </p>
              <p>
                Beyond data and algorithms, you taught us how to think critically and approach problems with curiosity.
              </p>
              <p className="text-[#f8fafc] font-medium italic pt-4 text-2xl md:text-3xl border-l-4 border-[#38bdf8] pl-6 my-6">
                Thank you, Anjali Ma'am, for guiding us to build a smarter future! 🤖✨
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Quiz Section */}
        <section className="scroll-section py-16">
          <AnjaliQuiz />
        </section>

        {/* Final Thank You & Tribute Marquee */}
        <section className="scroll-section min-h-[80vh] flex flex-col items-center justify-center px-6 text-center pb-20">
          <TributeMarquee />
          <h2 className="text-5xl md:text-7xl font-sans font-bold text-[#f8fafc] mb-8 tracking-wide mt-8">
            Happy Teachers' Day
          </h2>
          <p className="text-2xl md:text-4xl text-[#38bdf8] italic mb-12 max-w-3xl leading-relaxed">
            “Thank you for teaching us to think smarter, question deeper, and see the possibilities beyond what we already know.” 🤖✨
          </p>
          <p className="text-xl md:text-2xl text-[#cbd5e1] mb-12 font-light tracking-wide">
            — Anjali Ma'am ❤️
          </p>
          
          <div className="mt-20 text-xs tracking-[0.3em] text-[#64748b] uppercase font-sans">
            Teachers' Day 2026 • Dedicated to Anjali Ma'am
          </div>
        </section>

      </div>
    </div>
  );
};

export default Anjali;
