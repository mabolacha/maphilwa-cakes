
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const location = useLocation();
  const { unlockAdmin } = useContent();

  const links = [
    { label: 'Accueil', path: '/' },
    { label: 'À propos', path: '/about' },
    { label: 'Mariages', path: '/weddings' },
    { label: 'Galeries', path: '/gallery' },
    { label: 'Saveurs', path: '/flavors' },
    { label: 'Tarifs', path: '/pricing' },
    { label: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  // "Porte secrète" : triple clic sur le logo
  const handleSecretClick = () => {
    setClickCount(prev => prev + 1);
    setTimeout(() => setClickCount(0), 1000); // Reset après 1 sec
    
    if (clickCount + 1 >= 3) {
      unlockAdmin();
      setClickCount(0);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 shadow-sm py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          onClick={handleSecretClick}
          className="cursor-default select-none group"
        >
          <Link to="/" className="text-2xl font-serif tracking-widest text-[#2B2B2B] hover:text-[#C9A050] transition-colors inline-block">
            Maphilwa <span className="font-light text-sm opacity-50 tracking-[0.2em] group-hover:opacity-100">CAKES</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 lg:space-x-10">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[10px] uppercase tracking-[0.25em] font-medium transition-all duration-300 hover:text-[#C9A050] ${location.pathname === link.path ? 'text-[#C9A050]' : 'text-[#2B2B2B]'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-[#2B2B2B]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center space-y-8 transition-all duration-500 md:hidden ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <button className="absolute top-8 right-8 text-[#2B2B2B]" onClick={() => setIsOpen(false)}><X size={32} /></button>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-2xl font-serif tracking-widest ${location.pathname === link.path ? 'text-[#C9A050]' : 'text-[#2B2B2B]'}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
