import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Building } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import GenericPage from '../../components/ui/GenericPage';
import { useTranslation } from 'react-i18next';

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'contact',
        data: formData
      })
    }).catch(err => console.error('Error sending contact email:', err));

    setSubmitted(true);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <GenericPage title={t('pages.contact.title')} subtitle={t('pages.contact.subtitle')} breadcrumbs={[{ label: t('nav.contact') }]}>
      <div className="container">
        <div className="grid-2" style={{ gap: 'var(--sp-12)', alignItems: 'stretch' }}>
          <AnimatedSection style={{ height: '100%' }}>
            <div>
              <h2 style={{ marginBottom: 'var(--sp-6)' }}>{t('pages_details.contact.lets_talk')}</h2>
              <p style={{ color: 'var(--clr-text-muted)', marginBottom: 'var(--sp-8)', lineHeight: 'var(--lh-loose)' }}>{t('pages_details.contact.description')}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)', marginBottom: 'var(--sp-8)' }}>
                {[
                  { icon: <Building size={20} />, label: t('contact.location'), value: t('pages_details.contact.location_label') },
                  { icon: <Phone size={20} />, label: t('common.phone', 'Phone'), value: '+91 98251 42359' },
                  { icon: <Mail size={20} />, label: t('common.email', 'Email'), value: 'info@jayagritech.com' },
                  { icon: <Clock size={20} />, label: t('contact.working_hours'), value: t('pages_details.contact.hours_label') },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 'var(--sp-4)', alignItems: 'flex-start' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--clr-primary-surface)', color: 'var(--clr-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <strong style={{ display: 'block', marginBottom: 2 }}>{item.label}</strong>
                      <span style={{ color: 'var(--clr-text-muted)', fontSize: 'var(--fs-body-sm)', whiteSpace: 'pre-line' }}>{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ width: '100%', height: '240px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--clr-border)', boxShadow: 'var(--shadow-sm)' }}>
                <iframe
                  title="Jay Agritech Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119743.76632483838!2d72.8465134707641!3d20.6087799581177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0c27941fb627d%3A0xe5a363ee00b89cfc!2sValsad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1716723223000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection style={{ height: '100%' }}>
            <div className="card" style={{ padding: 'var(--sp-8)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: 'var(--sp-12)' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--clr-primary-surface)', color: 'var(--clr-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--sp-4)' }}><Send size={28} /></div>
                  <h3 style={{ marginBottom: 'var(--sp-3)' }}>{t('pages_details.contact.message_sent_title')}</h3>
                  <p style={{ color: 'var(--clr-text-muted)' }}>{t('pages_details.contact.message_sent_desc')}</p>
                  <button onClick={() => setSubmitted(false)} className="btn btn-secondary" style={{ marginTop: 'var(--sp-6)' }}>{t('common.send_another', 'Send Another')}</button>
                </div>
              ) : (
                <>
                  <h3 style={{ marginBottom: 'var(--sp-6)' }}>{t('contact.get_in_touch_now')}</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">{t('contact.form_name')} *</label>
                      <input name="name" value={formData.name} onChange={handleChange} className="form-input" required placeholder={t('contact.form_name')} />
                    </div>
                    <div className="grid-2" style={{ gap: 'var(--sp-4)' }}>
                      <div className="form-group">
                        <label className="form-label">{t('contact.form_email')} *</label>
                        <input name="email" type="email" value={formData.email} onChange={handleChange} className="form-input" required placeholder={t('contact.form_email')} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">{t('contact.form_phone')}</label>
                        <input name="phone" value={formData.phone} onChange={handleChange} className="form-input" placeholder={t('contact.form_phone')} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('contact.form_subject')} *</label>
                      <select name="subject" value={formData.subject} onChange={handleChange} className="form-select" required>
                        <option value="">{t('common.select', 'Select a topic')}</option>
                        <option value="product">{t('pages_details.contact.form_options.product')}</option>
                        <option value="partnership">{t('pages_details.contact.form_options.partnership')}</option>
                        <option value="bulk">{t('pages_details.contact.form_options.bulk')}</option>
                        <option value="technical">{t('pages_details.contact.form_options.technical')}</option>
                        <option value="other">{t('pages_details.contact.form_options.other')}</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('contact.form_message')} *</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} className="form-textarea" required placeholder={t('contact.form_message')}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>{t('contact.send_message')} <Send size={16} /></button>
                  </form>
                </>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </GenericPage>
  );
}
