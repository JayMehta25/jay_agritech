import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import {
  ArrowRight, Leaf, FlaskConical, Shield, Sprout, TrendingUp,
  Users, Award, MapPin, ChevronRight, Star, Check, Zap,
  Microscope, Beaker, Globe, Target, Heart, FileText, X
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation, useScrollAnimationGroup, useCountUp } from '../../hooks/useScrollAnimation';
import { companyInfo, products, caseStudies } from '../../data/siteData';
import collageImg from '../../assets/sustainable_farming_collage.png';
// Assets
import logoImg from '../../assets/new_title.png';
import companyVideo from '../../assets/blog/e_d_mp_.mp4';
import farmersWorkImg from '../../assets/blog/farmers_work.png';
import './Home.css';

// Case Study Images
import caseCottonImg from '../../assets/case-studies/cotton.png';
import caseGroundnutImg from '../../assets/case-studies/groundnut.png';
import caseMangoImg from '../../assets/case-studies/mango.png';

// Product Category Images
import catBfImg from '../../assets/products/bio-fertilizers.png';
import catBpImg from '../../assets/products/bio-pesticides.png';
import catPgrImg from '../../assets/products/pgr.png';
import catBioImg from '../../assets/products/biostimulants.png';
import catInsectImg from '../../assets/products/bio-insecticides.png';
import catOnImg from '../../assets/products/organic-nutrients.png';
import catMnImg from '../../assets/products/micronutrients.png';
import productsImg from '../../data/products.png';

const caseImages = { 1: caseCottonImg, 2: caseGroundnutImg, 3: caseMangoImg };
const catImages = {
  'bio-insecticides': catInsectImg,
  'biostimulants': catBioImg,
  'bio-fertilizers': catBfImg,
  'organic-nutrients': catOnImg,
  'micronutrients': catMnImg
};

// Solution Images
import solSoilImg from '../../assets/solutions/soil-health.png';
import solNutrientImg from '../../assets/solutions/nutrient-mgmt.png';
import solPestImg from '../../assets/solutions/pest-control.png';
import solGrowthImg from '../../assets/solutions/growth-enhancement.png';

