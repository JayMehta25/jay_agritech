import { useParams, Link } from 'react-router-dom';
import { Check, Droplets, Sprout, Package, Leaf, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { products } from '../../data/siteData';
import GenericPage from '../../components/ui/GenericPage';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import Bottle3D from '../../components/ui/Bottle3D';

function AnimatedSection({ children, className = '', delay = 0 }) {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function ProductDetail() {
  const { t } = useTranslation();
  const { category, slug } = useParams();
  const cat = products.categories.find(c => c.slug === category);
  if (!cat) return <GenericPage title={t('common.not_found')} breadcrumbs={[{ label: t('nav.products'), path: '/products' }]}><div className="container"><p>{t('common.not_found')}</p></div></GenericPage>;

  const product = cat.products.find(p => p.slug === slug);
  if (!product) return <GenericPage title={t('common.not_found')} breadcrumbs={[{ label: t('nav.products'), path: '/products' }, { label: t(cat.nameKey, cat.name), path: `/products/${cat.slug}` }]}><div className="container"><p>{t('common.not_found')}</p></div></GenericPage>;

  const pKey = `products.items.${product.id}`;

  const translateValue = (val) => {
    if (!val) return val;
    const cleanKey = val.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const key = `products.common_values.${cleanKey}`;
    const translated = t(key);
    return (translated && translated !== key) ? translated : val;
  };

  return (
    <GenericPage
      title={t(`${pKey}.name`, product.name)}
      subtitle={t(`${pKey}.tagline`, product.tagline)}
      breadcrumbs={[
        { label: t('nav.products'), path: '/products' },
        { label: t(cat.nameKey, cat.name), path: `/products/${cat.slug}` },
        { label: t(`${pKey}.name`, product.name) }
      ]}
      bodyClassName="moving-gradient-bg"
    >
      <div className="container" style={{ paddingTop: 'var(--sp-4)', paddingBottom: 'var(--sp-16)' }}>

        <div className="product-detail-grid">
          {/* Left — Image Showcase */}
          <AnimatedSection>
            <div className="product-showcase">
              {product.slug === 'at-orgo-rescue-pro' ? (
                <Bottle3D 
                  imageUrl={product.image} 
                  modelUrl="/models/rescue_pro.glb" 
                />
              ) : product.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                <div className="product-showcase__placeholder">
                  <span className="icon">{cat.icon}</span>
                  <span className="label">{t(`${pKey}.name`, product.name)}</span>
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Right — Product Info */}
          <div className="product-info">
            {/* Header */}
            <AnimatedSection delay={100}>
              <div className="product-info__header">
                <span className="product-info__category">{t(cat.nameKey, cat.name)}</span>
                <p className="product-info__desc">{t(`${pKey}.description`, product.description)}</p>
              </div>
            </AnimatedSection>

            {/* Quick Specs Row */}
            <AnimatedSection delay={200}>
              <div className="specs-row">
                {product.microbes && (
                  <div className="spec-card">
                    <div className="spec-card__label">{t('products.fields.microbial_content')}</div>
                    <div className="spec-card__value">{t(`${pKey}.microbes`, product.microbes)}</div>
                  </div>
                )}
                {product.contents && (
                  <div className="spec-card">
                    <div className="spec-card__label">{t('products.fields.active_ingredients')}</div>
                    <div className="spec-card__value">{t(`${pKey}.contents`, product.contents)}</div>
                  </div>
                )}
                {product.specifications && (
                  <div className="spec-card">
                    <div className="spec-card__label">{t('products.fields.specifications')}</div>
                    <div className="spec-card__value">{t(`${pKey}.specifications`, product.specifications)}</div>
                  </div>
                )}
                {product.application && (
                  <div className="spec-card">
                    <div className="spec-card__label">{t('products.fields.application')}</div>
                    <div className="spec-card__value">{t(`${pKey}.application`, translateValue(product.application))}</div>
                  </div>
                )}
                {product.dosage && (
                  <div className="spec-card">
                    <div className="spec-card__label">{t('products.fields.dosage')}</div>
                    <div className="spec-card__value">{t(`${pKey}.dosage`, translateValue(product.dosage))}</div>
                  </div>
                )}
                <div className="spec-card">
                  <div className="spec-card__label">{t('products.fields.recommended')}</div>
                  <div className="spec-card__value">{t(`${pKey}.recommended`, translateValue(product.crops[0]))}</div>
                </div>
              </div>
            </AnimatedSection>

            {/* Benefits */}
            <AnimatedSection delay={300}>
              <div className="benefits-section">
                <h3 className="benefits-section__title">{t('products.fields.key_benefits')}</h3>
                <div className="benefits-grid">
                  {product.benefits.map((b, i) => (
                    <div key={i} className="benefit-item">
                      <div className="benefit-item__icon">
                        <Check size={14} />
                      </div>
                      <span className="benefit-item__text">{t(`${pKey}.benefits.${i}`, b)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Recommended Crops */}
            <AnimatedSection delay={400}>
              <div className="detail-section">
                <h3 className="detail-section__title">{t('products.fields.recommended_crops')}</h3>
                <div className="crop-tags">
                  {product.crops.map((c, i) => (
                    <span key={i} className="crop-tag">
                      <Leaf size={12} /> {t(`${pKey}.crops.${i}`, translateValue(c))}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Pack Sizes */}
            <AnimatedSection delay={500}>
              <div className="detail-section">
                <h3 className="detail-section__title">{t('products.fields.pack_sizes')}</h3>
                <div className="pack-sizes">
                  {product.packSizes.map((s, i) => (
                    <div key={i} className="pack-size">
                      <Package size={14} style={{ marginRight: 6, color: 'var(--clr-primary-light)' }} /> {t(`${pKey}.packSizes.${i}`, translateValue(s))}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* CTA Buttons */}
            <AnimatedSection delay={600}>
              <div className="product-cta-row">
                <Link to="/contact" className="btn btn-primary btn-lg">{t('common.enquire_now')}</Link>
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(t('common.whatsapp_message', { name: product.name }))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-lg"
                >
                  {t('common.whatsapp_order')}
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </GenericPage>
  );
}
