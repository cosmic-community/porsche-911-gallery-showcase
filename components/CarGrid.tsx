'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter } from 'lucide-react';
import type { Car } from '@/types';

interface CarGridProps {
  cars: Car[];
}

export default function CarGrid({ cars }: CarGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGeneration, setSelectedGeneration] = useState<string>('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Filter cars based on search and filters
  const filteredCars = cars.filter((car) => {
    const carTitle = car.metadata?.car_title || car.title;
    const matchesSearch = carTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.metadata?.variant?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.metadata?.color?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGeneration = !selectedGeneration || 
                            car.metadata?.generation?.key === selectedGeneration;
    
    const matchesFeatured = !showFeaturedOnly || car.metadata?.is_featured;

    return matchesSearch && matchesGeneration && matchesFeatured;
  });

  // Get unique generations for filter
  const generations = cars.reduce((acc, car) => {
    const generation = car.metadata?.generation;
    if (generation && !acc.find(g => g.key === generation.key)) {
      acc.push(generation);
    }
    return acc;
  }, [] as Array<{ key: string; value: string }>);

  return (
    <section id="gallery" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Complete Gallery
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Explore every 911 captured through the lens
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by model, variant, or color..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={selectedGeneration}
                onChange={(e) => setSelectedGeneration(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gray-500"
              >
                <option value="">All Generations</option>
                {generations.map((gen) => (
                  <option key={gen.key} value={gen.key}>
                    {gen.value}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                showFeaturedOnly
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Featured Only
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-8">
        <p className="text-gray-400">
          Showing {filteredCars.length} of {cars.length} cars
        </p>
      </div>

      {/* Car Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCars.map((car) => {
          const featuredImage = car.metadata?.featured_image;
          const carTitle = car.metadata?.car_title || car.title;
          const year = car.metadata?.model_year;
          const variant = car.metadata?.variant;
          const color = car.metadata?.color;
          const isFeatured = car.metadata?.is_featured;

          if (!featuredImage) return null;

          return (
            <Link
              key={car.id}
              href={`/cars/${car.slug}`}
              className="group block relative overflow-hidden rounded-xl bg-gray-800 hover:scale-105 transition-all duration-300"
            >
              {isFeatured && (
                <div className="absolute top-3 right-3 z-10 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                  ⭐ Featured
                </div>
              )}
              
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={`${featuredImage.imgix_url}?w=600&h=450&fit=crop&auto=format,compress`}
                  alt={carTitle}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
              </div>
              
              <div className="p-4">
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-gray-300 transition-colors">
                  {carTitle}
                </h3>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{year}</span>
                    {variant && <span>{variant}</span>}
                  </div>
                  {color && (
                    <p className="text-sm text-gray-500">{color}</p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredCars.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400 text-xl mb-4">No cars match your search criteria</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedGeneration('');
              setShowFeaturedOnly(false);
            }}
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
}