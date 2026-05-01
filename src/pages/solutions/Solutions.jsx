import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Sprout, Shield, TrendingUp, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import GenericPage from '../../components/ui/GenericPage';

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

import solSoilImg from '../../assets/solutions/soil-health.png';
import solNutrientImg from '../../assets/solutions/nutrient-mgmt.png';
import solPestImg from '../../assets/solutions/pest-control.png';
import solGrowthImg from '../../assets/solutions/growth-enhancement.png';

export default function Solutions() {
  const { t } = useTranslation();
  const solutions = [
    { key: 'soil_health', icon: <Leaf size={32} />, color: '#2E7D32', image: solSoilImg },
    { key: 'nutrient_management', icon: <Sprout size={32} />, color: '#1565C0', image: solNutrientImg },
    { key: 'pest_disease', icon: <Shield size={32} />, color: '#C62828', image: solPestImg },
    { key: 'growth_enhancement', icon: <TrendingUp size={32} />, color: '#E65100', image: solGrowthImg },
  ];
  return (
    <GenericPage title={t('pages.solutions.title')} subtitle={t('pages.solutions.subtitle')} breadcrumbs={[{ label: t('nav.solutions') }]}>
      <div className="container">
        {solutions.map((sol, i) => (
          <AnimatedSection key={sol.key}>
            <section style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr', gap: 'var(--sp-12)', alignItems: 'center', padding: 'var(--sp-12) 0', borderBottom: i < solutions.length - 1 ? '1px solid var(--clr-border-light)' : 'none' }}>
              <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-lg)', background: `${sol.color}15`, color: sol.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--sp-5)' }}>{sol.icon}</div>
                <h2 style={{ marginBottom: 'var(--sp-4)' }}>{t(`pages_details.solutions.items.${sol.key}.title`)}</h2>
                <p style={{ color: 'var(--clr-text-muted)', fontSize: 'var(--fs-body-lg)', lineHeight: 'var(--lh-loose)', marginBottom: 'var(--sp-6)' }}>{t(`pages_details.solutions.items.${sol.key}.desc`)}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)', marginBottom: 'var(--sp-6)' }}>
                  {t(`pages_details.solutions.items.${sol.key}.features`, { returnObjects: true }).map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: sol.color, flexShrink: 0 }}></div>
                      <span style={{ fontWeight: 'var(--fw-medium)' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link to="/products" className="btn btn-primary">{t('pages.solutions.view_related_products')} <ArrowRight size={16} /></Link>
              </div>
              <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                <div style={{ aspectRatio: '4/3', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', border: `1px solid var(--clr-border-light)` }}>
                  <img src={sol.image} alt={t(`pages_details.solutions.items.${sol.key}.title`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </section>
          </AnimatedSection>
        ))}
      </div>
    </GenericPage>
  );
}

