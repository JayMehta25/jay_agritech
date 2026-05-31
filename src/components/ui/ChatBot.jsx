import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { X, User, HelpCircle, Send, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { assetSrc } from '../../utils/assetSrc';
import logoImgAsset from '../../assets/new_title.png';
import { products } from '../../data/siteData';

const logoImg = assetSrc(logoImgAsset);

const INDIAN_STATES = [
  "andhra pradesh", "arunachal pradesh", "assam", "bihar", "chhattisgarh", "goa", "gujarat", "haryana",
  "himachal pradesh", "jharkhand", "karnataka", "kerala", "madhya pradesh", "maharashtra", "manipur",
  "meghalaya", "mizoram", "nagaland", "odisha", "punjab", "rajasthan", "sikkim", "tamil nadu",
  "telangana", "tripura", "uttar pradesh", "uttarakhand", "west bengal", "delhi", "jammu and kashmir",
  "ladakh", "puducherry", "chandigarh", "andaman and nicobar", "lakshadweep", "dadra and nagar haveli",
  "daman and diu"
];

const MAJOR_INDIAN_CITIES = [
  "mumbai", "delhi", "bangalore", "hyderabad", "ahmedabad", "chennai", "kolkata", "surat", "pune",
  "jaipur", "lucknow", "kanpur", "nagpur", "indore", "thane", "bhopal", "visakhapatnam", "patna",
  "vadodara", "ghaziabad", "ludhiana", "agra", "nashik", "faridabad", "meerut", "rajkot", "varanasi",
  "srinagar", "aurangabad", "dhanbad", "amritsar", "navi mumbai", "allahabad", "ranchi", "howrah",
  "coimbatore", "jabalpur", "gwalior", "vijayawada", "jodhpur", "madurai", "raipur", "kota",
  "guwahati", "solapur", "hubli", "dharwad", "bareilly", "moradabad", "mysore", "gurgaon", "aligarh",
  "jalandhar", "tiruchirappalli", "bhubaneswar", "salem", "mira bhayandar", "trivandrum", "bhiwandi",
  "saharanpur", "gorakhpur", "guntur", "bikaner", "amravati", "noida", "jamshedpur", "bhilai", "cuttack",
  "firozabad", "kochi", "nellore", "bhavnagar", "dehradun", "durgapur", "asansol", "rourkela", "nanded",
  "kolhapur", "ajmer", "akola", "gulbarga", "jamnagar", "ujjain", "loni", "siliguri", "jhansi", "ulhasnagar",
  "jammu", "sangli", "mangalore", "erode", "belgaum", "tirunelveli", "malegaon", "gaya", "jalgaon", "udaipur",
  "davanagere", "kozikode", "kurnool", "rajahmundry", "bokaro", "bellary", "patiala", "agartala", "bhagalpur",
  "muzaffarnagar", "latur", "dhule", "tiruppur", "rohtak", "korba", "bhilwara", "muzaffarpur", "ahmednagar",
  "mathura", "kollam", "avadi", "kadapa", "bilaspur", "satara", "bijapur", "rampur", "shimoga", "chandrapur",
  "junagadh", "thrissur", "alwar", "kakinada", "nizamabad", "parbhani", "tumkur", "khammam", "panipat",
  "darbhanga", "aizawl", "dewas", "ichalkaranji", "karnal", "bathinda", "jalna", "eluru", "barasat", "purnia",
  "satna", "mau", "sonipat", "farrukhabad", "sagar", "durg", "imphal", "ratlam", "hapur", "anantapur", "arrah",
  "karimnagar", "ramagundam", "etawah", "ambernath", "bharatpur", "begusarai", "new delhi", "gandhidham",
  "pali", "valsad", "vapi", "navsari", "anand", "nadiad", "mehsana", "morbi", "porbandar", "veraval",
  "surendranagar", "gandhinagar", "bharuch", "godhra", "dahod", "bhuj"
];

// Self-contained Markdown-Lite Parser for Chat Bubbles
function formatText(text) {
  if (!text) return null;
  
  const lines = text.split('\n');
  const elements = [];
  let listItems = [];
  
  // Parse inline bold tags (**bold**)
  const parseBold = (str) => {
    const parts = str.split('**');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} style={{ fontWeight: 'var(--fw-bold)', color: 'inherit' }}>{part}</strong>;
      }
      return part;
    });
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    
    // Check if it's a list bullet
    if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
      const bulletText = trimmed.replace(/^[•\-\*]\s*/, '');
      listItems.push(
        <li key={i} style={{ marginBottom: '4px', listStyleType: 'disc', marginLeft: '16px', color: 'inherit' }}>
          {parseBold(bulletText)}
        </li>
      );
    } else {
      // Flush previous list items if any
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${i}`} style={{ margin: '8px 0', paddingLeft: '8px', color: 'inherit' }}>
            {listItems}
          </ul>
        );
        listItems = [];
      }
      
      if (trimmed) {
        // Headers & Titles
        if (trimmed.startsWith('###')) {
          elements.push(
            <h5 key={i} style={{ fontSize: '13px', fontWeight: 'var(--fw-bold)', margin: '8px 0 4px 0', color: 'inherit', letterSpacing: '0.3px' }}>
              {parseBold(trimmed.replace(/^###\s*/, ''))}
            </h5>
          );
        } else if (trimmed.startsWith('##')) {
          elements.push(
            <h4 key={i} style={{ fontSize: '14px', fontWeight: 'var(--fw-bold)', margin: '10px 0 6px 0', color: 'inherit', letterSpacing: '0.4px' }}>
              {parseBold(trimmed.replace(/^##\s*/, ''))}
            </h4>
          );
        } else if (trimmed.startsWith('#')) {
          elements.push(
            <h3 key={i} style={{ fontSize: '15px', fontWeight: 'var(--fw-bold)', margin: '12px 0 6px 0', color: 'inherit', letterSpacing: '0.5px' }}>
              {parseBold(trimmed.replace(/^#\s*/, ''))}
            </h3>
          );
        } else {
          elements.push(
            <p key={i} style={{ margin: '6px 0', color: 'inherit', lineHeight: '1.5' }}>
              {parseBold(trimmed)}
            </p>
          );
        }
      } else {
        // Empty line break spacing
        elements.push(<div key={i} style={{ height: '8px' }} />);
      }
    }
  });

  if (listItems.length > 0) {
    elements.push(
      <ul key="list-final" style={{ margin: '8px 0', paddingLeft: '8px', color: 'inherit' }}>
        {listItems}
      </ul>
    );
  }

  return <div style={{ color: 'inherit' }}>{elements}</div>;
}

// Typewriter Text Effect Component with Dynamic Live Formatting
function TypewriterText({ text, onComplete }) {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, 10); // Swift 10ms typing speed
    
    return () => clearInterval(timer);
  }, [text]);

  return <>{formatText(displayedText)}</>;
}

const getDynamicPopupText = (pathname, lang) => {
  const paths = {
    home: {
      en: "Welcome to Jay Agritech! Want to explore our 60+ biological products? 🌾",
      hi: "जय एग्रीटेक में आपका स्वागत है! हमारे 60+ जैविक उत्पादों को देखना चाहते हैं? 🌾",
      zh: "欢迎来到杰亚农科！想了解我们的60余种生物肥料与农科产品吗？ 🌾"
    },
    products: {
      en: "Looking for premium bio-fertilizers, stimulators, or organic manure? Let me help! 🧪",
      hi: "क्या आप प्रीमियम जैविक उर्वरक, बायोसिटमुलेंट्स, या जैविक खाद खोज रहे हैं? मैं मदद करूँ! 🧪",
      zh: "正在寻找优质的生物肥料、生物刺激素或有机肥吗？让我来帮您！ 🧪"
    },
    about: {
      en: "Curious about our 50-year legacy, R&D labs, or green quality standards? Let's chat! 🔬",
      hi: "क्या आप हमारी 50 साल की विरासत, आरएंडडी प्रयोगशालाओं, या ग्रीन मानकों के बारे में उत्सुक हैं? 🔬",
      zh: "对我们的50年工业传承、微生物研发中心或绿色质量标准感兴趣吗？聊聊吧！ 🔬"
    },
    partners: {
      en: "Interested in becoming an authorized dealer or distributor in India? Ask me! 🤝",
      hi: "क्या आप भारत में हमारे अधिकृत डीलर या वितरक बनने में रुचि रखते हैं? 🤝",
      zh: "有兴趣成为我们在印度的特许经销商或分销合作伙伴吗？问我吧！ 🤝"
    },
    solutions: {
      en: "Need advice on soil health, nutrient management, or disease protection? 🌿",
      hi: "मिट्टी के स्वास्थ्य, पोषक तत्व प्रबंधन, या कीट रोग सुरक्षा पर सलाह चाहिए? 🌿",
      zh: "需要土壤健康修复、作物营养管理或绿色病虫害防治方面的建议吗？ 🌿"
    },
    contact: {
      en: "Have questions about quotes, samples, or visits? Ask me anything! 📞",
      hi: "क्या आपके पास कोटेशन, उत्पाद नमूने, या विनिर्माण दौरे के बारे में प्रश्न हैं? 📞",
      zh: "关于价格报价、免费大田试验样品或考察参观有任何疑问吗？问我吧！ 📞"
    },
    defaultText: {
      en: "Hi! How can I help you today? 👋",
      hi: "नमस्ते! मैं आज आपकी क्या सहायता कर सकता हूँ? 👋",
      zh: "您好！今天我能为您做些什么？ 👋"
    }
  };

  let pageType = 'defaultText';
  if (pathname === '/' || pathname === '') {
    pageType = 'home';
  } else if (pathname.includes('/products')) {
    pageType = 'products';
  } else if (pathname.includes('/aboutus') || pathname.includes('/presence')) {
    pageType = 'about';
  } else if (pathname.includes('/partners') || pathname.includes('/become_partner')) {
    pageType = 'partners';
  } else if (pathname.includes('/solutions') || pathname.includes('/growth-system')) {
    pageType = 'solutions';
  } else if (pathname.includes('/contact')) {
    pageType = 'contact';
  }

  const set = paths[pageType] || paths.defaultText;
  return set[lang] || set.en;
};

// 🤖 CO-PILOT AGENT TASK WORKFLOW CONFIGURATION
const AGENT_WORKFLOWS = {
  product_enquiry: [
    {
      step: 0,
      question: "Which product category are you interested in?",
      type: "buttons",
      options: [
        { label: "Bio Fertilizers 🦠", value: "bio-fertilizers" },
        { label: "Biostimulants ✨", value: "biostimulants" },
        { label: "Bio Insecticides 🛡️", value: "bio-insecticides" },
        { label: "Organic Nutrients 🍃", value: "organic-nutrients" },
        { label: "Micronutrients 💎", value: "micronutrients" }
      ],
      next: (val) => ({
        category: val
      })
    },
    {
      step: 1,
      question: "Great choice! Which specific product would you like to inquire about?",
      type: "buttons",
      options: (data) => {
        const cat = products.categories.find(c => c.slug === data.category);
        return cat ? cat.products.map(p => ({ label: p.name, value: p.slug })) : [];
      },
      next: (val, data) => {
        const cat = products.categories.find(c => c.slug === data.category);
        const prod = cat ? cat.products.find(p => p.slug === val) : null;
        return {
          productSlug: val,
          productName: prod ? prod.name : val
        };
      }
    },
    {
      step: 2,
      question: (data) => `I have set up the inquiry dossier for **${data.productName || 'your product'}**! Let's gather the details. What is your **Full Name**?`,
      type: "text",
      field: "name",
      labelMatch: "name",
      validate: (val) => (!val || val.trim().length < 2 || /\d/.test(val)) ? "⚠️ Please enter a valid name (at least 2 characters, without numbers)." : null
    },
    {
      step: 3,
      question: "Excellent. What is your **Email Address**?",
      type: "text",
      field: "email",
      labelMatch: "email",
      validate: (val) => (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) ? "⚠️ That doesn't look like a valid email address. Please try again (e.g., name@example.com)." : null
    },
    {
      step: 4,
      question: "Got it. What is your **Phone Number**?",
      type: "text",
      field: "phone",
      labelMatch: "phone",
      validate: (val) => {
        const digits = val.replace(/[^0-9]/g, '');
        return (digits.length < 10) ? "⚠️ Please enter a valid phone number (at least 10 digits)." : null;
      }
    },
    {
      step: 5,
      question: "Thanks! What is your **Location (City, State)**?",
      type: "text",
      field: "location",
      labelMatch: "location",
      validate: (val) => {
        if (!val) return "⚠️ Please enter a valid location (e.g., Valsad, Gujarat).";
        const clean = val.toLowerCase().replace(/[^a-z0-9\s,]/g, '');
        const parts = clean.split(/[\s,]+/).map(p => p.trim()).filter(Boolean);
        const hasValidCity = parts.some(part => MAJOR_INDIAN_CITIES.includes(part)) || MAJOR_INDIAN_CITIES.includes(clean.trim());
        const hasValidState = parts.some(part => INDIAN_STATES.includes(part)) || INDIAN_STATES.includes(clean.trim());
        return (!hasValidCity && !hasValidState) ? "⚠️ Please enter a valid Indian city or state (e.g., Valsad, Gujarat)." : null;
      }
    },
    {
      step: 6,
      question: "Perfect. What is your **Company / Farm Name**? (Or type 'Individual' to skip)",
      type: "text",
      field: "company",
      labelMatch: "company",
      validate: (val) => (!val || val.trim().length < 2) ? "⚠️ Please enter a valid company/farm name, or type 'Individual' to skip." : null
    },
    {
      step: 7,
      question: "How many units do you need? (e.g., 100)",
      type: "text",
      field: "quantity",
      labelMatch: "quantity",
      validate: (val) => {
        const num = Number(val.trim());
        return (isNaN(num) || num <= 0 || !Number.isInteger(num)) ? "⚠️ Please enter a valid positive quantity number (integer)." : null;
      }
    },
    {
      step: 8,
      question: "Almost done! Do you have any **special requirements or crop details**? (Type 'None' to skip)",
      type: "text",
      field: "message",
      labelMatch: "message",
      validate: (val) => (!val || val.trim().length < 2) ? "⚠️ Please specify requirements, or type 'None' to skip." : null
    },
    {
      step: 9,
      question: "I have gathered all the details! Would you like me to submit the Product Inquiry directly in the background, or do you want to review the filled form on our page first?",
      type: "buttons",
      options: [
        { label: "Submit", value: "submit" },
        { label: "Review filled form on page", value: "manual" }
      ]
    }
  ],
  become_partner: [
    {
      step: 0,
      question: "Let's start your Partner Application! Which program would you like to apply for?",
      type: "buttons",
      options: [
        { label: "Dealer Program 🤝", value: "dealer" },
        { label: "Distributor Program 🚚", value: "distributor" },
        { label: "Export Program 🌐", value: "export" }
      ],
      next: (val) => ({
        program: val
      })
    },
    {
      step: 1,
      question: "Perfect! Let's gather the details. What is your **Full Name**?",
      type: "text",
      field: "fullName",
      labelMatch: "full name",
      validate: (val) => (!val || val.trim().length < 2 || /\d/.test(val)) ? "⚠️ Please enter a valid name (at least 2 characters, without numbers)." : null
    },
    {
      step: 2,
      question: (data) => data.program === 'dealer' ? "What is your **Shop Name**?" : "What is your **Company Name**?",
      type: "text",
      field: (data) => data.program === 'dealer' ? "shopName" : "companyName",
      labelMatch: (data) => data.program === 'dealer' ? "shop name" : "company name",
      validate: (val) => (!val || val.trim().length < 2) ? "⚠️ Please enter a valid name (at least 2 characters)." : null
    },
    {
      step: 3,
      question: "What is your **Phone Number**?",
      type: "text",
      field: "phone",
      labelMatch: "phone",
      validate: (val) => {
        const digits = val.replace(/[^0-9]/g, '');
        return (digits.length < 10) ? "⚠️ Please enter a valid phone number (at least 10 digits)." : null;
      }
    },
    {
      step: 4,
      question: "What is your **Email Address**?",
      type: "text",
      field: "email",
      labelMatch: "email",
      validate: (val) => (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) ? "⚠️ That doesn't look like a valid email address. Please try again (e.g., name@example.com)." : null
    },
    {
      step: 5,
      question: "What is your **Full Address**?",
      type: "text",
      field: "address",
      labelMatch: "address",
      validate: (val) => (!val || val.trim().length < 6) ? "⚠️ Please enter a valid full address (at least 6 characters)." : null
    },
    {
      step: 6,
      question: "What is your **City**?",
      type: "text",
      field: "city",
      labelMatch: "city",
      validate: (val) => {
        if (!val) return "⚠️ Please enter a valid city name.";
        const clean = val.trim().toLowerCase();
        const hasValidCity = MAJOR_INDIAN_CITIES.includes(clean);
        return !hasValidCity ? "⚠️ Please enter a valid Indian city (e.g., Valsad, Mumbai)." : null;
      }
    },
    {
      step: 7,
      question: "What is your **State / Country**?",
      type: "text",
      field: (data) => data.program === 'export' ? "country" : "state",
      labelMatch: (data) => data.program === 'export' ? "country" : "state",
      validate: (val, data) => {
        if (data && data.program === 'export') {
          return (!val || val.trim().length < 2 || /\d/.test(val)) ? "⚠️ Please enter a valid country name." : null;
        }
        if (!val) return "⚠️ Please enter a valid state name.";
        const clean = val.trim().toLowerCase();
        const hasValidState = INDIAN_STATES.includes(clean);
        return !hasValidState ? "⚠️ Please enter a valid Indian state (e.g., Gujarat, Maharashtra)." : null;
      }
    },
    {
      step: 8,
      question: (data) => {
        if (data.program === 'dealer') return "Which products do you currently sell? (Seeds, Fertilizers, All, None)";
        if (data.program === 'distributor') return "What is your annual **Business Turnover**? (e.g., 50 Lakhs)";
        return "Which product categories are you interested in importing?";
      },
      type: "text",
      field: (data) => {
        if (data.program === 'dealer') return "currentProducts";
        if (data.program === 'distributor') return "turnover";
        return "productsOfInterest";
      },
      labelMatch: (data) => {
        if (data.program === 'dealer') return "products sold";
        if (data.program === 'distributor') return "turnover";
        return "products";
      },
      validate: (val) => (!val || val.trim().length < 2) ? "⚠️ Please enter valid details response." : null
    },
    {
      step: 9,
      question: "Excellent. Any comments or messages for our partnership board?",
      type: "text",
      field: "message",
      labelMatch: "message",
      validate: (val) => (!val || val.trim().length < 2) ? "⚠️ Please enter comments, or type 'None' to skip." : null
    },
    {
      step: 10,
      question: "I have gathered all the partnership details! Would you like me to submit the application in the background, or do you want to review the filled form on our page first?",
      type: "buttons",
      options: [
        { label: "Submit", value: "submit" },
        { label: "Review filled form on page", value: "manual" }
      ]
    }
  ],
  contact: [
    {
      step: 0,
      question: "Let's gather the details for our General Contact Form! Ready to start?",
      type: "buttons",
      options: [
        { label: "Yes, let's start", value: "start" }
      ],
      next: () => ({})
    },
    {
      step: 1,
      question: "Great! What is your **Full Name**?",
      type: "text",
      field: "name",
      labelMatch: "name",
      validate: (val) => (!val || val.trim().length < 2 || /\d/.test(val)) ? "⚠️ Please enter a valid name (at least 2 characters, without numbers)." : null
    },
    {
      step: 2,
      question: "What is your **Email Address**?",
      type: "text",
      field: "email",
      labelMatch: "email",
      validate: (val) => (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) ? "⚠️ That doesn't look like a valid email address. Please try again (e.g., name@example.com)." : null
    },
    {
      step: 3,
      question: "What is your **Phone Number**? (Optional, type 'None' to skip)",
      type: "text",
      field: "phone",
      labelMatch: "phone",
      validate: (val) => {
        const trimmed = val.trim().toLowerCase();
        if (trimmed === 'none' || trimmed === 'skip' || trimmed === '') return null;
        const digits = trimmed.replace(/[^0-9]/g, '');
        return (digits.length < 10) ? "⚠️ Please enter a valid phone number (at least 10 digits) or type 'None' to skip." : null;
      }
    },
    {
      step: 4,
      question: "What is the topic of your inquiry? (Product, Partnership, Bulk, Technical, Other)",
      type: "text",
      field: "subject",
      labelMatch: "subject",
      validate: (val) => (!val || val.trim().length < 2) ? "⚠️ Please enter a valid subject topic." : null
    },
    {
      step: 5,
      question: "What is your **Message** for us?",
      type: "text",
      field: "message",
      labelMatch: "message",
      validate: (val) => (!val || val.trim().length < 5) ? "⚠️ Please enter a more detailed message (at least 5 characters)." : null
    },
    {
      step: 6,
      question: "I have gathered all your contact details! Would you like me to submit it in the background, or do you want to review the filled form on our page first?",
      type: "buttons",
      options: [
        { label: "Submit", value: "submit" },
        { label: "Review filled form on page", value: "manual" }
      ]
    }
  ]
};

