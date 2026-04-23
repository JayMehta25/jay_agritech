import { Link } from 'react-router-dom';
import {
  ArrowRight, Leaf, FlaskConical, Shield, Sprout, TrendingUp,
  Users, Award, MapPin, ChevronRight, Star, Check, Zap,
  Microscope, Beaker, Globe, Target, Heart
} from 'lucide-react';
import { useScrollAnimation, useScrollAnimationGroup, useCountUp } from '../../hooks/useScrollAnimation';
import { companyInfo, products, blogPosts, caseStudies } from '../../data/siteData';
import ProcessFlow from '../../components/ui/ProcessFlow';
import GrowthSystemVisual from '../../components/ui/GrowthSystemVisual';
import collageImg from '../../assets/sustainable_farming_collage.png';
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

const blogImages = { 1: blogSoilImg, 2: blogIpmImg, 3: blogBioChemImg };
const caseImages = { 1: caseCottonImg, 2: caseGroundnutImg, 3: caseMangoImg };
const catImages = {
  'bio-fertilizers': catBfImg,
  'bio-pesticides': catBpImg,
  'plant-growth-regulators': catPgrImg,
  'organic-nutrients': catOnImg,
  'specialty-products': catSpImg
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
  return (
    <div className="home-page">
      {/* ══════════ HERO ══════════ */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
          <div className="hero-orb hero-orb-1"></div>
          <div className="hero-orb hero-orb-2"></div>
          <div className="hero-orb hero-orb-3"></div>
        </div>
        <div className="container hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <Leaf size={14} />
              <span>Established 2026 · Valsad, Gujarat</span>
            </div>
            <h1 className="hero-title">
              Innovating <span className="text-gradient">Agriculture</span>,<br />
              Nurturing <span className="text-gradient">Growth</span>
            </h1>
            <p className="hero-subtitle">
              Science-backed biological & organic agricultural solutions that enhance crop productivity,
              improve soil health, and empower every farmer with sustainable technology.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-gold btn-lg">
                Explore Products <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn btn-hero-outline btn-lg">
                Our Story <ChevronRight size={18} />
              </Link>
            </div>
            <div className="hero-trust">
              <div className="hero-trust-item">
                <Check size={16} /> ISO 9001:2015 Certified
              </div>
              <div className="hero-trust-item">
                <Check size={16} /> 60+ Products
              </div>
              <div className="hero-trust-item">
                <Check size={16} /> Made in India
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <ProcessFlow />
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
              <StatCounter key={i} {...stat} />
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
              <span className="section-overline">About Jay Agritech</span>
              <h2>Pioneering Sustainable Agriculture from Gujarat to All of India</h2>
              <p className="about-lead">
                Founded in 2026 in Valsad, Gujarat, Jay Agritech Pvt. Ltd. is on a mission to
                revolutionize Indian agriculture through innovative biological solutions.
              </p>
              <p>
                We combine cutting-edge microbial technology with deep agricultural expertise
                to create products that work — for the farmer, for the crop, and for the environment.
              </p>
              <div className="about-highlights">
                <div className="highlight-item">
                  <div className="highlight-icon"><Microscope size={20} /></div>
                  <div>
                    <strong>Advanced R&D Lab</strong>
                    <span>State-of-the-art microbiology & formulation research</span>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon"><Target size={20} /></div>
                  <div>
                    <strong>Farmer-Centric Design</strong>
                    <span>Every product tested with real farmers in real fields</span>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon"><Globe size={20} /></div>
                  <div>
                    <strong>Pan-India Presence</strong>
                    <span>Growing network across 15+ Indian states</span>
                  </div>
                </div>
              </div>
              <Link to="/about" className="btn btn-primary">
                Learn More About Us <ArrowRight size={16} />
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
              <span className="section-overline">Our Solutions</span>
              <h2 className="section-title">Comprehensive Crop Solutions</h2>
              <p className="section-subtitle">
                From soil to harvest — integrated biological solutions for every stage of crop growth
              </p>
            </div>
          </AnimatedSection>

          <div className="solutions-grid">
            {[
              { icon: <Leaf size={28} />, title: 'Soil Health', desc: 'Restore and maintain soil vitality with microbial solutions that rebuild your soil\'s natural fertility.', link: '/solutions/soil-health', color: '#2E7D32' },
              { icon: <Sprout size={28} />, title: 'Nutrient Management', desc: 'Balanced, bio-available nutrition through organic and microbial nutrient delivery systems.', link: '/solutions/nutrient-mgmt', color: '#1565C0' },
              { icon: <Shield size={28} />, title: 'Pest & Disease', desc: 'Eco-friendly biological pest management — effective protection without harmful residues.', link: '/solutions/pest-disease', color: '#C62828' },
              { icon: <TrendingUp size={28} />, title: 'Growth Enhancement', desc: 'Maximize crop potential with science-backed growth regulators and bio-stimulants.', link: '/solutions/growth', color: '#E65100' },
            ].map((sol, i) => (
              <AnimatedSection key={i}>
                <Link to={sol.link} className="solution-card card">
                  <div className="solution-icon" style={{ background: `${sol.color}15`, color: sol.color }}>
                    {sol.icon}
                  </div>
                  <h3>{sol.title}</h3>
                  <p>{sol.desc}</p>
                  <span className="solution-link">
                    Explore <ArrowRight size={14} />
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FEATURED PRODUCTS ══════════ */}
      <section className="section bg-white" id="products-preview">
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
                    <h3>{cat.name}</h3>
                    <p>{cat.description}</p>
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
              <span className="section-overline" style={{ color: 'var(--clr-accent-gold)' }}>Why Jay Agritech?</span>
              <h2 className="section-title" style={{ color: 'white' }}>The Jay Agritech Advantage</h2>
              <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.7)' }}>
                What sets us apart in the world of agricultural innovation
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
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
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
              <span className="section-overline">Proprietary Methodology</span>
              <h2>The Jay Agritech Growth System™</h2>
              <p>
                Our integrated 4-step approach to transforming agriculture — combining soil science,
                biological nutrition, eco-safe protection, and growth optimization into one cohesive system.
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
                Learn About Our System <ArrowRight size={16} />
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
              <span className="section-overline">Success Stories</span>
              <h2 className="section-title">Real Results, Real Farmers</h2>
              <p className="section-subtitle">
                See how Jay Agritech products are making a measurable difference across Indian farms
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
              <span className="section-overline">Knowledge Hub</span>
              <h2 className="section-title">Agricultural Insights & Tips</h2>
              <p className="section-subtitle">
                Expert articles, guides, and seasonal advisories for modern farmers
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
                <span className="section-overline" style={{ color: 'var(--clr-accent-gold)' }}>Partner With Us</span>
                <h2>Grow Your Business with Jay Agritech</h2>
                <p>
                  Join our expanding network of dealers, distributors, and export partners.
                  Access premium products, marketing support, and competitive margins.
                </p>
                <div className="pcta-types">
                  <Link to="/partners/dealer" className="pcta-type">
                    <strong>Become a Dealer</strong>
                    <span>Retail-level partnership</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link to="/partners/distributor" className="pcta-type">
                    <strong>Become a Distributor</strong>
                    <span>District/region-level partnership</span>
                    <ArrowRight size={16} />
                  </Link>
                  <Link to="/business/exports" className="pcta-type">
                    <strong>Export Partnership</strong>
                    <span>International business opportunities</span>
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
              <span className="section-overline">Our Values</span>
              <h2 className="section-title">What We Stand For</h2>
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
