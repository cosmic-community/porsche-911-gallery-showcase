'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Camera, X } from 'lucide-react';
import type { Car } from '@/types';

interface CarDetailViewProps {
  car: Car;
}

export default function CarDetailView({ car }: CarDetailViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const carTitle = car.metadata?.car_title || car.title;
  const featuredImage = car.metadata?.featured_image;
  const galleryImages = car.metadata?.gallery_images || [];
  const allImages = featuredImage ? [featuredImage, ...galleryImages] : galleryImages;
  
  const year = car.metadata?.model_year;
  const generation = car.metadata?.generation;
  const variant = car.metadata?.variant;
  const color = car.metadata?.color;
  const photographyDate = car.metadata?.photography_date;
  const location = car.metadata?.location_photographed;
  const technicalNotes = car.metadata?.technical_notes;

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Image */}
      {featuredImage && (
        <div className="relative h-[70vh] overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=1920&h=1080&fit=crop&auto=format,compress`}
            alt={carTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          
          {/* Back Button */}
          <Link
            href="/"
            className="absolute top-8 left-8 glass-effect text-white px-4 py-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Gallery
          </Link>
          
          {/* Car Title Overlay */}
          <div className="absolute bottom-8 left-8 right-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-shadow-xl">
              {carTitle}
            </h1>
            <div className="flex flex-wrap gap-3">
              {year && (
                <span className="glass-effect text-white px-4 py-2 rounded-full">
                  {year}
                </span>
              )}
              {generation && (
                <span className="glass-effect text-white px-4 py-2 rounded-full">
                  {generation.value}
                </span>
              )}
              {variant && (
                <span className="glass-effect text-white px-4 py-2 rounded-full">
                  {variant}
                </span>
              )}
              {color && (
                <span className="glass-effect text-white px-4 py-2 rounded-full">
                  {color}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Details */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Car Details</h2>
            
            <div className="space-y-6 mb-8">
              {photographyDate && (
                <div className="flex items-center gap-3 text-gray-300">
                  <Calendar size={20} className="text-gray-400" />
                  <span>Photographed: {new Date(photographyDate).toLocaleDateString()}</span>
                </div>
              )}
              
              {location && (
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin size={20} className="text-gray-400" />
                  <div>
                    <span>{location.metadata?.location_name}</span>
                    {location.metadata?.location_type && (
                      <span className="block text-sm text-gray-500">
                        {location.metadata.location_type.value}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {technicalNotes && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Camera size={20} className="text-gray-400" />
                  <h3 className="text-xl font-semibold text-white">Technical Notes</h3>
                </div>
                <div 
                  className="text-gray-300 prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: technicalNotes }}
                />
              </div>
            )}
          </div>

          {/* Gallery Grid */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Photo Gallery</h2>
            
            {allImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => openLightbox(index)}
                    className="group relative aspect-square overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={`${image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                      alt={`${carTitle} - Image ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No additional gallery images available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && allImages[selectedImageIndex] && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X size={32} />
          </button>
          
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft size={32} />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft size={32} className="rotate-180" />
          </button>
          
          <div className="max-w-7xl max-h-full p-4">
            <img
              src={`${allImages[selectedImageIndex].imgix_url}?w=1920&h=1080&fit=crop&auto=format,compress`}
              alt={`${carTitle} - Image ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          
          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full">
            {selectedImageIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </div>
  );
}