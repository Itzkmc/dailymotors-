import { MapPin, Gauge, Calendar, Fuel } from 'lucide-react';
import { Car } from '../lib/supabase';

interface CarCardProps {
  car: Car;
  onClick: () => void;
}

export function CarCard({ car, onClick }: CarCardProps) {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200"
    >
      <div className="relative overflow-hidden h-56">
        <img
          src={car.image_url}
          alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold">
          {car.condition === 'new' ? (
            <span className="text-green-600">NEW</span>
          ) : (
            <span className="text-blue-600">USED</span>
          )}
        </div>
        <div className="absolute top-3 left-3 bg-gray-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <span className="text-white font-bold text-sm">
            ${car.price.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
          {car.year} {car.make} {car.model}
        </h3>

        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{car.location}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Gauge className="w-4 h-4 mr-2 text-gray-400" />
            <span>{car.mileage.toLocaleString()} mi</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Fuel className="w-4 h-4 mr-2 text-gray-400" />
            <span>{car.fuel_type}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <span className="w-4 h-4 mr-2 text-gray-400">🚗</span>
            <span>{car.body_type}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {car.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
          {car.features.length > 3 && (
            <span className="text-xs text-gray-500 px-2.5 py-1">
              +{car.features.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
