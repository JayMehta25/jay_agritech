import { useState, useEffect } from 'react';
import { Link } from '../../components/RouterBridge';
import { Briefcase, MapPin, Clock, ArrowRight, Heart, Sprout, Users, Zap, X, Send, CheckCircle, FileText, User, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import GenericPage from '../../components/ui/GenericPage';

function AnimatedSection({ children, className = '', style = {} }) {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div ref={ref} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`} style={style}>
      {children}
    </div>
  );
}

export default function Careers() {
  const { t } = useTranslation();
  const openings = [
    { key: 'field_sales', department: t('pages_details.careers.jobs.field_sales.department'), location: t('pages_details.careers.jobs.field_sales.location'), type: t('pages_details.careers.jobs.field_sales.type'), desc: t('pages_details.careers.jobs.field_sales.description') },
    { key: 'research_microbiologist', department: t('pages_details.careers.jobs.research_microbiologist.department'), location: t('pages_details.careers.jobs.research_microbiologist.location'), type: t('pages_details.careers.jobs.research_microbiologist.type'), desc: t('pages_details.careers.jobs.research_microbiologist.description') },
    { key: 'digital_marketing', department: t('pages_details.careers.jobs.digital_marketing.department'), location: t('pages_details.careers.jobs.digital_marketing.location'), type: t('pages_details.careers.jobs.digital_marketing.type'), desc: t('pages_details.careers.jobs.digital_marketing.description') },
    { key: 'qa_analyst', department: t('pages_details.careers.jobs.qa_analyst.department'), location: t('pages_details.careers.jobs.qa_analyst.location'), type: t('pages_details.careers.jobs.qa_analyst.type'), desc: t('pages_details.careers.jobs.qa_analyst.description') },
  ];

  // Dynamic role-specific screening Q&As
  const screeningQuestions = {
    field_sales: [
      {
        id: 'experience',
        type: 'select',
        label: t('pages_details.careers.form.sales_exp_label', 'Years of Agrochemical/Seed B2B sales experience *'),
        required: true,
        options: [
          { value: 'under_2', label: t('pages_details.careers.form.sales_exp_option1', 'Less than 2 years') },
          { value: '2_5', label: t('pages_details.careers.form.sales_exp_option2', '2 to 5 years') },
          { value: 'over_5', label: t('pages_details.careers.form.sales_exp_option3', 'More than 5 years') }
        ]
      },
      {
        id: 'travel',
        type: 'radio',
        label: t('pages_details.careers.form.sales_travel_label', 'Are you willing to travel extensively to rural territories in Gujarat? *'),
        required: true,
        options: [
          { value: 'yes', label: t('common.yes', 'Yes') },
          { value: 'no', label: t('common.no', 'No') }
        ]
      },
      {
        id: 'achievement',
        type: 'textarea',
        label: t('pages_details.careers.form.sales_achievement_label', 'Describe your most successful dealer onboarding or sales campaign *'),
        required: true,
        placeholder: t('pages_details.careers.form.sales_achievement_ph', 'e.g. Onboarded 15 new distributors, increasing sales by 30%...')
      }
    ],
    research_microbiologist: [
      {
        id: 'degree',
        type: 'select',
        label: t('pages_details.careers.form.micro_degree_label', 'Highest academic qualification in Microbiology/Biotech *'),
        required: true,
        options: [
          { value: 'bsc', label: t('pages_details.careers.form.micro_degree_bsc', 'B.Sc. / B.Tech') },
          { value: 'msc', label: t('pages_details.careers.form.micro_degree_msc', 'M.Sc. / M.Tech') },
          { value: 'phd', label: t('pages_details.careers.form.micro_degree_phd', 'Ph.D.') },
          { value: 'postdoc', label: t('pages_details.careers.form.micro_degree_postdoc', 'Post-Doc') }
        ]
      },
      {
        id: 'inoculants',
        type: 'radio',
        label: t('pages_details.careers.form.micro_inoc_label', 'Do you have hands-on experience with biological inoculants? *'),
        required: true,
        options: [
          { value: 'yes', label: t('common.yes', 'Yes') },
          { value: 'no', label: t('common.no', 'No') }
        ]
      },
      {
        id: 'techniques',
        type: 'textarea',
        label: t('pages_details.careers.form.micro_tech_label', 'Outline your experience with microbial strain isolation and fermentation *'),
        required: true,
        placeholder: t('pages_details.careers.form.micro_tech_ph', 'Detail laboratory techniques and bioreactor scale experience...')
      }
    ],
    digital_marketing: [
      {
        id: 'platforms',
        type: 'textarea',
        label: t('pages_details.careers.form.mktg_platforms_label', 'Which digital ad platforms have you managed, and what was your budget? *'),
        required: true,
        placeholder: t('pages_details.careers.form.mktg_platforms_ph', 'e.g. Meta Ads, Google Ads, average monthly budget of 50k INR...')
      },
      {
        id: 'strategy',
        type: 'textarea',
        label: t('pages_details.careers.form.mktg_strategy_label', 'Briefly outline a digital marketing concept to engage progressive farmers *'),
        required: true,
        placeholder: t('pages_details.careers.form.mktg_strategy_ph', 'Explain content format, channels, and language compatibility approach...')
      },
      {
        id: 'portfolio',
        type: 'text',
        label: t('pages_details.careers.form.mktg_portfolio_label', 'Link to your marketing portfolio or past visual design assets (Optional)'),
        required: false,
        placeholder: t('pages_details.careers.form.mktg_portfolio_ph', 'https://behance.net/yourprofile or Google Drive link')
      }
    ],
    qa_analyst: [
      {
        id: 'iso_experience',
        type: 'radio',
        label: t('pages_details.careers.form.qa_iso_label', 'Have you worked in an ISO, GLP, or NABL certified laboratory? *'),
        required: true,
        options: [
          { value: 'yes', label: t('common.yes', 'Yes') },
          { value: 'no', label: t('common.no', 'No') }
        ]
      },
      {
        id: 'methods',
        type: 'textarea',
        label: t('pages_details.careers.form.qa_methods_label', 'What analytical methods are you most experienced with? *'),
        required: true,
        placeholder: t('pages_details.careers.form.qa_methods_ph', 'List equipment (HPLC, purity, shelf-life) and analysis protocols...')
      },
      {
        id: 'deviation',
        type: 'textarea',
        label: t('pages_details.careers.form.qa_dev_label', 'Explain how you would handle a quality control deviation or contamination *'),
        required: true,
        placeholder: t('pages_details.careers.form.qa_dev_ph', 'Outline standard isolation, testing, and report procedures...')
      }
    ]
  };

  const [activeJob, setActiveJob] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resumeLink: '',
    answers: {}
  });
  const [resumeMethod, setResumeMethod] = useState('upload'); // 'upload' or 'link'
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sync state and reset answers when activeJob changes
  useEffect(() => {
    if (activeJob) {
      const initialAnswers = {};
      const questions = screeningQuestions[activeJob.key] || [];
      questions.forEach(q => {
        if (q.type === 'select' && q.options.length > 0) {
          initialAnswers[q.id] = q.options[0].value;
        } else if (q.type === 'radio' && q.options.length > 0) {
          initialAnswers[q.id] = q.options[0].value;
        } else {
          initialAnswers[q.id] = '';
        }
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        resumeLink: '',
        answers: initialAnswers
      });
      setResumeMethod('upload');
      setResumeFile(null);
      setSubmitted(false);
      setLoading(false);
    }
  }, [activeJob]);

  // Escape key close listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll lock when modal is open
  useEffect(() => {
    if (activeJob) {
      document.body.classList.add('modal-open');
      document.documentElement.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
    };
  }, [activeJob]);

  const handleTextChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAnswerChange = (e) => {
    setFormData(prev => ({
      ...prev,
      answers: { ...prev.answers, [e.target.name]: e.target.value }
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    }
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleClose = () => {
    setActiveJob(null);
    setSubmitted(false);
    setResumeMethod('upload');
    setResumeFile(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      resumeLink: '',
      answers: {}
    });
  };

  // Helper to render individual screening question fields
  const renderQuestionField = (q) => {
    return (
      <div key={q.id} className="careers-form-group" style={{ marginBottom: 0 }}>
        <label className="careers-form-label">{q.label}</label>
        
        {q.type === 'select' && (
          <select
            name={q.id}
            value={formData.answers[q.id] || ''}
            onChange={handleAnswerChange}
            className="careers-form-select"
            required={q.required}
          >
            {q.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}

        {q.type === 'radio' && (
          <div className="careers-radio-group">
            {q.options.map((opt) => (
              <label key={opt.value} className="careers-radio-option">
                <input
                  type="radio"
                  name={q.id}
                  value={opt.value}
                  checked={formData.answers[q.id] === opt.value}
                  onChange={handleAnswerChange}
                  required={q.required}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        )}

        {q.type === 'textarea' && (
          <textarea
            name={q.id}
            value={formData.answers[q.id] || ''}
            onChange={handleAnswerChange}
            className="careers-form-textarea"
            rows="3"
            required={q.required}
            placeholder={q.placeholder}
          ></textarea>
        )}

        {q.type === 'text' && (
          <input
            type="text"
            name={q.id}
            value={formData.answers[q.id] || ''}
            onChange={handleAnswerChange}
            className="careers-form-input"
            required={q.required}
            placeholder={q.placeholder}
          />
        )}
      </div>
    );
  };

  // Helper to structure and group role-specific questions cleanly
  const renderScreeningQuestions = (jobKey) => {
    const questions = screeningQuestions[jobKey];
    if (!questions) return null;

    if (jobKey === 'field_sales') {
      const qExp = questions.find(q => q.id === 'experience');
      const qTravel = questions.find(q => q.id === 'travel');
      const qAchievement = questions.find(q => q.id === 'achievement');
      
      return (
        <div className="form-section">
          <h4 className="form-section-title">
            <Briefcase size={16} /> {t('pages_details.careers.form.sales_screening_title', 'Role-Specific Questionnaire')}
          </h4>
          
          <div className="form-row-2">
            {qExp && renderQuestionField(qExp)}
            {qTravel && renderQuestionField(qTravel)}
          </div>
          
          {qAchievement && renderQuestionField(qAchievement)}
        </div>
      );
    }

    if (jobKey === 'research_microbiologist') {
      const qDegree = questions.find(q => q.id === 'degree');
      const qInoculants = questions.find(q => q.id === 'inoculants');
      const qTechniques = questions.find(q => q.id === 'techniques');

      return (
        <div className="form-section">
          <h4 className="form-section-title">
            <Briefcase size={16} /> {t('pages_details.careers.form.micro_screening_title', 'Role-Specific Questionnaire')}
          </h4>
          
          <div className="form-row-2">
            {qDegree && renderQuestionField(qDegree)}
            {qInoculants && renderQuestionField(qInoculants)}
          </div>
          
          {qTechniques && renderQuestionField(qTechniques)}
        </div>
      );
    }

    if (jobKey === 'digital_marketing') {
      const qPlatforms = questions.find(q => q.id === 'platforms');
      const qStrategy = questions.find(q => q.id === 'strategy');
      const qPortfolio = questions.find(q => q.id === 'portfolio');

      return (
        <div className="form-section">
          <h4 className="form-section-title">
            <Briefcase size={16} /> {t('pages_details.careers.form.mktg_screening_title', 'Role-Specific Questionnaire')}
          </h4>
          
          {qPlatforms && renderQuestionField(qPlatforms)}
          {qStrategy && renderQuestionField(qStrategy)}
          {qPortfolio && renderQuestionField(qPortfolio)}
        </div>
      );
    }

    if (jobKey === 'qa_analyst') {
      const qIso = questions.find(q => q.id === 'iso_experience');
      const qMethods = questions.find(q => q.id === 'methods');
      const qDeviation = questions.find(q => q.id === 'deviation');

      return (
        <div className="form-section">
          <h4 className="form-section-title">
            <Briefcase size={16} /> {t('pages_details.careers.form.qa_screening_title', 'Role-Specific Questionnaire')}
          </h4>
          
          {qIso && renderQuestionField(qIso)}
          {qMethods && renderQuestionField(qMethods)}
          {qDeviation && renderQuestionField(qDeviation)}
        </div>
      );
    }

    return (
      <div className="form-section">
        <h4 className="form-section-title">
          <Briefcase size={16} /> {t('pages_details.careers.form.default_screening_title', 'Pre-Screening Questionnaire')}
        </h4>
        {questions.map((q) => renderQuestionField(q))}
      </div>
    );
  };

  return (
    <GenericPage title={t('pages.careers.title')} subtitle={t('pages.careers.subtitle')} breadcrumbs={[{ label: t('pages.careers.title') }]}>
      <div className="container-careers">
        {/* Scoped CSS styling for modern, widescreen-optimized multi-section Careers layout & forms */}
        <style dangerouslySetInnerHTML={{ __html: `
          .container-careers {
            width: 100%;
            max-width: 1440px;
            margin: 0 auto;
            padding: 0 var(--sp-8);
          }
          
          .why-join-section {
            margin-bottom: var(--sp-16);
          }
          
          .why-join-cards-horizontal {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: var(--sp-6);
          }
          
          .careers-bottom-layout {
            display: grid;
            grid-template-columns: 2.2fr 1fr;
            gap: var(--sp-8);
            align-items: stretch;
            margin-bottom: var(--sp-16);
          }
          
          .openings-column {
            display: flex;
            flex-direction: column;
            gap: var(--sp-6);
          }
          
          .jobs-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: var(--sp-6);
          }
          
          .resume-cta-column {
            display: flex;
            flex-direction: column;
          }
          
          .resume-cta-sticky-card {
            position: sticky;
            top: calc(var(--navbar-height) + var(--sp-6));
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
            min-height: 380px;
            padding: var(--sp-8);
            background: linear-gradient(135deg, var(--clr-primary-surface) 0%, var(--clr-off-white) 100%);
            border: 1px dashed var(--clr-primary);
            border-radius: var(--radius-lg);
            transition: all var(--duration-normal) var(--ease-out);
          }
          
          .resume-cta-sticky-card:hover {
            border-style: solid;
            box-shadow: var(--shadow-md);
            transform: translateY(-2px);
          }
          
          /* Body scroll lock */
          body.modal-open, html.modal-open {
            overflow: hidden !important;
            height: 100% !important;
            width: 100% !important;
          }

          /* Careers Modal Layout & Form Styles */
          .careers-modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(18, 52, 26, 0.45);
            backdrop-filter: blur(8px);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: var(--sp-6) var(--sp-4);
            animation: fadeIn 0.3s ease-out;
            overscroll-behavior: contain; /* Prevent scrolling parent page from modal overlay */
          }
          
          .careers-modal-card {
            background: rgba(255, 255, 255, 0.98);
            border: 1px solid rgba(46, 125, 50, 0.1);
            border-top: 6px solid var(--clr-primary);
            border-radius: var(--radius-2xl);
            box-shadow: 0 32px 80px rgba(18, 52, 26, 0.15);
            width: 100%;
            max-width: 800px; /* Structured single-column max width */
            padding: var(--sp-8) var(--sp-10);
            position: relative;
            z-index: 1001;
            max-height: 90vh;
            overflow-y: auto;
            overscroll-behavior: contain; /* Prevent scrolling parent page from modal scroll body */
          }

          /* Highly Structured Panels & Sub-sections */
          .form-section {
            background: rgba(46, 125, 50, 0.02);
            border: 1.5px solid rgba(46, 125, 50, 0.12);
            border-radius: var(--radius-xl);
            padding: var(--sp-6);
            margin-bottom: var(--sp-5);
            display: flex;
            flex-direction: column;
            gap: var(--sp-4);
            transition: all var(--duration-normal) var(--ease-out);
          }
          
          .form-section:hover {
            border-color: rgba(46, 125, 50, 0.22);
            background: rgba(46, 125, 50, 0.03);
          }
          
          .form-section-title {
            font-size: var(--fs-body-sm);
            font-weight: var(--fw-bold);
            color: var(--clr-primary-dark);
            display: flex;
            align-items: center;
            gap: var(--sp-2.5);
            margin: 0;
            padding-bottom: var(--sp-2.5);
            border-bottom: 1.5px solid rgba(46, 125, 50, 0.08);
          }
          
          .form-section-title svg {
            color: var(--clr-primary);
          }
          
          .form-row-2 {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: var(--sp-5);
          }
          
          .form-section .careers-form-group {
            margin-bottom: 0;
          }
          
          @media (max-width: 768px) {
            .form-row-2 {
              grid-template-columns: 1fr;
              gap: var(--sp-4);
            }
            .form-section {
              padding: var(--sp-5) var(--sp-4);
            }
          }
          
          .careers-modal-close {
            position: absolute;
            top: var(--sp-5);
            right: var(--sp-5);
            width: 36px;
            height: 36px;
            border-radius: var(--radius-circle);
            background: rgba(0, 0, 0, 0.03);
            color: var(--clr-text-muted);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
          }
          
          .careers-modal-close:hover {
            background: rgba(211, 47, 47, 0.1);
            color: #d32f2f;
            transform: rotate(90deg);
          }
          
          /* Highly Structured Grids */
          .form-grid-3 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: var(--sp-6);
            margin-bottom: var(--sp-2);
          }
          
          .careers-form-group {
            display: flex;
            flex-direction: column;
            gap: var(--sp-2);
            margin-bottom: var(--sp-5);
          }
          
          .careers-form-label {
            font-size: var(--fs-body-sm);
            font-weight: var(--fw-semibold);
            color: var(--clr-text-primary);
            display: flex;
            align-items: center;
            gap: var(--sp-2);
          }
          
          .careers-form-label svg {
            color: var(--clr-primary);
          }
          
          .careers-form-input,
          .careers-form-textarea,
          .careers-form-select {
            width: 100%;
            padding: 12px 16px;
            border: 1.5px solid rgba(46, 125, 50, 0.18);
            border-radius: var(--radius-xl);
            background: #f7faf4;
            color: var(--clr-text-primary);
            font-family: inherit;
            font-size: var(--fs-body-sm);
            transition: all var(--duration-normal) var(--ease-out);
            outline: none;
          }
          
          .careers-form-input:hover,
          .careers-form-textarea:hover,
          .careers-form-select:hover {
            border-color: rgba(46, 125, 50, 0.35);
            background: #f4f8f0;
          }
          
          .careers-form-input:focus,
          .careers-form-textarea:focus,
          .careers-form-select:focus {
            border-color: var(--clr-primary);
            background: var(--clr-white);
            box-shadow: 0 4px 16px rgba(46, 125, 50, 0.08), 0 0 0 4px rgba(46, 125, 50, 0.15);
          }
          
          .careers-form-select {
            appearance: none;
            background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%232E7D32' stroke-linecap='round' stroke-linejoin='round' stroke-width='2.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E");
            background-position: right var(--sp-4) center;
            background-repeat: no-repeat;
            background-size: 16px;
            padding-right: var(--sp-10);
            cursor: pointer;
          }
          
          .careers-radio-group {
            display: flex;
            gap: var(--sp-6);
            margin-top: var(--sp-1.5);
          }
          
          .careers-radio-option {
            display: flex;
            align-items: center;
            gap: var(--sp-2);
            font-size: var(--fs-body-sm);
            color: var(--clr-text-body);
            cursor: pointer;
          }
          
          .careers-radio-option input[type="radio"] {
            accent-color: var(--clr-primary);
            width: 18px;
            height: 18px;
            cursor: pointer;
          }
          
          /* Resume Upload Toggle & Zone Styles */
          .resume-method-tabs {
            display: flex;
            border-bottom: 1.5px solid rgba(46, 125, 50, 0.1);
            margin-bottom: var(--sp-3);
            gap: var(--sp-3);
          }
          
          .resume-tab-btn {
            font-size: var(--fs-caption);
            font-weight: var(--fw-semibold);
            padding: var(--sp-2) var(--sp-4);
            color: var(--clr-text-muted);
            border-bottom: 2.5px solid transparent;
            cursor: pointer;
            transition: all var(--duration-fast) var(--ease-out);
            border: none;
            background: none;
          }
          
          .resume-tab-btn.active {
            color: var(--clr-primary);
            border-bottom-color: var(--clr-primary);
          }
          
          .file-upload-zone {
            border: 2px dashed rgba(46, 125, 50, 0.25);
            border-radius: var(--radius-xl);
            padding: var(--sp-5) var(--sp-4);
            text-align: center;
            background: rgba(46, 125, 50, 0.02);
            cursor: pointer;
            transition: all var(--duration-normal) var(--ease-out);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--sp-2);
          }
          
          .file-upload-zone:hover {
            border-color: var(--clr-primary);
            background: var(--clr-primary-surface);
          }
          
          .file-selected-card {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: var(--clr-primary-surface);
            border: 1px solid var(--clr-primary-lighter);
            border-radius: var(--radius-xl);
            padding: var(--sp-3) var(--sp-5);
            font-size: var(--fs-body-sm);
            color: var(--clr-primary-dark);
          }
          
          .careers-success-pane {
            text-align: center;
            padding: var(--sp-4) 0;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .careers-success-ring {
            width: 72px;
            height: 72px;
            border-radius: var(--radius-circle);
            border: 2px solid var(--clr-primary);
            background: rgba(46, 125, 50, 0.08);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: var(--sp-4);
            animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          
          @media (max-width: 1200px) {
            .careers-bottom-layout {
              grid-template-columns: 1.8fr 1fr;
              gap: var(--sp-6);
            }
            .why-join-cards-horizontal {
              grid-template-columns: repeat(2, 1fr);
              gap: var(--sp-4);
            }
          }
          
          @media (max-width: 992px) {
            .container-careers {
              padding: 0 var(--sp-6);
            }
            .careers-bottom-layout {
              grid-template-columns: 1fr;
              gap: var(--sp-12);
            }
            .resume-cta-sticky-card {
              position: static;
              height: auto;
              min-height: auto;
              padding: var(--sp-6);
            }
          }
          
          @media (max-width: 768px) {
            .form-grid-3 {
              grid-template-columns: 1fr;
              gap: 0;
            }
            .careers-modal-card {
              padding: var(--sp-6);
            }
          }
          
          @media (max-width: 576px) {
            .careers-modal-card {
              padding: var(--sp-5);
            }
          }
          
          @keyframes scaleIn {
            from {
              transform: scale(0.5);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}} />

        {/* Section 1: Why Join Jay Agritech (Full Width Horizontal Grid) */}
        <div className="why-join-section">
          <AnimatedSection style={{ textAlign: 'center', marginBottom: 'var(--sp-10)' }}>
            <span className="section-overline">{t('pages.careers.overline')}</span>
            <h2 className="section-title" style={{ fontSize: 'var(--fs-h2)', margin: '0 auto var(--sp-3) auto', maxWidth: '800px' }}>
              {t('pages.careers.why_partner', 'Why Join Jay Agritech?')}
            </h2>
            <p style={{ color: 'var(--clr-text-muted)', fontSize: 'var(--fs-body-lg)', maxWidth: '600px', margin: '0 auto' }}>
              {t('pages.careers.why_join_subtitle', 'Grow your career with a team dedicated to agricultural bio-technology excellence')}
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="why-join-cards-horizontal">
              {[
                { icon: <Heart size={24} />, key: 'mission_driven' },
                { icon: <Sprout size={24} />, key: 'growth' },
                { icon: <Users size={24} />, key: 'culture' },
                { icon: <Zap size={24} />, key: 'impact' },
              ].map((item, i) => (
                <div key={i} className="card hover-lift" style={{ padding: 'var(--sp-6)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)', height: '100%' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-lg)', background: 'var(--clr-primary-surface)', color: 'var(--clr-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <h4 style={{ fontSize: 'var(--fs-body)', fontWeight: 'var(--fw-semibold)', color: 'var(--clr-text-primary)', margin: 0 }}>
                    {t(`pages_details.careers.why_join.${item.key}.title`)}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--clr-text-muted)', margin: 0, lineHeight: '1.5' }}>
                    {t(`pages_details.careers.why_join.${item.key}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Section 2: Opportunities & Applications (Careers Bottom Layout with matched heights) */}
        <div className="careers-bottom-layout">
          {/* Left Column: Job Listings Grid */}
          <div className="openings-column">
            <AnimatedSection>
              <span className="section-overline">{t('pages.careers.overline')}</span>
              <h2 className="section-title" style={{ fontSize: 'var(--fs-h3)', marginBottom: 'var(--sp-6)' }}>
                {t('pages.careers.current_openings')}
              </h2>

              <div className="jobs-grid">
                {openings.map((job, i) => (
                  <div key={i} className="card hover-lift" style={{ padding: 'var(--sp-6)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <div>
                      <div style={{ display: 'flex', gap: 'var(--sp-3)', marginBottom: 'var(--sp-3)', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span className="badge badge-green">{job.department}</span>
                        <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--clr-text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Clock size={12} /> {job.type}
                        </span>
                      </div>
                      <h3 style={{ fontSize: 'var(--fs-body-lg)', fontWeight: 'var(--fw-semibold)', marginBottom: 'var(--sp-1)', color: 'var(--clr-text-primary)' }}>
                        {t(`pages_details.careers.jobs.${job.key}.title`)}
                      </h3>
                      <p style={{ fontSize: '13px', color: 'var(--clr-text-muted)', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 'var(--sp-3)' }}>
                        <MapPin size={12} /> {job.location}
                      </p>
                      <p style={{ fontSize: '13px', color: 'var(--clr-text-body)', margin: 0, lineHeight: '1.5' }}>
                        {job.desc}
                      </p>
                    </div>
                    <div style={{ marginTop: 'var(--sp-6)' }}>
                      <button
                        onClick={() => setActiveJob(job)}
                        className="btn btn-primary"
                        style={{ width: '100%', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: 6 }}
                      >
                        {t('pages.careers.apply')} <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Right Column: Sticky Application CTA Card with matching height */}
          <div className="resume-cta-column">
            <AnimatedSection style={{ height: '100%' }}>
              <div className="resume-cta-sticky-card">
                <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-xl)', background: 'var(--clr-white)', boxShadow: 'var(--shadow-sm)', color: 'var(--clr-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--sp-5)', marginInline: 'auto' }}>
                  <Briefcase size={28} />
                </div>
                <h4 style={{ fontSize: 'var(--fs-h4)', fontWeight: 'var(--fw-bold)', marginBottom: 'var(--sp-3)', textAlign: 'center', color: 'var(--clr-text-primary)' }}>
                  {t('pages_details.careers.no_role_text')}
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--clr-text-muted)', marginBottom: 'var(--sp-6)', textAlign: 'center', lineHeight: '1.6' }}>
                  {t('pages.careers.subtitle')}
                </p>
                <a href="mailto:careers@jayagritech.com" className="btn btn-secondary" style={{ width: '100%', display: 'inline-flex', justifyContent: 'center', padding: 'var(--sp-3) var(--sp-4)' }}>
                  {t('pages.careers.email_resume')} <ArrowRight size={14} style={{ marginLeft: 6 }} />
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Job Application Pop-Up Modal */}
      {activeJob && (
        <div className="careers-modal-overlay" onClick={(e) => e.target.className === 'careers-modal-overlay' && handleClose()}>
          <div className="careers-modal-card animate-scale-up">
            {/* Close Button */}
            <button className="careers-modal-close" onClick={handleClose} aria-label={t('common.close', 'Close')}>
              <X size={20} />
            </button>

            {submitted ? (
              /* Success Feedback Screen */
              <div className="careers-success-pane">
                <div className="careers-success-ring">
                  <CheckCircle size={36} style={{ color: 'var(--clr-primary)' }} />
                </div>
                <h3 style={{ fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-bold)', marginBottom: 'var(--sp-2)', color: 'var(--clr-text-primary)' }}>
                  {t('pages_details.careers.form.success_title', 'Application Submitted!')}
                </h3>
                <p style={{ fontSize: 'var(--fs-body-sm)', color: 'var(--clr-text-muted)', marginBottom: 'var(--sp-6)', maxWidth: '440px', lineHeight: '1.6' }}>
                  {t('pages_details.careers.form.success_desc', 'Thank you for applying to Jay Agritech. We have successfully registered your candidacy profile with the details listed below:')}
                </p>

                <div style={{ width: '100%', maxWidth: '440px', padding: 'var(--sp-4)', border: '1px dashed var(--clr-primary-lighter)', borderRadius: 'var(--radius-lg)', background: 'var(--clr-primary-surface)', textAlign: 'left', marginBottom: 'var(--sp-6)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--clr-divider)', paddingBottom: 'var(--sp-2)' }}>
                    <span style={{ fontSize: '13px', color: 'var(--clr-text-muted)' }}>{t('pages_details.careers.form.job_applied', 'Applied Position')}:</span>
                    <strong style={{ fontSize: '13px', color: 'var(--clr-text-primary)' }}>{t(`pages_details.careers.jobs.${activeJob.key}.title`)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--clr-divider)', paddingBottom: 'var(--sp-2)' }}>
                    <span style={{ fontSize: '13px', color: 'var(--clr-text-muted)' }}>{t('pages_details.careers.form.applicant_name', 'Applicant Name')}:</span>
                    <strong style={{ fontSize: '13px', color: 'var(--clr-text-primary)' }}>{formData.name}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', color: 'var(--clr-text-muted)' }}>{t('pages_details.careers.form.contact_details', 'Contact Email')}:</span>
                    <strong style={{ fontSize: '13px', color: 'var(--clr-text-primary)' }}>{formData.email}</strong>
                  </div>
                </div>

                <p style={{ fontSize: 'var(--fs-caption)', color: 'var(--clr-text-muted)', maxWidth: '440px', lineHeight: '1.5', marginBottom: 'var(--sp-6)' }}>
                  {t('pages_details.careers.form.success_footer', 'Our human resources department will evaluate your qualifications and custom screening responses. Shortlisted candidates will be contacted within 5–7 business days.')}
                </p>

                <button className="btn btn-primary" onClick={handleClose} style={{ width: '100%', maxWidth: '200px' }}>
                  {t('b2b.success.done_btn', 'Finish & Close')}
                </button>
              </div>
            ) : (
              /* Actual Application Form */
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-6)' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', background: 'var(--clr-primary-surface)', color: 'var(--clr-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Briefcase size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 'var(--fs-h3)', margin: 0, color: 'var(--clr-text-primary)' }}>
                      {t(`pages_details.careers.jobs.${activeJob.key}.title`)}
                    </h3>
                    <span style={{ fontSize: 'var(--fs-caption)', color: 'var(--clr-text-muted)', display: 'block', marginTop: 2 }}>
                      {activeJob.department} &bull; {activeJob.location}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
                  
                  {/* Part 1: Contact Information (Beautifully Structured Panel) */}
                  <div className="form-section">
                    <h4 className="form-section-title">
                      <User size={16} /> {t('pages_details.careers.form.personal_details_title', 'Personal Details')}
                    </h4>
                    <div className="form-grid-3">
                      <div className="careers-form-group">
                        <label className="careers-form-label">
                          <User size={14} /> {t('pages_details.careers.form.name_label', 'Full Name')} *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleTextChange}
                          className="careers-form-input"
                          placeholder={t('pages_details.careers.form.name_placeholder', 'Your full name')}
                        />
                      </div>

                      <div className="careers-form-group">
                        <label className="careers-form-label">
                          <Mail size={14} /> {t('pages_details.careers.form.email_label', 'Email Address')} *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleTextChange}
                          className="careers-form-input"
                          placeholder={t('pages_details.careers.form.email_placeholder', 'e.g. yourname@gmail.com')}
                        />
                      </div>

                      <div className="careers-form-group">
                        <label className="careers-form-label">
                          <Phone size={14} /> {t('pages_details.careers.form.phone_label', 'Phone Number')} *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleTextChange}
                          className="careers-form-input"
                          placeholder={t('pages_details.careers.form.phone_placeholder', 'e.g. +91 98765 43210')}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Part 2: Resume / CV Section (Highly Structured Panel) */}
                  <div className="form-section">
                    <h4 className="form-section-title">
                      <FileText size={16} /> {t('pages_details.careers.form.professional_resume_title', 'Professional Resume')}
                    </h4>
                    <div className="careers-form-group" style={{ marginBottom: 0 }}>
                      {/* Resume Format Selector Tabs */}
                      <div className="resume-method-tabs">
                        <button
                          type="button"
                          onClick={() => setResumeMethod('upload')}
                          className={`resume-tab-btn ${resumeMethod === 'upload' ? 'active' : ''}`}
                        >
                          📄 {t('pages_details.careers.form.upload_pdf', 'Upload PDF')}
                        </button>
                        <button
                          type="button"
                          onClick={() => setResumeMethod('link')}
                          className={`resume-tab-btn ${resumeMethod === 'link' ? 'active' : ''}`}
                        >
                          🔗 {t('pages_details.careers.form.paste_link', 'Drive/Dropbox Link')}
                        </button>
                      </div>

                      {resumeMethod === 'upload' ? (
                        <div>
                          {resumeFile ? (
                            <div className="file-selected-card">
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <FileText size={16} />
                                <span style={{ fontWeight: 'var(--fw-medium)' }}>{resumeFile.name}</span>
                              </div>
                              <button
                                type="button"
                                onClick={handleRemoveFile}
                                style={{ color: '#d32f2f', fontWeight: 'bold', fontSize: '12px' }}
                              >
                                ✕ {t('pages_details.careers.form.remove', 'Remove')}
                              </button>
                            </div>
                          ) : (
                            <label className="file-upload-zone">
                              <input
                                type="file"
                                accept=".pdf"
                                required
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                              />
                              <FileText size={24} style={{ color: 'var(--clr-primary)' }} />
                              <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--clr-text-primary)' }}>
                                {t('pages_details.careers.form.upload_click', 'Click to upload PDF resume')}
                              </span>
                              <span style={{ fontSize: '11px', color: 'var(--clr-text-muted)' }}>
                                {t('pages_details.careers.form.pdf_only', 'PDF format only (Max 5MB)')}
                              </span>
                            </label>
                          )}
                        </div>
                      ) : (
                        <input
                          type="url"
                          name="resumeLink"
                          required
                          value={formData.resumeLink}
                          onChange={handleTextChange}
                          className="careers-form-input"
                          placeholder={t('pages_details.careers.form.drive_placeholder', 'https://drive.google.com/... (must be shared/accessible)')}
                        />
                      )}
                    </div>
                  </div>

                  {/* Part 3: Dynamic Screening Questions (Structured panels with custom responsive grid alignments) */}
                  {renderScreeningQuestions(activeJob.key)}

                  {/* Part 4: Form Actions (Stretches across bottom) */}
                  <div style={{ display: 'flex', gap: 'var(--sp-3)', marginTop: 'var(--sp-4)', borderTop: '1px solid var(--clr-divider)', paddingTop: 'var(--sp-4)' }}>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: 'var(--sp-3) var(--sp-4)' }}
                    >
                      {t('pages_details.careers.form.cancel', 'Cancel')}
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary"
                      style={{ flex: 2, padding: 'var(--sp-3) var(--sp-4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--sp-2)' }}
                    >
                      {loading ? (
                        t('pages_details.careers.form.submitting', 'Processing application...')
                      ) : (
                        <>
                          {t('pages_details.careers.form.submit_application', 'Submit Application')} <Send size={14} />
                        </>
                      )}
                    </button>
                  </div>


                </form>
              </>
            )}
          </div>
        </div>
      )}
    </GenericPage>
  );
}
