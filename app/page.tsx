import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import FeaturedArticles from '@/components/sections/FeaturedArticles';
import UpcomingEvents from '@/components/sections/UpcomingEvents';
import CommunityFeatures from '@/components/sections/CommunityFeatures';
import FeaturedCourses from '@/components/sections/FeaturedCourses';
import CharityBanner from '@/components/sections/CharityBanner';
import Newsletter from '@/components/sections/Newsletter';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CommunityFeatures />
        <FeaturedArticles />
        <UpcomingEvents />
        <FeaturedCourses />
        <CharityBanner />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
