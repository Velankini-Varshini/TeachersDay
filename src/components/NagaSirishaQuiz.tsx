import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What is a student's immediate response when Ma'am asks a question in class?",
    options: [
      "A) “Request Timed Out” ⏱️",
      "B) “404: Answer Not Found” 🔍",
      "C) “Packet Lost in Transit” 📦",
      "D) “Connection established — listen carefully to Ma'am's explanation!” 🌐"
    ],
    correctIndex: 1
  },
  {
    id: 2,
    question: "What is the most common reason a student's brain loses connection during lecture?",
    options: [
      "A) High latency in morning hours 🥱",
      "B) Wi-Fi router overload 📶",
      "C) Server maintenance in progress 💻",
      "D) Forgot to assign IP address to today's topic! 😂"
    ],
    correctIndex: 3
  },
  {
    id: 3,
    question: "When Ma'am says, “This networking protocol is very simple to remember...”",
    options: [
      "A) Everyone starts pinging their neighbors 📲",
      "B) Everyone checks their packet loss 📦",
      "C) Everyone searches for free Wi-Fi 📶",
      "D) Everyone trusts Ma'am to transmit the knowledge seamlessly! ✨"
    ],
    correctIndex: 3
  },
  {
    id: 4,
    question: "What is the fastest data transmission speed known to humanity?",
    options: [
      "A) 100 Gbps Fiber Optic 🚀",
      "B) 5G Cellular Network 📶",
      "C) Satellite Internet 🛰️",
      "D) News spreading in class that Ma'am has done strict correction! 😂"
    ],
    correctIndex: 3
  },
  {
    id: 5,
    question: "FINAL QUESTION — What is Naga Sirisha Ma’am's strongest network connection? 🏆",
    options: [
      "A) Wi-Fi 📶",
      "B) LAN 🌐",
      "C) The unbreakable connection of care between a teacher and her students ❤️",
      "D) 5G 🚀"
    ],
    correctIndex: 2
  }
];

