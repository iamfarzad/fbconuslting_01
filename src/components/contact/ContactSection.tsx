"use client";

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactSection() {
  const { language } = useLanguage();
  
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8">
          {language === 'en' ? 'Contact Us' : 'Kontakt Oss'}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {language === 'en' ? 'Get in Touch' : 'Ta Kontakt'}
            </h2>
            <p className="mb-4">
              {language === 'en' 
                ? 'We\'d love to hear from you. Please fill out the form and we\'ll get back to you as soon as possible.'
                : 'Vi vil gjerne høre fra deg. Vennligst fyll ut skjemaet, så tar vi kontakt så snart som mulig.'}
            </p>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">
                {language === 'en' ? 'Our Office' : 'Vårt Kontor'}
              </h3>
              <p>Oslo, Norway</p>
              <p>contact@fbconsulting.no</p>
            </div>
          </div>
          
          <div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {language === 'en' ? 'Name' : 'Navn'}
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white/5 backdrop-blur-sm"
                  placeholder={language === 'en' ? 'Your name' : 'Ditt navn'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  {language === 'en' ? 'Email' : 'E-post'}
                </label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white/5 backdrop-blur-sm"
                  placeholder={language === 'en' ? 'Your email' : 'Din e-post'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  {language === 'en' ? 'Message' : 'Melding'}
                </label>
                <textarea 
                  className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white/5 backdrop-blur-sm h-32"
                  placeholder={language === 'en' ? 'Your message' : 'Din melding'}
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                {language === 'en' ? 'Send Message' : 'Send Melding'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
