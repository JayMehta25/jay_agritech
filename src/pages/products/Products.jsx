import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Package, Filter, Search } from 'lucide-react';
import { useState } from 'react';
import { products } from '../../data/siteData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import GenericPage from '../../components/ui/GenericPage';

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

export default function Products() {
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  
  if (category) {
    const cat = products.categories.find(c => c.slug === category);
    if (!cat) return <GenericPage title="Category Not Found" breadcrumbs={[{ label: 'Products', path: '/products' }, { label: 'Not Found' }]}><div className="container"><p>Category not found.</p></div></GenericPage>;
    
    return (
      <GenericPage title={cat.name} subtitle={cat.description} breadcrumbs={[{ label: 'Products', path: '/products' }, { label: cat.name }]}>
        <div className="container">
          <div className="grid-3">
            {cat.products.map((product) => (
              <AnimatedSection key={product.id}>
                <Link to={`/products/${cat.slug}/${product.slug}`} className="card hover-lift" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: 180, background: 'var(--gradient-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>{cat.icon}</div>
                  <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)', flex: 1 }}>
                    {product.badge && <span className="badge badge-green" style={{ alignSelf: 'flex-start' }}>{product.badge}</span>}
                    <h3 style={{ fontSize: 'var(--fs-body-lg)' }}>{product.name}</h3>
                    <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)' }}>{product.tagline}</p>
                    <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)', flex: 1 }}>{product.description.slice(0, 120)}...</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 'var(--sp-3)', borderTop: '1px solid var(--clr-border-light)' }}>
                      <span style={{ fontWeight: 'var(--fw-bold)', color: 'var(--clr-primary)', fontSize: 'var(--fs-body-lg)' }}>{product.price}</span>
                      <span style={{ color: 'var(--clr-primary)', fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-body-sm)', display: 'flex', alignItems: 'center', gap: 4 }}>Details <ArrowRight size={14} /></span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </GenericPage>
    );
  }
  
  return (
    <GenericPage title="Our Products" subtitle="60+ innovative biological and organic agricultural solutions across 5 categories." breadcrumbs={[{ label: 'Products' }]}>
      <div className="container">
        <div className="grid-3" style={{ marginBottom: 'var(--sp-16)' }}>
          {products.categories.map((cat) => (
            <AnimatedSection key={cat.id}>
              <Link to={`/products/${cat.slug}`} className="card hover-lift" style={{ padding: 'var(--sp-8)', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: 'var(--sp-4)' }}>{cat.icon}</div>
                <h3 style={{ marginBottom: 'var(--sp-2)' }}>{cat.name}</h3>
                <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)', marginBottom: 'var(--sp-4)' }}>{cat.description}</p>
                <span className="badge badge-green">{cat.productCount} Products</span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </GenericPage>
  );
}
