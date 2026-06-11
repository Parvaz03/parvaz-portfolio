import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Bot, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    icon: Award,
    title: 'Machine Learning',
    subtitle: 'Certification',
  },
  {
    icon: Bot,
    title: 'Naan Mudhalvan',
    subtitle: 'Robotics Foundation',
  },
  {
    icon: FileText,
    title: 'Research Publication',
    subtitle: 'Certification',
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.cert-card');
        gsap.from(cards, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0A0A0F]"
      style={{ zIndex: 3 }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <span className="font-mono text-xs tracking-[0.08em] text-[#8B5CF6] uppercase">
          Certifications
        </span>

        <h2 className="mt-4 font-archivo text-[36px] font-bold text-[#F0F0F5]">Credentials</h2>

        <div ref={cardsRef} className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => {
            const Icon = cert.icon;
            return (
              <div
                key={cert.title}
                className="cert-card bg-[rgba(10,10,15,0.6)] border border-[rgba(138,138,149,0.1)] rounded-xl p-7 hover:border-[rgba(74,124,255,0.2)] transition-colors duration-400"
                role="article"
                aria-label={`${cert.title} ${cert.subtitle}`}
              >
                <Icon size={28} className="text-[#4A7CFF]" />
                <h3 className="mt-4 font-archivo text-lg font-semibold text-[#F0F0F5]">
                  {cert.title}
                </h3>
                <p className="mt-1 text-sm text-[#8A8A95]">{cert.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
