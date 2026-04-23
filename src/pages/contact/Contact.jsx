import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Building } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import GenericPage from '../../components/ui/GenericPage';

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  return (
    <GenericPage title="Contact Us" subtitle="Get in touch with our team. We're here to help with product inquiries, partnerships, and support." breadcrumbs={[{ label: 'Contact' }]}>
      <div className="container">
        <div className="grid-2" style={{ gap: 'var(--sp-12)', alignItems: 'start' }}>
          {/* Contact Info */}
          <AnimatedSection>
            <div>
              <h2 style={{ marginBottom: 'var(--sp-6)' }}>Let's Talk Agriculture</h2>
              <p style={{ color: 'var(--clr-text-muted)', marginBottom: 'var(--sp-8)', lineHeight: 'var(--lh-loose)' }}>
                Whether you're a farmer looking for the right product, a distributor interested in partnership, 
                or a researcher seeking collaboration — we'd love to hear from you.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)', marginBottom: 'var(--sp-8)' }}>
                {[
                  { icon: <Building size={20} />, label: 'Head Office', value: 'Jay Agritech Pvt. Ltd.\nValsad, Gujarat 396001, India' },
                  { icon: <Phone size={20} />, label: 'Phone', value: '+91 98765 43210' },
                  { icon: <Mail size={20} />, label: 'Email', value: 'info@jayagritech.com' },
                  { icon: <Clock size={20} />, label: 'Working Hours', value: 'Mon - Sat: 9:00 AM - 6:00 PM' },
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
              
              {/* Map placeholder */}
              <div style={{ aspectRatio: '16/9', background: 'var(--clr-off-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--clr-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--sp-2)', color: 'var(--clr-text-muted)' }}>
                <MapPin size={24} /> <span>Valsad, Gujarat — Map View</span>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Contact Form */}
          <AnimatedSection>
            <div className="card" style={{ padding: 'var(--sp-8)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: 'var(--sp-12)' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--clr-primary-surface)', color: 'var(--clr-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--sp-4)' }}><Send size={28} /></div>
                  <h3 style={{ marginBottom: 'var(--sp-3)' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--clr-text-muted)' }}>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="btn btn-secondary" style={{ marginTop: 'var(--sp-6)' }}>Send Another</button>
                </div>
              ) : (
                <>
                  <h3 style={{ marginBottom: 'var(--sp-6)' }}>Send us a Message</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group"><label className="form-label">Full Name *</label><input name="name" value={formData.name} onChange={handleChange} className="form-input" required placeholder="Your full name" /></div>
                    <div className="grid-2" style={{ gap: 'var(--sp-4)' }}>
                      <div className="form-group"><label className="form-label">Email *</label><input name="email" type="email" value={formData.email} onChange={handleChange} className="form-input" required placeholder="your@email.com" /></div>
                      <div className="form-group"><label className="form-label">Phone</label><input name="phone" value={formData.phone} onChange={handleChange} className="form-input" placeholder="+91 XXXXX XXXXX" /></div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Subject *</label>
                      <select name="subject" value={formData.subject} onChange={handleChange} className="form-select" required>
                        <option value="">Select a topic</option>
                        <option value="product">Product Inquiry</option>
                        <option value="partnership">Partnership / Dealer</option>
                        <option value="bulk">Bulk Order</option>
                        <option value="technical">Technical Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="form-group"><label className="form-label">Message *</label><textarea name="message" value={formData.message} onChange={handleChange} className="form-textarea" required placeholder="Tell us how we can help..."></textarea></div>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>Send Message <Send size={16} /></button>
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
