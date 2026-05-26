import GenericPage from '../../components/ui/GenericPage';
import { useTranslation } from 'react-i18next';

const privacySections = [
  {
    icon: '📋',
    titleKey: 'pages_details.legal.privacy.sections.collect.title',
    bodyKey: 'pages_details.legal.privacy.sections.collect.body',
    fallbackTitle: 'Information We Collect',
    fallbackBody: 'We collect information you provide directly, such as contact details when you fill out forms or make enquiries. We may also collect usage data through cookies and analytics to improve the website experience.'
  },
  {
    icon: '🔍',
    titleKey: 'pages_details.legal.privacy.sections.use.title',
    bodyKey: 'pages_details.legal.privacy.sections.use.body',
    fallbackTitle: 'How We Use Your Information',
    fallbackBody: 'We use information to respond to enquiries, process partnership requests, send relevant updates, improve the website, and comply with legal obligations.'
  },
  {
    icon: '🛡️',
    titleKey: 'pages_details.legal.privacy.sections.protect.title',
    bodyKey: 'pages_details.legal.privacy.sections.protect.body',
    fallbackTitle: 'Data Protection',
    fallbackBody: 'We implement appropriate security measures to protect your personal information. We do not sell or share your information with third parties for marketing purposes without your explicit consent.'
  },
  {
    icon: '🍪',
    titleKey: null,
    bodyKey: null,
    fallbackTitle: 'Cookies & Tracking',
    fallbackBody: 'Our website may use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. You can control cookie preferences through your browser settings.'
  },
  {
    icon: '🤝',
    titleKey: null,
    bodyKey: null,
    fallbackTitle: 'Third-Party Services',
    fallbackBody: 'We may use third-party services (such as analytics providers or payment processors) that collect, monitor, and analyze data to improve our service. These third-party service providers have their own privacy policies addressing how they use such information.'
  },
  {
    icon: '📝',
    titleKey: null,
    bodyKey: null,
    fallbackTitle: 'Your Rights',
    fallbackBody: 'You have the right to access, correct, or delete your personal data at any time. You may also opt out of receiving marketing communications from us. To exercise any of these rights, please contact us using the details below.'
  },
  {
    icon: '📧',
    titleKey: 'pages_details.legal.privacy.sections.contact.title',
    bodyKey: 'pages_details.legal.privacy.sections.contact.body',
    fallbackTitle: 'Contact Us',
    fallbackBody: 'For privacy-related questions, please contact us at privacy@jayagritech.com.'
  }
];

const termsSections = [
  {
    icon: '✅',
    titleKey: 'pages_details.legal.terms.sections.acceptance.title',
    bodyKey: 'pages_details.legal.terms.sections.acceptance.body',
    fallbackTitle: 'Acceptance of Terms',
    fallbackBody: 'By using the Jay Agritech website, you agree to these terms. If you do not agree, please do not use the website.'
  },
  {
    icon: '📦',
    titleKey: 'pages_details.legal.terms.sections.product_info.title',
    bodyKey: 'pages_details.legal.terms.sections.product_info.body',
    fallbackTitle: 'Product Information',
    fallbackBody: 'While we strive for accuracy, product descriptions and specifications are subject to change. Product images shown on the website are for illustrative purposes and may differ slightly from the actual product.'
  },
  {
    icon: '🔒',
    titleKey: 'pages_details.legal.terms.sections.ip.title',
    bodyKey: 'pages_details.legal.terms.sections.ip.body',
    fallbackTitle: 'Intellectual Property',
    fallbackBody: 'All content on this website — text, images, logos, and designs — is the property of Jay Agritech Pvt. Ltd. Unauthorized reproduction, distribution, or modification of any content is strictly prohibited.'
  },
  {
    icon: '🛒',
    titleKey: null,
    bodyKey: null,
    fallbackTitle: 'Ordering & Pricing',
    fallbackBody: 'All prices displayed on the website are subject to change without prior notice. We reserve the right to modify or discontinue any product without notice. Orders are subject to availability and confirmation of the order price.'
  },
  {
    icon: '🚚',
    titleKey: null,
    bodyKey: null,
    fallbackTitle: 'Shipping & Delivery',
    fallbackBody: 'Delivery timelines are estimates and may vary based on location and product availability. Jay Agritech is not responsible for delays caused by logistics partners or force majeure events.'
  },
  {
    icon: '⚖️',
    titleKey: 'pages_details.legal.terms.sections.liability.title',
    bodyKey: 'pages_details.legal.terms.sections.liability.body',
    fallbackTitle: 'Limitation of Liability',
    fallbackBody: 'This website is provided on an "as is" basis and we make no warranties regarding its completeness, accuracy, or availability. Jay Agritech shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website.'
  },
  {
    icon: '🏛️',
    titleKey: null,
    bodyKey: null,
    fallbackTitle: 'Governing Law',
    fallbackBody: 'These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Valsad, Gujarat, India.'
  }
];

