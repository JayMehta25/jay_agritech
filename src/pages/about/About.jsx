import React, { useEffect } from 'react';
import { useLocation } from '../../components/RouterBridge';
import { Calendar, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { companyInfo } from '../../data/siteData';
import GenericPage from '../../components/ui/GenericPage';
import { assetSrc } from '../../utils/assetSrc';
import sustainableImgAsset from '../../assets/sustainable_farming_collage.png';
import innovationImgAsset from '../../assets/modern_agriculture_innovation.png';

const sustainableImg = assetSrc(sustainableImgAsset);
const innovationImg = assetSrc(innovationImgAsset);

function AnimatedSection({ children, className = '', id = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} id={id} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

export default function About() {
  const { t } = useTranslation();
  const location = useLocation();

  // Scroll to hash element smoothly
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      } else {
        window.scrollTo(0, 0);
      }
    };

    // Run on hash changes or initial render
    handleHashScroll();
    
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, [location.hash]);

  return (
    <GenericPage 
      title={t('nav.links.company_overview')} 
      subtitle={t('home.about_lead')} 
      heroImage={sustainableImg}
      breadcrumbs={[{ label: t('nav.about') }]}
    >
      <div className="container">
        {/* ─── About Us — Overview ─── */}
        <AnimatedSection id="overview" className="section">
          <div className="about-overview-layout-simple">
            <div className="about-overview-main">
              <span className="section-overline">{t('about.journey_overline', 'Our Journey')}</span>
              <h2 className="section-title">{t('about.journey_title', 'Pioneering Agricultural Innovation Since 2026')}</h2>
              
              <div className="about-overview-content">
                <p>
                  {t('about.journey_text_prefix', 'At ')}
                  <strong>{t('about.company_name', 'Jay Agritech Pvt. Ltd.')}</strong>
                  {t('about.journey_text_body', ', we deliver innovative, sustainable, and high-quality agricultural solutions designed to maximize crop productivity and restore soil health. Our promoters bring rich experience in the chemical and allied industries. This legacy provides us with deep technical knowledge, strong business ethics, and a culture built on quality and reliability. By leveraging this heritage, we ensure that every formulation we produce meets the highest standards of efficacy and safety.')}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ─── Closing Banner — Immersive ─── */}
        <AnimatedSection id="sustainability" className="section" style={{ marginTop: 'var(--sp-6)', marginBottom: 'var(--sp-12)' }}>
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
        <AnimatedSection id="vision-mission" className="section" style={{ borderTop: '1px solid var(--clr-border-light)', paddingTop: 'var(--sp-12)' }}>
          <div className="about-vision-mission-grid" style={{ alignItems: 'start' }}>
            <div className="card" style={{ padding: 'var(--sp-8)', borderLeft: '4px solid var(--clr-primary)' }}>
              <h3 style={{ marginBottom: 'var(--sp-3)', color: 'var(--clr-primary)' }}>{t('nav.links.vision_&_mission').split(/&|और|અને/)[0]?.trim()}</h3>
              <p style={{ fontSize: 'var(--fs-body-lg)', lineHeight: 'var(--lh-loose)' }}>{t('company.vision')}</p>
            </div>
            <div className="card" style={{ padding: 'var(--sp-8)', borderLeft: '4px solid var(--clr-accent-gold)' }}>
              <h3 style={{ marginBottom: 'var(--sp-3)', color: 'var(--clr-accent-gold-dark)' }}>{(t('nav.links.vision_&_mission').split(/&|और|અને/)[1] || t('nav.links.vision_&_mission').split(/&|और|અને/)[0])?.trim()}</h3>
              <p style={{ fontSize: 'var(--fs-body-lg)', lineHeight: 'var(--lh-loose)' }}>{t('company.mission')}</p>
            </div>
          </div>
        </AnimatedSection>

        {/* ─── Leadership ─── */}
        <AnimatedSection id="leadership" className="section" style={{ borderTop: '1px solid var(--clr-border-light)', paddingTop: 'var(--sp-12)' }}>
          <div className="section-header" style={{ marginBottom: 'var(--sp-8)' }}>
            <span className="section-overline">{t('nav.links.leadership_team')}</span>
            <h2 className="section-title">{t('company.leadership.subtitle')}</h2>
          </div>
          <div className="about-leadership-grid">
            {companyInfo.leadership.map((person, i) => (
              <div key={i} className="about-leadership-card">
                <div className="alc-image-wrapper">
                  {person.image ? (
                    <img src={person.image} alt={person.name} />
                  ) : (
                    <div className="alc-avatar-fallback">
                      <span>{person.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                  )}
                </div>
                <div className="alc-content">
                  <h3>{t(`company.leadership.people.${person.id || person.name.toLowerCase().replace(/\s/g, '_')}.name`, person.name)}</h3>
                  <span className="alc-role">{t(`company.leadership.people.${person.id || person.name.toLowerCase().replace(/\s/g, '_')}.role`, person.role)}</span>
                  <p className="alc-bio">{t(`company.leadership.people.${person.id || person.name.toLowerCase().replace(/\s/g, '_')}.bio`, person.bio)}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* ─── Milestones ─── */}
        <AnimatedSection id="journey" className="section" style={{ borderTop: '1px solid var(--clr-border-light)', paddingTop: 'var(--sp-12)' }}>
          <div className="section-header">
            <span className="section-overline">{t('nav.links.our_journey')}</span>
            <h2 className="section-title">{t('nav.links.milestones')}</h2>
          </div>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            {['q1_2026', 'q2_2026', 'q3_2026', 'q4_2026'].map((key, i) => (
              <div key={i} style={{ display: 'flex', gap: 'var(--sp-6)', paddingBottom: 'var(--sp-8)', borderLeft: '2px solid var(--clr-primary-surface)', paddingLeft: 'var(--sp-6)', marginLeft: 'var(--sp-3)', position: 'relative' }}>
                <div style={{ position: 'absolute', left: -7, top: 4, width: 12, height: 12, borderRadius: '50%', background: 'var(--clr-primary)' }}></div>
                <div>
                  <span className="badge badge-green" style={{ marginBottom: 'var(--sp-2)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {t(`company.milestones_list.${key}.year`)}</span>
                  <h4 style={{ marginBottom: 'var(--sp-2)' }}>{t(`company.milestones_list.${key}.title`)}</h4>
                  <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)' }}>{t(`company.milestones_list.${key}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* ─── Certifications ─── */}
        <AnimatedSection id="certifications" className="section" style={{ borderTop: '1px solid var(--clr-border-light)', paddingTop: 'var(--sp-12)', paddingBottom: 'var(--sp-16)' }}>
          <div className="section-header">
            <span className="section-overline">{t('nav.links.certifications')}</span>
            <h2 className="section-title">{t('company.certifications.title', 'Our Certifications')}</h2>
          </div>
          <div className="about-certifications-grid">
            {['iso_9001', 'fco_approved', 'cib_rc', 'npop', 'bis', 'glp'].map((key, i) => (
              <div key={i} className="about-certification-card">
                <CheckCircle size={20} style={{ color: 'var(--clr-primary)', flexShrink: 0 }} />
                <span>{t(`company.certifications_list.${key}`)}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </GenericPage>
  );
}
