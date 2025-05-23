import React from 'react';
import { FaCogs } from 'react-icons/fa';

const AboutPods = () => (
  <section id="about" className="py-20 px-4 bg-white flex flex-col items-center">
    <div className="max-w-3xl w-full flex flex-col items-center bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="mb-4">
        <FaCogs className="text-sky-400 text-4xl" aria-label="Future Pods Icon" />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sky-400">About Future Pods</h2>
      <p className="text-lg md:text-xl text-gray-700 mb-6 text-center">
        The next time you hop on a 3-wheeler, spare a thought to its history. Our humble 3-wheeler or auto rickshaw, as we colloquially call it, is as old as 60 and has transformed into one of the most reliable urban modes of transportation. Despite going through several improvements and modifications, the Auto Rickshaw Industry is having some serious loopholes untouched yet.
      </p>
      <div className="w-full bg-gray-50 rounded-xl p-6 mb-6 shadow-sm border border-gray-100">
        <h3 className="text-2xl font-semibold text-sky-400 mb-2">What is a Future Pod?</h3>
        <p className="text-gray-800">
          FUTURE POD is the solution to close all the major loopholes by infusing modern digital technology, making the auto rickshaw journey safe, fast, and smart for passengers. It is basically a pod installed at major locations of a city to facilitate citizens by providing smart, safe, and pocket-friendly Auto Rickshaw rides.
        </p>
      </div>
      <p className="text-gray-600 text-center">
        <span className="font-semibold text-sky-400">Key Difference:</span> Unlike other ride-hailing services, Gantavyam operates from fixed points like metro and railway stations, with physical booths that manage a streamlined flow and connect users to drivers in a queue manner.
      </p>
    </div>
  </section>
);

export default AboutPods; 