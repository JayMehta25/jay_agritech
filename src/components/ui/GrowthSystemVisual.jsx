import { Sprout, Leaf, TrendingUp, Shield, Zap } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './GrowthSystemVisual.css';

export default function GrowthSystemVisual() {
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
        <span>4-Step<br/>System</span>
      </div>

      {/* Step Nodes — appear sequentially */}
      <div className="gsv-step gsv-step-1">
        <div className="gsv-step-icon"><Leaf size={32} /></div>
        <div className="gsv-step-info">
          <strong>Soil Foundation</strong>
          <small>Rebuild biology</small>
        </div>
      </div>

      <div className="gsv-step gsv-step-2">
        <div className="gsv-step-icon"><TrendingUp size={32} /></div>
        <div className="gsv-step-info">
          <strong>Bio Nutrition</strong>
          <small>Natural delivery</small>
        </div>
      </div>

      <div className="gsv-step gsv-step-3">
        <div className="gsv-step-icon"><Shield size={32} /></div>
        <div className="gsv-step-info">
          <strong>Eco Protection</strong>
          <small>Safe pest control</small>
        </div>
      </div>

      <div className="gsv-step gsv-step-4">
        <div className="gsv-step-icon"><Zap size={32} /></div>
        <div className="gsv-step-info">
          <strong>Growth Boost</strong>
          <small>Maximize yield</small>
        </div>
      </div>
    </div>
  );
}
