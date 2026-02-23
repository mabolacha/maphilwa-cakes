
import React from 'react';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';
import Editable from '../components/Editable';
import EditableImage from '../components/EditableImage';

const Celebrations: React.FC = () => {
  const { content } = useContent();

  return (
    <div className="bg-[#FAF8F5] pt-32 md:pt-48 pb-24">
      <section className="px-6 mb-24 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#C9A050] uppercase tracking-[0.4em] text-[10px] mb-4 block">Collection</span>
          <Editable 
            path="celebrations.title" 
            tagName="h1" 
            className="text-4xl md:text-6xl font-serif text-[#2B2B2B] mb-8" 
          />
          <Editable 
            path="celebrations.subtitle" 
            tagName="p" 
            className="text-[#6F6F6F] font-light italic max-w-xl mx-auto" 
          />
        </div>
      </section>

      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="gold-line w-20 mx-auto mb-4"></div>
            <h2 className="text-2xl font-serif italic text-[#2B2B2B]">Types d'événements</h2>
            <div className="gold-line w-20 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.celebrations.types.map((type, i) => (
              <div key={i} className="group cursor-pointer text-center">
                <div className="aspect-square overflow-hidden mb-4 bg-white border border-[#C9A050]/5">
                  <EditableImage path={`celebrations.types.${i}.image`} className="w-full h-full object-cover img-zoom" alt={type.title} />
                </div>
                <Editable 
                  path={`celebrations.types.${i}.title`} 
                  tagName="p" 
                  className="text-center text-[11px] uppercase tracking-widest text-[#2B2B2B] opacity-60 group-hover:opacity-100 transition-all border-b border-transparent group-hover:border-[#C9A050] inline-block w-full pb-1" 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-serif mb-8 italic text-[#2B2B2B]">Une occasion spéciale à fêter ?</h2>
        <Link to="/contact" className="inline-block px-12 py-4 bg-[#C9A050] text-white hover:bg-[#B68F42] transition-all duration-500 uppercase tracking-[0.3em] text-[10px] font-semibold">
          Concevons votre gâteau
        </Link>
      </section>
    </div>
  );
};

export default Celebrations;
