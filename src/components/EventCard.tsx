interface EventCardProps {
  title: string;
  date: string;
  image: string;
}

const EventCard = ({ title, date, image }: EventCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{date}</p>
        <button className="mt-4 text-green-700 font-semibold hover:text-green-800">
          Find out more
        </button>
      </div>
    </div>
  );
};

export default EventCard;