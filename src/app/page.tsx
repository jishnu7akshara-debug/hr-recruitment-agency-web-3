import React from 'react';
import CinematicHero from '@/components/home/CinematicHero';
import EditorialStory from '@/components/home/EditorialStory';
import SpecialtiesGallery from '@/components/home/SpecialtiesGallery';
import CinematicFilmstrip from '@/components/home/CinematicFilmstrip';
import SpotlightMandates from '@/components/home/SpotlightMandates';
import ClientTestimonials from '@/components/home/ClientTestimonials';
import LuxuryEngagement from '@/components/home/LuxuryEngagement';
import LuxuryFaq from '@/components/home/LuxuryFaq';
import LuxuryConsultationCTA from '@/components/home/LuxuryConsultationCTA';

export const revalidate = 0;

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-stone-900">
      {/* 1. Cinematic Hero with Ken Burns & Carousel */}
      <CinematicHero />

      {/* 2. Editorial Storytelling & Mission */}
      <EditorialStory />

      {/* 3. Specialties & Curated Portfolio Gallery */}
      <SpecialtiesGallery />

      {/* 4. Behind the Scenes Visual Filmstrip */}
      <CinematicFilmstrip />

      {/* 5. Spotlight Executive Searches */}
      <SpotlightMandates />

      {/* 6. Client Testimonials & Reviews */}
      <ClientTestimonials />

      {/* 7. Engagement & Fee Terms */}
      <LuxuryEngagement />

      {/* 8. Frequently Asked Questions */}
      <LuxuryFaq />

      {/* 9. Direct Consultation & WhatsApp Booking CTA */}
      <LuxuryConsultationCTA />
    </div>
  );
}
