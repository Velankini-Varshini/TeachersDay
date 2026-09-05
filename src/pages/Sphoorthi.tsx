import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { CompilerNetwork } from '../components/ThreeScene/CompilerNetwork';
import { TributeMarquee } from '../components/TributeMarquee';

gsap.registerPlugin(ScrollTrigger);

const Sphoorthi: React.FC = () => {
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
    <div ref={containerRef} className="w-full min-h-screen bg-[#0a1128] text-[#e2e8f0] font-serif overflow-x-hidden relative selection:bg-blue-500/30">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 opacity-50 mix-blend-screen pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <fog attach="fog" args={['#0a1128', 5, 22]} />
          <CompilerNetwork />
        </Canvas>
      </div>

      {/* Code Syntax Subtle Overlay */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none font-mono text-xs text-blue-400 overflow-hidden select-none p-4 leading-relaxed">
        <div>{`import { Guidance } from 'mentor';`}</div>
        <div>{`import { Support, Sweetness } from 'class-teacher';`}</div>
        <div>{`class SweetestClassTeacher {`}</div>
        <div>{`  public: void teachAndGuide() {`}</div>
        <div>{`    teachBeautifully();`}</div>
        <div>{`    while(students.needHelp) { mentor(); support(); encourage(); }`}</div>
        <div>{`  }`}</div>
        <div>{`};`}</div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 flex justify-between z-50 text-sm tracking-widest font-sans">
        <div className="text-blue-400/80 font-bold">TD 2026</div>
        <Link to="/" className="hover:text-blue-400 transition-colors uppercase">← Return to Hub</Link>
      </nav>

      {/* Content wrapper */}
      <div className="relative z-10">
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 text-center">
          <h2 className="hero-text text-3xl md:text-5xl font-bold text-blue-400 tracking-widest uppercase mb-6 font-sans">
            Sphoorthi Mam
          </h2>
          <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-bold mb-10 text-[#fafaf9] tracking-wide max-w-5xl leading-tight">
            “The Sweetest Guide”
          </h1>
          <p className="hero-text text-xl md:text-3xl italic text-blue-200/80 max-w-3xl leading-relaxed border-t border-b border-blue-500/30 py-6">
            “You taught us wonderfully...
            <br className="hidden md:inline" />
            and we truly wish we had you back with us!”
          </p>
        </section>

        {/* Short Appreciation Message */}
        <section className="scroll-section min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl mx-auto bg-[#0f172a]/70 backdrop-blur-md border border-blue-500/30 p-10 md:p-16 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60"></div>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-sans tracking-widest uppercase mb-8">
              <span>🌟 Appreciation</span>
            </div>

            <h2 className="text-3xl md:text-5xl text-blue-400 mb-10 font-bold">
              Sweetness & Support
            </h2>
            
            <div className="space-y-8 text-xl md:text-2xl leading-relaxed text-[#cbd5e1] font-light">
              <p>
                From making your classes engaging to always being the sweetest class teacher we could ask for, your guidance has meant the world to us.
              </p>
              <p>
                You managed our chaos with endless patience and support. We truly miss having you around to guide us every day.
              </p>
              <p className="text-[#fafaf9] font-medium italic pt-4 text-2xl md:text-3xl border-l-4 border-blue-500 pl-6 my-6">
                Thank you, Mam, for your constant guidance, support, and sweetness! 🌟
              </p>
            </div>
          </div>
        </section>

        {/* Direct Secret Message Section */}
        <section className="scroll-section py-16 px-6 relative z-20 flex justify-center items-center">
          <div className="w-full max-w-4xl p-8 md:p-12 rounded-3xl bg-gradient-to-b from-[#0a1128] via-[#0f1a36] to-[#0a1128] border-2 border-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.4)] text-center relative overflow-hidden">
            <div className="inline-block bg-blue-500/20 border border-blue-500 text-blue-400 font-mono font-bold px-6 py-2 rounded-full text-xs tracking-widest uppercase mb-6 animate-pulse">
              100% LOVE & RESPECT! 🚀
            </div>

            <div className="py-6 border-y border-blue-500/30 my-6">
              <h3 className="text-2xl md:text-3xl font-mono font-bold text-blue-500 tracking-widest uppercase mb-4">
                🔓 A SPECIAL MESSAGE FOR YOU...
              </h3>

              <div className="text-[#fafaf9] my-6">
                <p className="text-blue-300 text-2xl md:text-3xl font-mono font-bold tracking-widest uppercase mb-4">
                  Thank you for being our amazing class teacher!
                </p>

                <p className="text-3xl md:text-6xl font-serif font-black tracking-tight text-[#fafaf9] my-2">
                  HAPPY TEACHER'S DAY!
                </p>

                <p className="text-3xl md:text-5xl font-serif font-black tracking-tight text-blue-400 my-2">
                  SPHOORTHI MAM 🌟❤️
                </p>
              </div>
            </div>

            <blockquote className="text-xl md:text-3xl font-mono italic text-blue-100 max-w-3xl mx-auto leading-relaxed mt-8">
              “Your sweetness and support mean the world to us. We truly miss you!” ✨
            </blockquote>

            <div className="mt-8 pt-6 border-t border-blue-500/30">
              <p className="text-2xl md:text-4xl font-serif font-bold text-[#fafaf9] italic tracking-wide">
                “College life is better when your class teacher truly cares!” 🌟✨
              </p>
            </div>

            <div className="mt-8 text-xs font-mono tracking-[0.3em] text-blue-500/70 uppercase">
              Class of 2026 Tribute • Former Class Teacher Edition
            </div>
          </div>
        </section>

        {/* Final Thank You & Tribute Marquee */}
        <section className="scroll-section min-h-[80vh] flex flex-col items-center justify-center px-6 text-center pb-20">
          <TributeMarquee />
          <h2 className="text-5xl md:text-7xl font-sans font-bold text-[#fafaf9] mb-8 tracking-wide mt-8">
            Happy Teachers' Day
          </h2>
          <p className="text-2xl md:text-4xl text-blue-400 italic mb-12 max-w-3xl leading-relaxed">
            “Thank you for guiding us with so much sweetness and always supporting us.” 🌟
          </p>
          <p className="text-xl md:text-2xl text-[#cbd5e1] mb-12 font-light tracking-wide">
            — Sphoorthi Mam ❤️
          </p>
          
          <div className="mt-20 text-xs tracking-[0.3em] text-[#64748b] uppercase font-sans">
            Teachers' Day 2026 • Dedicated to Sphoorthi Mam
          </div>
        </section>

      </div>
    </div>
  );
};

export default Sphoorthi;
