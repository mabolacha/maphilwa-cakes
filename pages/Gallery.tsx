
import React, { useState, useMemo, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import Editable from '../components/Editable';
import { Plus, Trash2, Loader2, X, Check } from 'lucide-react';

const GalleryPage: React.FC = () => {
  const { content, isAdmin, addItem, removeItem } = useContent();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal State
  const [modal, setModal] = useState<{ 
    type: 'prompt' | 'confirm' | null, 
    title?: string, 
    message?: string,
    onConfirm?: (value?: string) => void,
    inputValue?: string
  }>({ type: null });

  const dynamicFilters = useMemo(() => {
    const categories = new Set<string>();
    content.gallery.items.forEach(item => { if (item.category) categories.add(item.category); });
    const base = [{ label: 'Toutes les photos', value: 'All' }];
    const sorted = Array.from(categories).sort().map(cat => ({
      label: cat === 'Mariage' ? 'Mariages' : cat,
      value: cat
    }));
    return [...base, ...sorted];
  }, [content.gallery.items]);

  const filteredItems = useMemo(() => {
    const items = content.gallery.items.map((item, index) => ({ ...item, originalIndex: index }));
    return activeFilter === 'All' ? items : items.filter(i => i.category === activeFilter);
  }, [content.gallery.items, activeFilter]);

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      setModal({
        type: 'confirm',
        title: "Image trop lourde",
        message: "L'image dépasse 1Mo. Veuillez la compresser.",
        onConfirm: () => {}
      });
      e.target.value = '';
      return;
    }

    setModal({
      type: 'prompt',
      title: "Ajouter une photo",
      message: "Veuillez saisir le titre de cette création :",
      inputValue: "Nouvelle création",
      onConfirm: (title) => {
        if (!title) return;
        const reader = new FileReader();
        setIsUploading(true);
        reader.onload = () => {
          addItem('gallery.items', { 
            title, 
            url: reader.result as string, 
            category: activeFilter === 'All' ? 'Mariage' : activeFilter 
          });
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    });
  };

  const triggerDelete = (index: number) => {
    setModal({
      type: 'confirm',
      title: "Confirmer la suppression",
      message: "Voulez-vous vraiment supprimer cette photo ?",
      onConfirm: () => removeItem('gallery.items', index)
    });
  };

  return (
    <div className="bg-[#FAF8F5] pt-32 md:pt-48 pb-24">
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
                className="w-full bg-white text-[#2B2B2B] border-b border-[#C9A050] p-3 mb-8 outline-none font-light placeholder:text-[#6F6F6F]/30 focus:bg-[#FAF8F5] transition-colors"
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

      <section className="px-6 mb-24 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-[#C9A050] uppercase tracking-[0.4em] text-[10px] mb-4 block font-bold">Découverte</span>
          <Editable path="gallery.title" tagName="h1" className="text-3xl md:text-5xl font-serif text-[#2B2B2B] mb-8" />
          <Editable path="gallery.subtitle" tagName="p" className="text-[#6F6F6F] text-sm font-light italic max-w-xl mx-auto" />
        </div>
      </section>

      <section className="px-6 mb-16 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex justify-center space-x-8 md:space-x-12 min-w-max px-4">
          {dynamicFilters.map((f) => (
            <button key={f.value} onClick={() => setActiveFilter(f.value)}
              className={`relative py-4 text-[9px] uppercase tracking-[0.3em] font-light transition-all duration-500 whitespace-nowrap ${
                activeFilter === f.value ? 'text-[#C9A050] opacity-100' : 'text-[#2B2B2B] opacity-40 hover:opacity-100'
              }`}>
              {f.label}
              {activeFilter === f.value && <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C9A050]"></div>}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((img) => (
              <div key={img.originalIndex} className="group relative aspect-[3/4] overflow-hidden bg-[#111]">
                <img src={img.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={img.title} />
                
                {isAdmin && (
                  <button 
                    onClick={(e) => { 
                      e.preventDefault(); e.stopPropagation(); 
                      triggerDelete(img.originalIndex); 
                    }}
                    className="absolute top-4 right-4 z-[50] p-3 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-xl hover:bg-red-600 pointer-events-auto"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 pointer-events-none z-10">
                  <span className="text-white font-serif italic text-xl tracking-wider text-center">{img.title}</span>
                </div>
              </div>
            ))}

            {isAdmin && (
              <div 
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`aspect-[3/4] border-2 border-dashed border-[#C9A050]/30 flex flex-col items-center justify-center gap-4 transition-all group ${isUploading ? 'cursor-wait bg-gray-50' : 'cursor-pointer hover:bg-[#C9A050]/5'}`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleAddImage} 
                  accept="image/*" 
                  className="hidden" 
                />
                <div className="w-12 h-12 rounded-full border border-[#C9A050] flex items-center justify-center text-[#C9A050] group-hover:bg-[#C9A050] group-hover:text-white transition-all">
                  {isUploading ? <Loader2 size={24} className="animate-spin" /> : <Plus size={24} />}
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#C9A050]">
                  {isUploading ? "Traitement..." : "Ajouter une photo"}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
