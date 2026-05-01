import { Link } from 'react-router-dom';
import { Users, Truck, Globe, ArrowRight, CheckCircle, TrendingUp, Award, Headphones } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import GenericPage from '../../components/ui/GenericPage';

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

import imgDealer from '../../assets/partners/dealer.png';
import imgDistributor from '../../assets/partners/distributor.png';
import imgExport from '../../assets/partners/export.png';

const typeImages = {
  dealer: imgDealer,
  distributor: imgDistributor,
  export: imgExport,
};

import imgHero from '../../assets/partners/hero.png';

export default function Partners() {
  const { t } = useTranslation();
  const types = [
    { key: 'dealer', icon: <Users size={32} />, color: '#2E7D32' },
    { key: 'distributor', icon: <Truck size={32} />, color: '#1565C0' },
    { key: 'export', icon: <Globe size={32} />, color: '#E65100' },
  ];
  return (
    <GenericPage title={t('pages.partners.title')} overline={t('pages.partners.overline')} subtitle={t('pages.partners.subtitle')} breadcrumbs={[{ label: t('pages.partners.title') }]}>
      <div className="container">
        {/* Partnership Types */}
        <div className="grid-3" style={{ marginBottom: 'var(--sp-16)' }}>
          {types.map((type, i) => (
            <AnimatedSection key={i}>
              <div className="card hover-lift" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ width: '100%', height: 200, overflow: 'hidden', position: 'relative' }}>
                  <img src={typeImages[type.key]} alt={t(`pages_details.partners.reasons.${type.key}.title`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 60%, ${type.color}40)` }}></div>
                </div>
                <div style={{ padding: 'var(--sp-8)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-lg)', background: `${type.color}15`, color: type.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--sp-5)', marginTop: '-44px', position: 'relative', zIndex: 2, border: '4px solid white', boxShadow: 'var(--shadow-md)' }}>{type.icon}</div>
                  <h3 style={{ marginBottom: 'var(--sp-3)' }}>{t(`pages_details.partners.reasons.${type.key}.title`)}</h3>
                  <p style={{ color: 'var(--clr-text-muted)', fontSize: 'var(--fs-body-sm)', marginBottom: 'var(--sp-5)' }}>{t(`pages_details.partners.reasons.${type.key}.desc`)}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)', marginBottom: 'var(--sp-6)', flex: 1 }}>
                    {t(`pages_details.partners.reasons.${type.key}.benefits`, { returnObjects: true }).map((b, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', fontSize: 'var(--fs-body-sm)' }}>
                        <CheckCircle size={14} style={{ color: type.color, flexShrink: 0 }} /> {b}
                      </div>
                    ))}
                  </div>
                  <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }}>{t('pages.partners.apply_now', 'Apply Now')} <ArrowRight size={16} /></Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Why Partner */}
        <AnimatedSection>
          <div style={{ background: 'var(--gradient-hero)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', color: 'white' }}>
            <div className="grid-2" style={{ gap: 0 }}>
              <div style={{ padding: 'var(--sp-12)' }}>
                <h2 style={{ color: 'white', marginBottom: 'var(--sp-8)' }}>{t('pages.partners.why_partner', 'Why Partner with Jay Agritech?')}</h2>
                <div className="grid-2" style={{ gap: 'var(--sp-8)' }}>
                  {[
                    { key: 'market', icon: <TrendingUp size={24} /> },
                    { key: 'quality', icon: <Award size={24} /> },
                    { key: 'support', icon: <Headphones size={24} /> },
                    { key: 'brand', icon: <Users size={24} /> },
                  ].map((item, i) => (
                    <div key={i} style={{ textAlign: 'left' }}>
                      <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--sp-3)' }}>{item.icon}</div>
                      <h4 style={{ color: 'white', fontSize: 'var(--fs-body)', marginBottom: 'var(--sp-1)' }}>{t(`pages_details.partners.reasons.${item.key}.title`)}</h4>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'var(--fs-body-sm)', lineHeight: 1.5 }}>{t(`pages_details.partners.reasons.${item.key}.desc`)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ position: 'relative', height: '100%', minHeight: 400 }}>
                <img src={imgHero} alt="Partnership" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--clr-primary), transparent)' }}></div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </GenericPage>
  );
}

