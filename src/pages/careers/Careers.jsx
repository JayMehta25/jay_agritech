import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock, ArrowRight, Heart, Sprout, Users, Zap } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import GenericPage from '../../components/ui/GenericPage';

function AnimatedSection({ children, className = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

const openings = [
  { title: 'Field Sales Executive', department: 'Sales', location: 'Multiple Locations, Gujarat', type: 'Full-time', desc: 'Drive product sales in assigned territory. Engage with farmers and dealers to promote Jay Agritech products.' },
  { title: 'Research Microbiologist', department: 'R&D', location: 'Valsad, Gujarat', type: 'Full-time', desc: 'Conduct microbial strain isolation, characterization, and formulation development in our R&D lab.' },
  { title: 'Digital Marketing Executive', department: 'Marketing', location: 'Valsad / Remote', type: 'Full-time', desc: 'Manage social media, content creation, and digital campaigns for brand awareness and lead generation.' },
  { title: 'Quality Control Analyst', department: 'Quality', location: 'Valsad, Gujarat', type: 'Full-time', desc: 'Perform quality testing on raw materials and finished products. Maintain documentation per ISO standards.' },
];

export default function Careers() {
  return (
    <GenericPage title="Careers at Jay Agritech" subtitle="Join a mission-driven team that's transforming Indian agriculture. Grow your career while growing sustainable farming." breadcrumbs={[{ label: 'Careers' }]}>
      <div className="container">
        {/* Why Join */}
        <AnimatedSection>
          <div className="grid-4" style={{ marginBottom: 'var(--sp-16)' }}>
            {[
              { icon: <Heart size={24} />, title: 'Mission-Driven', desc: 'Work that matters — feeding India sustainably' },
              { icon: <Sprout size={24} />, title: 'Growth', desc: 'Fast-growing startup with rapid career progression' },
              { icon: <Users size={24} />, title: 'Culture', desc: 'Collaborative, innovation-first team environment' },
              { icon: <Zap size={24} />, title: 'Impact', desc: 'See your work impact millions of farmers directly' },
            ].map((item, i) => (
              <div key={i} className="card hover-lift" style={{ padding: 'var(--sp-6)', textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-lg)', background: 'var(--clr-primary-surface)', color: 'var(--clr-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--sp-3)' }}>{item.icon}</div>
                <h4 style={{ marginBottom: 'var(--sp-1)', fontSize: 'var(--fs-body)' }}>{item.title}</h4>
                <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Openings */}
        <AnimatedSection>
          <div className="section-header"><span className="section-overline">Open Positions</span><h2 className="section-title">Current Openings</h2></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
            {openings.map((job, i) => (
              <div key={i} className="card hover-lift" style={{ padding: 'var(--sp-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--sp-4)' }}>
                <div>
                  <div style={{ display: 'flex', gap: 'var(--sp-3)', marginBottom: 'var(--sp-2)' }}>
                    <span className="badge badge-green">{job.department}</span>
                    <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--clr-text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {job.type}</span>
                  </div>
                  <h3 style={{ fontSize: 'var(--fs-body-lg)', marginBottom: 'var(--sp-1)' }}>{job.title}</h3>
                  <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={12} /> {job.location}</p>
                  <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)', marginTop: 'var(--sp-2)' }}>{job.desc}</p>
                </div>
                <Link to="/contact" className="btn btn-primary">Apply <ArrowRight size={14} /></Link>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div style={{ textAlign: 'center', padding: 'var(--sp-10)', marginTop: 'var(--sp-10)' }}>
            <p style={{ color: 'var(--clr-text-muted)', marginBottom: 'var(--sp-4)' }}>Don't see a role that fits? Send us your resume anyway!</p>
            <a href="mailto:careers@jayagritech.com" className="btn btn-secondary">Email Your Resume <ArrowRight size={14} /></a>
          </div>
        </AnimatedSection>
      </div>
    </GenericPage>
  );
}
