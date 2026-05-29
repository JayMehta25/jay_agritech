import { useState, useEffect } from 'react';
import { X, Send, CheckCircle, Package, FlaskConical, Globe, Tag, User, Building, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Dynamic initial custom fields based on service
const getInitialCustoms = (key) => {
  switch (key) {
    case 'contract_manufacturing':
      return { formulation: 'liquid', volume: 'small', packaging: 'retail' };
    case 'research_formulations':
      return { focus: 'strain', timeline: 'mid', crops: '' };
    case 'white_label':
      return { category: 'biostimulants', batch: 'regional', design: 'yes' };
    case 'exports_franchise':
      return { country: '', type: 'distributor', license: 'yes' };
    default:
      return {};
  }
};

export default function B2BEnquiryModal({ activeSvc, onClose }) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    location: '',
    message: '',
    customs: {}
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Escape key close listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Synchronize state and reset form when activeSvc changes
  useEffect(() => {
    if (activeSvc) {
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        location: '',
        message: '',
        customs: getInitialCustoms(activeSvc.key)
      });
      setSubmitted(false);
      setLoading(false);
    }
  }, [activeSvc]);

  if (!activeSvc) return null;

  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCustomChange = (e) => {
    setFormData({
      ...formData,
      customs: { ...formData.customs, [e.target.name]: e.target.value }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 850);
  };

  const handleBackdropClick = (e) => {
    if (e.target.className === 'b2b-modal-overlay') onClose();
  };

  // Render Dynamic Custom Fields for B2B Service
  const renderCustomFields = () => {
    const c = formData.customs;
    switch (activeSvc.key) {
      case 'contract_manufacturing':
        return (
          <div className="grid-3 bsc-custom-fields" style={{ gap: 'var(--sp-4)', marginTop: 'var(--sp-2)' }}>
            <div className="form-group">
              <label className="form-label">{t('b2b.form.cm_formulation')}</label>
              <select name="formulation" value={c.formulation} onChange={handleCustomChange} className="form-select">
                <option value="liquid">{t('b2b.cm.liquid')}</option>
                <option value="wp">{t('b2b.cm.wp')}</option>
                <option value="sp">{t('b2b.cm.sp')}</option>
                <option value="granules">{t('b2b.cm.granules')}</option>
                <option value="custom">{t('b2b.cm.custom')}</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">{t('b2b.form.cm_volume')}</label>
              <select name="volume" value={c.volume} onChange={handleCustomChange} className="form-select">
                <option value="pilot">{t('b2b.cm.pilot')}</option>
                <option value="small">{t('b2b.cm.small')}</option>
                <option value="commercial">{t('b2b.cm.commercial')}</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">{t('b2b.form.cm_packaging')}</label>
              <select name="packaging" value={c.packaging} onChange={handleCustomChange} className="form-select">
                <option value="bulk">{t('b2b.cm.bulk')}</option>
                <option value="retail">{t('b2b.cm.retail')}</option>
                <option value="custom_oem">{t('b2b.cm.oem')}</option>
              </select>
            </div>
          </div>
        );
      case 'research_formulations':
        return (
          <div className="grid-3 bsc-custom-fields" style={{ gap: 'var(--sp-4)', marginTop: 'var(--sp-2)' }}>
            <div className="form-group">
              <label className="form-label">{t('b2b.form.res_focus')}</label>
              <select name="focus" value={c.focus} onChange={handleCustomChange} className="form-select">
                <option value="strain">{t('b2b.res.strain')}</option>
                <option value="fermentation">{t('b2b.res.ferment')}</option>
                <option value="stability">{t('b2b.res.stability')}</option>
                <option value="field">{t('b2b.res.field')}</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">{t('b2b.form.res_timeline')}</label>
              <select name="timeline" value={c.timeline} onChange={handleCustomChange} className="form-select">
                <option value="short">{t('b2b.res.short')}</option>
                <option value="mid">{t('b2b.res.mid')}</option>
                <option value="long">{t('b2b.res.long')}</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">{t('b2b.form.res_crops')}</label>
              <input
                type="text"
                name="crops"
                value={c.crops}
                onChange={handleCustomChange}
                className="form-input"
                required
                placeholder={t('b2b.form.res_crops_placeholder')}
              />
            </div>
          </div>
        );
      case 'white_label':
        return (
          <div className="grid-3 bsc-custom-fields" style={{ gap: 'var(--sp-4)', marginTop: 'var(--sp-2)' }}>
            <div className="form-group">
              <label className="form-label">{t('b2b.form.wl_category')}</label>
              <select name="category" value={c.category} onChange={handleCustomChange} className="form-select">
                <option value="bioinsecticides">{t('b2b.wl.insecticides')}</option>
                <option value="biofertilizers">{t('b2b.wl.fertilizers')}</option>
                <option value="biostimulants">{t('b2b.wl.biostimulants')}</option>
                <option value="organicnutrients">{t('b2b.wl.nutrients')}</option>
                <option value="micronutrients">{t('b2b.wl.micronutrients')}</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">{t('b2b.form.wl_batch')}</label>
              <select name="batch" value={c.batch} onChange={handleCustomChange} className="form-select">
                <option value="test">{t('b2b.wl.test')}</option>
                <option value="regional">{t('b2b.wl.regional')}</option>
                <option value="commercial">{t('b2b.wl.commercial')}</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">{t('b2b.form.wl_design')}</label>
              <select name="design" value={c.design} onChange={handleCustomChange} className="form-select">
                <option value="yes">{t('b2b.wl.design_yes')}</option>
                <option value="no">{t('b2b.wl.design_no')}</option>
              </select>
            </div>
          </div>
        );
      case 'exports_franchise':
        return (
          <div className="grid-3 bsc-custom-fields" style={{ gap: 'var(--sp-4)', marginTop: 'var(--sp-2)' }}>
            <div className="form-group">
              <label className="form-label">{t('b2b.form.exp_country')}</label>
              <input
                type="text"
                name="country"
                value={c.country}
                onChange={handleCustomChange}
                className="form-input"
                required
                placeholder={t('b2b.form.exp_country_placeholder')}
              />
            </div>
            <div className="form-group">
              <label className="form-label">{t('b2b.form.exp_type')}</label>
              <select name="type" value={c.type} onChange={handleCustomChange} className="form-select">
                <option value="exclusive">{t('b2b.exp.exclusive')}</option>
                <option value="distributor">{t('b2b.exp.distributor')}</option>
                <option value="buyer">{t('b2b.exp.buyer')}</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">{t('b2b.form.exp_license')}</label>
              <select name="license" value={c.license} onChange={handleCustomChange} className="form-select">
                <option value="yes">{t('b2b.exp.license_yes')}</option>
                <option value="in_progress">{t('b2b.exp.license_progress')}</option>
                <option value="no">{t('b2b.exp.license_no')}</option>
              </select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Render receipt items based on service keys
  const renderReceiptCustoms = () => {
    const c = formData.customs;
    switch (activeSvc.key) {
      case 'contract_manufacturing':
        return (
          <>
            <div className="receipt-row">
              <span className="receipt-label">{t('b2b.form.cm_formulation')}:</span>
              <strong className="receipt-val">{t(`b2b.cm.${c.formulation}`)}</strong>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">{t('b2b.form.cm_volume')}:</span>
              <strong className="receipt-val">{t(`b2b.cm.${c.volume}`)}</strong>
            </div>
          </>
        );
      case 'research_formulations':
        return (
          <>
            <div className="receipt-row">
              <span className="receipt-label">{t('b2b.form.res_focus')}:</span>
              <strong className="receipt-val">{t(`b2b.res.${c.focus}`)}</strong>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">{t('b2b.form.res_crops')}:</span>
              <strong className="receipt-val">{c.crops}</strong>
            </div>
          </>
        );
      case 'white_label':
        return (
          <>
            <div className="receipt-row">
              <span className="receipt-label">{t('b2b.form.wl_category')}:</span>
              <strong className="receipt-val">{t(`b2b.wl.${c.category}`)}</strong>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">{t('b2b.form.wl_design')}:</span>
              <strong className="receipt-val">{c.design === 'yes' ? t('common.yes') : t('common.no')}</strong>
            </div>
          </>
        );
      case 'exports_franchise':
        return (
          <>
            <div className="receipt-row">
              <span className="receipt-label">{t('b2b.form.exp_country')}:</span>
              <strong className="receipt-val">{c.country}</strong>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">{t('b2b.form.exp_type')}:</span>
              <strong className="receipt-val">{t(`b2b.exp.${c.type}`)}</strong>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const getServiceIcon = (key) => {
    switch (key) {
      case 'contract_manufacturing': return <Package size={22} />;
      case 'research_formulations': return <FlaskConical size={22} />;
      case 'white_label': return <Tag size={22} />;
      case 'exports_franchise': return <Globe size={22} />;
      default: return <Package size={22} />;
    }
  };

  return (
    <div className="b2b-modal-overlay" onClick={handleBackdropClick}>
      <div
        className="b2b-modal-card animate-scale-up"
        style={{ borderTop: `6px solid ${activeSvc.color}`, width: '820px', maxWidth: '96vw', boxSizing: 'border-box' }}
      >
        {/* Close Button */}
        <button className="b2b-modal-close" onClick={onClose} aria-label={t('common.close')}>
          <X size={20} />
        </button>

        {submitted ? (
          /* Success Receipt Card */
          <div className="enquiry-success-pane" style={{ padding: 'var(--sp-4) 0' }}>
            <div className="enquiry-success-ring" style={{ borderColor: activeSvc.color, background: `${activeSvc.color}12` }}>
              <CheckCircle size={36} style={{ color: activeSvc.color }} />
            </div>

            <h3 className="enquiry-success-title" style={{ fontSize: 'var(--fs-h3)' }}>{t('b2b.success.title')}</h3>
            <p className="enquiry-success-text" style={{ fontSize: 'var(--fs-body-sm)', marginBottom: 'var(--sp-4)' }}>
              {t('b2b.success.intro')}
            </p>

            <div className="enquiry-receipt-card" style={{ maxWidth: '460px', border: `1px dashed ${activeSvc.color}40`, background: `${activeSvc.color}04` }}>
              <div className="receipt-row">
                <span className="receipt-label">{t('b2b.form.service')}:</span>
                <strong className="receipt-val" style={{ color: activeSvc.color }}>{activeSvc.title}</strong>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">{t('b2b.form.name')}:</span>
                <strong className="receipt-val">{formData.name}</strong>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">{t('b2b.form.company')}:</span>
                <strong className="receipt-val">{formData.company}</strong>
              </div>
              {renderReceiptCustoms()}
            </div>

            <p className="enquiry-success-footer" style={{ fontSize: 'var(--fs-caption)', maxWidth: '440px' }}>
              {t('b2b.success.footer_msg')}
            </p>

            <div style={{ marginTop: 'var(--sp-6)' }}>
              <button className="btn btn-primary" onClick={onClose} style={{ background: activeSvc.color, borderColor: activeSvc.color }}>
                {t('b2b.success.done_btn')}
              </button>
            </div>
          </div>
        ) : (
          /* B2B Inquire Form */
          <>
            {/* Modal Header */}
            <div className="b2b-modal-header" style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-4)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', background: `${activeSvc.color}12`, color: activeSvc.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {getServiceIcon(activeSvc.key)}
              </div>
              <div>
                <h3 className="b2b-modal-title" style={{ fontSize: 'var(--fs-h3)', margin: 0 }}>{activeSvc.title}</h3>
                <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--clr-text-muted)', display: 'block', marginTop: 2 }}>
                  {t('b2b.modal.subtitle')}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="enquiry-actual-form" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
              
              {/* Dynamic Service-Specific Morphing Fields */}
              <div className="b2b-custom-fields-wrapper" style={{ padding: 'var(--sp-4)', background: 'var(--clr-primary-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--clr-primary-lighter)' }}>
                <h4 style={{ fontSize: 'var(--fs-body-sm)', fontWeight: 'bold', margin: '0 0 var(--sp-2) 0', color: activeSvc.color }}>
                  🛡️ {t('b2b.form.custom_specs')}
                </h4>
                {renderCustomFields()}
              </div>

              {/* Name & Company */}
              <div className="grid-2" style={{ gap: 'var(--sp-4)' }}>
                <div className="form-group">
                  <label className="form-label">
                    <User size={12} /> {t('b2b.form.name')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleTextChange}
                    className="form-input"
                    placeholder={t('b2b.form.name_placeholder')}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <Building size={12} /> {t('b2b.form.company')} *
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleTextChange}
                    className="form-input"
                    placeholder={t('b2b.form.company_placeholder')}
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid-2" style={{ gap: 'var(--sp-4)' }}>
                <div className="form-group">
                  <label className="form-label">
                    <Mail size={12} /> {t('b2b.form.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleTextChange}
                    className="form-input"
                    placeholder={t('b2b.form.email_placeholder')}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <Phone size={12} /> {t('b2b.form.phone')} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleTextChange}
                    className="form-input"
                    placeholder={t('b2b.form.phone_placeholder')}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="form-group">
                <label className="form-label">
                  <MapPin size={12} /> {t('b2b.form.location')} *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleTextChange}
                  className="form-input"
                  placeholder={t('b2b.form.location_placeholder')}
                />
              </div>

              {/* Custom Message */}
              <div className="form-group">
                <label className="form-label">{t('b2b.form.message')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleTextChange}
                  className="form-textarea"
                  rows="3"
                  placeholder={t('b2b.form.message_placeholder')}
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 'var(--sp-3)', marginTop: 'var(--sp-2)' }}>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: 'var(--sp-3.5)' }}
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ flex: 2, padding: 'var(--sp-3.5)', background: activeSvc.color, borderColor: activeSvc.color, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--sp-2)' }}
                >
                  {loading ? (
                    t('b2b.form.submitting')
                  ) : (
                    <>
                      {t('b2b.form.submit')} <Send size={14} />
                    </>
                  )}
                </button>
              </div>

            </form>
          </>
        )}
      </div>
    </div>
  );
}
