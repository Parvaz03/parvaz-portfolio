import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    year: '2022 – 2026',
    institution: 'Sir Issac Newton College of Engineering and Technology',
    degree: 'B.E. Computer Science Engineering',
    score: 'CGPA: 8.01',
    highlight: true,
  },
  {
    year: 'Higher Secondary',
    institution: 'Oxford Matriculation Higher Secondary School',
    degree: '',
    score: 'HSC: 75.6%',
    highlight: false,
  },
  {
    year: 'Secondary',
    institution: 'Oxford Matriculation Higher Secondary School',
    degree: '',
    score: 'SSLC: 68.4%',
    highlight: false,
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (itemsRef.current) {
        const items = itemsRef.current.querySelectorAll('.timeline-item');
        gsap.from(items, {
          x: -30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative bg-[#0D0D14]"
      style={{ zIndex: 3 }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-[120px]">
        <span className="font-mono text-xs tracking-[0.08em] text-[#4A7CFF] uppercase">
          Education
        </span>

        <h2 className="mt-4 font-archivo text-[clamp(36px,5vw,48px)] font-bold text-[#F0F0F5]">
          Academic Journey
        </h2>

        <div ref={itemsRef} className="mt-14 relative">
          {/* Vertical line - desktop only */}
          <div
            className="hidden lg:block absolute left-[5px] top-0 w-0.5 h-full"
            style={{
              background: 'linear-gradient(to bottom, #4A7CFF, #8B5CF6)',
            }}
          />

          <div className="space-y-12">
            {educationData.map((edu, i) => (
              <div key={i} className="timeline-item relative pl-0 lg:pl-10">
                {/* Node - desktop only */}
                <div
                  className="hidden lg:block absolute left-0 top-2 w-[10px] h-[10px] rounded-full border-2 border-[#4A7CFF]"
                  style={{ backgroundColor: '#0D0D14' }}
                />

                <span
                  className={`font-mono text-[13px] ${
                    edu.highlight ? 'text-[#4A7CFF]' : 'text-[#8A8A95]'
                  }`}
                >
                  {edu.year}
                </span>

                <h3 className="mt-2 font-archivo text-[22px] font-semibold text-[#F0F0F5]">
                  {edu.institution}
                </h3>

                {edu.degree && (
                  <p className="mt-1 text-base text-[#8A8A95]">{edu.degree}</p>
                )}

                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`font-archivo text-xl font-bold ${
                      edu.highlight ? 'text-[#F0F0F5]' : 'text-[#8A8A95]'
                    }`}
                  >
                    {edu.score}
                  </span>
                  {edu.highlight && <Star size={16} className="text-[#4A7CFF]" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
