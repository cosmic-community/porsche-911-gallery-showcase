import { getAllCars, getFeaturedCars } from '@/lib/cosmic';
import HeroSection from '@/components/HeroSection';
import FeaturedGallery from '@/components/FeaturedGallery';
import CarGrid from '@/components/CarGrid';
import GenerationTimeline from '@/components/GenerationTimeline';
import Navigation from '@/components/Navigation';

export default async function HomePage() {
  const [allCars, featuredCars] = await Promise.all([
    getAllCars(),
    getFeaturedCars()
  ]);

  const featuredCar = featuredCars[0];

  return (
    <main className="min-h-screen">
      <Navigation />
      
      {featuredCar && (
        <HeroSection featuredCar={featuredCar} />
      )}
      
      {featuredCars.length > 0 && (
        <FeaturedGallery cars={featuredCars} />
      )}
      
      <GenerationTimeline cars={allCars} />
      
      <CarGrid cars={allCars} />
    </main>
  );
}