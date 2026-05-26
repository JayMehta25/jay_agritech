import { useParams, Link, useLocation } from '../../components/RouterBridge';
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

// Quick specs will be rendered as a simple bullets list in the robusta layout

export default function ProductDetail({ category: categoryProp, slug: slugProp } = {}) {
  const { t } = useTranslation();
  const params = useParams();
  const category = categoryProp || params.category || params.path?.[0];
  const slug = slugProp || params.slug || params.path?.[1];
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

  const specs = [];
  if (product.microbes) specs.push({ label: t('products.fields.microbial_content') || 'Microbial content', value: t(`${pKey}.microbes`, product.microbes) });
  if (product.contents) specs.push({ label: t('products.fields.active_ingredients') || 'Active ingredients', value: t(`${pKey}.contents`, product.contents) });
  if (product.specifications) specs.push({ label: t('products.fields.specifications') || 'Specifications', value: t(`${pKey}.specifications`, product.specifications) });
  if (product.application) specs.push({ label: t('products.fields.application') || 'Application', value: t(`${pKey}.application`, translateValue(product.application)) });
  if (product.dosage) specs.push({ label: t('products.fields.dosage') || 'Dosage', value: t(`${pKey}.dosage`, translateValue(product.dosage)) });
  if (product.crops && product.crops.length > 0) specs.push({ label: t('products.fields.recommended') || 'Recommended crop', value: t(`${pKey}.recommended`, translateValue(product.crops[0])) });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isFromGrowthSystem = searchParams.get('from') === 'growth-system';

  const breadcrumbs = isFromGrowthSystem
    ? [
        { label: t('pages.growth_system', 'Growth System'), path: '/growth-system' },
        { label: t(`${pKey}.name`, product.name) }
      ]
    : [
        { label: t('nav.products'), path: '/products' },
        { label: t(cat.nameKey, cat.name), path: `/products/${cat.slug}` },
        { label: t(`${pKey}.name`, product.name) }
      ];

  return (
    <GenericPage
      title={t(`${pKey}.name`, product.name)}
      subtitle={t(`${pKey}.tagline`, product.tagline)}
      breadcrumbs={breadcrumbs}
      bodyClassName="moving-gradient-bg"
    >
      <div className="container" style={{ paddingTop: 'var(--sp-4)', paddingBottom: 'var(--sp-16)' }}>
        <div className="robusta-detail-shell">
          <div className="robusta-detail-hero">
            <AnimatedSection>
              <div className="robusta-detail-visual">
                <div className="robusta-detail-visual-frame">
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
                      <span className="label" style={{ fontSize: '0.8rem', marginTop: '0.5rem', display: 'block', textAlign: 'center', opacity: 0.8 }}>
                        {t(`${pKey}.name`, product.name)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="robusta-detail-facts">
                  <div className="robusta-fact">
                    <Droplets size={16} /> {product.dosage ? t(`${pKey}.dosage`, translateValue(product.dosage)) : '100% Organic'}
                  </div>
                  <div className="robusta-fact">
                    <Sprout size={16} /> {product.application ? t(`${pKey}.application`, translateValue(product.application)) : 'Bio-active'}
                  </div>
                  <div className="robusta-fact">
                    <Package size={16} /> {product.packSizes && product.packSizes[0] ? t(`${pKey}.packSizes.0`, translateValue(product.packSizes[0])) : 'Premium Pack'}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div className="robusta-detail-copy">
                <span className="robusta-detail-eyebrow">{t(cat.nameKey, cat.name)}</span>
                <h2 className="robusta-detail-title">{t(`${pKey}.name`, product.name)}</h2>
                <p className="robusta-detail-tagline">{t(`${pKey}.tagline`, product.tagline)}</p>
                <p className="robusta-detail-description">{t(`${pKey}.description`, product.description)}</p>

                <div className="robusta-detail-badges">
                  <span className="robusta-detail-badge">{product.slug.includes('kit') ? 'Premium Kit' : 'Bio-Formulation'}</span>
                  <span className="robusta-detail-badge">{product.application ? t(`${pKey}.application`, translateValue(product.application)) : 'Easy to Apply'}</span>
                  <span className="robusta-detail-badge">Eco-Friendly & Safe</span>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <div className="robusta-detail-grid">
            <AnimatedSection delay={180}>
              <section className="robusta-panel robusta-panel--main">
                <div className="robusta-panel__header">
                  <h3>{t('products.fields.key_benefits') || 'Key Benefits'}</h3>
                  <p>Scientifically formulated for maximum effectiveness and sustainable crop performance.</p>
                </div>
                <div className="robusta-benefit-grid">
                  {product.benefits.map((benefit, index) => {
                    const getSubDesc = (idx) => {
                      if (product.slug === 'at-orgo-robusta-pro-nc-kit') {
                        return idx === 0 ? 'Supports rapid uptake through the carrier-based format.' : 
                               idx === 1 ? 'Designed for smooth handling and consistent field use.' : 
                               idx === 2 ? 'Improves delivery of active material in the root zone.' : 
                               'Built for straightforward, practical application.';
                      }
                      return idx === 0 ? 'Enhances crop development and optimizes nutrient efficiency.' :
                             idx === 1 ? 'Strengthens root structure and improves soil vitality.' :
                             idx === 2 ? 'Boosts natural crop resistance against environmental stress.' :
                             'Promotes sustainable practices and premium yield quality.';
                    };
                    return (
                      <div key={index} className="robusta-benefit-card">
                        <div className="robusta-benefit-card__icon"><Check size={14} /></div>
                        <div>
                          <h4>{t(`${pKey}.benefits.${index}`, benefit)}</h4>
                          <p>{getSubDesc(index)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </AnimatedSection>

            <AnimatedSection delay={260}>
              <section className="robusta-panel robusta-panel--full">
                <div className="robusta-panel__header">
                  <h3>Quick specs</h3>
                  <p>Everything a distributor or farmer needs at a glance.</p>
                </div>

                <div className="robusta-spec-list">
                  <ul className="robusta-spec-bullets">
                    {specs.map((s, i) => (
                      <li key={i}><strong>{s.label}:</strong> {s.value}</li>
                    ))}
                  </ul>
                </div>

                <div className="robusta-chip-group">
                  {product.packSizes.map((size, index) => (
                    <span key={index} className="robusta-chip">
                      <Package size={12} /> {t(`${pKey}.packSizes.${index}`, translateValue(size))}
                    </span>
                  ))}
                  {product.crops.map((crop, index) => (
                    <span key={crop} className="robusta-chip robusta-chip--soft">
                      <Leaf size={12} /> {t(`${pKey}.crops.${index}`, translateValue(crop))}
                    </span>
                  ))}
                </div>
              </section>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={340}>
            <div className="robusta-bottom-cta">
              <Link to={`/products/${category}/${slug}/enquire`} className="btn btn-primary btn-lg robusta-bottom-cta__button">
                {t('common.enquire_now')}
              </Link>
              <a
                href={`https://wa.me/919876543210?text=${encodeURIComponent(t('common.whatsapp_message', { name: product.name }))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg robusta-bottom-cta__button"
              >
                {t('common.whatsapp_order')}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </GenericPage>
  );
}
