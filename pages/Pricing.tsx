
import React from 'react';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';
import Editable from '../components/Editable';
import { CreditCard, Truck, Cake, CheckCircle, Layers } from 'lucide-react';

const Pricing: React.FC = () => {
  const { content } = useContent();

  return (
    <div className="bg-[#FAF8F5] pt-32 md:pt-48 pb-24">
      {/* Header - Left aligned for premium editorial feel */}
      <section className="px-6 mb-24">
        <div className="max-w-4xl mx-auto text-left">
          <span className="text-[#C9A050] uppercase tracking-[0.4em] text-[10px] mb-4 block font-semibold">Investissement</span>
          <Editable 
            path="pricing.title" 
            tagName="h1" 
            className="text-3xl md:text-5xl font-serif text-[#2B2B2B] mb-10 tracking-tight" 
          />
          <Editable 
            path="pricing.subtitle" 
            tagName="p" 
            multiline
            className="text-[#6F6F6F] text-sm font-light leading-relaxed max-w-3xl text-justify whitespace-pre-line" 
          />
        </div>
      </section>

      {/* Section 1: Tarifs */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="gold-line w-20 mx-auto mb-4"></div>
            <h2 className="text-2xl font-serif italic text-[#2B2B2B]">Nos Tarifs</h2>
            <Editable 
              path="pricing.partsSubtitle" 
              tagName="p" 
              className="text-[#C9A050] text-[10px] uppercase tracking-[0.2em] mt-2 font-medium" 
            />
            <div className="gold-line w-20 mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.pricing.tiers.map((tier, i) => (
              <div key={i} className="bg-white p-12 border border-[#C9A050]/10 shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-10 h-10 bg-[#FAF8F5] rounded-full flex items-center justify-center mb-8 group-hover:bg-[#C9A050]/10 transition-colors">
                  <CreditCard className="text-[#C9A050]" size={18} />
                </div>
                <Editable 
                  path={`pricing.tiers.${i}.name`} 
                  tagName="h3" 
                  className="text-lg font-serif mb-4 text-[#2B2B2B] tracking-wide" 
                />
                <Editable 
                  path={`pricing.tiers.${i}.price`} 
                  tagName="p" 
                  className="text-[#C9A050] font-bold text-base mb-6" 
                />
                <Editable 
                  path={`pricing.tiers.${i}.desc`} 
                  tagName="p" 
                  className="text-[12px] text-[#6F6F6F] font-light leading-relaxed mb-8" 
                />
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-[#C9A050] font-semibold">
                  <CheckCircle size={12} />
                  <span>Sur devis personnalisé</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Gâteau de Service */}
      <section className="py-24 px-6 bg-white border-y border-[#C9A050]/10 mb-32">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden border border-[#C9A050]/20 p-3 bg-white shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=800" 
                  alt="Service cake example" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#FAF8F5] border border-[#C9A050]/10 hidden md:flex items-center justify-center">
                 <Cake className="text-[#C9A050]" size={32} />
              </div>
            </div>
            
            <div className="space-y-8">
              <Editable 
                path="pricing.serviceCake.title" 
                tagName="h2" 
                className="text-2xl font-serif italic text-[#2B2B2B]" 
              />
              <Editable 
                path="pricing.serviceCake.description" 
                multiline
                tagName="p" 
                className="text-[#6F6F6F] text-sm font-light leading-relaxed" 
              />
              <div className="p-6 bg-[#FAF8F5] border-l-2 border-[#C9A050]">
                <Editable 
                  path="pricing.serviceCake.benefit" 
                  tagName="p" 
                  multiline
                  className="text-[13px] text-[#2B2B2B] italic font-light whitespace-pre-line" 
                />
              </div>
              <Editable 
                path="pricing.serviceCake.price" 
                tagName="p" 
                className="text-lg font-serif text-[#C9A050]" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Livraison */}
      <section className="px-6 mb-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Truck className="text-[#C9A050] mx-auto mb-6" size={40} strokeWidth={1} />
            <Editable 
              path="pricing.delivery.title" 
              tagName="h2" 
              className="text-2xl font-serif italic text-[#2B2B2B] mb-8" 
            />
            <Editable 
              path="pricing.delivery.description" 
              multiline
              tagName="p" 
              className="text-[#6F6F6F] text-sm font-light leading-relaxed max-w-2xl mx-auto mb-12" 
            />
          </div>

          {/* New Sub-section: Assembly Supplement */}
          <div className="bg-white border border-[#C9A050]/10 p-8 md:p-10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Layers size={64} className="text-[#C9A050]" />
            </div>
            <div className="relative z-10">
              <Editable 
                path="pricing.delivery.assemblySupplement.title" 
                tagName="h3" 
                className="text-lg font-serif mb-4 text-[#2B2B2B] italic" 
              />
              <Editable 
                path="pricing.delivery.assemblySupplement.description" 
                multiline
                tagName="p" 
                className="text-[#6F6F6F] text-sm font-light leading-relaxed max-w-2xl" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center border-t border-[#C9A050]/10 bg-white">
        <h2 className="text-2xl font-serif mb-8 italic text-[#2B2B2B]">Un projet d'exception ?</h2>
        <Link to="/contact" className="inline-block px-12 py-4 bg-[#C9A050] text-white hover:bg-[#B68F42] transition-all duration-500 uppercase tracking-[0.3em] text-[10px] font-semibold">
          Demander un devis
        </Link>
      </section>
    </div>
  );
};

// Fixed the missing default export
export default Pricing;
