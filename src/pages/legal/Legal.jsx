import GenericPage from '../../components/ui/GenericPage';
import { useTranslation } from 'react-i18next';

export function PrivacyPolicy() {
  const { t } = useTranslation();
  return (
    <GenericPage title={t('pages.legal.privacy_title')} subtitle={t('pages.legal.privacy_subtitle')} breadcrumbs={[{ label: t('pages.legal.privacy_title') }]}>
      <div className="container-narrow" style={{ paddingBottom: 'var(--sp-16)' }}>
        <div style={{ lineHeight: 'var(--lh-loose)', color: 'var(--clr-text-body)' }}>
            <p style={{ marginBottom: 'var(--sp-6)', color: 'var(--clr-text-muted)' }}>{t('pages.legal.updated')}</p>
          <h2 style={{ marginBottom: 'var(--sp-4)' }}>{t('pages_details.legal.privacy.sections.collect.title')}</h2>
          <p style={{ marginBottom: 'var(--sp-6)' }}>{t('pages_details.legal.privacy.sections.collect.body')}</p>
          <h2 style={{ marginBottom: 'var(--sp-4)' }}>{t('pages_details.legal.privacy.sections.use.title')}</h2>
          <p style={{ marginBottom: 'var(--sp-6)' }}>{t('pages_details.legal.privacy.sections.use.body')}</p>
          <h2 style={{ marginBottom: 'var(--sp-4)' }}>{t('pages_details.legal.privacy.sections.protect.title')}</h2>
          <p style={{ marginBottom: 'var(--sp-6)' }}>{t('pages_details.legal.privacy.sections.protect.body')}</p>
          <h2 style={{ marginBottom: 'var(--sp-4)' }}>{t('pages_details.legal.privacy.sections.contact.title')}</h2>
          <p>{t('pages_details.legal.privacy.sections.contact.body')}</p>
        </div>
      </div>
    </GenericPage>
  );
}

export function Terms() {
  const { t } = useTranslation();
  return (
    <GenericPage title={t('pages.legal.terms_title')} subtitle={t('pages.legal.terms_subtitle')} breadcrumbs={[{ label: t('pages.legal.terms_title') }]}>
      <div className="container-narrow" style={{ paddingBottom: 'var(--sp-16)' }}>
        <div style={{ lineHeight: 'var(--lh-loose)', color: 'var(--clr-text-body)' }}>
          <p style={{ marginBottom: 'var(--sp-6)', color: 'var(--clr-text-muted)' }}>{t('pages.legal.terms_updated')}</p>
          <h2 style={{ marginBottom: 'var(--sp-4)' }}>{t('pages_details.legal.terms.sections.acceptance.title')}</h2>
          <p style={{ marginBottom: 'var(--sp-6)' }}>{t('pages_details.legal.terms.sections.acceptance.body')}</p>
          <h2 style={{ marginBottom: 'var(--sp-4)' }}>{t('pages_details.legal.terms.sections.product_info.title')}</h2>
          <p style={{ marginBottom: 'var(--sp-6)' }}>{t('pages_details.legal.terms.sections.product_info.body')}</p>
          <h2 style={{ marginBottom: 'var(--sp-4)' }}>{t('pages_details.legal.terms.sections.ip.title')}</h2>
          <p style={{ marginBottom: 'var(--sp-6)' }}>{t('pages_details.legal.terms.sections.ip.body')}</p>
          <h2 style={{ marginBottom: 'var(--sp-4)' }}>{t('pages_details.legal.terms.sections.liability.title')}</h2>
          <p>{t('pages_details.legal.terms.sections.liability.body')}</p>
        </div>
      </div>
    </GenericPage>
  );
}
