
import React, { useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { Settings, Eye, Lock, RefreshCw, Download, Upload } from 'lucide-react';

const AdminToolbar: React.FC = () => {
  const { isAdmin, setIsAdmin, isToolbarVisible, resetContent, exportContent, importContent } = useContent();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isToolbarVisible) return null;

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importContent(file);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-[100] flex items-center gap-3">
      <button
        onClick={() => setIsAdmin(!isAdmin)}
        className={`flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl transition-all duration-500 ${
          isAdmin 
          ? 'bg-[#C9A050] text-white scale-110' 
          : 'bg-[#2B2B2B] text-white/50 hover:text-white hover:bg-[#1a1a1a]'
        }`}
      >
        {isAdmin ? <Lock size={18} /> : <Settings size={18} />}
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
          {isAdmin ? 'Mode Édition Actif' : 'Administration'}
        </span>
      </button>

      {isAdmin && (
        <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-4 duration-500">
          <button
            onClick={() => setIsAdmin(false)}
            className="p-3 bg-white text-[#2B2B2B] rounded-full shadow-xl hover:bg-[#FAF8F5] transition-colors group relative"
          >
            <Eye size={18} />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2B2B2B] text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Aperçu</span>
          </button>
          
          <button
            onClick={exportContent}
            className="p-3 bg-white text-[#C9A050] rounded-full shadow-xl hover:bg-[#FAF8F5] transition-colors group relative"
          >
            <Download size={18} />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2B2B2B] text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Exporter (Sauvegarder)</span>
          </button>

          <button
            onClick={handleImportClick}
            className="p-3 bg-white text-[#C9A050] rounded-full shadow-xl hover:bg-[#FAF8F5] transition-colors group relative"
          >
            <Upload size={18} />
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={onFileChange} 
              accept=".json" 
              className="hidden" 
            />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2B2B2B] text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Importer un fichier</span>
          </button>
          
          <button
            onClick={resetContent}
            className="p-3 bg-white text-[#C9A050] rounded-full shadow-xl hover:bg-red-50 hover:text-red-500 transition-colors group relative"
          >
            <RefreshCw size={18} />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#2B2B2B] text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Réinitialiser</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminToolbar;
