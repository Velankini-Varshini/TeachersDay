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
    question: "What's Sindhuja mam's favorite dialog?",
    options: [
      "A) CSE C is best 🌟",
      "B) CC lo em undhi amma... easy ga rayochu... aahhh 😎",
      "C) Submit your assignments on time! 📋",
      "D) Maintain silence in the class! 🤫"
    ],
    correctIndex: 1
  },
  {
    id: 2,
    question: "What is the most common advice a Class Teacher gives?",
    options: [
      "A) Sleep in class 😴",
      "B) Maintain your attendance and study well! 📚",
      "C) Skip the labs 🧪",
      "D) Don't worry about marks 💯"
    ],
    correctIndex: 1
  },
  {
    id: 3,
    question: "When we have a problem in the department, who do we run to?",
    options: [
      "A) The internet 🌐",
      "B) The HOD immediately 👑",
      "C) Our favorite Class Teacher, Sindhuja Mam! ❤️",
      "D) We just panic 😱"
    ],
    correctIndex: 2
  },
  {
    id: 4,
    question: "What is the hardest part of being the Class Teacher for CSE-C?",
    options: [
      "A) Teaching Cloud Computing ☁️",
      "B) Grading papers 📝",
      "C) Managing our energetic and chaotic class! 🌪️",
      "D) Finding the classroom 🗺️"
    ],
    correctIndex: 2
  },
  {
    id: 5,
    question: "FINAL QUESTION — What makes Sindhuja Mam the best class teacher?",
    options: [
      "A) She guides us like a true mentor 🌟",
      "B) She supports us in every situation 🤝",
      "C) She knows how to handle our class perfectly ✨",
      "D) All of the above! ❤️"
    ],
    correctIndex: 3
  }
];

