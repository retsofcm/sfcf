'use client';

import { useState } from 'react';

const JustLooking = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-3xl font-bold mb-4">Want to know more?</h2>
        <p className="text-gray-600 mb-6">
          Just Looking is a ten-week course for anyone interested in learning more about the Bible.
          You're welcome to ask questions or just listen in a relaxed environment. It might turn out to be
          the best news you've ever heard.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
          />
          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800"
          >
            Submit
          </button>
        </form>
      </div>
      <div>
        <img
          src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800"
          alt="Bible study"
          className="rounded-lg shadow-xl"
        />
      </div>
    </div>
  );
};

export default JustLooking;