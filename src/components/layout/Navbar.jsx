import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Mail, Search, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { navLinks } from '../../data/siteData';
import logoImg from '../../assets/new_title.png';
import titleImg from '../../assets/title_bg.png';
import './Navbar.css';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const menuTimeoutRef = useRef(null);
  const langMenuRef = useRef(null);
  const location = useLocation();

  const languages = [
    { code: 'en', label: 'English', nativeChar: 'A' },
    { code: 'hi', label: 'Hindi', nativeChar: 'अ' },
    { code: 'zh', label: 'Mandarin', nativeChar: '文' }
  ];

  const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setShowLangMenu(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [location]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleMenuEnter = (label) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActiveMenu(label);
  };

  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => setActiveMenu(null), 300);
  };

  const isHomePage = location.pathname === '/';
  const navbarClass = `navbar ${isScrolled || !isHomePage ? 'navbar-solid' : 'navbar-transparent'}`;

  return (
    <>
      {/* Top bar */}
      <div className="topbar">
        <div className="container-wide topbar-content">
          <div className="topbar-left"></div>
          <div className="topbar-center">
            <span>🌱 {t('nav.tagline', 'Innovating Agriculture, Nurturing Growth')}</span>
          </div>
          <div className="topbar-right">
            <a href="tel:+919825142359"><Phone size={12} /> +91 98251 42359</a>
            <a href="mailto:info@jayagritech.com"><Mail size={12} /> info@jayagritech.com</a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={navbarClass} id="main-navbar">
        <div className="container-wide navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo" id="nav-logo">
            <img src={logoImg} alt="Jay Agritech Logo" className="logo-icon-img" />
            <img src={titleImg} alt="Jay Agritech" className="logo-title-img" />
          </Link>

          {/* Desktop Nav */}
          <div className="navbar-links">
            {navLinks.map((item) => (
              <div
                key={item.label}
                className={`nav-item ${activeMenu === item.label ? 'active' : ''}`}
                onMouseEnter={() => item.megaMenu && handleMenuEnter(item.label)}
                onMouseLeave={handleMenuLeave}
              >
                <Link to={item.path} className="nav-link" id={`nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}>
                  {t(`nav.${item.label.toLowerCase().replace(/\s/g, '_')}`, item.label)}
                  {item.megaMenu && <ChevronDown size={14} className="nav-chevron" />}
                </Link>

                {/* Mega Menu Dropdown */}
                {item.megaMenu && item.sections && activeMenu === item.label && (
                  <div className="mega-menu">
                    <div className="mega-menu-inner">
                      {item.sections.map((section) => (
                        <div key={section.title} className="mega-section">
                          <h4 className="mega-section-title">{t(`nav.sections.${section.title.toLowerCase().replace(/\s/g, '_')}`, section.title)}</h4>
                          <div className="mega-links">
                            {section.links.map((link) => (
                              <Link key={link.path} to={link.path} className="mega-link">
                                <span className="mega-link-label">{t(`nav.links.${link.label.toLowerCase().replace(/\s/g, '_')}`, link.label)}</span>
                                <span className="mega-link-desc">{t(`nav.desc.${link.label.toLowerCase().replace(/\s/g, '_')}`, link.description)}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="navbar-actions">
            <div className="lang-switcher-wrapper" ref={langMenuRef}>
              <button 
                className="lang-switcher-btn" 
                onClick={() => setShowLangMenu(!showLangMenu)}
                aria-label={t('nav.change_language', 'Change Language')}
              >
                <Globe size={14} />
                <span>{currentLanguage.label}</span>
                <ChevronDown size={12} className={showLangMenu ? 'rotate-180' : ''} />
              </button>
              
              {showLangMenu && (
                <div className="lang-dropdown">
                  {languages.map(lang => (
                    <button 
                      key={lang.code}
                      className={`lang-option ${i18n.language === lang.code ? 'active' : ''}`}
                      onClick={() => changeLanguage(lang.code)}
                    >
                      <span className="lang-native-char">{lang.nativeChar}</span>
                      <span className="lang-label">{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link to="/partners/dealer" className="btn btn-primary btn-sm" id="nav-cta">
              {t('nav.become_partner')}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="navbar-toggle" onClick={() => setMobileOpen(!mobileOpen)} id="nav-mobile-toggle" aria-label={t('nav.toggle_menu', 'Toggle menu')}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <Link to="/" className="navbar-logo">
                <img src={logoImg} alt="Jay Agritech Logo" className="logo-icon-img" />
                <img src={titleImg} alt="Jay Agritech" className="logo-title-img" />
              </Link>
              <button onClick={() => setMobileOpen(false)} aria-label={t('nav.close_menu', 'Close menu')}><X size={24} /></button>
            </div>

            <div className="mobile-menu-body">
              {navLinks.map((item) => (
                <div key={item.label} className="mobile-nav-group">
                  <Link to={item.path} className="mobile-nav-link">{t(`nav.${item.label.toLowerCase().replace(/\s/g, '_')}`, item.label)}</Link>
                  {item.megaMenu && item.sections && (
                    <div className="mobile-sub-links">
                      {item.sections.map((section) =>
                        section.links.map((link) => (
                          <Link key={link.path} to={link.path} className="mobile-sub-link">
                            {t(`nav.links.${link.label.toLowerCase().replace(/\s/g, '_')}`, link.label)}
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mobile-menu-footer">
              <Link to="/partners/dealer" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                {t('nav.become_partner')}
              </Link>
              <div className="mobile-contact">
                <a href="tel:+919825142359"><Phone size={16} /> +91 98251 42359</a>
                <a href="mailto:info@jayagritech.com"><Mail size={16} /> info@jayagritech.com</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
