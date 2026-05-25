import { useState, useEffect } from 'react';
import { useParams, Link } from '../../components/RouterBridge';
import { ArrowLeft, Send, Package, Leaf, Building, Phone, Mail, User, Check, MapPin, ShieldCheck, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { products } from '../../data/siteData';
import GenericPage from '../../components/ui/GenericPage';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

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

export default function ProductEnquiry({ category: categoryProp, slug: slugProp } = {}) {
  const { t, i18n } = useTranslation();
  const params = useParams();

  const category = categoryProp || params.category || params.path?.[0];
  const slug = slugProp || params.slug || params.path?.[1];

  const cat = products.categories.find(c => c.slug === category);
  if (!cat) {
    return (
      <GenericPage title={t('common.not_found', 'Not Found')} breadcrumbs={[{ label: t('nav.products'), path: '/products' }]}>
        <div className="container" style={{ padding: 'var(--sp-20) 0', textAlign: 'center' }}>
          <p>{t('common.not_found', 'Product category not found.')}</p>
        </div>
      </GenericPage>
    );
  }

  const product = cat.products.find(p => p.slug === slug);
  if (!product) {
    return (
      <GenericPage title={t('common.not_found', 'Not Found')} breadcrumbs={[{ label: t('nav.products'), path: '/products' }, { label: t(cat.nameKey, cat.name), path: `/products/${cat.slug}` }]}>
        <div className="container" style={{ padding: 'var(--sp-20) 0', textAlign: 'center' }}>
          <p>{t('common.not_found', 'Product not found.')}</p>
        </div>
      </GenericPage>
    );
  }

  const pKey = `products.items.${product.id}`;

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    packSize: product.packSizes[0] || '',
    quantity: '100',
    crop: product.crops.join(', ') || '',
    inquiryType: 'bulk',
    location: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auto-detect unit label
  const detectUnit = (size = '') => {
    const s = size.toLowerCase();
    if (s.includes('lit') || s.includes(' l') || s.includes('ml') || s.includes('liquid')) {
      return t('enquiry.units.liters', 'Liters');
    } else if (s.includes('kit')) {
      return t('enquiry.units.kits', 'Kits');
    } else {
      return t('enquiry.units.kilograms', 'Kilograms');
    }
  };

  const currentUnit = detectUnit(formData.packSize);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.scrollTo(0, 300);
    }, 800);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      packSize: product.packSizes[0] || '',
      quantity: '100',
      crop: product.crops.join(', ') || '',
      inquiryType: 'bulk',
      location: '',
      message: ''
    });
    setSubmitted(false);
  };

  return (
    <GenericPage
      title={t('enquiry.page_title', 'Product Enquiry')}
      subtitle={t('enquiry.page_subtitle', 'Personalized B2B Enquiry Form')}
      breadcrumbs={[
        { label: t('nav.products'), path: '/products' },
        { label: t(cat.nameKey, cat.name), path: `/products/${cat.slug}` },
        { label: t(`${pKey}.name`, product.name), path: `/products/${cat.slug}/${product.slug}` },
        { label: t('enquiry.breadcrumbs_label', 'Enquiry') }
      ]}
      bodyClassName="moving-gradient-bg"
    >
      <div className="container" style={{ paddingTop: 'var(--sp-4)', paddingBottom: 'var(--sp-16)' }}>
        {/* Back Link */}
        <div style={{ marginBottom: 'var(--sp-6)' }}>
          <Link to={`/products/${cat.slug}/${product.slug}`} className="btn btn-outline-gold btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
            <ArrowLeft size={14} /> {t('enquiry.back_to_product', 'Back to Product Details')}
          </Link>
        </div>

        <div className="enquiry-wrapper">
          <div className="enquiry-grid">
            
            {/* Left Column: Customized Product Card */}
            <AnimatedSection className="enquiry-sidebar-container" delay={0}>
              <div className="enquiry-product-sidebar">
                <div className="enquiry-sidebar-badge">{t(cat.nameKey, cat.name)}</div>
                
                <div className="enquiry-sidebar-visual">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="enquiry-sidebar-img" />
                  ) : (
                    <div className="enquiry-sidebar-placeholder">
                      <span className="enquiry-placeholder-icon">{cat.icon}</span>
                    </div>
                  )}
                </div>

                <h3 className="enquiry-sidebar-title">{t(`${pKey}.name`, product.name)}</h3>
                <p className="enquiry-sidebar-tagline">{t(`${pKey}.tagline`, product.tagline)}</p>
                
                <div className="enquiry-sidebar-divider"></div>
                
                <p className="enquiry-sidebar-desc">{t(`${pKey}.description`, product.description)}</p>
                
                <div className="enquiry-sidebar-divider"></div>
                
                <h4 style={{ fontSize: 'var(--fs-body-sm)', fontWeight: 'bold', marginBottom: 'var(--sp-3)', color: 'var(--clr-text)' }}>
                  {t('enquiry.why_choose', 'Quick Specifications:')}
                </h4>
                <ul className="enquiry-sidebar-specs">
                  {product.microbes && (
                    <li>
                      <Package size={14} style={{ color: 'var(--clr-gold)', flexShrink: 0 }} /> 
                      <span><strong>{t('products.fields.microbial_content', 'Microbial')}:</strong> {t(`${pKey}.microbes`, product.microbes)}</span>
                    </li>
                  )}
                  {product.contents && (
                    <li>
                      <Package size={14} style={{ color: 'var(--clr-gold)', flexShrink: 0 }} /> 
                      <span><strong>{t('products.fields.active_ingredients', 'Active')}:</strong> {t(`${pKey}.contents`, product.contents)}</span>
                    </li>
                  )}
                  {product.dosage && (
                    <li>
                      <Leaf size={14} style={{ color: 'var(--clr-gold)', flexShrink: 0 }} /> 
                      <span><strong>{t('products.fields.dosage', 'Dosage')}:</strong> {t(`${pKey}.dosage`, product.dosage)}</span>
                    </li>
                  )}
                </ul>
              </div>
            </AnimatedSection>

            {/* Right Column: Personalized Form Panel */}
            <AnimatedSection className="enquiry-form-container" delay={100}>
              <div className="enquiry-form-card">
                {submitted ? (
                  /* Success Checkout Screen */
                  <div className="enquiry-success-pane">
                    <div className="enquiry-success-ring animate-scale-up">
                      <ShieldCheck size={40} className="enquiry-success-icon" />
                    </div>
                    
                    <h3 className="enquiry-success-title">{t('enquiry.success.title', 'Enquiry Submitted Successfully!')}</h3>
                    <p className="enquiry-success-text">
                      {t('enquiry.success.intro', 'Thank you for your interest! A personalized quote request for the following configuration has been generated:')}
                    </p>

                    <div className="enquiry-receipt-card">
                      <div className="receipt-row">
                        <span className="receipt-label">{t('enquiry.form.product', 'Target Product')}:</span>
                        <strong className="receipt-val">{t(`${pKey}.name`, product.name)}</strong>
                      </div>
                      <div className="receipt-row">
                        <span className="receipt-label">{t('enquiry.form.pack_size', 'Preferred Pack Size')}:</span>
                        <strong className="receipt-val">{formData.packSize}</strong>
                      </div>
                      <div className="receipt-row">
                        <span className="receipt-label">{t('enquiry.form.quantity', 'Required Volume')}:</span>
                        <strong className="receipt-val">{formData.quantity} {currentUnit}</strong>
                      </div>
                      <div className="receipt-row">
                        <span className="receipt-label">{t('enquiry.form.company', 'Company / Farm')}:</span>
                        <strong className="receipt-val">{formData.company || t('enquiry.success.individual', 'Individual Farm')}</strong>
                      </div>
                      {formData.crop && (
                        <div className="receipt-row">
                          <span className="receipt-label">{t('enquiry.form.crop', 'Target Crops')}:</span>
                          <strong className="receipt-val">{formData.crop}</strong>
                        </div>
                      )}
                    </div>

                    <p className="enquiry-success-footer">
                      {t('enquiry.success.footer_msg', 'Our regional sales manager or technical consultant will review these specific details and contact you at the provided email/phone within 24 hours.')}
                    </p>

                    <div style={{ display: 'flex', gap: 'var(--sp-4)', justifyContent: 'center', marginTop: 'var(--sp-6)' }}>
                      <Link to={`/products/${cat.slug}/${product.slug}`} className="btn btn-primary">
                        {t('enquiry.success.return_btn', 'Return to Details')}
                      </Link>
                      <button onClick={handleReset} className="btn btn-secondary">
                        {t('enquiry.success.new_inquiry_btn', 'Submit Another')}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Enquiry Form */
                  <>
                    <h3 className="enquiry-form-title">{t('enquiry.form.get_quote', 'Request a Personalized Quote')}</h3>
                    <p className="enquiry-form-subtitle">
                      {t('enquiry.form.instructions', 'Fill out the form below to receive a custom bulk pricing and application proposal from our specialists.')}
                    </p>

                    <form onSubmit={handleSubmit} className="enquiry-actual-form">
                      {/* Name & Company */}
                      <div className="grid-2" style={{ gap: 'var(--sp-4)' }}>
                        <div className="form-group">
                          <label className="form-label">
                            <User size={12} /> {t('enquiry.form.name', 'Full Name')} *
                          </label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="form-input"
                            placeholder={t('enquiry.form.name_placeholder', 'Enter your full name')}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">
                            <Building size={12} /> {t('enquiry.form.company', 'Company / Farm Name')}
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="form-input"
                            placeholder={t('enquiry.form.company_placeholder', 'e.g. Green Valley Farms')}
                          />
                        </div>
                      </div>

                      {/* Email & Phone */}
                      <div className="grid-2" style={{ gap: 'var(--sp-4)' }}>
                        <div className="form-group">
                          <label className="form-label">
                            <Mail size={12} /> {t('enquiry.form.email', 'Email Address')} *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input"
                            placeholder={t('enquiry.form.email_placeholder', 'yourname@example.com')}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">
                            <Phone size={12} /> {t('enquiry.form.phone', 'Phone Number')} *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-input"
                            placeholder={t('enquiry.form.phone_placeholder', 'e.g. +91 98765 43210')}
                          />
                        </div>
                      </div>

                      {/* Location */}
                      <div className="form-group">
                        <label className="form-label">
                          <MapPin size={12} /> {t('enquiry.form.location', 'Location (City & State)')} *
                        </label>
                        <input
                          type="text"
                          name="location"
                          required
                          value={formData.location}
                          onChange={handleChange}
                          className="form-input"
                          placeholder={t('enquiry.form.location_placeholder', 'e.g. Valsad, Gujarat')}
                        />
                      </div>

                      {/* Dynamic Pack Size & Custom Quantity */}
                      <div className="grid-2" style={{ gap: 'var(--sp-4)' }}>
                        <div className="form-group">
                          <label className="form-label">
                            <Package size={12} /> {t('enquiry.form.pack_size', 'Preferred Pack Size')} *
                          </label>
                          <select
                            name="packSize"
                            required
                            value={formData.packSize}
                            onChange={handleChange}
                            className="form-select"
                          >
                            {product.packSizes.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">
                            <Activity size={12} /> {t('enquiry.form.quantity', 'Required Volume')} ({currentUnit}) *
                          </label>
                          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                            <input
                              type="number"
                              name="quantity"
                              required
                              min="1"
                              value={formData.quantity}
                              onChange={handleChange}
                              className="form-input"
                              style={{ width: '100%', paddingRight: '70px' }}
                            />
                            <span className="input-unit-tag">{currentUnit}</span>
                          </div>
                        </div>
                      </div>

                      {/* Crops Input & Inquiry Type */}
                      <div className="grid-2" style={{ gap: 'var(--sp-4)' }}>
                        <div className="form-group">
                          <label className="form-label">
                            <Leaf size={12} /> {t('enquiry.form.crop', 'Target Crops / Application')}
                          </label>
                          <input
                            type="text"
                            name="crop"
                            value={formData.crop}
                            onChange={handleChange}
                            className="form-input"
                            placeholder={t('enquiry.form.crop_placeholder', 'e.g. Cotton, Chillies')}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">
                            <ShieldCheck size={12} /> {t('enquiry.form.inquiry_type', 'Type of Inquiry')} *
                          </label>
                          <select
                            name="inquiryType"
                            required
                            value={formData.inquiryType}
                            onChange={handleChange}
                            className="form-select"
                          >
                            <option value="bulk">{t('enquiry.options.bulk', 'Bulk Farm Purchase')}</option>
                            <option value="distributor">{t('enquiry.options.distributor', 'Dealership / Distribution')}</option>
                            <option value="oem">{t('enquiry.options.oem', 'OEM / Private Labeling')}</option>
                            <option value="consultancy">{t('enquiry.options.consultancy', 'Technical Consultation')}</option>
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="form-group">
                        <label className="form-label">{t('enquiry.form.message', 'Specific Requirements / Message')}</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className="form-textarea"
                          rows="4"
                          placeholder={t('enquiry.form.message_placeholder', 'Provide any extra requirements or delivery schedule queries...')}
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary btn-lg"
                        style={{ width: '100%', marginTop: 'var(--sp-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--sp-2)' }}
                      >
                        {loading ? (
                          t('enquiry.form.submitting', 'Processing Quote...')
                        ) : (
                          <>
                            {t('enquiry.form.submit', 'Submit Quote Request')} <Send size={16} />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </AnimatedSection>

          </div>
        </div>
      </div>
    </GenericPage>
  );
}
