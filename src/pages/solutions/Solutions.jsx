import React from 'react';
import { Link } from '../../components/RouterBridge';
import { Leaf, Sprout, Shield, TrendingUp, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import GenericPage from '../../components/ui/GenericPage';
import { assetSrc } from '../../utils/assetSrc';

function AnimatedSection({ children, className = '', id = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} id={id} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

const solSoilImg = '/soil health.jpg';
const solNutrientImg = '/nutrientMgm.jpg';
const solPestImg = '/pnd.jpg';
const solGrowthImg = '/growth.jpg';

export default function Solutions() {
  const { t } = useTranslation();
  const solutions = [
    { key: 'soil_health', id: 'soil-health', icon: <Leaf size={32} />, color: '#2E7D32', image: solSoilImg },
    { key: 'nutrient_management', id: 'nutrient-mgmt', icon: <Sprout size={32} />, color: '#1565C0', image: solNutrientImg },
    { key: 'pest_disease', id: 'pest-disease', icon: <Shield size={32} />, color: '#C62828', image: solPestImg },
    { key: 'growth_enhancement', id: 'growth', icon: <TrendingUp size={32} />, color: '#E65100', image: solGrowthImg },
  ];
  return (
    <GenericPage title={t('pages.solutions.title')} subtitle={t('pages.solutions.subtitle')} breadcrumbs={[{ label: t('nav.solutions') }]}>
      <div className="container" id="overview">
        {solutions.map((sol, i) => (
          <AnimatedSection key={sol.key} id={sol.id}>
            <section className="solutions-item-section">
              <div className="solutions-content-col" style={{ order: i % 2 === 0 ? 0 : 1 }}>
                <div className="solutions-icon-wrapper" style={{ background: `${sol.color}15`, color: sol.color }}>
                  {sol.icon}
                </div>
                <h2>{t(`pages_details.solutions.items.${sol.key}.title`)}</h2>
                <p className="solutions-desc">{t(`pages_details.solutions.items.${sol.key}.desc`)}</p>
                <div className="solutions-features-list">
                  {(Array.isArray(t(`pages_details.solutions.items.${sol.key}.features`, { returnObjects: true })) ? t(`pages_details.solutions.items.${sol.key}.features`, { returnObjects: true }) : []).map((f, j) => (
                    <div 
                      key={j} 
                      className="solutions-feature-item"
                      style={{ 
                        background: `${sol.color}0a`, 
                        borderColor: `${sol.color}25` 
                      }}
                    >
                      <div className="solutions-feature-bullet" style={{ background: sol.color }}></div>
                      <span className="solutions-feature-text">{f}</span>
                    </div>
                  ))}
                </div>
                <Link to="/products" className="btn btn-primary">{t('pages.solutions.view_related_products')} <ArrowRight size={16} /></Link>
              </div>
              <div className="solutions-image-col" style={{ order: i % 2 === 0 ? 1 : 0 }}>
                <div className="solutions-image-wrapper">
                  <img src={sol.image} alt={t(`pages_details.solutions.items.${sol.key}.title`)} />
                </div>
              </div>
            </section>
          </AnimatedSection>
        ))}
      </div>
    </GenericPage>
  );
}

