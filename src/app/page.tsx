import HeroBanner from '@/components/home/HeroBanner';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import MarketingSection from '@/components/home/MarketingSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroBanner />
      <CategoryGrid />
      <FeaturedProducts />
      <MarketingSection />
    </div>
  );
}