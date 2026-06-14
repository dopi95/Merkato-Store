import HeroBanner from "../components/home/HeroBanner";
import CategoryGrid from "../components/home/CategoryGrid";
import FeaturedProducts from "../components/home/FeaturedProducts";
import PromoSection from "../components/home/PromoSection";
import TopBrands from "../components/home/TopBrands";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <CategoryGrid />
      <FeaturedProducts />
      <PromoSection />
      <WhyChooseUs />
      <Testimonials />
      <TopBrands />
    </main>
  );
}
