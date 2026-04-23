import { Link } from 'react-router-dom';
import {
  MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube,
  ArrowRight, Leaf, Send
} from 'lucide-react';
import { companyInfo, products } from '../../data/siteData';
import logoImg from '../../assets/new_title.png';
import titleImg from '../../assets/title_bg.png';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      {/* CTA Banner */}
      <div className="footer-cta">
        <div className="container">
          <div className="footer-cta-inner">
            <div className="footer-cta-content">
              <h2>Ready to Transform Your Agriculture?</h2>
              <p>Join 500+ partners growing with Jay Agritech's innovative biological solutions.</p>
            </div>
            <div className="footer-cta-actions">
              <Link to="/contact" className="btn btn-gold btn-lg">
                Get in Touch <ArrowRight size={18} />
              </Link>
              <Link to="/products" className="btn btn-secondary btn-lg" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
                View Products
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
                Pioneering biological and organic agricultural solutions for sustainable farming.
                Science-backed products trusted by farmers across India.
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
              <h4>Company</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/about/leadership">Leadership</Link></li>
                <li><Link to="/about/manufacturing">Manufacturing</Link></li>
                <li><Link to="/about/certifications">Certifications</Link></li>
                <li><Link to="/research">R&D Center</Link></li>
                <li><Link to="/careers">Careers</Link></li>
              </ul>
            </div>

            {/* Products */}
            <div className="footer-links-group">
              <h4>Products</h4>
              <ul>
                {products.categories.map((cat) => (
                  <li key={cat.id}><Link to={`/products/${cat.slug}`}>{cat.name}</Link></li>
                ))}
                <li><Link to="/products">All Products →</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="footer-links-group">
              <h4>Resources</h4>
              <ul>
                <li><Link to="/farmer-zone">Farmer Zone</Link></li>
                <li><Link to="/blog">Knowledge Hub</Link></li>
                <li><Link to="/case-studies">Case Studies</Link></li>
                <li><Link to="/farmer-zone/crop-solutions">Crop Solutions</Link></li>
                <li><Link to="/partners">Partners</Link></li>
                <li><Link to="/growth-system">Growth System</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-contact">
              <h4>Get in Touch</h4>
              <div className="footer-contact-items">
                <div className="footer-contact-item">
                  <MapPin size={16} />
                  <span>Valsad, Gujarat 396001, India</span>
                </div>
                <div className="footer-contact-item">
                  <Phone size={16} />
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </div>
                <div className="footer-contact-item">
                  <Mail size={16} />
                  <a href="mailto:info@jayagritech.com">info@jayagritech.com</a>
                </div>
              </div>

              {/* Newsletter */}
              <div className="footer-newsletter">
                <h5>Subscribe to Updates</h5>
                <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                  <input type="email" placeholder="Your email" className="newsletter-input" />
                  <button type="submit" className="newsletter-btn" aria-label="Subscribe">
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
          <p>© {currentYear} Jay Agritech Pvt. Ltd. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span>·</span>
            <Link to="/terms">Terms & Conditions</Link>
            <span>·</span>
            <Link to="/about/sustainability">Sustainability</Link>
          </div>
          <p className="footer-made">
            <Leaf size={14} /> Made with care for Indian agriculture
          </p>
        </div>
      </div>
    </footer>
  );
}
