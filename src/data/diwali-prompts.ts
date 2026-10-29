export interface DiwaliPromptItem {
  id: string;
  title: string;
  category: "instagram-dp" | "aesthetic-feed" | "stories-reels" | "business-corporate" | "pixar-illustrations";
  categoryLabel: string;
  aspectRatio: "1:1" | "4:5" | "9:16" | "16:9";
  bestTool: "Bing Image Creator" | "Ideogram" | "Midjourney" | "ChatGPT (DALL-E 3)";
  promptTemplate: string;
  placeholders: {
    key: string;
    label: string;
    defaultValue: string;
    description: string;
  }[];
  customizationGuide: string;
  modelTip: string;
  lighting: string;
  optics: string;
  keywords: string[];
}

export interface DiwaliCategoryMeta {
  id: "all" | "instagram-dp" | "aesthetic-feed" | "stories-reels" | "business-corporate" | "pixar-illustrations";
  label: string;
  description: string;
  aspectRatioBadge: string;
  iconName: string;
}

export const DIWALI_CATEGORIES: DiwaliCategoryMeta[] = [
  {
    id: "all",
    label: "All Prompts",
    description: "Browse the complete collection of 20+ verified Diwali AI prompts.",
    aspectRatioBadge: "All Ratios",
    iconName: "Sparkles",
  },
  {
    id: "instagram-dp",
    label: "Instagram DP & 3D Name Art",
    description: "1:1 profile pictures featuring customized 3D acrylic text, royal thrones, and glowing neon names.",
    aspectRatioBadge: "1:1 Square",
    iconName: "User",
  },
  {
    id: "aesthetic-feed",
    label: "Aesthetic Feed & Couple Portraits",
    description: "4:5 cinematic feed posts, regal couple portraits, and editorial Diwali photo shoots.",
    aspectRatioBadge: "4:5 Portrait",
    iconName: "Camera",
  },
  {
    id: "stories-reels",
    label: "Stories & WhatsApp Status",
    description: "9:16 vertical festive wallpapers with clean negative space for your text and quote overlays.",
    aspectRatioBadge: "9:16 Vertical",
    iconName: "Smartphone",
  },
  {
    id: "business-corporate",
    label: "Business & 3D Product Podiums",
    description: "High-converting festive sale banners, luxury 3D product display podiums, and executive LinkedIn posts.",
    aspectRatioBadge: "1:1 & 16:9",
    iconName: "ShoppingBag",
  },
  {
    id: "pixar-illustrations",
    label: "3D Pixar Festive Illustrations",
    description: "Heartwarming 3D animated character art, claymorphic deities, and joyful festive family moments.",
    aspectRatioBadge: "1:1 & 4:5",
    iconName: "Palette",
  },
];

