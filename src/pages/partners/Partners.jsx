import { Link } from 'react-router-dom';
import { Users, Truck, Globe, ArrowRight, CheckCircle, TrendingUp, Award, Headphones } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import GenericPage from '../../components/ui/GenericPage';

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

export default function Partners() {
  return (
    <GenericPage title="Partner With Us" overline="Growth Partnership" subtitle="Join Jay Agritech's expanding network. Premium products, competitive margins, and complete business support." breadcrumbs={[{ label: 'Partners' }]}>
      <div className="container">
        {/* Partnership Types */}
        <div className="grid-3" style={{ marginBottom: 'var(--sp-16)' }}>
          {[
            { icon: <Users size={32} />, title: 'Become a Dealer', desc: 'Retail-level partnership for agri-input shops and local retailers. Serve farmers directly with Jay Agritech products.', benefits: ['Competitive margins (20-30%)', 'Free product training', 'Marketing material support', 'Priority stock availability'], color: '#2E7D32' },
            { icon: <Truck size={32} />, title: 'Become a Distributor', desc: 'District or region-level distribution partnership. Build your distribution empire with a growing brand.', benefits: ['Higher margins (30-40%)', 'Exclusive territory rights', 'Dedicated relationship manager', 'Annual business planning'], color: '#1565C0' },
            { icon: <Globe size={32} />, title: 'Export Partnership', desc: 'International distribution and import partnerships. Bring Jay Agritech products to global agriculture markets.', benefits: ['Export-ready documentation', 'Customized packaging', 'Regulatory support', 'Competitive FOB pricing'], color: '#E65100' },
          ].map((type, i) => (
            <AnimatedSection key={i}>
              <div className="card hover-lift" style={{ padding: 'var(--sp-8)', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-lg)', background: `${type.color}15`, color: type.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--sp-5)' }}>{type.icon}</div>
                <h3 style={{ marginBottom: 'var(--sp-3)' }}>{type.title}</h3>
                <p style={{ color: 'var(--clr-text-muted)', fontSize: 'var(--fs-body-sm)', marginBottom: 'var(--sp-5)' }}>{type.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)', marginBottom: 'var(--sp-6)', flex: 1 }}>
                  {type.benefits.map((b, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', fontSize: 'var(--fs-body-sm)' }}>
                      <CheckCircle size={14} style={{ color: type.color, flexShrink: 0 }} /> {b}
                    </div>
                  ))}
                </div>
                <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }}>Apply Now <ArrowRight size={16} /></Link>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Why Partner */}
        <AnimatedSection>
          <div style={{ background: 'var(--gradient-hero)', borderRadius: 'var(--radius-xl)', padding: 'var(--sp-12)', color: 'white' }}>
            <h2 style={{ color: 'white', textAlign: 'center', marginBottom: 'var(--sp-8)' }}>Why Partner with Jay Agritech?</h2>
            <div className="grid-4">
              {[
                { icon: <TrendingUp size={24} />, title: 'Growing Market', desc: 'Bio-inputs market growing at 15% CAGR' },
                { icon: <Award size={24} />, title: 'Quality Products', desc: 'ISO certified, lab-tested formulations' },
                { icon: <Headphones size={24} />, title: 'Full Support', desc: 'Training, marketing, and tech support' },
                { icon: <Users size={24} />, title: 'Strong Brand', desc: 'Trusted by 500+ partners across India' },
              ].map((item, i) => (
                <div key={i} style={{ textAlign: 'center', padding: 'var(--sp-4)' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--sp-3)' }}>{item.icon}</div>
                  <h4 style={{ color: 'white', fontSize: 'var(--fs-body)', marginBottom: 'var(--sp-1)' }}>{item.title}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'var(--fs-body-sm)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </GenericPage>
  );
}
