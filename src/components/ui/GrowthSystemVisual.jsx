import { Sprout, Leaf, TrendingUp, Shield, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './GrowthSystemVisual.css';

export default function GrowthSystemVisual() {
  const { t } = useTranslation();
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.3 });

  return (
    <div ref={ref} className={`gsv-container ${isVisible ? 'gsv-active' : ''}`}>
      {/* Concentric Rings — expand outward on scroll */}
      <div className="gsv-ring gsv-ring-1"></div>
      <div className="gsv-ring gsv-ring-2"></div>
      <div className="gsv-ring gsv-ring-3"></div>

      {/* Central Core */}
      <div className="gsv-core">
        <Sprout size={56} />
        <span>{t('home.growth_visual.core', '4-Step')}<br/>{t('home.growth_visual.system', 'System')}</span>
      </div>

      {/* Step Nodes — appear sequentially */}
      <div className="gsv-step gsv-step-1">
        <div className="gsv-step-icon"><Leaf size={32} /></div>
        <div className="gsv-step-info">
          <strong>{t('home.growth_visual.step1.title', 'Soil Foundation')}</strong>
          <small>{t('home.growth_visual.step1.desc', 'Rebuild biology')}</small>
        </div>
      </div>

      <div className="gsv-step gsv-step-2">
        <div className="gsv-step-icon"><TrendingUp size={32} /></div>
        <div className="gsv-step-info">
          <strong>{t('home.growth_visual.step2.title', 'Bio Nutrition')}</strong>
          <small>{t('home.growth_visual.step2.desc', 'Natural delivery')}</small>
        </div>
      </div>

      <div className="gsv-step gsv-step-3">
        <div className="gsv-step-icon"><Shield size={32} /></div>
        <div className="gsv-step-info">
          <strong>{t('home.growth_visual.step3.title', 'Eco Protection')}</strong>
          <small>{t('home.growth_visual.step3.desc', 'Safe pest control')}</small>
        </div>
      </div>

      <div className="gsv-step gsv-step-4">
        <div className="gsv-step-icon"><Zap size={32} /></div>
        <div className="gsv-step-info">
          <strong>{t('home.growth_visual.step4.title', 'Growth Boost')}</strong>
          <small>{t('home.growth_visual.step4.desc', 'Maximize yield')}</small>
        </div>
      </div>
    </div>
  );
}
