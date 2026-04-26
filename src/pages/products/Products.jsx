import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Droplets, Sprout, Search } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { products } from '../../data/siteData';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import GenericPage from '../../components/ui/GenericPage';

// Category Images
import catBfImg from '../../assets/products/bio-fertilizers.png';
import catBpImg from '../../assets/products/bio-pesticides.png';
import catPgrImg from '../../assets/products/pgr.png';
import catOnImg from '../../assets/products/organic-nutrients.png';
import catSpImg from '../../assets/products/specialty.png';
import catMnImg from '../../assets/products/micronutrients.png';

const catImages = {
  'bio-insecticides': catBfImg,
  'biostimulants': catPgrImg,
  'organic-nutrients': catOnImg,
  'specialty-products': catSpImg,
  'micronutrients': catMnImg
};

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

export default function Products() {
  const { t } = useTranslation();
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState('');

  const translateValue = (val) => {
    if (!val) return val;
    const cleanKey = val.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const key = `products.common_values.${cleanKey}`;
    const translated = t(key);
    return (translated && translated !== key) ? translated : val;
  };

  if (category) {
    const cat = products.categories.find(c => c.slug === category);
    if (!cat) return <GenericPage title={t('common.not_found')} breadcrumbs={[{ label: t('nav.products'), path: '/products' }, { label: t('common.not_found') }]}><div className="container"><p>{t('common.not_found')}</p></div></GenericPage>;

    const filteredProducts = cat.products.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <GenericPage
        title={t(cat.nameKey, cat.name)}
        subtitle={t(cat.descriptionKey, cat.description)}
        breadcrumbs={[{ label: t('nav.products'), path: '/products' }, { label: t(cat.nameKey, cat.name) }]}
        bodyClassName="moving-gradient-bg-full"
      >
        <div className="container" style={{ paddingTop: 'var(--sp-4)', paddingBottom: 'var(--sp-16)' }}>
          {/* Search Bar & Count */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--sp-8)', marginBottom: 'var(--sp-8)', flexWrap: 'wrap' }}>
            <div className="search-container" style={{ marginBottom: 0, flex: '0 1 400px' }}>
              <input
                type="text"
                className="search-input"
                placeholder={t('products.search_in', { category: t(cat.nameKey, cat.name) })}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="search-icon" size={20} />
            </div>
            <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)', whiteSpace: 'nowrap' }}>
              {t('products.showing_count', { filtered: filteredProducts.length, total: cat.products.length })}
            </p>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product, index) => (
                <AnimatedSection key={product.id} delay={index * 80}>
                  <Link to={`/products/${cat.slug}/${product.slug}`} className="product-card">
                    {/* Image Area */}
                    <div className="product-card__image">
                      <span className="particle"></span>
                      <span className="particle"></span>
                      <span className="particle"></span>
                      {product.image ? (
                        <img src={product.image} alt={t(`products.items.${product.id}.name`, product.name)} />
                      ) : (
                        <span className="product-card__image-placeholder">{cat.icon}</span>
                      )}
                    </div>

                    {/* Body */}
                    <div className="product-card__body">
                      <span className="product-card__tagline">{t(`products.items.${product.id}.tagline`, product.tagline)}</span>
                      <h3 className="product-card__name">{t(`products.items.${product.id}.name`, product.name)}</h3>
                      <p className="product-card__desc">{t(`products.items.${product.id}.description`, product.description)}</p>

                      {/* Footer */}
                      <div className="product-card__footer">
                        <div className="product-card__specs">
                          {product.dosage && (
                            <span className="product-card__spec">
                              <Droplets size={12} />
                              {t(`products.items.${product.id}.dosage`, translateValue(product.dosage))}
                            </span>
                          )}
                          <span className="product-card__spec">
                            <Sprout size={12} />
                            {t(`products.items.${product.id}.recommended`, translateValue(product.crops[0]))}
                          </span>
                        </div>
                        <span className="product-card__cta">
                          {t('common.view')} <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center" style={{ padding: 'var(--sp-20) 0' }}>
              <h3 style={{ color: 'var(--clr-text-muted)' }}>{t('products.no_match', { query: searchQuery })}</h3>
              <button className="btn btn-primary" style={{ marginTop: 'var(--sp-4)' }} onClick={() => setSearchQuery('')}>{t('products.clear_search')}</button>
            </div>
          )}
        </div>
      </GenericPage>
    );
  }

  const filteredCategories = products.categories.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <GenericPage
      title={t('products.title')}
      subtitle={t('products.subtitle')}
      breadcrumbs={[{ label: t('nav.products') }]}
      bodyClassName="moving-gradient-bg-full"
    >
      <div className="container" style={{ paddingTop: 'var(--sp-4)', paddingBottom: 'var(--sp-16)' }}>
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder={t('products.search_placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="search-icon" size={20} />
        </div>

        {filteredCategories.length > 0 ? (
          <div className="product-grid">
            {filteredCategories.map((cat, index) => (
              <AnimatedSection key={cat.id} delay={index * 100}>
                <Link to={`/products/${cat.slug}`} className="category-card">
                  <div className="category-card__image-container">
                    <img src={catImages[cat.id]} alt={cat.name} className="category-card__img" />
                    <div className="category-card__icon-overlay">{cat.icon}</div>
                  </div>
                  <div className="category-card__body">
                    <h3 className="category-card__name">{t(cat.nameKey, cat.name)}</h3>
                    <p className="category-card__desc">{t(cat.descriptionKey, cat.description)}</p>
                    <span className="category-card__count">
                      {t('products.product_count', { count: cat.productCount })}
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <div className="text-center" style={{ padding: 'var(--sp-20) 0' }}>
            <h3 style={{ color: 'var(--clr-text-muted)' }}>{t('products.no_cat_match', { query: searchQuery })}</h3>
            <button className="btn btn-primary" style={{ marginTop: 'var(--sp-4)' }} onClick={() => setSearchQuery('')}>{t('products.clear_search')}</button>
          </div>
        )}
      </div>
    </GenericPage>
  );
}
