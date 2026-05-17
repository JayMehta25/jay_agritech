import { Calendar, CheckCircle } from 'lucide-react';
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

export default function About() {
  const { t } = useTranslation();
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
              <span className="section-overline">Our Journey</span>
              <h2 className="section-title">Pioneering Agricultural Innovation Since 2026</h2>
              
              <div className="about-overview-content">
                <p>
                  At <strong>Jay Agritech Pvt. Ltd.</strong>, we deliver innovative, sustainable, and high-quality agricultural solutions designed to maximize crop productivity and restore soil health. Our journey began with a single vision: to bridge the gap between advanced scientific research and practical, on-field farming applications. We understand that modern agriculture faces unprecedented challenges—from depleting soil fertility to evolving pest pressures—and we believe that biological innovation is the key to a sustainable future. Our promoters bring rich experience in the chemical and allied industries. This legacy provides us with deep technical knowledge, strong business ethics, and a culture built on quality and reliability. By leveraging this heritage, we ensure that every formulation we produce meets the highest standards of efficacy and safety. Our dynamic team combines this wisdom with hands-on expertise in modern agricultural inputs. We work closely with agronomists, researchers, and most importantly, the farmers themselves, to ensure that our solutions are not just scientifically sound but also practical and accessible for the Indian farming community. Innovation is at the heart of everything we do. Our state-of-the-art R&D laboratory in Valsad, Gujarat, serves as the nerve center for our product development, where we continuously screen for potent microbial strains and refine our bio-organic formulations to deliver maximum impact with minimum environmental footprint.
                </p>
              </div>
            </div>
          </div>
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
          </section>
        </AnimatedSection>



        {/* ─── Leadership ─── */}
        <AnimatedSection id="leadership">
          <section className="section">
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
