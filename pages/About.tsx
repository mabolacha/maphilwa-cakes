
import React from 'react';
import { useContent } from '../context/ContentContext';
import Editable from '../components/Editable';
import EditableImage from '../components/EditableImage';

const About: React.FC = () => {
  const { content } = useContent();

  return (
    <div className="bg-[#FAF8F5] pt-32 md:pt-48 pb-24">
      {/* Intro Hero */}
      <section className="px-6 mb-24">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[#C9A050] uppercase tracking-[0.4em] text-[10px] mb-4 block">Notre histoire</span>
          <Editable 
            path="about.heroTitle" 
            tagName="h1" 
            className="text-3xl md:text-5xl font-serif text-[#2B2B2B] mb-8" 
          />
          <Editable 
            path="about.quote" 
            tagName="p" 
            className="text-[#6F6F6F] text-sm font-light italic max-w-xl mx-auto" 
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="p-4 border border-[#C9A050]/20">
            <div className="aspect-[4/5] overflow-hidden">
              <EditableImage path="about.image" className="w-full h-full object-cover img-zoom" alt="Pastry chef" />
            </div>
          </div>
          <div className="space-y-8">
            <Editable 
              path="about.introTitle" 
              tagName="h2" 
              className="text-2xl font-serif italic text-[#2B2B2B]" 
            />
            {content.about.introText.map((_, i) => (
              <Editable 
                key={i}
                path={`about.introText.${i}`} 
                multiline
                tagName="p" 
                className="text-[#6F6F6F] text-sm font-light leading-relaxed" 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-24 px-6 border-y border-[#C9A050]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="gold-line w-20 mx-auto mb-4"></div>
            <h2 className="text-2xl font-serif italic text-[#2B2B2B]">Nos Valeurs</h2>
            <div className="gold-line w-20 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {content.about.values.map((v, i) => (
              <div key={i} className="text-center p-8 border border-[#FAF8F5] hover:border-[#C9A050]/20 transition-all duration-500">
                <div className="w-12 h-12 border border-[#C9A050]/30 rotate-45 mx-auto mb-8 flex items-center justify-center">
                  <span className="rotate-[-45deg] text-[#C9A050] font-serif italic text-lg">M</span>
                </div>
                <Editable 
                  path={`about.values.${i}.title`} 
                  tagName="h3" 
                  className="text-lg font-serif mb-4 text-[#2B2B2B] tracking-wide" 
                />
                <Editable 
                  path={`about.values.${i}.desc`} 
                  tagName="p" 
                  className="text-[13px] text-[#6F6F6F] font-light leading-relaxed" 
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
