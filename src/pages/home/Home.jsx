import { Link } from 'react-router-dom';
import {
  ArrowRight, Leaf, FlaskConical, Shield, Sprout, TrendingUp,
  Users, Award, MapPin, ChevronRight, Star, Check, Zap,
  Microscope, Beaker, Globe, Target, Heart
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation, useScrollAnimationGroup, useCountUp } from '../../hooks/useScrollAnimation';
import { companyInfo, products, blogPosts, caseStudies } from '../../data/siteData';
import GrowthSystemVisual from '../../components/ui/GrowthSystemVisual';
import collageImg from '../../assets/sustainable_farming_collage.png';
// Assets
import logoImg from '../../assets/new_title.png';
import companyVideo from '../../assets/Video_Ad_Request_Farmers_Work.mp4';
import './Home.css';

// Blog Images
import blogSoilImg from '../../assets/blog/soil_health.png';
import blogIpmImg from '../../assets/blog/ipm_strategies.png';
import blogBioChemImg from '../../assets/blog/bio_vs_chemical.png';

// Case Study Images
import caseCottonImg from '../../assets/case-studies/cotton.png';
import caseGroundnutImg from '../../assets/case-studies/groundnut.png';
import caseMangoImg from '../../assets/case-studies/mango.png';

// Product Category Images
import catBfImg from '../../assets/products/bio-fertilizers.png';
import catBpImg from '../../assets/products/bio-pesticides.png';
import catPgrImg from '../../assets/products/pgr.png';
import catOnImg from '../../assets/products/organic-nutrients.png';
import catSpImg from '../../assets/products/specialty.png';
import catMnImg from '../../assets/products/micronutrients.png';

