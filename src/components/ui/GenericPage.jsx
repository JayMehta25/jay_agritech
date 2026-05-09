import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './GenericPage.css';

export default function GenericPage({ title, subtitle, overline, breadcrumbs = [], children, bodyClassName = '', heroImage }) {
  const { t } = useTranslation();
  const heroStyle = heroImage ? { 
    backgroundImage: `linear-gradient(rgba(10, 45, 10, 0.7), rgba(10, 45, 10, 0.8)), url(${heroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  return (
    <div className="generic-page">
      <div className="page-hero" style={heroStyle}>
        <div className="container">
          {breadcrumbs.length > 0 && (
            <div className="breadcrumbs">
              <Link to="/">{t('common.home', 'Home')}</Link>
              {breadcrumbs.map((bc, i) => (
                <span key={i}>
                  <ChevronRight size={14} />
                  {bc.path ? <Link to={bc.path}>{bc.label}</Link> : <span className="current">{bc.label}</span>}
                </span>
              ))}
            </div>
          )}
          {overline && <span className="section-overline" style={{ color: 'var(--clr-accent-gold-light)' }}>{overline}</span>}
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
      <div className={`generic-page-body ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
}
