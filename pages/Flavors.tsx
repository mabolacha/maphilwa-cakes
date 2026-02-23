
import React, { useState, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';
import Editable from '../components/Editable';
import EditableImage from '../components/EditableImage';
import { Plus, Trash2, Loader2 } from 'lucide-react';

const Flavors: React.FC = () => {
  const { content, isAdmin, addItem, removeItem } = useContent();
  const [isUploading, setIsUploading] = useState<{catIndex: number} | null>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Modal State
  const [modal, setModal] = useState<{ 
    type: 'prompt' | 'confirm' | null, 
    title?: string, 
    message?: string,
    onConfirm?: (value?: string) => void,
    inputValue?: string
  }>({ type: null });

  const handleAddFlavor = (catIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setModal({
      type: 'prompt',
      title: "Nouvelle Saveur",
      message: "Quel est le nom de cette nouvelle saveur ?",
      inputValue: "Nom de la saveur",
      onConfirm: (name) => {
        if (!name) return;
        const reader = new FileReader();
        setIsUploading({ catIndex });
        reader.onload = () => {
          addItem(`flavors.categories.${catIndex}.items`, { 
            name, 
            image: reader.result as string 
          });
          setIsUploading(null);
        };
        reader.readAsDataURL(file);
      }
    });
    // Reset input file to allow re-selection of same file if needed
    e.target.value = '';
  };

  const triggerDeleteFlavor = (catIndex: number, itemIndex: number) => {
    setModal({
      type: 'confirm',
      title: "Supprimer la saveur",
      message: "Voulez-vous vraiment retirer cette saveur de la carte ?",
      onConfirm: () => removeItem(`flavors.categories.${catIndex}.items`, itemIndex)
    });
  };

  return (
    <div className="bg-[#FAF8F5] pt-32 md:pt-48 pb-24">
      {/* Modal Custom - Design Premium & Visibilité Garantie */}
      {modal.type && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white p-8 max-w-md w-full shadow-2xl border border-[#C9A050]/20 rounded-sm">
            <h3 className="text-xl font-serif italic text-[#2B2B2B] mb-4">{modal.title}</h3>
            <p className="text-[#6F6F6F] text-sm mb-6 font-light">{modal.message}</p>
            
            {modal.type === 'prompt' && (
              <input 
                autoFocus
                type="text"
                className="w-full bg-white text-[#2B2B2B] border-b border-[#C9A050] p-3 mb-8 outline-none font-light placeholder:text-[#6F6F6F]/40 focus:bg-[#FAF8F5] transition-colors"
                value={modal.inputValue}
                onChange={(e) => setModal({ ...modal, inputValue: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    modal.onConfirm?.(modal.inputValue);
                    setModal({ type: null });
                  }
                }}
              />
            )}

            <div className="flex justify-end gap-6 items-center">
              <button 
                onClick={() => setModal({ type: null })}
                className="text-[10px] uppercase tracking-widest text-[#6F6F6F] hover:text-[#2B2B2B] transition-colors font-medium"
              >
                Annuler
              </button>
              <button 
                onClick={() => {
                  modal.onConfirm?.(modal.inputValue);
                  setModal({ type: null });
                }}
                className="bg-[#C9A050] text-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold shadow-lg hover:bg-[#B68F42] transition-all transform active:scale-95"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <section className="px-6 mb-24">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#C9A050] uppercase tracking-[0.4em] text-[10px] mb-4 block font-bold">L'Atelier des Sens</span>
          <Editable 
            path="flavors.title" 
            tagName="h1" 
            className="text-3xl md:text-5xl font-serif text-[#2B2B2B] mb-8" 
          />
          <Editable 
            path="flavors.intro" 
            tagName="p" 
            className="text-[#6F6F6F] text-sm font-light italic max-w-xl mx-auto" 
          />
        </div>
      </section>

      {/* Visual Flavors Grid */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto space-y-32">
          {content.flavors.categories.map((cat, i) => (
            <div key={i} className="animate-in fade-in duration-1000">
              <div className="text-center mb-16">
                <Editable 
                  path={`flavors.categories.${i}.name`} 
                  tagName="h2" 
                  className="text-2xl md:text-3xl font-serif italic text-[#2B2B2B] relative inline-block pb-4" 
                />
                <div className="gold-line w-32 mx-auto mt-2 opacity-40"></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                {cat.items.map((item, j) => (
                  <div key={j} className="group flex flex-col items-center relative">
                    <div className="w-full aspect-[3/4] overflow-hidden bg-white border border-[#C9A050]/10 mb-6 relative shadow-sm">
                      <EditableImage 
                        path={`flavors.categories.${i}.items.${j}.image`} 
                        className="w-full h-full object-cover img-zoom" 
                        alt={item.name} 
                      />
                      {isAdmin && (
                        <button 
                          onClick={(e) => { 
                            e.preventDefault(); e.stopPropagation(); 
                            triggerDeleteFlavor(i, j); 
                          }}
                          className="absolute top-4 right-4 z-[50] p-3 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-xl hover:bg-red-600 pointer-events-auto"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                      <div className="absolute inset-0 border border-[#C9A050]/0 group-hover:border-[#C9A050]/20 transition-all duration-700 pointer-events-none"></div>
                    </div>
                    <Editable 
                      path={`flavors.categories.${i}.items.${j}.name`} 
                      tagName="h3" 
                      className="text-[11px] font-medium text-[#2B2B2B] uppercase tracking-[0.2em] text-center group-hover:text-[#C9A050] transition-colors" 
                    />
                  </div>
                ))}

                {/* Bouton Ajouter une saveur (Admin uniquement) */}
                {isAdmin && (
                  <div 
                    onClick={() => isUploading === null && fileInputRefs.current[i]?.click()}
                    className={`aspect-[3/4] border-2 border-dashed border-[#C9A050]/30 flex flex-col items-center justify-center gap-4 transition-all group ${isUploading?.catIndex === i ? 'cursor-wait bg-gray-50' : 'cursor-pointer hover:bg-[#C9A050]/5'}`}
                  >
                    <input 
                      type="file" 
                      ref={el => fileInputRefs.current[i] = el} 
                      onChange={(e) => handleAddFlavor(i, e)} 
                      accept="image/*" 
                      className="hidden" 
                    />
                    <div className="w-12 h-12 rounded-full border border-[#C9A050] flex items-center justify-center text-[#C9A050] group-hover:bg-[#C9A050] group-hover:text-white transition-all">
                      {isUploading?.catIndex === i ? <Loader2 size={24} className="animate-spin" /> : <Plus size={24} />}
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#C9A050]">
                      {isUploading?.catIndex === i ? "Traitement..." : "Ajouter une saveur"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Signatures Section */}
      <section className="bg-white py-24 px-6 border-y border-[#C9A050]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="gold-line w-20 mx-auto mb-4"></div>
            <h2 className="text-2xl font-serif italic text-[#2B2B2B]">Signatures de la Maison</h2>
            <div className="gold-line w-20 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {content.flavors.signatures.map((sig, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 border border-[#C9A050]/30 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-[#C9A050] transition-all duration-500 group-hover:border-white">
                  <span className="text-[#C9A050] group-hover:text-white transition-colors font-serif italic">M</span>
                </div>
                <Editable 
                  path={`flavors.signatures.${i}.name`} 
                  tagName="h3" 
                  className="text-lg font-serif mb-2 text-[#2B2B2B]" 
                />
                <Editable 
                  path={`flavors.signatures.${i}.combo`} 
                  tagName="p" 
                  className="text-[9px] uppercase tracking-widest text-[#C9A050] mb-4 font-semibold" 
                />
                <Editable 
                  path={`flavors.signatures.${i}.desc`} 
                  tagName="p" 
                  className="text-[11px] text-[#6F6F6F] font-light italic leading-relaxed" 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center bg-white border-t border-[#C9A050]/10">
        <h2 className="text-2xl font-serif mb-8 italic text-[#2B2B2B]">Envie de goûter ?</h2>
        <Link to="/contact" className="inline-block px-12 py-4 border border-[#C9A050] text-[#C9A050] hover:bg-[#C9A050] hover:text-white transition-all duration-500 uppercase tracking-[0.3em] text-[10px] font-semibold">
          Réserver une dégustation
        </Link>
      </section>
    </div>
  );
};

export default Flavors;