export default function ChatBot() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const currentPath = router ? router.asPath : '';
  const [isOpen, setIsOpen] = useState(false);
  const [showGreetingPopup, setShowGreetingPopup] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeAnimatingId, setActiveAnimatingId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // 🤖 CO-PILOT AGENT STATES
  const [agentMode, setAgentMode] = useState(false);
  const [agentTask, setAgentTask] = useState(null); // 'product_enquiry' | 'become_partner' | 'contact'
  const [agentStep, setAgentStep] = useState(0);
  const [agentData, setAgentData] = useState({});
  const [userInput, setUserInput] = useState('');

  // 🎥 AUTOPILOT SIMULATION FEED STATES
  const [showSimulatorClip, setShowSimulatorClip] = useState(false);
  const [simulatorStep, setSimulatorStep] = useState(0); // 0: Idle, 1: Name, 2: Email, 3: Details, 4: Hover Submit, 5: Sending, 6: Success
  const [simulatorLogs, setSimulatorLogs] = useState([]);
  const [simulatedFields, setSimulatedFields] = useState({});
  const [onSimulatorCompleteAction, setOnSimulatorCompleteAction] = useState(null);

  const getSimulatorFields = () => {
    if (agentTask === 'product_enquiry') {
      return [
        { label: 'Full Name', value: agentData.name || 'Jay Mehta', key: 'name' },
        { label: 'Email Address', value: agentData.email || 'customer@example.com', key: 'email' },
        { label: 'Phone Number', value: agentData.phone || '98251 42359', key: 'phone' },
        { label: 'Quantity Needed', value: agentData.quantity || '100', key: 'quantity' }
      ];
    } else if (agentTask === 'become_partner') {
      return [
        { label: 'Full Name', value: agentData.fullName || 'Jay Mehta', key: 'fullName' },
        { label: 'Email Address', value: agentData.email || 'customer@example.com', key: 'email' },
        { label: 'Phone Number', value: agentData.phone || '98251 42359', key: 'phone' },
        { label: 'Full Address', value: agentData.address || 'Valsad, Gujarat', key: 'address' }
      ];
    } else {
      return [
        { label: 'Full Name', value: agentData.name || 'Jay Mehta', key: 'name' },
        { label: 'Email Address', value: agentData.email || 'customer@example.com', key: 'email' },
        { label: 'Phone Number', value: agentData.phone || '98251 42359', key: 'phone' },
        { label: 'Message Text', value: agentData.message || 'Hello, Jay Agritech!', key: 'message' }
      ];
    }
  };

  useEffect(() => {
    if (!showSimulatorClip) return;

    setSimulatorStep(0);
    setSimulatorLogs([`> INIT AUTOPILOT SIMULATION GATEWAY...`]);
    setSimulatedFields({});

    const fields = getSimulatorFields();

    const timeline = [
      {
        delay: 500,
        action: () => {
          setSimulatorStep(1);
          setSimulatorLogs(prev => [...prev, `> TARGET ELEMENT FOUND: input#name`]);
        }
      },
      {
        delay: 1400,
        action: () => {
          setSimulatedFields(prev => ({ ...prev, [fields[0].key]: fields[0].value }));
          setSimulatorLogs(prev => [...prev, `> INJECTED: name = "${fields[0].value}"`]);
          setSimulatorStep(2);
        }
      },
      {
        delay: 2200,
        action: () => {
          setSimulatorLogs(prev => [...prev, `> TARGET ELEMENT FOUND: input#email`]);
        }
      },
      {
        delay: 3100,
        action: () => {
          setSimulatedFields(prev => ({ ...prev, [fields[1].key]: fields[1].value }));
          setSimulatorLogs(prev => [...prev, `> INJECTED: email = "${fields[1].value}"`]);
          setSimulatorStep(3);
        }
      },
      {
        delay: 3900,
        action: () => {
          setSimulatorLogs(prev => [...prev, `> TARGET ELEMENT FOUND: input#details`]);
        }
      },
      {
        delay: 4800,
        action: () => {
          setSimulatedFields(prev => ({ 
            ...prev, 
            [fields[2].key]: fields[2].value,
            [fields[3].key]: fields[3].value
          }));
          setSimulatorLogs(prev => [...prev, `> INJECTED: details = "${fields[3].value}"`]);
          setSimulatorStep(4);
        }
      },
      {
        delay: 5600,
        action: () => {
          setSimulatorLogs(prev => [...prev, `> LOCATING SUBMIT TRIGGER...`]);
        }
      },
      {
        delay: 6400,
        action: () => {
          setSimulatorStep(5);
          setSimulatorLogs(prev => [
            ...prev, 
            `> BUBBLED CLICK TRIGGERED!`,
            `> OUTBOX ROUTE: jayjmehta251203@gmail.com`,
            `> DISPATCHING SECURE GMAIL GATEWAY...`
          ]);
        }
      },
      {
        delay: 7900,
        action: () => {
          setSimulatorStep(6);
          setSimulatorLogs(prev => [...prev, `> CONFIRMED! Delivered to jayjmehta251203@gmail.com`]);
        }
      },
      {
        delay: 9400,
        action: () => {
          setShowSimulatorClip(false);
          if (onSimulatorCompleteAction) {
            onSimulatorCompleteAction();
          }
        }
      }
    ];

    const timers = timeline.map(t => setTimeout(t.action, t.delay));
    return () => timers.forEach(clearTimeout);
  }, [showSimulatorClip, onSimulatorCompleteAction]);

  const activeLang = i18n.language?.startsWith('zh') ? 'zh' : i18n.language?.startsWith('hi') ? 'hi' : 'en';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isOpen) return;
    if (!agentMode || !agentTask) return;
    if (isTyping) return;

    const workflow = AGENT_WORKFLOWS[agentTask];
    const currentConfig = workflow?.[agentStep];
    if (!currentConfig || currentConfig.type !== 'text') return;

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [isOpen, agentMode, agentTask, agentStep, isTyping]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOpenCopilot = (event) => {
      setIsOpen(true);
      setShowGreetingPopup(false);
      if (event?.detail?.mode === 'agent') {
        startAgentMode();
      }
    };

    window.addEventListener('jay:open-copilot', handleOpenCopilot);
    return () => window.removeEventListener('jay:open-copilot', handleOpenCopilot);
  }, []);

  // Robust field filler helper for React controlled forms
  const fillFieldOnPage = (fieldName, labelText, value) => {
    if (typeof window === 'undefined') return false;

    let element = null;

    // 1. Language-independent index matching for partners modals
    const modalBody = document.querySelector('.modal-form-body');
    if (modalBody) {
      const PARTNER_FIELD_INDEX = {
        dealer: {
          fullName: 0,
          shopName: 1,
          phone: 2,
          email: 3,
          address: 4,
          state: 5,
          city: 6,
          currentProducts: 7,
          volume: 8,
          message: 9
        },
        distributor: {
          fullName: 0,
          companyName: 1,
          phone: 2,
          email: 3,
          gstNo: 4,
          turnover: 5,
          territory: 6,
          warehouse: 7,
          experience: 8,
          address: 9,
          message: 10
        },
        export: {
          fullName: 0,
          companyName: 1,
          phone: 2,
          email: 3,
          country: 4,
          targetCountries: 5,
          productsOfInterest: 6,
          volume: 7,
          regulatorySupport: 8,
          message: 9
        }
      };

      // Determine active program by checking modal text or program data
      let activeProgram = 'dealer';
      const modalHeader = document.querySelector('.modal-form-header h3');
      if (modalHeader) {
        const text = modalHeader.textContent.toLowerCase();
        if (text.includes('distributor') || text.includes('वितरक') || text.includes('分销')) {
          activeProgram = 'distributor';
        } else if (text.includes('export') || text.includes('निर्यात') || text.includes('出口')) {
          activeProgram = 'export';
        }
      }

      const indexMap = PARTNER_FIELD_INDEX[activeProgram];
      if (indexMap && indexMap[fieldName] !== undefined) {
        const fields = Array.from(modalBody.querySelectorAll('input, select, textarea'));
        const targetIndex = indexMap[fieldName];
        if (fields[targetIndex]) {
          element = fields[targetIndex];
        }
      }
    }

    // 2. Try finding by name attribute (ProductEnquiry, Contact)
    if (!element) {
      element = document.querySelector(`input[name="${fieldName}"], select[name="${fieldName}"], textarea[name="${fieldName}"]`);
    }

    // 3. Fallback: label matching
    if (!element && labelText) {
      const labels = Array.from(document.querySelectorAll('label'));
      const label = labels.find(l => l.textContent.toLowerCase().replace(/[^a-z0-9]/g, '').includes(labelText.toLowerCase().replace(/[^a-z0-9]/g, '')));
      if (label) {
        element = label.nextElementSibling;
        if (!element || !(element.tagName === 'INPUT' || element.tagName === 'SELECT' || element.tagName === 'TEXTAREA')) {
          element = label.parentElement.querySelector('input, select, textarea');
        }
      }
    }

    if (element) {
      // Set value using React-compatible native setter to bypass controlled component lock
      try {
        const valueSetter = Object.getOwnPropertyDescriptor(element.constructor.prototype, "value")?.set;
        const prototype = Object.getPrototypeOf(element);
        const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
        
        if (valueSetter && valueSetter !== prototypeValueSetter) {
          prototypeValueSetter.call(element, value);
        } else if (valueSetter) {
          valueSetter.call(element, value);
        } else {
          element.value = value;
        }
      } catch (e) {
        element.value = value;
      }

      // Dispatch bubbling input & change events
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));

      // Synchronize value tracker metadata
      const tracker = element._valueTracker;
      if (tracker) {
        tracker.setValue(value);
      }
      return true;
    }
    return false;
  };

  // Safe form submit helper
  const submitFormOnPage = (selector) => {
    if (typeof window === 'undefined') return false;

    const form = document.querySelector(selector);
    if (form) {
      if (typeof form.requestSubmit === 'function') {
        form.requestSubmit();
      } else {
        form.submit();
      }
      return true;
    }

    // Fallback: Click the submit button inside the modal/form
    const submitBtn = document.querySelector('button[type="submit"], input[type="submit"], .modal-form-body button[type="submit"]');
    if (submitBtn) {
      submitBtn.click();
      return true;
    }
    return false;
  };

  const qaData = {
    en: [
      {
        question: "What is Jay Agritech?",
        answer: "### Jay Agritech Pvt. Ltd.\nWe are a pioneering **agri-biotech company** based in Valsad, Gujarat, founded in **2025**.\n\nOur core mission is **Nurturing Growth** through:\n- **High-efficacy bio-fertilizers** to restore soil biology\n- **OMRI-certified organic manures** for carbon enrichment\n- **Eco-safe bio-insecticides** for chemical-free pest control"
      },
      {
        question: "What products do you offer?",
        answer: "### Our Product Portfolio\nWe manufacture **60+ premium agricultural solutions** across 5 categories:\n- **Bio Fertilizers:** NB, PB, KB, ZB & MycoRoot (VAM)\n- **Biostimulants:** Rhizosphere activators (Dhara Maxx, Floral)\n- **Organic Nutrients:** OMRI-certified Bhumirich & Cropcharge Manure\n- **Bio Insecticides:** Biological pest controls (Orgo Meta, Orgo Neem)\n- **Micronutrients:** Essential balanced mineral solutions (Microzest)"
      },
      {
        question: "How can I become a dealer or distributor?",
        answer: "### Join Our Partner Network\nWe are actively expanding our retail and distribution network across **all of India**!\n\n**How to apply:**\n- **Step 1:** Navigate to the **'Become a Partner'** section in our menu.\n- **Step 2:** Fill out the quick Dealer or Distributor application form.\n- **Step 3:** Our sales development team will reach out within **24 hours**!\n\nYou can also email us directly at **sales@jayagritech.com** to get started."
      },
      {
        question: "Do you offer private labeling or contract manufacturing?",
        answer: "### Custom B2B Solutions\nYes! We are a trusted partner for **Contract Manufacturing** and **OEM private labeling**.\n\n**Our B2B Capabilities:**\n- State-of-the-art microbiology & formulation **R&D lab**\n- Custom liquid, powder, and granule blending\n- Fully certified **ISO 9001:2015 & FCO** compliant processes\n- White labeling options for rapid market scale-up"
      },
      {
        question: "Where is your company located?",
        answer: "### Our Location\nOur corporate headquarters and manufacturing facilities are based in **Valsad, Gujarat, India**.\n\n- **Valsad** is a premium industrial corridor located in West India with excellent logistics connectivity.\n- You can view our **exact location and route map** on our **Contact** page."
      },
      {
        question: "What certifications do your products have?",
        answer: "### Certified Organic & Quality Tested\nOur products are manufactured under strict quality controls and hold multiple international and national certifications:\n- **OMRI Listed** for use in certified organic production.\n- **ISO 9001:2015** certified manufacturing and R&D facilities.\n- **FCO (Fertilizer Control Order)** compliant formulations.\n- **NPOP (National Programme for Organic Production)** certified manures."
      },
      {
        question: "How do bio-fertilizers improve soil biology?",
        answer: "### Soil Biology Restoration\nBio-fertilizers contain living microbial inoculants that restore soil health naturally:\n- **Nitrogen Fixation:** Captures atmospheric nitrogen and makes it plant-available.\n- **Nutrient Solubilization:** Converts insoluble phosphorus, potassium, and zinc into absorbable forms.\n- **Microbiome Enrichment:** Enhances soil carbon levels and beneficial microbial activity."
      },
      {
        question: "Can we request product samples for trials?",
        answer: "### Request Product Samples\nYes! We support field trials and commercial testing:\n- **Who can apply:** Registered dealers, commercial farmers, and institutional buyers.\n- **Trial Support:** Our agronomy team will guide you on application dosages and monitoring.\n- **How to request:** Contact your local sales manager or send a request via our **Contact Us** form."
      }
    ],
    hi: [
      {
        question: "जय एग्रीटेक क्या है?",
        answer: "### जय एग्रीटेक प्राइवेट लिमिटेड\nहम वलसाड, गुजरात में स्थित एक अग्रणी **कृषि-बायोटेक कंपनी** हैं, जिसकी स्थापना **2025** में हुई थी।\n\nहमारा मुख्य उद्देश्य **सस्टेनेबल ग्रोथ** को बढ़ावा देना है:\n- मिट्टी की उर्वरता बहाल करने के लिए **जैव-उर्वरक**\n- जैविक कार्बन बढ़ाने के लिए **प्राकृतिक खाद**\n- रासायनिक-मुक्त नियंत्रण के लिए **जैव-कीटनाशक**"
      },
      {
        question: "आप कौन से उत्पाद प्रदान करते हैं?",
        answer: "### उत्पाद सूची\nहम 5 श्रेणियों में **60+ से अधिक प्रीमियम कृषि समाधान** बनाते हैं:\n- **जैव उर्वरक:** नाइट्रोजन फिक्सिंग, फॉस्फेट और पोटाश बैक्टीरिया\n- **बायोस्टिमुलेंट्स:** मिट्टी और जड़ वर्धक (धरा मैक्स, फ्लोरल)\n- **जैविक पोषक तत्व:** एनपीओपी प्रमाणित भूमिरीच और क्रॉपचार्ज खाद\n- **जैव कीटनाशक:** जैविक कीट नियंत्रण (ऑर्गो मेटा, ऑर्गो नीम)\n- **सूक्ष्म पोषक तत्व:** संतुलित खनिज मिश्रण (माइक्रोज़ेस्ट)"
      },
      {
        question: "मैं डीलर या वितरक कैसे बन सकता हूँ?",
        answer: "### हमारे पार्टनर बनें\nहम पूरे **भारत** में अपने डीलर और वितरक नेटवर्क का विस्तार कर रहे हैं!\n\n**आवेदन कैसे करें:**\n- **चरण 1:** मुख्य मेनू में **'Become a Partner'** विकल्प पर जाएं।\n- **चरण 2:** डीलर या वितरक का त्वरित आवेदन फॉर्म भरें।\n- **चरण 3:** हमारी टीम **24 घंटे** के भीतर आपसे संपर्क करेगी!\n\nआप हमें सीधे **sales@jayagritech.com** पर भी ईमेल लिख सकते हैं।"
      },
      {
        question: "क्या आप निजी लेबलिंग या अनुबंध निर्माण की पेशकश करते हैं?",
        answer: "### B2B सेवाएं\nहाँ! हम **अनुबंध निर्माण (Contract Manufacturing)** और **निजी लेबलिंग (OEM)** के लिए एक विश्वसनीय भागीदार हैं।\n\n**हमारी क्षमताएं:**\n- अत्याधुनिक सूक्ष्मजीव विज्ञान एवं फॉर्मूलेशन **R&D लैब**\n- तरल, पाउडर और दानेदार मिश्रणों का कस्टम निर्माण\n- पूर्णतः प्रमाणित **ISO 9001:2015 और FCO** अनुपालन\n- त्वरित बाजार लॉन्च के लिए तैयार प्राइवेट लेबल विकल्प"
      },
      {
        question: "आपकी कंपनी कहाँ स्थित है?",
        answer: "### हमारा पता\nहमारा मुख्यालय और उन्नत विनिर्माण संयंत्र **वलसाड, गुजरात, भारत** में स्थित हैं।\n\n- **वलसाड** पश्चिमी भारत का एक प्रमुख औद्योगिक केंद्र है जिसमें उत्कृष्ट परिवहन कनेक्टिविटी है।\n- आप हमारे **संपर्क (Contact) पृष्ठ** पर सटीक स्थान मानचित्र देख सकते हैं।"
      },
      {
        question: "आपके उत्पादों के पास क्या प्रमाणपत्र हैं?",
        answer: "### प्रमाणित जैविक और गुणवत्ता परीक्षण\nहमारे उत्पाद सख्त गुणवत्ता नियंत्रण के तहत निर्मित होते हैं और उनके पास कई राष्ट्रीय एवं अंतर्राष्ट्रीय प्रमाणपत्र हैं:\n- प्रमाणित जैविक उत्पादन के लिए **OMRI सूचीबद्ध**।\n- **ISO 9001:2015** प्रमाणित विनिर्माण और अनुसंधान प्रयोगशाला।\n- **FCO (उर्वरक नियंत्रण आदेश)** अनुपालन फॉर्मूलेशन।\n- **NPOP (जैविक उत्पादन के लिए राष्ट्रीय कार्यक्रम)** प्रमाणित जैविक खाद।"
      },
      {
        question: "जैव-उर्वरक मिट्टी की उर्वरता को कैसे सुधारते हैं?",
        answer: "### मिट्टी के स्वास्थ्य की बहाली\nजैव-उर्वरक में जीवित सूक्ष्मजीव होते हैं जो प्राकृतिक रूप से मिट्टी की उर्वरता बढ़ाते हैं:\n- **नाइट्रोजन स्थिरीकरण:** हवा से नाइट्रोजन लेकर पौधों को उपलब्ध कराते हैं।\n- **पोषक तत्व घुलनशीलता:** अघुलनशील फास्फोरस, पोटाश और जिंक को अवशोषक रूपों में बदलते हैं।\n- **माइक्रोबायोम संवर्धन:** मिट्टी में जैविक कार्बन और लाभकारी कीट गतिविधि को बढ़ाते हैं।"
      },
      {
        question: "क्या हम परीक्षण के लिए उत्पाद के नमूने मांग सकते हैं?",
        answer: "### उत्पाद नमूना अनुरोध\nहाँ! हम फील्ड परीक्षणों और व्यावसायिक परीक्षणों का समर्थन करते हैं:\n- **कौन आवेदन कर सकता है:** पंजीकृत डीलर, बड़े किसान और संस्थान।\n- **परीक्षण सहायता:** हमारी कृषि टीम खुराक और निगरानी पर आपका मार्गदर्शन करेगी।\n- **अनुरोध कैसे करें:** स्थानीय बिक्री प्रबंधक से संपर्क करें या **Contact Us** फॉर्म के माध्यम से अनुरोध भेजें।"
      }
    ],
    zh: [
      {
        question: "什么是 Jay Agritech？",
        answer: "### 杰亚农科 (Jay Agritech Pvt. Ltd.)\n我们是一家总部位于印度古吉拉特邦瓦尔萨德的领先 **农业生物技术企业**，成立于 **2025年**。\n\n我们的核心使命是实现 **可持续农业增长**：\n- 用于重建土壤生物群落的 **高效生物肥料**\n- 用于提升土壤碳含量的 **OMRI认证有机肥**\n- 用于无化学残留病虫害防治的 **生态安全生物杀虫剂**"
      },
      {
        question: "你们提供哪些产品？",
        answer: "### 我们的产品矩阵\n我们生产 5 大类 **60余种优质农业解决方案**：\n- **生物肥料：** 固氮、解磷、解钾、解锌菌及优质菌根菌 (VAM)\n- **生物刺激素：** 根系激活与促花保果剂 (Dhara Maxx, Floral)\n- **有机营养物：** NPOP认证的 Bhumirich 和 Cropcharge 优质有机肥\n- **生物杀虫剂：** 微生物病虫害生物防治剂 (Orgo Meta, Orgo Neem)\n- **微量元素：** 必需的平衡矿物营养液 (Microzest)"
      },
      {
        question: "我该如何成为经销商或分销商？",
        answer: "### 加入我们的合作网络\n我们正在全印度积极拓展零售及分销网络！\n\n**如何申请：**\n- **步骤 1：** 导航至主菜单中的 **“成为合作伙伴” (Become a Partner)** 栏目。\n- **步骤 2：** 在线填写简要的经销商或分销商申请表。\n- **步骤 3：** 我们的销售拓展团队将在 **24小时** 内与您取得联系！\n\n您也可以直接发送邮件至 **sales@jayagritech.com** 开启合作。"
      },
      {
        question: "你们提供代工 (OEM) 或合同制造服务吗？",
        answer: "### B2B 商务解决方案\n是的！我们是 **合同定制开发与生产 (CDMO)** 以及 **OEM白标代工** 的首选合作伙伴。\n\n**我们的B2B制造实力：**\n- 配备一流分析检测设备的微生物与制剂 **研发实验室**\n- 液体、粉剂和颗粒剂的定制配方混合与灌装能力\n- 严格符合 **ISO 9001:2015 质量体系与 FCO (肥料法)** 标准\n- 极具灵活性的白标代工合作模式"
      },
      {
        question: "你们公司总部在哪里？",
        answer: "### 公司地理位置\n我们的公司总部与现代化生态工厂均位于 **印度古吉拉特邦瓦尔萨德 (Valsad, Gujarat, India)**。\n\n- **瓦尔萨德** 是西印度核心工业走廊，拥有极其便利的海陆空物流交通。\n- 您可以在我们网站的 **“联系我们” (Contact)** 页面上查阅精确的位置地图。"
      },
      {
        question: "你们的产品有哪些资质认证？",
        answer: "### 认证有机与品质检测\n我们的产品在严格的质量控制下生产，并拥有多项国际及国家级认证：\n- **OMRI 列名认证**，可用于认证的有机农业生产。\n- **ISO 9001:2015** 认证的生产与研发中心。\n- **FCO (肥料管理条例)** 合规配方。\n- 严格符合 **NPOP (国家有机生产计划)** 认证的有机肥标准。"
      },
      {
        question: "生物肥料如何改良土壤生态？",
        answer: "### 土壤生物修复\n生物肥料含有活体微生物接种剂，能够自然恢复土壤健康：\n- **固氮作用：** 捕捉大气中的氮素并将其转化为植物可吸收的形态。\n- **养分解离：** 将不溶性的磷、钾和锌转化为植物易吸收的有效养分。\n- **富集菌群：** 显著提升土壤有机碳水平，活跃土壤有益微生物群落。"
      },
      {
        question: "我们可以申请产品样品进行大田试验吗？",
        answer: "### 申请产品样品\n是的！我们大力支持农作物田间试验和商业化实测：\n- **谁能申请：** 登记的合作商、商业农场及大客户采购代表。\n- **试验支持：** 我们的农学专家团队将指导您具体的施用剂量与效果监测方法。\n- **申请途径：** 请联系您所在区域的销售负责人，或直接通过网站的 **“联系我们” (Contact Us)** 表单提交申请。"
      }
    ]
  };

  const greetings = {
    en: "Hi there! 👋 Welcome to Jay Agritech. Click any of the frequently asked questions below to learn more, or launch our **Agent Co-Pilot** to auto-fill forms on our pages!",
    hi: "नमस्ते! 👋 जय एग्रीटेक में आपका स्वागत है। हमारे बारे में जानने के लिए नीचे दिए गए प्रश्नों पर क्लिक करें, या हमारे **एजेंट को-पायलट** को चालू करें जो आपके लिए फॉर्म भर सकता है!",
    zh: "您好！👋 欢迎来到 Jay Agritech。点击下方常见问题了解更多，或者启动我们的 **智能表单助手** 来帮您自动填写页面上的表单！"
  };

  const popupTexts = {
    en: "Hi! How can I help you today? 👋",
    hi: "नमस्ते! मैं आज आपकी क्या सहायता कर सकता हूँ? 👋",
    zh: "您好！今天我能为您做些什么？ 👋"
  };

  const popupAlternatives = {
    en: [
      "Hi! How can I help you today? 👋",
      "Try our Co‑Pilot now — auto-fill forms and request quotes!"
    ],
    hi: [
      "नमस्ते! मैं आज आपकी क्या सहायता कर सकता हूँ? 👋",
      "हमारा Co‑Pilot आज ही आज़माएँ — फॉर्म स्वचालित रूप से भरें और कोटेशन माँगे!"
    ],
    zh: [
      "您好！今天我能为您做些什么？ 👋",
      "试试我们的 Co‑Pilot — 自动填写表单并请求报价！"
    ]
  };

  const [popupIdx, setPopupIdx] = useState(0);

  useEffect(() => {
    if (isOpen) return; // don't cycle when chat is open

    const alts = popupAlternatives[activeLang] || [popupTexts[activeLang]];
    let hideTimer = null;
    let showTimer = null;

    if (showGreetingPopup) {
      // currently visible: hide after a short period
      hideTimer = setTimeout(() => {
        setShowGreetingPopup(false);
      }, 2600);
    } else {
      // currently hidden: advance text, then show next prompt
      showTimer = setTimeout(() => {
        setPopupIdx(prev => (prev + 1) % alts.length);
        setShowGreetingPopup(true);
      }, 800);
    }

    return () => {
      if (hideTimer) clearTimeout(hideTimer);
      if (showTimer) clearTimeout(showTimer);
    };
  }, [showGreetingPopup, isOpen, activeLang]);

  useEffect(() => {
    if (!introFinished) return;
    if (!isOpen) {
      setPopupIdx(0);
      setShowGreetingPopup(false);
    }
  }, [currentPath, activeLang, isOpen, introFinished]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages([
        { 
          id: 1, 
          text: greetings[activeLang], 
          sender: 'bot',
          isAnimating: false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setShowGreetingPopup(true);
      setIntroFinished(true);
    }, 3800);
    return () => clearTimeout(timer);
  }, [activeLang]);

  const handleToggle = () => {
    const willOpen = !isOpen;
    setIsOpen(willOpen);
    if (willOpen) {
      // When opened via the chat toggle, always show the Assistant (not the Agent)
      setAgentMode(false);
      setAgentTask(null);
      setAgentStep(0);
      setAgentData({});
      setUserInput('');
      setShowGreetingPopup(false);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  // Standard FAQ selection
  const handleSelectQuestion = (q) => {
    if (isTyping || activeAnimatingId) return;

    const userMessage = {
      id: Date.now(),
      text: q.question,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setStartIndex(prev => prev + 3);

    setTimeout(() => {
      setIsTyping(false);
      const botMessageId = Date.now() + 1;
      const botMessage = {
        id: botMessageId,
        text: q.answer,
        sender: 'bot',
        isAnimating: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setActiveAnimatingId(botMessageId);
    }, 850);
  };

  const handleAnimationComplete = (id) => {
    setMessages(prev => 
      prev.map(msg => msg.id === id ? { ...msg, isAnimating: false } : msg)
    );
    setActiveAnimatingId(null);
  };

  // 🤖 CO-PILOT AGENT TASK SELECTION AND WORKFLOW PROGRESS LOGIC
  const startAgentMode = () => {
    setAgentMode(true);
    setAgentTask(null);
    setAgentStep(0);
    setAgentData({});

    const botMessage = {
      id: Date.now(),
      text: "### ✨ Agent Co-Pilot: Activated!\nI am your automated agent. I can guide you through our platform, redirect pages, and auto-fill forms for you in real-time.\n\nWhich task would you like me to assist you with today?",
      sender: 'bot',
      isAnimating: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    // Show a brand new clean chat box for the Agent Co-Pilot
    setMessages([botMessage]);
  };

  const exitAgentMode = () => {
    setAgentMode(false);
    setAgentTask(null);
    setAgentStep(0);
    setAgentData({});
    setUserInput('');

    // If modal is open on partners page, close it for clean UX
    const closeBtn = document.querySelector('.modal-form-header button');
    if (closeBtn) closeBtn.click();

    const initialFaqMessage = { 
      id: Date.now(), 
      text: greetings[activeLang], 
      sender: 'bot',
      isAnimating: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    // Clear Co-Pilot history and restore standard Assistant FAQ greeting
    setMessages([initialFaqMessage]);
  };

  const startAgentTask = (taskType) => {
    setAgentTask(taskType);
    setAgentStep(0);
    setAgentData({});

    const workflow = AGENT_WORKFLOWS[taskType];
    const firstStep = workflow[0];

    // Log user choice
    const userChoiceText = taskType === 'product_enquiry' 
      ? "Auto-Fill Product Inquiry Form" 
      : taskType === 'become_partner' 
        ? "Auto-Fill Partner Application" 
        : "Auto-Fill General Contact Form";

    const userMsg = {
      id: Date.now(),
      text: userChoiceText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMsg = {
        id: Date.now() + 1,
        text: firstStep.question,
        sender: 'bot',
        isAnimating: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 700);
  };

  const triggerReviewAction = (data) => {
    if (typeof window === 'undefined') return;

    // 1. Determine target redirect URL
    let targetUrl = '';
    let openModalAction = null;

    if (agentTask === 'product_enquiry') {
      targetUrl = `/products/${data.category}/${data.productSlug}/enquiry`;
    } else if (agentTask === 'become_partner') {
      targetUrl = '/partners';
      openModalAction = () => {
        setTimeout(() => {
          const cards = document.querySelectorAll('.card');
          if (data.program === 'dealer' && cards[0]) cards[0].click();
          else if (data.program === 'distributor' && cards[1]) cards[1].click();
          else if (data.program === 'export' && cards[2]) cards[2].click();
        }, 600);
      };
    } else if (agentTask === 'contact') {
      targetUrl = '/contact';
    }

    // 2. Perform bulk auto-fill, glowing highlights, and scrolling once page renders
    const performAutoFillAndHighlight = () => {
      setTimeout(() => {
        // Run open modal if applicable
        if (openModalAction) openModalAction();

        // Polling auto-filler: Run 4 times over 2 seconds to capture elements once React mounts
        let attempts = 0;
        const intervalId = setInterval(() => {
          attempts++;
          let allFilled = true;
          Object.keys(data).forEach(key => {
            if (['category', 'productSlug', 'productName', 'program', 'redirect', 'action'].includes(key)) return;
            
            let labelMatch = key;
            if (key === 'fullName') labelMatch = 'full name';
            if (key === 'shopName') labelMatch = 'shop';
            if (key === 'companyName') labelMatch = 'company';
            if (key === 'currentProducts') labelMatch = 'products sold';
            
            const filled = fillFieldOnPage(key, labelMatch, data[key]);
            if (!filled) allFilled = false;
          });

          // Once all found or after 4 attempts, clean up and run highlighting
          if (allFilled || attempts >= 4) {
            clearInterval(intervalId);
            
            setTimeout(() => {
              // Highlight the filled fields in gold neon glow to visually wow the user
              const inputs = document.querySelectorAll('.form-input, .form-field-input, .form-field-select, .form-field-textarea, .form-select, .form-textarea');
              inputs.forEach(el => {
                if (el.value) {
                  el.style.borderColor = '#D4AF37';
                  el.style.boxShadow = '0 0 14px rgba(212, 175, 55, 0.7)';
                  el.style.transition = 'all 0.3s ease';
                  setTimeout(() => {
                    el.style.borderColor = '';
                    el.style.boxShadow = '';
                  }, 3500);
                }
              });

              // Smooth scroll the form container into view
              const formEl = document.querySelector('.modal-form-body, .enquiry-form-card, form');
              if (formEl) {
                formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }, 200);
          }
        }, 500); // Poll every 500ms
      }, 500); // Wait for page component to mount
    };

    // 3. Conditional Page Routing Check
    if (targetUrl && router.pathname !== targetUrl.split('?')[0]) {
      router.push(targetUrl);
      const handleRouteChange = () => {
        performAutoFillAndHighlight();
        router.events.off('routeChangeComplete', handleRouteChange);
      };
      router.events.on('routeChangeComplete', handleRouteChange);
    } else {
      performAutoFillAndHighlight();
    }
  };

  const handleAgentStep = (value, label = '') => {
    const workflow = AGENT_WORKFLOWS[agentTask];
    const currentStepConfig = workflow[agentStep];

    // Perform Q&A Validation directly inside the chat interview
    if (currentStepConfig.validate) {
      const errorMsgText = currentStepConfig.validate(value, agentData);
      if (errorMsgText) {
        // Print user's typed value in user message bubble
        const userMsg = {
          id: Date.now(),
          text: label || value,
          sender: 'user',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMsg]);
        setUserInput('');
        setIsTyping(true);

        setTimeout(() => {
          setIsTyping(false);
          const errorMsg = {
            id: Date.now() + 1,
            text: errorMsgText,
            sender: 'bot',
            isAnimating: true,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, errorMsg]);
        }, 600);
        return; // Halt transition to next step
      }
    }

    // Log the user's choice in chat bubbles
    const userMsg = {
      id: Date.now(),
      text: label || value,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setUserInput('');
    setIsTyping(true);

    // Save field state & apply DOM auto-fill if config has it
    const updatedData = { ...agentData };
    
    if (currentStepConfig.field) {
      const fieldName = typeof currentStepConfig.field === 'function' ? currentStepConfig.field(updatedData) : currentStepConfig.field;
      const labelMatch = typeof currentStepConfig.labelMatch === 'function' ? currentStepConfig.labelMatch(updatedData) : currentStepConfig.labelMatch;
      
      updatedData[fieldName] = value;
      setAgentData(updatedData);

      // Perform DOM Form Injection
      setTimeout(() => {
        fillFieldOnPage(fieldName, labelMatch, value);
      }, 100);
    }

    // Handle next step transitions & routing actions
    let nextStepIndex = agentStep + 1;
    let redirectUrl = null;
    let customAction = null;

    if (currentStepConfig.next) {
      const transition = currentStepConfig.next(value, updatedData);
      if (transition.redirect) redirectUrl = transition.redirect;
      if (transition.action) customAction = transition.action;
      
      // Save any transition properties
      Object.assign(updatedData, transition);
      setAgentData(updatedData);
    }

    setTimeout(() => {
      setIsTyping(false);

      if (redirectUrl) {
        router.push(redirectUrl);
      }
      if (customAction) {
        customAction();
      }

      // Check if task is finished
      if (nextStepIndex >= workflow.length) {
        const triggerFinalAction = () => {
          if (value === 'submit') {
            triggerReviewAction(updatedData);

            // POST to /api/send-email for autopilot background submission
            fetch('/api/send-email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                type: agentTask,
                data: {
                  ...updatedData,
                  recipient: 'jayjmehta251203@gmail.com'
                }
              })
            }).catch(err => console.error('Error sending autopilot email:', err));

            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
              
              let submitSuccess = false;
              if (agentTask === 'product_enquiry') {
                submitSuccess = submitFormOnPage('.enquiry-actual-form');
              } else if (agentTask === 'become_partner') {
                submitSuccess = submitFormOnPage('.modal-form-body');
              } else if (agentTask === 'contact') {
                submitSuccess = submitFormOnPage('form');
              }

              const successMsg = {
                id: Date.now() + 2,
                text: "🎉 **Autopilot Form Submission Successful!**\n\nI have successfully submitted the form on your behalf. All submission data has been dispatched and delivered via Gmail to **jayjmehta251203@gmail.com**.\n\nExiting Co-Pilot mode now! Feel free to ask more questions.",
                sender: 'bot',
                isAnimating: true,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              };
              
              // Clean up state
              setAgentMode(false);
              setAgentTask(null);
              setAgentStep(0);
              setAgentData({});
              setMessages([successMsg]);
            }, 1500);
          } else {
            // Manual review chosen
            triggerReviewAction(updatedData);

            const finishMsg = {
              id: Date.now() + 2,
              text: "✏️ **Form Auto-Fill Completed & Ready for Review!**\n\nI have automatically opened the form, filled out all the fields with your answers, and highlighted them in glowing gold on the page so you can review them.\n\nPlease double check the fields, and once you are satisfied, click the **Submit** button on the screen to finalize your application!\n\nExiting Co-Pilot mode now. Let me know if you need another task!",
              sender: 'bot',
              isAnimating: true,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            
            setAgentMode(false);
            setAgentTask(null);
            setAgentStep(0);
            setAgentData({});
            setMessages([finishMsg]);
          }
        };

        // Open beautiful visual autopilot simulation clip overlay first!
        setOnSimulatorCompleteAction(() => triggerFinalAction);
        setShowSimulatorClip(true);
      } else {
        // Trigger next question
        setAgentStep(nextStepIndex);
        const nextStepConfig = workflow[nextStepIndex];
        
        let questionText = typeof nextStepConfig.question === 'function' 
          ? nextStepConfig.question(updatedData) 
          : nextStepConfig.question;

        // Custom visuals for co-pilot redirects
        let actionBadge = null;
        if (redirectUrl) {
          questionText += `\n\n*(Co-Pilot Action: Redirected to ${redirectUrl})*`;
        }

        const nextMsg = {
          id: Date.now() + 2,
          text: questionText,
          sender: 'bot',
          isAnimating: true,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, nextMsg]);
      }
    }, 900);
  };

  const handleSendText = (e) => {
    e.preventDefault();
    if (!userInput.trim() || isTyping) return;
    
    // Pass user typed text to the active agent step
    handleAgentStep(userInput.trim());
  };

  const getActiveQuestions = () => {
    const questions = qaData[activeLang] || qaData.en;
    const total = questions.length;
    const items = [];
    for (let i = 0; i < Math.min(3, total); i++) {
      items.push(questions[(startIndex + i) % total]);
    }
    return items;
  };

  // Helper for dynamic input placeholders
  const getInputPlaceholder = () => {
    if (!agentTask) return "Type a message...";
    const workflow = AGENT_WORKFLOWS[agentTask];
    const currentConfig = workflow[agentStep];
    if (currentConfig && currentConfig.type === 'text') {
      const field = typeof currentConfig.field === 'function' ? currentConfig.field(agentData) : currentConfig.field;
      return `Enter your ${field}...`;
    }
    return "Click a button option above...";
  };

  return (
    <div className={`chatbot-wrapper ${agentMode ? 'agent-active' : ''}`}>
      {/* Greeting Popup */}
      {!isOpen && (
        <div
          className={`chatbot-greeting-popup ${showGreetingPopup ? 'visible' : 'hidden'}`}
          onClick={handleToggle}
        >
          <div className="chatbot-greeting-close" onClick={(e) => { e.stopPropagation(); setShowGreetingPopup(false); }}><X size={14} /></div>
          <p>{(popupAlternatives[activeLang] || [popupTexts[activeLang]])[popupIdx]}</p>
        </div>
      )}

      {/* Floating Toggle Button */}
      <div className={`chatbot-toggle-wrap ${isOpen ? 'active' : ''} ${agentMode ? 'agent-active' : ''}`}>
        <button 
          className={`chatbot-toggle ${isOpen ? 'active' : ''}`}
          onClick={handleToggle}
          aria-label="Toggle Chatbot"
        >
          {isOpen ? <X size={32} /> : <img src={logoImg} alt="Chat" className="chatbot-toggle-img" />}
          {!isOpen && <span className="chatbot-notification">1</span>}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className={`chatbot-window ${agentMode ? 'agent-active' : ''}`}>
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className={`chatbot-avatar ${agentMode ? 'agent-active' : ''}`}>
                <img src={logoImg} alt="Jay Assistant" className="chatbot-avatar-img" />
              </div>
              <div>
                <h4>
                  {agentMode && <Sparkles size={14} style={{ color: 'var(--clr-accent-gold, #D4AF37)' }} />}
                  {agentMode ? "Jay Co-Pilot Agent" : "Jay Assistant"}
                </h4>
                <span className="chatbot-status">
                  {agentMode ? "Autopilot Active" : t('chatbot.online')}
                </span>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}><X size={18} /></button>
          </div>

          {/* Agent Banner Status Indicator */}
          {agentMode && (
            <div className="chatbot-agent-banner animate-scale-up">
              <div className="chatbot-agent-banner-status">
                <span className="chatbot-agent-banner-dot"></span>
                <span>
                  {agentTask 
                    ? `Task: ${agentTask.replace('_', ' ')} (Step ${agentStep + 1})` 
                    : "Co-Pilot Task Selection"}
                </span>
              </div>
              <button className="chatbot-agent-exit-btn" onClick={exitAgentMode}>
                Exit Co-Pilot
              </button>
            </div>
          )}

          {/* Autopilot Simulator Clip Overlay */}
          {showSimulatorClip && (
            <div className="copilot-sim-overlay">
              <div className="sim-header-feed">
                <div className="sim-feed-status">
                  <span className="sim-feed-dot"></span>
                  <span>LIVE AUTOPILOT ACTION FEED</span>
                </div>
                <span>co-pilot://feed/auto-submit</span>
              </div>
              
              <div className="sim-browser-viewport">
                {/* Simulated Cursor */}
                <div 
                  className="sim-virtual-cursor" 
                  style={{
                    top: simulatorStep <= 1 ? '50px' : 
                         simulatorStep === 2 ? '100px' : 
                         simulatorStep === 3 ? '150px' : 
                         simulatorStep === 4 ? '200px' : '230px',
                    left: simulatorStep <= 3 ? '120px' : '150px'
                  }}
                >
                  <Send size={18} style={{ transform: 'rotate(-45deg)' }} />
                </div>

                <div className="sim-form-container">
                  <span style={{ fontSize: '11px', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '4px', marginBottom: '6px', color: '#D4AF37' }}>
                    {agentTask === 'product_enquiry' ? 'Product Enquiry Form' :
                     agentTask === 'become_partner' ? 'Partnership Application' : 'General Contact Form'}
                  </span>
                  
                  {getSimulatorFields().map((f, i) => (
                    <div key={f.key} className="sim-field-row">
                      <span className="sim-field-label">{f.label}</span>
                      <div className={`sim-field-input ${simulatorStep === (i + 1) ? 'active' : ''}`}>
                        {simulatedFields[f.key] || ''}
                      </div>
                    </div>
                  ))}

                  <div className={`sim-submit-btn ${simulatorStep === 4 ? 'active' : ''} ${simulatorStep === 5 ? 'sending' : ''}`}>
                    {simulatorStep < 5 ? 'Submit Application' : 'Sending securely...'}
                  </div>
                </div>

                {/* Envelope Floating success seal */}
                {simulatorStep === 6 && (
                  <div className="sim-envelope-animation">
                    <div className="sim-success-seal">
                      <div className="sim-success-checkmark">
                        <Send size={24} style={{ color: 'white' }} />
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#64dd17' }}>DISPATCH SUCCESS</span>
                      <p style={{ fontSize: '11px', margin: 0, opacity: 0.8, color: 'white' }}>
                        Routed and delivered to:<br />
                        <strong style={{ color: '#D4AF37', wordBreak: 'break-all' }}>jayjmehta251203@gmail.com</strong>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Console logs */}
              <div className="sim-terminal-log">
                {simulatorLogs.map((log, idx) => (
                  <div key={idx}>{log}</div>
                ))}
              </div>
            </div>
          )}

          {/* Messages Logs Area */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chatbot-message ${msg.sender}`}>
                <div className="chatbot-message-avatar">
                  {msg.sender === 'bot' ? (
                    <img src={logoImg} alt="Bot" className="chatbot-avatar-img" />
                  ) : (
                    <div className="chatbot-avatar-user-fallback" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', background: 'var(--clr-primary-surface)', color: 'var(--clr-primary)', fontSize: '10px', fontWeight: 'bold' }}>U</div>
                  )}
                </div>
                <div className="chatbot-message-bubble">
                  {msg.isAnimating ? (
                    <TypewriterText 
                      text={msg.text} 
                      onComplete={() => handleAnimationComplete(msg.id)} 
                    />
                  ) : (
                    formatText(msg.text)
                  )}
                  
                  {/* Visual card badge for co-pilot actions */}
                  {agentMode && msg.sender === 'bot' && msg.text.includes('Redirected') && (
                    <div className="copilot-action-card">
                      <Sparkles size={12} />
                      <span>Co-Pilot executed browser redirection.</span>
                    </div>
                  )}

                  <span className="chatbot-message-time">{msg.time}</span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="chatbot-message bot">
                <div className="chatbot-message-avatar">
                  <img src={logoImg} alt="Bot" className="chatbot-avatar-img" />
                </div>
                <div className="chatbot-message-bubble typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input & Suggested Quick Choices Stage */}
          <div className="chatbot-input" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 'var(--sp-2)' }}>
            
            {/* 1. AGENT CHAT QUESTIONS SELECTION FLOW */}
            {agentMode && !agentTask && (
              <div className="chatbot-quick-questions">
                <span className="cqq-title">✨ Select a Co-Pilot Autopilot Task:</span>
                <div className="cqq-list">
                  <div className="cqq-item">
                    <button className="cqq-btn" onClick={() => startAgentTask('product_enquiry')}>
                      <Sparkles size={14} style={{ marginRight: '6px', color: '#D4AF37' }} />
                      📝 Auto-Fill Product Inquiry Form
                    </button>
                  </div>
                  <div className="cqq-item">
                    <button className="cqq-btn" onClick={() => startAgentTask('become_partner')}>
                      <Sparkles size={14} style={{ marginRight: '6px', color: '#D4AF37' }} />
                      🤝 Auto-Fill Partner Application
                    </button>
                  </div>
                  <div className="cqq-item">
                    <button className="cqq-btn" onClick={() => startAgentTask('contact')}>
                      <Sparkles size={14} style={{ marginRight: '6px', color: '#D4AF37' }} />
                      📞 Auto-Fill General Contact Form
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2. ACTIVE TASK STEP OPTIONS (BUTTON CHOICES) */}
            {agentMode && agentTask && AGENT_WORKFLOWS[agentTask][agentStep].type === 'buttons' && (
              <div className="chatbot-quick-questions">
                <span className="cqq-title">💡 Choose an Option:</span>
                <div className="cqq-list">
                  {(typeof AGENT_WORKFLOWS[agentTask][agentStep].options === 'function'
                    ? AGENT_WORKFLOWS[agentTask][agentStep].options(agentData)
                    : AGENT_WORKFLOWS[agentTask][agentStep].options
                  ).map((opt, idx) => (
                    <div key={idx} className="cqq-item">
                      <button 
                        className="cqq-btn" 
                        onClick={() => handleAgentStep(opt.value, opt.label)}
                        disabled={isTyping}
                      >
                        {opt.label}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. STANDARD NORMAL FAQ MODE QUESTIONS */}
            {!agentMode && (
              <div className="chatbot-quick-questions">
                {/* Autopilot Co-Pilot Entrance Trigger */}
                <div className="cqq-item" style={{ marginBottom: '8px' }}>
                  <button 
                    className="cqq-btn" 
                    onClick={startAgentMode}
                    style={{
                      background: 'linear-gradient(135deg, #113416 0%, #1c4d23 100%)',
                      color: '#D4AF37',
                      borderColor: '#D4AF37',
                      fontWeight: 'bold',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    Launch Agent Co-Pilot
                  </button>
                </div>

                <span className="cqq-title">
                  {activeLang === 'zh' ? '💡 推荐问题：' : activeLang === 'hi' ? '💡 सुझाये गए प्रश्न:' : '💡 Suggested Questions:'}
                </span>
                <div className="cqq-list">
                  {getActiveQuestions().map((q, idx) => (
                    <div key={idx} className="cqq-item">
                      <button 
                        onClick={() => handleSelectQuestion(q)} 
                        className="cqq-btn"
                        disabled={isTyping || activeAnimatingId !== null}
                        style={{
                          opacity: (isTyping || activeAnimatingId !== null) ? 0.6 : 1,
                          cursor: (isTyping || activeAnimatingId !== null) ? 'not-allowed' : 'pointer'
                        }}
                      >
                        {q.question}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 4. ACTIVE TASK INTERVIEW FREE-FORM TEXT TYPING BAR */}
          {agentMode && agentTask && AGENT_WORKFLOWS[agentTask][agentStep].type === 'text' && (
            <form onSubmit={handleSendText} className="chatbot-input-form animate-slide-up">
              <div className="chatbot-input-wrapper">
                <input
                  type="text"
                  ref={inputRef}
                  className="chatbot-input-text"
                  placeholder={getInputPlaceholder()}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  disabled={isTyping}
                />
              </div>
              <button 
                type="submit" 
                className="chatbot-send-btn" 
                disabled={!userInput.trim() || isTyping}
                title="Send answer"
              >
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
