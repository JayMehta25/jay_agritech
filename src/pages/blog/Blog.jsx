import { Link, useParams } from '../../components/RouterBridge';
import { ArrowLeft, ArrowRight, Leaf, Calendar, User, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { blogPosts } from '../../data/siteData';
import GenericPage from '../../components/ui/GenericPage';

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

function renderInlineText(text) {
  if (!text) return '';
  const parts = text.split('**');
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i} style={{ color: 'var(--clr-primary-dark)', fontWeight: 'var(--fw-bold)' }}>{part}</strong> : part));
}

function renderMarkdownContent(text) {
  if (!text) return null;
  const blocks = text.split('\n\n');
  return blocks.map((block, index) => {
    const trimmed = block.trim();
    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={index} style={{ color: 'var(--clr-primary)', marginTop: 'var(--sp-6)', marginBottom: 'var(--sp-3)', fontSize: 'var(--fs-body-lg)', fontWeight: 'var(--fw-bold)' }}>
          {renderInlineText(trimmed.replace('### ', ''))}
        </h3>
      );
    }
    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={index} style={{ color: 'var(--clr-primary-dark)', marginTop: 'var(--sp-8)', marginBottom: 'var(--sp-4)', fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-bold)', borderBottom: '2px solid var(--clr-border-light)', paddingBottom: 'var(--sp-2)' }}>
          {renderInlineText(trimmed.replace('## ', ''))}
        </h2>
      );
    }
    if (trimmed.startsWith('- ')) {
      const listItems = trimmed.split('\n').map(line => line.replace(/^- /, '').trim());
      return (
        <ul key={index} style={{ paddingLeft: 'var(--sp-6)', marginBottom: 'var(--sp-6)', listStyleType: 'disc' }}>
          {listItems.map((item, i) => (
            <li key={i} style={{ marginBottom: 'var(--sp-3)', color: 'var(--clr-text-body)', lineHeight: 'var(--lh-loose)', fontSize: 'var(--fs-body)' }}>
              {renderInlineText(item)}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={index} style={{ marginBottom: 'var(--sp-4)', color: 'var(--clr-text-body)', lineHeight: 'var(--lh-loose)', fontSize: 'var(--fs-body)' }}>
        {renderInlineText(trimmed)}
      </p>
    );
  });
}

export default function Blog() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const slugArray = params.slug;
  const currentSlug = Array.isArray(slugArray) ? slugArray[0] : slugArray;

  const locale = i18n.language?.startsWith('hi') ? 'hi-IN' : i18n.language?.startsWith('gu') ? 'gu-IN' : i18n.language?.startsWith('mr') ? 'mr-IN' : 'en-IN';

  // If a slug is specified in the URL, render the Detail View
  if (currentSlug) {
    const post = blogPosts.find(p => p.slug === currentSlug);

    if (post) {
      const translationKey = `home.blog_posts.${post.slug.replace(/-/g, '_')}`;
      const title = t(`${translationKey}.title`, post.title);
      const category = t(`${translationKey}.category`, post.category);
      const excerpt = t(`${translationKey}.excerpt`, post.excerpt);
      const content = t(`${translationKey}.content`, post.content);

      return (
        <GenericPage title={title} overline={category} subtitle={excerpt} heroImage={post.image} breadcrumbs={[{ label: t('pages.blog.title'), path: '/blog' }, { label: title }]}>
          <div className="container">
            <div style={{ maxWidth: '800px', margin: '0 auto var(--sp-16)' }}>
              {/* Back Button */}
              <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--clr-primary)', fontWeight: 'var(--fw-semibold)', marginBottom: 'var(--sp-6)', transition: 'transform 0.2s' }} className="hover-left">
                <ArrowLeft size={16} /> {t('common.back_to_blog', 'Back to Knowledge Hub')}
              </Link>

              {/* Meta information */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-6)', padding: 'var(--sp-4) 0', borderBottom: '1px solid var(--clr-border-light)', borderTop: '1px solid var(--clr-border-light)', marginBottom: 'var(--sp-8)', color: 'var(--clr-text-muted)', fontSize: 'var(--fs-body-sm)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><User size={16} style={{ color: 'var(--clr-primary)' }} /> {post.author}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Calendar size={16} style={{ color: 'var(--clr-primary)' }} /> {new Date(post.date).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Clock size={16} style={{ color: 'var(--clr-primary)' }} /> {post.readTime}</span>
              </div>

              {/* Post Content */}
              <div className="blog-detail-content">
                {renderMarkdownContent(content)}
              </div>
            </div>
          </div>
        </GenericPage>
      );
    }
  }

  // Otherwise, render the Blog List View (as before)
  const featured = blogPosts.filter(p => p.featured);
  const regular = blogPosts.filter(p => !p.featured);

  return (
    <GenericPage title={t('pages.blog.title')} subtitle={t('pages.blog.subtitle')} breadcrumbs={[{ label: t('pages.blog.title') }]}>
      <div className="container">
        {/* Featured */}
        {featured.length > 0 && (
          <AnimatedSection>
            <div style={{ marginBottom: 'var(--sp-12)' }}>
              <h2 style={{ marginBottom: 'var(--sp-6)' }}>{t('pages.blog.featured_articles')}</h2>
              <div className="grid-2" style={{ gap: 'var(--sp-6)' }}>
                {featured.map((post) => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className="card hover-lift" style={{ height: '100%' }}>
                    {post.image ? (
                      <div style={{ height: 200, overflow: 'hidden' }}>
                        <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ) : (
                      <div style={{ height: 200, background: 'var(--gradient-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Leaf size={40} style={{ color: 'var(--clr-primary-lighter)', opacity: 0.5 }} /></div>
                    )}
                    <div className="card-body">
                      <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'center', marginBottom: 'var(--sp-3)' }}>
                        <span className="badge badge-green">{t(`home.blog_posts.${post.slug.replace(/-/g, '_')}.category`, post.category)}</span>
                        <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--clr-text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {post.readTime}</span>
                      </div>
                      <h3 style={{ fontSize: 'var(--fs-h4)', marginBottom: 'var(--sp-2)' }}>{t(`home.blog_posts.${post.slug.replace(/-/g, '_')}.title`, post.title)}</h3>
                      <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)' }}>{t(`home.blog_posts.${post.slug.replace(/-/g, '_')}.excerpt`, post.excerpt)}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--sp-2)', marginTop: 'var(--sp-4)', borderTop: '1px solid var(--clr-border-light)', paddingTop: 'var(--sp-3)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', fontSize: 'var(--fs-caption)', color: 'var(--clr-text-muted)' }}>
                          <User size={12} style={{ color: 'var(--clr-primary)' }} /> {post.author} · {new Date(post.date).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--clr-primary)', fontSize: 'var(--fs-body-sm)', fontWeight: 600 }}>
                          {t('common.read_article')} <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* All Posts */}
        <AnimatedSection>
          <h2 style={{ marginBottom: 'var(--sp-6)' }}>{t('pages.blog.all_articles')}</h2>
          <div className="grid-3">
            {blogPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="card hover-lift">
                {post.image ? (
                  <div style={{ height: 160, overflow: 'hidden' }}>
                    <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ) : (
                  <div style={{ height: 160, background: 'var(--gradient-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Leaf size={28} style={{ color: 'var(--clr-primary-lighter)', opacity: 0.4 }} /></div>
                )}
                <div className="card-body">
                  <span className="badge badge-green" style={{ marginBottom: 'var(--sp-2)', display: 'inline-flex' }}>{t(`home.blog_posts.${post.slug.replace(/-/g, '_')}.category`, post.category)}</span>
                  <h4 style={{ fontSize: 'var(--fs-body)', lineHeight: 1.4, marginBottom: 'var(--sp-2)' }}>{t(`home.blog_posts.${post.slug.replace(/-/g, '_')}.title`, post.title)}</h4>
                  <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)' }}>{t(`home.blog_posts.${post.slug.replace(/-/g, '_')}.excerpt`, post.excerpt).slice(0, 100)}...</p>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--clr-primary)', fontSize: 'var(--fs-body-sm)', fontWeight: 600, marginTop: 'var(--sp-3)' }}>{t('common.read_article')} <ArrowRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </GenericPage>
  );
}
