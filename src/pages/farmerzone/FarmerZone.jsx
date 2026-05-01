import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, Shield, Leaf, TrendingUp, Droplets, Bug, BookOpen, Calendar, Download, Video, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import GenericPage from '../../components/ui/GenericPage';

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

export default function FarmerZone() {
  const { t } = useTranslation();
  const resources = [
    { key: 'crop_solutions', icon: <Sprout size={28} />, link: '/farmer-zone/crop-solutions', color: '#2E7D32' },
    { key: 'problem_guide', icon: <HelpCircle size={28} />, link: '/farmer-zone/problem-guide', color: '#C62828' },
    { key: 'seasonal_advisory', icon: <Calendar size={28} />, link: '/farmer-zone/seasonal', color: '#E65100' },
    { key: 'knowledge_hub', icon: <BookOpen size={28} />, link: '/blog', color: '#1565C0' },
  ];
  
  return (
    <GenericPage title={t('pages.farmer_zone.title')} overline={t('pages.farmer_zone.overline')} subtitle={t('pages.farmer_zone.subtitle')} breadcrumbs={[{ label: t('pages.farmer_zone.title') }]}>
      <div className="container">
        {/* Resource Cards */}
        <div className="grid-2" style={{ gap: 'var(--sp-6)', marginBottom: 'var(--sp-16)' }}>
          {resources.map((res, i) => (
            <AnimatedSection key={i}>
              <Link to={res.link} className="card hover-lift" style={{ padding: 'var(--sp-8)', display: 'flex', gap: 'var(--sp-5)' }}>
                <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-lg)', background: `${res.color}15`, color: res.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{res.icon}</div>
                <div>
                  <h3 style={{ marginBottom: 'var(--sp-2)' }}>{t(`pages_details.farmer_zone.resources.${res.key}.title`)}</h3>
                  <p style={{ color: 'var(--clr-text-muted)', fontSize: 'var(--fs-body-sm)', marginBottom: 'var(--sp-3)' }}>{t(`pages_details.farmer_zone.resources.${res.key}.desc`)}</p>
                  <span style={{ color: res.color, fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-body-sm)', display: 'flex', alignItems: 'center', gap: 4 }}>{t('pages.farmer_zone.explore')} <ArrowRight size={14} /></span>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
        
        {/* Quick Tips */}
        <AnimatedSection>
          <section style={{ background: 'var(--clr-off-white)', borderRadius: 'var(--radius-xl)', padding: 'var(--sp-12)', marginBottom: 'var(--sp-12)' }}>
            <div className="section-header"><span className="section-overline">{t('pages.farmer_zone.quick_tips_title')}</span><h2 className="section-title">{t('pages.farmer_zone.best_practices')}</h2></div>
            <div className="grid-3">
              {['soil_testing', 'seed_treatment', 'integrated_approach', 'right_timing', 'storage', 'water_management'].map((key, i) => (
                <div key={i} style={{ padding: 'var(--sp-5)', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--clr-border-light)' }}>
                  <h4 style={{ fontSize: 'var(--fs-body)', marginBottom: 'var(--sp-2)', color: 'var(--clr-primary)' }}>{t(`pages_details.farmer_zone.tips.${key}.title`)}</h4>
                  <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)' }}>{t(`pages_details.farmer_zone.tips.${key}.tip`)}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>
        
        {/* WhatsApp Support */}
        <AnimatedSection>
          <div style={{ textAlign: 'center', padding: 'var(--sp-12)', background: 'var(--gradient-hero)', borderRadius: 'var(--radius-xl)', color: 'white' }}>
            <h2 style={{ color: 'white', marginBottom: 'var(--sp-3)' }}>{t('pages.farmer_zone.need_help')}</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 'var(--sp-6)', maxWidth: 500, margin: '0 auto var(--sp-6)' }}>{t('pages.farmer_zone.need_help_desc')}</p>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-lg">{t('pages.farmer_zone.chat_button')}</a>
          </div>
        </AnimatedSection>
      </div>
    </GenericPage>
  );
}
