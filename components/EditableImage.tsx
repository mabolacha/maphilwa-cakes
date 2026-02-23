
import React, { useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { Image as ImageIcon, Upload } from 'lucide-react';

interface EditableImageProps {
  path: string;
  className?: string;
  alt?: string;
}

const EditableImage: React.FC<EditableImageProps> = ({ path, className = '', alt = '' }) => {
  const { content, updateContent, isAdmin } = useContent();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const getValue = () => {
    return path.split('.').reduce((obj, key) => obj?.[key], content as any);
  };
  
  const value = getValue();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateContent(path, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`relative group ${isAdmin ? 'cursor-pointer' : ''}`}>
      <img src={value} alt={alt} className={className} />
      {isAdmin && (
        <>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          <div 
            onClick={triggerUpload}
            className="absolute inset-0 bg-[#C9A050]/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="bg-white p-3 rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform">
                <Upload className="text-[#C9A050]" size={24} />
              </div>
              <span className="bg-[#C9A050] text-white text-[10px] px-3 py-1 uppercase tracking-widest font-bold shadow-md">
                Uploader une photo
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EditableImage;
