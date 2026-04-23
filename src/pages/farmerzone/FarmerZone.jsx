import { Link } from 'react-router-dom';
import { ArrowRight, Sprout, Shield, Leaf, TrendingUp, Droplets, Bug, BookOpen, Calendar, Download, Video, HelpCircle } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import GenericPage from '../../components/ui/GenericPage';

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

export default function FarmerZone() {
  const resources = [
    { icon: <Sprout size={28} />, title: 'Crop-wise Solutions', desc: 'Find the right products for your specific crop. Select your crop and get personalized product recommendations.', link: '/farmer-zone/crop-solutions', color: '#2E7D32' },
    { icon: <HelpCircle size={28} />, title: 'Problem Guide', desc: 'Identify crop problems and get solutions. Browse by symptom, pest, or disease to find answers.', link: '/farmer-zone/problem-guide', color: '#C62828' },
    { icon: <Calendar size={28} />, title: 'Seasonal Advisory', desc: 'Season-specific farming guidance. Kharif, Rabi, and Zaid season recommendations for your region.', link: '/farmer-zone/seasonal', color: '#E65100' },
    { icon: <BookOpen size={28} />, title: 'Knowledge Hub', desc: 'In-depth articles, research summaries, and educational content on modern farming practices.', link: '/blog', color: '#1565C0' },
  ];
  
  return (
    <GenericPage title="Farmer Zone" overline="🌾 For Our Farmers" subtitle="Your one-stop resource for farming advice, crop solutions, and expert guidance. Everything you need for a successful harvest." breadcrumbs={[{ label: 'Farmer Zone' }]}>
      <div className="container">
        {/* Resource Cards */}
        <div className="grid-2" style={{ gap: 'var(--sp-6)', marginBottom: 'var(--sp-16)' }}>
          {resources.map((res, i) => (
            <AnimatedSection key={i}>
              <Link to={res.link} className="card hover-lift" style={{ padding: 'var(--sp-8)', display: 'flex', gap: 'var(--sp-5)' }}>
                <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-lg)', background: `${res.color}15`, color: res.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{res.icon}</div>
                <div>
                  <h3 style={{ marginBottom: 'var(--sp-2)' }}>{res.title}</h3>
                  <p style={{ color: 'var(--clr-text-muted)', fontSize: 'var(--fs-body-sm)', marginBottom: 'var(--sp-3)' }}>{res.desc}</p>
                  <span style={{ color: res.color, fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-body-sm)', display: 'flex', alignItems: 'center', gap: 4 }}>Explore <ArrowRight size={14} /></span>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
        
        {/* Quick Tips */}
        <AnimatedSection>
          <section style={{ background: 'var(--clr-off-white)', borderRadius: 'var(--radius-xl)', padding: 'var(--sp-12)', marginBottom: 'var(--sp-12)' }}>
            <div className="section-header"><span className="section-overline">Quick Tips</span><h2 className="section-title">Farming Best Practices</h2></div>
            <div className="grid-3">
              {[
                { title: 'Soil Testing', tip: 'Test your soil before every season. Understanding your soil\'s NPK and pH helps choose the right inputs.' },
                { title: 'Seed Treatment', tip: 'Always treat seeds with bio-agents before sowing. This protects against soil-borne diseases and improves germination.' },
                { title: 'Integrated Approach', tip: 'Combine bio-fertilizers with bio-pesticides for best results. The Jay Agritech Growth System™ guides you through this.' },
                { title: 'Right Timing', tip: 'Apply foliar sprays early morning or late evening. This ensures better absorption and prevents leaf burn.' },
                { title: 'Storage', tip: 'Store biological products in cool, dry places away from direct sunlight. Maintain temperature below 30°C.' },
                { title: 'Water Management', tip: 'Apply products with adequate soil moisture. For drip systems, apply through the drip for best distribution.' },
              ].map((t, i) => (
                <div key={i} style={{ padding: 'var(--sp-5)', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--clr-border-light)' }}>
                  <h4 style={{ fontSize: 'var(--fs-body)', marginBottom: 'var(--sp-2)', color: 'var(--clr-primary)' }}>{t.title}</h4>
                  <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)' }}>{t.tip}</p>
                </div>
              ))}
            </div>
          </section>
        </AnimatedSection>
        
        {/* WhatsApp Support */}
        <AnimatedSection>
          <div style={{ textAlign: 'center', padding: 'var(--sp-12)', background: 'var(--gradient-hero)', borderRadius: 'var(--radius-xl)', color: 'white' }}>
            <h2 style={{ color: 'white', marginBottom: 'var(--sp-3)' }}>Need Expert Help?</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 'var(--sp-6)', maxWidth: 500, margin: '0 auto var(--sp-6)' }}>
              Our agronomists are available on WhatsApp to help you with crop-specific advice and product recommendations.
            </p>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-lg">Chat with an Expert</a>
          </div>
        </AnimatedSection>
      </div>
    </GenericPage>
  );
}
