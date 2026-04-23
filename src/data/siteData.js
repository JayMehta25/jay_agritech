export const products = {
  categories: [
    {
      id: 'bio-fertilizers',
      name: 'Bio Fertilizers',
      slug: 'bio-fertilizers',
      description: 'Microbial-based fertilizers that enhance soil fertility and plant nutrition naturally.',
      icon: '🌱',
      color: '#2E7D32',
      productCount: 12,
      products: [
        {
          id: 'bf-001',
          name: 'JayRhizo Plus',
          slug: 'jayrhizo-plus',
          tagline: 'Advanced Rhizobium Culture',
          description: 'High-potency Rhizobium culture for enhanced nitrogen fixation in leguminous crops. Formulated with 10⁸ CFU/ml for maximum root nodulation and plant growth.',
          benefits: ['Enhances nitrogen fixation by 40%', 'Improves root nodulation', 'Reduces chemical fertilizer dependency', 'Boosts crop yield by 15-25%'],
          application: 'Seed treatment: 10ml per kg of seeds. Soil application: 1L per acre mixed with compost.',
          crops: ['Soybean', 'Groundnut', 'Chickpea', 'Lentil', 'Pea'],
          packSizes: ['250ml', '500ml', '1L', '5L'],
          price: '₹320',
          badge: 'Best Seller',
          image: null
        },
        {
          id: 'bf-002',
          name: 'JayPhos Gold',
          slug: 'jayphos-gold',
          tagline: 'Phosphate Solubilizing Bacteria',
          description: 'Premium PSB formulation that unlocks bound phosphorus in soil, making it available to plants. Ideal for phosphorus-deficient soils.',
          benefits: ['Solubilizes fixed phosphorus', 'Improves phosphorus uptake by 30%', 'Enhances root development', 'Cost-effective P nutrition'],
          application: 'Soil application: 1L per acre. Can be mixed with organic manure.',
          crops: ['Wheat', 'Rice', 'Cotton', 'Vegetables', 'Fruits'],
          packSizes: ['500ml', '1L', '5L'],
          price: '₹280',
          badge: 'New',
          image: null
        },
        {
          id: 'bf-003',
          name: 'JayAzoto Max',
          slug: 'jayazoto-max',
          tagline: 'Azotobacter Premium Culture',
          description: 'Free-living nitrogen-fixing bacteria for non-leguminous crops. Provides atmospheric nitrogen directly to plants.',
          benefits: ['Fixes 20-40 kg N/ha/year', 'Produces growth hormones', 'Improves soil health', 'Compatible with all crops'],
          application: 'Soil drench: 1L per acre. Foliar: 5ml/L spray.',
          crops: ['Wheat', 'Rice', 'Maize', 'Sugarcane', 'Vegetables'],
          packSizes: ['500ml', '1L', '5L'],
          price: '₹260',
          badge: null,
          image: null
        }
      ]
    },
    {
      id: 'bio-pesticides',
      name: 'Bio Pesticides',
      slug: 'bio-pesticides',
      description: 'Eco-friendly pest management solutions derived from natural organisms and botanical extracts.',
      icon: '🛡️',
      color: '#C62828',
      productCount: 14,
      products: [
        {
          id: 'bp-001',
          name: 'JayNeem Shield',
          slug: 'jayneem-shield',
          tagline: 'Neem-Based Bio Insecticide',
          description: 'Concentrated neem oil formulation with 3000 ppm Azadirachtin. Broad-spectrum insect control with anti-feedant and growth-disrupting properties.',
          benefits: ['Controls 200+ insect species', 'Anti-feedant & repellent action', 'Zero residue on produce', 'Safe for beneficial insects'],
          application: 'Foliar spray: 3-5ml/L water. Repeat every 7-10 days.',
          crops: ['Cotton', 'Vegetables', 'Fruits', 'Pulses', 'Cereals'],
          packSizes: ['250ml', '500ml', '1L', '5L'],
          price: '₹380',
          badge: 'Top Rated',
          image: null
        },
        {
          id: 'bp-002',
          name: 'JayTricho Guard',
          slug: 'jaytricho-guard',
          tagline: 'Trichoderma viride Formulation',
          description: 'Premium Trichoderma viride-based bio-fungicide for soil-borne disease management. Prevents root rot, wilt, and damping-off.',
          benefits: ['Controls soil-borne pathogens', 'Promotes root growth', 'Enhances plant immunity', 'Improves nutrient uptake'],
          application: 'Seed treatment: 5g/kg. Soil: 1kg/acre with FYM.',
          crops: ['Tomato', 'Chilli', 'Brinjal', 'Cucumber', 'Cotton'],
          packSizes: ['250g', '500g', '1kg', '5kg'],
          price: '₹340',
          badge: null,
          image: null
        },
        {
          id: 'bp-003',
          name: 'JayBt Power',
          slug: 'jaybt-power',
          tagline: 'Bacillus thuringiensis Insecticide',
          description: 'High-potency Bt formulation for caterpillar and lepidopteran pest control. Stomach-action insecticide that is safe for humans and environment.',
          benefits: ['Targets caterpillars specifically', 'No chemical residues', 'Safe for pollinators', 'IPM compatible'],
          application: 'Foliar spray: 2g/L water at early larval stage.',
          crops: ['Cotton', 'Cabbage', 'Cauliflower', 'Maize', 'Rice'],
          packSizes: ['100g', '250g', '500g', '1kg'],
          price: '₹290',
          badge: 'Popular',
          image: null
        }
      ]
    },
    {
      id: 'plant-growth-regulators',
      name: 'Plant Growth Regulators',
      slug: 'plant-growth-regulators',
      description: 'Science-backed growth enhancers for optimized plant development, flowering, and fruiting.',
      icon: '🌿',
      color: '#1565C0',
      productCount: 10,
      products: [
        {
          id: 'pgr-001',
          name: 'JayGrow Supreme',
          slug: 'jaygrow-supreme',
          tagline: 'Multi-Action Growth Enhancer',
          description: 'Proprietary blend of seaweed extract, amino acids, and micronutrients for comprehensive plant growth enhancement across all crop stages.',
          benefits: ['360° growth enhancement', 'Increases chlorophyll content', 'Improves stress tolerance', 'Enhances fruit quality'],
          application: 'Foliar spray: 2-3ml/L at vegetative and flowering stage.',
          crops: ['All Crops'],
          packSizes: ['250ml', '500ml', '1L'],
          price: '₹450',
          badge: 'Premium',
          image: null
        },
        {
          id: 'pgr-002',
          name: 'JayFlora Boost',
          slug: 'jayflora-boost',
          tagline: 'Flowering & Fruiting Stimulant',
          description: 'Specialized formulation to promote early and uniform flowering, fruit set, and fruit development. Contains natural cytokinins and gibberellins.',
          benefits: ['Promotes uniform flowering', 'Reduces flower drop', 'Increases fruit size', 'Improves crop uniformity'],
          application: 'Spray: 2ml/L at pre-flowering and fruit set stage.',
          crops: ['Mango', 'Grapes', 'Pomegranate', 'Tomato', 'Chilli'],
          packSizes: ['100ml', '250ml', '500ml', '1L'],
          price: '₹520',
          badge: null,
          image: null
        }
      ]
    },
    {
      id: 'organic-nutrients',
      name: 'Organic Nutrients',
      slug: 'organic-nutrients',
      description: 'OMRI-certified organic nutrient solutions for sustainable agriculture and premium produce.',
      icon: '🍃',
      color: '#E65100',
      productCount: 11,
      products: [
        {
          id: 'on-001',
          name: 'JayHumic Pro',
          slug: 'jayhumic-pro',
          tagline: 'Premium Humic Acid Complex',
          description: 'High-concentration humic acid (12%) with fulvic acid for soil conditioning and nutrient chelation. Improves soil structure and water-holding capacity.',
          benefits: ['Improves soil CEC', 'Enhances nutrient availability', 'Increases water retention', 'Promotes beneficial microbes'],
          application: 'Soil: 2L/acre through drip/flood. Foliar: 2ml/L.',
          crops: ['All Crops'],
          packSizes: ['1L', '5L', '20L'],
          price: '₹380',
          badge: 'Best Value',
          image: null
        },
        {
          id: 'on-002',
          name: 'JaySeaweed Extract',
          slug: 'jayseaweed-extract',
          tagline: 'Cold-Pressed Seaweed Concentrate',
          description: 'Premium seaweed extract from Ascophyllum nodosum with natural plant hormones, amino acids, and trace minerals for holistic plant nutrition.',
          benefits: ['Rich in natural cytokinins', 'Enhances stress tolerance', 'Improves fruit quality', 'Boosts root development'],
          application: 'Foliar: 2-3ml/L. Drip: 1L/acre.',
          crops: ['Fruits', 'Vegetables', 'Flowers', 'Spices'],
          packSizes: ['250ml', '500ml', '1L', '5L'],
          price: '₹440',
          badge: null,
          image: null
        }
      ]
    },
    {
      id: 'specialty-products',
      name: 'Specialty Products',
      slug: 'specialty-products',
      description: 'Innovative solutions for specific agricultural challenges — soil health, water management, and post-harvest.',
      icon: '⚡',
      color: '#7B1FA2',
      productCount: 8,
      products: [
        {
          id: 'sp-001',
          name: 'JaySoil Revive',
          slug: 'jaysoil-revive',
          tagline: 'Complete Soil Rejuvenation Kit',
          description: 'Comprehensive soil health restoration system combining beneficial microorganisms, organic matter, and enzymes to rejuvenate degraded soils.',
          benefits: ['Restores soil biology', 'Breaks down crop residue', 'Improves soil structure', 'Reduces salinity impact'],
          application: 'Apply 5kg/acre before sowing. Mix with organic manure for best results.',
          crops: ['All Crops', 'Ideal for degraded soils'],
          packSizes: ['5kg', '10kg', '25kg'],
          price: '₹850',
          badge: 'Innovation Award',
          image: null
        },
        {
          id: 'sp-002',
          name: 'JayWet Spreader',
          slug: 'jaywet-spreader',
          tagline: 'Silicon-Based Spreading Agent',
          description: 'Non-ionic organosilicone surfactant that improves spray coverage, absorption, and rain-fastness of agricultural inputs.',
          benefits: ['Improves spray coverage 3x', 'Enhances product absorption', 'Rain-fast in 30 minutes', 'Compatible with all inputs'],
          application: 'Add 0.5ml/L to spray solution.',
          crops: ['All Crops'],
          packSizes: ['100ml', '250ml', '500ml', '1L'],
          price: '₹220',
          badge: null,
          image: null
        }
      ]
    }
  ]
};

