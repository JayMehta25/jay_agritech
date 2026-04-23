import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import './GenericPage.css';

export default function GenericPage({ title, subtitle, overline, breadcrumbs = [], children }) {
  return (
    <div className="generic-page">
      <div className="page-hero">
        <div className="container">
          {breadcrumbs.length > 0 && (
            <div className="breadcrumbs">
              <Link to="/">Home</Link>
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
      <div className="generic-page-body">
        {children}
      </div>
    </div>
  );
}
