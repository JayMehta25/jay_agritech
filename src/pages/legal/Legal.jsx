import GenericPage from '../../components/ui/GenericPage';

export function PrivacyPolicy() {
  return (
    <GenericPage title="Privacy Policy" subtitle="How we collect, use, and protect your information." breadcrumbs={[{ label: 'Privacy Policy' }]}>
      <div className="container-narrow" style={{ paddingBottom: 'var(--sp-16)' }}>
        <div style={{ lineHeight: 'var(--lh-loose)', color: 'var(--clr-text-body)' }}>
          <p style={{ marginBottom: 'var(--sp-6)', color: 'var(--clr-text-muted)' }}>Last updated: April 2026</p>
          <h2 style={{ marginBottom: 'var(--sp-4)' }}>Information We Collect</h2>
          <p style={{ marginBottom: 'var(--sp-6)' }}>Jay Agritech Pvt. Ltd. collects information you provide directly, such as contact details when you fill out forms, make inquiries, or apply for partnerships. We may also collect usage data through cookies and analytics tools to improve our website experience.</p>
          <h2 style={{ marginBottom: 'var(--sp-4)' }}>How We Use Your Information</h2>
          <p style={{ marginBottom: 'var(--sp-6)' }}>We use collected information to respond to your inquiries, process partnership applications, send relevant product updates (with consent), improve our website, and comply with legal obligations.</p>
          <h2 style={{ marginBottom: 'var(--sp-4)' }}>Data Protection</h2>
          <p style={{ marginBottom: 'var(--sp-6)' }}>We implement appropriate security measures to protect your personal information. We do not sell or share your data with third parties for marketing purposes without your explicit consent.</p>
          <h2 style={{ marginBottom: 'var(--sp-4)' }}>Contact Us</h2>
          <p>For any privacy-related questions, contact us at <a href="mailto:privacy@jayagritech.com" style={{ color: 'var(--clr-primary)' }}>privacy@jayagritech.com</a>.</p>
        </div>
      </div>
    </GenericPage>
  );
}

export function Terms() {
  return (
    <GenericPage title="Terms & Conditions" subtitle="Terms governing the use of our website and services." breadcrumbs={[{ label: 'Terms & Conditions' }]}>
      <div className="container-narrow" style={{ paddingBottom: 'var(--sp-16)' }}>
        <div style={{ lineHeight: 'var(--lh-loose)', color: 'var(--clr-text-body)' }}>
          <p style={{ marginBottom: 'var(--sp-6)', color: 'var(--clr-text-muted)' }}>Last updated: April 2026</p>
          <h2 style={{ marginBottom: 'var(--sp-4)' }}>Acceptance of Terms</h2>
          <p style={{ marginBottom: 'var(--sp-6)' }}>By accessing the Jay Agritech website, you agree to these terms and conditions. If you do not agree, please do not use our website.</p>
          <h2 style={{ marginBottom: 'var(--sp-4)' }}>Product Information</h2>
          <p style={{ marginBottom: 'var(--sp-6)' }}>While we strive for accuracy, product descriptions and specifications are subject to change. Actual product performance may vary based on local conditions, application methods, and environmental factors.</p>
          <h2 style={{ marginBottom: 'var(--sp-4)' }}>Intellectual Property</h2>
          <p style={{ marginBottom: 'var(--sp-6)' }}>All content on this website — including text, images, logos, and design — is the property of Jay Agritech Pvt. Ltd. Unauthorized reproduction is prohibited.</p>
          <h2 style={{ marginBottom: 'var(--sp-4)' }}>Limitation of Liability</h2>
          <p>Jay Agritech Pvt. Ltd. provides this website "as is" and makes no warranties regarding completeness, accuracy, or availability. We shall not be liable for any damages arising from the use of this website.</p>
        </div>
      </div>
    </GenericPage>
  );
}
