import React from 'react';
import { FaMapSigns, FaStore, FaListOl, FaShieldAlt, FaRupeeSign, FaMobileAlt } from 'react-icons/fa';

const features = [
  { icon: <FaMapSigns className="text-sky-400 text-2xl mb-2" aria-label="Fixed Points" />, title: 'Fixed Points', desc: 'Service available at major metro and railway stations.' },
  { icon: <FaStore className="text-sky-400 text-2xl mb-2" aria-label="Physical Booths" />, title: 'Physical Booths', desc: 'On-ground support and queue management at every pod.' },
  { icon: <FaListOl className="text-sky-400 text-2xl mb-2" aria-label="Queue Management" />, title: 'Queue Management', desc: 'Fair, transparent, and efficient user-driver matching.' },
  { icon: <FaShieldAlt className="text-sky-400 text-2xl mb-2" aria-label="Safety" />, title: 'Safety', desc: 'Safe rides with verified drivers and digital tracking.' },
  { icon: <FaRupeeSign className="text-sky-400 text-2xl mb-2" aria-label="Affordability" />, title: 'Affordability', desc: 'Pocket-friendly fares for everyone.' },
  { icon: <FaMobileAlt className="text-sky-400 text-2xl mb-2" aria-label="Digital Booking" />, title: 'Digital Booking', desc: 'Book rides easily via app or at the booth.' },
];

const Features = () => (
  <section id="features" className="py-20 px-4 bg-white flex flex-col items-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sky-400">Features</h2>
    <p className="text-lg text-gray-700 mb-10 text-center max-w-2xl">Why choose Gantavyam? We combine the best of technology and on-ground support for a seamless, safe, and affordable last-mile experience.</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
      {features.map((feature, idx) => (
        <div key={idx} className="flex flex-col items-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          {feature.icon}
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
          <p className="text-gray-600 text-center">{feature.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default Features; 