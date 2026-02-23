
import React, { useState, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import Editable from '../components/Editable';
import EditableImage from '../components/EditableImage';
import { Plus, Trash2, Loader2 } from 'lucide-react';

const Weddings: React.FC = () => {
  const { content, isAdmin, addItem, removeItem } = useContent();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [modal, setModal] = useState<{ 
    type: 'prompt' | 'confirm' | null, 
    title?: string, 
    message?: string,
    onConfirm?: (v?: string) => void,
    inputValue?: string
  }>({ type: null });

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setModal({
      type: 'prompt',
      title: "Ajouter un mariage",
      message: "Titre du reportage :",
      inputValue: "Nouveau Mariage",
      onConfirm: (title) => {
        if (!title) return;
        const reader = new FileReader();
        setIsUploading(true);
        reader.onload = () => {
          addItem('weddings.gallery', { title, url: reader.result as string });
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }
    });
    e.target.value = '';
  };

  return (
    <div className="bg-[#FAF8F5] pb-24">
      {/* Modal Custom avec correctif de visibilité */}
      {modal.type && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white p-8 max-w-md w-full shadow-2xl border border-[#C9A050]/20 rounded-sm">
            <h3 className="text-xl font-serif italic text-[#2B2B2B] mb-4">{modal.title}</h3>
            <p className="text-[#6F6F6F] text-sm mb-6 font-light">{modal.message}</p>
            {modal.type === 'prompt' && (
              <input 
                autoFocus
                type="text"
                className="w-full bg-white text-[#2B2B2B] border-b border-[#C9A050] p-3 mb-8 outline-none font-light focus:bg-[#FAF8F5] transition-colors"
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
              <button onClick={() => setModal({ type: null })} className="text-[10px] uppercase tracking-widest text-[#6F6F6F] hover:text-[#2B2B2B] transition-colors font-medium">Annuler</button>
              <button onClick={() => { modal.onConfirm?.(modal.inputValue); setModal({ type: null }); }}
                className="bg-[#C9A050] text-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold shadow-lg hover:bg-[#B68F42] transition-all transform active:scale-95">Confirmer</button>
            </div>
          </div>
        </div>
      )}

      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden mb-24">
        <div className="absolute inset-0 z-0">
          <EditableImage path="weddings.heroImage" className="w-full h-full object-cover" alt="Hero" />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <span className="text-[#C9A050] uppercase tracking-[0.4em] text-[10px] mb-6 block font-bold">Collection</span>
          <Editable path="weddings.title" tagName="h1" className="text-3xl md:text-5xl font-serif text-[#2B2B2B] mb-8 tracking-tight" />
          <div className="gold-line w-24 mx-auto mb-8"></div>
          <Editable path="weddings.subtitle" tagName="p" className="text-[#2B2B2B] font-light italic text-base md:text-lg max-w-2xl mx-auto" />
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-serif italic text-[#2B2B2B]">Nos Réalisations</h2>
            <div className="gold-line w-20 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.weddings.gallery.map((img, i) => (
              <div key={i} className="group relative">
                <div className="aspect-[3/4] overflow-hidden mb-4 bg-white border border-[#C9A050]/5 shadow-sm relative">
                  <img src={img.url} className="w-full h-full object-cover img-zoom" alt={img.title} />
                  {isAdmin && (
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        setModal({
                          type: 'confirm',
                          title: "Suppression",
                          message: "Supprimer ce mariage de la collection ?",
                          onConfirm: () => removeItem('weddings.gallery', i)
                        });
                      }}
                      className="absolute top-4 right-4 z-[50] p-3 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-xl hover:bg-red-600 pointer-events-auto"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
                <Editable path={`weddings.gallery.${i}.title`} tagName="p" className="text-center text-[10px] uppercase tracking-widest text-[#2B2B2B] opacity-60" />
              </div>
            ))}

            {isAdmin && (
              <div onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`aspect-[3/4] border-2 border-dashed border-[#C9A050]/30 flex flex-col items-center justify-center gap-4 transition-all group ${isUploading ? 'cursor-wait' : 'cursor-pointer hover:bg-[#C9A050]/5'}`}>
                <input type="file" ref={fileInputRef} onChange={handleAddImage} accept="image/*" className="hidden" />
                <div className="w-12 h-12 rounded-full border border-[#C9A050] flex items-center justify-center text-[#C9A050] group-hover:bg-[#C9A050] group-hover:text-white transition-all">
                  {isUploading ? <Loader2 size={24} className="animate-spin" /> : <Plus size={24} />}
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#C9A050]">
                  {isUploading ? "Envoi..." : "Ajouter un mariage"}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Weddings;