export const companyInfo = {
  name: 'Jay Agritech Pvt. Ltd.',
  shortName: 'Jay Agritech',
  tagline: 'Innovating Agriculture, Nurturing Growth',
  founded: 2026,
  location: 'Valsad, Gujarat, India',
  phone: '+91 98765 43210',
  email: 'info@jayagritech.com',
  website: 'www.jayagritech.com',
  whatsapp: '+919876543210',
  
  stats: [
    { number: 60, suffix: '+', label: 'Products' },
    { number: 5, suffix: '', label: 'Product Categories' },
    { number: 15, suffix: '+', label: 'States Covered' },
    { number: 500, suffix: '+', label: 'Dealer Network' },
  ],
  
  vision: 'To become India\'s most trusted agri-biotech company, empowering every farmer with sustainable, science-backed solutions for a food-secure future.',
  mission: 'We develop and deliver innovative biological and organic agricultural inputs that enhance crop productivity, improve soil health, and promote sustainable farming practices — making advanced agri-technology accessible to every farmer.',
  
  values: [
    { title: 'Innovation First', description: 'Continuous R&D investment in cutting-edge biological technologies.', icon: 'Lightbulb' },
    { title: 'Farmer-Centric', description: 'Every product designed with the farmer\'s real-world needs in mind.', icon: 'Users' },
    { title: 'Sustainability', description: 'Committed to eco-friendly solutions that protect our planet.', icon: 'Leaf' },
    { title: 'Scientific Rigor', description: 'Every claim backed by field trials and laboratory validation.', icon: 'FlaskConical' },
    { title: 'Integrity', description: 'Transparent practices, honest communication, quality without compromise.', icon: 'Shield' },
    { title: 'Accessibility', description: 'Premium solutions at fair prices, available across India.', icon: 'Globe' },
  ],
  
  leadership: [
    {
      name: 'Jayesh Patel',
      role: 'Founder & Managing Director',
      bio: 'A visionary entrepreneur with deep roots in Gujarat\'s agricultural community. Jayesh founded Jay Agritech with a mission to bridge the gap between advanced biotechnology and practical farming solutions.',
      image: null
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'Head of Research & Development',
      bio: 'PhD in Agricultural Microbiology from IARI. Over 12 years of experience in developing biological crop protection and nutrition products.',
      image: null
    },
    {
      name: 'Rajesh Mehta',
      role: 'Chief Operating Officer',
      bio: 'MBA with 15 years of experience in agri-input supply chain management. Expert in building efficient distribution networks across rural India.',
      image: null
    },
    {
      name: 'Dr. Anil Kumar',
      role: 'Quality Assurance Director',
      bio: 'MSc in Biochemistry. Specialist in quality control protocols for biological products. Ensures every batch meets the highest standards.',
      image: null
    }
  ],
  
  certifications: [
    'ISO 9001:2015 Certified',
    'FCO Approved Formulations',
    'CIB & RC Registered',
    'NPOP Organic Certified',
    'BIS Standard Compliant',
    'GLP Compliant Testing'
  ],
  
  milestones: [
    { year: '2026 Q1', title: 'Company Founded', description: 'Jay Agritech Pvt. Ltd. established in Valsad, Gujarat with a vision to revolutionize Indian agriculture.' },
    { year: '2026 Q2', title: 'R&D Lab Setup', description: 'State-of-the-art microbiology and formulation laboratory established with advanced testing equipment.' },
    { year: '2026 Q3', title: 'First Product Launch', description: 'Launch of initial product line — 15 bio-fertilizer and bio-pesticide formulations.' },
    { year: '2026 Q4', title: 'Dealer Network', description: 'Established partnerships with 100+ dealers across Gujarat and Maharashtra.' },
  ]
};

