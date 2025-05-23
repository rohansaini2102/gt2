import React from 'react';
import { FaMapMarkerAlt, FaUsers, FaHandshake, FaTaxi } from 'react-icons/fa';

const steps = [
  {
    icon: <FaMapMarkerAlt className="text-sky-400 text-3xl mb-2" aria-label="Arrive at Pod" />,
    title: 'Arrive at Pod',
    desc: 'Go to a Gantavyam booth at your nearest metro or railway station.'
  },
  {
    icon: <FaUsers className="text-sky-400 text-3xl mb-2" aria-label="Join the Queue" />,
    title: 'Join the Queue',
    desc: 'Join the digital or physical queue managed by our staff.'
  },
  {
    icon: <FaHandshake className="text-sky-400 text-3xl mb-2" aria-label="Get Matched" />,
    title: 'Get Matched',
    desc: 'Get matched with a driver in a fair, streamlined manner.'
  },
  {
    icon: <FaTaxi className="text-sky-400 text-3xl mb-2" aria-label="Enjoy Your Ride" />,
    title: 'Enjoy Your Ride',
    desc: 'Hop in and enjoy a safe, smart, and affordable journey.'
  }
];

const HowItWorks = () => (
  <section id="how" className="py-20 px-4 bg-white flex flex-col items-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-10 text-sky-400">How It Works</h2>
    <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full max-w-5xl">
      {steps.map((step, idx) => (
        <div key={idx} className="flex flex-col items-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100 w-72 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-sky-400 text-black rounded-full flex items-center justify-center font-bold text-xl border-4 border-white z-10">
            {idx + 1}
          </div>
          <div className="mt-8 mb-2">{step.icon}</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
          <p className="text-gray-600 text-center">{step.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default HowItWorks; 