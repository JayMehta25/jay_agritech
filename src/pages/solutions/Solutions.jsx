import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Sprout, Shield, TrendingUp, ArrowRight } from 'lucide-react';
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

const solutions = [
  { icon: <Leaf size={32} />, title: 'Soil Health', slug: 'soil-health', color: '#2E7D32', image: solSoilImg, desc: 'Restore and maintain soil vitality with our microbial solutions that rebuild your soil\'s natural fertility and biological activity.', features: ['Soil microbiome restoration', 'Organic matter enhancement', 'pH balancing solutions', 'Soil carbon sequestration'] },
  { icon: <Sprout size={32} />, title: 'Nutrient Management', slug: 'nutrient-mgmt', color: '#1565C0', image: solNutrientImg, desc: 'Balanced, bio-available nutrition through organic and microbial nutrient delivery systems that optimize crop intake.', features: ['Bio-available NPK delivery', 'Micronutrient chelation', 'Slow-release organic nutrition', 'Foliar nutrition programs'] },
  { icon: <Shield size={32} />, title: 'Pest & Disease Control', slug: 'pest-disease', color: '#C62828', image: solPestImg, desc: 'Eco-friendly biological pest management — effective protection without harmful residues on your produce.', features: ['Bio-insecticides', 'Bio-fungicides', 'Neem-based solutions', 'Integrated pest management'] },
  { icon: <TrendingUp size={32} />, title: 'Growth Enhancement', slug: 'growth', color: '#E65100', image: solGrowthImg, desc: 'Maximize crop potential with science-backed growth regulators and bio-stimulants for every growth stage.', features: ['Seaweed extracts', 'Amino acid complexes', 'Flowering & fruiting aids', 'Stress tolerance boosters'] },
];

export default function Solutions() {
  return (
    <GenericPage title="Crop Solutions" subtitle="Comprehensive biological solutions for every stage of crop growth — from soil preparation to harvest." breadcrumbs={[{ label: 'Solutions' }]}>
      <div className="container">
        {solutions.map((sol, i) => (
          <AnimatedSection key={sol.slug}>
            <section style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr', gap: 'var(--sp-12)', alignItems: 'center', padding: 'var(--sp-12) 0', borderBottom: i < solutions.length - 1 ? '1px solid var(--clr-border-light)' : 'none' }}>
              <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-lg)', background: `${sol.color}15`, color: sol.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--sp-5)' }}>{sol.icon}</div>
                <h2 style={{ marginBottom: 'var(--sp-4)' }}>{sol.title}</h2>
                <p style={{ color: 'var(--clr-text-muted)', fontSize: 'var(--fs-body-lg)', lineHeight: 'var(--lh-loose)', marginBottom: 'var(--sp-6)' }}>{sol.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)', marginBottom: 'var(--sp-6)' }}>
                  {sol.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: sol.color, flexShrink: 0 }}></div>
                      <span style={{ fontWeight: 'var(--fw-medium)' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link to="/products" className="btn btn-primary">View Related Products <ArrowRight size={16} /></Link>
              </div>
              <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
                <div style={{ aspectRatio: '4/3', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', border: `1px solid var(--clr-border-light)` }}>
                  <img src={sol.image} alt={sol.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </section>
          </AnimatedSection>
        ))}
      </div>
    </GenericPage>
  );
}

