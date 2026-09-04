import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { FloatingBooks } from '../components/ThreeScene/FloatingBooks';
import { TributeMarquee } from '../components/TributeMarquee';
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
        <div className="text-[#d4af37]/80">TD 2026</div>
        <Link to="/" className="hover:text-[#d4af37] transition-colors uppercase">← Return to Hub</Link>
      </nav>

      {/* Content wrapper */}
      <div className="relative z-10">
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
          <p className="hero-text text-[#d4af37] tracking-widest uppercase text-sm mb-6 opacity-90">The Gentle Mentor</p>
          <h1 className="hero-text text-6xl md:text-8xl font-bold mb-10 text-[#fafaf9] tracking-wide font-sans">
            {data?.fullName}
          </h1>
          <p className="hero-text text-2xl md:text-4xl italic text-[#d6d3d1] max-w-3xl leading-relaxed">
            "Some teachers teach the lesson.<br />Some understand the person learning it."
          </p>
        </section>

        {/* The Little Things */}
        <section className="scroll-section min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl mx-auto bg-[#292524]/40 backdrop-blur-md border border-[#44403c]/50 p-12 md:p-16 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-30"></div>
            <h2 className="text-4xl md:text-5xl text-[#d4af37] mb-10 font-bold">The Little Things</h2>
            <div className="space-y-8 text-xl md:text-2xl leading-relaxed text-[#d6d3d1] font-light">
              <p>{data?.placeholders.message}</p>
              <p>It was never just about academics. It was your patience when we made mistakes, your gentle guidance when we were lost, and the comfort of knowing you truly understood us.</p>
              <p className="italic opacity-80 pt-4">You made us feel seen, not just as students, but as people.</p>
            </div>
          </div>
        </section>

        {/* Moments We Remember */}
        <section className="scroll-section min-h-screen flex flex-col justify-center items-center px-6 py-20">
          <h2 className="text-4xl md:text-5xl text-[#d4af37] mb-16 font-bold">Moments We Remember</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl">
            {[1, 2].map((i) => (
              <div key={i} className="aspect-square md:aspect-auto md:h-96 bg-[#292524]/60 rounded-xl border border-[#44403c]/30 flex items-center justify-center overflow-hidden group shadow-lg p-4">
                <div className="w-full h-full bg-[#1c1917] rounded-lg border border-[#3e3a37] flex items-center justify-center relative">
                  <div className="text-[#a8a29e] opacity-70 group-hover:scale-105 transition-transform duration-[2s] ease-out">
                    {data?.placeholders.photo}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Words From Students */}
        <section className="scroll-section min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-5xl w-full">
            <h2 className="text-4xl md:text-5xl text-[#d4af37] mb-16 font-bold text-center">Words of Comfort</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {data?.placeholders.memories.map((memory, i) => (
                <div key={i} className="bg-gradient-to-br from-[#292524]/80 to-[#1c1917]/80 p-10 rounded-2xl border border-[#d4af37]/20 shadow-xl relative">
                  <div className="absolute -top-4 -left-2 text-6xl text-[#d4af37] opacity-20 font-serif">"</div>
                  <p className="italic text-lg md:text-xl mb-6 text-[#d6d3d1] relative z-10 leading-relaxed font-light">{memory}</p>
                  <p className="text-[#d4af37]/80 text-sm md:text-base text-right tracking-widest font-sans">— Class of 2026</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Thank You */}
        <section className="scroll-section min-h-[80vh] flex flex-col items-center justify-center px-6 text-center pb-20">
          <TributeMarquee />
          <h2 className="text-5xl md:text-7xl font-sans font-bold text-[#fafaf9] mb-10 tracking-wide mt-8">Happy Teachers' Day</h2>
          <p className="text-2xl md:text-4xl text-[#d4af37] italic mb-16 max-w-3xl leading-relaxed">
            {data?.placeholders.appreciation}
          </p>
          <p className="text-xl md:text-2xl text-[#d6d3d1] mb-12 font-light tracking-wide">"Thank you for understanding us."</p>
          
          <div className="mt-32 text-xs tracking-[0.3em] text-[#78716c] uppercase font-sans">
            Teachers' Day 2026
          </div>
        </section>

      </div>
    </div>
  );
};

export default Murali;
