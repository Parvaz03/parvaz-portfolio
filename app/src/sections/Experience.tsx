import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const responsibilities = [
  'Built and deployed end-to-end ML pipelines for real-world datasets',
  'Performed data preprocessing, feature selection, and model optimization',
  'Trained and evaluated supervised learning models for predictive analytics',
  'Collaborated with senior developers on production-ready AI solutions',
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(rightRef.current, {
        x: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-[#0A0A0F]"
      style={{ zIndex: 3 }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 lg:gap-16">
          {/* Left column */}
          <div ref={leftRef}>
            <span className="font-mono text-xs tracking-[0.08em] text-[#8B5CF6] uppercase">
              Experience
            </span>

            <h2 className="mt-4 font-archivo text-[clamp(36px,5vw,48px)] font-bold text-[#F0F0F5] leading-[1.1]">
              Machine Learning
              <br />
              Intern
            </h2>

            <p className="mt-2 text-lg font-medium text-[#F0F0F5]">
              E-Soft IT Solutions, Trichy
            </p>

            <span className="inline-block mt-3 font-mono text-xs text-[#4A7CFF] bg-[rgba(74,124,255,0.1)] px-3 py-1 rounded">
              2024
            </span>

            <ul className="mt-8 space-y-3">
              {responsibilities.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 bg-[#4A7CFF] rounded-sm flex-shrink-0" />
                  <span className="text-base text-[#8A8A95] leading-[1.7]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column - Timeline visual */}
          <div ref={rightRef} className="flex items-center justify-center">
            <div className="relative flex flex-col items-center">
              {/* Glowing node */}
              <div
                className="w-3 h-3 rounded-full bg-[#4A7CFF]"
                style={{
                  boxShadow: '0 0 20px rgba(74,124,255,0.5)',
                  animation: 'pulse 2s infinite',
                }}
              />

              {/* Vertical line */}
              <div
                className="w-0.5 h-[320px] mt-2"
                style={{
                  background: 'linear-gradient(to bottom, #4A7CFF, #8B5CF6)',
                }}
              />

              {/* E-Soft logo area */}
              <div className="mt-6 font-archivo text-[64px] font-bold text-[#555560]">E</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
}
