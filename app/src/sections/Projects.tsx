import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const netflixTechTags = ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Cosine Similarity'];
const blockchainTechTags = ['Blockchain', 'Post-Quantum Crypto', 'Cloud Security', 'Python'];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(card1Ref.current, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card1Ref.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      gsap.from(card2Ref.current, {
        y: 50,
        opacity: 0,
        duration: 0.7,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card2Ref.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-[#0D0D14]"
      style={{ zIndex: 3 }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-[120px]">
        <div ref={titleRef}>
          <span className="font-mono text-xs tracking-[0.08em] text-[#4A7CFF] uppercase">
            Projects
          </span>

          <h2 className="mt-4 font-archivo text-[clamp(36px,5vw,48px)] font-bold text-[#F0F0F5]">
            Featured Work
          </h2>

          <p className="mt-4 text-[17px] text-[#8A8A95] max-w-[560px]">
            Projects that demonstrate my ability to solve real problems with data and code.
          </p>
        </div>

        <div className="mt-14 space-y-8">
          {/* Card 1 - Netflix (featured, full width) */}
          <div
            ref={card1Ref}
            className="group bg-[rgba(10,10,15,0.8)] border border-[rgba(138,138,149,0.1)] rounded-xl overflow-hidden hover:border-[rgba(74,124,255,0.2)] hover:-translate-y-0.5 transition-all duration-400"
            role="article"
            aria-label="Netflix Recommendation System"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%]">
              {/* Content */}
              <div className="p-6 sm:p-8 md:p-12 order-2 lg:order-1">
                <span className="inline-block font-mono text-[11px] text-[#4A7CFF] bg-[rgba(74,124,255,0.1)] px-2.5 py-1 rounded">
                  MACHINE LEARNING
                </span>

                <h3 className="mt-4 font-archivo text-[28px] md:text-[32px] font-bold text-[#F0F0F5]">
                  Netflix Recommendation System
                </h3>

                <p className="mt-3 text-base text-[#8A8A95] leading-[1.6]">
                  A collaborative filtering-based recommendation engine that analyzes user viewing
                  patterns and movie attributes to suggest personalized content. Built with Python,
                  Pandas, and Scikit-Learn, processing 10,000+ movie records with cosine similarity
                  algorithms.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {netflixTechTags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] text-[#8A8A95] border border-[rgba(138,138,149,0.2)] px-3 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-8">
                  <div>
                    <p className="font-archivo text-[28px] font-bold text-[#F0F0F5]">85%</p>
                    <p className="text-xs text-[#555560]">Accuracy</p>
                  </div>
                  <div>
                    <p className="font-archivo text-[28px] font-bold text-[#F0F0F5]">10K+</p>
                    <p className="text-xs text-[#555560]">Records</p>
                  </div>
                  <div>
                    <p className="font-archivo text-[28px] font-bold text-[#F0F0F5]">30%</p>
                    <p className="text-xs text-[#555560]">Latency Reduction</p>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href="https://github.com/Parvaz03/Netflix_RS.git"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs text-[#F0F0F5] bg-[rgba(74,124,255,0.1)] hover:bg-[#4A7CFF] border border-[rgba(74,124,255,0.2)] hover:border-transparent px-5 py-3 rounded-lg transition-all duration-300 shadow-[0_0_10px_rgba(74,124,255,0.05)] hover:shadow-[0_0_20px_rgba(74,124,255,0.2)]"
                  >
                    <Github size={14} />
                    <span>View Source Code</span>
                  </a>
                </div>
              </div>

              {/* Image */}
              <div className="order-1 lg:order-2">
                <img
                  src="/netflix-recommendation.jpg"
                  alt="Netflix Recommendation System visualization"
                  className="w-full h-full object-cover min-h-[250px] lg:min-h-0"
                />
              </div>
            </div>
          </div>

          {/* Card 2 - Blockchain */}
          <div
            ref={card2Ref}
            className="group bg-[rgba(10,10,15,0.8)] border border-[rgba(138,138,149,0.1)] rounded-xl overflow-hidden hover:border-[rgba(74,124,255,0.2)] hover:-translate-y-0.5 transition-all duration-400 max-w-full"
            role="article"
            aria-label="Blockchain-Enabled Cloud Data Auditing"
          >
            <img
              src="/blockchain-cloud.jpg"
              alt="Blockchain cloud auditing visualization"
              className="w-full aspect-video object-cover"
            />

            <div className="p-6 md:p-8">
              <span className="inline-block font-mono text-[11px] text-[#8B5CF6] bg-[rgba(139,92,246,0.1)] px-2.5 py-1 rounded">
                RESEARCH PROJECT
              </span>

              <h3 className="mt-3 font-archivo text-2xl font-bold text-[#F0F0F5]">
                Blockchain-Enabled Cloud Data Auditing
              </h3>

              <p className="mt-2 text-[15px] text-[#8A8A95] leading-[1.6]">
                A privacy-preserving cloud auditing system using blockchain and post-quantum
                cryptography. Ensures data integrity and confidentiality in distributed cloud storage
                environments.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {blockchainTechTags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] text-[#8A8A95] border border-[rgba(138,138,149,0.2)] px-3 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <a
                  href="https://github.com/Parvaz03/blockchain-cloud-data-auditing.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs text-[#F0F0F5] bg-[rgba(74,124,255,0.1)] hover:bg-[#4A7CFF] border border-[rgba(74,124,255,0.2)] hover:border-transparent px-5 py-3 rounded-lg transition-all duration-300 shadow-[0_0_10px_rgba(74,124,255,0.05)] hover:shadow-[0_0_20px_rgba(74,124,255,0.2)]"
                >
                  <Github size={14} />
                  <span>View Source Code</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
