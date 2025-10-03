import { useEffect, useState } from 'react';
import { Car as CarIcon, Phone, Mail, MapPin } from 'lucide-react';
import { supabase, Car } from './lib/supabase';
import { CarCard } from './components/CarCard';
import { CarDetailModal } from './components/CarDetailModal';
import { Filters } from './components/Filters';

function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [condition, setCondition] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('price-asc');

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    filterAndSortCars();
  }, [cars, searchTerm, condition, bodyType, fuelType, priceRange, sortBy]);

  async function fetchCars() {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCars(data || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  }

  function filterAndSortCars() {
    let filtered = [...cars];

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (car) =>
          car.make.toLowerCase().includes(search) ||
          car.model.toLowerCase().includes(search)
      );
    }

    if (condition) {
      filtered = filtered.filter((car) => car.condition === condition);
    }

    if (bodyType) {
      filtered = filtered.filter((car) => car.body_type === bodyType);
    }

    if (fuelType) {
      filtered = filtered.filter((car) => car.fuel_type === fuelType);
    }

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(
        (car) => car.price >= min && car.price <= max
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'year-desc':
          return b.year - a.year;
        case 'year-asc':
          return a.year - b.year;
        case 'mileage-asc':
          return a.mileage - b.mileage;
        case 'mileage-desc':
          return b.mileage - a.mileage;
        default:
          return 0;
      }
    });

    setFilteredCars(filtered);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl">
                <CarIcon className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Premier Auto Sales</h1>
                <p className="text-blue-100 text-sm">Your trusted car marketplace</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="tel:+1234567890"
                className="flex items-center space-x-2 hover:text-blue-100 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="font-medium">(123) 456-7890</span>
              </a>
              <a
                href="mailto:info@premierautosales.com"
                className="flex items-center space-x-2 hover:text-blue-100 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="font-medium">Contact Us</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Find Your Perfect Vehicle
          </h2>
          <p className="text-gray-600 text-lg">
            Browse our collection of {cars.length} quality vehicles
          </p>
        </div>

        <Filters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          condition={condition}
          onConditionChange={setCondition}
          bodyType={bodyType}
          onBodyTypeChange={setBodyType}
          fuelType={fuelType}
          onFuelTypeChange={setFuelType}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          sortBy={sortBy}
          onSortByChange={setSortBy}
        />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="text-center py-20">
            <CarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No vehicles found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more results
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-sm text-gray-600">
              Showing {filteredCars.length} of {cars.length} vehicles
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredCars.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onClick={() => setSelectedCar(car)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <CarIcon className="w-6 h-6" />
                <span className="text-xl font-bold">Premier Auto Sales</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner in finding the perfect vehicle. Quality cars at competitive prices.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>(123) 456-7890</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>info@premierautosales.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>123 Auto Plaza, Los Angeles, CA</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Hours</h3>
              <div className="space-y-2 text-gray-400">
                <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                <p>Saturday: 9:00 AM - 6:00 PM</p>
                <p>Sunday: 11:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Premier Auto Sales. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {selectedCar && (
        <CarDetailModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
    </div>
  );
}

export default App;
