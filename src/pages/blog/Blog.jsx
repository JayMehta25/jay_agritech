import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Calendar, User, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { blogPosts } from '../../data/siteData';
import GenericPage from '../../components/ui/GenericPage';

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

export default function Blog() {
  const { t, i18n } = useTranslation();
  const featured = blogPosts.filter(p => p.featured);
  const regular = blogPosts.filter(p => !p.featured);
  const locale = i18n.language?.startsWith('hi') ? 'hi-IN' : 'en-IN';
  
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
                  <Link key={post.id} to={`/blog/${post.slug}`} className="card hover-lift">
                    <div style={{ height: 200, background: 'var(--gradient-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Leaf size={40} style={{ color: 'var(--clr-primary-lighter)', opacity: 0.5 }} /></div>
                    <div className="card-body">
                      <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'center', marginBottom: 'var(--sp-3)' }}>
                        <span className="badge badge-green">{t(`home.blog_posts.${post.slug.replace(/-/g, '_')}.category`, post.category)}</span>
                        <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--clr-text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {post.readTime}</span>
                      </div>
                      <h3 style={{ fontSize: 'var(--fs-h4)', marginBottom: 'var(--sp-2)' }}>{t(`home.blog_posts.${post.slug.replace(/-/g, '_')}.title`, post.title)}</h3>
                      <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)' }}>{t(`home.blog_posts.${post.slug.replace(/-/g, '_')}.excerpt`, post.excerpt)}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', marginTop: 'var(--sp-4)', fontSize: 'var(--fs-caption)', color: 'var(--clr-text-muted)' }}>
                        <User size={12} /> {post.author} · {new Date(post.date).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })}
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
                <div style={{ height: 160, background: 'var(--gradient-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Leaf size={28} style={{ color: 'var(--clr-primary-lighter)', opacity: 0.4 }} /></div>
                <div className="card-body">
                  <span className="badge badge-green" style={{ marginBottom: 'var(--sp-2)', display: 'inline-flex' }}>{t(`home.blog_posts.${post.slug.replace(/-/g, '_')}.category`, post.category)}</span>
                  <h4 style={{ fontSize: 'var(--fs-body)', lineHeight: 1.4, marginBottom: 'var(--sp-2)' }}>{t(`home.blog_posts.${post.slug.replace(/-/g, '_')}.title`, post.title)}</h4>
                  <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)' }}>{t(`home.blog_posts.${post.slug.replace(/-/g, '_')}.excerpt`, post.excerpt).slice(0, 100)}...</p>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--clr-primary)', fontSize: 'var(--fs-body-sm)', fontWeight: 600, marginTop: 'var(--sp-3)' }}>{t('common.read_more')} <ArrowRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </GenericPage>
  );
}
