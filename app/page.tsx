import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Speakers from '@/components/sections/Speakers';
import CommunityFeatures from '@/components/sections/CommunityFeatures';
import FeaturedArticles from '@/components/sections/FeaturedArticles';
import UpcomingEvents from '@/components/sections/UpcomingEvents';
import FeaturedCourses from '@/components/sections/FeaturedCourses';
import CharityBanner from '@/components/sections/CharityBanner';
import Newsletter from '@/components/sections/Newsletter';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Speakers />
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
