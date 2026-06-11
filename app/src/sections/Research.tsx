import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const keywords = [
  'Blockchain',
  'Cloud Security',
  'Post-Quantum Cryptography',
  'Privacy Preservation',
  'Data Auditing',
];

export default function Research() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="research"
      ref={sectionRef}
      className="relative bg-[#0A0A0F]"
      style={{ zIndex: 3 }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-[120px]">
        <span className="font-mono text-xs tracking-[0.08em] text-[#8B5CF6] uppercase">
          Research
        </span>

        <h2 className="mt-4 font-archivo text-[clamp(36px,5vw,48px)] font-bold text-[#F0F0F5]">
          Published Research
        </h2>

        <div
          ref={contentRef}
          className="mt-12 bg-[rgba(10,10,15,0.6)] border border-[rgba(139,92,246,0.15)] rounded-xl overflow-hidden hover:border-[rgba(139,92,246,0.3)] transition-colors duration-400 relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[70%_30%]">
            {/* Text area */}
            <div className="p-6 sm:p-8 md:p-12">
              <span className="inline-block font-mono text-[11px] text-[#4A7CFF]">
                JOURNAL ARTICLE
              </span>

              <h3 className="mt-3 font-archivo text-[24px] md:text-[28px] font-bold text-[#F0F0F5] leading-[1.2]">
                Blockchain-Enabled Privacy Preserving Cloud Data Auditing
              </h3>

              <p className="mt-2 text-[15px] text-[#8A8A95]">
                Parvaz Imamudeen, et al.
              </p>

              <p className="mt-1 text-[15px] text-[#8A8A95] italic">
                International Journal of Innovative Research in Science, Engineering and Technology
                (IJIRSET)
              </p>

              <p className="mt-4 text-base text-[#8A8A95] leading-[1.65] max-w-[640px]">
                This paper proposes a blockchain-based framework for secure and privacy-preserving
                cloud data auditing. By integrating post-quantum cryptographic primitives with
                distributed ledger technology, the system ensures data integrity while maintaining
                user privacy in multi-cloud environments.
              </p>

              <ul className="mt-5 space-y-2 text-sm text-[#8A8A95] list-none">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"></span>
                  <span>Research Publication (IJIRSET 2026)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"></span>
                  <span>Published Paper Available</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"></span>
                  <span>Click to Read Full Paper</span>
                </li>
              </ul>

              <div className="mt-6">
                <a
                  href="https://www.ijirset.com/upload/2026/march/291_Block%20chain-Enabled%20Privacy%20Preserving%20Cloud%20Data%20Auditing.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 font-mono text-xs text-[#F0F0F5] bg-[rgba(139,92,246,0.1)] hover:bg-[#8B5CF6] border border-[rgba(139,92,246,0.2)] hover:border-transparent px-5 py-3 rounded-lg transition-all duration-300 shadow-[0_0_10px_rgba(139,92,246,0.05)] hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]"
                >
                  <FileText size={16} />
                  <span>Read Research Paper</span>
                </a>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {keywords.map((kw) => (
                  <span
                    key={kw}
                    className="font-mono text-[11px] text-[#8A8A95] border border-[rgba(138,138,149,0.2)] px-3 py-1 rounded"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Badge area */}
            <div className="hidden lg:flex items-center justify-center border-l border-[rgba(138,138,149,0.1)] relative">
              <div className="flex flex-col items-center gap-6">
                <span
                  className="font-archivo text-sm tracking-[0.1em] text-[#555560]"
                  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                >
                  IJIRSET 2026
                </span>
                <div
                  className="w-px h-[120px]"
                  style={{ backgroundColor: '#555560' }}
                />
              </div>
            </div>
          </div>

          {/* Year watermark */}
          <div className="hidden sm:block absolute bottom-4 right-6 font-archivo text-[48px] font-bold text-[#555560] opacity-30 pointer-events-none select-none">
            2026
          </div>
        </div>
      </div>
    </section>
  );
}
