import React from 'react';
import { Church, Calendar, Mail, Facebook, Instagram } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EventCard from './components/EventCard';
import JustLooking from './components/JustLooking';
import CatchUp from './components/CatchUp';
import Footer from './components/Footer';

function App() {
  const events = [
    {
      title: "Ladies Spring Craft",
      date: "March 31st, 7pm",
      image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Family Week",
      date: "June 16th-22nd",
      image: "https://images.unsplash.com/photo-1591291621164-2c6367723315?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Holiday Club",
      date: "August 24th-29th",
      image: "https://images.unsplash.com/photo-1511949860663-92c5c57d48a7?auto=format&fit=crop&q=80&w=600",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      <section id="whats-on" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">What's on</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </section>

      <div className="bg-gray-50">
        <JustLooking />
      </div>

      <CatchUp />
      <Footer />
    </div>
  );
}

export default App;