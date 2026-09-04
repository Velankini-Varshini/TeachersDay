import React, { useState, useEffect } from 'react';
import T1 from '../assets/T1.jpeg';
import T2 from '../assets/T2.jpeg';
import T3 from '../assets/T3.jpeg';
import T4 from '../assets/T4.jpeg';
import T5 from '../assets/T5.jpeg';
// @ts-ignore
import T6 from '../assets/T6.mp4';
import T7 from '../assets/T7.jpeg';
import T8 from '../assets/T8.jpeg';

export const TributeMarquee: React.FC = () => {
  const [activeMedia, setActiveMedia] = useState<{src: string, type: 'image'|'video'} | null>(null);

  useEffect(() => {
    if (activeMedia) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activeMedia]);

  const mediaFiles = [
    { src: T1, type: 'image' as const },
    { src: T2, type: 'image' as const },
    { src: T3, type: 'image' as const },
    { src: T4, type: 'image' as const },
    { src: T5, type: 'image' as const },
    { src: T6, type: 'video' as const },
    { src: T7, type: 'image' as const },
    { src: T8, type: 'image' as const },
  ];
  
  // Duplicate array multiple times to ensure seamless infinite scroll
  const duplicatedMedia = [...mediaFiles, ...mediaFiles, ...mediaFiles];

  return (
    <>
      <div className="w-full overflow-hidden relative flex items-center py-8 mask-edges my-12 group">
        <div className="flex animate-marquee gap-6 md:gap-10 w-max group-hover:[animation-play-state:paused]">
          {duplicatedMedia.map((item, idx) => (
            <div 
              key={idx} 
              className="w-64 md:w-80 h-48 md:h-60 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/20 overflow-hidden inline-block cursor-pointer transition-transform duration-300 hover:scale-105 shrink-0 bg-zinc-900"
              onClick={() => setActiveMedia(item)}
            >
              {item.type === 'image' ? (
                <img 
                  src={item.src} 
                  alt={`Class Tribute ${idx}`} 
                  className="w-full h-full object-cover pointer-events-none" 
                />
              ) : (
                <div className="w-full h-full relative">
                  <video 
                    src={item.src} 
                    className="w-full h-full object-cover pointer-events-none"
                    muted 
                    loop 
                    autoPlay 
                    playsInline
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <svg className="w-12 h-12 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Frame Modal */}
      {activeMedia && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4 md:p-10 opacity-100 transition-opacity duration-300"
          onClick={() => setActiveMedia(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white text-5xl z-[10000] font-light hover:scale-110 transition-transform"
            onClick={() => setActiveMedia(null)}
          >
            &times;
          </button>
          
          <div 
            className="relative flex items-center justify-center max-w-full max-h-full rounded-xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] border border-white/10"
            onClick={(e) => e.stopPropagation()} 
          >
            {activeMedia.type === 'image' ? (
              <img 
                src={activeMedia.src} 
                alt="Enlarged Tribute" 
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl" 
              />
            ) : (
              <video 
                src={activeMedia.src} 
                className="max-w-[90vw] max-h-[85vh] rounded-xl"
                controls 
                autoPlay
                muted
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
