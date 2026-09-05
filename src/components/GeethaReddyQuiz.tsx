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
    question: "According to Geetha Mam, what is the most important thing for survival?",
    options: [
      "A) Oxygen 🌬️",
      "B) Water 💧",
      "C) Food 🍔",
      "D) Attendance! 💯"
    ],
    correctIndex: 3
  },
  {
    id: 2,
    question: "What is the most feared sight for a student roaming the corridor during class hours?",
    options: [
      "A) A random quiz 📝",
      "B) Running out of mobile data 📱",
      "C) The Wi-Fi going down 📶",
      "D) Geetha Reddy Mam walking down the corridor! 🏃‍♂️💨"
    ],
    correctIndex: 3
  },
  {
    id: 3,
    question: "If a student is found standing outside during a lecture, what is Mam's immediate response?",
    options: [
      "A) Are you enjoying the weather? ☀️",
      "B) What is your roll number and why are you outside? 🧐",
      "C) Did you bring snacks? 🍿",
      "D) Great, you can go home! 🏠"
    ],
    correctIndex: 1
  },
  {
    id: 4,
    question: "What makes Mam the best HOD?",
    options: [
      "A) Never taking classes",
      "B) Cancelling all exams",
      "C) Strict discipline but a truly caring heart ❤️",
      "D) Giving free marks"
    ],
    correctIndex: 2
  },
  {
    id: 5,
    question: "FINAL QUESTION — What is the undeniable truth about Geetha Reddy Mam?",
    options: [
      "A) Strict on the outside, incredibly caring on the inside! 🥰",
      "B) Our ultimate role model. 🌟",
      "C) The best HOD we could ever have! 👑",
      "D) All of the above ❤️"
    ],
    correctIndex: 3
  }
];

export const GeethaReddyQuiz: React.FC = () => {
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
    const colors = ['#ec4899', '#f43f5e', '#f97316', '#fbbf24', '#3b82f6', '#8b5cf6', '#d946ef'];

    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 10 + 5,
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

      <div className="bg-[#1a0f1c]/80 backdrop-blur-xl border border-pink-500/40 p-8 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(236,72,153,0.15)] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-sans tracking-widest uppercase mb-3 font-semibold hover:bg-pink-500/20 transition-all duration-300">
            <span>👑 HOD Mam's Test...</span>
          </div>
          <p className="text-pink-300 text-sm md:text-base font-serif italic mb-4">
            “No attendance marks for this one, but you must score 100%!” 😌
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-[#fafaf9] font-bold mb-4">
            Unlock the Secret Message! 🔐
          </h2>
          <p className="text-[#cbd5e1] text-base md:text-lg font-serif italic max-w-2xl mx-auto">
            Select the correct option for all 5 questions to prove you are an attentive student and unlock Mam's secret message!
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
                    ? "bg-[#0f1a14]/90 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)] transform scale-[1.02]"
                    : "bg-[#160f18]/80 border-[#3d1f33] hover:border-pink-500/40"
                }`}
              >
                <div className="flex items-start gap-3 mb-6">
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full font-sans text-sm font-bold shrink-0 mt-0.5 border transition-colors duration-300 ${
                      isQuestionCorrect
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                        : "bg-pink-500/20 border-pink-500/40 text-pink-500"
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
                      "border-[#3d1f33] bg-[#281624]/60 text-[#cbd5e1] hover:border-pink-500/50 hover:bg-[#341c2c] cursor-pointer";

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
                        onClick={(e) => handleOptionClick(q.id, optIdx, q.correctIndex, e)}
                        disabled={isQuestionCorrect}
                        className={`text-left p-4 rounded-xl border text-sm md:text-base font-serif transition-all duration-300 flex items-center justify-between group ${btnClass}`}
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300">{opt}</span>

                        {isCorrect && (
                          <span className="text-emerald-400 font-sans text-xs font-bold animate-pulse">
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

        <div className="mt-8 pt-6 border-t border-[#3d1f33] flex items-center justify-between text-sm font-sans text-[#94a3b8]">
          <span>
            Attendance Tracker: {Object.keys(correctAnswers).length} of {quizQuestions.length} correct
          </span>
          <div className="flex gap-1.5">
            {quizQuestions.map((q) => (
              <div
                key={q.id}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  correctAnswers[q.id]
                    ? "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] transform scale-110"
                    : "bg-[#3d1f33]"
                }`}
              />
            ))}
          </div>
        </div>

        {isPerfectScore && (
          <div
            ref={unlockedRef}
            className="mt-12 p-8 md:p-12 rounded-3xl bg-gradient-to-b from-[#1a0f1c] via-[#2a1324] to-[#1a0f1c] border-2 border-pink-500 shadow-[0_0_50px_rgba(236,72,153,0.4)] text-center relative overflow-hidden"
          >
            <div className="inline-block bg-pink-500/20 border border-pink-500 text-pink-400 font-sans font-bold px-6 py-2 rounded-full text-xs tracking-widest uppercase mb-6 animate-pulse">
              100% ATTENDANCE ACHIEVED! 🏆
            </div>

            <div className="space-y-2 mb-8 font-sans text-xs md:text-sm tracking-wider text-pink-400 uppercase bg-[#0a0507]/70 p-4 rounded-xl border border-pink-500/30 max-w-lg mx-auto">
              <p>✓ Discipline verified.</p>
              <p>✓ Generating secret message…</p>
              <p className="font-mono text-pink-300 font-bold">[ ████████████████████ ] 100%</p>
            </div>

            <div className="py-6 border-y border-pink-500/30 my-6">
              <h3 className="text-2xl md:text-3xl font-sans font-bold text-pink-500 tracking-widest uppercase mb-4">
                🔓 SECRET MESSAGE UNLOCKED...
              </h3>

              <div className="text-[#fafaf9] my-6">
                <p className="text-pink-400 text-2xl md:text-3xl font-sans font-bold tracking-widest uppercase mb-4">
                  best HOD we could ever have!
                </p>

                <p className="text-3xl md:text-6xl font-serif font-black tracking-tight text-[#fafaf9] my-2">
                  HAPPY TEACHER'S DAY!
                </p>

                <p className="text-3xl md:text-5xl font-serif font-black tracking-tight text-pink-500 my-2">
                  GEETHA REDDY MAM ❤️
                </p>
              </div>
            </div>

            <blockquote className="text-xl md:text-3xl font-serif italic text-[#cbd5e1] max-w-3xl mx-auto leading-relaxed mt-8">
              “Thank you for keeping us disciplined, guiding us, and being the best HOD we could ever ask for.” ✨
            </blockquote>

            <div className="mt-8 pt-6 border-t border-pink-500/30">
              <p className="text-2xl md:text-4xl font-serif font-bold text-[#fafaf9] italic tracking-wide">
                “Discipline and Success go hand in hand!” 🎓✨
              </p>
            </div>

            <div className="mt-8 text-xs font-sans tracking-[0.3em] text-pink-500/70 uppercase">
              Class of 2026 Tribute • HOD Edition
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
