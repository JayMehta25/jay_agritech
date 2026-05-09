import orgoNb from '../assets/prod_imgs/biostimulants/biofertilizers/orgo nb.png';
import orgoPb from '../assets/prod_imgs/biostimulants/biofertilizers/orgo pb.png';
import orgoProMax from '../assets/prod_imgs/biostimulants/biofertilizers/orgo pro max.png';
import orgoRescuePro from '../assets/prod_imgs/biostimulants/biofertilizers/orgo rescue pro.png';
import orgoRobustaProAc from '../assets/prod_imgs/biostimulants/biofertilizers/orgo robusta pro ac kit.png';
import orgoRobustaProLdc from '../assets/prod_imgs/biostimulants/biofertilizers/orgo robusta pro ldc kit.png';
import orgoRobustaProNc from '../assets/prod_imgs/biostimulants/biofertilizers/pro nc kit.png';
import orgoRobustaProSdc from '../assets/prod_imgs/biostimulants/biofertilizers/orgo robusta pro sdc kit.png';
import orgoZb from '../assets/prod_imgs/biostimulants/biofertilizers/orgo zb.png';
import shielderPro from '../assets/prod_imgs/biostimulants/biofertilizers/shielder pro.png';
import dharaMax from '../assets/prod_imgs/biostimulants/Biostimulants/dhara max.png';
import dharaLite from '../assets/prod_imgs/biostimulants/Biostimulants/dhara lite.png';
import orgoFloral from '../assets/prod_imgs/biostimulants/Biostimulants/orgo floral.png';
import orgoFruitage from '../assets/prod_imgs/biostimulants/Biostimulants/orgo fruitage.png';
import orgoMrudamrit from '../assets/prod_imgs/biostimulants/Biostimulants/orgo mrudamrit.png';
import orgoOrchaboost from '../assets/prod_imgs/biostimulants/Biostimulants/orgo orchaboost.png';
import orgoOrchagrow from '../assets/prod_imgs/biostimulants/Biostimulants/orgo orchagrow.png';
import orgoSeavita from '../assets/prod_imgs/biostimulants/Biostimulants/orgo seavita.png';
import humivita from '../assets/prod_imgs/biostimulants/Biostimulants/humivita.png';
import carbplus from '../assets/prod_imgs/biostimulants/Biostimulants/carbplus.png';
import nutriMicrozest from '../assets/prod_imgs/biostimulants/micronutrients/nutri microzest.png';
import nutriMicrozen from '../assets/prod_imgs/biostimulants/micronutrients/nutri microzen.png';
import nutriMicroforce from '../assets/prod_imgs/biostimulants/micronutrients/nutri microforce-sp.png';
import nutriMicroboost from '../assets/prod_imgs/biostimulants/micronutrients/nutri microboost.png';
import nutriNutriva from '../assets/prod_imgs/biostimulants/micronutrients/nutri nutriva.png';
import orgoBhumirich from '../assets/prod_imgs/biostimulants/organicNutri/ARGO BHUMIRICH.png';
import orgoCropcharge from '../assets/prod_imgs/biostimulants/organicNutri/cropcharge.png';
import orgoFarmphos from '../assets/prod_imgs/biostimulants/organicNutri/farmphos.png';
import director1 from '../assets/partners/director_1.png';
import director2 from '../assets/partners/director_2.png';

