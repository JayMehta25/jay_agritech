import { useState, useEffect, useRef, startTransition } from 'react';
import { Link, useLocation } from '../RouterBridge';
import { Menu, X, ChevronDown, Search, Globe, Phone, Mail, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { navLinks } from '../../data/siteData';
import { assetSrc } from '../../utils/assetSrc';
import logoImgAsset from '../../assets/new_title.png';
import titleImgAsset from '../../assets/title_bg.png';

const logoImg = assetSrc(logoImgAsset);
const titleImg = assetSrc(titleImgAsset);

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const navbarRef = useRef(null);
  const langMenuRef = useRef(null);
  const location = useLocation();
  const { pathname, search, hash } = location;

  const languages = [
    { code: 'en', label: 'English', nativeChar: 'A' },
    { code: 'hi', label: 'Hindi', nativeChar: 'अ' },
    { code: 'zh', label: 'Mandarin', nativeChar: '文' }
  ];

  const currentLanguage = languages.find(l => i18n.language?.startsWith(l.code)) || languages[0];

  const changeLanguage = (code) => {
    setShowLangMenu(false);
    startTransition(() => {
      i18n.changeLanguage(code);
      if (typeof window !== 'undefined') {
        localStorage.setItem('i18nextLng', code);
      }
    });
  };

  useEffect(() => {
    let ticking = false;
    const lastY = { value: window.scrollY };
    const handleScroll = () => {
      const y = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(y > 20);
          if (pathname === '/') {
            // On the homepage, once the navbar moves up, keep it pinned there for uniformity.
            if (y > 120) {
              setHideOnScroll(true);
            }
          } else if (y > lastY.value && y > 120) {
            setHideOnScroll(true);
          } else if (y < lastY.value) {
            setHideOnScroll(false);
          }
          lastY.value = y;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/') {
      setHideOnScroll(false);
    }
  }, [pathname]);

  const lastPathRef = useRef({ pathname, search, hash });

  useEffect(() => {
    const last = lastPathRef.current;
    if (last.pathname !== pathname || last.search !== search || last.hash !== hash) {
      setMobileOpen(false);
      setActiveMenu(null);
      lastPathRef.current = { pathname, search, hash };
    }
  }, [pathname, search, hash]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && navbarRef.current.contains(event.target)) {
        return;
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setShowLangMenu(false);
      }
      setActiveMenu(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuEnter = (label) => {
    setActiveMenu(label);
  };

  const openCopilot = () => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent('jay:open-copilot', { detail: { mode: 'agent' } }));
  };

  const isHomePage = location.pathname === '/';
  const navbarClass = `navbar ${isScrolled || !isHomePage ? 'navbar-solid' : 'navbar-transparent'} ${hideOnScroll ? 'navbar-hidden' : ''}`;

  return (
    <>
      {/* Main Navbar */}
      <nav className={navbarClass} id="main-navbar" ref={navbarRef}>
        <div className="container-wide navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo" id="nav-logo">
            <img src={logoImg} alt="Jay Agritech Logo" className="logo-icon-img" />
            <img src={titleImg} alt="Jay Agritech" className="logo-title-img" />
          </Link>

          {/* Desktop Nav */}
          <div className="navbar-links">
            {navLinks.filter(item => item.label !== 'Contact').map((item) => (
              <div
                key={item.label}
                className={`nav-item ${activeMenu === item.label ? 'active' : ''}`}
                onMouseEnter={() => item.megaMenu && handleMenuEnter(item.label)}
              >
                {item.megaMenu ? (
                  <button
                    type="button"
                    className="nav-link nav-link-button"
                    id={`nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                    onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
                    aria-haspopup="menu"
                    aria-expanded={activeMenu === item.label}
                  >
                    {t(`nav.${item.label.toLowerCase().replace(/\s/g, '_')}`)}
                    <ChevronDown size={14} className="nav-chevron" />
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    className="nav-link"
                    id={`nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
                  >
                    {t(`nav.${item.label.toLowerCase().replace(/\s/g, '_')}`)}
                  </Link>
                )}

                {/* Mega Menu Dropdown */}
                {item.megaMenu && item.sections && activeMenu === item.label && (
                  <div
                    className={`mega-menu ${item.label === 'Solutions' ? 'mega-menu-solutions' : ''} ${item.label === 'Products' ? 'mega-menu-products' : ''}`}
                    onMouseEnter={() => handleMenuEnter(item.label)}
                  >
                    <div className="mega-menu-inner">
                      {item.sections.map((section) => (
                        <div key={section.title} className="mega-section">
                          <h4 className="mega-section-title">{t(`nav.sections.${section.title.toLowerCase().replace(/\s/g, '_')}`)}</h4>
                          <div className="mega-links">
                            {section.links.map((link) => (
                              <Link key={link.path} to={link.path} className="mega-link" onClick={() => setActiveMenu(null)}>
                                <span className="mega-link-label">{t(`nav.links.${link.label.toLowerCase().replace(/\s/g, '_')}`)}</span>
                                <span className="mega-link-desc">{t(`nav.desc.${link.label.toLowerCase().replace(/\s/g, '_')}`)}</span>
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
            <button type="button" className="btn btn-secondary btn-sm" id="nav-copilot-cta" onClick={openCopilot}>
              Try Co-Pilot <Sparkles size={14} />
            </button>
            <Link to="/contact" className="btn btn-secondary btn-sm" id="nav-contact-cta">
              {t('nav.contact_us')}
            </Link>
            <Link to="/partners/dealer" className="btn btn-primary btn-sm" id="nav-cta">
              {t('nav.become_partner')}
            </Link>
            <div
              className="lang-switcher-wrapper"
              ref={langMenuRef}
              onMouseEnter={() => setShowLangMenu(true)}
            >
              <button
                className="lang-switcher-btn"
                onClick={() => setShowLangMenu(!showLangMenu)}
                aria-label={t('nav.change_language')}
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
                      className={`lang-option ${i18n.language?.startsWith(lang.code) ? 'active' : ''}`}
                      onClick={() => changeLanguage(lang.code)}
                    >
                      <span className="lang-native-char">{lang.nativeChar}</span>
                      <span className="lang-label">{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button className="navbar-toggle" onClick={() => setMobileOpen(!mobileOpen)} id="nav-mobile-toggle" aria-label={t('nav.toggle_menu')}>
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
              <button onClick={() => setMobileOpen(false)} aria-label={t('nav.close_menu')}><X size={24} /></button>
            </div>

            <div className="mobile-menu-body">
              {/* Mobile Language Switcher (Repositioned to the top) */}
              <div className="mobile-lang-switcher">
                <div className="mobile-lang-title">
                  <Globe size={16} />
                  <span>{t('nav.select_language')}</span>
                </div>
                <div className="mobile-lang-grid">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      className={`mobile-lang-btn ${i18n.language?.startsWith(lang.code) ? 'active' : ''}`}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setMobileOpen(false); // Close sidebar on selection
                      }}
                    >
                      <span className="mobile-lang-char">{lang.nativeChar}</span>
                      <span className="mobile-lang-name">{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {navLinks.map((item) => (
                <div key={item.label} className="mobile-nav-group">
                  <Link to={item.path} className="mobile-nav-link">{t(`nav.${item.label.toLowerCase().replace(/\s/g, '_')}`)}</Link>
                  {item.megaMenu && item.sections && (
                    <div className="mobile-sub-links">
                      {item.sections.map((section) =>
                        section.links.map((link) => (
                          <Link key={link.path} to={link.path} className="mobile-sub-link">
                            {t(`nav.links.${link.label.toLowerCase().replace(/\s/g, '_')}`)}
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                  {item.label === 'Contact' && (
                    <div className="mobile-contact mobile-contact-inline">
                      <a href="tel:+919825142359"><Phone size={16} /> +91 98251 42359</a>
                      <a href="mailto:info@jayagritech.com"><Mail size={16} /> info@jayagritech.com</a>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mobile-menu-footer">
              <Link to="/partners/dealer" className="btn btn-primary btn-lg" style={{ width: '100%', marginBottom: 'var(--sp-3)', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
                {t('nav.become_partner')}
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-lg" style={{ width: '100%', marginBottom: 'var(--sp-4)', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
                {t('nav.contact_us')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
