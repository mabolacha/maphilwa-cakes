
import React, { useState } from 'react';
import { Mail, Phone, Clock, MapPin, Send } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import Editable from '../components/Editable';

const Contact: React.FC = () => {
  const { content } = useContent();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    eventType: '',
    location: '',
    venue: '',
    eventDate: '',
    guests: '',
    budget: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <div className="bg-[#FAF8F5] pt-32 md:pt-48 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Left: Info */}
          <div className="lg:col-span-4">
            <span className="text-[#C9A050] uppercase tracking-[0.4em] text-[10px] mb-6 block font-semibold">Contact</span>
            <Editable 
              path="contact.title" 
              tagName="h1" 
              className="text-5xl font-serif text-[#2B2B2B] mb-12 italic" 
            />
            
            <div className="space-y-10">
              <div className="flex gap-6 items-start">
                <MapPin className="text-[#C9A050] shrink-0" size={20} />
                <Editable 
                  path="contact.description" 
                  tagName="p" 
                  className="text-sm text-[#6F6F6F] font-light leading-relaxed" 
                />
              </div>
              <div className="flex gap-6 items-start">
                <Mail className="text-[#C9A050] shrink-0" size={20} />
                <Editable 
                  path="contact.email" 
                  tagName="p" 
                  className="text-sm text-[#6F6F6F] font-light" 
                />
              </div>
              <div className="flex gap-6 items-start">
                <Phone className="text-[#C9A050] shrink-0" size={20} />
                <Editable 
                  path="contact.phone" 
                  tagName="p" 
                  className="text-sm text-[#6F6F6F] font-light" 
                />
              </div>
              <div className="flex gap-6 items-start">
                <Clock className="text-[#C9A050] shrink-0" size={20} />
                <Editable 
                  path="contact.hours" 
                  tagName="p" 
                  className="text-sm text-[#6F6F6F] font-light" 
                />
              </div>
            </div>

            <div className="mt-16 p-8 border border-[#C9A050]/20 bg-white">
              <div className="text-[#6F6F6F] font-light text-xs italic leading-relaxed">
                <span className="text-[#C9A050] font-bold not-italic block mb-2">Note sur les délais :</span>
                <Editable 
                  path="contact.delay_notice" 
                  multiline
                  tagName="p" 
                />
              </div>
            </div>
          </div>

          {/* Right: Detailed Form */}
          <div className="lg:col-span-8 bg-white p-8 md:p-12 border border-[#C9A050]/10 shadow-sm">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 fade-in-scroll visible">
                <div className="w-16 h-16 border border-[#C9A050] rounded-full flex items-center justify-center mb-8">
                  <Send className="text-[#C9A050]" size={24} />
                </div>
                <h2 className="text-3xl font-serif mb-4 italic text-[#2B2B2B]">Demande envoyée</h2>
                <p className="text-[#6F6F6F] font-light max-w-sm mx-auto">Merci pour votre confiance. Nous étudions votre projet et vous répondrons sous 48h ouvrées.</p>
                <button onClick={() => setStatus('idle')} className="mt-10 text-[10px] uppercase tracking-widest text-[#C9A050] border-b border-[#C9A050] pb-1">Envoyer une autre demande</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Form fields stay the same as they are functional elements, not content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#6F6F6F] block">Prénom *</label>
                    <input required name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-[#FAF8F5] border border-transparent p-4 focus:border-[#C9A050] outline-none transition-colors font-light text-sm" placeholder="Marie" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#6F6F6F] block">Nom *</label>
                    <input required name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-[#FAF8F5] border border-transparent p-4 focus:border-[#C9A050] outline-none transition-colors font-light text-sm" placeholder="Dupont" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#6F6F6F] block">E-mail *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-[#FAF8F5] border border-transparent p-4 focus:border-[#C9A050] outline-none transition-colors font-light text-sm" placeholder="marie@exemple.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#6F6F6F] block">Téléphone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-[#FAF8F5] border border-transparent p-4 focus:border-[#C9A050] outline-none transition-colors font-light text-sm" placeholder="+33 6 00 00 00 00" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#6F6F6F] block">Type d'événement *</label>
                    <select required name="eventType" value={formData.eventType} onChange={handleChange} className="w-full bg-[#FAF8F5] border border-transparent p-4 focus:border-[#C9A050] outline-none transition-colors font-light text-sm appearance-none">
                      <option value="">Sélectionnez...</option>
                      <option value="mariage">Mariage</option>
                      <option value="anniversaire">Anniversaire</option>
                      <option value="bapteme">Baptême</option>
                      <option value="professionnel">Événement Pro</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#6F6F6F] block">Ville / Région *</label>
                    <input required name="location" value={formData.location} onChange={handleChange} className="w-full bg-[#FAF8F5] border border-transparent p-4 focus:border-[#C9A050] outline-none transition-colors font-light text-sm" placeholder="Paris, Île-de-France..." />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#6F6F6F] block">Lieu de l'événement</label>
                  <input name="venue" value={formData.venue} onChange={handleChange} className="w-full bg-[#FAF8F5] border border-transparent p-4 focus:border-[#C9A050] outline-none transition-colors font-light text-sm" placeholder="Nom du Château, Domaine, Hôtel particulier..." />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#6F6F6F] block">Date souhaitée</label>
                    <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} className="w-full bg-[#FAF8F5] border border-transparent p-4 focus:border-[#C9A050] outline-none transition-colors font-light text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#6F6F6F] block">Nombre d'invités</label>
                    <input type="number" name="guests" value={formData.guests} onChange={handleChange} className="w-full bg-[#FAF8F5] border border-transparent p-4 focus:border-[#C9A050] outline-none transition-colors font-light text-sm" placeholder="50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#6F6F6F] block">Budget approximatif</label>
                    <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-[#FAF8F5] border border-transparent p-4 focus:border-[#C9A050] outline-none transition-colors font-light text-sm appearance-none">
                      <option value="">Sélectionnez...</option>
                      <option value="500-1000">500€ - 1000€</option>
                      <option value="1000-2500">1000€ - 2500€</option>
                      <option value="2500-5000">2500€ - 5000€</option>
                      <option value="5000+">5000€ +</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-[#6F6F6F] block">Message et préférences spécifiques</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full bg-[#FAF8F5] border border-transparent p-4 focus:border-[#C9A050] outline-none transition-colors font-light text-sm resize-none" placeholder="Décrivez votre vision, vos préférences de saveurs, le thème de votre événement..."></textarea>
                </div>

                <button 
                  disabled={status === 'submitting'}
                  type="submit" 
                  className={`w-full py-5 bg-[#C9A050] text-white uppercase tracking-[0.4em] text-[11px] font-semibold hover:bg-[#B68F42] transition-all duration-500 flex items-center justify-center gap-4 ${status === 'submitting' ? 'opacity-70 cursor-wait' : ''}`}
                >
                  {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer ma demande de devis'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
