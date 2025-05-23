import React, { useState } from 'react';
import { FaUser, FaCar } from 'react-icons/fa';

const navLinks = [
  { href: '#', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#features', label: 'Features' },
  { href: '#how', label: 'How It Works' },
  { href: '#mission', label: 'Mission' },
  { href: '/help', label: 'Help' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="w-full px-8 py-4 flex items-center justify-between bg-black bg-opacity-90 shadow-md relative z-20">
      <div className="flex items-center gap-2">
        {/* Placeholder logo */}
        <div className="w-8 h-8 bg-sky-400 rounded-full flex items-center justify-center font-bold text-black text-xl">G</div>
        <span className="text-sky-400 text-2xl font-bold tracking-wide ml-2">GANTAVYAM</span>
      </div>
      <nav className="hidden md:flex gap-4 items-center text-white text-lg font-medium">
        {navLinks.map(link => (
          <a key={link.label} href={link.href} className="hover:text-sky-400 transition px-2">{link.label}</a>
        ))}
        <a href="/user/login" className="flex items-center gap-2 border border-sky-400 text-sky-400 px-4 py-2 rounded-full hover:bg-sky-50 hover:text-black transition ml-2">
          <FaUser /> I am a Rider
        </a>
        <a href="/driver/login" className="flex items-center gap-2 bg-sky-400 text-black px-4 py-2 rounded-full hover:bg-sky-500 transition ml-2">
          <FaCar /> I am a Driver
        </a>
        <a href="/user/login" className="hover:text-sky-400 transition ml-2">Login</a>
        <a href="/user/signup" className="bg-sky-400 text-black px-4 py-2 rounded-full hover:bg-sky-500 transition ml-2">Sign up</a>
      </nav>
      {/* Hamburger for mobile */}
      <button className="md:hidden text-white text-3xl focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
        <span>{menuOpen ? '✕' : '☰'}</span>
      </button>
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black bg-opacity-95 flex flex-col items-center py-6 gap-4 md:hidden z-50">
          {navLinks.map(link => (
            <a key={link.label} href={link.href} className="text-white text-lg hover:text-sky-400 transition" onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
          <a href="/user/login" className="flex items-center gap-2 border border-sky-400 text-sky-400 px-4 py-2 rounded-full hover:bg-sky-50 hover:text-black transition" onClick={() => setMenuOpen(false)}>
            <FaUser /> I am a Rider
          </a>
          <a href="/driver/login" className="flex items-center gap-2 bg-sky-400 text-black px-4 py-2 rounded-full hover:bg-sky-500 transition" onClick={() => setMenuOpen(false)}>
            <FaCar /> I am a Driver
          </a>
          <a href="/user/login" className="text-white text-lg hover:text-sky-400 transition" onClick={() => setMenuOpen(false)}>Login</a>
          <a href="/user/signup" className="bg-sky-400 text-black px-4 py-2 rounded-full hover:bg-sky-500 transition" onClick={() => setMenuOpen(false)}>Sign up</a>
        </div>
      )}
    </header>
  );
};

export default Header; 