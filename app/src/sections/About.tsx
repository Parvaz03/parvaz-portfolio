import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftColRef.current, {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(rightColRef.current, {
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      [card1Ref, card2Ref, card3Ref].forEach((ref, i) => {
        gsap.from(ref.current, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          delay: 0.3 + i * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#0A0A0F]"
      style={{ zIndex: 3 }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16">
          {/* Left column */}
          <div ref={leftColRef}>
            <span className="font-mono text-xs tracking-[0.08em] text-[#8B5CF6] uppercase">
              About Me
            </span>

            <h2 className="mt-4 font-archivo text-[clamp(36px,5vw,48px)] font-bold text-[#F0F0F5] leading-[1.1]">
              Driven by curiosity.
              <br />
              Powered by data.
            </h2>

            <p className="mt-8 text-[17px] text-[#8A8A95] leading-[1.65]">
              I&apos;m Parvaz Imamudeen, a Computer Science Engineering student at Sir Issac Newton
              College of Engineering and Technology (2022–2026) with a CGPA of 8.01. I specialize in
              transforming complex datasets into actionable insights and building intelligent software
              solutions.
            </p>

            <p className="mt-6 text-[17px] text-[#8A8A95] leading-[1.65]">
              My research spans blockchain-enabled cloud security and post-quantum cryptography,
              while my hands-on experience in machine learning pipelines drives my passion for
              data-driven decision making.
            </p>

            <div className="mt-8 flex items-center gap-2 text-[14px] text-[#555560]">
              <MapPin size={16} className="text-[#4A7CFF]" />
              <span>Thiruvarur, Tamil Nadu, India</span>
            </div>
          </div>

          {/* Right column */}
          <div ref={rightColRef} className="relative flex items-center justify-center">
            {/* PI Monogram watermark */}
            <div className="relative select-none pointer-events-none">
              <div
                className="font-archivo font-extrabold leading-none"
                style={{
                  fontSize: 'clamp(180px, 22vw, 280px)',
                  color: 'rgba(74,124,255,0.06)',
                  letterSpacing: '-0.02em',
                }}
              >
                PI
              </div>

              {/* Floating stat cards */}
              <div
                ref={card1Ref}
                className="absolute top-[10%] left-[-10%] bg-[rgba(10,10,15,0.8)] border border-[rgba(74,124,255,0.15)] rounded-lg px-6 py-4"
                style={{ transform: 'rotate(-3deg)' }}
              >
                <span className="font-mono text-[11px] text-[#4A7CFF]">CGPA</span>
                <p className="font-archivo text-[28px] font-bold text-[#F0F0F5]">8.01</p>
              </div>

              <div
                ref={card2Ref}
                className="absolute top-[35%] right-[-15%] bg-[rgba(10,10,15,0.8)] border border-[rgba(74,124,255,0.15)] rounded-lg px-6 py-4"
                style={{ transform: 'rotate(2deg)' }}
              >
                <span className="font-mono text-[11px] text-[#4A7CFF]">Research</span>
                <p className="font-archivo text-[28px] font-bold text-[#F0F0F5]">1 Publication</p>
              </div>

              <div
                ref={card3Ref}
                className="absolute bottom-[15%] left-[-5%] bg-[rgba(10,10,15,0.8)] border border-[rgba(74,124,255,0.15)] rounded-lg px-6 py-4"
                style={{ transform: 'rotate(-1deg)' }}
              >
                <span className="font-mono text-[11px] text-[#4A7CFF]">Experience</span>
                <p className="font-archivo text-[28px] font-bold text-[#F0F0F5]">1 Internship</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
