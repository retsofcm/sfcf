const CatchUp = () => {
  return (
    <div className="relative h-[400px]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1920"
          alt="Church building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Missed a Sunday? Catch up now
          </h2>
          <button className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Start Listening
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatchUp;