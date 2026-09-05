import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';
import gsap from 'gsap';
import { findTeacherByInput, type TeacherData } from '../data/teachers';

function ParticleSystem({ accelerate }: { accelerate: boolean }) {
  const ref = useRef<any>(null);
  // @ts-ignore
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

  useFrame((_state, delta) => {
    if (ref.current) {
      const speed = accelerate ? 5 : 1;
      ref.current.rotation.x -= (delta / 10) * speed;
      ref.current.rotation.y -= (delta / 15) * speed;

      if (accelerate) {
        ref.current.position.z += delta * 2;
      }
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#ffffff" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

const Home: React.FC = () => {
  const [input, setInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [matchedTeacher, setMatchedTeacher] = useState<TeacherData | null>(null);
  const [accelerate, setAccelerate] = useState(false);
  const navigate = useNavigate();

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial Reveal
    const tl = gsap.timeline();
    tl.fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" })
      .fromTo(subtitleRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: "power2.out" }, "-=0.5")
      .fromTo(inputContainerRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 }, "-=1");
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || matchedTeacher) return;

    const teacher = findTeacherByInput(input);

    if (teacher) {
      setErrorMsg('');
      setMatchedTeacher(teacher);
      setAccelerate(true);

      // Cinematic Portal Transition Effect
      const tl = gsap.timeline({
        onComplete: () => {
          navigate(teacher.route);
        }
      });

      // 1. Hide original content and expand
      tl.to(inputContainerRef.current, { scale: 1.2, opacity: 0, duration: 0.6, ease: "power2.inOut" })
        .to([titleRef.current, subtitleRef.current], { y: -50, opacity: 0, duration: 0.6, ease: "power2.inOut", stagger: 0.1 }, "<")
        // 2. Show recognition state
        .fromTo(recognitionRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }, "-=0.2")
        // 3. Zoom into portal
        .to(recognitionRef.current, { scale: 2, opacity: 0, duration: 1, ease: "power2.in", delay: 1.5 })
        .to(containerRef.current, { scale: 1.5, opacity: 0, duration: 1, ease: "power2.in" }, "<");
    } else {
      // Error Effect
      setErrorMsg("We couldn't find that mentor...");
      gsap.fromTo(".error-msg", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
      setTimeout(() => {
        setErrorMsg("Try entering their first name or surname.");
      }, 2500);
    }
  };

  return (
    <div ref={containerRef} className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black text-white">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleSystem accelerate={accelerate} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="z-10 text-center px-4 flex flex-col items-center w-full max-w-2xl">
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-ncl-gasdrifo font-bold mb-6 tracking-widest leading-tight">
          HAPPY TEACHERS' DAY
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-3xl mb-12 font-thequironax italic opacity-80 font-serif">
          "Every journey has a few people who make it memorable."
        </p>

        {!matchedTeacher && (
          <div ref={inputContainerRef} className="w-full">
            <p className="mb-4 text-lg font-general font-bold opacity-80 tracking-wide uppercase text-sm">A Tribute of thanks from CSE C</p>
            <form onSubmit={handleSearch} className="flex flex-col items-center w-full">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your name..."
                className="px-6 py-4 bg-transparent border-b-2 border-white/30 focus:border-white outline-none text-center text-2xl mb-8 w-full transition-colors font-light"
              />
              <button type="submit" className="px-10 py-3 border-2 border-white rounded-full hover:bg-white hover:text-black transition-all duration-300 tracking-widest uppercase text-sm font-bold">
                Enter →
              </button>
            </form>
            {errorMsg && (
              <p className="error-msg text-red-400 mt-6 italic h-6">{errorMsg}</p>
            )}
          </div>
        )}

        {/* Recognition State */}
        <div ref={recognitionRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0">
          <p className="text-green-400 tracking-[0.5em] uppercase text-sm mb-6 font-bold animate-pulse">Our Role Model Found</p>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white">{matchedTeacher?.fullName}</h2>
          <p className="text-xl italic opacity-70 font-serif">Preparing your world...</p>
        </div>

      </div>
    </div>
  );
};

export default Home;
