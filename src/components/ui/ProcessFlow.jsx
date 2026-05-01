import { Microscope, Leaf, TrendingUp, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import heroVisualImg from '../../assets/modern_agriculture_innovation.png';
import './ProcessFlow.css';

export default function ProcessFlow() {
  const { t } = useTranslation();
  return (
    <div className="process-flow-container">
      {/* Background Image with Overlay */}
      <div className="hero-visual-img-container">
        <img src={heroVisualImg} alt={t('home.process_flow.image_alt', 'Modern Agriculture')} className="hero-visual-main-img" />
        <div className="hero-visual-overlay"></div>
      </div>

      {/* SVG Connections (Symmetric Loop) */}
      <svg className="flow-connections" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Background paths for static lines */}
        <path d="M 15,20 L 85,20 L 85,80 L 15,80 Z" className="flow-path-bg" />
        
        {/* Unified animated flow path with multiple pulses */}
        <path 
          d="M 15,20 L 85,20 L 85,80 L 15,80 Z" 
          className="flow-path-animated" 
          pathLength="100"
        />
      </svg>

      {/* Symmetric Nodes */}
      <div className="flow-node node-tl node-pulse">
        <div className="node-icon-wrapper"><Microscope size={20} /></div>
        <div className="node-text">
          <span>{t('home.process_flow.node1.title', 'Microbial R&D')}</span>
          <small>{t('home.process_flow.node1.desc', 'Innovation')}</small>
        </div>
      </div>

      <div className="flow-node node-tr node-pulse">
        <div className="node-icon-wrapper"><Leaf size={20} /></div>
        <div className="node-text">
          <span>{t('home.process_flow.node2.title', 'Bio Solutions')}</span>
          <small>{t('home.process_flow.node2.desc', 'Potent Products')}</small>
        </div>
      </div>

      <div className="flow-node node-br node-pulse">
        <div className="node-icon-wrapper"><TrendingUp size={20} /></div>
        <div className="node-text">
          <span>{t('home.process_flow.node3.title', 'Higher Yields')}</span>
          <small>{t('home.process_flow.node3.desc', 'Prosperity')}</small>
        </div>
      </div>

      <div className="flow-node node-bl node-pulse">
        <div className="node-icon-wrapper"><Shield size={20} /></div>
        <div className="node-text">
          <span>{t('home.process_flow.node4.title', 'Eco Legacy')}</span>
          <small>{t('home.process_flow.node4.desc', 'Sustainability')}</small>
        </div>
      </div>
    </div>
  );
}
