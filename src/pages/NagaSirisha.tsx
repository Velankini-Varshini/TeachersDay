import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { BalanceNetwork } from '../components/ThreeScene/BalanceNetwork';
import { TributeMarquee } from '../components/TributeMarquee';
import { teachers } from '../data/teachers';

gsap.registerPlugin(ScrollTrigger);

const NagaSirisha: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = teachers.find(t => t.id === 'naga-sirisha');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.fromTo('.reveal-text',
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.5, stagger: 0.3, ease: 'back.out(1.2)' }
      );
      
      // Morphing background color based on scroll (Discipline to Connection)
      gsap.to(containerRef.current, {
        backgroundColor: '#4a044e', // fuchsia-950
        color: '#fdf4ff',
        ease: 'none',
        scrollTrigger: {
          trigger: '.connection-section',
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        }
      });
      
      // Update 3D scene progress
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      });

      // Special Message Fade In
      gsap.fromTo('.special-message',
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        {
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          duration: 3, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.special-message',
            start: 'top 70%',
          }
        }
      );

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-slate-950 text-slate-200 font-sans overflow-x-hidden relative transition-colors duration-1000">
      
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <BalanceNetwork scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 flex justify-between z-50 mix-blend-difference text-white">
        <div className="font-bold tracking-widest text-xs uppercase opacity-80">TD 2026 // Balance</div>
        <Link to="/" className="hover:opacity-100 opacity-60 transition-opacity uppercase text-xs font-bold">← Return to Hub</Link>
      </nav>

      <div className="relative z-10">
        
        {/* Hero: State 1 - Discipline */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <h2 className="reveal-text text-sm md:text-base font-bold tracking-[0.5em] uppercase text-slate-400 mb-8">
            The Perfect Balance
          </h2>
          <h1 className="reveal-text text-6xl md:text-8xl font-black mb-10 tracking-tight">
            MRS. NAGA SIRISHA
          </h1>
          <div className="reveal-text text-2xl md:text-4xl font-light italic opacity-90 max-w-4xl leading-relaxed">
            "Strict when the lesson needed it.<br />
            <span className="font-serif">Free when we needed someone to talk to.</span>"
          </div>
        </section>

        {/* State 2 - Connection (Color starts morphing here) */}
        <section className="connection-section min-h-[120vh] flex flex-col items-center justify-center px-6 py-20 relative">
          <div className="max-w-4xl text-center space-y-12">
            <h3 className="text-4xl md:text-6xl font-bold mb-8">The Connection</h3>
            <p className="text-2xl leading-relaxed font-light">
              {data?.placeholders.message}
            </p>
            <p className="text-xl opacity-80 leading-relaxed max-w-2xl mx-auto italic">
              "We always admired how you expected academic rigor, yet always kept your door open for us outside of class."
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-32 px-4 w-full max-w-6xl">
            {data?.placeholders.memories.map((mem, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl hover:-translate-y-2 transition-transform duration-500">
                <p className="text-xl leading-relaxed">{mem}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Special Message (Easter Egg) */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative bg-gradient-to-b from-transparent to-[#2e1065]/50">
          <div className="special-message max-w-3xl">
            <p className="text-2xl md:text-4xl font-serif italic mb-16 opacity-90 leading-relaxed text-pink-200">
              And as you begin a beautiful new chapter...
            </p>
            <div className="space-y-6 text-lg md:text-2xl font-light text-pink-100/80 mb-20">
              <p>We wish you immense happiness, good health, and peaceful moments.</p>
              <p>May this new journey ahead be as wonderful as the positive impact you've had on all of us.</p>
              <p>Lots of happiness to you and your little one.</p>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Happy Teachers' Day, Ma'am. ❤️
            </h2>
            
            <div className="mt-16 w-[100vw] relative left-1/2 -translate-x-1/2">
              <TributeMarquee />
            </div>
          </div>
          
          <div className="absolute bottom-10 text-xs tracking-[0.3em] uppercase opacity-40">
            Teachers' Day 2026
          </div>
        </section>

      </div>
    </div>
  );
};

export default NagaSirisha;
