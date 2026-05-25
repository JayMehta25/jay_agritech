import React, { useState, useEffect } from 'react';
import { useLocation, Link } from '../../components/RouterBridge';
import { ArrowRight, Factory, FlaskConical, Tag, Globe, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import GenericPage from '../../components/ui/GenericPage';
import B2BEnquiryModal from '../../components/ui/B2BEnquiryModal';

function AnimatedSection({ children, className = '', id = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} id={id} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

export default function Business() {
  const { t } = useTranslation();
  const location = useLocation();
  const [activeSvc, setActiveSvc] = useState(null);

  const services = [
    { key: 'contract_manufacturing', id: 'contract-mfg', icon: <Factory size={32} />, color: '#2E7D32' },
    { key: 'research_formulations', id: 'research', icon: <FlaskConical size={32} />, color: '#1565C0' },
    { key: 'white_label', id: 'white-label', icon: <Tag size={32} />, color: '#E65100' },
    { key: 'exports_franchise', id: 'exports', icon: <Globe size={32} />, color: '#7B1FA2' },
  ];

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
      title={t('pages.business.title')} 
      overline={t('pages.business.overline', 'B2B Services')} 
      subtitle={t('pages.business.subtitle')} 
      breadcrumbs={[{ label: t('nav.business') }]}
    >
      <div className="container" id="overview" style={{ paddingBottom: 'var(--sp-16)' }}>
        {services.map((svc, i) => {
          const svcTitle = t(`pages_details.business.services.${svc.key}.title`);
          const svcDesc = t(`pages_details.business.services.${svc.key}.description`);
          const svcFeatures = Array.isArray(t(`pages_details.business.services.${svc.key}.features`, { returnObjects: true }))
            ? t(`pages_details.business.services.${svc.key}.features`, { returnObjects: true })
            : [];

          return (
            <AnimatedSection key={i} id={svc.id} className="business-subpage-card card" style={{ borderLeft: `5px solid ${svc.color}`, marginBottom: 'var(--sp-10)' }}>
              <div className="bsc-header-row">
                <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-xl)', background: `${svc.color}12`, color: svc.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {svc.icon}
                </div>
                <h2 style={{ fontSize: 'var(--fs-h2)', marginTop: 'var(--sp-2)' }}>{svcTitle}</h2>
              </div>
              
              <p className="bsc-full-desc" style={{ color: 'var(--clr-text-body)', fontSize: 'var(--fs-body-lg)', lineHeight: 1.8, margin: 'var(--sp-6) 0' }}>
                {svcDesc} {t('business.detail_extension', 'We support our partners with comprehensive end-to-end operational capacity, state-of-the-art biological laboratory testing, and robust regulatory compliance. Partnering with Jay Agritech ensures consistent quality, optimized formulations, and rapid scale-to-market.')}
              </p>

              <div className="bsc-features-section" style={{ borderTop: '1px dashed var(--clr-border-light)', paddingTop: 'var(--sp-8)', marginTop: 'var(--sp-6)' }}>
                <h3 style={{ fontSize: 'var(--fs-h3)', marginBottom: 'var(--sp-6)' }}>🌱 {t('business.core_capabilities', 'Core Capabilities & Features')}</h3>
                
                <div className="bsc-features-grid">
                  {svcFeatures.map((f, idx) => (
                    <div key={idx} className="bsc-feature-item">
                      <CheckCircle size={18} style={{ color: svc.color, flexShrink: 0 }} />
                      <span style={{ fontWeight: 'var(--fw-semibold)', color: 'var(--clr-text-primary)' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bsc-cta-area" style={{ marginTop: 'var(--sp-10)', textAlign: 'left' }}>
                <button
                  onClick={() => setActiveSvc({ key: svc.key, id: svc.id, title: svcTitle, color: svc.color })}
                  className="btn btn-primary btn-lg"
                  style={{ background: svc.color, borderColor: svc.color }}
                >
                  {t('pages.business.inquire_now', 'Inquire Now')} <ArrowRight size={18} />
                </button>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
      <B2BEnquiryModal activeSvc={activeSvc} onClose={() => setActiveSvc(null)} />
    </GenericPage>
  );
}
