import { useParams, Link } from 'react-router-dom';
import { Check, Package, ArrowLeft, Leaf } from 'lucide-react';
import { products } from '../../data/siteData';
import GenericPage from '../../components/ui/GenericPage';

export default function ProductDetail() {
  const { category, slug } = useParams();
  const cat = products.categories.find(c => c.slug === category);
  if (!cat) return <GenericPage title="Not Found" breadcrumbs={[{ label: 'Products', path: '/products' }]}><div className="container"><p>Product not found.</p></div></GenericPage>;
  
  const product = cat.products.find(p => p.slug === slug);
  if (!product) return <GenericPage title="Not Found" breadcrumbs={[{ label: 'Products', path: '/products' }, { label: cat.name, path: `/products/${cat.slug}` }]}><div className="container"><p>Product not found.</p></div></GenericPage>;
  
  return (
    <GenericPage title={product.name} subtitle={product.tagline} breadcrumbs={[{ label: 'Products', path: '/products' }, { label: cat.name, path: `/products/${cat.slug}` }, { label: product.name }]}>
      <div className="container">
        <div className="grid-2" style={{ gap: 'var(--sp-12)', alignItems: 'start' }}>
          {/* Image */}
          <div>
            <div style={{ aspectRatio: '4/3', background: 'var(--gradient-warm)', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-6)' }}>
              <span style={{ fontSize: '5rem' }}>{cat.icon}</span>
              <span style={{ color: 'var(--clr-text-muted)', fontWeight: 'var(--fw-medium)' }}>{product.name}</span>
            </div>
            {product.badge && <span className="badge badge-green" style={{ fontSize: 'var(--fs-body-sm)', padding: 'var(--sp-2) var(--sp-4)' }}>{product.badge}</span>}
          </div>
          
          {/* Details */}
          <div>
            <span style={{ fontSize: 'var(--fs-h2)', fontWeight: 'var(--fw-bold)', color: 'var(--clr-primary)', display: 'block', marginBottom: 'var(--sp-4)' }}>{product.price}</span>
            <p style={{ fontSize: 'var(--fs-body-lg)', lineHeight: 'var(--lh-loose)', marginBottom: 'var(--sp-8)' }}>{product.description}</p>
            
            {/* Benefits */}
            <div style={{ marginBottom: 'var(--sp-8)' }}>
              <h3 style={{ marginBottom: 'var(--sp-4)' }}>Key Benefits</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
                {product.benefits.map((b, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', padding: 'var(--sp-3)', background: 'var(--clr-primary-surface)', borderRadius: 'var(--radius-md)' }}>
                    <Check size={16} style={{ color: 'var(--clr-primary)', flexShrink: 0 }} />
                    <span style={{ fontWeight: 'var(--fw-medium)' }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Application */}
            <div style={{ marginBottom: 'var(--sp-8)' }}>
              <h3 style={{ marginBottom: 'var(--sp-3)' }}>Application</h3>
              <p style={{ color: 'var(--clr-text-muted)', padding: 'var(--sp-4)', background: 'var(--clr-off-white)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--clr-primary)' }}>{product.application}</p>
            </div>
            
            {/* Crops */}
            <div style={{ marginBottom: 'var(--sp-8)' }}>
              <h3 style={{ marginBottom: 'var(--sp-3)' }}>Recommended Crops</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
                {product.crops.map((c, i) => <span key={i} className="chip">{c}</span>)}
              </div>
            </div>
            
            {/* Pack Sizes */}
            <div style={{ marginBottom: 'var(--sp-8)' }}>
              <h3 style={{ marginBottom: 'var(--sp-3)' }}>Available Pack Sizes</h3>
              <div style={{ display: 'flex', gap: 'var(--sp-3)' }}>
                {product.packSizes.map((s, i) => (
                  <div key={i} style={{ padding: 'var(--sp-3) var(--sp-5)', border: '1.5px solid var(--clr-border)', borderRadius: 'var(--radius-md)', fontWeight: 'var(--fw-semibold)', textAlign: 'center' }}>{s}</div>
                ))}
              </div>
            </div>
            
            {/* CTAs */}
            <div style={{ display: 'flex', gap: 'var(--sp-4)' }}>
              <Link to="/contact" className="btn btn-primary btn-lg" style={{ flex: 1 }}>Enquire Now</Link>
              <a href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi, I'm interested in ${product.name}`)}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg" style={{ flex: 1 }}>WhatsApp Order</a>
            </div>
          </div>
        </div>
      </div>
    </GenericPage>
  );
}
