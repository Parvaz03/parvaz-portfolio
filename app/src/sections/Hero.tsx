import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const [showChevron, setShowChevron] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowChevron(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-end pb-[12vh] px-6 md:px-[12%]"
      style={{ zIndex: 2 }}
    >
      <div className="max-w-[600px]">
        <span className="font-mono text-xs tracking-[0.08em] text-[#4A7CFF] uppercase">
          Computer Science Engineering &apos;26
        </span>

        <h1 className="mt-6">
          <span
            className="block font-archivo font-extrabold text-[#F0F0F5] tracking-[-0.02em] leading-[0.95]"
            style={{
              fontSize: 'clamp(64px, 10vw, 140px)',
              textShadow: '0 0 40px rgba(5,5,8,0.8), 0 2px 10px rgba(5,5,8,0.6)',
            }}
          >
            Parvaz
          </span>
          <span
            className="block font-archivo font-extrabold text-[#F0F0F5] tracking-[-0.02em] leading-[0.95] mt-2"
            style={{
              fontSize: 'clamp(64px, 10vw, 140px)',
              textShadow: '0 0 40px rgba(5,5,8,0.8), 0 2px 10px rgba(5,5,8,0.6)',
            }}
          >
            Imamudeen
          </span>
        </h1>

        <p
          className="mt-6 text-[20px] font-normal text-[#8A8A95]"
          style={{ textShadow: '0 0 40px rgba(5,5,8,0.8), 0 2px 10px rgba(5,5,8,0.6)' }}
        >
          Data Analyst & Machine Learning Researcher
        </p>

        <p
          className="mt-4 text-[17px] text-[#555560] max-w-[480px]"
          style={{ textShadow: '0 0 40px rgba(5,5,8,0.8), 0 2px 10px rgba(5,5,8,0.6)' }}
        >
          Transforming data into insights. Building intelligent systems. Securing the cloud.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a
            href="#projects"
            onClick={(e) => handleNavClick(e, '#projects')}
            className="inline-flex items-center justify-center px-8 py-[14px] bg-[#4A7CFF] text-[#050508] font-archivo text-sm font-semibold rounded hover:bg-[#6B95FF] transition-colors duration-300"
          >
            View Projects
          </a>
          <a
            href="/Parvaz_Imamudeen_Resume.pdf"
            download="Parvaz_Imamudeen_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-[14px] border border-[#555560] text-[#F0F0F5] font-archivo text-sm font-semibold rounded hover:border-[#4A7CFF] hover:text-[#4A7CFF] transition-colors duration-300"
          >
            📄 Download Resume
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      {showChevron && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{
            animation: 'bounce 1.5s infinite',
            opacity: showChevron ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          <ChevronDown size={20} className="text-[#555560]" />
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  );
}
