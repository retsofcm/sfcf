import { Church, Mail, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Church className="h-8 w-8" />
              <span className="ml-2 text-xl font-semibold">Stenson Fields</span>
            </div>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 cursor-pointer hover:text-gray-300" />
              <Instagram className="h-6 w-6 cursor-pointer hover:text-gray-300" />
              <Mail className="h-6 w-6 cursor-pointer hover:text-gray-300" />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-gray-300">About us</a></li>
              <li><a href="#sundays" className="hover:text-gray-300">Sundays</a></li>
              <li><a href="#children" className="hover:text-gray-300">Children & Youth</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <p>Pilgrim Way</p>
            <p>Stenson Fields</p>
            <p>DE24 3JG</p>
            <p className="mt-2">stensonfields@church.com</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Service Times</h3>
            <p>Sunday Morning: 10:45am</p>
            <p>Sunday Evening: 6:00pm</p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Stenson Fields Christian Fellowship. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;