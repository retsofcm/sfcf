'use client';

import { Church } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Church className="h-8 w-8 text-green-700" />
            <span className="ml-2 text-xl font-semibold">Stenson Fields</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="text-gray-700 hover:text-green-700">About us</a>
            <a href="#sundays" className="text-gray-700 hover:text-green-700">Sundays</a>
            <a href="#children" className="text-gray-700 hover:text-green-700">Children & Youth</a>
            <a href="#whats-on" className="text-gray-700 hover:text-green-700">What's on</a>
            <a href="#contact" className="text-gray-700 hover:text-green-700">Get in touch</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;