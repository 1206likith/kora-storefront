import Hero from '../sections/Hero';
import ShopByGender from '../sections/ShopByGender';
import OccasionStrip from '../sections/OccasionStrip';
import NewIn from '../sections/NewIn';
import Bestsellers from '../sections/Bestsellers';
import Under1000Banner from '../sections/Under1000Banner';
import AIFinderWidget from '../sections/AIFinderWidget';
import BrandStory from '../sections/BrandStory';
import ShopByCategory from '../sections/ShopByCategory';
import DualEditorial from '../sections/DualEditorial';
import ComfortTech from '../sections/ComfortTech';
import PopularSearches from '../sections/PopularSearches';

export default function Home() {
  return (
    <>
      <Hero />
      <ShopByGender />
      <OccasionStrip />
      <NewIn />
      <Bestsellers />
      <Under1000Banner />
      <AIFinderWidget />
      <BrandStory />
      <ShopByCategory />
      <DualEditorial />
      <ComfortTech />
      <PopularSearches />
    </>
  );
}
