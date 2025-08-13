import Link from 'next/link';
import type { Car } from '@/types';

interface FeaturedGalleryProps {
  cars: Car[];
}

export default function FeaturedGallery({ cars }: FeaturedGalleryProps) {
  if (!cars.length) return null;

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Featured Collection
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Handpicked shots that showcase the essence and beauty of each 911
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => {
          const featuredImage = car.metadata?.featured_image;
          const carTitle = car.metadata?.car_title || car.title;
          const year = car.metadata?.model_year;
          const variant = car.metadata?.variant;
          const location = car.metadata?.location_photographed;

          if (!featuredImage) return null;

          return (
            <Link
              key={car.id}
              href={`/cars/${car.slug}`}
              className="group block relative overflow-hidden rounded-xl bg-gray-800 hover:scale-105 transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={`${featuredImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                  alt={carTitle}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 image-overlay group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-200 transition-colors">
                  {carTitle}
                </h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {year && (
                    <span className="text-sm bg-gray-800 bg-opacity-70 text-gray-300 px-2 py-1 rounded">
                      {year}
                    </span>
                  )}
                  {variant && (
                    <span className="text-sm bg-gray-800 bg-opacity-70 text-gray-300 px-2 py-1 rounded">
                      {variant}
                    </span>
                  )}
                </div>
                {location && (
                  <p className="text-sm text-gray-400">
                    📍 {location.metadata?.location_name}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}