export const DIWALI_PROMPTS: DiwaliPromptItem[] = [
  // ── CATEGORY 1: Instagram DP & 3D Name Art (1:1) ──
  {
    id: "diwali-3d-name-royal-throne",
    title: "Happy Diwali 3D AI Image Prompt With Name - Royal Golden Throne & Glowing Diya",
    category: "instagram-dp",
    categoryLabel: "Instagram DP & 3D Name Art",
    aspectRatio: "1:1",
    bestTool: "Bing Image Creator",
    promptTemplate:
      "A realistic 3D digital illustration for Happy Diwali profile picture. A handsome [YOUR AGE]-year-old Indian boy sitting stylishly on an ornate royal golden throne chair. He is dressed in an elegant [OUTFIT COLOR] embroidered silk sherwani with golden mojari shoes. He is holding a beautifully decorated clay diya with a gentle golden flame in his palm. Behind the throne, large glowing 3D acrylic typography illuminated in golden neon lights spells the name \"[YOUR NAME]\". The dark background is decorated with blooming marigold garlands, hanging lanterns, and subtle floating firecracker bokeh. Ultra-detailed, 8k resolution, cinematic warm studio lighting, octane render, trending on ArtStation --ar 1:1",
    placeholders: [
      { key: "[YOUR NAME]", label: "Your Name", defaultValue: "Aarav", description: "The name to render in glowing 3D acrylic lettering" },
      { key: "[YOUR AGE]", label: "Age", defaultValue: "22", description: "Age of the character" },
      { key: "[OUTFIT COLOR]", label: "Outfit Color", defaultValue: "deep emerald green", description: "Color of the festive sherwani or kurta" },
    ],
    customizationGuide:
      "For crystal-clear name typography on Bing Image Creator, keep your name within quotation marks. If you want a casual look, replace 'royal golden throne' with 'sleek marble bench with sneakers'.",
    modelTip:
      "Bing Image Creator (Copilot) renders 3D acrylic nameplates accurately. If text appears misspelled, regenerate once or twice with exact capitalization.",
    lighting: "Warm golden directional spotlight with soft rim backlighting",
    optics: "50mm prime portrait lens, f/1.8 shallow depth of field",
    keywords: ["Happy Diwali 3D AI image prompt with name", "Diwali AI photo editing prompt", "Diwali 3D name art DP"],
  },
  {
    id: "diwali-3d-name-girl-lehenga",
    title: "Happy Diwali 3D AI Image Prompt With Name - Girl with Sparkler & Neon Nameplate",
    category: "instagram-dp",
    categoryLabel: "Instagram DP & 3D Name Art",
    aspectRatio: "1:1",
    bestTool: "Bing Image Creator",
    promptTemplate:
      "A stunning 3D festive digital avatar of a graceful [YOUR AGE]-year-old Indian girl celebrating Happy Diwali. She is wearing a glamorous [OUTFIT COLOR] mirror-work lehenga choli with traditional gold jhumkas and delicate maang tikka. She is playfully holding a sparkling golden phooljhadi sparkler that emits delicate glowing sparks. Floating behind her is a giant vibrant 3D rose-gold and yellow illuminated neon nameplate clearly spelling \"[YOUR NAME]\". The courtyard floor has an intricate glowing rangoli with clay oil lamps. Warm cinematic festival lighting, octane 3D render, photorealistic facial features, 8k resolution --ar 1:1",
    placeholders: [
      { key: "[YOUR NAME]", label: "Your Name", defaultValue: "Ananya", description: "Name to be written on the neon 3D plate" },
      { key: "[YOUR AGE]", label: "Age", defaultValue: "21", description: "Character age" },
      { key: "[OUTFIT COLOR]", label: "Lehenga Color", defaultValue: "crimson red and gold", description: "Color palette of the ethnic wear" },
    ],
    customizationGuide:
      "Switch the lehenga color to pastel pink or royal blue to match your personal aesthetic. You can also replace 'sparkler' with 'brass thali of sweets' for a traditional pose.",
    modelTip:
      "Ideogram 2.0 and Bing Image Creator excel at rendering the glowing script typography cleanly without warped letters.",
    lighting: "Intimate sparkler illumination with festive atmospheric night glow",
    optics: "85mm portrait telephoto, soft bokeh background",
    keywords: ["Happy Diwali 3D AI image prompt with name", "Diwali girl 3D AI photo prompt", "Diwali DP prompt for Instagram"],
  },
  {
    id: "diwali-cyberpunk-neon-name-dp",
    title: "Cyberpunk Futuristic Diwali 3D Name Art DP with Glass Pedestal & Laser Rangoli",
    category: "instagram-dp",
    categoryLabel: "Instagram DP & 3D Name Art",
    aspectRatio: "1:1",
    bestTool: "Ideogram",
    promptTemplate:
      "A futuristic neo-Delhi cyberpunk Diwali profile avatar. A stylish young person wearing high-tech streetwear blended with an ethnic metallic kurta and cybernetic glasses. Standing in front of a giant holographic neon sign glowing in electric saffron and cyan that spells \"[YOUR NAME]\". Beneath their feet is a glowing holographic laser rangoli pattern projected onto a polished dark obsidian floor. A levitating glass diya burns with a futuristic plasma flame. Cinematic volumetric fog, neon reflections, ray-traced lighting, Unreal Engine 5 render, sharp focus --ar 1:1",
    placeholders: [
      { key: "[YOUR NAME]", label: "Your Name", defaultValue: "Vikram", description: "Holographic cyberpunk neon name" },
    ],
    customizationGuide:
      "Adjust the color scheme to 'ultraviolet purple and liquid gold' for a high-contrast gamer or tech creator profile picture.",
    modelTip:
      "Ideogram 2.0 excels at rendering complex holographic and futuristic typography with 100% typographic coherence.",
    lighting: "Dual-tone cyberpunk neon (electric saffron + cyan laser)",
    optics: "35mm anamorphic wide portrait, streak lens flare",
    keywords: ["Diwali AI photo editing prompt", "Cyberpunk Diwali AI prompt", "3D name art DP"],
  },
  {
    id: "diwali-cute-chibi-3d-name-dp",
    title: "Cute 3D Chibi Boy/Girl in Kurta Holding Phooljhadi with 3D Acrylic Name",
    category: "instagram-dp",
    categoryLabel: "Instagram DP & 3D Name Art",
    aspectRatio: "1:1",
    bestTool: "Bing Image Creator",
    promptTemplate:
      "An adorable 3D chibi-style avatar of a cute [GENDER] character celebrating Diwali. Wearing an oversized festive silk kurta with golden borders and cute little mojaris. The character has large expressive sparkling eyes and a cheerful smile, holding a tiny bright sparkler. In the background, bold pastel 3D puffy acrylic typography says \"[YOUR NAME]\" with cute golden stars and mini clay diyas resting on top of the letters. Soft studio lighting, clay render aesthetic, miniature tilt-shift photography, warm cheerful festival vibes --ar 1:1",
    placeholders: [
      { key: "[YOUR NAME]", label: "Your Name", defaultValue: "Kabir", description: "Name on puffy 3D letters" },
      { key: "[GENDER]", label: "Gender", defaultValue: "boy", description: "Boy or Girl character" },
    ],
    customizationGuide:
      "Replace 'boy' with 'girl with cute braided hair with jasmine flowers' to generate an adorable female chibi avatar.",
    modelTip:
      "Bing Image Creator renders puffy vinyl toy and chibi styles with exceptional softness and vibrant festive colors.",
    lighting: "Warm diffused softbox lighting with specular highlights on eyes",
    optics: "Tilt-shift macro lens, miniature depth effect",
    keywords: ["Diwali 3D AI image prompt with name", "Chibi Diwali avatar prompt", "Diwali profile picture AI"],
  },

  // ── CATEGORY 2: Instagram Aesthetic Feed Posts & Couple Portraits (4:5) ──
  {
    id: "diwali-aesthetic-couple-courtyard",
    title: "Cinematic Diwali Instagram Post AI Prompt - Romantic Couple Lighting Diyas in Heritage Haveli",
    category: "aesthetic-feed",
    categoryLabel: "Aesthetic Feed & Couple Portraits",
    aspectRatio: "4:5",
    bestTool: "Midjourney",
    promptTemplate:
      "An authentic, cinematic editorial photograph of an affectionate young Indian couple celebrating Diwali in the open courtyard of an ancient Rajasthani heritage palace. The man is wearing a bespoke raw silk bandhgala jacket in [MAN OUTFIT COLOR], and the woman is wearing a handwoven Banarasi saree in [WOMAN OUTFIT COLOR] with vintage temple jewelry. Together, their hands gently place an earthen terracotta diya onto a grand water pond filled with floating lotus flowers and thousands of flickering candles. Intricate stone arches, hanging marigold festoons, soft warm candlelight illuminating their smiling faces. Golden hour transitioning into blue hour, shot on 35mm film, subtle film grain, Hasselblad H6D-100c --ar 4:5 --v 6.1 --style raw",
    placeholders: [
      { key: "[MAN OUTFIT COLOR]", label: "Man's Outfit Color", defaultValue: "midnight navy blue with antique gold buttons", description: "Jacket or sherwani shade" },
      { key: "[WOMAN OUTFIT COLOR]", label: "Woman's Saree Color", defaultValue: "deep mustard gold and vermilion red", description: "Saree or lehenga shade" },
    ],
    customizationGuide:
      "Change the location from 'Rajasthani heritage palace' to 'contemporary luxury Mumbai high-rise balcony overlooking fireworks' for a modern aesthetic.",
    modelTip:
      "Midjourney v6.1 with '--style raw' produces human skin textures, realistic fabric weaves, and natural candle warmth without looking artificial.",
    lighting: "Atmospheric candlelight glow contrasting against twilight blue hour",
    optics: "Hasselblad 80mm f/2.2, documentary editorial framing",
    keywords: ["Diwali Instagram post AI prompt", "Diwali AI photo editing prompt", "Diwali couple photoshoot prompt"],
  },
  {
    id: "diwali-editorial-woman-thali",
    title: "Editorial Diwali Instagram Post AI Prompt - Traditional Indian Woman with Brass Diya Thali",
    category: "aesthetic-feed",
    categoryLabel: "Aesthetic Feed & Couple Portraits",
    aspectRatio: "4:5",
    bestTool: "Midjourney",
    promptTemplate:
      "High-fashion editorial portrait of an Indian woman holding an antique engraved brass pooja thali brimming with fresh orange marigold blossoms and five burning clay diyas. She is draped in an opulent [OUTFIT COLOR] Kanjeevaram silk saree with real zari borders. Elegant minimal makeup, kajal rimmed eyes reflecting the warm diya flames, delicate gold jhumkas. The background features hand-carved wooden jharokha windows softly blurred with festive fairy light bokeh. Natural skin texture, authentic cultural details, Vogue India fashion magazine aesthetic, dramatic chiaroscuro lighting, photorealistic 8k --ar 4:5 --v 6.1",
    placeholders: [
      { key: "[OUTFIT COLOR]", label: "Saree Color", defaultValue: "deep emerald green and ruby red", description: "Silk saree color theme" },
    ],
    customizationGuide:
      "Add 'holding a brass diya at eye level' or 'looking down peacefully at the thali with a subtle serene smile' to control the emotional mood of the post.",
    modelTip:
      "In Midjourney, add '--c 5' (chaos) to get 4 uniquely styled photo poses, and '--s 250' for heightened painterly realism.",
    lighting: "Chiaroscuro flame lighting with deep ambient shadows",
    optics: "Canon EF 85mm f/1.4L IS USM, eye-tracking precision",
    keywords: ["Diwali Instagram post AI prompt", "Diwali AI photo editing prompt", "Aesthetic Diwali photography prompt"],
  },
  {
    id: "diwali-family-terrace-fireworks",
    title: "Festive Family Portrait Celebrating Diwali Terrace Fireworks with Warm Ambient Glow",
    category: "aesthetic-feed",
    categoryLabel: "Aesthetic Feed & Couple Portraits",
    aspectRatio: "4:5",
    bestTool: "ChatGPT (DALL-E 3)",
    promptTemplate:
      "A heartwarming festive candid family photograph on a decorated rooftop terrace during Diwali night. Three generations of an Indian family: grandparents, parents, and two energetic children laughing together. Wearing colorful traditional festive clothes in jewel tones of saffron, magenta, and gold. The children are safely holding small sparklers creating golden trails in the air. The terrace parapet is lined with glowing earthen diyas. In the deep navy night sky behind them, tasteful golden fireworks explode in soft bokeh bursts. Authentic happiness, warm family togetherness, cinematic lighting, 8k resolution photo --ar 4:5",
    placeholders: [],
    customizationGuide:
      "You can add specific family details like 'with their golden retriever wearing a playful festive marigold bandana' for an extra viral Instagram carousel slide.",
    modelTip:
      "ChatGPT (DALL-E 3) captures natural family interactions and expressive facial warmth without awkward distortions.",
    lighting: "Warm terrace ambient fairy lights with explosive golden firework rim highlights",
    optics: "Sony A7R V with 50mm f/1.2 GM, natural perspective",
    keywords: ["Diwali Instagram post AI prompt", "Diwali family AI photo prompt", "Diwali terrace photo editing prompt"],
  },
  {
    id: "diwali-minimalist-rangoli-flatlay",
    title: "Modern Minimalist Aesthetic Rangoli & Terracotta Lamps Flatlay for Instagram Grid",
    category: "aesthetic-feed",
    categoryLabel: "Aesthetic Feed & Couple Portraits",
    aspectRatio: "4:5",
    bestTool: "Midjourney",
    promptTemplate:
      "A top-down 90-degree flatlay aesthetic photograph of a geometric minimalist Diwali floral rangoli on smooth charcoal slate stone tiles. Created using dried organic marigold petals, delicate jasmine blossoms, and crushed rice flour in clean symmetrical patterns. Four hand-crafted unglazed terracotta diyas with pure ghee and glowing cotton wicks are placed symmetrically around the central motif. A single vintage brass bell and whole cinnamon sticks add artisanal texture. Soft diffused morning window light mixed with gentle flickering diya glow, Kinfolk magazine minimalism, hyper-clean composition --ar 4:5 --v 6.1",
    placeholders: [],
    customizationGuide:
      "Swap 'charcoal slate stone' for 'white Italian marble floor' or 'rustic wooden plank surface' to align with your personal Instagram feed theme.",
    modelTip:
      "Use Midjourney with '--stylize 100' to preserve geometric symmetry in flatlays without warping flower petals.",
    lighting: "Overhead diffused natural daylight complemented by warm flame accents",
    optics: "Overhead 50mm macro flatlay, f/4 aperture for edge-to-edge sharpness",
    keywords: ["Diwali Instagram post AI prompt", "Diwali rangoli flatlay prompt", "Minimalist Diwali aesthetic photo"],
  },

  // ── CATEGORY 3: Instagram Stories, Reels & WhatsApp Status Backgrounds (9:16) ──
  {
    id: "diwali-story-floating-diyas-empty-space",
    title: "9:16 Diwali Story Background Prompt - Floating Diyas on Dark Water with Empty Copy Space",
    category: "stories-reels",
    categoryLabel: "Stories & WhatsApp Status",
    aspectRatio: "9:16",
    bestTool: "Midjourney",
    promptTemplate:
      "A vertical 9:16 cinematic festive wallpaper for Instagram Story and WhatsApp Status. The bottom third features dark sacred river water reflecting hundreds of small earthen diyas and orange marigold petals gently floating downstream. The upper two-thirds is a clean, dark moody midnight-blue sky with faint ethereal golden dust particles and distant golden firework sparkles, intentionally completely empty and clean with negative space for text and typography overlay. Highly atmospheric, serene spiritual atmosphere, 8k resolution, cinematic color grading, shot on ARRI Alexa Mini --ar 9:16 --v 6.1 --no text, font, typography, letters, words",
    placeholders: [],
    customizationGuide:
      "The key to this prompt is the upper empty space: keep the negative prompt '--no text' so the AI creates pristine blank room for your custom Diwali greeting stickers, quotes, or poll widgets.",
    modelTip:
      "Midjourney handles negative constraints like '--no text, letters' flawlessly to guarantee a pristine blank zone for graphic design in Canva or Instagram.",
    lighting: "Low-key candlelight illumination on water with deep dark sky gradient",
    optics: "24mm wide angle vertical composition, f/2.8 deep focus",
    keywords: ["9:16 Diwali story background prompt", "Diwali Instagram story background prompt", "Diwali WhatsApp status wallpaper prompt"],
  },
  {
    id: "diwali-status-golden-rangoli-border",
    title: "9:16 Festive WhatsApp Status Background - Golden Rangoli Border & Hanging Toran with Centered Copy Space",
    category: "stories-reels",
    categoryLabel: "Stories & WhatsApp Status",
    aspectRatio: "9:16",
    bestTool: "Ideogram",
    promptTemplate:
      "A vertical 9:16 luxury Diwali background graphic for WhatsApp status and Reels. Top border has beautifully illustrated hanging mango leaves, fresh marigold torans, and delicate brass hanging bells with golden tassels. Bottom border has a semicircular intricate golden mandala rangoli with glowing oil lamps. The vast middle area is a smooth, clean textured deep maroon and royal gold gradient background with plenty of blank empty space, ideal for writing Diwali wishes and business messages. Elegant festive border design, luxury Indian motif, vector 3D hybrid look, 8k --ar 9:16 --no text",
    placeholders: [],
    customizationGuide:
      "Change 'deep maroon and royal gold' to 'navy blue and champagne gold' or 'emerald green' to match your company's corporate branding colors.",
    modelTip:
      "Ideogram 2.0 generates ornate symmetrical borders with razor-sharp geometric precision and zero blurred artifacts.",
    lighting: "Warm overhead ambient spotlight creating a clean vignette in the center",
    optics: "Graphic architectural rendering, centered framing with negative space",
    keywords: ["9:16 Diwali story background prompt", "Diwali WhatsApp status background prompt", "Diwali empty space story prompt"],
  },
  {
    id: "diwali-story-sparkler-bokeh-night",
    title: "Vertical Cinematic Sparkler Bokeh Reel Background with Blank Upper Half for Reels Quotes",
    category: "stories-reels",
    categoryLabel: "Stories & WhatsApp Status",
    aspectRatio: "9:16",
    bestTool: "Midjourney",
    promptTemplate:
      "A vertical 9:16 cinematic aesthetic background for Instagram Reels. At the bottom of the frame, soft focus hands in traditional gold bangles hold a sparkling golden Diwali firecracker, creating cascading glittering sparks and round amber bokeh circles. The top 60% of the vertical frame is deep rich nocturnal darkness with very faint, subtle golden bokeh orbs and ample empty negative space to overlay animated song lyrics and quotes. Dreamy romantic festive mood, cinema aesthetic, Leica SL2 50mm Summilux --ar 9:16 --v 6.1 --no text, watermarks",
    placeholders: [],
    customizationGuide:
      "Use this background for Reels video overlays in CapCut, InShot, or Premiere Pro by setting the blend mode to screen or placing white Hindi/English text in the upper zone.",
    modelTip:
      "Midjourney's optical bokeh simulation creates luscious circular light balls that elevate any Reel or Story cover.",
    lighting: "Intense micro-sparkler light trails with ultra-soft bokeh balls",
    optics: "50mm f/1.4 Summilux, shallow focus on foreground sparks",
    keywords: ["9:16 Diwali story background prompt", "Diwali Reels background prompt", "Diwali sparkler bokeh photo editing prompt"],
  },
  {
    id: "diwali-story-palace-terrace-night",
    title: "Ethereal Night Sky Fireworks & Glowing Oil Lamps Vertical 9:16 Story Template",
    category: "stories-reels",
    categoryLabel: "Stories & WhatsApp Status",
    aspectRatio: "9:16",
    bestTool: "Bing Image Creator",
    promptTemplate:
      "Vertical 9:16 wallpaper of an Indian palace balcony at night on Diwali. The carved stone balustrade in the lower portion holds a row of lit terracotta diyas casting warm amber reflections. The night sky above spans the rest of the image, dark navy blue with soft golden fireworks shimmering in the distance. Abundant blank space in the upper and middle sections for adding customized festive greetings and stickers. Highly detailed, festive celebration mood, 8k render --ar 9:16",
    placeholders: [],
    customizationGuide:
      "Ask for 'soft purple twilight sky' instead of 'dark navy blue' for a contemporary pastel aesthetic popular on Pinterest and Instagram Stories.",
    modelTip:
      "Bing Image Creator creates vertical 9:16 format when you specify 'vertical 9:16 smartphone wallpaper' at the beginning of the prompt.",
    lighting: "Warm ground-level diya glow contrasting with atmospheric distant sky flashes",
    optics: "Wide vertical lens, perspective looking upwards into clear sky",
    keywords: ["9:16 Diwali story background prompt", "Diwali wallpaper 9:16 AI prompt", "Diwali story template AI prompt"],
  },

  // ── CATEGORY 4: Business Sale Banners, 3D Product Podiums & Corporate LinkedIn Wishes ──
  {
    id: "diwali-3d-product-podium-marble",
    title: "3D Product Podium Diwali Sale Prompt - Luxury Marble Pedestal with Golden Lamps & Marigold Accents",
    category: "business-corporate",
    categoryLabel: "Business & 3D Product Podiums",
    aspectRatio: "1:1",
    bestTool: "Midjourney",
    promptTemplate:
      "Commercial product photography mockup for a luxury Diwali festival sale. A pristine cylindrical white Carrara marble product display podium in the center, designed to showcase [PRODUCT TYPE]. The podium is elegantly adorned with delicate cascading 24k gold leaf accents and fresh orange marigold petals around the base. Flanking the pedestal are two traditional polished brass hanging lamps (kuthu vilakku) with soft burning flames. In the soft-focus background, warm festive fairy light bokeh and subtle floating golden sparkle dust. High-end commercial studio lighting, ray-traced reflections on marble surface, Octane 3D render, ultra-sharp 8k resolution --ar 1:1 --v 6.1",
    placeholders: [
      { key: "[PRODUCT TYPE]", label: "Product Type", defaultValue: "luxury perfume bottle / skin care jar / jewelry box", description: "The product you plan to showcase on the podium" },
    ],
    customizationGuide:
      "You can place your actual product image onto the empty podium using Photoshop or Canva, or let Midjourney generate the product directly by replacing [PRODUCT TYPE] with your specific SKU.",
    modelTip:
      "Midjourney v6.1 renders hyper-realistic marble caustics, soft shadow gradients, and metallic brass reflections for professional e-commerce product ads.",
    lighting: "Three-point commercial studio lighting with gold bounce reflector",
    optics: "100mm macro lens, f/5.6 for sharp product details and creamy background",
    keywords: ["3D product podium Diwali sale prompt", "Diwali product photoshoot AI prompt", "Diwali e-commerce banner prompt"],
  },
  {
    id: "diwali-corporate-linkedin-workspace",
    title: "Corporate Diwali LinkedIn Post Prompt - Modern Minimalist Tech Workspace with Festive Diyas & Warm Glow",
    category: "business-corporate",
    categoryLabel: "Business & 3D Product Podiums",
    aspectRatio: "16:9",
    bestTool: "Midjourney",
    promptTemplate:
      "A tasteful, sophisticated corporate Diwali greeting photo for LinkedIn. A modern high-end architectural corporate office with sleek glass partitions, potted indoor monstera plants, and ergonomic wooden desks. On the central executive boardroom table, a sophisticated brass tray holds five artisan brass oil lamps glowing warmly alongside a discreet box of premium gourmet dry fruits. In the blurred background, large floor-to-ceiling windows overlook a vibrant city skyline illuminated by distant celebration fireworks. Natural balanced office lighting mixed with warm festive candlelight, professional corporate atmosphere, clean and inspiring, Hasselblad medium format --ar 16:9 --v 6.1",
    placeholders: [],
    customizationGuide:
      "Ideal for B2B tech companies, VC firms, and consulting agencies. You can overlay your corporate logo and 'Happy Diwali from [BRAND NAME]' in the clean left-hand side of the 16:9 banner.",
    modelTip:
      "Midjourney captures professional corporate interiors without making them look overly festive or cluttered.",
    lighting: "Balanced 4500K architectural ambient light with warm 2700K candle accents",
    optics: "Wide 28mm architectural lens with corrected vertical lines",
    keywords: ["corporate Diwali LinkedIn post prompt", "Diwali AI photo editing prompt", "Corporate Diwali wishes AI banner"],
  },
  {
    id: "diwali-sale-banner-floating-gifts",
    title: "Festive E-commerce Grand Diwali Dhamaka Sale Banner with 3D Floating Gift Boxes & Gold Coins",
    category: "business-corporate",
    categoryLabel: "Business & 3D Product Podiums",
    aspectRatio: "16:9",
    bestTool: "Ideogram",
    promptTemplate:
      "A dynamic 3D promotional advertising banner for \"[BRAND NAME] Mega Diwali Sale Up to [SALE DISCOUNT]% Off\". Center stage features glossy red and royal gold gift boxes tied with metallic silk ribbons bursting open with shining 3D gold coins, glowing diyas, and festive sparkles floating around. On the side, bold metallic 3D typography reads \"DIWALI DHAMAKA SALE\". Vibrant royal purple and gold festive gradient background with geometric mandala motifs. Commercial e-commerce advertising graphics, high conversion creative, 8k render, Unreal Engine 5 aesthetic --ar 16:9",
    placeholders: [
      { key: "[BRAND NAME]", label: "Brand Name", defaultValue: "AURA", description: "Company or store brand name" },
      { key: "[SALE DISCOUNT]", label: "Discount %", defaultValue: "60", description: "Discount percentage offer" },
    ],
    customizationGuide:
      "Great for Google Performance Max, Facebook Ads, and website homepage hero banners. Swap 'royal purple' with your brand's primary accent color.",
    modelTip:
      "Ideogram 2.0 renders promotional discount text, percentages, and brand names with zero typographical gibberish.",
    lighting: "High-energy commercial key lighting with intense gold specular highlights",
    optics: "Dynamic 3D perspective with floating elements creating depth of field",
    keywords: ["3D product podium Diwali sale prompt", "Diwali sale banner AI prompt", "Diwali offer ad graphic prompt"],
  },
  {
    id: "diwali-luxury-cosmetics-podium",
    title: "Luxury Jewelry & Cosmetics Floating Water Podium with Traditional Gold Leaf Elements",
    category: "business-corporate",
    categoryLabel: "Business & 3D Product Podiums",
    aspectRatio: "1:1",
    bestTool: "Midjourney",
    promptTemplate:
      "High-end luxury commercial advertisement set for Indian jewelry and skincare. A circular gold-rimmed terrazzo platform elevated 2 inches above calm reflective water. Fresh saffron threads and individual jasmine petals float on the water surface. Surrounding the podium are slender golden brass rods holding miniature flickering oil wicks. The background is a soft beige linen curtain catching golden afternoon sunbeams. Premium cosmetic brand campaign aesthetic, serene elegance, ultra-detailed textures, photorealistic 8k --ar 1:1 --v 6.1",
    placeholders: [],
    customizationGuide:
      "This provides a clutter-free, luxurious backdrop tailored specifically for beauty, skincare, perfume, and fine jewelry brands during the festive season.",
    modelTip:
      "Midjourney's ray-tracing engines handle water caustics, soft shadows, and precious gold metallic reflections with unmatched photorealism.",
    lighting: "Soft golden hour side-lighting filtered through linen fabric",
    optics: "90mm macro lens with f/4 aperture",
    keywords: ["3D product podium Diwali sale prompt", "Diwali cosmetic mockup AI prompt", "Luxury jewelry Diwali photoshoot prompt"],
  },

  // ── CATEGORY 5: 3D Pixar-style Festive Illustrations ──
  {
    id: "diwali-pixar-siblings-rangoli",
    title: "3D Pixar-Style Cute Indian Siblings Making Rangoli with Friendly Dog Wearing Marigold Collar",
    category: "pixar-illustrations",
    categoryLabel: "3D Pixar Festive Illustrations",
    aspectRatio: "1:1",
    bestTool: "Bing Image Creator",
    promptTemplate:
      "A heartwarming 3D animated illustration in Pixar and Disney animation studio style celebrating Diwali. A cute 8-year-old Indian boy in a miniature yellow kurta and his cheerful 6-year-old sister with hair buns in an orange lehenga are sitting cross-legged on the floor, happily drawing an intricate colorful peacock rangoli with dry colored powders. Next to them sits an adorable fluffy golden retriever dog happily wagging its tail, wearing a festive orange marigold flower collar. Little clay diyas glow warmly around the room. Expressive animated faces, joyful emotions, soft warm lighting, subsurface scattering on skin, Disney Pixar feature film quality render, 8k --ar 1:1",
    placeholders: [],
    customizationGuide:
      "You can customize the pets or characters, e.g., 'with a curious cute Persian cat watching a glowing diya' or change sibling ages to suit your family.",
    modelTip:
      "Bing Image Creator and ChatGPT DALL-E 3 both possess immense training on classic 3D animated movie character modeling and warm storytelling lighting.",
    lighting: "Warm emotional key lighting with friendly volumetric room glow",
    optics: "Animated 35mm focal length, character-centric eye-level framing",
    keywords: ["3D Pixar style Diwali AI prompt", "Diwali AI photo editing prompt", "Cute animated Diwali illustration prompt"],
  },
  {
    id: "diwali-pixar-ganesha-lakshmi-claymorphic",
    title: "Charming Pixar-Style Lord Ganesha & Goddess Lakshmi Claymorphic 3D Festive Blessing Scene",
    category: "pixar-illustrations",
    categoryLabel: "3D Pixar Festive Illustrations",
    aspectRatio: "1:1",
    bestTool: "ChatGPT (DALL-E 3)",
    promptTemplate:
      "A cute, respectful 3D animated character illustration in Pixar animation style of little baby Lord Ganesha and baby Goddess Lakshmi sitting happily together on a large pink lotus flower for Diwali. Baby Ganesha is cheerfully holding a golden motichoor laddu in his trunk, wearing a tiny jeweled crown. Baby Lakshmi is smiling sweetly with golden coins gently showering from her little hands into a clay pot. Soft glowing diyas float around them with golden sparkles. High-end claymorphic 3D rendering, vibrant cheerful colors, soft smooth textures, Disney Pixar 3D movie aesthetic, high resolution --ar 1:1",
    placeholders: [],
    customizationGuide:
      "Perfect for sending affectionate WhatsApp morning greetings and family group blessings. The soft claymorphic style looks universally friendly and artistic.",
    modelTip:
      "ChatGPT DALL-E 3 renders sacred symbols and cultural icons respectfully with charming animated nuances.",
    lighting: "Divine golden back-glow with soft rim lighting on lotus petals",
    optics: "Center-focused animated cinematic frame",
    keywords: ["3D Pixar style Diwali AI prompt", "Cute Ganesha Lakshmi Diwali 3D prompt", "Diwali WhatsApp sticker prompt"],
  },
  {
    id: "diwali-pixar-kids-sparklers-village",
    title: "Joyful Indian Kids Bursting Eco-Friendly Sparklers in Colorful Animated Pixar Village",
    category: "pixar-illustrations",
    categoryLabel: "3D Pixar Festive Illustrations",
    aspectRatio: "4:5",
    bestTool: "Bing Image Creator",
    promptTemplate:
      "A wide 3D animated film still in Pixar style depicting a cozy Indian neighborhood street on Diwali evening. Traditional houses painted in warm pastel colors are decorated with thousands of glowing clay lamps and colorful hanging lanterns (kandils). A group of cheerful neighborhood kids dressed in festive ethnic clothes are giggling while waving safe sparklers that paint luminous golden streaks in the air. Overhead, strings of warm bulb lights connect the rooftops. Cinematic animation lighting, expressive happy character gestures, magical festive atmosphere, 8k render --ar 4:5",
    placeholders: [],
    customizationGuide:
      "Great for storytelling posts and festive blog headers. You can add 'snowy Himalayan backdrop' or 'bustling Mumbai chawl alley' to set a specific regional flavor.",
    modelTip:
      "Bing Image Creator renders complex village environments with multiple animated characters with consistent festive charm.",
    lighting: "Festive fairy-light canopy mixed with dynamic golden sparkler trails",
    optics: "Animated cinematic 28mm wide shot, deep storybook field of view",
    keywords: ["3D Pixar style Diwali AI prompt", "Diwali Instagram post AI prompt", "Animated Diwali kids sparkler prompt"],
  },
  {
    id: "diwali-pixar-sweet-shop-mithai",
    title: "Whimsical Pixar-Style Animated Indian Sweet Shop Lit by Fairy Lights and Smiling Characters",
    category: "pixar-illustrations",
    categoryLabel: "3D Pixar Festive Illustrations",
    aspectRatio: "1:1",
    bestTool: "Midjourney",
    promptTemplate:
      "A cozy, whimsical 3D animated illustration of a traditional Indian sweet shop (mithai dukan) on Diwali night in Pixar style. Shelves are brimming with glossy golden motichoor laddus, layered kaju katli with shiny edible silver foil, and juicy jalebis glowing appetizingly under warm shop lights. A friendly, smiling old Indian grandfather shopkeeper with round spectacles is handing a decorated box of sweets to an excited little girl. Garlands of fresh flowers and hanging brass bells adorn the storefront. Stylized 3D render, Pixar movie quality, warm nostalgic atmosphere, 8k --ar 1:1 --v 6.1",
    placeholders: [],
    customizationGuide:
      "Emphasize the desserts by adding 'close-up on delicious glowing syrupy gulab jamuns in an earthen bowl' if creating content for food bloggers or sweet brands.",
    modelTip:
      "Midjourney handles food reflections, glossy syrupy textures, and volumetric lighting with breathtaking artistic flair.",
    lighting: "Warm tungsten interior shop lighting contrasting with cool twilight exterior",
    optics: "45mm portrait lens, warm storybook framing",
    keywords: ["3D Pixar style Diwali AI prompt", "Diwali mithai shop AI prompt", "Diwali festive cartoon 3D prompt"],
  },
];