export const SindhujaQuiz: React.FC = () => {
  const [correctAnswers, setCorrectAnswers] = useState<{ [key: number]: boolean }>({});
  const [shakingOption, setShakingOption] = useState<string | null>(null);
  const [wrongOptions, setWrongOptions] = useState<{ [key: string]: boolean }>({});

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const unlockedRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isPerfectScore = Object.keys(correctAnswers).length === quizQuestions.length;

  useEffect(() => {
    // Add entry animation for quiz container
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (isPerfectScore) {
      triggerConfetti();
      if (unlockedRef.current) {
        gsap.fromTo(
          unlockedRef.current,
          { scale: 0.5, opacity: 0, rotationX: 90 },
          { scale: 1, opacity: 1, rotationX: 0, duration: 1.5, ease: 'elastic.out(1, 0.5)' }
        );
      }
    }
  }, [isPerfectScore]);

  const handleOptionClick = (questionId: number, optionIndex: number, correctIndex: number, e: React.MouseEvent) => {
    if (correctAnswers[questionId]) return;

    const btn = e.currentTarget;

    if (optionIndex === correctIndex) {
      setCorrectAnswers((prev) => ({ ...prev, [questionId]: true }));
      // Success animation
      gsap.to(btn, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1 });
    } else {
      const key = `${questionId}-${optionIndex}`;
      setWrongOptions((prev) => ({ ...prev, [key]: true }));
      setShakingOption(key);

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
    const colors = ['#38bdf8', '#60a5fa', '#818cf8', '#93c5fd', '#bfdbfe', '#e0f2fe', '#f8fafc'];

    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 5 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15
      });
    }

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

      if (elapsed < 8000) {
        requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    render();
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-16 px-4 relative z-20">
      <style>{`
        @keyframes quizShake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-10px) rotate(-1deg); }
          40%, 80% { transform: translateX(10px) rotate(1deg); }
        }
        .animate-quiz-shake {
          animation: quizShake 0.45s ease-in-out;
        }
      `}</style>

      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />

      <div className="bg-[#0a1128]/80 backdrop-blur-xl border border-blue-500/40 p-8 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(59,130,246,0.15)] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-sans tracking-widest uppercase mb-3 font-semibold hover:bg-blue-500/20 transition-all duration-300">
            <span>☁️ Cloud Architect's Exam...</span>
          </div>
          <p className="text-blue-300 text-sm md:text-base font-mono italic mb-4">
            “No AWS credits required for this test!” 😌
          </p>
          <h2 className="text-3xl md:text-5xl font-mono text-[#fafaf9] font-bold mb-4">
            Deploy the Secret Message! 🔐
          </h2>
          <p className="text-blue-200/80 text-base md:text-lg font-mono italic max-w-2xl mx-auto">
            Select the correct option for all 5 questions to deploy to production and unlock Mam's secret message!
          </p>
        </div>

        <div className="space-y-10" ref={containerRef}>
          {quizQuestions.map((q, qIdx) => {
            const isQuestionCorrect = !!correctAnswers[q.id];

            return (
              <div
                key={q.id}
                className={`p-6 md:p-8 rounded-2xl border transition-all duration-500 hover:shadow-lg ${
                  isQuestionCorrect
                    ? "bg-[#0b1a2a]/90 border-blue-400/40 shadow-[0_0_20px_rgba(56,189,248,0.15)] transform scale-[1.02]"
                    : "bg-[#0a1128]/80 border-blue-900 hover:border-blue-500/40"
                }`}
              >
                <div className="flex items-start gap-3 mb-6">
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full font-mono text-sm font-bold shrink-0 mt-0.5 border transition-colors duration-300 ${
                      isQuestionCorrect
                        ? "bg-blue-500/20 border-blue-400 text-blue-300"
                        : "bg-blue-900/40 border-blue-700 text-blue-400"
                    }`}
                  >
                    {isQuestionCorrect ? "✓" : qIdx + 1}
                  </span>
                  <h3 className="text-lg md:text-xl text-[#fafaf9] font-mono leading-snug">
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
                      "border-blue-900 bg-[#0f172a]/60 text-blue-200 hover:border-blue-500/50 hover:bg-[#1e293b] cursor-pointer";

                    if (isCorrect) {
                      btnClass =
                        "border-blue-400 bg-blue-900/40 text-blue-100 ring-2 ring-blue-500/50 font-medium cursor-default";
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
                        onClick={(e) => handleOptionClick(q.id, optIdx, q.correctIndex, e)}
                        disabled={isQuestionCorrect}
                        className={`text-left p-4 rounded-xl border text-sm md:text-base font-mono transition-all duration-300 flex items-center justify-between group ${btnClass}`}
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300">{opt}</span>

                        {isCorrect && (
                          <span className="text-blue-300 font-mono text-xs font-bold animate-pulse">
                            ✓ Verified
                          </span>
                        )}

                        {isWrong && !isCorrect && (
                          <span className="text-rose-400 font-mono text-xs font-bold">
                            ✗ Failed
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

        <div className="mt-8 pt-6 border-t border-blue-900/50 flex items-center justify-between text-sm font-mono text-blue-400/60">
          <span>
            Deployment Progress: {Object.keys(correctAnswers).length} of {quizQuestions.length} checks passed
          </span>
          <div className="flex gap-1.5">
            {quizQuestions.map((q) => (
              <div
                key={q.id}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  correctAnswers[q.id]
                    ? "bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)] transform scale-110"
                    : "bg-blue-900/50"
                }`}
              />
            ))}
          </div>
        </div>

        {isPerfectScore && (
          <div
            ref={unlockedRef}
            className="mt-12 p-8 md:p-12 rounded-3xl bg-gradient-to-b from-[#0a1128] via-[#0f1a36] to-[#0a1128] border-2 border-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.4)] text-center relative overflow-hidden"
          >
            <div className="inline-block bg-blue-500/20 border border-blue-500 text-blue-400 font-mono font-bold px-6 py-2 rounded-full text-xs tracking-widest uppercase mb-6 animate-pulse">
              100% SUCCESSFUL DEPLOYMENT! 🚀
            </div>

            <div className="space-y-2 mb-8 font-mono text-xs md:text-sm tracking-wider text-blue-300 uppercase bg-[#050b14]/70 p-4 rounded-xl border border-blue-500/30 max-w-lg mx-auto">
              <p>✓ Cloud architecture validated.</p>
              <p>✓ Fetching secret message from S3 bucket…</p>
              <p className="font-mono text-blue-400 font-bold">[ ████████████████████ ] 100%</p>
            </div>

            <div className="py-6 border-y border-blue-500/30 my-6">
              <h3 className="text-2xl md:text-3xl font-mono font-bold text-blue-500 tracking-widest uppercase mb-4">
                🔓 SECRET MESSAGE UNLOCKED...
              </h3>

              <div className="text-[#fafaf9] my-6">
                <p className="text-blue-300 text-2xl md:text-3xl font-mono font-bold tracking-widest uppercase mb-4">
                  Thank you for lifting our knowledge to the clouds!
                </p>

                <p className="text-3xl md:text-6xl font-serif font-black tracking-tight text-[#fafaf9] my-2">
                  HAPPY TEACHER'S DAY!
                </p>

                <p className="text-3xl md:text-5xl font-serif font-black tracking-tight text-blue-400 my-2">
                  SINDHUJA MAM ☁️❤️
                </p>
              </div>
            </div>

            <blockquote className="text-xl md:text-3xl font-mono italic text-blue-100 max-w-3xl mx-auto leading-relaxed mt-8">
              “Your classes made Cloud Computing incredibly interesting and fun!” ✨
            </blockquote>

            <div className="mt-8 pt-6 border-t border-blue-500/30">
              <p className="text-2xl md:text-4xl font-serif font-bold text-[#fafaf9] italic tracking-wide">
                “Cloud Computing is definitely easy, only if our best class teacher is with us!” ☁️✨
              </p>
            </div>

            <div className="mt-8 text-xs font-mono tracking-[0.3em] text-blue-500/70 uppercase">
              Class of 2026 Tribute • Cloud Computing Edition
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
