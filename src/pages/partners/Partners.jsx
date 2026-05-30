import { useEffect, useState, startTransition } from 'react';
import { Link } from '../../components/RouterBridge';
import { Users, Truck, Globe, ArrowRight, CheckCircle, TrendingUp, Award, Headphones, X, Send, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import GenericPage from '../../components/ui/GenericPage';
import { assetSrc } from '../../utils/assetSrc';

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

import imgDealerAsset from '../../assets/partners/dealer.png';
import imgDistributorAsset from '../../assets/partners/distributor.png';
import imgExportAsset from '../../assets/partners/export.png';

const typeImages = {
  dealer: assetSrc(imgDealerAsset),
  distributor: assetSrc(imgDistributorAsset),
  export: assetSrc(imgExportAsset),
};

import imgHeroAsset from '../../assets/partners/hero.png';

const imgHero = assetSrc(imgHeroAsset);

export default function Partners() {
  const { t, i18n } = useTranslation();
  const [activeModal, setActiveModal] = useState(null); // 'dealer' | 'distributor' | 'export' | null
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const activeLanguage = i18n.language || i18n.resolvedLanguage || 'en';
  const currentLang = activeLanguage.startsWith('zh')
    ? 'zh'
    : activeLanguage.startsWith('hi')
      ? 'hi'
      : 'en';
  const savedLang = hydrated && typeof window !== 'undefined' ? (localStorage.getItem('i18nextLng') || '') : '';
  const forceHindi = savedLang.startsWith('hi') || currentLang === 'hi';
  const localeBundle = i18n.getResourceBundle(currentLang, 'translation') || {};
  const hiBundle = i18n.getResourceBundle('hi', 'translation') || {};
  const effectiveBundle = forceHindi ? hiBundle : localeBundle;
  const partnerPage = effectiveBundle.pages?.partners || {};
  const partnerDetails = effectiveBundle.pages_details?.partners || {};
  const partnerReasons = partnerDetails.reasons || {};
  const partnerForm = partnerPage.form || partnerDetails.form || {};

  const types = [
    { key: 'dealer', icon: <Users size={32} />, color: '#2E7D32' },
    { key: 'distributor', icon: <Truck size={32} />, color: '#1565C0' },
    { key: 'export', icon: <Globe size={32} />, color: '#E65100' },
  ];

  const openModal = (type) => {
    setActiveModal(type);
    setFormSubmitted(false);
    setFormData({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'become_partner',
        data: {
          program: activeModal,
          ...formData
        }
      })
    }).catch(err => console.error('Error sending partner email:', err));

    // Simulate API request
    setTimeout(() => {
      setFormSubmitted(true);
    }, 400);
  };

  const modalOverlayStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(10, 45, 10, 0.65)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: 'var(--sp-4)',
    animation: 'fadeIn 0.3s ease-out'
  };

  const modalContentStyle = {
    background: '#ffffff',
    borderRadius: 'var(--radius-xl)',
    width: '100%',
    maxWidth: '1000px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: 'var(--shadow-2xl)',
    position: 'relative',
    animation: 'slideUp 0.3s ease-out',
    border: '1px solid var(--clr-border-light)'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--clr-border-dark)',
    fontSize: 'var(--fs-body-sm)',
    background: '#fafafa',
    color: 'var(--clr-text-body)',
    transition: 'border-color 0.2s',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const textareaStyle = {
    ...inputStyle,
    resize: 'vertical',
    fontFamily: 'inherit'
  };

  const renderDealerForm = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
      {/* Section 1 */}
      <div className="form-section-header">
        <h5 className="form-section-title">
          <span className="form-section-accent"></span>
          {partnerForm.dealer?.sec_contact || t('pages.partners.form.dealer.sec_contact')}
        </h5>
      </div>
      
      <div className="form-grid-2">
        <div className="form-field-group">
          <label className="form-field-label">{partnerForm.dealer?.lbl_fullname || t('pages.partners.form.dealer.lbl_fullname')}<span className="form-field-required">*</span></label>
          <input type="text" required placeholder={partnerForm.dealer?.ph_fullname || t('pages.partners.form.dealer.ph_fullname')} className="form-field-input" value={formData.fullName || ''} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
        </div>
        <div className="form-field-group">
          <label className="form-field-label">{partnerForm.dealer?.lbl_shopname || t('pages.partners.form.dealer.lbl_shopname')}<span className="form-field-required">*</span></label>
          <input type="text" required placeholder={partnerForm.dealer?.ph_shopname || t('pages.partners.form.dealer.ph_shopname')} className="form-field-input" value={formData.shopName || ''} onChange={(e) => setFormData({ ...formData, shopName: e.target.value })} />
        </div>
      </div>

      <div className="form-grid-2">
        <div className="form-field-group">
          <label className="form-field-label">{partnerForm.dealer?.lbl_phone || t('pages.partners.form.dealer.lbl_phone')}<span className="form-field-required">*</span></label>
          <input type="tel" required placeholder={partnerForm.dealer?.ph_phone || t('pages.partners.form.dealer.ph_phone')} className="form-field-input" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
        </div>
        <div className="form-field-group">
          <label className="form-field-label">{partnerForm.dealer?.lbl_email || t('pages.partners.form.dealer.lbl_email')}</label>
          <input type="email" placeholder={partnerForm.dealer?.ph_email || t('pages.partners.form.dealer.ph_email')} className="form-field-input" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </div>
      </div>

      {/* Section 2 */}
      <div className="form-section-header" style={{ marginTop: 'var(--sp-2)' }}>
        <h5 className="form-section-title">
          <span className="form-section-accent"></span>
          {partnerForm.dealer?.sec_location || t('pages.partners.form.dealer.sec_location')}
        </h5>
      </div>

      <div className="form-field-group">
        <label className="form-field-label">{partnerForm.dealer?.lbl_address || t('pages.partners.form.dealer.lbl_address')}<span className="form-field-required">*</span></label>
        <input type="text" required placeholder={partnerForm.dealer?.ph_address || t('pages.partners.form.dealer.ph_address')} className="form-field-input" value={formData.address || ''} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
      </div>

      <div className="form-grid-2">
        <div className="form-field-group">
          <label className="form-field-label">{partnerForm.dealer?.lbl_state || t('pages.partners.form.dealer.lbl_state')}<span className="form-field-required">*</span></label>
          <input type="text" required placeholder={partnerForm.dealer?.ph_state || t('pages.partners.form.dealer.ph_state')} className="form-field-input" value={formData.state || ''} onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
        </div>
        <div className="form-field-group">
          <label className="form-field-label">{partnerForm.dealer?.lbl_city || t('pages.partners.form.dealer.lbl_city')}<span className="form-field-required">*</span></label>
          <input type="text" required placeholder={partnerForm.dealer?.ph_city || t('pages.partners.form.dealer.ph_city')} className="form-field-input" value={formData.city || ''} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
        </div>
      </div>

      {/* Section 3 */}
      <div className="form-section-header" style={{ marginTop: 'var(--sp-2)' }}>
        <h5 className="form-section-title">
          <span className="form-section-accent"></span>
          {partnerForm.dealer?.sec_profile || t('pages.partners.form.dealer.sec_profile')}
        </h5>
      </div>

      <div className="form-grid-2">
        <div className="form-field-group">
          <label className="form-field-label">{partnerForm.dealer?.lbl_products_sold || t('pages.partners.form.dealer.lbl_products_sold')}<span className="form-field-required">*</span></label>
          <select required className="form-field-select" value={formData.currentProducts || ''} onChange={(e) => setFormData({ ...formData, currentProducts: e.target.value })}>
            <option value="">{partnerForm.dealer?.opt_select_business || t('pages.partners.form.dealer.opt_select_business')}</option>
            <option value="seeds">{partnerForm.dealer?.opt_seeds || t('pages.partners.form.dealer.opt_seeds')}</option>
            <option value="fertilizers">{partnerForm.dealer?.opt_fertilizers || t('pages.partners.form.dealer.opt_fertilizers')}</option>
            <option value="all">{partnerForm.dealer?.opt_all || t('pages.partners.form.dealer.opt_all')}</option>
            <option value="none">{partnerForm.dealer?.opt_none || t('pages.partners.form.dealer.opt_none')}</option>
          </select>
        </div>
        <div className="form-field-group">
          <label className="form-field-label">{partnerForm.dealer?.lbl_volume || t('pages.partners.form.dealer.lbl_volume')}</label>
          <input type="text" placeholder={partnerForm.dealer?.ph_volume || t('pages.partners.form.dealer.ph_volume')} className="form-field-input" value={formData.volume || ''} onChange={(e) => setFormData({ ...formData, volume: e.target.value })} />
        </div>
      </div>

      <div className="form-field-group">
        <label className="form-field-label">{partnerForm.dealer?.lbl_message || t('pages.partners.form.dealer.lbl_message')}</label>
        <textarea rows="3" placeholder={partnerForm.dealer?.ph_message || t('pages.partners.form.dealer.ph_message')} className="form-field-textarea" value={formData.message || ''} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
      </div>
    </div>
  );

  const renderDistributorForm = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
      {/* Section 1 */}
      <div className="form-section-header">
        <h5 className="form-section-title">
          <span className="form-section-accent"></span>
          {partnerForm.distributor?.sec_contact || t('pages.partners.form.distributor.sec_contact')}
        </h5>
      </div>
      
      <div className="form-grid-2">
        <div className="form-field-group">
          <label className="form-field-label">{partnerForm.distributor?.lbl_fullname || t('pages.partners.form.distributor.lbl_fullname')}<span className="form-field-required">*</span></label>
          <input type="text" required placeholder={partnerForm.distributor?.ph_fullname || t('pages.partners.form.distributor.ph_fullname')} className="form-field-input" value={formData.fullName || ''} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
        </div>
        <div className="form-field-group">
          <label className="form-field-label">{partnerForm.distributor?.lbl_companyname || t('pages.partners.form.distributor.lbl_companyname')}<span className="form-field-required">*</span></label>
          <input type="text" required placeholder={partnerForm.distributor?.ph_companyname || t('pages.partners.form.distributor.ph_companyname')} className="form-field-input" value={formData.companyName || ''} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} />
        </div>
      </div>

      <div className="form-grid-2">
        <div className="form-field-group">
          <label className="form-field-label">{partnerForm.distributor?.lbl_phone || t('pages.partners.form.distributor.lbl_phone')}<span className="form-field-required">*</span></label>
          <input type="tel" required placeholder={partnerForm.distributor?.ph_phone || t('pages.partners.form.distributor.ph_phone')} className="form-field-input" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
        </div>
        <div className="form-field-group">
          <label className="form-field-label">{partnerForm.distributor?.lbl_email || t('pages.partners.form.distributor.lbl_email')}<span className="form-field-required">*</span></label>
          <input type="email" required placeholder={partnerForm.distributor?.ph_email || t('pages.partners.form.distributor.ph_email')} className="form-field-input" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </div>
      </div>

      {/* Section 2 */}
      <div className="form-section-header" style={{ marginTop: 'var(--sp-2)' }}>
        <h5 className="form-section-title">
          <span className="form-section-accent"></span>
          {partnerForm.distributor?.sec_statutory || t('pages.partners.form.distributor.sec_statutory')}
        </h5>
      </div>

      <div className="form-grid-2">
        <div className="form-field-group">
          <label className="form-field-label">{partnerForm.distributor?.lbl_gst || t('pages.partners.form.distributor.lbl_gst')}<span className="form-field-required">*</span></label>
          <input type="text" required placeholder={partnerForm.distributor?.ph_gst || t('pages.partners.form.distributor.ph_gst')} className="form-field-input" value={formData.gstNo || ''} onChange={(e) => setFormData({ ...formData, gstNo: e.target.value })} />
        </div>
        <div className="form-field-group">
          <label className="form-field-label">{partnerForm.distributor?.lbl_turnover || t('pages.partners.form.distributor.lbl_turnover')}<span className="form-field-required">*</span></label>
          <input type="text" required placeholder={partnerForm.distributor?.ph_turnover || t('pages.partners.form.distributor.ph_turnover')} className="form-field-input" value={formData.turnover || ''} onChange={(e) => setFormData({ ...formData, turnover: e.target.value })} />
        </div>
      </div>

      {/* Section 3 */}
      <div className="form-section-header" style={{ marginTop: 'var(--sp-2)' }}>
        <h5 className="form-section-title">
          <span className="form-section-accent"></span>
          {partnerForm.distributor?.sec_infrastructure || t('pages.partners.form.distributor.sec_infrastructure')}
        </h5>
      </div>

      <div className="form-field-group">
        <label className="form-field-label">{partnerForm.distributor?.lbl_territory || t('pages.partners.form.distributor.lbl_territory')}<span className="form-field-required">*</span></label>
        <input type="text" required placeholder={partnerForm.distributor?.ph_territory || t('pages.partners.form.distributor.ph_territory')} className="form-field-input" value={formData.territory || ''} onChange={(e) => setFormData({ ...formData, territory: e.target.value })} />
      </div>

      <div className="form-grid-2">
        <div className="form-field-group">
          <label className="form-field-label">{partnerForm.distributor?.lbl_warehouse || t('pages.partners.form.distributor.lbl_warehouse')}<span className="form-field-required">*</span></label>
          <input type="text" required placeholder={partnerForm.distributor?.ph_warehouse || t('pages.partners.form.distributor.ph_warehouse')} className="form-field-input" value={formData.warehouse || ''} onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })} />
        </div>
        <div className="form-field-group">
          <label className="form-field-label">{partnerForm.distributor?.lbl_experience || t('pages.partners.form.distributor.lbl_experience')}<span className="form-field-required">*</span></label>
          <input type="number" required placeholder={partnerForm.distributor?.ph_experience || t('pages.partners.form.distributor.ph_experience')} className="form-field-input" value={formData.experience || ''} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} />
        </div>
      </div>

      <div className="form-field-group">
        <label className="form-field-label">{partnerForm.distributor?.lbl_address || t('pages.partners.form.distributor.lbl_address')}<span className="form-field-required">*</span></label>
        <input type="text" required placeholder={partnerForm.distributor?.ph_address || t('pages.partners.form.distributor.ph_address')} className="form-field-input" value={formData.address || ''} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
      </div>

      <div className="form-field-group">
        <label className="form-field-label">{partnerForm.distributor?.lbl_message || t('pages.partners.form.distributor.lbl_message')}</label>
        <textarea rows="3" placeholder={partnerForm.distributor?.ph_message || t('pages.partners.form.distributor.ph_message')} className="form-field-textarea" value={formData.message || ''} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
      </div>
    </div>
  );

  const renderExportForm = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
      {/* Section 1 */}
      <div className="form-section-header">
        <h5 className="form-section-title">
          <span className="form-section-accent"></span>
          {partnerForm.export?.sec_profile || t('pages.partners.form.export.sec_profile')}
        </h5>
      </div>
      
      <div className="form-grid-2">
        <div className="form-field-group">
          <label className="form-field-label">{partnerForm.export?.lbl_fullname || t('pages.partners.form.export.lbl_fullname')}<span className="form-field-required">*</span></label>
          <input type="text" required placeholder={partnerForm.export?.ph_fullname || t('pages.partners.form.export.ph_fullname')} className="form-field-input" value={formData.fullName || ''} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
        </div>
        <div className="form-field-group">
          <label className="form-field-label">{partnerForm.export?.lbl_companyname || t('pages.partners.form.export.lbl_companyname')}<span className="form-field-required">*</span></label>
          <input type="text" required placeholder={partnerForm.export?.ph_companyname || t('pages.partners.form.export.ph_companyname')} className="form-field-input" value={formData.companyName || ''} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} />
        </div>
      </div>

      <div className="form-grid-2">
        <div className="form-field-group">
          <label className="form-field-label">{partnerForm.export?.lbl_phone || t('pages.partners.form.export.lbl_phone')}<span className="form-field-required">*</span></label>
          <input type="tel" required placeholder={partnerForm.export?.ph_phone || t('pages.partners.form.export.ph_phone')} className="form-field-input" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
        </div>
        <div className="form-field-group">
          <label className="form-field-label">{partnerForm.export?.lbl_email || t('pages.partners.form.export.lbl_email')}<span className="form-field-required">*</span></label>
          <input type="email" required placeholder={partnerForm.export?.ph_email || t('pages.partners.form.export.ph_email')} className="form-field-input" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </div>
      </div>

      {/* Section 2 */}
      <div className="form-section-header" style={{ marginTop: 'var(--sp-2)' }}>
        <h5 className="form-section-title">
          <span className="form-section-accent"></span>
          {partnerForm.export?.sec_markets || t('pages.partners.form.export.sec_markets')}
        </h5>
      </div>

      <div className="form-grid-2">
        <div className="form-field-group">
          <label className="form-field-label">{partnerForm.export?.lbl_country || t('pages.partners.form.export.lbl_country')}<span className="form-field-required">*</span></label>
          <input type="text" required placeholder={partnerForm.export?.ph_country || t('pages.partners.form.export.ph_country')} className="form-field-input" value={formData.country || ''} onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
        </div>
        <div className="form-field-group">
          <label className="form-field-label">{partnerForm.export?.lbl_target || t('pages.partners.form.export.lbl_target')}<span className="form-field-required">*</span></label>
          <input type="text" required placeholder={partnerForm.export?.ph_target || t('pages.partners.form.export.ph_target')} className="form-field-input" value={formData.targetCountries || ''} onChange={(e) => setFormData({ ...formData, targetCountries: e.target.value })} />
        </div>
      </div>

      {/* Section 3 */}
      <div className="form-section-header" style={{ marginTop: 'var(--sp-2)' }}>
        <h5 className="form-section-title">
          <span className="form-section-accent"></span>
          {partnerForm.export?.sec_order || t('pages.partners.form.export.sec_order')}
        </h5>
      </div>

      <div className="form-field-group">
        <label className="form-field-label">{partnerForm.export?.lbl_products || t('pages.partners.form.export.lbl_products')}<span className="form-field-required">*</span></label>
        <select required className="form-field-select" value={formData.productsOfInterest || ''} onChange={(e) => setFormData({ ...formData, productsOfInterest: e.target.value })}>
          <option value="">{partnerForm.export?.opt_select_category || t('pages.partners.form.export.opt_select_category')}</option>
          <option value="bio_fertilizers">{partnerForm.export?.opt_bio_fertilizers || t('pages.partners.form.export.opt_bio_fertilizers')}</option>
          <option value="bio_insecticides">{partnerForm.export?.opt_bio_insecticides || t('pages.partners.form.export.opt_bio_insecticides')}</option>
          <option value="biostimulants">{partnerForm.export?.opt_biostimulants || t('pages.partners.form.export.opt_biostimulants')}</option>
          <option value="micronutrients">{partnerForm.export?.opt_micronutrients || t('pages.partners.form.export.opt_micronutrients')}</option>
          <option value="custom">{partnerForm.export?.opt_custom || t('pages.partners.form.export.opt_custom')}</option>
        </select>
      </div>

      <div className="form-grid-2">
        <div className="form-field-group">
          <label className="form-field-label">{partnerForm.export?.lbl_volume || t('pages.partners.form.export.lbl_volume')}<span className="form-field-required">*</span></label>
          <input type="text" required placeholder={partnerForm.export?.ph_volume || t('pages.partners.form.export.ph_volume')} className="form-field-input" value={formData.volume || ''} onChange={(e) => setFormData({ ...formData, volume: e.target.value })} />
        </div>
        <div className="form-field-group">
          <label className="form-field-label">{partnerForm.export?.lbl_regulatory || t('pages.partners.form.export.lbl_regulatory')}<span className="form-field-required">*</span></label>
          <select required className="form-field-select" value={formData.regulatorySupport || ''} onChange={(e) => setFormData({ ...formData, regulatorySupport: e.target.value })}>
            <option value="">{partnerForm.export?.opt_select_regulatory || t('pages.partners.form.export.opt_select_regulatory')}</option>
            <option value="yes">{partnerForm.export?.opt_reg_yes || t('pages.partners.form.export.opt_reg_yes')}</option>
            <option value="no">{partnerForm.export?.opt_reg_no || t('pages.partners.form.export.opt_reg_no')}</option>
            <option value="maybe">{partnerForm.export?.opt_reg_maybe || t('pages.partners.form.export.opt_reg_maybe')}</option>
          </select>
        </div>
      </div>

      <div className="form-field-group">
        <label className="form-field-label">{partnerForm.export?.lbl_message || t('pages.partners.form.export.lbl_message')}</label>
        <textarea rows="3" placeholder={partnerForm.export?.ph_message || t('pages.partners.form.export.ph_message')} className="form-field-textarea" value={formData.message || ''} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
      </div>
    </div>
  );

  return (
    <GenericPage title={partnerPage.title || t('pages.partners.title')} overline={partnerPage.overline || t('pages.partners.overline')} subtitle={partnerPage.subtitle || t('pages.partners.subtitle')} breadcrumbs={[{ label: partnerPage.title || t('pages.partners.title') }]}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .hover-bg-light:hover {
          background: #f5f5f5;
          color: var(--clr-text-body) !important;
        }
        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-4);
        }
        .modal-form-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--sp-6) var(--sp-8);
          border-bottom: 1px solid var(--clr-border-light);
        }
        .modal-form-body {
          padding: var(--sp-8);
        }
        @media (max-width: 600px) {
          .form-grid-2 {
            grid-template-columns: 1fr;
            gap: var(--sp-3);
          }
          .modal-form-header {
            padding: var(--sp-4) var(--sp-5);
          }
          .modal-form-body {
            padding: var(--sp-5);
          }
        }
        
        /* ── Professional Form Custom Styles ── */
        .form-section-header {
          border-bottom: 1.5px solid rgba(46, 125, 50, 0.12);
          padding-bottom: var(--sp-1.5);
          margin-bottom: var(--sp-4);
          margin-top: var(--sp-4);
        }
        .form-section-title {
          color: var(--clr-primary-dark);
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 0;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: var(--sp-2);
        }
        .form-section-accent {
          width: 4px;
          height: 14px;
          background: var(--clr-primary);
          border-radius: var(--radius-sm);
          display: inline-block;
        }
        .form-field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-field-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: var(--clr-text-primary);
          margin-bottom: 2px;
          letter-spacing: 0.01em;
        }
        .form-field-required {
          color: var(--clr-error);
          font-weight: bold;
          margin-left: 2px;
        }
        .form-field-input,
        .form-field-select,
        .form-field-textarea {
          width: 100%;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          border: 1.5px solid #d0d0d0;
          font-size: var(--fs-body-sm);
          background: #ffffff;
          color: var(--clr-text-primary);
          transition: all var(--duration-fast) var(--ease-out);
          outline: none;
          box-sizing: border-box;
          font-family: inherit;
        }
        .form-field-input:hover,
        .form-field-select:hover,
        .form-field-textarea:hover {
          border-color: var(--clr-primary-lighter);
          background: #fdfdfd;
        }
        .form-field-input:focus,
        .form-field-select:focus,
        .form-field-textarea:focus {
          border-color: var(--clr-primary);
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(46, 125, 50, 0.12);
        }
        .form-field-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .why-partner-hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 0;
          position: relative;
        }
        .why-partner-text-container {
          padding: var(--sp-12);
          position: relative;
          z-index: 2;
        }
        .why-partner-title {
          color: white !important;
          margin-bottom: var(--sp-8);
          font-size: var(--fs-h2);
          font-weight: var(--fw-bold);
        }
        .why-partner-features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--sp-8);
        }
        .why-partner-feature-card {
          display: flex;
          align-items: flex-start;
          gap: var(--sp-4);
          text-align: left;
        }
        .why-partner-feature-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
          transition: background var(--duration-fast);
        }
        .why-partner-feature-card:hover .why-partner-feature-icon {
          background: rgba(255,255,255,0.20);
        }
        .why-partner-feature-text {
          flex: 1;
        }
        .why-partner-feature-title {
          color: white !important;
          font-size: var(--fs-body);
          font-weight: var(--fw-semibold);
          margin-bottom: var(--sp-1.5) !important;
          margin-top: 0;
        }
        .why-partner-feature-desc {
          color: rgba(255,255,255,0.8);
          font-size: var(--fs-body-sm);
          line-height: 1.5;
          margin: 0;
        }
        .why-partner-image-wrapper {
          position: relative;
          height: 100%;
          min-height: 400px;
          z-index: 1;
        }
        .why-partner-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, var(--clr-primary), transparent);
          z-index: 2;
        }
        @media (max-width: 991px) {
          .why-partner-hero-grid {
            grid-template-columns: 1fr;
          }
          .why-partner-text-container {
            padding: var(--sp-8) !important;
            z-index: 3;
          }
          .why-partner-title {
            margin-bottom: var(--sp-6);
          }
          .why-partner-image-wrapper {
            position: absolute !important;
            inset: 0;
            width: 100% !important;
            height: 100% !important;
            min-height: unset !important;
            z-index: 1 !important;
          }
          .why-partner-image-overlay {
            background: linear-gradient(135deg, rgba(27, 94, 32, 0.96) 0%, rgba(46, 125, 50, 0.90) 60%, rgba(56, 142, 60, 0.75) 100%) !important;
            z-index: 2;
          }
        }
        @media (max-width: 600px) {
          .why-partner-text-container {
            padding: var(--sp-6) var(--sp-4) !important;
          }
          .why-partner-features-grid {
            grid-template-columns: 1fr;
            gap: var(--sp-5);
          }
          .why-partner-feature-card {
            gap: var(--sp-3);
          }
        }
      `}</style>

      <div className="container">
        {/* Partnership Types */}
        <div className="grid-3" style={{ marginBottom: 'var(--sp-16)' }}>
          {types.map((type, i) => (
            <AnimatedSection key={i}>
              <div
                className="card hover-lift"
                role="button"
                tabIndex={0}
                onClick={() => openModal(type.key)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(type.key);
                  }
                }}
                style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }}
              >
                <div style={{ width: '100%', height: 200, overflow: 'hidden', position: 'relative' }}>
                  <img src={typeImages[type.key]} alt={partnerReasons[type.key]?.title || t(`pages_details.partners.reasons.${type.key}.title`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, transparent 60%, ${type.color}40)` }}></div>
                </div>
                <div style={{ padding: 'var(--sp-8)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-lg)', background: `${type.color}15`, color: type.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--sp-5)', marginTop: '-44px', position: 'relative', zIndex: 2, border: '4px solid white', boxShadow: 'var(--shadow-md)' }}>{type.icon}</div>
                  <h3 style={{ marginBottom: 'var(--sp-3)' }}>{partnerReasons[type.key]?.title || t(`pages_details.partners.reasons.${type.key}.title`)}</h3>
                  <p style={{ color: 'var(--clr-text-muted)', fontSize: 'var(--fs-body-sm)', marginBottom: 'var(--sp-5)' }}>{partnerReasons[type.key]?.desc || t(`pages_details.partners.reasons.${type.key}.desc`)}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)', marginBottom: 'var(--sp-6)', flex: 1 }}>
                    {(Array.isArray(partnerReasons[type.key]?.benefits) ? partnerReasons[type.key].benefits : (Array.isArray(t(`pages_details.partners.reasons.${type.key}.benefits`, { returnObjects: true })) ? t(`pages_details.partners.reasons.${type.key}.benefits`, { returnObjects: true }) : [])).map((b, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', fontSize: 'var(--fs-body-sm)' }}>
                        <CheckCircle size={14} style={{ color: type.color, flexShrink: 0 }} /> {b}
                      </div>
                    ))}
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); openModal(type.key); }} className="btn btn-primary" style={{ width: '100%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    {t('pages.partners.apply_now', 'Apply Now')} <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Why Partner */}
        <AnimatedSection>
          <div style={{ background: 'var(--gradient-hero)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', color: 'white', position: 'relative' }}>
            <div className="why-partner-hero-grid">
              <div className="why-partner-text-container">
                <h2 className="why-partner-title">{partnerPage.why_partner || t('pages.partners.why_partner', 'Why Partner with Jay Agritech?')}</h2>
                <div className="why-partner-features-grid">
                  {[
                    { key: 'market', icon: <TrendingUp size={20} /> },
                    { key: 'quality', icon: <Award size={20} /> },
                    { key: 'support', icon: <Headphones size={20} /> },
                    { key: 'brand', icon: <Users size={20} /> },
                  ].map((item, i) => (
                    <div key={i} className="why-partner-feature-card">
                      <div className="why-partner-feature-icon">{item.icon}</div>
                      <div className="why-partner-feature-text">
                        <h4 className="why-partner-feature-title">{partnerReasons[item.key]?.title || t(`pages_details.partners.reasons.${item.key}.title`)}</h4>
                        <p className="why-partner-feature-desc">{partnerReasons[item.key]?.desc || t(`pages_details.partners.reasons.${item.key}.desc`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="why-partner-image-wrapper">
                <img src={imgHero} alt="Partnership" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="why-partner-image-overlay"></div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Form Modals */}
      {activeModal && (
        <div style={modalOverlayStyle} onClick={() => setActiveModal(null)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="modal-form-header">
              <div>
                <span style={{ fontSize: 'var(--fs-caption)', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--clr-primary)', fontWeight: 600 }}>
                  {activeModal === 'dealer' 
                    ? (partnerForm.dealer?.program_name || t('pages.partners.form.dealer.program_name')) 
                    : activeModal === 'distributor' 
                      ? (partnerForm.distributor?.program_name || t('pages.partners.form.distributor.program_name')) 
                      : (partnerForm.export?.program_name || t('pages.partners.form.export.program_name'))}
                </span>
                <h3 style={{ margin: 0, color: 'var(--clr-primary-dark)' }}>
                  {activeModal === 'dealer' 
                    ? (partnerForm.dealer?.modal_title || t('pages.partners.form.dealer.modal_title')) 
                    : activeModal === 'distributor' 
                      ? (partnerForm.distributor?.modal_title || t('pages.partners.form.distributor.modal_title')) 
                      : (partnerForm.export?.modal_title || t('pages.partners.form.export.modal_title'))}
                </h3>
              </div>
              <button onClick={() => setActiveModal(null)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--clr-text-muted)', display: 'flex', alignItems: 'center', padding: 'var(--sp-2)', borderRadius: '50%', transition: 'background 0.2s' }} className="hover-bg-light">
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit} className="modal-form-body">
              {formSubmitted ? (
                <div style={{ textAlign: 'center', padding: 'var(--sp-6) 0' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--clr-primary-lighter)', color: 'var(--clr-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--sp-5)', animation: 'scaleIn 0.3s' }}>
                    <Check size={32} />
                  </div>
                  <h3 style={{ color: 'var(--clr-primary-dark)', marginBottom: 'var(--sp-2)' }}>
                    {partnerForm.success_title || t('pages.partners.form.success_title')}
                  </h3>
                  <p style={{ color: 'var(--clr-text-body)', fontSize: 'var(--fs-body)', marginBottom: 'var(--sp-6)', lineHeight: 1.6 }}>
                    {partnerForm.success_desc || t('pages.partners.form.success_desc')}
                  </p>
                  <button type="button" onClick={() => setActiveModal(null)} className="btn btn-primary" style={{ minWidth: 160 }}>
                    {partnerForm.close_btn || t('pages.partners.form.close_btn')}
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
                  <p style={{ margin: 0, color: 'var(--clr-text-muted)', fontSize: 'var(--fs-body-sm)', lineHeight: 1.5 }}>
                    {partnerForm.mandatory_notice || t('pages.partners.form.mandatory_notice')}
                  </p>
                  
                  {activeModal === 'dealer' && renderDealerForm()}
                  {activeModal === 'distributor' && renderDistributorForm()}
                  {activeModal === 'export' && renderExportForm()}

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--sp-4)', marginTop: 'var(--sp-2)', borderTop: '1px solid var(--clr-border-light)', paddingTop: 'var(--sp-6)' }}>
                    <button type="button" onClick={() => setActiveModal(null)} className="btn" style={{ background: '#f5f5f5', color: 'var(--clr-text-body)', border: 'none', cursor: 'pointer', padding: '10px 20px', borderRadius: 'var(--radius-md)', fontWeight: 600 }}>
                      {partnerForm.cancel_btn || t('pages.partners.form.cancel_btn')}
                    </button>
                    <button type="submit" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer' }}>
                      {partnerForm.submit_btn || t('pages.partners.form.submit_btn')} <Send size={16} />
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </GenericPage>
  );
}
