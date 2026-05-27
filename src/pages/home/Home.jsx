import { Link } from '../../components/RouterBridge';
import { useState, useRef, useEffect } from 'react';
import {
  ArrowRight, Leaf, FlaskConical, Shield, Sprout, TrendingUp,
  Users, Award, MapPin, ChevronRight, ChevronLeft, Star, Check, Zap,
  Microscope, Beaker, Target, Heart, FileText, X, Download, Share2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation, useScrollAnimationGroup, useCountUp } from '../../hooks/useScrollAnimation';
import { companyInfo, products } from '../../data/siteData';
import { assetSrc } from '../../utils/assetSrc';
import collageImg from '../../assets/sustainable_farming_collage.png';
// Assets
import logoImgAsset from '../../assets/new_title.png';
import companyVideo from '../../assets/blog/e_d_mp_.mp4';
import farmersWorkImgAsset from '../../assets/blog/farmers_work.png';

// Product Category Images
import catBfImg from '../../assets/products/bio-fertilizers.png';
import catBpImg from '../../assets/products/bio-pesticides.png';
import catPgrImg from '../../assets/products/pgr.png';
import catBioImg from '../../assets/products/biostimulants.png';
import catInsectImg from '../../assets/products/bio-insecticides.png';
import catOnImg from '../../assets/products/organic-nutrients.png';
import catMnImg from '../../assets/products/micronutrients.png';
import productsImgAsset from '../../data/products.png';

const logoImg = assetSrc(logoImgAsset);
const farmersWorkImg = assetSrc(farmersWorkImgAsset);
const productsImg = assetSrc(productsImgAsset);


const catImages = {
  'bio-insecticides': catInsectImg,
  'biostimulants': catBioImg,
  'bio-fertilizers': catBfImg,
  'organic-nutrients': catOnImg,
  'micronutrients': catMnImg
};

// Solution Images

const solImages = {
  'soil-health': '/soil health.jpg',
  'nutrient-mgmt': '/nutrientMgm.jpg',
  'pest-disease': '/pnd.jpg',
  'growth': '/growth.jpg'
};

function AnimatedSection({ children, className = '', direction = 'up' }) {
  const [ref, isVisible] = useScrollAnimation();
  const animClass = direction === 'up' ? 'anim-hidden' :
    direction === 'left' ? 'anim-hidden-left' :
      direction === 'right' ? 'anim-hidden-right' : 'anim-hidden-scale';
  const visibleClass = direction === 'up' ? 'anim-visible' :
    direction === 'left' || direction === 'right' ? 'anim-visible-left' : 'anim-visible-scale';

  return (
    <div ref={ref} className={`${animClass} ${isVisible ? visibleClass : ''} ${className}`}>
      {children}
    </div>
  );
}


const toKey = (text) => text.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

