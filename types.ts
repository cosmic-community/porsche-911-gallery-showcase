// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  thumbnail?: string;
  published_at?: string;
}

// Car object type
interface Car extends CosmicObject {
  type: 'cars';
  metadata: {
    car_title?: string;
    model_year?: number;
    generation?: {
      key: string;
      value: string;
    };
    variant?: string;
    color?: string;
    photography_date?: string;
    location_photographed?: Location;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    gallery_images?: Array<{
      url: string;
      imgix_url: string;
    }>;
    technical_notes?: string;
    is_featured?: boolean;
  };
}

// Location object type
interface Location extends CosmicObject {
  type: 'locations';
  metadata: {
    location_name?: string;
    description?: string;
    coordinates?: string;
    location_type?: {
      key: string;
      value: string;
    };
  };
}

// Generation types
type GenerationKey = 'original' | '964' | '993' | '996' | '997' | '991' | '992';
type LocationTypeKey = 'urban' | 'mountain' | 'coastal' | 'track' | 'studio' | 'garage' | 'countryside' | 'other';

// API response types
interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Gallery image interface
interface GalleryImage {
  url: string;
  imgix_url: string;
  alt?: string;
}

// Type guards
function isCar(obj: CosmicObject): obj is Car {
  return obj.type === 'cars';
}

function isLocation(obj: CosmicObject): obj is Location {
  return obj.type === 'locations';
}

// Component prop types
interface CarCardProps {
  car: Car;
  className?: string;
}

interface CarGalleryProps {
  cars: Car[];
  title?: string;
  showFilters?: boolean;
}

interface HeroSectionProps {
  featuredCar?: Car;
}

interface FilterBarProps {
  generations: GenerationKey[];
  onGenerationChange: (generation: GenerationKey | null) => void;
  onFeaturedChange: (featured: boolean | null) => void;
  selectedGeneration: GenerationKey | null;
  showFeaturedOnly: boolean | null;
}

// Utility types
type OptionalCarMetadata = Partial<Car['metadata']>;
type CreateCarData = Omit<Car, 'id' | 'created_at' | 'modified_at'>;

export type {
  CosmicObject,
  Car,
  Location,
  CosmicResponse,
  GalleryImage,
  CarCardProps,
  CarGalleryProps,
  HeroSectionProps,
  FilterBarProps,
  GenerationKey,
  LocationTypeKey,
  OptionalCarMetadata,
  CreateCarData,
};

export { isCar, isLocation };