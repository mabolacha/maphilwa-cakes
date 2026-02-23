
import React, { createContext, useContext, useState, useEffect } from 'react';
import { content as defaultContent } from '../content';

type ContentType = typeof defaultContent;

interface ContentContextType {
  content: ContentType;
  updateContent: (path: string, value: any) => void;
  addItem: (path: string, newItem: any) => void;
  removeItem: (path: string, index: number) => void;
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  isToolbarVisible: boolean;
  unlockAdmin: () => void;
  resetContent: () => void;
  exportContent: () => void;
  importContent: (file: File) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ContentType>(() => {
    const saved = localStorage.getItem('maphilwa_content');
    try {
      return saved ? JSON.parse(saved) : defaultContent;
    } catch (e) {
      return defaultContent;
    }
  });
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [isToolbarVisible, setIsToolbarVisible] = useState(() => {
    return localStorage.getItem('maphilwa_admin_unlocked') === 'true';
  });

  useEffect(() => {
    try {
      const data = JSON.stringify(content);
      localStorage.setItem('maphilwa_content', data);
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        alert("⚠️ Stockage saturé. Utilisez des images plus légères.");
      }
    }
  }, [content]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey || e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsToolbarVisible(prev => {
          const next = !prev;
          localStorage.setItem('maphilwa_admin_unlocked', next.toString());
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const setDeep = (obj: any, path: string, value: any, action: 'set' | 'add' | 'remove', index?: number): any => {
    const keys = path.split('.');
    const clone = { ...obj };
    let current = clone;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      current[key] = Array.isArray(current[key]) ? [...current[key]] : { ...current[key] };
      current = current[key];
    }

    const lastKey = keys[keys.length - 1];
    
    if (action === 'set') {
      current[lastKey] = value;
    } else if (action === 'add') {
      current[lastKey] = [...(current[lastKey] || []), value];
    } else if (action === 'remove' && index !== undefined) {
      current[lastKey] = current[lastKey].filter((_: any, i: number) => i !== index);
    }

    return clone;
  };

  const updateContent = (path: string, value: any) => {
    setContent(prev => setDeep(prev, path, value, 'set'));
  };

  const addItem = (path: string, newItem: any) => {
    setContent(prev => setDeep(prev, path, newItem, 'add'));
  };

  const removeItem = (path: string, index: number) => {
    // La confirmation est maintenant gérée par le composant UI
    setContent(prev => setDeep(prev, path, null, 'remove', index));
  };

  const unlockAdmin = () => setIsToolbarVisible(true);

  const resetContent = () => {
    localStorage.removeItem('maphilwa_content');
    window.location.reload();
  };

  const exportContent = () => {
    const dataStr = JSON.stringify(content, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'maphilwa-backup.json';
    link.click();
  };

  const importContent = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        setContent(json);
      } catch (err) { alert("Erreur fichier."); }
    };
    reader.readAsText(file);
  };

  return (
    <ContentContext.Provider value={{ 
      content, updateContent, addItem, removeItem,
      isAdmin, setIsAdmin, isToolbarVisible, unlockAdmin, 
      resetContent, exportContent, importContent
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be wrapped in Provider");
  return ctx;
};
