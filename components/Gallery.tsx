
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '../types';
import Editable from './Editable';
import EditableImage from './EditableImage';
import { useContent } from '../context/ContentContext';

interface GalleryProps {
  images: GalleryImage[];
  basePath?: string; // e.g. "gallery.items"
}

const Gallery: React.FC<GalleryProps> = ({ images, basePath }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { isAdmin } = useContent();

  const openLightbox = (index: number) => {
    if (!isAdmin) setSelectedImage(index);
  };
  
  const closeLightbox = () => setSelectedImage(null);
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) setSelectedImage((selectedImage + 1) % images.length);
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) setSelectedImage((selectedImage - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((image, index) => {
          // Utiliser l'index original si présent (pour le filtrage), sinon l'index de la boucle
          const targetIndex = image.originalIndex !== undefined ? image.originalIndex : index;
          
          return (
            <div 
              key={`${targetIndex}-${index}`} 
              className={`group relative aspect-[3/4] overflow-hidden bg-[#111] ${isAdmin ? '' : 'cursor-pointer'}`}
              onClick={() => openLightbox(index)}
            >
              {basePath ? (
                <EditableImage 
                  path={`${basePath}.${targetIndex}.url`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={image.title} 
                />
              ) : (
                <img 
                  src={image.url} 
                  alt={image.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-4">
                {basePath ? (
                  <Editable 
                    path={`${basePath}.${targetIndex}.title`} 
                    tagName="span" 
                    className="text-white font-serif italic text-xl tracking-wider text-center" 
                  />
                ) : (
                  <span className="text-white font-serif italic text-xl tracking-wider text-center">{image.title}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4 md:p-10" onClick={closeLightbox}>
          <button className="absolute top-10 right-10 text-white hover:text-[#c9a050] transition-colors" onClick={closeLightbox}>
            <X size={40} />
          </button>
          
          <button className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-colors" onClick={prevImage}>
            <ChevronLeft size={48} />
          </button>
          
          <div className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center">
            <img 
              src={images[selectedImage].url} 
              alt={images[selectedImage].title} 
              className="max-w-full max-h-full object-contain fade-in"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white mt-6 font-serif text-2xl tracking-widest uppercase text-center">{images[selectedImage].title}</p>
          </div>

          <button className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-colors" onClick={nextImage}>
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
