import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { PaperParticles } from '../components/ThreeScene/PaperParticles';
import { TributeMarquee } from '../components/TributeMarquee';
import { teachers } from '../data/teachers';
import T1 from '../assets/T1.jpeg';

const Anjali: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = teachers.find(t => t.id === 'anjali');
  const [currentChapter, setCurrentChapter] = useState(0);

  const chapters = [
    {
      title: "Title Page",
      heading: "MRS. ANJALI",
      content: `"Somewhere along the way, a teacher became someone we could simply talk to."`,
      photo: false
    },
    {
      subtitle: "Chapter 01",
      heading: "The First Hello",
      content: "You welcomed us not just as students, but as individuals. That first greeting set the tone for a relationship built on genuine care.",
      photo: false
    },
    {
      subtitle: "Chapter 02",
      heading: "The Conversations",
      content: data?.placeholders.message || "We could always count on you for a good chat. You listened to our concerns and treated our ideas with respect.",
      photo: true,
      annotation: "Always a great listener."
    },
    {
      subtitle: "Chapter 03",
      heading: "The Advice",
      content: "You gave advice almost like a friend. It was never a lecture, just warm, thoughtful guidance when we needed it the most.",
      photo: false
    },
    {
      subtitle: "Chapter 04",
      heading: "The Memories",
      content: data?.placeholders.memories[0] || "We remember the laughter in the classroom, the open conversations, and how comfortable you made everyone feel.",
      photo: true,
      annotation: "Moments we'll cherish!"
    },
    {
      subtitle: "Final Chapter",
      heading: "The Lessons We Keep",
      content: data?.placeholders.appreciation || "Happy Teachers' Day 2026. Thank you for being a teacher, a guide, and a friend.",
      photo: true,
      annotation: "Class of 2026 ❤️",
      isTribute: true
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ink fade in effect for chapter change
      gsap.fromTo('.ink-text',
        { opacity: 0, filter: 'blur(5px)', y: 10 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.2, ease: 'power2.out', stagger: 0.15 }
      );
      
      gsap.fromTo('.polaroid-photo',
        { opacity: 0, scale: 0.8, rotation: -5 },
        { opacity: 1, scale: 1, rotation: () => (Math.random() - 0.5) * 10, duration: 1, ease: 'back.out(1.5)', delay: 0.5 }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, [currentChapter]);

  const nextPage = () => {
    if (currentChapter < chapters.length - 1) {
      // Page turn animation
      gsap.to('.book-page', {
        rotationY: -90,
        transformOrigin: "left center",
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
        onComplete: () => {
          setCurrentChapter(prev => prev + 1);
          gsap.set('.book-page', { rotationY: 90, opacity: 0 });
          gsap.to('.book-page', {
            rotationY: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
          });
        }
      });
    }
  };

  const prevPage = () => {
    if (currentChapter > 0) {
      gsap.to('.book-page', {
        rotationY: 90,
        transformOrigin: "right center",
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
        onComplete: () => {
          setCurrentChapter(prev => prev - 1);
          gsap.set('.book-page', { rotationY: -90, opacity: 0 });
          gsap.to('.book-page', {
            rotationY: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
          });
        }
      });
    }
  };

  return (
    <div ref={containerRef} className="w-full h-screen bg-[#f4ead5] text-[#3d3126] font-serif overflow-hidden relative selection:bg-[#3d3126] selection:text-[#f4ead5]">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <PaperParticles />
        </Canvas>
      </div>

      {/* Vignette effect for warmth */}
      <div className="absolute inset-0 z-0 pointer-events-none shadow-[inset_0_0_200px_rgba(61,49,38,0.15)]" />
      
      {/* Paper texture overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-multiply" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'}}></div>

      {/* Navigation */}
      <nav className="absolute top-0 w-full p-6 flex justify-between z-50">
        <div className="tracking-widest uppercase text-xs font-sans font-bold text-[#8a7259]">TD 2026 // Scrapbook</div>
        <Link to="/" className="hover:text-[#3d3126] transition-colors uppercase text-xs font-sans font-bold text-[#8a7259]">← Close Book</Link>
      </nav>

      {/* Book Interface */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6">
        
        <div className="book-page max-w-3xl w-full bg-[#faf7f2] p-10 md:p-16 shadow-2xl rounded-sm border border-[#e3d1b3] relative" style={{ perspective: "1500px" }}>
          
          {/* Page binding decorative line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#d1bc9a] to-transparent"></div>

          <div className="min-h-[45vh] flex flex-col md:flex-row items-center justify-center gap-10">
            
            <div className={`flex flex-col justify-center ${chapters[currentChapter].photo ? 'md:w-1/2 text-left' : 'w-full text-center'}`}>
              {chapters[currentChapter].subtitle && (
                <p className="ink-text text-xs md:text-sm tracking-[0.25em] uppercase text-[#a89076] mb-4 font-sans font-bold">
                  {chapters[currentChapter].subtitle}
                </p>
              )}
              
              <h1 className={`ink-text font-bold mb-8 text-[#2c221a] ${currentChapter === 0 ? 'text-4xl md:text-6xl' : 'text-3xl md:text-4xl'}`}>
                {chapters[currentChapter].heading}
              </h1>
              
              <p className={`ink-text leading-relaxed text-lg md:text-xl text-[#4a3c2f] ${currentChapter === 0 ? 'italic opacity-90' : ''}`}>
                {chapters[currentChapter].content}
              </p>

              {currentChapter === chapters.length - 1 && (
                <div className="ink-text mt-12 flex justify-center">
                  <div className="text-[#a89076] italic font-serif opacity-80 border-t border-[#e3d1b3] pt-6">
                    A teacher who became a friend.
                  </div>
                </div>
              )}
            </div>

            {/* Polaroid Photo Section */}
            {chapters[currentChapter].photo && (
              <div className="md:w-1/2 flex items-center justify-center relative">
                <div className="polaroid-photo bg-[#fdfbf7] p-4 pb-12 shadow-xl border border-[#e3d1b3]/50 w-full max-w-[250px] relative">
                  <div className="aspect-square bg-[#e8e0d1] flex items-center justify-center text-[#a89076] text-sm overflow-hidden relative">
                    {(chapters[currentChapter] as any).isTribute ? (
                      <img src={T1} alt="Class Tribute" className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      data?.placeholders.photo
                    )}
                  </div>
                  {/* Handwritten Annotation */}
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <p className="font-handwriting text-xl text-[#3d3126] -rotate-2 opacity-80">
                      {chapters[currentChapter].annotation}
                    </p>
                  </div>
                  {/* Tape */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/40 shadow-sm rotate-3 backdrop-blur-sm"></div>
                </div>
              </div>
            )}
            
          </div>
        </div>

        {/* Book Navigation Controls */}
        <div className="flex gap-10 mt-10 font-sans text-xs tracking-[0.2em] uppercase font-bold text-[#a89076]">
          <button 
            onClick={prevPage}
            disabled={currentChapter === 0}
            className={`hover:text-[#3d3126] transition-colors pb-1 border-b border-transparent hover:border-[#3d3126] ${currentChapter === 0 ? 'opacity-30 cursor-not-allowed hover:border-transparent hover:text-[#a89076]' : ''}`}
          >
            ← Previous
          </button>
          <span>
            {currentChapter + 1} / {chapters.length}
          </span>
          <button 
            onClick={nextPage}
            disabled={currentChapter === chapters.length - 1}
            className={`hover:text-[#3d3126] transition-colors pb-1 border-b border-transparent hover:border-[#3d3126] ${currentChapter === chapters.length - 1 ? 'opacity-30 cursor-not-allowed hover:border-transparent hover:text-[#a89076]' : ''}`}
          >
            Next →
          </button>
        </div>
      </div>

      {/* Marquee appears only on the last chapter */}
      <div 
        className={`absolute bottom-0 w-full transition-all duration-1000 z-50 transform ${
          currentChapter === chapters.length - 1 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <TributeMarquee />
      </div>
    </div>
  );
};

export default Anjali;
