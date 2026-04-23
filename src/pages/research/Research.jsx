import { Link } from 'react-router-dom';
import { Microscope, FlaskConical, Users, Lightbulb, Beaker, ArrowRight, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import GenericPage from '../../components/ui/GenericPage';

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

export default function Research() {
  return (
    <GenericPage title="Research & Innovation" overline="R&D Center" subtitle="Our state-of-the-art research facility drives innovation in agricultural biotechnology." breadcrumbs={[{ label: 'Research' }]}>
      <div className="container">
        <AnimatedSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-12)', alignItems: 'center', marginBottom: 'var(--sp-16)' }}>
            <div>
              <h2 style={{ marginBottom: 'var(--sp-4)' }}>Where Science Meets Agriculture</h2>
              <p style={{ color: 'var(--clr-text-muted)', lineHeight: 'var(--lh-loose)', marginBottom: 'var(--sp-6)' }}>
                Our R&D laboratory in Valsad is equipped with advanced microbiology, biochemistry, and formulation 
                development capabilities. We invest in understanding soil ecosystems and developing products that work 
                in real-world Indian farming conditions.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
                {['Microbial strain isolation & characterization', 'Advanced formulation development', 'Quality control & potency testing', 'Field trial design & analysis', 'Stability & shelf-life studies'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
                    <CheckCircle size={16} style={{ color: 'var(--clr-primary)', flexShrink: 0 }} />
                    <span style={{ fontWeight: 'var(--fw-medium)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ aspectRatio: '4/3', background: 'var(--gradient-warm)', borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Microscope size={64} style={{ color: 'var(--clr-primary)', opacity: 0.3 }} />
            </div>
          </div>
        </AnimatedSection>

        {/* Research Areas */}
        <AnimatedSection>
          <div className="section-header"><span className="section-overline">Research Areas</span><h2 className="section-title">Our Focus Areas</h2></div>
          <div className="grid-4">
            {[
              { icon: <Beaker size={24} />, title: 'Microbial Technology', desc: 'Novel microbial strains for soil health, nutrition, and crop protection.' },
              { icon: <FlaskConical size={24} />, title: 'Formulation Science', desc: 'Advanced delivery systems for enhanced product stability and efficacy.' },
              { icon: <Users size={24} />, title: 'Field Trials', desc: 'Multi-location, multi-season trials to validate product performance.' },
              { icon: <Lightbulb size={24} />, title: 'Innovation Pipeline', desc: 'Next-gen products in development — nano-fertilizers, bio-stimulants, and more.' },
            ].map((area, i) => (
              <div key={i} className="card hover-lift" style={{ padding: 'var(--sp-6)', textAlign: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-lg)', background: 'var(--clr-primary-surface)', color: 'var(--clr-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--sp-4)' }}>{area.icon}</div>
                <h4 style={{ marginBottom: 'var(--sp-2)' }}>{area.title}</h4>
                <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)' }}>{area.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div style={{ textAlign: 'center', padding: 'var(--sp-12)', background: 'var(--clr-off-white)', borderRadius: 'var(--radius-xl)', marginTop: 'var(--sp-12)' }}>
            <h2 style={{ marginBottom: 'var(--sp-4)' }}>Interested in Research Collaboration?</h2>
            <p style={{ color: 'var(--clr-text-muted)', marginBottom: 'var(--sp-6)', maxWidth: 500, margin: '0 auto var(--sp-6)' }}>
              We partner with universities, research institutes, and agri-tech companies for collaborative R&D projects.
            </p>
            <Link to="/contact" className="btn btn-primary btn-lg">Contact Our R&D Team <ArrowRight size={16} /></Link>
          </div>
        </AnimatedSection>
      </div>
    </GenericPage>
  );
}