export interface DiwaliFaqItem {
  question: string;
  answer: string;
}

export const DIWALI_FAQS: DiwaliFaqItem[] = [
  {
    question: "How do I create a Happy Diwali 3D AI image prompt with my name using Bing Image Creator or Ideogram?",
    answer:
      "To create a personalized Happy Diwali 3D AI image with your name, pick any of our 'Instagram DP & 3D Name Art' prompts above and replace '[YOUR NAME]' with your exact first name inside quotation marks (e.g., \"Aarav\" or \"Ananya\"). Next, paste the prompt into Microsoft Copilot / Bing Image Creator (100% free) or Ideogram 2.0. Ideogram is especially renowned for flawless typography without spelling errors, while Bing Image Creator delivers vibrant 3D acrylic and neon lighting effects. If the text ever glitches, run the prompt 1-2 more times or keep your name in uppercase.",
  },
  {
    question: "Which AI model produces the best Diwali Instagram post AI prompt and 9:16 Diwali story backgrounds?",
    answer:
      "For photorealistic Diwali Instagram post AI prompts (4:5 aspect ratio) featuring realistic human faces, authentic silk sarees, and true candle illumination, Midjourney v6.1 and FLUX.1 are the undisputed leaders. For 9:16 vertical Diwali story backgrounds and WhatsApp Status images, always include negative parameters like '--no text, letters, watermark' so the AI creates clean empty negative space in the upper half. This allows you to effortlessly overlay your own festive quotes, business logo, or interactive Instagram story stickers in Canva or Instagram.",
  },
  {
    question: "How to customize 3D product podium Diwali sale prompts for e-commerce brands and Amazon banners?",
    answer:
      "For commercial e-commerce banners, replace '[PRODUCT TYPE]' with your specific product (e.g., 'luxury perfume glass bottle', 'ayurvedic face serum dropper', or 'gold diamond necklace'). Use Ideogram 2.0 or Midjourney v6.1 with prompts specifying 'white Carrara marble cylindrical podium', 'burning brass lamps', and 'subtle floating marigold petals'. To leave room for discount percentages and 'Buy Now' buttons, generate at 16:9 for website banners or 1:1 for Instagram carousel ad mockups.",
  },
  {
    question: "What is the best prompt strategy for a corporate Diwali LinkedIn post prompt?",
    answer:
      "A professional corporate Diwali LinkedIn post prompt should avoid overly casual or loud party imagery. Instead, focus on modern architectural workspaces, executive boardroom tables with clean brass trays of brass diyas, gourmet dry fruits, and floor-to-ceiling windows showing tasteful city skyline fireworks. Use natural office lighting (4500K) mixed with subtle 2700K warm candle accents, leaving a clean side area (16:9 banner ratio) to insert your company's official Diwali message and leadership greeting.",
  },
];
