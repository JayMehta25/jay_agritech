import React from 'react';
import { Sprout, Leaf, Shield, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import GenericPage from '../../components/ui/GenericPage';

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

import imgSoil from '../../assets/usp/soil.png';
import imgNutrition from '../../assets/usp/nutrition.png';
import imgProtection from '../../assets/usp/protection.png';
import imgGrowth from '../../assets/usp/growth.png';

export default function GrowthSystem() {
  const { t } = useTranslation();
  const steps = [
    { key: 'soil', num: '01', icon: <Leaf size={32} />, color: '#5D4037', products: ['JaySoil Revive', 'JayHumic Pro'], image: imgSoil },
    { key: 'nutrition', num: '02', icon: <Sprout size={32} />, color: '#2E7D32', products: ['JayRhizo Plus', 'JayPhos Gold', 'JayAzoto Max'], image: imgNutrition },
    { key: 'protection', num: '03', icon: <Shield size={32} />, color: '#C62828', products: ['JayNeem Shield', 'JayTricho Guard', 'JayBt Power'], image: imgProtection },
    { key: 'growth', num: '04', icon: <TrendingUp size={32} />, color: '#E65100', products: ['JayGrow Supreme', 'JayFlora Boost', 'JaySeaweed Extract'], image: imgGrowth },
  ];
  return (
    <GenericPage title={t('pages_details.growth_system.title')} overline={t('pages_details.growth_system.overline')} subtitle={t('pages_details.growth_system.subtitle')} breadcrumbs={[{ label: t('pages.growth_system', 'Growth System') }]}>
      <div className="container">
        {steps.map((step, i) => (
          <AnimatedSection key={i}>
            <div style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr', gap: 'var(--sp-12)', alignItems: 'center', padding: 'var(--sp-12) 0', borderBottom: i < steps.length - 1 ? '1px solid var(--clr-border-light)' : 'none' }}>
              <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', marginBottom: 'var(--sp-5)' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-display)', fontWeight: 'var(--fw-bold)', color: `${step.color}20` }}>{step.num}</span>
                  <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-lg)', background: `${step.color}15`, color: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{step.icon}</div>
                </div>
                <h2 style={{ marginBottom: 'var(--sp-1)' }}>{t(`pages_details.growth_system.steps.${step.key}.title`)}</h2>
                <p style={{ color: step.color, fontWeight: 'var(--fw-semibold)', marginBottom: 'var(--sp-4)' }}>{t(`pages_details.growth_system.steps.${step.key}.subtitle`)}</p>
                <p style={{ color: 'var(--clr-text-muted)', lineHeight: 'var(--lh-loose)', marginBottom: 'var(--sp-6)' }}>{t(`pages_details.growth_system.steps.${step.key}.desc`)}</p>
                <div>
                  <h4 style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)', marginBottom: 'var(--sp-3)' }}>{t('pages_details.growth_system.recommended_products')}</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
                    {step.products.map((p, j) => <span key={j} className="chip">{p}</span>)}
                  </div>
                </div>
              </div>
              <div style={{ order: i % 2 === 0 ? 1 : 0, aspectRatio: '4/3', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                <img src={step.image} alt={t(`pages_details.growth_system.steps.${step.key}.title`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </AnimatedSection>
        ))}

        <AnimatedSection>
          <div style={{ textAlign: 'center', padding: 'var(--sp-12)', background: 'var(--gradient-hero)', borderRadius: 'var(--radius-xl)', color: 'white', marginTop: 'var(--sp-8)' }}>
            <h2 style={{ color: 'white', marginBottom: 'var(--sp-4)' }}>{t('pages_details.growth_system.cta_title')}</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 500, margin: '0 auto var(--sp-6)' }}>{t('pages_details.growth_system.cta_desc')}</p>
            <div style={{ display: 'flex', gap: 'var(--sp-4)', justifyContent: 'center' }}>
              <Link to="/contact" className="btn btn-gold btn-lg">{t('pages_details.growth_system.cta_custom_plan')} <ArrowRight size={16} /></Link>
              <Link to="/products" className="btn btn-hero-outline btn-lg" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>{t('pages_details.growth_system.cta_browse_products')}</Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </GenericPage>
  );
}

