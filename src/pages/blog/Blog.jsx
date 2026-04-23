import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Calendar, User, Clock } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { blogPosts } from '../../data/siteData';
import GenericPage from '../../components/ui/GenericPage';

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

export default function Blog() {
  const featured = blogPosts.filter(p => p.featured);
  const regular = blogPosts.filter(p => !p.featured);
  
  return (
    <GenericPage title="Knowledge Hub" subtitle="Expert articles, farming guides, and seasonal advisories for the modern Indian farmer." breadcrumbs={[{ label: 'Knowledge Hub' }]}>
      <div className="container">
        {/* Featured */}
        {featured.length > 0 && (
          <AnimatedSection>
            <div style={{ marginBottom: 'var(--sp-12)' }}>
              <h2 style={{ marginBottom: 'var(--sp-6)' }}>Featured Articles</h2>
              <div className="grid-2" style={{ gap: 'var(--sp-6)' }}>
                {featured.map((post) => (
                  <Link key={post.id} to={`/blog/${post.slug}`} className="card hover-lift">
                    <div style={{ height: 200, background: 'var(--gradient-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Leaf size={40} style={{ color: 'var(--clr-primary-lighter)', opacity: 0.5 }} /></div>
                    <div className="card-body">
                      <div style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'center', marginBottom: 'var(--sp-3)' }}>
                        <span className="badge badge-green">{post.category}</span>
                        <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--clr-text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {post.readTime}</span>
                      </div>
                      <h3 style={{ fontSize: 'var(--fs-h4)', marginBottom: 'var(--sp-2)' }}>{post.title}</h3>
                      <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)' }}>{post.excerpt}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', marginTop: 'var(--sp-4)', fontSize: 'var(--fs-caption)', color: 'var(--clr-text-muted)' }}>
                        <User size={12} /> {post.author} · {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
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
          <h2 style={{ marginBottom: 'var(--sp-6)' }}>All Articles</h2>
          <div className="grid-3">
            {blogPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="card hover-lift">
                <div style={{ height: 160, background: 'var(--gradient-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Leaf size={28} style={{ color: 'var(--clr-primary-lighter)', opacity: 0.4 }} /></div>
                <div className="card-body">
                  <span className="badge badge-green" style={{ marginBottom: 'var(--sp-2)', display: 'inline-flex' }}>{post.category}</span>
                  <h4 style={{ fontSize: 'var(--fs-body)', lineHeight: 1.4, marginBottom: 'var(--sp-2)' }}>{post.title}</h4>
                  <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)' }}>{post.excerpt.slice(0, 100)}...</p>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--clr-primary)', fontSize: 'var(--fs-body-sm)', fontWeight: 600, marginTop: 'var(--sp-3)' }}>Read More <ArrowRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </GenericPage>
  );
}
