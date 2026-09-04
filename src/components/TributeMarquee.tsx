import React from 'react';
import T1 from '../assets/T1.jpeg';
import T2 from '../assets/T2.jpeg';
import T3 from '../assets/T3.jpeg';

export const TributeMarquee: React.FC = () => {
  const images = [T1, T2, T3];
  
  // Duplicate array multiple times to ensure seamless infinite scroll
  const duplicatedImages = [...images, ...images, ...images, ...images];

  return (
    <div className="w-full overflow-hidden relative flex items-center py-8 mask-edges my-12">
      <div className="flex animate-marquee gap-6 md:gap-10 w-max hover:[animation-play-state:paused]">
        {duplicatedImages.map((src, idx) => (
          <img 
            key={idx} 
            src={src} 
            alt={`Class Tribute ${idx}`} 
            className="w-64 md:w-80 h-48 md:h-60 rounded-xl shadow-xl border border-white/20 object-cover inline-block transition-transform duration-300 hover:scale-105" 
          />
        ))}
      </div>
    </div>
  );
};
