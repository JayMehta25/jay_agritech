import { Link } from 'react-router-dom';
import {
  MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube,
  ArrowRight, Leaf, Send
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { companyInfo, products } from '../../data/siteData';
import logoImg from '../../assets/new_title.png';
import titleImg from '../../assets/title_bg.png';
import './Footer.css';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      {/* CTA Banner */}
      <div className="footer-cta">
        <div className="container">
          <div className="footer-cta-inner">
            <div className="footer-cta-content">
              <h2>{t('footer.cta_title')}</h2>
              <p>{t('footer.cta_desc')}</p>
            </div>
            <div className="footer-cta-actions">
              <Link to="/contact" className="btn btn-gold btn-lg">
                {t('footer.get_in_touch')} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <img src={logoImg} alt="Jay Agritech Logo" className="logo-icon-img" />
                <img src={titleImg} alt="Jay Agritech" className="logo-title-img footer-title-img" />
              </Link>
              <p className="footer-description">
                {t('footer.description', 'Pioneering biological and organic agricultural solutions for sustainable farming. Science-backed products trusted by farmers across India.')}
              </p>
              <div className="footer-certifications">
                {companyInfo.certifications.slice(0, 3).map((cert) => (
                  <span key={cert} className="footer-cert-badge">✓ {cert}</span>
                ))}
              </div>
              <div className="footer-social">
                <a href="#" className="social-link" aria-label="Facebook"><Facebook size={18} /></a>
                <a href="#" className="social-link" aria-label="Twitter"><Twitter size={18} /></a>
                <a href="#" className="social-link" aria-label="Instagram"><Instagram size={18} /></a>
                <a href="#" className="social-link" aria-label="LinkedIn"><Linkedin size={18} /></a>
                <a href="#" className="social-link" aria-label="YouTube"><Youtube size={18} /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-links-group">
              <h4>{t('footer.company')}</h4>
              <ul>
                <li><Link to="/about">{t('nav.about')}</Link></li>
                <li><Link to="/about/leadership">{t('nav.links.leadership_team')}</Link></li>
                <li><Link to="/about/manufacturing">{t('nav.links.manufacturing')}</Link></li>
                <li><Link to="/about/certifications">{t('nav.links.certifications')}</Link></li>
                <li><Link to="/careers">{t('footer.careers', 'Careers')}</Link></li>
              </ul>
            </div>

            {/* Products */}
            <div className="footer-links-group">
              <h4>{t('footer.products')}</h4>
              <ul>
                {products.categories.map((cat) => (
                  <li key={cat.id}><Link to={`/products/${cat.slug}`}>{t(cat.nameKey, cat.name)}</Link></li>
                ))}
                <li><Link to="/products">{t('nav.links.all_products')} →</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="footer-links-group">
              <h4>{t('footer.resources')}</h4>
              <ul>
                <li><Link to="/blog">{t('footer.knowledge_hub', 'Knowledge Hub')}</Link></li>
                <li><Link to="/case-studies">{t('footer.case_studies', 'Case Studies')}</Link></li>
                <li><Link to="/business">{t('nav.business')}</Link></li>
                <li><Link to="/growth-system">{t('footer.growth_system', 'Growth System')}</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-contact">
              <h4>{t('footer.contact_us')}</h4>
              <div className="footer-contact-items">
                <div className="footer-contact-item">
                  <MapPin size={16} />
                  <span>{t('footer.contact_address', 'Valsad, Gujarat 396001, India')}</span>
                </div>
                <div className="footer-contact-item">
                  <Phone size={16} />
                  <a href="tel:+919825142359">+91 98251 42359</a>
                </div>
                <div className="footer-contact-item">
                  <Mail size={16} />
                  <a href="mailto:info@jayagritech.com">info@jayagritech.com</a>
                </div>
              </div>

              {/* Newsletter */}
              <div className="footer-newsletter">
                <h5>{t('footer.newsletter_title', 'Subscribe to Updates')}</h5>
                <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                  <input type="email" placeholder={t('footer.newsletter_placeholder', 'Your email')} className="newsletter-input" />
                  <button type="submit" className="newsletter-btn" aria-label={t('footer.subscribe', 'Subscribe')}>
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>{t('footer.copyright', `© ${currentYear} Jay Agritech Pvt. Ltd. All rights reserved.`)}</p>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy">{t('footer.privacy_policy', 'Privacy Policy')}</Link>
            <span>·</span>
            <Link to="/terms">{t('footer.terms_conditions', 'Terms & Conditions')}</Link>
            <span>·</span>
            <Link to="/about/sustainability">{t('nav.links.sustainability')}</Link>
          </div>
          <p className="footer-made">
            <Leaf size={14} /> {t('footer.made_with_care', 'Made with care for Indian agriculture')}
          </p>
        </div>
      </div>
    </footer>
  );
}
