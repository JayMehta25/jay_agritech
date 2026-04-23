import { Link } from 'react-router-dom';
import { ArrowRight, Factory, FlaskConical, Tag, Globe, Handshake, CheckCircle, FileText } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import GenericPage from '../../components/ui/GenericPage';

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

export default function Business() {
  const services = [
    { icon: <Factory size={28} />, title: 'Contract Manufacturing', desc: 'Custom formulation and manufacturing services for agri-input companies. Our GMP-compliant facility handles liquid, powder, and granular formulations.', features: ['Custom formulation development', 'Scalable production capacity', 'Quality assurance & testing', 'Regulatory compliance support'], link: '/business/contract-mfg', color: '#2E7D32' },
    { icon: <FlaskConical size={28} />, title: 'Research & Formulations', desc: 'Collaborative R&D services for novel agricultural formulations. From concept to commercialization, our scientists partner with your team.', features: ['Strain isolation & screening', 'Formulation optimization', 'Stability studies', 'Field trial management'], link: '/business/research', color: '#1565C0' },
    { icon: <Tag size={28} />, title: 'White / Private Label', desc: 'Launch your own branded agri-input line with our proven formulations. We handle manufacturing — you build your brand.', features: ['Ready-to-market formulations', 'Custom packaging design', 'Minimum order flexibility', 'Marketing material support'], link: '/business/white-label', color: '#E65100' },
    { icon: <Globe size={28} />, title: 'Exports & Franchise', desc: 'International partnerships and franchise opportunities for expanding Jay Agritech\'s reach beyond India.', features: ['Export-ready formulations', 'International regulatory support', 'Franchise model available', 'Market-specific adaptation'], link: '/business/exports', color: '#7B1FA2' },
  ];
  
  return (
    <GenericPage title="Business Solutions" overline="B2B Services" subtitle="Partner with Jay Agritech for contract manufacturing, white-label solutions, research collaborations, and global expansion." breadcrumbs={[{ label: 'Business' }]}>
      <div className="container">
        {services.map((svc, i) => (
          <AnimatedSection key={i}>
            <div className="card" style={{ marginBottom: 'var(--sp-6)', padding: 'var(--sp-8)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-8)', alignItems: 'center' }}>
              <div>
                <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-lg)', background: `${svc.color}15`, color: svc.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--sp-4)' }}>{svc.icon}</div>
                <h2 style={{ fontSize: 'var(--fs-h3)', marginBottom: 'var(--sp-3)' }}>{svc.title}</h2>
                <p style={{ color: 'var(--clr-text-muted)', lineHeight: 'var(--lh-loose)', marginBottom: 'var(--sp-5)' }}>{svc.desc}</p>
                <Link to="/contact" className="btn btn-primary">Inquire Now <ArrowRight size={16} /></Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
                {svc.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', padding: 'var(--sp-3)', background: 'var(--clr-off-white)', borderRadius: 'var(--radius-md)' }}>
                    <CheckCircle size={16} style={{ color: svc.color, flexShrink: 0 }} /> <span style={{ fontWeight: 'var(--fw-medium)' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </GenericPage>
  );
}