const PDFModal = ({ isOpen, onClose, pdfUrl }) => {
  if (!isOpen) return null;

  // Proper URL encoding + disable native browser controls to give a seamless custom-embedded look
  const cleanPdfUrl = encodeURI(pdfUrl) + "#toolbar=0&navpanes=0&scrollbar=1";
  const pdfName = 'Jay_Agritech_Product_Catalogue.pdf';

  const handleShare = async () => {
    if (typeof window === 'undefined') return;

    const shareUrl = `${window.location.origin}${pdfUrl}`;

    try {
      const response = await fetch(pdfUrl);
      const pdfBlob = await response.blob();
      const pdfFile = new File([pdfBlob], pdfName, { type: 'application/pdf' });

      if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
        await navigator.share({
          title: 'Jay Agritech Product Catalogue',
          text: 'Jay Agritech Product Catalogue',
          files: [pdfFile]
        });
        return;
      }
    } catch (error) {
      // Fall back to sharing the public PDF URL.
    }

    if (navigator.share) {
      await navigator.share({
        title: 'Jay Agritech Product Catalogue',
        text: 'Jay Agritech Product Catalogue',
        url: shareUrl
      });
    } else {
      await navigator.clipboard?.writeText(shareUrl);
    }
  };

  return (
    <div className="pdf-modal-overlay" onClick={onClose}>
      <div className="pdf-modal-container interactive-catalogue-container" onClick={e => e.stopPropagation()}>
        {/* Isolated Header Bar to prevent touching iframe / triggering download */}
        <div className="pdf-modal-header">
          <div className="modal-title-area">
            <h3>Jay Agritech Product Catalogue</h3>
          </div>

          <div className="pdf-modal-actions">
            <a className="pdf-action-btn pdf-action-btn--download" href={pdfUrl} download={pdfName} aria-label="Download PDF" title="Download PDF">
              <Download size={16} />
            </a>

            <button className="pdf-action-btn pdf-action-btn--share" onClick={handleShare} type="button" aria-label="Share PDF" title="Share PDF">
              <Share2 size={16} />
            </button>
          </div>
          
          <button className="pdf-modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body Section: Holds the clean PDF without default toolbars */}
        <div className="pdf-modal-body">
          <iframe 
            src={cleanPdfUrl} 
            title="Product Catalogue" 
            className="pdf-iframe"
          />
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const { t } = useTranslation();
  const [videoEnded, setVideoEnded] = useState(false);
  const [isCatalogueOpen, setIsCatalogueOpen] = useState(false);
  const videoRef = useRef(null);
  const solutionsRef = useRef(null);

  const handleMouseMove = (e) => {
    if (solutionsRef.current) {
      const rect = solutionsRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      solutionsRef.current.style.setProperty('--mouse-x', `${x}px`);
      solutionsRef.current.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log('Auto-play prevented:', e));
    }
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      if (videoRef.current.currentTime >= videoRef.current.duration - 3) {
        setVideoEnded(true);
      }
    }
  };

  return (
    <div className="home-page">
      {/* ══════════ HERO ══════════ */}
      <section className="hero" id="hero">
        <div className="hero-video-bg">
          {!videoEnded ? (
            <video
              ref={videoRef}
              src={companyVideo}
              muted
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setVideoEnded(true)}
              playsInline
              className="hero-video-element"
            />
          ) : (
            <img
              src={farmersWorkImg}
              alt={t('home.hero_alt', 'Farmers working sustainably on Indian agricultural fields - Jay Agritech')}
              className="hero-video-element hero-image-fade-in"
            />
          )}
          <div className={`hero-video-overlay-dark ${videoEnded ? 'image-overlay' : ''}`}></div>
        </div>

        <div className="container hero-container-centered">
          <div className="hero-text-centered">
            <h1 className="hero-title centered-title">
              {t('hero.title_part1')} <span className="text-gradient">{t('hero.title_part2')}</span>
            </h1>
            <p className="hero-subtitle centered-subtitle">
              {t('hero.subtitle')}
            </p>
            <div className="hero-actions centered-actions">
              <Link to="/products" className="btn btn-gold btn-lg">
                {t('hero.explore_btn')} <ArrowRight size={18} />
              </Link>
              <button 
                onClick={() => setIsCatalogueOpen(true)}
                className="btn btn-hero-outline btn-lg"
              >
                {t('hero.view_catalogue')} <FileText size={18} />
              </button>
              <Link to="/aboutus" className="btn btn-hero-outline btn-lg">
                {t('hero.story_btn')} <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════ SOLUTIONS ══════════ */}
      <section 
        ref={solutionsRef}
        onMouseMove={handleMouseMove}
        className="section bg-off-white" 
        id="solutions-preview"
      >
        {/* Background Agtech Blueprint Grid & Microbial Spores */}
        <div className="solutions-bg-elements">
          <div className="solutions-grid-overlay"></div>
          <div className="bio-spore spore-1"></div>
          <div className="bio-spore spore-2"></div>
          <div className="bio-spore spore-3"></div>
          <div className="bio-spore spore-4"></div>
          <div className="bio-spore spore-5"></div>
          <div className="bio-spore spore-6"></div>
          <div className="bio-spore spore-7"></div>
          <div className="bio-spore spore-8"></div>
        </div>

        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-overline">{t('home.solutions_title')}</span>
              <h2 className="section-title">{t('home.solutions_h2')}</h2>
              <p className="section-subtitle">
                {t('home.solutions_subtitle')}
              </p>
            </div>
          </AnimatedSection>

          <div className="solutions-timeline-vertical">
            {/* Center vertical stem timeline line */}
            <div className="vertical-timeline-line"></div>

            {[
              { icon: <Leaf size={20} />, titleKey: 'home.solutions.soil_health.title', descKey: 'home.solutions.soil_health.desc', title: 'Soil Health', id: 'soil-health', desc: 'Restore and maintain soil vitality with microbial solutions that rebuild your soil\'s natural fertility.', link: '/solutions/soil-health', color: '#2E7D32', stage: 'Stage 01', tagline: 'Rebuild' },
              { icon: <Sprout size={20} />, titleKey: 'home.solutions.nutrient_management.title', descKey: 'home.solutions.nutrient_management.desc', title: 'Nutrient Management', id: 'nutrient-mgmt', desc: 'Balanced, bio-available nutrition through organic and microbial nutrient delivery systems.', link: '/solutions/nutrient-mgmt', color: '#1565C0', stage: 'Stage 02', tagline: 'Nourish' },
              { icon: <Shield size={20} />, titleKey: 'home.solutions.pest_disease.title', descKey: 'home.solutions.pest_disease.desc', title: 'Pest & Disease', id: 'pest-disease', desc: 'Eco-friendly biological pest management — effective protection without harmful residues.', link: '/solutions/pest-disease', color: '#C62828', stage: 'Stage 03', tagline: 'Protect' },
              { icon: <TrendingUp size={20} />, titleKey: 'home.solutions.growth_enhancement.title', descKey: 'home.solutions.growth_enhancement.desc', title: 'Growth Enhancement', id: 'growth', desc: 'Maximize crop potential with science-backed growth regulators and bio-stimulants.', link: '/solutions/growth', color: '#E65100', stage: 'Stage 04', tagline: 'Maximize' },
            ].map((sol, i) => (
              <AnimatedSection key={i} direction={i % 2 === 0 ? 'left' : 'right'} className="timeline-step-wrapper">
                {/* Centered milestone dot that highlights on hover */}
                <div className="timeline-node" style={{ '--stage-color': sol.color }}>
                  {sol.icon}
                </div>

                <Link to={sol.link} className="timeline-step-card" style={{ '--stage-color': sol.color }}>
                  <div className="stc-image-section">
                    <img 
                      src={solImages[sol.id]} 
                      alt={`${t(sol.titleKey, sol.title)} - ${t('home.solutions_seo_suffix', 'Sustainable Agriculture Solutions by Jay Agritech')}`} 
                      className="stc-img" 
                    />
                    <div className="stc-overlay"></div>
                  </div>
                  <div className="stc-body-section">
                    <h3>{t(sol.titleKey, sol.title)}</h3>
                    <p>{t(sol.descKey, sol.desc)}</p>
                    <div className="stc-link" style={{ color: sol.color }}>
                      <span>{t('common.explore', 'Explore Stage')}</span>
                      <ArrowRight size={15} />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FEATURED PRODUCTS ══════════ */}
      <section className="section bg-light-organic" id="products-preview">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-overline">{t('home.products_overline', 'Product Portfolio')}</span>
              <h2 className="section-title">{t('home.products_h2', '60+ Innovative Products')}</h2>
              <p className="section-subtitle">
                {t('home.products_subtitle', 'Across 5 core categories — Bio Insecticides, Biostimulants, Bio Fertilizers, Organic Nutrients, and Micronutrients')}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="portfolio-showcase-card">
              {/* Left Column: 50% Padded Text Stage */}
              <div className="showcase-left-panel">
                <div className="showcase-content-wrapper animate-fade-in">
                  <span className="showcase-overline">{t('home.products_card_overline', 'Agtech Excellence')}</span>
                  <h2 className="showcase-title">{t('home.products_card_title', 'Sustainable Agriculture Starts Here')}</h2>
                  
                  <p className="showcase-description">
                    {t('home.products_desc_simplified', 'Advanced organic inputs and bio-solutions engineered to maximize crop yields, strengthen stress tolerance, and restore soil vitality.')}
                  </p>
                  
                  {/* Rich Agtech Value Propositions (Filling the empty space) */}
                  <div className="showcase-features-list">
                    <div className="showcase-feature-item">
                      <span className="sf-icon-dot">🔬</span>
                      <div className="sf-content">
                        <strong>{t('home.products.feat_science', 'Scientific Labs')}</strong>
                        <span>{t('home.products.feat_science_desc', 'Engineered for high biological stability and long shelf-life.')}</span>
                      </div>
                    </div>
                    
                    <div className="showcase-feature-item">
                      <span className="sf-icon-dot">🌱</span>
                      <div className="sf-content">
                        <strong>{t('home.products.feat_eco', '100% Bio-Safe')}</strong>
                        <span>{t('home.products.feat_eco_desc', 'Organic formulas that enrich the soil\'s natural microbiome.')}</span>
                      </div>
                    </div>
                    
                    <div className="showcase-feature-item">
                      <span className="sf-icon-dot">📈</span>
                      <div className="sf-content">
                        <strong>{t('home.products.feat_yield', 'Proven Yields')}</strong>
                        <span>{t('home.products.feat_yield_desc', 'Ensures robust plant growth, stress resistance, and crop quality.')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="showcase-metrics">
                    <div className="metric-item">
                      <span className="metric-num">60+</span>
                      <span className="metric-lbl">{t('home.products.metric_products', 'Products')}</span>
                    </div>
                    <div className="metric-divider"></div>
                    <div className="metric-item">
                      <span className="metric-num">5</span>
                      <span className="metric-lbl">{t('home.products.metric_categories', 'Categories')}</span>
                    </div>
                    <div className="metric-divider"></div>
                    <div className="metric-item">
                      <span className="metric-num">100%</span>
                      <span className="metric-lbl">{t('home.products.metric_biological', 'Bio-Safe')}</span>
                    </div>
                  </div>
                  
                  <Link to="/products" className="btn btn-gold btn-lg showcase-cta">
                    {t('home.products_cta_simplified', 'Explore Full Range')} <ArrowRight size={18} />
                  </Link>
                </div>
              </div>

              {/* Right Column: 40% Image Stage */}
              <div className="showcase-right-panel">
                <img 
                  src={productsImg} 
                  alt={t('home.products_alt', 'Comprehensive organic and bio-safe agricultural product range - Jay Agritech')} 
                  className="portfolio-showcase-img" 
                />
                <div className="portfolio-showcase-mask"></div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>


      {/* ══════════ PARTNERS CTA ══════════ */}
      <section className="partners-cta-section" id="partners-cta">
        <div className="container">
          <AnimatedSection>
            <div className="partners-cta-inner">
              <div className="pcta-content">
                <span className="section-overline" style={{ color: 'var(--clr-accent-gold)' }}>{t('home.partner_title')}</span>
                <h2>{t('home.partner_h2')}</h2>
                <p>
                  {t('home.partner_p1')}
                </p>
                <div className="pcta-types">
                  <Link to="/partners/dealer" className="pcta-type">
                    <strong>{t('home.partner_types.dealer_title', 'Become a Dealer')}</strong>
                    <span>{t('home.partner_types.dealer', 'Retail-level partnership')}</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link to="/partners/distributor" className="pcta-type">
                    <strong>{t('home.partner_types.distributor_title', 'Become a Distributor')}</strong>
                    <span>{t('home.partner_types.distributor', 'District/region-level partnership')}</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link to="/business/exports" className="pcta-type">
                    <strong>{t('home.partner_types.export_title', 'Export Partnership')}</strong>
                    <span>{t('home.partner_types.export', 'International business opportunities')}</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════ VALUES ══════════ */}
      <section className="section bg-white" id="values-preview">
        <div className="values-bg-blob values-bg-blob-1"></div>
        <div className="values-bg-blob values-bg-blob-2"></div>
        <div className="values-bg-blob values-bg-blob-3"></div>
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-overline">{t('home.values_title')}</span>
              <h2 className="section-title">{t('home.values_h2')}</h2>
            </div>
          </AnimatedSection>

          <div className="values-grid">
            {companyInfo.values.map((val, i) => (
              <AnimatedSection key={i}>
                <div className="value-card">
                  <div className="value-number">{String(i + 1).padStart(2, '0')}</div>
                  <div className="value-card-content">
                    <h4>{t(`company.values.${toKey(val.title)}.title`, val.title)}</h4>
                    <p>{t(`company.values.${toKey(val.title)}.desc`, val.description)}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      <PDFModal 
        isOpen={isCatalogueOpen} 
        onClose={() => setIsCatalogueOpen(false)} 
        pdfUrl="/07_Products Catelogue_Jay Agritech.pdf" 
      />
    </div>
  );
}
