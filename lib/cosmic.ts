import { createBucketClient } from '@cosmicjs/sdk';
import type { Car, Location, CosmicResponse } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
});

// Helper function for handling Cosmic API errors
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all cars with full metadata
export async function getAllCars(): Promise<Car[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'cars' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-metadata.photography_date');
    
    return response.objects as Car[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching cars:', error);
    throw new Error('Failed to fetch cars');
  }
}

// Fetch featured cars only
export async function getFeaturedCars(): Promise<Car[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'cars',
        'metadata.is_featured': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-metadata.photography_date');
    
    return response.objects as Car[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching featured cars:', error);
    throw new Error('Failed to fetch featured cars');
  }
}

// Fetch single car by slug
export async function getCarBySlug(slug: string): Promise<Car | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'cars',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const car = response.object as Car;
    
    if (!car || !car.metadata) {
      return null;
    }
    
    return car;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching car by slug:', error);
    throw new Error('Failed to fetch car');
  }
}

// Fetch cars by generation
export async function getCarsByGeneration(generationKey: string): Promise<Car[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'cars',
        'metadata.generation.key': generationKey
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .sort('-metadata.photography_date');
    
    return response.objects as Car[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching cars by generation:', error);
    throw new Error('Failed to fetch cars by generation');
  }
}

// Fetch all locations
export async function getAllLocations(): Promise<Location[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'locations' })
      .props(['id', 'title', 'slug', 'metadata']);
    
    return response.objects as Location[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching locations:', error);
    throw new Error('Failed to fetch locations');
  }
}

// Get unique generations from cars
export async function getUniqueGenerations(): Promise<string[]> {
  try {
    const cars = await getAllCars();
    const generations = new Set<string>();
    
    cars.forEach(car => {
      if (car.metadata?.generation?.key) {
        generations.add(car.metadata.generation.key);
      }
    });
    
    return Array.from(generations);
  } catch (error) {
    console.error('Error fetching generations:', error);
    return [];
  }
}