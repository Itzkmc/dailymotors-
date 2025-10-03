import { X, MapPin, Gauge, Calendar, Fuel, Palette, Settings, CheckCircle } from 'lucide-react';
import { Car } from '../lib/supabase';

interface CarDetailModalProps {
  car: Car;
  onClose: () => void;
}

export function CarDetailModal({ car, onClose }: CarDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {car.year} {car.make} {car.model}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="relative h-96">
          <img
            src={car.image_url}
            alt={`${car.year} ${car.make} ${car.model}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            {car.condition === 'new' ? (
              <span className="text-green-600">NEW VEHICLE</span>
            ) : (
              <span className="text-blue-600">USED VEHICLE</span>
            )}
          </div>
        </div>

        <div className="p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-8">
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                ${car.price.toLocaleString()}
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-lg">{car.location}</span>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl">
              Contact Seller
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center text-gray-600 mb-2">
                <Gauge className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Mileage</span>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {car.mileage.toLocaleString()} mi
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center text-gray-600 mb-2">
                <Calendar className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Transmission</span>
              </div>
              <div className="text-xl font-bold text-gray-900">{car.transmission}</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center text-gray-600 mb-2">
                <Fuel className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Fuel Type</span>
              </div>
              <div className="text-xl font-bold text-gray-900">{car.fuel_type}</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center text-gray-600 mb-2">
                <Settings className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Body Type</span>
              </div>
              <div className="text-xl font-bold text-gray-900">{car.body_type}</div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed">{car.description}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Exterior</h3>
              <div className="flex items-center text-gray-700">
                <Palette className="w-5 h-5 mr-3 text-gray-500" />
                <span className="text-lg">{car.exterior_color}</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Interior</h3>
              <div className="flex items-center text-gray-700">
                <Palette className="w-5 h-5 mr-3 text-gray-500" />
                <span className="text-lg">{car.interior_color}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Features & Options</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {car.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