export const blogPosts = [
  {
    id: 1,
    slug: 'understanding-soil-health',
    title: 'Understanding Soil Health: The Foundation of Productive Farming',
    excerpt: 'Healthy soil is the bedrock of successful agriculture. Learn how biological inputs can transform your soil from depleted to thriving.',
    category: 'Soil Health',
    author: 'Dr. Priya Sharma',
    date: '2026-04-15',
    readTime: '8 min read',
    featured: true,
    image: null,
    content: 'Soil health is fundamentally about the biological activity within your soil. A teaspoon of healthy soil contains billions of microorganisms...'
  },
  {
    id: 2,
    slug: 'integrated-pest-management',
    title: 'IPM Strategies: Balancing Pest Control with Environmental Safety',
    excerpt: 'Discover how integrated pest management combines biological, cultural, and chemical methods for sustainable crop protection.',
    category: 'Pest Management',
    author: 'Dr. Anil Kumar',
    date: '2026-04-10',
    readTime: '6 min read',
    featured: false,
    image: null,
    content: 'Integrated Pest Management (IPM) is a holistic approach to pest control...'
  },
  {
    id: 3,
    slug: 'bio-fertilizers-vs-chemical',
    title: 'Bio Fertilizers vs Chemical Fertilizers: A Comprehensive Comparison',
    excerpt: 'An evidence-based analysis of biological and chemical fertilizers — understanding when and how to use each for optimal results.',
    category: 'Knowledge',
    author: 'Dr. Priya Sharma',
    date: '2026-04-05',
    readTime: '10 min read',
    featured: true,
    image: null,
    content: 'The debate between bio-fertilizers and chemical fertilizers...'
  },
  {
    id: 4,
    slug: 'monsoon-crop-preparation',
    title: 'Monsoon Crop Preparation: A Complete Farmer\'s Guide',
    excerpt: 'Get your fields ready for the Kharif season with this comprehensive guide covering soil prep, seed treatment, and nutrient planning.',
    category: 'Seasonal Advisory',
    author: 'Rajesh Mehta',
    date: '2026-03-28',
    readTime: '7 min read',
    featured: false,
    image: null,
    content: 'The monsoon season is critical for Indian agriculture...'
  },
  {
    id: 5,
    slug: 'organic-farming-certification',
    title: 'Organic Farming Certification in India: Step-by-Step Process',
    excerpt: 'Navigate the organic certification journey — from NPOP standards to PGS certification, with cost analysis and timelines.',
    category: 'Organic Farming',
    author: 'Dr. Priya Sharma',
    date: '2026-03-20',
    readTime: '12 min read',
    featured: false,
    image: null,
    content: 'Organic farming certification opens doors to premium markets...'
  },
  {
    id: 6,
    slug: 'micronutrient-deficiency-guide',
    title: 'Identifying Micronutrient Deficiencies in Crops: Visual Guide',
    excerpt: 'Learn to spot zinc, iron, boron, and manganese deficiencies through leaf symptoms — with treatment recommendations.',
    category: 'Nutrient Management',
    author: 'Dr. Anil Kumar',
    date: '2026-03-15',
    readTime: '9 min read',
    featured: false,
    image: null,
    content: 'Micronutrient deficiencies can severely impact crop yield...'
  }
];