function LegalSection({ section, index, t }) {
  const title = section.titleKey ? t(section.titleKey, section.fallbackTitle) : section.fallbackTitle;
  const body = section.bodyKey ? t(section.bodyKey, section.fallbackBody) : section.fallbackBody;
  // If the translation key returns the key itself (not found), use fallback
  const displayTitle = title === section.titleKey ? section.fallbackTitle : title;
  const displayBody = body === section.bodyKey ? section.fallbackBody : body;

  return (
    <div className="legal-section-card" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="legal-section-icon">{section.icon}</div>
      <div className="legal-section-content">
        <h3 className="legal-section-title">{displayTitle}</h3>
        <p className="legal-section-body">{displayBody}</p>
      </div>
    </div>
  );
}

export function PrivacyPolicy() {
  const { t } = useTranslation();
  const pageTitle = t('pages.legal.privacy_title', 'Privacy Policy');
  const displayTitle = pageTitle === 'pages.legal.privacy_title' ? 'Privacy Policy' : pageTitle;
  const pageSubtitle = t('pages.legal.privacy_subtitle', 'How we collect, use, and protect your information.');
  const displaySubtitle = pageSubtitle === 'pages.legal.privacy_subtitle' ? 'How we collect, use, and protect your information.' : pageSubtitle;
  const updated = t('pages.legal.updated', 'Last updated: April 2026');
  const displayUpdated = updated === 'pages.legal.updated' ? 'Last updated: April 2026' : updated;

  return (
    <GenericPage title={displayTitle} subtitle={displaySubtitle} breadcrumbs={[{ label: displayTitle }]}>
      <div className="legal-page-container">
        <div className="legal-updated-badge">
          <span className="legal-updated-dot" />
          {displayUpdated}
        </div>

        <div className="legal-intro-card">
          <p>
            At Jay Agritech Pvt. Ltd., we are committed to protecting your privacy and ensuring transparency in how we handle your personal information. This Privacy Policy outlines our practices regarding data collection, usage, and protection when you visit our website or use our services.
          </p>
        </div>

        <div className="legal-sections-grid">
          {privacySections.map((section, i) => (
            <LegalSection key={i} section={section} index={i} t={t} />
          ))}
        </div>

        <div className="legal-footer-note">
          <p>This privacy policy is effective as of April 2026 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.</p>
        </div>
      </div>
    </GenericPage>
  );
}

export function Terms() {
  const { t } = useTranslation();
  const pageTitle = t('pages.legal.terms_title', 'Terms & Conditions');
  const displayTitle = pageTitle === 'pages.legal.terms_title' ? 'Terms & Conditions' : pageTitle;
  const pageSubtitle = t('pages.legal.terms_subtitle', 'The terms governing the use of our website and services.');
  const displaySubtitle = pageSubtitle === 'pages.legal.terms_subtitle' ? 'The terms governing the use of our website and services.' : pageSubtitle;
  const updated = t('pages.legal.terms_updated', 'Last updated: April 2026');
  const displayUpdated = (updated === 'pages.legal.terms_updated' || updated === 'pages.legal.updated') ? 'Last updated: April 2026' : updated;

  return (
    <GenericPage title={displayTitle} subtitle={displaySubtitle} breadcrumbs={[{ label: displayTitle }]}>
      <div className="legal-page-container">
        <div className="legal-updated-badge">
          <span className="legal-updated-dot" />
          {displayUpdated}
        </div>

        <div className="legal-intro-card">
          <p>
            Welcome to Jay Agritech Pvt. Ltd. By accessing or using our website, you agree to be bound by the following terms and conditions. Please read them carefully before using our services. If you do not agree with any part of these terms, you should not use this website.
          </p>
        </div>

        <div className="legal-sections-grid">
          {termsSections.map((section, i) => (
            <LegalSection key={i} section={section} index={i} t={t} />
          ))}
        </div>

        <div className="legal-footer-note">
          <p>We reserve the right to update or modify these terms at any time without prior notice. Your continued use of the website following the posting of any changes constitutes acceptance of those changes.</p>
        </div>
      </div>
    </GenericPage>
  );
}
