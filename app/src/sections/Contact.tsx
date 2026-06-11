import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Linkedin, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: 'parvaz0303@gmail.com',
    action: 'Send Email',
    href: 'mailto:parvaz0303@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Thiruvarur, Tamil Nadu, India',
    action: 'View Map',
    href: 'https://maps.google.com/?q=Thiruvarur,Tamil+Nadu,India',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'LinkedIn Profile',
    action: 'Connect',
    href: 'https://linkedin.com',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'GitHub Profile',
    action: 'Follow',
    href: 'https://github.com/Parvaz03',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

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

      if (itemsRef.current) {
        const items = itemsRef.current.querySelectorAll('.contact-item');
        gsap.from(items, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemsRef.current,
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
      id="contact"
      ref={sectionRef}
      className="relative bg-[#0D0D14]"
      style={{ zIndex: 3 }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-[120px]">
        <div ref={titleRef}>
          <span className="font-mono text-xs tracking-[0.08em] text-[#4A7CFF] uppercase">
            Contact
          </span>

          <h2 className="mt-4 font-archivo text-[clamp(36px,5vw,48px)] font-bold text-[#F0F0F5]">
            Let&apos;s Connect
          </h2>

          <p className="mt-4 text-[17px] text-[#8A8A95] max-w-[480px]">
            Open to data analyst roles, ML research collaborations, and exciting projects.
          </p>
        </div>

        <div
          ref={itemsRef}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="contact-item group bg-[rgba(10,10,15,0.6)] border border-[rgba(138,138,149,0.1)] rounded-xl p-6 sm:p-8 hover:border-[rgba(74,124,255,0.2)] transition-colors duration-400 block overflow-hidden"
              >
                <Icon size={32} className="text-[#4A7CFF]" />
                <p className="mt-4 font-archivo text-base sm:text-lg font-semibold text-[#F0F0F5] break-all break-words">
                  {item.value}
                </p>
                <span className="mt-2 inline-block text-sm text-[#4A7CFF] group-hover:underline">
                  {item.action} &rarr;
                </span>
              </a>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-20 text-center">
          <p className="text-sm text-[#555560]">
            &copy; 2024 Parvaz Imamudeen. Built with data, code, and curiosity.
          </p>
        </div>
      </div>
    </section>
  );
}