export const caseStudies = [
  {
    id: 1,
    slug: 'cotton-yield-boost',
    title: 'Cotton Yield Increased by 32% in Bharuch District',
    crop: 'Cotton',
    location: 'Bharuch, Gujarat',
    farmer: 'Rameshbhai Patel',
    challenge: 'Declining cotton yields due to soil degradation and heavy bollworm infestation over consecutive seasons.',
    solution: 'Integrated application of JaySoil Revive + JayNeem Shield + JayGrow Supreme across the crop cycle.',
    results: ['32% increase in yield', '40% reduction in pest damage', '₹15,000 savings per acre on inputs', 'Improved soil health indicators'],
    testimonial: 'Jay Agritech\'s products have transformed my cotton farming. The combination approach gave me the best yield in 5 years.',
    image: null
  },
  {
    id: 2,
    slug: 'groundnut-quality-improvement',
    title: 'Premium Quality Groundnut Production in Junagadh',
    crop: 'Groundnut',
    location: 'Junagadh, Gujarat',
    farmer: 'Kantibhai Solanki',
    challenge: 'Poor root nodulation and inconsistent quality affecting market price realization.',
    solution: 'JayRhizo Plus seed treatment + JayPhos Gold soil application + JayHumic Pro for soil conditioning.',
    results: ['45% better nodulation', '20% yield improvement', '₹800/quintal premium on quality', 'Healthier soil biology'],
    testimonial: 'The rhizobium culture worked wonders. My groundnut plants had the best root nodules I\'ve ever seen.',
    image: null
  },
  {
    id: 3,
    slug: 'mango-flowering-success',
    title: 'Record Mango Flowering in Valsad Orchards',
    crop: 'Mango',
    location: 'Valsad, Gujarat',
    farmer: 'Dineshbhai Desai',
    challenge: 'Erratic flowering and heavy fruit drop leading to poor mango harvests for two consecutive years.',
    solution: 'JayFlora Boost at pre-flowering + JaySeaweed Extract during fruit development + JayTricho Guard for disease prevention.',
    results: ['60% more uniform flowering', '35% reduction in fruit drop', '25% increase in fruit size', 'Better shelf life'],
    testimonial: 'This season was exceptional. The flowering was the most uniform I\'ve seen, and the fruit quality was outstanding.',
    image: null
  }
];

