import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Solutions from './pages/solutions/Solutions';
import Products from './pages/products/Products';
import ProductDetail from './pages/products/ProductDetail';
import Business from './pages/business/Business';
import Research from './pages/research/Research';
import Partners from './pages/partners/Partners';
import FarmerZone from './pages/farmerzone/FarmerZone';
import Blog from './pages/blog/Blog';
import CaseStudies from './pages/casestudies/CaseStudies';
import Careers from './pages/careers/Careers';
import Contact from './pages/contact/Contact';
import GrowthSystem from './pages/usp/GrowthSystem';
import { PrivacyPolicy, Terms } from './pages/legal/Legal';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
          {/* About */}
          <Route path="about" element={<About />} />
          <Route path="about/journey" element={<About />} />
          <Route path="about/vision-mission" element={<About />} />
          <Route path="about/leadership" element={<About />} />
          <Route path="about/manufacturing" element={<About />} />
          <Route path="about/certifications" element={<About />} />
          <Route path="about/sustainability" element={<About />} />
          <Route path="about/milestones" element={<About />} />
          
          {/* Solutions */}
          <Route path="solutions" element={<Solutions />} />
          <Route path="solutions/:slug" element={<Solutions />} />
          
          {/* Products */}
          <Route path="products" element={<Products />} />
          <Route path="products/:category" element={<Products />} />
          <Route path="products/:category/:slug" element={<ProductDetail />} />
          
          {/* Business */}
          <Route path="business" element={<Business />} />
          <Route path="business/contract-mfg" element={<Business />} />
          <Route path="business/research" element={<Business />} />
          <Route path="business/white-label" element={<Business />} />
          <Route path="business/exports" element={<Business />} />
          
          {/* Research */}
          <Route path="research" element={<Research />} />
          <Route path="research/:slug" element={<Research />} />
          
          {/* Raw Materials */}
          <Route path="raw-materials" element={<Products />} />
          
          {/* Presence */}
          <Route path="presence" element={<About />} />
          
          {/* Partners */}
          <Route path="partners" element={<Partners />} />
          <Route path="partners/dealer" element={<Partners />} />
          <Route path="partners/distributor" element={<Partners />} />
          <Route path="partners/export" element={<Partners />} />
          
          {/* Farmer Zone */}
          <Route path="farmer-zone" element={<FarmerZone />} />
          <Route path="farmer-zone/crop-solutions" element={<FarmerZone />} />
          <Route path="farmer-zone/problem-guide" element={<FarmerZone />} />
          <Route path="farmer-zone/seasonal" element={<FarmerZone />} />
          <Route path="farmer-zone/videos" element={<FarmerZone />} />
          <Route path="farmer-zone/guides" element={<FarmerZone />} />
          
          {/* Blog */}
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<Blog />} />
          
          {/* Case Studies */}
          <Route path="case-studies" element={<CaseStudies />} />
          
          {/* Careers */}
          <Route path="careers" element={<Careers />} />
          
          {/* Contact */}
          <Route path="contact" element={<Contact />} />
          
          {/* Growth System USP */}
          <Route path="growth-system" element={<GrowthSystem />} />
          
          {/* Legal */}
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<Terms />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
