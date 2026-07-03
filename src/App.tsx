import Header from './components/Header';
import SlimHeader from './components/SlimHeader';
import Footer from './components/Footer';
import { useHashRoute } from './router';
import Home from './pages/Home';
import BrandWorld from './pages/BrandWorld';
import ProductDetail from './pages/ProductDetail';
import Collection from './pages/Collection';
import ShoeFinder from './pages/ShoeFinder';
import Checkout from './pages/Checkout';
import OurStory from './pages/OurStory';

export default function App() {
  const r = useHashRoute();
  const slim = r.name === 'finder' || r.name === 'checkout';

  let page;
  switch (r.name) {
    case 'brand':      page = <BrandWorld brandKey={r.param} />; break;
    case 'product':    page = <ProductDetail id={r.param} />; break;
    case 'collection': page = <Collection slug={r.param} />; break;
    case 'finder':     page = <ShoeFinder />; break;
    case 'checkout':   page = <Checkout />; break;
    case 'story':      page = <OurStory />; break;
    default:           page = <Home />;
  }

  return (
    <>
      {slim ? <SlimHeader /> : <Header cart={0} />}
      <main>{page}</main>
      {!slim && <Footer />}
    </>
  );
}
