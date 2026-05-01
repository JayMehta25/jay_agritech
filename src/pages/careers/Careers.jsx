import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock, ArrowRight, Heart, Sprout, Users, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import GenericPage from '../../components/ui/GenericPage';

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

export default function Careers() {
  const { t } = useTranslation();
  const openings = [
    { key: 'field_sales', department: t('pages_details.careers.jobs.field_sales.department'), location: t('pages_details.careers.jobs.field_sales.location'), type: t('pages_details.careers.jobs.field_sales.type'), desc: t('pages_details.careers.jobs.field_sales.description') },
    { key: 'research_microbiologist', department: t('pages_details.careers.jobs.research_microbiologist.department'), location: t('pages_details.careers.jobs.research_microbiologist.location'), type: t('pages_details.careers.jobs.research_microbiologist.type'), desc: t('pages_details.careers.jobs.research_microbiologist.description') },
    { key: 'digital_marketing', department: t('pages_details.careers.jobs.digital_marketing.department'), location: t('pages_details.careers.jobs.digital_marketing.location'), type: t('pages_details.careers.jobs.digital_marketing.type'), desc: t('pages_details.careers.jobs.digital_marketing.description') },
    { key: 'qa_analyst', department: t('pages_details.careers.jobs.qa_analyst.department'), location: t('pages_details.careers.jobs.qa_analyst.location'), type: t('pages_details.careers.jobs.qa_analyst.type'), desc: t('pages_details.careers.jobs.qa_analyst.description') },
  ];

  return (
    <GenericPage title={t('pages.careers.title')} subtitle={t('pages.careers.subtitle')} breadcrumbs={[{ label: t('pages.careers.title') }]}>
      <div className="container">
        {/* Why Join */}
        <AnimatedSection>
          <div className="grid-4" style={{ marginBottom: 'var(--sp-16)' }}>
            {[
              { icon: <Heart size={24} />, key: 'mission_driven' },
              { icon: <Sprout size={24} />, key: 'growth' },
              { icon: <Users size={24} />, key: 'culture' },
              { icon: <Zap size={24} />, key: 'impact' },
            ].map((item, i) => (
              <div key={i} className="card hover-lift" style={{ padding: 'var(--sp-6)', textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-lg)', background: 'var(--clr-primary-surface)', color: 'var(--clr-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--sp-3)' }}>{item.icon}</div>
                <h4 style={{ marginBottom: 'var(--sp-1)', fontSize: 'var(--fs-body)' }}>{t(`pages_details.careers.why_join.${item.key}.title`)}</h4>
                <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)' }}>{t(`pages_details.careers.why_join.${item.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Openings */}
        <AnimatedSection>
          <div className="section-header"><span className="section-overline">{t('pages.careers.overline')}</span><h2 className="section-title">{t('pages.careers.current_openings')}</h2></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
            {openings.map((job, i) => (
              <div key={i} className="card hover-lift" style={{ padding: 'var(--sp-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--sp-4)' }}>
                <div>
                  <div style={{ display: 'flex', gap: 'var(--sp-3)', marginBottom: 'var(--sp-2)' }}>
                    <span className="badge badge-green">{job.department}</span>
                    <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--clr-text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {job.type}</span>
                  </div>
                  <h3 style={{ fontSize: 'var(--fs-body-lg)', marginBottom: 'var(--sp-1)' }}>{t(`pages_details.careers.jobs.${job.key}.title`)}</h3>
                  <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={12} /> {job.location}</p>
                  <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)', marginTop: 'var(--sp-2)' }}>{job.desc}</p>
                </div>
                <Link to="/contact" className="btn btn-primary">{t('pages.careers.apply')} <ArrowRight size={14} /></Link>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div style={{ textAlign: 'center', padding: 'var(--sp-10)', marginTop: 'var(--sp-10)' }}>
            <p style={{ color: 'var(--clr-text-muted)', marginBottom: 'var(--sp-4)' }}>{t('pages_details.careers.no_role_text')}</p>
            <a href="mailto:careers@jayagritech.com" className="btn btn-secondary">{t('pages.careers.email_resume')} <ArrowRight size={14} /></a>
          </div>
        </AnimatedSection>
      </div>
    </GenericPage>
  );
}