const blogImages = { 1: blogSoilImg, 2: blogIpmImg, 3: blogBioChemImg };
const caseImages = { 1: caseCottonImg, 2: caseGroundnutImg, 3: caseMangoImg };
const catImages = {
  'bio-insecticides': catBfImg,
  'biostimulants': catPgrImg,
  'organic-nutrients': catOnImg,
  'specialty-products': catSpImg,
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
export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="home-page">
      {/* ══════════ HERO ══════════ */}
      <section className="hero" id="hero">
        <div className="hero-video-bg">
          <video 
            src={companyVideo} 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="hero-video-element"
          />
          <div className="hero-video-overlay-dark"></div>
        </div>

        <div className="container hero-container-centered">
          <div className="hero-text-centered">
            <div className="hero-badge centered-badge">
              <Leaf size={14} />
              <span>{t('hero.badge')}</span>
            </div>
            <h1 className="hero-title centered-title">
              {t('hero.title_part1')} <span className="text-gradient">{t('hero.title_part2')}</span>,<br />
              {t('hero.title_part3')} <span className="text-gradient">{t('hero.title_part4')}</span>
            </h1>
            <p className="hero-subtitle centered-subtitle">
              {t('hero.subtitle')}
            </p>
            <div className="hero-actions centered-actions">
              <Link to="/products" className="btn btn-gold btn-lg">
                {t('hero.explore_btn')} <ArrowRight size={18} />
              </Link>
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

      {/* ══════════ ABOUT PREVIEW ══════════ */}
      <section className="section bg-white" id="about-preview">
        <div className="container">
          <div className="about-preview-grid">
            <AnimatedSection direction="left" className="about-preview-visual">
              <div className="about-image-collage">
                <div className="collage-main">
                  <img src={collageImg} alt="Sustainable Farming" className="collage-img" />
                </div>
                <div className="collage-badge">
                  <Award size={20} />
                  <span>Est. 2026</span>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" className="about-preview-content">
              <span className="section-overline">{t('home.about_title')}</span>
              <h2>{t('home.about_h2')}</h2>
              <p className="about-lead">
                {t('home.about_lead')}
              </p>
              <p>
                {t('home.about_p1')}
              </p>
              <div className="about-highlights">
                <div className="highlight-item">
                  <div className="highlight-icon"><Microscope size={20} /></div>
                  <div>
                    <strong>{t('home.highlights.rd.title', 'Advanced R&D Lab')}</strong>
                    <span>{t('home.highlights.rd.desc', 'State-of-the-art microbiology & formulation research')}</span>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon"><Target size={20} /></div>
                  <div>
                    <strong>{t('home.highlights.farmer.title', 'Farmer-Centric Design')}</strong>
                    <span>{t('home.highlights.farmer.desc', 'Every product tested with real farmers in real fields')}</span>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon"><Globe size={20} /></div>
                  <div>
                    <strong>{t('home.highlights.presence.title', 'Pan-India Presence')}</strong>
                    <span>{t('home.highlights.presence.desc', 'Growing network across 15+ Indian states')}</span>
                  </div>
                </div>
              </div>
              <Link to="/about" className="btn btn-primary">
                {t('common.learn_more')} <ArrowRight size={16} />
              </Link>
            </AnimatedSection>
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
              { icon: <Leaf size={24} />, title: 'Soil Health', id: 'soil-health', desc: 'Restore and maintain soil vitality with microbial solutions that rebuild your soil\'s natural fertility.', link: '/solutions/soil-health', color: '#2E7D32' },
              { icon: <Sprout size={24} />, title: 'Nutrient Management', id: 'nutrient-mgmt', desc: 'Balanced, bio-available nutrition through organic and microbial nutrient delivery systems.', link: '/solutions/nutrient-mgmt', color: '#1565C0' },
              { icon: <Shield size={24} />, title: 'Pest & Disease', id: 'pest-disease', desc: 'Eco-friendly biological pest management — effective protection without harmful residues.', link: '/solutions/pest-disease', color: '#C62828' },
              { icon: <TrendingUp size={24} />, title: 'Growth Enhancement', id: 'growth', desc: 'Maximize crop potential with science-backed growth regulators and bio-stimulants.', link: '/solutions/growth', color: '#E65100' },
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
                    <h3>{t(`home.solutions.${sol.title.toLowerCase().replace(/\s/g, '_')}.title`, sol.title)}</h3>
                    <p>{t(`home.solutions.${sol.title.toLowerCase().replace(/\s/g, '_')}.desc`, sol.desc)}</p>
                    <span className="solution-link" style={{ color: sol.color }}>
                      Explore <ArrowRight size={14} />
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
              <span className="section-overline">Product Portfolio</span>
              <h2 className="section-title">60+ Innovative Products</h2>
              <p className="section-subtitle">
                Across 5 categories — bio fertilizers, bio pesticides, growth regulators, organic nutrients, and specialty products
              </p>
            </div>
          </AnimatedSection>

          <div className="product-categories-grid">
            {products.categories.map((cat, i) => (
              <AnimatedSection key={cat.id}>
                <Link to={`/products/${cat.slug}`} className="product-category-card card">
                  <div className="pcc-image">
                    <img src={catImages[cat.id]} alt={cat.name} className="pcc-img" />
                  </div>
                  <div className="pcc-content">
                    <h3>{t(cat.nameKey, cat.name)}</h3>
                    <p>{t(cat.descriptionKey, cat.description)}</p>
                    <div className="pcc-footer">
                      <span className="badge badge-green">{cat.productCount} Products</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center" style={{ marginTop: 'var(--sp-10)' }}>
            <Link to="/products" className="btn btn-primary btn-lg">
              View All Products <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════ WHY CHOOSE US ══════════ */}
      <section className="section why-section" id="why-choose">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-overline" style={{ color: 'var(--clr-accent-gold)' }}>{t('home.why_title')}</span>
              <h2 className="section-title" style={{ color: 'white' }}>{t('home.why_h2')}</h2>
              <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {t('home.why_subtitle')}
              </p>
            </div>
          </AnimatedSection>

          <div className="why-grid">
            {[
              { icon: <FlaskConical size={24} />, title: 'Research-Driven', desc: 'Every product backed by rigorous R&D and field trials — no guesswork, only science.' },
              { icon: <Award size={24} />, title: 'Quality Assured', desc: 'ISO 9001:2015 certified processes. Every batch tested for potency and purity.' },
              { icon: <Users size={24} />, title: 'Farmer-First', desc: 'Products designed with real farmer feedback. Affordable, accessible, effective.' },
              { icon: <Leaf size={24} />, title: '100% Eco-Safe', desc: 'Zero harmful chemicals. Safe for the environment, safe for consumers.' },
              { icon: <Zap size={24} />, title: 'Proven Results', desc: '15-40% yield improvement documented across multiple crops and geographies.' },
              { icon: <Heart size={24} />, title: 'Made in India', desc: 'Proudly developed and manufactured in Gujarat, for Indian soil conditions.' },
            ].map((item, i) => (
              <AnimatedSection key={i}>
                <div className="why-card">
                  <div className="why-icon">{item.icon}</div>
                  <h4>{t(`home.why_reasons.${item.title.toLowerCase().replace(/\s/g, '_')}.title`, item.title)}</h4>
                  <p>{t(`home.why_reasons.${item.title.toLowerCase().replace(/\s/g, '_')}.desc`, item.desc)}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ GROWTH SYSTEM ══════════ */}
      <section className="section bg-white" id="growth-system-preview">
        <div className="container-wide">
          <div className="growth-preview-grid">
            <AnimatedSection direction="left" className="growth-preview-content">
              <span className="section-overline">{t('home.growth_title')}</span>
              <h2>{t('home.growth_h2')}</h2>
              <p>
                {t('home.growth_p1')}
              </p>
              <div className="growth-steps">
                {[
                  { step: '01', title: 'Soil Foundation', desc: 'Rebuild soil biology & health' },
                  { step: '02', title: 'Bio Nutrition', desc: 'Natural nutrient delivery systems' },
                  { step: '03', title: 'Eco Protection', desc: 'Biological pest & disease control' },
                  { step: '04', title: 'Growth Boost', desc: 'Maximize yield & quality' },
                ].map((s) => (
                  <div key={s.step} className="growth-step">
                    <span className="step-number">{s.step}</span>
                    <div>
                      <strong>{s.title}</strong>
                      <span>{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/growth-system" className="btn btn-primary">
                {t('home.growth_btn', 'Learn About Our System')} <ArrowRight size={16} />
              </Link>
            </AnimatedSection>
            <div className="growth-preview-visual">
              <GrowthSystemVisual />
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
                      <span className="badge badge-green">{study.crop}</span>
                      <span className="case-location"><MapPin size={12} /> {study.location}</span>
                    </div>
                    <h3>{study.title}</h3>
                    <p>{study.challenge}</p>
                    <div className="case-results">
                      {study.results.slice(0, 2).map((r, i) => (
                        <div key={i} className="case-result">
                          <Check size={14} /> {r}
                        </div>
                      ))}
                    </div>
                    <blockquote className="case-quote">
                      "{study.testimonial.slice(0, 100)}..."
                      <cite>— {study.farmer}</cite>
                    </blockquote>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center" style={{ marginTop: 'var(--sp-8)' }}>
            <Link to="/case-studies" className="btn btn-secondary">
              View All Case Studies <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════ BLOG PREVIEW ══════════ */}
      <section className="section bg-white" id="blog-preview">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-overline">{t('home.knowledge_title')}</span>
              <h2 className="section-title">{t('home.knowledge_h2')}</h2>
              <p className="section-subtitle">
                {t('home.knowledge_subtitle')}
              </p>
            </div>
          </AnimatedSection>

          <div className="blog-preview-grid">
            {blogPosts.slice(0, 3).map((post) => (
              <AnimatedSection key={post.id}>
                <Link to={`/blog/${post.slug}`} className="blog-card card">
                  <div className="blog-card-image">
                    <img src={blogImages[post.id]} alt={post.title} className="blog-img" />
                  </div>
                  <div className="card-body">
                    <div className="blog-meta">
                      <span className="badge badge-green">{post.category}</span>
                      <span className="blog-date">{post.readTime}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span className="blog-read-more">Read More <ArrowRight size={14} /></span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center" style={{ marginTop: 'var(--sp-8)' }}>
            <Link to="/blog" className="btn btn-secondary">
              Visit Knowledge Hub <ArrowRight size={16} />
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
                    <strong>{t('nav.links.become_a_dealer', 'Become a Dealer')}</strong>
                    <span>{t('home.partner_types.dealer', 'Retail-level partnership')}</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link to="/partners/distributor" className="pcta-type">
                    <strong>{t('nav.links.become_a_distributor', 'Become a Distributor')}</strong>
                    <span>{t('home.partner_types.distributor', 'District/region-level partnership')}</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link to="/business/exports" className="pcta-type">
                    <strong>{t('nav.links.export_partnership', 'Export Partnership')}</strong>
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
                  <h4>{val.title}</h4>
                  <p>{val.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
