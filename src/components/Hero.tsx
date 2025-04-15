export default function Hero({ data }) {
  return (
    <div className="relative h-[600px]">
      <div className="absolute inset-0">
        <img
          src="{data?.homepage?.heroImage}"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          {data?.homepage?.title}
        </h1>
        <p className="text-xl text-white mb-8">{data?.homepage?.subtitle}</p>

        <div className="bg-green-700 inline-block text-white px-6 py-3 rounded-lg">
          <p className="font-semibold">{data?.homepage?.day}</p>
          <p>{data?.homepage?.time}</p>
          <p>{data?.homepage?.addressLine1}</p>
          <p>{data?.homepage?.addressLine2}</p>
          <p>{data?.homepage?.addressLine3}</p>
        </div>
      </div>
    </div>
  );
}
