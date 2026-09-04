import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { FloatingBooks } from '../components/ThreeScene/FloatingBooks';
import { TributeMarquee } from '../components/TributeMarquee';
import { MuraliQuiz } from '../components/MuraliQuiz';
import { teachers } from '../data/teachers';

gsap.registerPlugin(ScrollTrigger);

const Murali: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = teachers.find(t => t.id === 'murali');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle Intro animations
      gsap.fromTo('.hero-text', 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 2, stagger: 0.4, ease: 'power2.out', delay: 0.5 }
      );

      // Section animations on scroll - slow and calm
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
    <div ref={containerRef} className="w-full min-h-screen bg-[#171513] text-[#e7e5e4] font-serif overflow-x-hidden relative">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 opacity-40 mix-blend-screen">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <fog attach="fog" args={['#171513', 5, 20]} />
          <FloatingBooks />
        </Canvas>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 flex justify-between z-50 text-sm tracking-widest font-sans">
        <div className="text-[#d4af37]/80 font-bold">TD 2026</div>
        <Link to="/" className="hover:text-[#d4af37] transition-colors uppercase">← Return to Hub</Link>
      </nav>

      {/* Content wrapper */}
      <div className="relative z-10">
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
          <h2 className="hero-text text-3xl md:text-5xl font-bold text-[#d4af37] tracking-widest uppercase mb-6 font-sans">
            Mr. P. Murali Sir
          </h2>
          <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-bold mb-10 text-[#fafaf9] tracking-wide max-w-5xl leading-tight">
            “The One Who Taught Us to Think Beyond the Surface”
          </h1>
          <p className="hero-text text-xl md:text-3xl italic text-[#d6d3d1] max-w-3xl leading-relaxed border-t border-b border-[#d4af37]/30 py-6">
            “You didn’t just teach us Deep Learning…
            <br className="hidden md:inline" />
            you taught us that every complex problem has a pattern waiting to be discovered.”
          </p>
        </section>

        {/* Short Appreciation Message */}
        <section className="scroll-section min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl mx-auto bg-[#292524]/50 backdrop-blur-md border border-[#d4af37]/30 p-10 md:p-16 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60"></div>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-sans tracking-widest uppercase mb-8">
              <span>🧠 Appreciation</span>
            </div>

            <h2 className="text-3xl md:text-5xl text-[#d4af37] mb-10 font-bold">
              Training Our Minds Beyond Algorithms
            </h2>
            
            <div className="space-y-8 text-xl md:text-2xl leading-relaxed text-[#d6d3d1] font-light">
              <p>
                From neural networks to backpropagation, you made even the most complicated concepts feel understandable.
              </p>
              <p>
                But beyond algorithms, models, and loss functions, you taught us something more valuable — the patience to learn, the courage to make mistakes, and the curiosity to keep going.
              </p>
              <p className="text-[#fafaf9] font-medium italic pt-4 text-2xl md:text-3xl border-l-4 border-[#d4af37] pl-6 my-6">
                Thank you, Murali Sir, for helping us train not just our models, but our minds. 🧠✨
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Quiz Section */}
        <section className="scroll-section py-16">
          <MuraliQuiz />
        </section>

        {/* Final Thank You & Tribute Marquee */}
        <section className="scroll-section min-h-[80vh] flex flex-col items-center justify-center px-6 text-center pb-20">
          <TributeMarquee />
          <h2 className="text-5xl md:text-7xl font-sans font-bold text-[#fafaf9] mb-8 tracking-wide mt-8">
            Happy Teachers' Day
          </h2>
          <p className="text-2xl md:text-4xl text-[#d4af37] italic mb-12 max-w-3xl leading-relaxed">
            “Thank you for making our brains work overtime… and somehow making us enjoy it.” 🧠😂
          </p>
          <p className="text-xl md:text-2xl text-[#d6d3d1] mb-12 font-light tracking-wide">
            — Murali Sir ❤️
          </p>
          
          <div className="mt-20 text-xs tracking-[0.3em] text-[#78716c] uppercase font-sans">
            Teachers' Day 2026 • Dedicated to Mr. P. Murali
          </div>
        </section>

      </div>
    </div>
  );
};

export default Murali;

