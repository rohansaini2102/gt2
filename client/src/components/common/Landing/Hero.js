import React from 'react';
import { FaUser, FaCar } from 'react-icons/fa';

const Hero = () => (
  <section className="flex flex-col items-center justify-center py-24 px-4 bg-white min-h-[60vh]">
    <div className="w-full max-w-2xl flex flex-col items-start">
      <span className="text-sky-400 text-base font-semibold mb-2">India's first fixed-point auto rickshaw service</span>
      <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-4 leading-tight">
        Go anywhere, the smart way<br />with <span className="text-sky-400">Gantavyam</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-xl">
        Seamless, safe, and affordable rides from metro and railway stations. No surge, no hassle—just last-mile convenience.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <a href="/user/login" className="flex-1 flex items-center justify-center gap-2 border border-sky-400 text-sky-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-sky-50 hover:text-black transition text-center" aria-label="I am a Rider">
          <FaUser /> I am a Rider
        </a>
        <a href="/driver/login" className="flex-1 flex items-center justify-center gap-2 bg-sky-400 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-sky-500 transition text-center" aria-label="I am a Driver">
          <FaCar /> I am a Driver
        </a>
      </div>
    </div>
  </section>
);

export default Hero; 