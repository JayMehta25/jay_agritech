import React, { useEffect } from 'react';
import { useParams, Link } from '../../components/RouterBridge';
import { Leaf, Sprout, Shield, TrendingUp, ArrowRight, ArrowLeft, AlertTriangle, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import GenericPage from '../../components/ui/GenericPage';
import { products } from '../../data/siteData';

function AnimatedSection({ children, className = '', id = '' }) {
  const [ref, isVisible] = useScrollAnimation();
  return <div ref={ref} id={id} className={`anim-hidden ${isVisible ? 'anim-visible' : ''} ${className}`}>{children}</div>;
}

const solSoilImg = '/soil health.jpg';
const solNutrientImg = '/nutrientMgm.jpg';
const solPestImg = '/pnd.jpg';
const solGrowthImg = '/growth.jpg';

const solutionCategoryMapping = {
  'soil-health': ['bio-fertilizers', 'organic-nutrients'],
  'nutrient-mgmt': ['bio-fertilizers', 'micronutrients'],
  'pest-disease': ['bio-insecticides', 'bio-pesticides'],
  'growth': ['biostimulants']
};

const slugToKeyMap = {
  'soil-health': 'soil_health',
  'nutrient-mgmt': 'nutrient_management',
  'pest-disease': 'pest_disease',
  'growth': 'growth_enhancement'
};

const localizedDetails = {
  en: {
    backBtn: "Back to Solutions Overview",
    shelfTitle: "🌱 Recommended Bio-Solutions for {title}",
    soil_health: {
      problemTitle: "The Challenge: Soil Degradation & Loss of Biology",
      problemDesc: "Modern farming heavily relies on intensive chemical fertilizers, which depletes organic carbon, destroys native soil microbiology, causes soil compaction, and leads to pH imbalances. Depleted soils lose their water retention capacity and structural integrity, resulting in a continuous drop in crop response to inputs.",
      problemPoints: ["Loss of natural soil organic carbon (SOC)", "Soil compaction and restricted root aeration", "Microbial imbalance and high pathogen vulnerability"],
      solutionTitle: "The Biological Solution: Restoring Soil Vitality",
      solutionDesc: "Our advanced bio-organic inputs enrich the soil with high-potency Nitrogen Fixing, Phosphate Solubilizing, and Potash Mobilizing bacteria combined with organic matter. This rebuilds the soil's natural carbon levels, enhances water retention, aerates the root zone, and establishes a robust microbial shield.",
      solutionPoints: ["Rejuvenates native soil microbial populations", "Improves organic carbon levels and soil structure", "Balances pH naturally and unlocks locked nutrients"]
    },
    nutrient_management: {
      problemTitle: "The Challenge: Nutrient Imbalances & Mineral Locking",
      problemDesc: "Crops require a balanced diet of both macro-nutrients (N, P, K) and micro-nutrients (Zinc, Iron, Manganese, Boron) to thrive. Standard chemical inputs often deliver highly concentrated, single-source nutrients that get locked in the soil and remain unavailable to plants. This results in visual deficiencies, stunted growth, and poor crop yields.",
      problemPoints: ["Locked and unavailable phosphorus & potash in soil", "Multi-micronutrient deficiencies (Zinc, Iron, Boron)", "Stunted plant growth and low fertilizer efficiency"],
      solutionTitle: "The Biological Solution: Bio-Available Balanced Nutrition",
      solutionDesc: "We provide biological chelates, multi-microbial consortia, and organic nutrient delivery systems. These inputs naturally solubilize and mobilize fixed minerals in the soil, ensuring a balanced, steady, and high-bioavailability flow of nutrients directly to the root system.",
      solutionPoints: ["Fixes atmospheric nitrogen and solubilizes soil phosphorus", "Delivers balanced chelated micronutrients for rapid absorption", "Boosts fertilizer efficiency and supports uniform plant growth"]
    },
    pest_disease: {
      problemTitle: "The Challenge: Escalating Pest Pressures & Residue Toxicity",
      problemDesc: "Pest pressures and fungal pathogens cause severe losses to crop yield and quality. Chemical pesticides create pest resistance, leave toxic chemical residues on produce, harm beneficial insects, and degrade environmental safety.",
      problemPoints: ["Pest resistance and chemical control failures", "Toxic residues on harvested produce", "Soil and water contamination harming beneficial biology"],
      solutionTitle: "The Biological Solution: Natural Eco-Friendly Crop Protection",
      solutionDesc: "Our eco-friendly biological pest management uses premium entomopathogenic soil fungi (Metarhizium anisopliae, Trichoderma viride, Paecilomyces lilacinus) and botanical extracts like high-potency Azadirachtin. This establishes a natural bio-defense system that targets specific pests while leaving zero toxic chemical residues on your crops.",
      solutionPoints: ["Broad-spectrum biological control of insects & fungal pathogens", "Zero harmful residues, ensuring 100% crop and environmental safety", "IPM compatible, preserving beneficial predatory insects"]
    },
    growth_enhancement: {
      problemTitle: "The Challenge: Environmental Stress & Unfulfilled Yield Potential",
      problemDesc: "Even with adequate nutrition, environmental stresses (drought, temperature fluctuations, salinity) and physiological blockages can cause severe flower drop, poor fruit setting, small fruit size, and lack of uniformity, preventing crops from achieving their full genetic yield potential.",
      problemPoints: ["Severe flower and fruit drop due to environmental stress", "Poor fruit size, weight, shine, and low sweetness profile", "Inability to achieve genetic crop potential"],
      solutionTitle: "The Biological Solution: Metabolic Induction & Yield Maximization",
      solutionDesc: "Our premium range of biostimulants, amino acid formulations, and plant growth regulators (derived from organic sources, soy, and premium seaweed extracts) naturally stimulates plant metabolism, enhances root-zone activation, improves flowering retention, and boosts fruit size, weight, shine, and sweetness.",
      solutionPoints: ["Reduces flower/fruit drop and boosts fruit size & weight", "Enhances resistance to abiotic stress (drought, temperature)", "Stimulates overall plant metabolism for maximum genetic yield"]
    }
  },
  zh: {
    backBtn: "返回作物解决方案概览",
    shelfTitle: "🌱 针对 {title} 推荐的生物解决方案",
    soil_health: {
      problemTitle: "面临的挑战：土壤退化与生物活性丧失",
      problemDesc: "现代农业严重依赖高强度的化学肥料，这耗尽了土壤中的有机碳，破坏了原生土壤微生物群落，导致土壤板结和酸碱失衡。退化的土壤失去了蓄水保肥能力和结构完整性，导致作物对肥料投入的反应持续下降。",
      problemPoints: ["土壤天然有机碳 (SOC) 流失", "土壤板结和根系通气受限", "微生物失衡，病原菌易感性高"],
      solutionTitle: "生物解决方案：重塑土壤健康活力",
      solutionDesc: "我们先进的生物有机投入品将高活性的固氮菌、解磷菌和解钾菌与有机质相结合，为土壤提供养分。这重建了土壤的天然碳水平，增强了蓄水能力，改善了根区通气性，并建立了强大的微生物屏障。",
      solutionPoints: ["恢复原生土壤微生物种群活力", "提高有机碳水平，改善土壤团粒结构", "自然平衡 pH 值，活化土壤被锁定的养分"]
    },
    nutrient_management: {
      problemTitle: "面临的挑战：营养不均衡与矿物质锁定",
      problemDesc: "作物的茁壮成长需要均衡的常量元素（氮、磷、钾）和微量元素（锌、铁、锰、硼）。标准的化学投入品通常提供高度浓缩 of single-source nutrients that get locked in the soil and remain unavailable to plants. This results in visual deficiencies, stunted growth, and poor crop yields.", // wait, let's keep it translated perfectly
      problemDesc: "作物的茁壮成长需要均衡的常量元素（氮、磷、钾）和微量元素（锌、铁、锰、硼）。标准的化学投入品通常提供高度浓缩的单源养分，这些养分极易被土壤固定，无法被植物吸收，导致作物出现营养缺乏症、生长迟缓和产量低下。",
      problemPoints: ["土壤中被固定和无法吸收的磷与钾", "多种微量元素缺乏（锌、铁、硼）", "植株生长矮小，肥料利用率极低"],
      solutionTitle: "生物解决方案：高利用率的均衡营养方案",
      solutionDesc: "我们提供生物螯合物、多微生物复合肥以及有机营养输送系统。这些投入品能自然溶解和活化土壤中固定的矿物质，确保为根系提供持续、均衡且高生物利用度的养分流。",
      solutionPoints: ["固定空气中的氮并溶解土壤中固定的磷", "提供高吸收率的螯合态微量元素", "大幅度提高肥料利用率，促进植株均匀生长"]
    },
    pest_disease: {
      problemTitle: "面临的挑战：病虫害抗性增加与残留毒性",
      problemDesc: "病虫害和真菌性病害会导致作物的产量和品质遭受严重损失。化学农药易使害虫产生抗药性，导致农产品上残留有毒化学物质，杀伤益虫，并严重破坏环境安全。",
      problemPoints: ["害虫抗药性增强，化学防治失效", "收获的农产品中含有有毒化学残留", "土壤和水源污染，危害有益生物群落"],
      solutionTitle: "生物解决方案：天然环保的绿色作物保护",
      solutionDesc: "我们的生态友好型病虫害生物防治采用优质的昆虫病原真菌（绿僵菌、木霉菌、淡紫拟青霉）和高活性苦参碱/印楝素等植物提取物。这建立了一个天然的生物防御系统，能特异性针对靶标害虫，在作物上实现零有害残留。",
      solutionPoints: ["广谱生物防治昆虫和真菌病害", "零有害化学残留，确保作物与生态环境 100% 安全", "兼容综合虫害管理 (IPM)，保护捕食性天敌益虫"]
    },
    growth_enhancement: {
      problemTitle: "面临的挑战：环境胁迫与产量潜力未释放",
      problemDesc: "即使提供了充足的营养，环境逆境（干旱、温度波动、盐碱度）和作物的生理障碍仍会导致严重的落花落果、坐果率低、果实偏小以及缺乏均匀度，从而阻碍作物发挥其最大遗传产量潜力。",
      problemPoints: ["环境胁迫导致严重的落花落果", "果实大小、单果重、光泽度和糖度表现欠佳", "无法完全释放作物的遗传高产潜力"],
      solutionTitle: "生物解决方案：代谢诱导与产量最大化",
      solutionDesc: "我们高端的生物刺激素、氨基酸配方和植物生长调节剂（源自有机原料、大豆和优质海藻提取物）可自然激活植物代谢，增强根区活性，减少落花，并显著提升果实的大小、单果重、色泽和甜度。",
      solutionPoints: ["显著减少落花落果，增加果实规格与重量", "增强作物对非生物胁迫（干旱、极端温度）的抗性", "激活作物的整体生理代谢，释放最大产量潜力"]
    }
  },
  hi: {
    backBtn: "समाधान अवलोकन पर वापस जाएं",
    shelfTitle: "🌱 {title} के लिए अनुशंसित जैव-समाधान",
    soil_health: {
      problemTitle: "चुनौती: मिट्टी का क्षरण और जैविक सक्रियता का नुकसान",
      problemDesc: "आधुनिक खेती रासायनिक उर्वरकों के भारी उपयोग पर निर्भर करती है, जो जैविक कार्बन को समाप्त करती है, मिट्टी के सूक्ष्मजीवों को नष्ट करती है और मिट्टी को कठोर बनाती है। बंजर मिट्टी पानी रोकने की क्षमता खो देती है, जिससे फसलों की उपज लगातार गिरती है।",
      problemPoints: ["प्राकृतिक मिट्टी जैविक कार्बन (SOC) का नुकसान", "मिट्टी का सख्त होना और जड़ों में हवा की कमी", "हानिकारक जीवाणुओं के प्रति संवेदनशीलता में वृद्धि"],
      solutionTitle: "जैविक समाधान: मिट्टी की जीवन शक्ति को पुनर्स्थापित करना",
      solutionDesc: "हमारे उन्नत जैव-जैविक उत्पाद मिट्टी को उच्च क्षमता वाले नाइट्रोजन फिक्सिंग, फॉस्फेट सॉल्युबिलाइजिंग और पोटाश मोबिलाइजिंग बैक्टीरिया के साथ समृद्ध करते हैं। यह मिट्टी के प्राकृतिक कार्बन स्तर को पुनर्निर्माण करता है और जल प्रतिधारण क्षमता बढ़ाता है।",
      solutionPoints: ["मिट्टी के प्राकृतिक सूक्ष्मजीवों को सक्रिय करता है", "जैविक कार्बन स्तर और मिट्टी की संरचना में सुधार", "मिट्टी के पीएच को संतुलित करता है और बंद पोषक तत्वों को मुक्त करता है"]
    },
    nutrient_management: {
      problemTitle: "चुनौती: पोषक तत्वों का असंतुलन और खनिजों का बंद होना",
      problemDesc: "फसलों को संतुलित मात्रा में मैक्रो (N, P, K) और माइक्रो-पोषक तत्वों (जिंक, आयरन, मैंगनीज, बोरॉन) की आवश्यकता होती है। रासायनिक खाद मिट्टी में पोषक तत्वों को लॉक कर देती है जिससे वे पौधों को नहीं मिल पाते, जिससे फसल का विकास रुक जाता है।",
      problemPoints: ["मिट्टी में जमा फॉस्फोरस और पोटाश का पौधों के लिए अनुपलब्ध होना", "जिंक, आयरन और बोरॉन जैसे सूक्ष्म पोषक तत्वों की कमी", "पौधों का रुक-रुक कर बढ़ना और कम खाद दक्षता"],
      solutionTitle: "जैविक समाधान: आसानी से उपलब्ध संतुलित पोषण",
      solutionDesc: "हम जैविक चेलेट्स, मल्टी-माइक्रोबियल कंसोर्टिया और जैविक पोषक तत्व वितरण प्रणाली प्रदान करते हैं। ये मिट्टी में जमे पोषक तत्वों को घोलकर सीधे पौधों की जड़ों तक पहुंचाते हैं।",
      solutionPoints: ["वातावरण से नाइट्रोजन लेकर मिट्टी में स्थिर करता है", "त्वरित अवशोषण के लिए संतुलित सूक्ष्म पोषक तत्व प्रदान करता है", "उर्वरक दक्षता बढ़ाता है और फसल के समान विकास का समर्थन करता है"]
    },
    pest_disease: {
      problemTitle: "चुनौती: बढ़ते कीट और कीटनाशक अवशेषों की विषाक्तता",
      problemDesc: "कीट और फंगल रोग फसल की उपज को भारी नुकसान पहुंचाते हैं। रासायनिक कीटनाशक कीटों में प्रतिरोधक क्षमता पैदा करते हैं और फसलों पर जहरीले अवशेष छोड़ते हैं जो मानव स्वास्थ्य और पर्यावरण के लिए हानिकारक हैं।",
      problemPoints: ["कीटों में प्रतिरोधक क्षमता और रासायनिक नियंत्रण की विफलता", "फसलों पर जहरीले कीटनाशकों के अवशेष", "मित्र कीटों का नुकसान और मिट्टी-पानी का प्रदूषण"],
      solutionTitle: "जैविक समाधान: प्राकृतिक और सुरक्षित फसल सुरक्षा",
      solutionDesc: "हमारा जैव-कीट नियंत्रण मित्र फंगस (ट्राइकोडर्मा, मेटारहिजियम) और नीम आधारित उच्च क्षमता वाले अजाडिरैक्टिन का उपयोग करता है। यह फसलों पर बिना कोई जहरीला अवशेष छोड़े कीटों को लक्षित करता है।",
      solutionPoints: ["कीटों और फंगल रोगों का व्यापक जैविक नियंत्रण", "शून्य हानिकारक अवशेष, फसल और पर्यावरण की पूर्ण सुरक्षा सुनिश्चित करना", "मित्र कीटों को बिना नुकसान पहुंचाए कीट प्रबंधन में सहायक"]
    },
    growth_enhancement: {
      problemTitle: "चुनौती: पर्यावरणीय तनाव और उपज क्षमता का अधूरा रहना",
      problemDesc: "पर्याप्त पोषण के बावजूद, पर्यावरणीय तनाव (सूखा, तापमान में उतार-चढ़ाव) फसलों में फूल झड़ने, फलों के छोटे आकार और असमान विकास का कारण बनते हैं, जिससे फसल अपनी वास्तविक उपज क्षमता तक नहीं पहुंच पाती।",
      problemPoints: ["तापमान और सूखे के कारण फूलों और फलों का गिरना", "फलों के छोटे आकार, कम वजन और कम मिठास", "फसल की आनुवंशिक उपज क्षमता प्राप्त करने में विफलता"],
      solutionTitle: "जैविक समाधान: चयापचय में सुधार और उपज का अधिकतम होना",
      solutionDesc: "हमारे प्रीमियम बायोस्टिमुलेंट्स और अमीनो एसिड उत्पाद (सोया और समुद्री घास के अर्क से निर्मित) पौधों के चयापचय को उत्तेजित करते हैं, फूल गिरने से रोकते हैं, और फलों के आकार, वजन और मिठास को बढ़ाते हैं।",
      solutionPoints: ["फूलों/फलों के गिरने को कम करता है और फलों का वजन बढ़ाता है", "सूखे और विपरीत मौसम के प्रति पौधों की सहनशीलता बढ़ाता है", "अधिकतम उपज के लिए पौधों के प्राकृतिक विकास को प्रेरित करता है"]
    }
  }
};

export default function Solutions() {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();

  const solutions = [
    { key: 'soil_health', id: 'soil-health', icon: <Leaf size={32} />, color: '#2E7D32', image: solSoilImg },
    { key: 'nutrient_management', id: 'nutrient-mgmt', icon: <Sprout size={32} />, color: '#1565C0', image: solNutrientImg },
    { key: 'pest_disease', id: 'pest-disease', icon: <Shield size={32} />, color: '#C62828', image: solPestImg },
    { key: 'growth_enhancement', id: 'growth', icon: <TrendingUp size={32} />, color: '#E65100', image: solGrowthImg },
  ];

  // Scroll to top on slug navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  function getSolutionProducts(solKey) {
    const categoryIds = solutionCategoryMapping[solKey] || [];
    let list = [];
    products.categories.forEach(cat => {
      if (categoryIds.includes(cat.id)) {
        cat.products.forEach(p => {
          list.push({
            ...p,
            categoryName: cat.name,
            categorySlug: cat.slug
          });
        });
      }
    });
    return list.slice(0, 6);
  }

  // 1. Solution Detail View (solutions/:slug)
  if (slug && solutionCategoryMapping[slug]) {
    const solKey = slugToKeyMap[slug];
    const sol = solutions.find(s => s.key === solKey);
    const relatedProducts = getSolutionProducts(slug);
    
    const lang = i18n.language?.startsWith('zh') ? 'zh' : i18n.language?.startsWith('hi') ? 'hi' : 'en';
    const detailCopy = localizedDetails[lang][solKey] || localizedDetails['en'][solKey];

    const solTitle = t(`pages_details.solutions.items.${solKey}.title`);

    return (
      <GenericPage 
        title={solTitle} 
        subtitle={t(`pages_details.solutions.items.${solKey}.desc`)} 
        breadcrumbs={[
          { label: t('nav.solutions'), path: '/solutions' },
          { label: solTitle }
        ]}
      >
        <div className="container" id="solution-detail-view">
          
          {/* Back button to general Solutions Overview */}
          <Link to="/solutions" className="btn btn-outline-gold back-to-overview-btn">
            <ArrowLeft size={16} /> {localizedDetails[lang].backBtn || "Back to Solutions Overview"}
          </Link>

          {/* The Challenge Card (Full-width for clean readability) */}
          <div className="solutions-detail-card challenge-card full-width-challenge">
            <div className="card-header-icon" style={{ background: 'rgba(198, 40, 40, 0.08)', color: '#C62828' }}>
              <AlertTriangle size={24} />
            </div>
            <h3>{detailCopy.problemTitle}</h3>
            <p className="detail-card-desc">{detailCopy.problemDesc}</p>
            <div className="detail-points-list grid-points-list">
              {detailCopy.problemPoints.map((pt, pIdx) => (
                <div key={pIdx} className="detail-point-item">
                  <span className="point-bullet-warning">⚠️</span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Products Catalogue Section */}
          <div className="solutions-products-shelf-detail" style={{ '--accent-color': sol.color }}>
            <h3 className="shelf-headline">
              {(localizedDetails[lang].shelfTitle || "🌱 Recommended Bio-Solutions for {title}").replace('{title}', solTitle)}
            </h3>
            <div className="shelf-products-grid">
              {relatedProducts.map((p) => (
                <div key={p.id} className="shelf-product-card">
                  <div className="spc-image-area">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="spc-img" />
                    ) : (
                      <div className="spc-placeholder" style={{ background: `${sol.color}08`, color: sol.color }}>
                        <Leaf size={32} />
                      </div>
                    )}
                  </div>
                  
                  <div className="spc-info-area">
                    <span className="spc-category-label">{p.categoryName}</span>
                    <h4>{p.name}</h4>
                    <p className="spc-tagline">{p.tagline}</p>
                    
                    <div className="spc-specs">
                      {p.dosage && <span><strong>Dosage:</strong> {p.dosage}</span>}
                      {p.application && <span><strong>Application:</strong> {p.application}</span>}
                    </div>
                    
                    <Link to={`/products/${p.categorySlug}/${p.slug}`} className="btn btn-sm btn-outline-gold spc-view-btn">
                      View Details <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GenericPage>
    );
  }

  // 2. Solutions General Overview View (/solutions)
  return (
    <GenericPage title={t('pages.solutions.title')} subtitle={t('pages.solutions.subtitle')} breadcrumbs={[{ label: t('nav.solutions') }]}>
      <div className="container" id="overview">
        {solutions.map((sol, i) => (
          <AnimatedSection key={sol.key} id={sol.id}>
            <section className={`solutions-item-section ${sol.key === 'nutrient_management' ? 'nutrient-management-horizontal' : ''}`}>
              <div className="solutions-content-col" style={{ order: i % 2 === 0 ? 0 : 1 }}>
                <div className="solutions-icon-wrapper" style={{ background: `${sol.color}15`, color: sol.color }}>
                  {sol.icon}
                </div>
                <h2>{t(`pages_details.solutions.items.${sol.key}.title`)}</h2>
                <p className="solutions-desc">{t(`pages_details.solutions.items.${sol.key}.desc`)}</p>
                
                <div className="solutions-features-list">
                  {(Array.isArray(t(`pages_details.solutions.items.${sol.key}.features`, { returnObjects: true })) ? t(`pages_details.solutions.items.${sol.key}.features`, { returnObjects: true }) : []).map((f, j) => (
                    <div 
                      key={j} 
                      className="solutions-feature-item"
                      style={{ 
                        background: `${sol.color}0a`, 
                        borderColor: `${sol.color}25` 
                      }}
                    >
                      <div className="solutions-feature-bullet" style={{ background: sol.color }}></div>
                      <span className="solutions-feature-text">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Redirects to dedicated solutions detail page */}
                <Link to={`/solutions/${sol.id}`} className="btn btn-primary solutions-view-products-btn" style={{ '--accent-color': sol.color }}>
                  {t('pages.solutions.view_related_products')} <ArrowRight size={16} />
                </Link>
              </div>
              
              <div className="solutions-image-col" style={{ order: i % 2 === 0 ? 1 : 0 }}>
                <div className="solutions-image-wrapper">
                  <img src={sol.image} alt={t(`pages_details.solutions.items.${sol.key}.title`)} />
                </div>
              </div>
            </section>
          </AnimatedSection>
        ))}
      </div>
    </GenericPage>
  );
}