export const NagaSirishaQuiz: React.FC = () => {
  // Track which questions are answered correctly
  const [correctAnswers, setCorrectAnswers] = useState<{ [key: number]: boolean }>({});
  // Track options currently shaking from an incorrect click
  const [shakingOption, setShakingOption] = useState<string | null>(null);
  // Track all wrong clicked option keys "qId-optIdx" to keep them red/invalidated
  const [wrongOptions, setWrongOptions] = useState<{ [key: string]: boolean }>({});

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const unlockedRef = useRef<HTMLDivElement>(null);

  const isPerfectScore = Object.keys(correctAnswers).length === quizQuestions.length;

  useEffect(() => {
    if (isPerfectScore) {
      triggerConfetti();
      if (unlockedRef.current) {
        gsap.fromTo(
          unlockedRef.current,
          { scale: 0.8, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'back.out(1.7)' }
        );
      }
    }
  }, [isPerfectScore]);

  const handleOptionClick = (questionId: number, optionIndex: number, correctIndex: number) => {
    // If already correctly answered, ignore clicks
    if (correctAnswers[questionId]) return;

    if (optionIndex === correctIndex) {
      // Correct option chosen!
      setCorrectAnswers((prev) => ({ ...prev, [questionId]: true }));
    } else {
      // Wrong option chosen! Trigger red shake effect
      const key = `${questionId}-${optionIndex}`;
      setWrongOptions((prev) => ({ ...prev, [key]: true }));
      setShakingOption(key);

      // Clear shaking animation trigger after 500ms
      setTimeout(() => {
        setShakingOption(null);
      }, 500);
    }
  };

  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];
    const colors = ['#06b6d4', '#2dd4bf', '#0d9488', '#38bdf8', '#fafaf9', '#f59e0b', '#ec4899'];

    for (let i = 0; i < 180; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 4 + 3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }

    let animationFrameId: number;
    let startTime = Date.now();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const elapsed = Date.now() - startTime;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      if (elapsed < 6000) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    render();
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-16 px-4 relative z-20">
      {/* CSS Shake Animation Style */}
      <style>{`
        @keyframes quizShake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-10px); }
          40%, 80% { transform: translateX(10px); }
        }
        .animate-quiz-shake {
          animation: quizShake 0.45s ease-in-out;
        }
      `}</style>

      {/* Canvas Overlay for Confetti */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />

      <div className="bg-[#0e1a26]/80 backdrop-blur-xl border border-[#06b6d4]/40 p-8 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden">
        {/* Decorative Deep Teal Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#06b6d4] to-transparent"></div>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/30 text-[#06b6d4] text-xs font-sans tracking-widest uppercase mb-3 font-semibold">
            <span>🌐 Naga Sirisha Ma’am, One Last Test...</span>
          </div>
          <p className="text-[#2dd4bf] text-sm md:text-base font-serif italic mb-4">
            “Don't worry, Ma’am. This one carries absolutely zero marks.” 😌
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-[#fafaf9] font-bold mb-4">
            Unlock the Secret Message! 🔐
          </h2>
          <p className="text-[#cbd5e1] text-base md:text-lg font-serif italic max-w-2xl mx-auto">
            Select the correct option for all 5 questions to establish connection and unlock Ma'am's secret message!
          </p>
        </div>

        {/* Questions List */}
        <div className="space-y-10">
          {quizQuestions.map((q, qIdx) => {
            const isQuestionCorrect = !!correctAnswers[q.id];

            return (
              <div
                key={q.id}
                className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 ${
                  isQuestionCorrect
                    ? "bg-[#09131d]/90 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                    : "bg-[#09131d]/80 border-[#1e293b] hover:border-[#06b6d4]/40"
                }`}
              >
                <div className="flex items-start gap-3 mb-6">
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full font-sans text-sm font-bold shrink-0 mt-0.5 border ${
                      isQuestionCorrect
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                        : "bg-[#06b6d4]/20 border-[#06b6d4]/40 text-[#06b6d4]"
                    }`}
                  >
                    {isQuestionCorrect ? "✓" : qIdx + 1}
                  </span>
                  <h3 className="text-lg md:text-xl text-[#fafaf9] font-serif leading-snug">
                    {q.question}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((opt, optIdx) => {
                    const optionKey = `${q.id}-${optIdx}`;
                    const isOptionShaking = shakingOption === optionKey;
                    const isWrong = !!wrongOptions[optionKey];
                    const isCorrect = isQuestionCorrect && optIdx === q.correctIndex;

                    let btnClass =
                      "border-[#1e293b] bg-[#122232]/60 text-[#cbd5e1] hover:border-[#06b6d4]/50 hover:bg-[#182a3c] cursor-pointer";

                    if (isCorrect) {
                      btnClass =
                        "border-emerald-500 bg-emerald-950/40 text-emerald-200 ring-2 ring-emerald-500/50 font-medium cursor-default";
                    } else if (isWrong) {
                      btnClass =
                        "border-rose-500/90 bg-rose-950/50 text-rose-200 ring-2 ring-rose-500/50";
                    }

                    if (isOptionShaking) {
                      btnClass += " animate-quiz-shake";
                    }

                    return (
                      <button
                        type="button"
                        key={optIdx}
                        onClick={() => handleOptionClick(q.id, optIdx, q.correctIndex)}
                        disabled={isQuestionCorrect}
                        className={`text-left p-4 rounded-xl border text-sm md:text-base font-serif transition-all duration-200 flex items-center justify-between ${btnClass}`}
                      >
                        <span>{opt}</span>

                        {isCorrect && (
                          <span className="text-emerald-400 font-sans text-xs font-bold">
                            ✓ Correct
                          </span>
                        )}

                        {isWrong && !isCorrect && (
                          <span className="text-rose-400 font-sans text-xs font-bold">
                            ✗ Incorrect
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Tracker */}
        <div className="mt-8 pt-6 border-t border-[#1e293b] flex items-center justify-between text-sm font-sans text-[#94a3b8]">
          <span>
            Progress: {Object.keys(correctAnswers).length} of {quizQuestions.length} correct
          </span>
          <div className="flex gap-1.5">
            {quizQuestions.map((q) => (
              <div
                key={q.id}
                className={`w-3 h-3 rounded-full transition-all ${
                  correctAnswers[q.id]
                    ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                    : "bg-[#1e293b]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Secret Unlocked Section (Triggered when 5/5 are correct) */}
        {isPerfectScore && (
          <div
            ref={unlockedRef}
            className="mt-12 p-8 md:p-12 rounded-3xl bg-gradient-to-b from-[#09131d] via-[#0e1a26] to-[#09131d] border-2 border-[#06b6d4] shadow-[0_0_50px_rgba(6,182,212,0.3)] text-center relative overflow-hidden"
          >
            <div className="inline-block bg-[#06b6d4]/20 border border-[#06b6d4] text-[#06b6d4] font-sans font-bold px-6 py-2 rounded-full text-xs tracking-widest uppercase mb-6 animate-pulse">
              5/5 — PERFECT SCORE! 🏆
            </div>

            <div className="space-y-2 mb-8 font-sans text-xs md:text-sm tracking-wider text-[#06b6d4] uppercase bg-[#040910]/70 p-4 rounded-xl border border-[#06b6d4]/30 max-w-lg mx-auto">
              <p>✓ Connection established.</p>
              <p>✓ Transmitting secret message…</p>
              <p className="font-mono text-[#2dd4bf] font-bold">[ ████████████████████ ] 100%</p>
            </div>

            <div className="py-6 border-y border-[#06b6d4]/30 my-6">
              <h3 className="text-2xl md:text-3xl font-sans font-bold text-[#06b6d4] tracking-widest uppercase mb-4">
                🔓 SECRET MESSAGE UNLOCKED...
              </h3>

              <div className="text-[#fafaf9] my-6">
                <p className="text-[#06b6d4] text-2xl md:text-3xl font-sans font-bold tracking-widest uppercase mb-4">
                  CSE-C whole heartedly wishes you .
                </p>

                <p className="text-3xl md:text-6xl font-serif font-black tracking-tight text-[#fafaf9] my-2">
                  HAPPY TEACHER'S DAY!
                </p>

                <p className="text-3xl md:text-5xl font-serif font-black tracking-tight text-[#06b6d4] my-2">
                  NAGA SIRISHA MA’AM ❤️
                </p>
              </div>
            </div>

            <blockquote className="text-xl md:text-3xl font-serif italic text-[#cbd5e1] max-w-3xl mx-auto leading-relaxed mt-8">
              “Thank you for always keeping us connected to knowledge, even when our own networks seemed to disconnect!” 🌐❤️
            </blockquote>

            <div className="mt-8 pt-6 border-t border-[#06b6d4]/30">
              <p className="text-2xl md:text-4xl font-serif font-bold text-[#fafaf9] italic tracking-wide">
                “Hearty congratulations for your new chapter in life — welcoming a cute little soul!” 👶❤️✨
              </p>
            </div>

            <div className="mt-8 text-xs font-sans tracking-[0.3em] text-[#06b6d4]/70 uppercase">
              Class of 2026 Tribute • Computer Networks Edition
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
