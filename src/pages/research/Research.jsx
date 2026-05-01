import { Link } from 'react-router-dom';
import { Microscope, FlaskConical, Users, Lightbulb, Beaker, ArrowRight, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import GenericPage from '../../components/ui/GenericPage';

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

export default function Research() {
  const { t } = useTranslation();
  const areas = ['microbial', 'formulation', 'field_trials', 'innovation'];
  return (
    <GenericPage title={t('pages.research.title')} overline={t('pages.research.overline')} subtitle={t('pages.research.subtitle')} breadcrumbs={[{ label: t('pages.research.title') }]}>
      <div className="container">
        <AnimatedSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-12)', alignItems: 'center', marginBottom: 'var(--sp-16)' }}>
            <div>
              <h2 style={{ marginBottom: 'var(--sp-4)' }}>{t('pages.research.science_meets_agriculture')}</h2>
              <p style={{ color: 'var(--clr-text-muted)', lineHeight: 'var(--lh-loose)', marginBottom: 'var(--sp-6)' }}>{t('pages_details.research.subtitle')}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
                {t('pages_details.research.capabilities', { returnObjects: true }).map((item, i) => (
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
          <div className="section-header"><span className="section-overline">{t('pages.research.research_areas')}</span><h2 className="section-title">{t('pages.research.our_focus_areas')}</h2></div>
          <div className="grid-4">
            {areas.map((key, i) => (
              <div key={i} className="card hover-lift" style={{ padding: 'var(--sp-6)', textAlign: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-lg)', background: 'var(--clr-primary-surface)', color: 'var(--clr-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--sp-4)' }}>
                  {key === 'microbial' ? <Beaker size={24} /> : key === 'formulation' ? <FlaskConical size={24} /> : key === 'field_trials' ? <Users size={24} /> : <Lightbulb size={24} />}
                </div>
                <h4 style={{ marginBottom: 'var(--sp-2)' }}>{t(`pages_details.research.areas.${key}.title`)}</h4>
                <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)' }}>{t(`pages_details.research.areas.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div style={{ textAlign: 'center', padding: 'var(--sp-12)', background: 'var(--clr-off-white)', borderRadius: 'var(--radius-xl)', marginTop: 'var(--sp-12)' }}>
            <h2 style={{ marginBottom: 'var(--sp-4)' }}>{t('pages_details.research.cta_title')}</h2>
            <p style={{ color: 'var(--clr-text-muted)', marginBottom: 'var(--sp-6)', maxWidth: 500, margin: '0 auto var(--sp-6)' }}>{t('pages_details.research.cta_desc')}</p>
            <Link to="/contact" className="btn btn-primary btn-lg">{t('pages_details.research.cta_button')} <ArrowRight size={16} /></Link>
          </div>
        </AnimatedSection>
      </div>
    </GenericPage>
  );
}
