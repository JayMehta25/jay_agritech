import React from 'react';
import { Sprout, Leaf, Shield, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from '../../components/RouterBridge';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import GenericPage from '../../components/ui/GenericPage';
import { assetSrc } from '../../utils/assetSrc';

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

import imgSoilAsset from '../../assets/usp/soil.png';
import imgNutritionAsset from '../../assets/usp/nutrition.png';
import imgProtectionAsset from '../../assets/usp/protection.png';
import imgGrowthAsset from '../../assets/usp/growth.png';

const imgSoil = assetSrc(imgSoilAsset);
const imgNutrition = assetSrc(imgNutritionAsset);
const imgProtection = assetSrc(imgProtectionAsset);
const imgGrowth = assetSrc(imgGrowthAsset);

const productLinks = {
  'AT ORGO BHUMIRICH': '/products/organic-nutrients/at-orgo-bhumirich?from=growth-system',
  'AT ORGO HUMIVITA': '/products/biostimulants/at-orgo-humivita?from=growth-system',
  'AT ORGO NB': '/products/bio-fertilizers/at-orgo-nb?from=growth-system',
  'AT ORGO PB': '/products/bio-fertilizers/at-orgo-pb?from=growth-system',
  'AT ORGO PRO MAX': '/products/bio-fertilizers/at-orgo-pro-max?from=growth-system',
  'AT ORGO NEEM': '/products/bio-insecticides/at-orgo-neem?from=growth-system',
  'AT ORGO TRICHO': '/products/bio-insecticides/at-orgo-tricho?from=growth-system',
  'ORGO META': '/products/bio-insecticides/orgo-meta?from=growth-system',
  'AT ORGO DHARA MAXX': '/products/biostimulants/at-orgo-dhara-maxx?from=growth-system',
  'AT ORGO FLORAL': '/products/biostimulants/at-orgo-floral?from=growth-system',
  'AT ORGO SEAVITA': '/products/biostimulants/at-orgo-seavita?from=growth-system',
};

export default function GrowthSystem() {
  const { t } = useTranslation();
  const steps = [
    { key: 'soil', num: '01', icon: <Leaf size={32} />, color: '#5D4037', products: ['AT ORGO BHUMIRICH', 'AT ORGO HUMIVITA'], image: imgSoil },
    { key: 'nutrition', num: '02', icon: <Sprout size={32} />, color: '#2E7D32', products: ['AT ORGO NB', 'AT ORGO PB', 'AT ORGO PRO MAX'], image: imgNutrition },
    { key: 'protection', num: '03', icon: <Shield size={32} />, color: '#C62828', products: ['AT ORGO NEEM', 'AT ORGO TRICHO', 'ORGO META'], image: imgProtection },
    { key: 'growth', num: '04', icon: <TrendingUp size={32} />, color: '#E65100', products: ['AT ORGO DHARA MAXX', 'AT ORGO FLORAL', 'AT ORGO SEAVITA'], image: imgGrowth },
  ];
  return (
    <GenericPage title={t('pages_details.growth_system.title')} overline={t('pages_details.growth_system.overline')} subtitle={t('pages_details.growth_system.subtitle')} breadcrumbs={[{ label: t('pages.growth_system', 'Growth System') }]}>
      <div className="container">
        {steps.map((step, i) => (
          <AnimatedSection key={i}>
            <div className="growth-system-step-row">
              <div className="growth-system-step-text" style={{ order: i % 2 === 0 ? 0 : 1 }}>
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
                    {step.products.map((p, j) => {
                      const linkPath = productLinks[p];
                      if (linkPath) {
                        return (
                          <Link key={j} to={linkPath} className="chip" style={{ textDecoration: 'none' }}>
                            {p}
                          </Link>
                        );
                      }
                      return <span key={j} className="chip">{p}</span>;
                    })}
                  </div>
                </div>
              </div>
              <div className="growth-system-step-image-wrapper" style={{ order: i % 2 === 0 ? 1 : 0 }}>
                <img src={step.image} alt={t(`pages_details.growth_system.steps.${step.key}.title`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </GenericPage>
  );
}

