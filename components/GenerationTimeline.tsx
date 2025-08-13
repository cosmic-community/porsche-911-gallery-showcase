'use client';

import { useState } from 'react';
import type { Car } from '@/types';

interface GenerationTimelineProps {
  cars: Car[];
}

const generationData = {
  'original': { name: 'Original', years: '1963-1989', color: 'bg-red-600' },
  '964': { name: '964', years: '1989-1994', color: 'bg-blue-600' },
  '993': { name: '993', years: '1995-1998', color: 'bg-green-600' },
  '996': { name: '996', years: '1999-2005', color: 'bg-yellow-600' },
  '997': { name: '997', years: '2005-2012', color: 'bg-purple-600' },
  '991': { name: '991', years: '2012-2019', color: 'bg-pink-600' },
  '992': { name: '992', years: '2019-present', color: 'bg-indigo-600' },
};

export default function GenerationTimeline({ cars }: GenerationTimelineProps) {
  const [selectedGeneration, setSelectedGeneration] = useState<string | null>(null);

  // Group cars by generation
  const carsByGeneration = cars.reduce((acc, car) => {
    const generation = car.metadata?.generation?.key;
    if (generation) {
      if (!acc[generation]) acc[generation] = [];
      acc[generation].push(car);
    }
    return acc;
  }, {} as Record<string, Car[]>);

  const availableGenerations = Object.keys(carsByGeneration);
  const displayCars = selectedGeneration ? carsByGeneration[selectedGeneration] : cars;

  return (
    <section id="generations" className="py-20 px-4 bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            911 Generations
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore the evolution of the iconic 911 through six decades of automotive excellence
          </p>
        </div>

        {/* Generation Timeline */}
        <div className="mb-12 overflow-x-auto">
          <div className="flex space-x-4 min-w-max pb-4">
            <button
              onClick={() => setSelectedGeneration(null)}
              className={`px-6 py-3 rounded-full font-semibold transition-all whitespace-nowrap ${
                selectedGeneration === null
                  ? 'bg-white text-gray-900'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              All Generations
            </button>
            {availableGenerations.map((genKey) => {
              const gen = generationData[genKey as keyof typeof generationData];
              if (!gen) return null;

              return (
                <button
                  key={genKey}
                  onClick={() => setSelectedGeneration(genKey)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all whitespace-nowrap ${
                    selectedGeneration === genKey
                      ? `${gen.color} text-white`
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {gen.name} <span className="text-sm opacity-75">({gen.years})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Car Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayCars.map((car) => {
            const featuredImage = car.metadata?.featured_image;
            const carTitle = car.metadata?.car_title || car.title;
            const year = car.metadata?.model_year;
            const variant = car.metadata?.variant;

            if (!featuredImage) return null;

            return (
              <div
                key={car.id}
                className="group relative overflow-hidden rounded-lg bg-gray-900 hover:scale-105 transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={`${featuredImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
                    alt={carTitle}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-white font-semibold text-sm mb-1 truncate">
                    {carTitle}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-300">
                    <span>{year}</span>
                    {variant && <span>{variant}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {displayCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No cars found for this generation</p>
          </div>
        )}
      </div>
    </section>
  );
}