export const navLinks = [
  {
    label: 'About',
    path: '/about',
    megaMenu: true,
    sections: [
      {
        title: 'Company',
        links: [
          { label: 'Company Overview', path: '/about', description: 'Our story, vision & mission' },
          { label: 'Our Journey', path: '/about/journey', description: 'From founding to today' },
          { label: 'Vision & Mission', path: '/about/vision-mission', description: 'What drives us' },
          { label: 'Leadership Team', path: '/about/leadership', description: 'Meet our team' },
        ]
      },
      {
        title: 'Operations',
        links: [
          { label: 'Manufacturing', path: '/about/manufacturing', description: 'Our production facilities' },
          { label: 'Certifications', path: '/about/certifications', description: 'Quality standards & approvals' },
          { label: 'Sustainability', path: '/about/sustainability', description: 'Our green commitment' },
          { label: 'Milestones', path: '/about/milestones', description: 'Key achievements' },
        ]
      }
    ]
  },
  {
    label: 'Solutions',
    path: '/solutions',
    megaMenu: true,
    sections: [
      {
        title: 'Crop Solutions',
        links: [
          { label: 'Solutions Overview', path: '/solutions', description: 'Complete solution portfolio' },
          { label: 'Soil Health', path: '/solutions/soil-health', description: 'Restore & maintain soil vitality' },
          { label: 'Nutrient Management', path: '/solutions/nutrient-mgmt', description: 'Balanced crop nutrition' },
          { label: 'Pest & Disease', path: '/solutions/pest-disease', description: 'Biological crop protection' },
          { label: 'Growth Enhancement', path: '/solutions/growth', description: 'Maximize crop potential' },
        ]
      }
    ]
  },
  {
    label: 'Products',
    path: '/products',
    megaMenu: true,
    sections: [
      {
        title: 'Product Categories',
        links: [
          { label: 'All Products', path: '/products', description: 'Browse our full catalog' },
          { label: 'Bio Fertilizers', path: '/products/bio-fertilizers', description: '12 products' },
          { label: 'Bio Pesticides', path: '/products/bio-pesticides', description: '14 products' },
          { label: 'Growth Regulators', path: '/products/plant-growth-regulators', description: '10 products' },
          { label: 'Organic Nutrients', path: '/products/organic-nutrients', description: '11 products' },
          { label: 'Specialty Products', path: '/products/specialty-products', description: '8 products' },
        ]
      }
    ]
  },
  {
    label: 'Business',
    path: '/business',
    megaMenu: true,
    sections: [
      {
        title: 'B2B Solutions',
        links: [
          { label: 'Business Overview', path: '/business', description: 'Partnership opportunities' },
          { label: 'Contract Manufacturing', path: '/business/contract-mfg', description: 'OEM & custom formulations' },
          { label: 'Research Services', path: '/business/research', description: 'R&D collaborations' },
          { label: 'White/Private Label', path: '/business/white-label', description: 'Your brand, our quality' },
          { label: 'Exports & Franchise', path: '/business/exports', description: 'Global opportunities' },
        ]
      }
    ]
  },
  {
    label: 'Research',
    path: '/research',
    megaMenu: false,
  },
  {
    label: 'Farmer Zone',
    path: '/farmer-zone',
    megaMenu: true,
    sections: [
      {
        title: 'Resources',
        links: [
          { label: 'Farmer Zone', path: '/farmer-zone', description: 'Your farming resource hub' },
          { label: 'Crop-wise Solutions', path: '/farmer-zone/crop-solutions', description: 'Find solutions by crop' },
          { label: 'Problem Guide', path: '/farmer-zone/problem-guide', description: 'Diagnose & solve issues' },
          { label: 'Seasonal Advisory', path: '/farmer-zone/seasonal', description: 'Season-specific guidance' },
        ]
      }
    ]
  },
  {
    label: 'Contact',
    path: '/contact',
    megaMenu: false,
  }
];
