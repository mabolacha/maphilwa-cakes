
import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';

interface EditableProps {
  path: string;
  className?: string;
  multiline?: boolean;
  tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

const Editable: React.FC<EditableProps> = ({ path, className = '', multiline = false, tagName = 'div' }) => {
  const { content, updateContent, isAdmin } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  
  // Resolve value from path
  const getValue = () => {
    return path.split('.').reduce((obj, key) => obj?.[key], content as any);
  };
  
  const value = getValue();
  const [tempValue, setTempValue] = useState(value);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  if (!isAdmin) {
    const Tag = tagName;
    return <Tag className={className}>{value}</Tag>;
  }

  const handleBlur = () => {
    setIsEditing(false);
    updateContent(path, tempValue);
  };

  if (isEditing) {
    return multiline ? (
      <textarea
        className={`w-full bg-white/10 border border-[#C9A050] p-2 outline-none font-inherit text-inherit ${className}`}
        value={tempValue}
        autoFocus
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
      />
    ) : (
      <input
        className={`w-full bg-white/10 border border-[#C9A050] p-2 outline-none font-inherit text-inherit ${className}`}
        value={tempValue}
        autoFocus
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
      />
    );
  }

  const Tag = tagName;
  return (
    <Tag 
      className={`${className} cursor-edit hover:bg-[#C9A050]/5 border border-dashed border-transparent hover:border-[#C9A050]/30 transition-all group relative`}
      onClick={() => setIsEditing(true)}
    >
      {value}
      <span className="absolute -top-6 right-0 text-[8px] bg-[#C9A050] text-white px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest font-bold pointer-events-none">
        Éditer
      </span>
    </Tag>
  );
};

export default Editable;
