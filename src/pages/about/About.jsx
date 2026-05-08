import { Link } from 'react-router-dom';
import { ArrowRight, Lightbulb, Users, Leaf, FlaskConical, Shield, Globe, Award, Calendar, MapPin, Building, CheckCircle, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { companyInfo } from '../../data/siteData';
import GenericPage from '../../components/ui/GenericPage';
import sustainableImg from '../../assets/sustainable_farming_collage.png';
import innovationImg from '../../assets/modern_agriculture_innovation.png';
import './About.css';

function AnimatedSection({ children, className = '', id = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} id={id} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

import valInnovationImg from '../../assets/values/innovation.png';
import valFarmerImg from '../../assets/values/farmer-centric.png';
import valSustainabilityImg from '../../assets/values/sustainability.png';
import valScienceImg from '../../assets/values/science.png';
import valIntegrityImg from '../../assets/values/integrity.png';
import valAccessibilityImg from '../../assets/values/accessibility.png';
import valManufacturingImg from '../../assets/values/manufacturing.png';

const valueImages = {
  'Award': valManufacturingImg,
  'Lightbulb': valInnovationImg,
  'Users': valFarmerImg,
  'Shield': valIntegrityImg,
  'Leaf': valSustainabilityImg,
  'FlaskConical': valScienceImg,
  'Globe': valAccessibilityImg,
};

export default function About() {
  const { t } = useTranslation();
  const iconMap = { Lightbulb, Users, Leaf, FlaskConical, Shield, Globe };
  return (
    <GenericPage title={t('nav.links.company_overview')} subtitle={t('home.about_lead')} breadcrumbs={[{ label: t('nav.about') }]}>
      <div className="container">
        {/* ─── About Us — Hero Split ─── */}
        <AnimatedSection id="overview">
          <section className="about-split">
            <div className="about-split__image">
              <img src={sustainableImg} alt="Jay Agritech Agriculture" />
              <div className="about-split__overlay" />
              <div className="about-split__stats">
                <div className="about-stat">
                  <span className="about-stat__num">50+</span>
                  <span className="about-stat__label">Years Experience</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat__num">15-30</span>
                  <span className="about-stat__label">Expert Team</span>
                </div>
                <div className="about-stat">
                  <span className="about-stat__num">60+</span>
                  <span className="about-stat__label">Products</span>
                </div>
              </div>
            </div>
            <div className="about-split__text">
              <span className="section-overline">Our Legacy & Future</span>
              <h2 className="about-split__title">Innovating Agriculture for Generations</h2>
              <div className="about-split__lead">
                At <strong>Jay Agritech Pvt. Ltd.</strong>, we deliver innovative, sustainable, and high-quality agricultural solutions for modern farming and crop productivity.
              </div>
              <p className="about-split__body">
                Our promoters bring <strong>45–50 years</strong> of rich experience in the chemical and allied industries — backed by deep technical knowledge, strong business ethics, and a culture built on quality, innovation, and reliability.
              </p>
              <p className="about-split__body">
                Our dynamic young team, with <strong>15–30 years</strong> of hands-on expertise, continuously develops effective agricultural inputs to meet the evolving needs of farmers, distributors, and partners across markets.
              </p>
              <p className="about-split__body" style={{ fontWeight: 'var(--fw-semibold)', color: 'var(--clr-primary)', marginTop: 'var(--sp-4)' }}>
                Our strength lies in combining technical expertise, operational excellence, and market understanding to create products that drive sustainable agriculture and long-term growth.
              </p>
            </div>
          </section>
        </AnimatedSection>

        {/* ─── Closing Banner — Immersive ─── */}
        <AnimatedSection id="sustainability">
          <div className="about-closing-banner">
            <img src={innovationImg} alt="" className="about-closing-banner__bg" />
            <div className="about-closing-banner__content">
              <p>
                "With a vision to become a trusted name in the agriculture industry, we continue to expand our capabilities while maintaining our commitment to excellence and value creation for all stakeholders."
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* ─── Vision & Mission ─── */}
        <AnimatedSection id="vision-mission">
          <section className="section">
            <div className="grid-2" style={{ gap: 'var(--sp-10)', alignItems: 'start' }}>
              <div className="card" style={{ padding: 'var(--sp-8)', borderLeft: '4px solid var(--clr-primary)' }}>
                <h3 style={{ marginBottom: 'var(--sp-3)', color: 'var(--clr-primary)' }}>{t('nav.links.vision_&_mission').split(/&|और|અને/)[0]?.trim()}</h3>
                <p style={{ fontSize: 'var(--fs-body-lg)', lineHeight: 'var(--lh-loose)' }}>{t('company.vision')}</p>
              </div>
              <div className="card" style={{ padding: 'var(--sp-8)', borderLeft: '4px solid var(--clr-accent-gold)' }}>
                <h3 style={{ marginBottom: 'var(--sp-3)', color: 'var(--clr-accent-gold-dark)' }}>{(t('nav.links.vision_&_mission').split(/&|और|અને/)[1] || t('nav.links.vision_&_mission').split(/&|और|અને/)[0])?.trim()}</h3>
                <p style={{ fontSize: 'var(--fs-body-lg)', lineHeight: 'var(--lh-loose)' }}>{t('company.mission')}</p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* ─── Values ─── */}
        <AnimatedSection id="values">
          <section className="section">
            <div className="grid-4">
              {companyInfo.values.map((val, i) => {
                const Icon = iconMap[val.icon] || Leaf;
                const valImage = valueImages[val.icon];
                return (
                  <div key={i} className="card hover-lift" style={{ padding: 0, overflow: 'hidden', textAlign: 'center' }}>
                    {valImage && (
                      <div style={{ width: '100%', height: 180, overflow: 'hidden', position: 'relative' }}>
                        <img src={valImage} alt={val.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.2))' }}></div>
                      </div>
                    )}
                    <div style={{ padding: 'var(--sp-6)' }}>
                      <div style={{ width: 56, height: 56, background: 'var(--clr-primary-surface)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: valImage ? '-36px auto var(--sp-3)' : '0 auto var(--sp-4)', color: 'var(--clr-primary)', position: 'relative', zIndex: 2, border: '3px solid white', boxShadow: 'var(--shadow-md)' }}><Icon size={24} /></div>
                      <h4 style={{ marginBottom: 'var(--sp-2)' }}>{t(`company.values.${val.title.toLowerCase().replace(/\s/g, '_')}.title`, val.title)}</h4>
                      <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)' }}>{t(`company.values.${val.title.toLowerCase().replace(/\s/g, '_')}.desc`, val.description)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </AnimatedSection>

        {/* ─── Leadership ─── */}
        <AnimatedSection id="leadership">
          <section className="section">
            <div className="section-header">
              <span className="section-overline">{t('nav.links.leadership_team')}</span>
              <h2 className="section-title">{t('company.leadership.subtitle')}</h2>
            </div>
            <div className="grid-4">
              {companyInfo.leadership.map((person, i) => (
                <div key={i} className="card hover-lift" style={{ textAlign: 'center', padding: 'var(--sp-6)' }}>
                  <div style={{ width: 160, height: 160, borderRadius: '50%', background: 'var(--gradient-primary)', margin: '0 auto var(--sp-6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', overflow: 'hidden', border: '4px solid white', boxShadow: 'var(--shadow-lg)', transition: 'transform 0.4s var(--ease-spring)' }} className="leadership-avatar">
                    {person.image ? (
                      <img src={person.image} alt={person.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} />
                    ) : (
                      <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{person.name.split(' ').map(n => n[0]).join('')}</span>
                    )}
                  </div>
                  <h4 style={{ fontSize: 'var(--fs-body)' }}>{t(`company.leadership.people.${person.id || person.name.toLowerCase().replace(/\s/g, '_')}.name`, person.name)}</h4>
                  <p style={{ fontSize: 'var(--fs-caption)', color: 'var(--clr-primary)', fontWeight: 600, marginBottom: 'var(--sp-3)' }}>{t(`company.leadership.people.${person.id || person.name.toLowerCase().replace(/\s/g, '_')}.role`, person.role)}</p>
                  <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)', lineHeight: '1.6' }}>{t(`company.leadership.people.${person.id || person.name.toLowerCase().replace(/\s/g, '_')}.bio`, person.bio)}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* ─── Milestones ─── */}
        <AnimatedSection id="journey">
          <section className="section">
            <div className="section-header"><span className="section-overline">{t('nav.links.our_journey')}</span><h2 className="section-title">{t('nav.links.milestones')}</h2></div>
            <div style={{ maxWidth: 700, margin: '0 auto' }}>
              {['q1_2026', 'q2_2026', 'q3_2026', 'q4_2026'].map((key, i) => (
                <div key={i} style={{ display: 'flex', gap: 'var(--sp-6)', paddingBottom: 'var(--sp-8)', borderLeft: '2px solid var(--clr-primary-surface)', paddingLeft: 'var(--sp-6)', marginLeft: 'var(--sp-3)', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: -7, top: 4, width: 12, height: 12, borderRadius: '50%', background: 'var(--clr-primary)' }}></div>
                  <div>
                    <span className="badge badge-green" style={{ marginBottom: 'var(--sp-2)', display: 'inline-flex' }}><Calendar size={12} /> {t(`company.milestones_list.${key}.year`)}</span>
                    <h4 style={{ marginBottom: 'var(--sp-2)' }}>{t(`company.milestones_list.${key}.title`)}</h4>
                    <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)' }}>{t(`company.milestones_list.${key}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* ─── Certifications ─── */}
        <AnimatedSection id="certifications">
          <section className="section" style={{ background: 'var(--clr-off-white)', borderRadius: 'var(--radius-xl)', padding: 'var(--sp-12)' }}>
            <div className="section-header"><span className="section-overline">{t('nav.links.certifications')}</span><h2 className="section-title">{t('company.certifications.title', 'Our Certifications')}</h2></div>
            <div className="grid-3">
              {['iso_9001', 'fco_approved', 'cib_rc', 'npop', 'bis', 'glp'].map((key, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', padding: 'var(--sp-4)', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--clr-border-light)' }}>
                  <CheckCircle size={20} style={{ color: 'var(--clr-primary)', flexShrink: 0 }} />
                  <span style={{ fontWeight: 'var(--fw-medium)' }}>{t(`company.certifications_list.${key}`)}</span>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>
      </div>
    </GenericPage>
  );
}
