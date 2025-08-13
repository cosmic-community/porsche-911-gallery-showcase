# Porsche 911 Gallery Showcase

![App Preview](https://imgix.cosmicjs.com/067f5010-77dd-11f0-a051-23c10f41277a-photo-1544636331-e26879cd4d9b-1755045162676.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A breathtaking visual showcase designed to celebrate the iconic Porsche 911 through stunning automotive photography. This gallery platform presents each 911 variant with the reverence and visual excellence that these legendary sports cars deserve.

## ✨ Features

- **Cinematic Photo Galleries** - Full-screen lightbox experiences with smooth transitions
- **Generation Timeline** - Interactive exploration of 911 evolution from 1963 to present  
- **Location-Based Photography** - Stunning backdrops from coastal highways to urban districts
- **Featured Car Spotlights** - Hero sections showcasing the most iconic models
- **Technical Photography Details** - Camera settings and shooting notes for each session
- **Mobile-Optimized Experience** - Seamless viewing across all devices
- **Responsive Grid Layouts** - Masonry-style galleries that adapt beautifully to any screen
- **Search & Filter** - Find cars by generation, variant, color, or location

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=689bdc8befcf4b47c154db79&clone_repository=689bde98efcf4b47c154db8c)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "I want to create a photo gallery for all of the Porsche 911 cars I take photos of. I want it to be visually stunning, just as much as the cars are. Can you build that?"

### Code Generation Prompt

> Build a stunning showcase of a website for me to showoff the photos I take of the Porsche 911 car. The website should be just as stunning of a looking site as the car is. This needs to be the ultimate visual experience for any Porsche fan when they visit this site.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🚀 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless content management
- **Framer Motion** - Smooth animations and transitions

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your 911 photo gallery content

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd porsche-911-gallery
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update your `.env.local` file with your Cosmic credentials:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. **Run the development server**
   ```bash
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📡 Cosmic SDK Examples

### Fetching All Cars
```typescript
import { cosmic } from '@/lib/cosmic'

const cars = await cosmic.objects
  .find({ type: 'cars' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Getting Featured Cars
```typescript
const featuredCars = await cosmic.objects
  .find({ 
    type: 'cars',
    'metadata.is_featured': true 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Filtering by Generation
```typescript
const modernCars = await cosmic.objects
  .find({ 
    type: 'cars',
    'metadata.generation.key': '992' 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## 🎨 Cosmic CMS Integration

This gallery showcases your Porsche 911 photography with rich content management:

- **Car Management** - Track model year, generation, variant, and color details
- **Location Data** - GPS coordinates and descriptions for each photo shoot
- **Image Galleries** - Featured images and complete photo collections
- **Technical Notes** - Camera settings and photography details
- **Featured Content** - Highlight your best captures

## 🌐 Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with automatic builds

### Netlify
1. Connect your Git repository
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables
5. Deploy

### Environment Variables for Production
Set these in your hosting platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY` 
- `COSMIC_WRITE_KEY`

---

Ready to showcase your stunning Porsche 911 photography collection! 🏎️✨
<!-- README_END -->