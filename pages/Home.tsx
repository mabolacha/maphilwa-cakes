
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Editable from '../components/Editable';
import EditableImage from '../components/EditableImage';
import { useContent } from '../context/ContentContext';

const Home: React.FC = () => {
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const { content } = useContent();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el);
  };

  return (
    <div className="bg-[#FAF8F5]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <EditableImage path="hero.image" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-white/10"></div>
        </div>
        <div className="relative z-10 text-center px-6 fade-in-scroll visible">
          <Editable 
            path="hero.title" 
            tagName="h1" 
            className="text-3xl md:text-5xl font-serif mb-6 tracking-tight text-[#2B2B2B]" 
          />
          <Editable 
            path="hero.subtitle" 
            tagName="p" 
            className="text-[9px] md:text-[10px] font-light text-[#6F6F6F] mb-12 uppercase tracking-[0.4em]" 
          />
          <Link to="/contact" className="inline-block px-12 py-4 bg-[#C9A050] text-white hover:bg-[#B68F42] transition-all duration-500 uppercase tracking-[0.3em] text-[10px] font-semibold">
            <Editable path="hero.cta" tagName="span" />
          </Link>
        </div>
      </section>

      {/* Welcome Section */}
      <section ref={addToRefs} className="py-24 px-6 fade-in-scroll bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#C9A050] uppercase tracking-[0.4em] text-[9px] mb-4 block">Bienvenue</span>
          <div className="overflow-hidden">
            <Editable 
              path="home.welcome.title" 
              tagName="h2" 
              className="text-xl md:text-2xl font-serif mb-8 text-[#2B2B2B]" 
            />
          </div>
          <div className="gold-line w-24 mx-auto mb-10"></div>
          <Editable 
            path="home.welcome.description" 
            multiline 
            tagName="p" 
            className="text-[#6F6F6F] text-[13px] leading-relaxed font-light italic max-w-lg mx-auto" 
          />
        </div>
      </section>

      {/* Final CTA Section */}
      <section ref={addToRefs} className="py-24 px-6 text-center fade-in-scroll bg-white">
        <Editable 
          path="home.cta_bottom.title" 
          tagName="h2" 
          className="text-xl md:text-2xl font-serif mb-8 italic text-[#2B2B2B]" 
        />
        <Editable 
          path="home.cta_bottom.description" 
          multiline
          tagName="p" 
          className="text-[#6F6F6F] text-[13px] font-light max-w-lg mx-auto mb-12" 
        />
        <Link to="/contact" className="inline-block px-12 py-4 border border-[#C9A050] text-[#C9A050] hover:bg-[#C9A050] hover:text-white transition-all duration-500 uppercase tracking-[0.3em] text-[10px] font-semibold">
          Contactez-nous
        </Link>
      </section>

      {/* Testimonials Section */}
      <section ref={addToRefs} className="py-24 px-6 bg-[#FAF8F5] fade-in-scroll border-t border-[#C9A050]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#C9A050] uppercase tracking-[0.4em] text-[9px] mb-4 block">Témoignages</span>
            <h2 className="text-xl md:text-2xl font-serif text-[#2B2B2B]">Avis d'Exception</h2>
            <div className="gold-line w-20 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {(content.home.reviews || []).map((review, i) => (
              <div key={i} className="relative p-10 border border-white/50 hover:border-[#C9A050]/20 transition-all duration-700 bg-white/40 backdrop-blur-sm">
                <span className="text-4xl font-serif text-[#C9A050]/20 absolute top-4 left-6">“</span>
                <div className="relative z-10">
                  <Editable 
                    path={`home.reviews.${i}.quote`} 
                    multiline
                    tagName="p" 
                    className="text-[#6F6F6F] italic font-light leading-relaxed mb-8 text-[12px]" 
                  />
                  <div className="w-8 h-[1px] bg-[#C9A050]/40 mb-4"></div>
                  <Editable 
                    path={`home.reviews.${i}.author`} 
                    tagName="h3" 
                    className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#2B2B2B]" 
                  />
                  <Editable 
                    path={`home.reviews.${i}.event`} 
                    tagName="p" 
                    className="text-[8px] uppercase tracking-[0.1em] text-[#C9A050] mt-1" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
