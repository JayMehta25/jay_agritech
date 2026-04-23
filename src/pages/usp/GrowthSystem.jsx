import React from 'react';
import { Sprout, Leaf, Shield, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import GenericPage from '../../components/ui/GenericPage';

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

const steps = [
  { num: '01', icon: <Leaf size={32} />, title: 'Soil Foundation', subtitle: 'Rebuild Your Soil', desc: 'Start with soil health. Our microbial soil conditioners restore biological activity, improve structure, and create the foundation for healthy crops.', products: ['JaySoil Revive', 'JayHumic Pro'], color: '#5D4037' },
  { num: '02', icon: <Sprout size={32} />, title: 'Bio Nutrition', subtitle: 'Natural Nutrient Delivery', desc: 'Feed your crops naturally. Bio-fertilizers and organic nutrients deliver balanced nutrition through biological pathways for efficient uptake.', products: ['JayRhizo Plus', 'JayPhos Gold', 'JayAzoto Max'], color: '#2E7D32' },
  { num: '03', icon: <Shield size={32} />, title: 'Eco Protection', subtitle: 'Biological Crop Defense', desc: 'Protect without poison. Bio-pesticides and bio-fungicides provide effective pest and disease control while preserving the ecosystem.', products: ['JayNeem Shield', 'JayTricho Guard', 'JayBt Power'], color: '#C62828' },
  { num: '04', icon: <TrendingUp size={32} />, title: 'Growth Boost', subtitle: 'Maximize Potential', desc: 'Unlock peak performance. Growth regulators and bio-stimulants optimize flowering, fruiting, and overall crop quality.', products: ['JayGrow Supreme', 'JayFlora Boost', 'JaySeaweed Extract'], color: '#E65100' },
];

export default function GrowthSystem() {
  return (
    <GenericPage title="The Jay Agritech Growth System™" overline="Proprietary Methodology" subtitle="Our integrated 4-step approach to transforming agriculture — from soil to harvest." breadcrumbs={[{ label: 'Growth System' }]}>
      <div className="container">
        {steps.map((step, i) => (
          <AnimatedSection key={i}>
            <div style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr', gap: 'var(--sp-12)', alignItems: 'center', padding: 'var(--sp-12) 0', borderBottom: i < steps.length - 1 ? '1px solid var(--clr-border-light)' : 'none' }}>
              <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', marginBottom: 'var(--sp-5)' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--fs-display)', fontWeight: 'var(--fw-bold)', color: `${step.color}20` }}>{step.num}</span>
                  <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-lg)', background: `${step.color}15`, color: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{step.icon}</div>
                </div>
                <h2 style={{ marginBottom: 'var(--sp-1)' }}>{step.title}</h2>
                <p style={{ color: step.color, fontWeight: 'var(--fw-semibold)', marginBottom: 'var(--sp-4)' }}>{step.subtitle}</p>
                <p style={{ color: 'var(--clr-text-muted)', lineHeight: 'var(--lh-loose)', marginBottom: 'var(--sp-6)' }}>{step.desc}</p>
                <div>
                  <h4 style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)', marginBottom: 'var(--sp-3)' }}>Recommended Products</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
                    {step.products.map((p, j) => <span key={j} className="chip">{p}</span>)}
                  </div>
                </div>
              </div>
              <div style={{ order: i % 2 === 0 ? 1 : 0, aspectRatio: '4/3', background: `linear-gradient(135deg, ${step.color}08, ${step.color}03)`, borderRadius: 'var(--radius-xl)', border: `2px dashed ${step.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ color: step.color, opacity: 0.2 }}>{React.cloneElement(step.icon, { size: 80 })}</div>
              </div>
            </div>
          </AnimatedSection>
        ))}

        <AnimatedSection>
          <div style={{ textAlign: 'center', padding: 'var(--sp-12)', background: 'var(--gradient-hero)', borderRadius: 'var(--radius-xl)', color: 'white', marginTop: 'var(--sp-8)' }}>
            <h2 style={{ color: 'white', marginBottom: 'var(--sp-4)' }}>Ready to Implement the Growth System?</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 500, margin: '0 auto var(--sp-6)' }}>
              Contact our agronomists for a customized Growth System plan for your specific crops and conditions.
            </p>
            <div style={{ display: 'flex', gap: 'var(--sp-4)', justifyContent: 'center' }}>
              <Link to="/contact" className="btn btn-gold btn-lg">Get a Custom Plan <ArrowRight size={16} /></Link>
              <Link to="/products" className="btn btn-hero-outline btn-lg" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>Browse Products</Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </GenericPage>
  );
}

