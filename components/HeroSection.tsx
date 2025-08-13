import Link from 'next/link';
import type { Car } from '@/types';

interface HeroSectionProps {
  featuredCar: Car;
}

export default function HeroSection({ featuredCar }: HeroSectionProps) {
  const featuredImage = featuredCar.metadata?.featured_image;
  const location = featuredCar.metadata?.location_photographed;
  const carTitle = featuredCar.metadata?.car_title || featuredCar.title;
  const year = featuredCar.metadata?.model_year;
  const variant = featuredCar.metadata?.variant;
  const color = featuredCar.metadata?.color;

  if (!featuredImage) return null;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={`${featuredImage.imgix_url}?w=1920&h=1080&fit=crop&auto=format,compress`}
          alt={carTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-shadow-xl animate-fade-in">
          Porsche 911
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-4 text-shadow-lg animate-slide-up">
          A Visual Journey Through Automotive Excellence
        </p>
        
        {/* Featured Car Details */}
        <div className="glass-effect rounded-lg p-6 mb-8 animate-scale-in">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Featured: {carTitle}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 text-gray-300">
            {year && <span className="bg-gray-800 px-3 py-1 rounded-full">{year}</span>}
            {variant && <span className="bg-gray-800 px-3 py-1 rounded-full">{variant}</span>}
            {color && <span className="bg-gray-800 px-3 py-1 rounded-full">{color}</span>}
            {location && (
              <span className="bg-gray-800 px-3 py-1 rounded-full">
                📍 {location.metadata?.location_name}
              </span>
            )}
          </div>
        </div>
        
        {/* CTA Button */}
        <Link
          href={`/cars/${featuredCar.slug}`}
          className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 animate-slide-up"
        >
          View Full Gallery
        </Link>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}