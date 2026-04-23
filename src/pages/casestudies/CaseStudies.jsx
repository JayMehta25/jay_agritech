import { Link } from 'react-router-dom';
import { Check, MapPin, ArrowRight, Quote } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { caseStudies } from '../../data/siteData';
import GenericPage from '../../components/ui/GenericPage';

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

export default function CaseStudies() {
  return (
    <GenericPage title="Case Studies" subtitle="Real results from real farmers — see how Jay Agritech products deliver measurable improvements." breadcrumbs={[{ label: 'Case Studies' }]}>
      <div className="container">
        {caseStudies.map((study, i) => (
          <AnimatedSection key={study.id}>
            <div className="card" style={{ marginBottom: 'var(--sp-8)', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                <div style={{ padding: 'var(--sp-8)' }}>
                  <div style={{ display: 'flex', gap: 'var(--sp-3)', marginBottom: 'var(--sp-4)' }}>
                    <span className="badge badge-green">{study.crop}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--fs-caption)', color: 'var(--clr-text-muted)' }}><MapPin size={12} /> {study.location}</span>
                  </div>
                  <h2 style={{ fontSize: 'var(--fs-h3)', marginBottom: 'var(--sp-4)' }}>{study.title}</h2>
                  <div style={{ marginBottom: 'var(--sp-4)' }}>
                    <h4 style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)', marginBottom: 'var(--sp-2)' }}>Challenge</h4>
                    <p>{study.challenge}</p>
                  </div>
                  <div style={{ marginBottom: 'var(--sp-4)' }}>
                    <h4 style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)', marginBottom: 'var(--sp-2)' }}>Solution</h4>
                    <p>{study.solution}</p>
                  </div>
                </div>
                <div style={{ background: 'var(--clr-off-white)', padding: 'var(--sp-8)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{ marginBottom: 'var(--sp-4)' }}>Results</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)', marginBottom: 'var(--sp-6)' }}>
                    {study.results.map((r, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', padding: 'var(--sp-3)', background: 'white', borderRadius: 'var(--radius-md)' }}>
                        <Check size={16} style={{ color: 'var(--clr-primary)', flexShrink: 0 }} />
                        <span style={{ fontWeight: 'var(--fw-medium)' }}>{r}</span>
                      </div>
                    ))}
                  </div>
                  <blockquote style={{ padding: 'var(--sp-4)', background: 'white', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--clr-accent-gold)', fontStyle: 'italic', color: 'var(--clr-text-muted)' }}>
                    "{study.testimonial}"
                    <cite style={{ display: 'block', fontStyle: 'normal', fontWeight: 'var(--fw-semibold)', color: 'var(--clr-text-primary)', marginTop: 'var(--sp-2)' }}>— {study.farmer}</cite>
                  </blockquote>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </GenericPage>
  );
}