export const products = {
  categories: [
    {
      id: 'bio-insecticides',
      name: 'Bio Insecticides',
      nameKey: 'products.categories.bio_insecticides.name',
      slug: 'bio-insecticides',
      description: 'Advanced biological insecticides and fungicides for eco-friendly pest and disease management.',
      descriptionKey: 'products.categories.bio_insecticides.desc',
      icon: '🛡️',
      color: '#C62828',
      productCount: 11,
      products: [
        {
          id: 'bi-001',
          name: 'AT ORGO TRICHO',
          slug: 'at-orgo-tricho',
          tagline: 'Biological Fungicide (Trichoderma viride)',
          description: 'A biological fungicide used for seed and soil treatment for suppression of various diseases caused by fungal pathogens. It protects crops from several seed-borne and soil-borne pathogens like Rhizoctonia spp, Fusarium, Alternaria, Pythium etc.',
          benefits: ['Controls seed & soil-borne pathogens', 'Suppresses Rhizoctonia, Fusarium, Pythium', 'Enhances plant immunity', 'Safe for environment'],
          microbes: 'Trichoderma viride 1.5% LF',
          application: 'Soil application',
          dosage: '1 Liter/Acre',
          crops: ['All Crops'],
          packSizes: ['1 Lit'],
          image: null
        },
        {
          id: 'bi-002',
          name: 'AT ORGO TRICHO-P',
          slug: 'at-orgo-tricho-p',
          tagline: 'Biological Fungicide (Trichoderma viride) - WP',
          description: 'A biological fungicide in wettable powder form, used for seed and soil treatment for suppression of various diseases caused by fungal pathogens. It protects crops from several seed-borne and soil-borne pathogens like Rhizoctonia spp, Fusarium, Alternaria, Pythium etc.',
          benefits: ['Effective against fungal pathogens', 'Ideal for seed treatment', 'Suppresses various soil diseases', '100% natural formulation'],
          microbes: 'Trichoderma viride 1.0% WP',
          application: 'Soil application',
          dosage: '1 Kg/Acre',
          crops: ['All Crops'],
          packSizes: ['1 Kg'],
          image: null
        },
        {
          id: 'bi-003',
          name: 'AT ORGO PSUDO',
          slug: 'at-orgo-psudo',
          tagline: 'Bio Growth Promoter & Fungicide (Pseudomonas fluorescens)',
          description: 'A biological plant growth promoter as well as bio-fungicide. It promotes plant growth by releasing PGPR enzymes and protects plants from bacterial and fungal diseases by releasing various antibiotics.',
          benefits: ['Promotes growth with PGPR enzymes', 'Protects from bacterial & fungal diseases', 'Dual-action formula', 'Enhances root health'],
          microbes: 'Pseudomonas fluorescens 1.5% LF',
          application: 'Soil and Foliar application',
          dosage: '1 Liter/Acre',
          crops: ['All Crops'],
          packSizes: ['1 Lit'],
          image: null
        },
        {
          id: 'bi-004',
          name: 'AT ORGO PSUDO-P',
          slug: 'at-orgo-psudo-p',
          tagline: 'Bio Growth Promoter & Fungicide (Pseudomonas fluorescens) - WP',
          description: 'A biological plant growth promoter and bio-fungicide in powder form. It promotes plant growth by releasing PGPR enzymes and protects plants from bacterial and fungal diseases by releasing various antibiotics.',
          benefits: ['Growth promoting enzymes', 'Suppresses bacterial diseases', 'Antibiotic release for protection', 'Versatile application'],
          microbes: 'Pseudomonas fluorescens 1.0% WP',
          application: 'Soil and Foliar application',
          dosage: '1 Kg/Acre',
          crops: ['All Crops'],
          packSizes: ['1 Kg'],
          image: null
        },
        {
          id: 'bi-005',
          name: 'ORGO META',
          slug: 'orgo-meta',
          tagline: 'Biological Insecticide (Metarhizium anisopliae)',
          description: 'A biological insecticide based on a selected strain of naturally occurring entomopathogenic soil fungus Metarhizium anisopliae that infects and kills larvae and adults of many insects like thrips, mites, leaf hoppers, weevils, white flies, and caterpillars.',
          benefits: ['Kills larvae and adult insects', 'Controls thrips, mites, white flies', 'Natural entomopathogenic strain', 'No chemical residue'],
          microbes: 'Metarhizium anisopliae 1.5% LF',
          application: 'Foliar application',
          dosage: '1 Liter/Acre',
          crops: ['All Crops'],
          packSizes: ['1 Lit'],
          image: null
        },
        {
          id: 'bi-006',
          name: 'AT ORGO META-P',
          slug: 'at-orgo-meta-p',
          tagline: 'Biological Insecticide (Metarhizium anisopliae) - WP',
          description: 'A biological insecticide in powder form, based on naturally occurring entomopathogenic soil fungus Metarhizium anisopliae. Effective against thrips, mites, leaf hoppers, fruit and shoot borers, and caterpillars.',
          benefits: ['Broad-spectrum insect control', 'Infects and kills lepidopteran pests', 'Safe for beneficial insects', 'Sustainable pest management'],
          microbes: 'Metarhizium anisopliae 1.0% WP',
          application: 'Foliar application',
          dosage: '1 Kg/Acre',
          crops: ['All Crops'],
          packSizes: ['1 Kg'],
          image: null
        },
        {
          id: 'bi-007',
          name: 'AT ORGO NEMATIC',
          slug: 'at-orgo-nematic',
          tagline: 'Biological Nematicide (Paecilomyces lilacinus)',
          description: 'A biological nematicide based on a selected strain of naturally occurring entomopathogenic fungus Paecilomyces lilacinus. It infects and kills eggs, larvae, and adults of plant pathogenic nematodes like root-knot, cyst, citrus, and lesion nematodes.',
          benefits: ['Controls root-knot & cyst nematodes', 'Kills eggs, larvae, and adult nematodes', 'Natural entomopathogenic strain', 'Improves root health'],
          microbes: 'Paecilomyces lilacinus 1.5% LF',
          application: 'Soil application',
          dosage: '1 Liter/Acre',
          crops: ['All Crops'],
          packSizes: ['1 Lit'],
          image: null
        },
        {
          id: 'bi-008',
          name: 'AT ORGO NEMATIC-P',
          slug: 'at-orgo-nematic-p',
          tagline: 'Biological Nematicide (Verticillium Chlamydosporium) - WP',
          description: 'A biological nematicide based on a selected strain of naturally occurring entomopathogenic fungus Verticillium Chlamydosporium. Effective against various plant pathogenic nematodes.',
          benefits: ['Targets pathogenic nematodes', 'Infects nematode eggs & larvae', 'Soil-borne disease suppression', 'Organic-friendly solution'],
          microbes: 'Verticillium Chlamydosporium 1% WP',
          application: 'Soil application',
          dosage: '1 Kg/Acre',
          crops: ['All Crops'],
          packSizes: ['1 Kg'],
          image: null
        },
        {
          id: 'bi-009',
          name: 'AT ORGO NEEM',
          slug: 'at-orgo-neem',
          tagline: 'Azadirachtin (1500 ppm) based Insecticide',
          description: 'An Azadirachtin (1500 ppm) based product which acts as an insecticide and miticide. It acts as an anti-feedant, insect growth regulator, and repellent against harmful insects like white flies, aphids, and mites.',
          benefits: ['Controls 200+ insect species', 'Triple action: repellent, anti-feedant, IGR', 'Zero residue on produce', 'Safe for beneficial insects'],
          contents: 'Neem Oil, Azadirachtin (1500 ppm)',
          application: 'Foliar application',
          dosage: '3-4 ml / Liter',
          crops: ['All Crops'],
          packSizes: ['1 Liter'],
          image: null
        },
        {
          id: 'bi-010',
          name: 'AT ORGO NEEM PLUS',
          slug: 'at-orgo-neem-plus',
          tagline: 'Azadirachtin (3000 ppm) based Insecticide',
          description: 'Concentrated Azadirachtin (3000 ppm) formulation. Repels harmful insects like thrips, mealybugs, and leafminers without harming beneficial ones.',
          benefits: ['High-potency Azadirachtin', 'Effective against thrips & white flies', 'Disrupts insect life cycle', 'IPM compatible'],
          contents: 'Neem Oil, Azadirachtin (3000 ppm)',
          application: 'Foliar application',
          dosage: '2-3 ml / Liter',
          crops: ['All Crops'],
          packSizes: ['1 Liter'],
          image: null
        },
        {
          id: 'bi-011',
          name: 'AT ORGO NEEM SUPER',
          slug: 'at-orgo-neem-super',
          tagline: 'Azadirachtin (10000 ppm) based Insecticide',
          description: 'Ultra-concentrated Azadirachtin (10000 ppm) for maximum protection. Acts as a powerful repellent and growth regulator for broad-spectrum pest management.',
          benefits: ['Maximum strength formulation', 'Low dosage requirement', 'Powerful repellent action', 'Premium eco-safe protection'],
          contents: 'Neem Oil, Azadirachtin (10000 ppm)',
          application: 'Foliar application',
          dosage: '0.5 ml / Liter',
          crops: ['All Crops'],
          packSizes: ['1 Liter'],
          image: null
        }
      ]
    },
    {
      id: 'biostimulants',
      name: 'Biostimulants',
      nameKey: 'products.categories.biostimulants.name',
      slug: 'biostimulants',
      description: 'Natural plant growth simulators and rhizosphere activators derived from organic sources for superior crop performance.',
      descriptionKey: 'products.categories.biostimulants.desc',
      icon: '✨',
      color: '#1565C0',
      productCount: 10,
      products: [
        {
          id: 'bs-001',
          name: 'AT ORGO DHARA MAXX',
          slug: 'at-orgo-dhara-maxx',
          tagline: 'Natural Plant Growth Simulator (Powder)',
          description: 'A natural plant growth simulator in powder form, derived from organic sources. It works as a powerful Rhizosphere activator to enhance soil biology and root health.',
          benefits: ['Rhizosphere activator', 'Improves soil structure', 'Enhances nutrient uptake', 'Derived from organic sources'],
          contents: 'Humic Acid, Fulvic Acid, Potassium hydroxide etc.',
          application: 'Soil application',
          dosage: '500 gm/Acre',
          crops: ['All Crops'],
          packSizes: ['500 gm', '1.0 Kg'],
          image: dharaMax
        },
        {
          id: 'bs-002',
          name: 'AT ORGO DHARA LITE',
          slug: 'at-orgo-dhara-lite',
          tagline: 'Natural Plant Growth Simulator (Liquid)',
          description: 'A natural plant growth simulator in liquid form, derived from organic sources. It works as a Rhizosphere activator for rapid soil and root rejuvenation.',
          benefits: ['Liquid rhizosphere activator', 'Quick nutrient absorption', 'Improves plant vigour', 'Sustainable organic source'],
          contents: 'Humic Acid, Fulvic Acid, etc.',
          application: 'Soil application',
          dosage: '500 ml/Acre',
          crops: ['All Crops'],
          packSizes: ['100 ml', '250 ml', '500 ml', '1.0 Lit'],
          image: dharaLite
        },
        {
          id: 'bs-003',
          name: 'AT ORGO FLORAL',
          slug: 'at-orgo-floral',
          tagline: 'Bumper Flowering Inducer',
          description: 'Natural plant growth simulator derived from organic sources. Contains long chain peptides and free amino acids to induce bumper flowering in agricultural and horticultural crops.',
          benefits: ['Induces heavy flowering', 'Reduces flower drop', 'Rich in peptides & amino acids', 'Boosts yield potential'],
          contents: 'Protein Hydrolysate, Seaweed Extract, etc.',
          application: 'Foliar application',
          dosage: '400 ml/Acre',
          crops: ['All Crops'],
          packSizes: ['250 ml', '500 ml', '1.0 Lit'],
          image: orgoFloral
        },
        {
          id: 'bs-004',
          name: 'AT ORGO FRUITAGE',
          slug: 'at-orgo-fruitage',
          tagline: 'Fruiting & Weight Multiplier',
          description: 'Contains Homobrassinolide to promote metabolic activities and induce bumper fruiting. Controls premature flower dropping and increases fruit setting significantly.',
          benefits: ['Induces bumper fruiting', 'Prevents flower/fruit drop', 'Increases fruit size & weight', 'Promotes metabolic activities'],
          contents: 'Homobrassinolide',
          application: 'Foliar application',
          dosage: '100 ml/Acre',
          crops: ['All Crops'],
          packSizes: ['100 ml', '250 ml'],
          image: orgoFruitage
        },
        {
          id: 'bs-005',
          name: 'AT ORGO ORCHAGROW',
          slug: 'at-orgo-orchagrow',
          tagline: 'Metabolic Activity Inducer',
          description: 'Specially formulated with protein hydrolysate, lignins, and vitamins to induce heavy flowering by promoting metabolic activities within the plant.',
          benefits: ['Promotes metabolic inductions', 'Ensures uniform flowering', 'Rich in vitamins & lignins', 'High-performance organic formula'],
          contents: 'Protein hydrolysate (Zea mays), Oxidised lignin, Insitol, Bronopol etc.',
          application: 'Foliar application',
          dosage: '500 ml/Acre',
          crops: ['All Crops'],
          packSizes: ['500 ml', '1.0 Lit'],
          image: orgoOrchagrow
        },
        {
          id: 'bs-006',
          name: 'AT ORGO ORCHABOOST',
          slug: 'at-orgo-orchaboost',
          tagline: 'Fruit Shine & Sweetness Agent',
          description: 'High concentration of free L-Amino Acids that works as a natural fruiting agent. Increases size, weight, shine, and sweetness of fruits.',
          benefits: ['Improves fruit shine & weight', 'Increases sweetness (Brix)', 'High L-Amino Acid content', 'Natural fruiting agent'],
          contents: 'Protein hydrolysate, Vitamins etc.',
          application: 'Foliar application',
          dosage: '600 ml/Acre',
          crops: ['All Crops'],
          packSizes: ['500 ml', '1.0 Lit'],
          image: orgoOrchaboost
        },
        {
          id: 'bs-007',
          name: 'AT ORGO MRUDAMRIT',
          slug: 'at-orgo-mrudamrit',
          tagline: 'Complete Plant Health Simulator',
          description: 'Provides essential macro and micro elements through the entire life cycle. Improves overall growth, health, and quality of plants.',
          benefits: ['Full life-cycle support', 'Provides macro & micro nutrients', 'Derived from soy & seaweed', 'Enhances plant immunity'],
          contents: 'Seaweed (Ascophyllum nodosum), Soy Protein Hydrolysate, Humic Acid',
          application: 'Soil application',
          dosage: '4 kg/Acre',
          crops: ['All Crops'],
          packSizes: ['4 kg'],
          image: orgoMrudamrit
        },
        {
          id: 'bs-008',
          name: 'AT ORGO SEAVITA',
          slug: 'at-orgo-seavita',
          tagline: 'Seaweed Extract Power',
          description: 'Based on Ascophyllum nodosum extract. Stimulates plant growth and improves the qualitative parameters of the produce.',
          benefits: ['Premium seaweed concentrate', 'Stimulates vegetative growth', 'Improves produce quality', 'Rich in natural vitamins'],
          contents: 'Seaweed Extract, Vitamins etc.',
          application: 'Soil application',
          dosage: '1 Liter/Acre',
          crops: ['All Crops'],
          packSizes: ['500 ml', '1.0 Lit'],
          image: orgoSeavita
        },
        {
          id: 'bs-009',
          name: 'AT ORGO HUMIVITA',
          slug: 'at-orgo-humivita',
          tagline: 'Natural Plant Growth Simulator (Humus-based)',
          description: 'A completely natural plant growth simulator, that is based on humus. It contains Humic acid as a major ingredient which increases overall growth and yield of the crop.',
          benefits: ['Increases overall growth', 'Enhances yield', 'Natural humus-based formula'],
          contents: 'Humic Acid, Fulvic Acid, Vitamins etc.',
          application: 'Soil application',
          dosage: '2 Liter/Acre',
          crops: ['All Crops'],
          packSizes: ['1 Liter', '5 Liter'],
          image: humivita
        },
        {
          id: 'bs-010',
          name: 'AT ORGO CARBPLUS',
          slug: 'at-orgo-carbplus',
          tagline: 'Natural Plant Growth Simulator (Humus-based)',
          description: 'A completely natural plant growth simulator, that is based on humus. It contains Humic acid as a major ingredient which increases overall growth and yield of the crop.',
          benefits: ['Increases overall growth', 'Enhances yield', 'Natural humus-based formula'],
          contents: 'Humic Acid, Fulvic Acid, Vitamins etc.',
          application: 'Soil application',
          dosage: '4 Liter/Acre',
          crops: ['All Crops'],
          packSizes: ['1 Liter', '5 Liter'],
          image: carbplus
        }
      ]
    },
    {
      id: 'bio-fertilizers',
      name: 'Bio Fertilizers',
      nameKey: 'products.categories.bio_fertilizers.name',
      slug: 'bio-fertilizers',
      description: 'High-potency microbial formulations for natural nitrogen fixation, phosphate solubilization, and potash mobilization.',
      descriptionKey: 'products.categories.bio_fertilizers.desc',
      icon: '🦠',
      color: '#2E7D32',
      productCount: 12,
      products: [
        {
          id: 'bf-001',
          name: 'AT ORGO NB',
          slug: 'at-orgo-nb',
          tagline: 'Nitrogen Fixing Bacteria (Azotobacter spp.)',
          description: 'High-potency Nitrogen Fixing Bacteria (Azotobacter spp.) that provides atmospheric nitrogen directly to plants.',
          benefits: ['Fixes atmospheric nitrogen', 'CFU minimum 2 x 10¹¹ cells/ml', 'Promotes plant growth', 'Reduces nitrogenous fertilizer cost'],
          microbes: 'Azotobacter spp. 2 x 10¹¹ CFU/ml',
          application: 'Soil application',
          dosage: '1 Liter/Acre',
          crops: ['All Crops'],
          packSizes: ['250 ml', '1 Liter'],
          image: orgoNb
        },
        {
          id: 'bf-002',
          name: 'AT ORGO PB',
          slug: 'at-orgo-pb',
          tagline: 'Phosphate Solubilizing Bacteria (Bacillus megaterium)',
          description: 'Contains Bacillus megaterium which solubilizes insoluble phosphate in the soil and makes it available to the plant.',
          benefits: ['Solubilizes fixed phosphorus', 'CFU minimum 2 x 10¹¹ cells/ml', 'Enhances root development', 'Improves crop yield'],
          microbes: 'Bacillus megaterium 2 x 10¹¹ CFU/ml',
          application: 'Soil application',
          dosage: '1 Liter/Acre',
          crops: ['All Crops'],
          packSizes: ['250 ml', '1 Liter'],
          image: orgoPb
        },
        {
          id: 'bf-003',
          name: 'AT ORGO KB',
          slug: 'at-orgo-kb',
          tagline: 'Potash Mobilizing Bacteria (Frateuria aurena)',
          description: 'Contains Frateuria aurena which mobilizes potash from the soil and provides it to the plant.',
          benefits: ['Mobilizes potash for better uptake', 'CFU minimum 2 x 10¹¹ cells/ml', 'Improves fruit size and quality', 'Increases drought resistance'],
          microbes: 'Frateuria aurena 2 x 10¹¹ CFU/ml',
          application: 'Soil application',
          dosage: '1 Liter/Acre',
          crops: ['All Crops'],
          packSizes: ['250 ml', '1 Liter'],
          image: null
        },
        {
          id: 'bf-004',
          name: 'AT ORGO ZB',
          slug: 'at-orgo-zb',
          tagline: 'Zinc Solubilising Bacteria (Pseudomonas Spp.)',
          description: 'Contains Pseudomonas Spp. which solubilizes zinc from the soil and makes it available to the plant.',
          benefits: ['Solubilizes fixed zinc in soil', 'CFU minimum 2 x 10¹¹ cells/ml', 'Corrects zinc deficiency', 'Enhances enzymatic activities'],
          microbes: 'Pseudomonas Spp. 2 x 10¹¹ CFU/ml',
          application: 'Soil application',
          dosage: '1 Liter/Acre',
          crops: ['All Crops'],
          packSizes: ['250 ml', '1 Liter'],
          image: orgoZb
        },
        {
          id: 'bf-005',
          name: 'AT ORGO MYCOROOT E (VAM)',
          slug: 'at-orgo-mycoroot-e',
          tagline: 'Vesicular Arbuscular Mycorrhiza',
          description: 'A symbiotic fungus that colonizes the root system, helping in nutrient transfer and improving water absorption.',
          benefits: ['Improves phosphorus & nutrient uptake', 'Minimum 1000 Spores per gram', 'Enhances root surface area', 'Better water absorption'],
          microbes: 'Mycorrhiza 1000 Spores/g',
          application: 'Soil application',
          dosage: '250 gram/Acre',
          crops: ['All Crops'],
          packSizes: ['100 gram', '250 gram'],
          image: null
        },
        {
          id: 'bf-006',
          name: 'AT ORGO PRO MAX',
          slug: 'at-orgo-pro-max',
          tagline: 'NPK Bio-Fertilizer Consortium',
          description: 'A powerful combination of Nitrogen Fixing, Phosphate Solubilizing, and Potash Mobilizing bacteria.',
          benefits: ['Complete NPK bio-solution', 'CFU minimum 2 x 10¹¹ cells/ml', 'Reduces chemical fertilizer dependency', 'Balanced microbial nutrition'],
          microbes: 'NB + PB + KB Consortium 2 x 10¹¹ CFU/ml',
          application: 'Soil application',
          dosage: '1 Liter/Acre',
          crops: ['All Crops'],
          packSizes: ['1 Liter', '5 Liter'],
          image: orgoProMax
        },
        {
          id: 'bf-007',
          name: 'AT ORGO ROBUSTA PRO-LDC KIT',
          slug: 'at-orgo-robusta-pro-ldc-kit',
          tagline: 'Nutritional Kit for Long Duration Crops',
          description: 'A comprehensive nutritional kit containing NB, PB, KB, ZB, and Mycorrhiza for long duration crops.',
          benefits: ['Full nutritional support', 'High microbial potency', 'Sustained growth', 'Contains 6L liquid + 500g powder'],
          contents: 'NB, PB, KB, ZB, Mycorrhiza',
          application: 'Soil application',
          dosage: '1 Kit/Acre',
          crops: ['Long Duration Crops'],
          packSizes: ['1 Kit (6.5 kg)'],
          image: orgoRobustaProLdc
        },
        {
          id: 'bf-008',
          name: 'AT ORGO ROBUSTA PRO-SDC KIT',
          slug: 'at-orgo-robusta-pro-sdc-kit',
          tagline: 'Nutritional Kit for Short Duration Crops',
          description: 'Specially formulated for short duration crops to ensure rapid growth and high productivity.',
          benefits: ['Rapid nutrient availability', 'Optimized for short cycles', 'Complete microbial coverage', 'Contains 1.5L liquid + 500g powder'],
          contents: 'NB, PB, KB, ZB, Mycorrhiza',
          application: 'Soil application',
          dosage: '1 Kit/Acre',
          crops: ['Short Duration Crops'],
          packSizes: ['1 Kit (2.0 kg)'],
          image: orgoRobustaProSdc
        },
        {
          id: 'bf-009',
          name: 'AT ORGO ROBUSTA PRO-AC KIT',
          slug: 'at-orgo-robusta-pro-ac-kit',
          tagline: 'Universal Nutritional Kit for All Crops',
          description: 'A versatile kit providing essential NP, PK, ZB, and Mycorrhiza for all types of crops.',
          benefits: ['Balanced nutrient profile', 'Universal application', 'Improves soil biology', 'Contains 1.5L liquid + 200g powder'],
          contents: 'NP Pro, PK Pro, ZB Pro, Mycorrhiza',
          application: 'Soil application',
          dosage: '1 Kit/Acre',
          crops: ['All Crops'],
          packSizes: ['1 Kit (1.7 kg)'],
          image: orgoRobustaProAc
        },
        {
          id: 'bf-010',
          name: 'AT ORGO ROBUSTA PRO-NC KIT',
          slug: 'at-orgo-robusta-pro-nc-kit',
          tagline: 'Water Soluble Carrier Based Kit',
          description: '100% water soluble carrier based nutritional kit containing Orgo Pro Max and Mycorrhiza.',
          benefits: ['100% water soluble', 'Carrier based formulation', 'High bioavailability', 'Easy to apply'],
          contents: 'Orgo Pro Max, Mycorrhiza',
          application: 'Soil application',
          dosage: '500 gm/Acre',
          crops: ['All Crops'],
          packSizes: ['500 gram'],
          image: orgoRobustaProNc
        },
        {
          id: 'bf-011',
          name: 'AT ORGO SHIELDER PRO',
          slug: 'at-orgo-shielder-pro',
          tagline: 'Zinc Solubilising Bacteria (Premium)',
          description: 'Premium Pseudomonas Spp. formulation with high cell count for effective zinc solubilization.',
          benefits: ['Premium zinc solubilizer', 'CFU minimum 2 x 10¹¹ cells/ml', 'Improves plant immunity', 'Robust growth support'],
          microbes: 'Pseudomonas Spp. 2 x 10¹¹ CFU/ml',
          application: 'Soil application',
          dosage: '1 Liter/Acre',
          crops: ['All Crops'],
          packSizes: ['250 ml', '1 Liter'],
          image: shielderPro
        },
        {
          id: 'bf-012',
          name: 'AT ORGO RESCUE PRO',
          slug: 'at-orgo-rescue-pro',
          tagline: 'Phosphate Solubilizing Bacteria (Premium)',
          description: 'High-performance Bacillus Spp. that rapidly solubilizes phosphate, helping crops recover from stress.',
          benefits: ['Rapid phosphate solubilization', 'CFU minimum 2 x 10¹¹ cells/ml', 'Stress recovery support', 'Improves nutritional status'],
          microbes: 'Bacillus Spp. 2 x 10¹¹ CFU/ml',
          application: 'Soil application',
          dosage: '1 Liter/Acre',
          crops: ['All Crops'],
          packSizes: ['250 ml', '1 Liter'],
          image: orgoRescuePro
        }
      ]
    },
    {
      id: 'organic-nutrients',
      name: 'Organic Nutrients',
      nameKey: 'products.categories.organic_nutrients.name',
      slug: 'organic-nutrients',
      description: 'OMRI-certified organic nutrient solutions for sustainable agriculture and premium produce.',
      descriptionKey: 'products.categories.organic_nutrients.desc',
      icon: '🍃',
      color: '#E65100',
      productCount: 3,
      products: [
        {
          id: 'on-003',
          name: 'AT ORGO BHUMIRICH',
          slug: 'at-orgo-bhumirich',
          tagline: 'Premium Organic Manure',
          description: 'A high-quality organic manure derived from cow dung and farmyard waste. Rich in essential macro and micronutrients needed for superior plant growth and health.',
          benefits: ['Rich in macro & micronutrients', 'Improves soil organic carbon', 'Derived from natural cow dung', 'Enhances plant vitality'],
          specifications: 'As per FCO 1985',
          application: 'Soil application',
          dosage: '200-250 kg/Acre',
          crops: ['All Crops'],
          packSizes: ['50 kg'],
          image: orgoBhumirich
        },
        {
          id: 'on-004',
          name: 'AT ORGO CROPCHARGE',
          slug: 'at-orgo-cropcharge',
          tagline: 'Bio-Enriched Organic Manure',
          description: 'Bio-enriched organic manure derived from cow dung and farmyard waste. Highly enriched with beneficial microbes and nutrients for robust crop performance.',
          benefits: ['Bio-enriched with beneficial microbes', 'Highly rich mineral profile', 'Promotes vigorous growth', 'Complete soil health solution'],
          specifications: 'As per FCO 1985',
          application: 'Soil application',
          dosage: '100-125 kg/Acre',
          crops: ['All Crops'],
          packSizes: ['25 kg'],
          image: orgoCropcharge
        },
        {
          id: 'on-005',
          name: 'AT ORGO FARMPHOS',
          slug: 'at-orgo-farmphos',
          tagline: 'Phosphate Rich Organic Manure (PROM)',
          description: 'A Phosphate-rich organic manure (PROM) produced by co-composting high-grade rock phosphate with organic matter. A premium alternative to chemical phosphatic fertilizers.',
          benefits: ['Value-added PROM technology', 'Co-composted rock phosphate', 'Sustainable phosphorus source', 'Improves nutrient uptake efficiency'],
          specifications: 'As per FCO 1985',
          application: 'Soil application',
          dosage: '50-100 kg/Acre',
          crops: ['All Crops'],
          packSizes: ['50 kg'],
          image: orgoFarmphos
        }
      ]
    },
    {
      id: 'micronutrients',
      name: 'Micronutrients',
      nameKey: 'products.categories.micronutrients.name',
      slug: 'micronutrients',
      description: 'Balanced mixture of essential micronutrients (Fe, Mn, Zn, Cu, B) for optimal plant health and high yields.',
      descriptionKey: 'products.categories.micronutrients.desc',
      icon: '💎',
      color: '#00838F',
      productCount: 6,
      products: [
        {
          id: 'mn-001',
          name: 'AT NUTRI MICROZEST',
          slug: 'at-nutri-microzest',
          tagline: 'Mix Micronutrient (Gujarat Grade-1)',
          description: 'A balanced mixture of micronutrients like Ferrous, Manganese, Zinc, Copper and Boron etc. It corrects micronutrient deficiencies and provides balanced nutrition to the plant.',
          benefits: ['Corrects multi-micronutrient deficiencies', 'Balanced nutrient delivery', 'Enhances crop yield & quality', 'High absorption formula'],
          contents: 'Fe, Mn, Zn, Cu, Bo',
          application: 'Foliar application',
          dosage: '1 Liter/Acre',
          crops: ['All Crops'],
          packSizes: ['1 Liter'],
          image: nutriMicrozest
        },
        {
          id: 'mn-002',
          name: 'AT NUTRI MICROZEN',
          slug: 'at-nutri-microzen',
          tagline: 'Mix Micronutrient (Gujarat Grade-2)',
          description: 'A specialized mixture of micronutrients (Gujarat Grade-2) including Fe, Mn, Zn, Cu, and Boron. Specifically recommended for Fe deficient crops.',
          benefits: ['Targets Iron (Fe) deficiency', 'Improves chlorophyll synthesis', 'Balanced micronutrient profile', 'Rapid foliar uptake'],
          contents: 'Fe, Mn, Zn, Cu, Bo',
          application: 'Foliar application',
          dosage: '1 Liter/Acre',
          crops: ['All Fe deficient Crops'],
          packSizes: ['1 Liter'],
          image: nutriMicrozen
        },
        {
          id: 'mn-003',
          name: 'AT NUTRI MICROFORCE-SP',
          slug: 'at-nutri-microforce-sp',
          tagline: 'Mix Micronutrient (Gujarat Grade-3) - Foliar',
          description: 'High-performance micronutrient mixture (Gujarat Grade-3). Specifically formulated to correct Zinc (Zn) deficiencies through foliar application.',
          benefits: ['Targets Zinc (Zn) deficiency', 'Boosts enzyme activities', 'Balanced mineral nutrition', 'High solubility & purity'],
          contents: 'Fe, Mn, Zn, Cu, Bo',
          application: 'Foliar application',
          dosage: '1 Liter/Acre',
          crops: ['All Zn deficient Crops'],
          packSizes: ['1 Liter', '5 Liter'],
          image: nutriMicroforce
        },
        {
          id: 'mn-004',
          name: 'AT NUTRI MICROBOOST-DF',
          slug: 'at-nutri-microboost-df',
          tagline: 'Mix Micronutrient (Gujarat Grade-3) - Soil',
          description: 'Soil-application micronutrient mixture (Gujarat Grade-3). Provides long-lasting Zinc and other essential minerals to the root zone.',
          benefits: ['Effective soil-based Zn correction', 'Long-term nutrient availability', 'Improves rhizosphere health', 'Optimal for Zn-deficient soils'],
          contents: 'Fe, Mn, Zn, Cu, Bo',
          application: 'Soil application',
          dosage: '2-2.5 Liter/Acre',
          crops: ['All Zn deficient Crops'],
          packSizes: ['1 Liter', '5 Liter'],
          image: nutriMicroboost
        },
        {
          id: 'mn-005',
          name: 'AT NUTRI MICROBOOST',
          slug: 'at-nutri-microboost',
          tagline: 'Mix Micronutrient (Gujarat Grade-4)',
          description: 'Comprehensive micronutrient mixture (Gujarat Grade-4) targeting both Iron (Fe) and Zinc (Zn) deficiencies.',
          benefits: ['Dual Fe & Zn deficiency correction', 'Complete micronutrient balance', 'Enhances vegetative growth', 'Premium grade minerals'],
          contents: 'Fe, Mn, Zn, Cu, Bo',
          application: 'Foliar application',
          dosage: '1 Liter/Acre',
          crops: ['All Fe and Zn deficient Crops'],
          packSizes: ['1 Liter', '5 Liter'],
          image: nutriMicroboost
        },
        {
          id: 'mn-006',
          name: 'AT NUTRI NUTRIVA',
          slug: 'at-nutri-nutriva',
          tagline: 'Mix Micronutrient (Gujarat Grade-5)',
          description: 'Granular/Powder micronutrient mixture (Gujarat Grade-5) for soil application. Provides a stable foundation for all crops.',
          benefits: ['Comprehensive soil foundation', 'Balanced Fe, Mn, Zn, Cu, Bo', 'Sustained mineral release', 'Suitable for all soil types'],
          contents: 'Fe, Mn, Zn, Cu, Bo',
          application: 'Soil application',
          dosage: '10 Kg/Acre',
          crops: ['All Crops'],
          packSizes: ['5 Kg', '10 Kg'],
          image: nutriNutriva
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
  phone: '+91 98251 42359',
  email: 'info@jayagritech.com',
  website: 'www.jayagritech.com',
  whatsapp: '+919825142359',

  stats: [
    { number: 60, suffix: '+', label: 'Products' },
    { number: 5, suffix: '', label: 'Product Categories' },
  ],

  vision: 'To become India\'s most trusted agri-biotech company, empowering every farmer with sustainable, science-backed solutions for a food-secure future.',
  mission: 'We develop and deliver innovative biological and organic agricultural inputs that enhance crop productivity, improve soil health, and promote sustainable farming practices — making advanced agri-technology accessible to every farmer.',

  values: [
    { title: 'Quality-driven manufacturing', description: 'Ensuring consistent performance and crop safety in every formulation we produce.', icon: 'Award' },
    { title: 'Innovation and research-focused development', description: 'Pushing the boundaries of agri-science with advanced biological R&D.', icon: 'Lightbulb' },
    { title: 'Strong customer relationships', description: 'Growing together with our farmers and partners through trust and shared success.', icon: 'Users' },
    { title: 'Ethical and transparent business practices', description: 'Maintaining integrity and honesty in every transaction and product claim.', icon: 'Shield' },
  ],

  leadership: [
    {
      id: 'director_1',
      name: 'Babulal Mehta',
      role: 'Managing Director',
      bio: 'With over 45 years of distinguished experience in the Asha Group and chemical industries, our Managing Director provides the visionary leadership and strategic wisdom that drives Jay Agritech\'s commitment to innovation and ethical growth.',
      image: director1
    },
    {
      id: 'jinesh_mehta',
      name: 'Jinesh Mehta',
      role: 'Director',
      bio: 'Bringing over 20 years of extensive experience in leadership and operational management within the Asha Group. Jinesh oversees strategic expansion and ensures the highest standards of excellence across all business verticals.',
      image: director2
    },
    {
      id: 'jayesh_patel',
      name: 'Jayesh Patel',
      role: 'Founder & CEO',
      bio: 'A visionary entrepreneur with deep roots in Gujarat\'s agricultural community. Jayesh founded Jay Agritech with a mission to bridge the gap between advanced biotechnology and practical farming solutions.',
      image: null
    },
    {
      id: 'priya_sharma',
      name: 'Dr. Priya Sharma',
      role: 'Head of R&D',
      bio: 'PhD in Agricultural Microbiology from IARI. Over 12 years of experience in developing biological crop protection and nutrition products.',
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
          { label: 'Company Overview', path: '/about#overview', description: 'Our story, vision & mission' },
          { label: 'Our Journey', path: '/about#journey', description: 'From founding to today' },
          { label: 'Vision & Mission', path: '/about#vision-mission', description: 'What drives us' },
          { label: 'Leadership Team', path: '/about#leadership', description: 'Meet our team' },
        ]
      },
      {
        title: 'Operations',
        links: [
          { label: 'Certifications', path: '/about#certifications', description: 'Quality standards & approvals' },
          { label: 'Milestones', path: '/about#journey', description: 'Key achievements' },
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
          { label: 'Solutions Overview', path: '/solutions#overview', description: 'Complete solution portfolio' },
          { label: 'Soil Health', path: '/solutions#soil-health', description: 'Restore & maintain soil vitality' },
          { label: 'Nutrient Management', path: '/solutions#nutrient-mgmt', description: 'Balanced crop nutrition' },
          { label: 'Pest & Disease', path: '/solutions#pest-disease', description: 'Biological crop protection' },
          { label: 'Growth Enhancement', path: '/solutions#growth', description: 'Maximize crop potential' },
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
          { label: 'Bio Insecticides', path: '/products/bio-insecticides', description: '11 products' },
          { label: 'Bio Fertilizers', path: '/products/bio-fertilizers', description: '12 products' },
          { label: 'Biostimulants', path: '/products/biostimulants', description: '10 products' },
          { label: 'Organic Nutrients', path: '/products/organic-nutrients', description: '3 products' },
          { label: 'Micronutrients', path: '/products/micronutrients', description: '6 products' },
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
          { label: 'Business Overview', path: '/business#overview', description: 'Partnership opportunities' },
          { label: 'Contract Manufacturing', path: '/business#contract-mfg', description: 'OEM & custom formulations' },
          { label: 'Research Services', path: '/business#research', description: 'R&D collaborations' },
          { label: 'White/Private Label', path: '/business#white-label', description: 'Your brand, our quality' },
          { label: 'Exports & Franchise', path: '/business#exports', description: 'Global opportunities' },
        ]
      }
    ]
  }
];
