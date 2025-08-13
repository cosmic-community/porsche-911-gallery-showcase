// app/cars/[slug]/page.tsx
import { getCarBySlug, getAllCars } from '@/lib/cosmic';
import { notFound } from 'next/navigation';
import CarDetailView from '@/components/CarDetailView';
import Navigation from '@/components/Navigation';
import type { Metadata } from 'next';

interface CarPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CarPageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    return {
      title: 'Car Not Found',
    };
  }

  const title = car.metadata?.car_title || car.title;
  const description = `View stunning photography of the ${title}. ${car.metadata?.technical_notes?.replace(/<[^>]*>/g, '').slice(0, 150)}...` || `Professional automotive photography of ${title}`;
  const imageUrl = car.metadata?.featured_image?.imgix_url;

  return {
    title: `${title} - Porsche 911 Gallery`,
    description,
    openGraph: {
      title: `${title} - Porsche 911 Gallery`,
      description,
      type: 'article',
      ...(imageUrl && {
        images: [
          {
            url: `${imageUrl}?w=1200&h=630&fit=crop&auto=format,compress`,
            width: 1200,
            height: 630,
            alt: title,
          }
        ]
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} - Porsche 911 Gallery`,
      description,
      ...(imageUrl && {
        images: [`${imageUrl}?w=1200&h=630&fit=crop&auto=format,compress`],
      }),
    },
  };
}

export async function generateStaticParams() {
  const cars = await getAllCars();
  
  return cars.map((car) => ({
    slug: car.slug,
  }));
}

export default async function CarPage({ params }: CarPageProps) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);

  if (!car) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <CarDetailView car={car} />
    </main>
  );
}