import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { X, User, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { assetSrc } from '../../utils/assetSrc';
import logoImgAsset from '../../assets/new_title.png';

const logoImg = assetSrc(logoImgAsset);

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
    }, 12); // Slightly faster 12ms character speed for dynamic rendering
    
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

  const activeLang = i18n.language?.startsWith('zh') ? 'zh' : i18n.language?.startsWith('hi') ? 'hi' : 'en';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Synchronize greeting popup visibility with chat window state after intro is finished
  useEffect(() => {
    if (!introFinished) return;
    if (!isOpen) {
      setShowGreetingPopup(true);
    } else {
      setShowGreetingPopup(false);
    }
  }, [isOpen, introFinished]);

  // Re-trigger/update greeting popup when navigating to a new page
  useEffect(() => {
    if (!introFinished) return;
    if (!isOpen) {
      setShowGreetingPopup(true);
    }
  }, [currentPath, isOpen, introFinished]);

  // Formatted FAQ Q&A Database (8 high-relevance biological and partnership questions)
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
    en: "Hi there! 👋 Welcome to Jay Agritech. Click any of the frequently asked questions below to learn more about us and our biological solutions!",
    hi: "नमस्ते! 👋 जय एग्रीटेक में आपका स्वागत है। हमारे और हमारे जैविक समाधानों के बारे में अधिक जानने के लिए नीचे दिए गए अक्सर पूछे जाने वाले प्रश्नों पर क्लिक करें!",
    zh: "您好！👋 欢迎来到 Jay Agritech。点击下方常见问题，了解更多关于我们及生物解决方案的信息！"
  };

  const popupTexts = {
    en: "Hi! How can I help you today? 👋",
    hi: "नमस्ते! मैं आज आपकी क्या सहायता कर सकता हूँ? 👋",
    zh: "您好！今天我能为您做些什么？ 👋"
  };

  // Initial greeting setup (delayed to align with floating button spring entrance pop animation)
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
    setIsOpen(!isOpen);
  };

  // Prevent background page from scrolling when chatbot is open
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

  const getActiveQuestions = () => {
    const questions = qaData[activeLang] || qaData.en;
    const total = questions.length;
    const items = [];
    for (let i = 0; i < Math.min(3, total); i++) {
      items.push(questions[(startIndex + i) % total]);
    }
    return items;
  };

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

    // Rotate to the next set of questions
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

  return (
    <div className="chatbot-wrapper">
      {/* Greeting Popup */}
      {!isOpen && showGreetingPopup && (
        <div className="chatbot-greeting-popup" onClick={handleToggle}>
          <div className="chatbot-greeting-close" onClick={(e) => { e.stopPropagation(); setShowGreetingPopup(false); }}><X size={14} /></div>
          <p>{popupTexts[activeLang]}</p>
        </div>
      )}

      {/* Floating Button with Wrap for Bobbing Animation */}
      <div className={`chatbot-toggle-wrap ${isOpen ? 'active' : ''}`}>
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
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <img src={logoImg} alt="Jay Assistant" className="chatbot-avatar-img" />
              </div>
              <div>
                <h4>Jay Assistant</h4>
                <span className="chatbot-status">{t('chatbot.online')}</span>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}><X size={18} /></button>
          </div>

          {/* Messages */}
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

          {/* suggested Questions Container */}
          <div className="chatbot-input" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 'var(--sp-2)' }}>
            <div className="chatbot-quick-questions">
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
                      <HelpCircle size={14} style={{ marginRight: '6px', flexShrink: 0 }} />
                      {q.question}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
