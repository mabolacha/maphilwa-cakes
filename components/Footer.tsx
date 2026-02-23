
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#C9A050]/10 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-16 mb-24">
          {/* Brand Column */}
          <div className="flex flex-col">
            <h2 className="text-3xl font-serif tracking-widest text-[#2B2B2B] mb-8">
              Maphilwa <span className="text-sm opacity-50 tracking-[0.2em]">CAKES</span>
            </h2>
            <p className="text-[#6F6F6F] font-light text-sm leading-relaxed mb-8 max-w-xs">
              Des créations sur mesure pour vos moments d'exception. L'art de la pâtisserie haute couture alliée au savoir-faire artisanal.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-[#C9A050] hover:text-[#2B2B2B] transition-colors"><Instagram size={18} /></a>
              <a href="#" className="text-[#C9A050] hover:text-[#2B2B2B] transition-colors"><Facebook size={18} /></a>
              <a href="#" className="text-[#C9A050] hover:text-[#2B2B2B] transition-colors"><Mail size={18} /></a>
            </div>
          </div>
          
          {/* Navigation Column */}
          <div>
            <h3 className="text-[#2B2B2B] uppercase tracking-[0.3em] text-[10px] mb-10 font-bold">Navigation</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-[#6F6F6F] hover:text-[#C9A050] text-xs font-light transition-colors">Accueil</Link></li>
              <li><Link to="/about" className="text-[#6F6F6F] hover:text-[#C9A050] text-xs font-light transition-colors">À propos</Link></li>
              <li><Link to="/weddings" className="text-[#6F6F6F] hover:text-[#C9A050] text-xs font-light transition-colors">Mariages</Link></li>
              <li><Link to="/gallery" className="text-[#6F6F6F] hover:text-[#C9A050] text-xs font-light transition-colors">Galeries</Link></li>
              <li><Link to="/flavors" className="text-[#6F6F6F] hover:text-[#C9A050] text-xs font-light transition-colors">Saveurs</Link></li>
            </ul>
          </div>

          {/* Useful Links Column */}
          <div>
            <h3 className="text-[#2B2B2B] uppercase tracking-[0.3em] text-[10px] mb-10 font-bold">Liens Utiles</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/legal" className="text-[#6F6F6F] hover:text-[#C9A050] text-xs font-light transition-colors block leading-relaxed">
                  Mentions légales et Politique de vie privée
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-[#6F6F6F] hover:text-[#C9A050] text-xs font-light transition-colors block">
                  Tarifs et livraison
                </Link>
              </li>
              <li>
                <Link to="/brochure" className="text-[#C9A050] hover:text-[#2B2B2B] text-xs font-medium transition-colors block italic">
                  Brochure (Gâteau à votre image)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-[#2B2B2B] uppercase tracking-[0.3em] text-[10px] mb-10 font-bold">Contact</h3>
            <ul className="space-y-4 text-xs font-light text-[#6F6F6F]">
              <li className="flex items-center gap-2">info@maphilwacakes.com</li>
              <li>+33 1 23 45 67 89</li>
              <li className="leading-relaxed">Lun-Ven 9h-18h, <br/>Sam sur RDV</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-[#C9A050]/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#6F6F6F] text-[10px] uppercase tracking-widest opacity-50 mb-4 md:mb-0">
            © {new Date().getFullYear()} Maphilwa Cakes. Tous droits réservés.
          </p>
          <div className="flex space-x-8 text-[9px] uppercase tracking-[0.2em] text-[#6F6F6F] opacity-40">
            <span>Pâtisserie Fine d'Exception</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