const solImages = {
  'soil-health': solSoilImg,
  'nutrient-mgmt': solNutrientImg,
  'pest-disease': solPestImg,
  'growth': solGrowthImg
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

function StatCounter({ number, suffix, label }) {
  const [ref, isVisible] = useScrollAnimation();
  const count = useCountUp(number, 2000, isVisible);

  return (
    <div ref={ref} className="stat-item">
      <span className="stat-number">{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

const toKey = (text) => text.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

const PDFModal = ({ isOpen, onClose, pdfUrl }) => {
  if (!isOpen) return null;
  return (
    <div className="pdf-modal-overlay" onClick={onClose}>
      <div className="pdf-modal-container" onClick={e => e.stopPropagation()}>
        <button className="pdf-modal-close" onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>
        <iframe 
          src={pdfUrl} 
          title="Product Catalogue" 
          className="pdf-iframe"
        />
      </div>
    </div>
  );
};

export default function Home() {
  const { t } = useTranslation();
  const [videoEnded, setVideoEnded] = useState(false);
  const [isCatalogueOpen, setIsCatalogueOpen] = useState(false);
  const [canPlay, setCanPlay] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!sessionStorage.getItem('splash_played');
    }
    return true;
  });
  const videoRef = useRef(null);

  useEffect(() => {
    const handleSplashComplete = () => {
      setCanPlay(true);
    };
    
    window.addEventListener('splashComplete', handleSplashComplete);
    return () => window.removeEventListener('splashComplete', handleSplashComplete);
  }, []);

  useEffect(() => {
    if (canPlay && videoRef.current) {
      // Add a small delay to align with the splash screen fade-out animation
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(e => console.log('Auto-play prevented:', e));
        }
      }, 500); 
    }
  }, [canPlay]);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      if (videoRef.current.currentTime >= videoRef.current.duration - 1) {
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
              alt="Farmers at work"
              className="hero-video-element hero-image-fade-in"
            />
          )}
          <div className={`hero-video-overlay-dark ${videoEnded ? 'image-overlay' : ''}`}></div>
        </div>

        <div className="container hero-container-centered">
          <div className="hero-text-centered">

            <div className="centered-badge">
              <span className="badge badge-premium">{t('hero.badge')}</span>
            </div>
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
              <Link to="/about" className="btn btn-hero-outline btn-lg">
                {t('hero.story_btn')} <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-dot"></div>
        </div>
      </section>

      {/* ══════════ STATS BAR ══════════ */}
      <section className="stats-bar" id="stats">
        <div className="container">
          <div className="stats-grid">
            {companyInfo.stats.map((stat, i) => (
              <StatCounter key={i} number={stat.number} suffix={stat.suffix} label={t(`company.stats.${stat.label.toLowerCase().replace(/\s/g, '_')}`, stat.label)} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SOLUTIONS ══════════ */}
      <section className="section bg-off-white" id="solutions-preview">
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

          <div className="solutions-grid">
            {[
              { icon: <Leaf size={24} />, titleKey: 'home.solutions.soil_health.title', descKey: 'home.solutions.soil_health.desc', title: 'Soil Health', id: 'soil-health', desc: 'Restore and maintain soil vitality with microbial solutions that rebuild your soil\'s natural fertility.', link: '/solutions/soil-health', color: '#2E7D32' },
              { icon: <Sprout size={24} />, titleKey: 'home.solutions.nutrient_management.title', descKey: 'home.solutions.nutrient_management.desc', title: 'Nutrient Management', id: 'nutrient-mgmt', desc: 'Balanced, bio-available nutrition through organic and microbial nutrient delivery systems.', link: '/solutions/nutrient-mgmt', color: '#1565C0' },
              { icon: <Shield size={24} />, titleKey: 'home.solutions.pest_disease.title', descKey: 'home.solutions.pest_disease.desc', title: 'Pest & Disease', id: 'pest-disease', desc: 'Eco-friendly biological pest management — effective protection without harmful residues.', link: '/solutions/pest-disease', color: '#C62828' },
              { icon: <TrendingUp size={24} />, titleKey: 'home.solutions.growth_enhancement.title', descKey: 'home.solutions.growth_enhancement.desc', title: 'Growth Enhancement', id: 'growth', desc: 'Maximize crop potential with science-backed growth regulators and bio-stimulants.', link: '/solutions/growth', color: '#E65100' },
            ].map((sol, i) => (
              <AnimatedSection key={i}>
                <Link to={sol.link} className="solution-card card">
                  <div className="solution-card-image">
                    <img src={solImages[sol.id]} alt={sol.title} className="solution-img" />
                    <div className="solution-card-overlay" style={{ background: `linear-gradient(to bottom, transparent, ${sol.color}40)` }}></div>
                    <div className="solution-icon-floating" style={{ background: sol.color }}>
                      {sol.icon}
                    </div>
                  </div>
                  <div className="solution-card-body">
                    <h3>{t(sol.titleKey, sol.title)}</h3>
                    <p>{t(sol.descKey, sol.desc)}</p>
                    <span className="solution-link" style={{ color: sol.color }}>
                      {t('common.explore', 'Explore')} <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FEATURED PRODUCTS ══════════ */}
      <section className="section moving-gradient-bg" id="products-preview">
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

          <div className="products-showcase-split">
            <AnimatedSection direction="left" className="products-visual-frame">
              <div className="products-main-image">
                <img src={productsImg} alt="Jay Agritech Product Range" className="products-composite-img" />
                <div className="products-image-overlay"></div>
              </div>
              <div className="products-stats-overlay">
                <div className="pso-item">
                  <span className="pso-number">60+</span>
                  <span className="pso-label">Products</span>
                </div>
                <div className="pso-divider"></div>
                <div className="pso-item">
                  <span className="pso-number">5</span>
                  <span className="pso-label">Categories</span>
                </div>

              </div>
            </AnimatedSection>

            <div className="products-category-list">
              {products.categories.map((cat, i) => (
                <AnimatedSection key={cat.id} direction="right">
                  <Link to={`/products/${cat.slug}`} className="product-list-item">
                    <div className="pli-icon" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                      {cat.id === 'bio-insecticides' && <Shield size={24} />}
                      {cat.id === 'biostimulants' && <Zap size={24} />}
                      {cat.id === 'bio-fertilizers' && <Microscope size={24} />}
                      {cat.id === 'organic-nutrients' && <Leaf size={24} />}
                      {cat.id === 'micronutrients' && <FlaskConical size={24} />}
                    </div>
                    <div className="pli-content">
                      <div className="pli-header">
                        <h3>{t(cat.nameKey, cat.name)}</h3>
                        <span className="pli-count">{t('home.products_count', { count: cat.productCount, defaultValue: `${cat.productCount} Products` })}</span>
                      </div>
                      <p>{t(cat.descriptionKey, cat.description)}</p>
                      <div className="pli-action">
                        <span>{t('common.explore', 'Explore Category')}</span>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ══════════ CASE STUDIES ══════════ */}
      <section className="section bg-off-white" id="case-studies-preview">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-overline">{t('home.success_title')}</span>
              <h2 className="section-title">{t('home.success_h2')}</h2>
              <p className="section-subtitle">
                {t('home.success_subtitle')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid-3">
            {caseStudies.map((study) => (
              <AnimatedSection key={study.id}>
                <Link to={`/case-studies`} className="case-card card">
                  <div className="case-card-image">
                    <img src={caseImages[study.id]} alt={study.title} className="case-img" />
                  </div>
                  <div className="card-body">
                    <div className="case-meta">
                      <span className="badge badge-green">{t(`home.case_studies.${study.slug}.crop`, study.crop)}</span>
                      <span className="case-location"><MapPin size={12} /> {t(`home.case_studies.${study.slug}.location`, study.location)}</span>
                    </div>
                    <h3>{t(`home.case_studies.${study.slug}.title`, study.title)}</h3>
                    <p>{t(`home.case_studies.${study.slug}.challenge`, study.challenge)}</p>
                    <div className="case-results">
                      {study.results.slice(0, 2).map((r, i) => (
                        <div key={i} className="case-result">
                          <Check size={14} /> {t(`home.case_studies.${study.slug}.results.${i}`, r)}
                        </div>
                      ))}
                    </div>
                    <blockquote className="case-quote">
                      "{t(`home.case_studies.${study.slug}.testimonial`, study.testimonial).slice(0, 100)}..."
                      <cite>— {t(`home.case_studies.${study.slug}.farmer`, study.farmer)}</cite>
                    </blockquote>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center" style={{ marginTop: 'var(--sp-8)' }}>
            <Link to="/case-studies" className="btn btn-secondary">
              {t('common.view_all_case_studies', 'View All Case Studies')} <ArrowRight size={16} />
            </Link>
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
                  <h4>{t(`company.values.${toKey(val.title)}.title`, val.title)}</h4>
                  <p>{t(`company.values.${toKey(val.title)}.desc`, val.description)}</p>
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
