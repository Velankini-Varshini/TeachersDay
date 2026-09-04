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
    question: "When Sir says, “Today we'll learn a very simple concept…” what should a student immediately do?",
    options: [
      "A) Relax 😇",
      "B) Open the textbook 📚",
      "C) Ask for a break 😭",
      "D) Prepare for 3 hidden layers of complexity 🧠"
    ],
    correctIndex: 3
  },
  {
    id: 2,
    question: "What is the most powerful technique students use when Sir asks, “Any doubts?”",
    options: [
      "A) Ask a genuine question",
      "B) Check the notes",
      "C) Maintain eye contact and hope Sir doesn't ask again 👀",
      "D) Start nodding confidently"
    ],
    correctIndex: 3
  },
  {
    id: 3,
    question: "When Sir says, “This part is very easy,” what is the student's immediate thought?",
    options: [
      "A) “Oh, I already know this!”",
      "B) “This will definitely be easy.”",
      "C) “Finally, a break from difficult concepts!”",
      "D) “Sir… that's exactly what I'm worried about.” 😭"
    ],
    correctIndex: 3
  },
  {
    id: 4,
    question: "What happens when Sir says, “This is very important for the exam”?",
    options: [
      "A) Everyone starts listening carefully",
      "B) Everyone writes it down",
      "C) Everyone suddenly develops photographic memory",
      "D) Every pen in the classroom starts moving at 200 epochs/second! 😂📝"
    ],
    correctIndex: 3
  },
  {
    id: 5,
    question: "FINAL QUESTION — What is Murali Sir's greatest achievement? 🏆",
    options: [
      "A) Teaching Deep Learning",
      "B) Surviving our endless doubts",
      "C) Turning confusion into understanding",
      "D) All of the above ❤️"
    ],
    correctIndex: 3
  }
];

export const MuraliQuiz: React.FC = () => {
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
    const colors = ['#d4af37', '#ffd700', '#fafaf9', '#f59e0b', '#ec4899', '#3b82f6', '#10b981'];

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

      <div className="bg-[#292524]/70 backdrop-blur-xl border border-[#d4af37]/40 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Decorative Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-sans tracking-widest uppercase mb-4">
            <span>🔐 Interactive Challenge</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-[#fafaf9] font-bold mb-4">
            Unlock the Secret Message! 🔐
          </h2>
          <p className="text-[#d6d3d1] text-base md:text-lg font-serif italic max-w-2xl mx-auto">
            Select the correct option for all 5 questions to unlock Sir's secret message!
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
                    ? "bg-[#1c1917]/90 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                    : "bg-[#1c1917]/80 border-[#44403c]/60 hover:border-[#d4af37]/30"
                }`}
              >
                <div className="flex items-start gap-3 mb-6">
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full font-sans text-sm font-bold shrink-0 mt-0.5 border ${
                      isQuestionCorrect
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                        : "bg-[#d4af37]/20 border-[#d4af37]/40 text-[#d4af37]"
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
                      "border-[#44403c] bg-[#292524]/50 text-[#d6d3d1] hover:border-[#d4af37]/50 hover:bg-[#292524] cursor-pointer";

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
        <div className="mt-8 pt-6 border-t border-[#44403c]/40 flex items-center justify-between text-sm font-sans text-[#a8a29e]">
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
                    : "bg-[#44403c]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Secret Unlocked Section (Triggered when 5/5 are correct) */}
        {isPerfectScore && (
          <div
            ref={unlockedRef}
            className="mt-12 p-8 md:p-12 rounded-3xl bg-gradient-to-b from-[#1c1917] via-[#292524] to-[#1c1917] border-2 border-[#d4af37] shadow-[0_0_50px_rgba(212,175,55,0.3)] text-center relative overflow-hidden"
          >
            <div className="inline-block bg-[#d4af37]/20 border border-[#d4af37] text-[#d4af37] font-sans font-bold px-6 py-2 rounded-full text-xs tracking-widest uppercase mb-6 animate-pulse">
              5/5 — PERFECT SCORE! 🏆
            </div>

            <div className="space-y-2 mb-8 font-sans text-sm tracking-wider text-[#a8a29e] uppercase">
              <p>✓ No backpropagation required.</p>
              <p>✓ No re-training needed.</p>
            </div>

            <div className="py-6 border-y border-[#d4af37]/30 my-6">
              <h3 className="text-2xl md:text-3xl font-sans font-bold text-[#d4af37] tracking-widest uppercase mb-4">
                🔓 SECRET MESSAGE UNLOCKED...
              </h3>

              <div className="text-[#fafaf9] my-6">
                <p className="text-[#d4af37] text-2xl md:text-3xl font-sans font-bold tracking-widest uppercase mb-4">
                  CSE-C whole heartedly wishes you .
                </p>

                <p className="text-3xl md:text-6xl font-serif font-black tracking-tight text-[#fafaf9] my-2">
                  HAPPY TEACHER'S DAY!
                </p>

                <p className="text-3xl md:text-5xl font-serif font-black tracking-tight text-[#d4af37] my-2">
                  MURALI SIR ❤️
                </p>
              </div>
            </div>

            <blockquote className="text-xl md:text-3xl font-serif italic text-[#d6d3d1] max-w-3xl mx-auto leading-relaxed mt-8">
              “Thank you for making our brains work overtime… and somehow making us enjoy it.” 🧠😂
            </blockquote>

            <div className="mt-8 pt-6 border-t border-[#d4af37]/30">
              <p className="text-2xl md:text-4xl font-serif font-bold text-[#fafaf9] italic tracking-wide">
                “CSE-C ante ne challenge!” 🔥
              </p>
            </div>

            <div className="mt-8 text-xs font-sans tracking-[0.3em] text-[#d4af37]/70 uppercase">
              Class of 2026 Tribute • Deep Learning Edition
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
