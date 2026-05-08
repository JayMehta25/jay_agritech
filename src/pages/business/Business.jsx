import { Link } from 'react-router-dom';
import { ArrowRight, Factory, FlaskConical, Tag, Globe, Handshake, CheckCircle, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import GenericPage from '../../components/ui/GenericPage';

function AnimatedSection({ children, className = '', id = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} id={id} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

export default function Business() {
  const { t } = useTranslation();
  const services = [
    { key: 'contract_manufacturing', icon: <Factory size={28} />, link: '/business/contract-mfg', color: '#2E7D32' },
    { key: 'research_formulations', icon: <FlaskConical size={28} />, link: '/business/research', color: '#1565C0' },
    { key: 'white_label', icon: <Tag size={28} />, link: '/business/white-label', color: '#E65100' },
    { key: 'exports_franchise', icon: <Globe size={28} />, link: '/business/exports', color: '#7B1FA2' },
  ];
  
  return (
    <GenericPage title={t('pages.business.title')} overline={t('pages.business.overline', 'B2B Services')} subtitle={t('pages.business.subtitle')} breadcrumbs={[{ label: t('nav.business') }]}>
      <div className="container" id="overview">
        {services.map((svc, i) => (
          <AnimatedSection key={i} id={svc.link.split('/').pop()}>
            <div className="card" style={{ marginBottom: 'var(--sp-6)', padding: 'var(--sp-8)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-8)', alignItems: 'center' }}>
              <div>
                <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-lg)', background: `${svc.color}15`, color: svc.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--sp-4)' }}>{svc.icon}</div>
                <h2 style={{ fontSize: 'var(--fs-h3)', marginBottom: 'var(--sp-3)' }}>{t(`pages_details.business.services.${svc.key}.title`)}</h2>
                <p style={{ color: 'var(--clr-text-muted)', lineHeight: 'var(--lh-loose)', marginBottom: 'var(--sp-5)' }}>{t(`pages_details.business.services.${svc.key}.description`)}</p>
                <Link to="/contact" className="btn btn-primary">{t('pages.business.inquire_now', 'Inquire Now')} <ArrowRight size={16} /></Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
                {t(`pages_details.business.services.${svc.key}.features`, { returnObjects: true }).map((f, j) => (
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
