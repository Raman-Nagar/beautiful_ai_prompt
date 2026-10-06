import { VisualStyle } from "@/types/style";

export const VISUAL_STYLES: VisualStyle[] = [
  {
    slug: "cinematic",
    name: "Cinematic & Film Still",
    shortName: "Cinematic",
    badge: "Anamorphic & 35mm",
    tagline: "Master widescreen aspect ratios, Panavision bokeh streaks, and Kodak film stocks",
    description: "Craft Hollywood-grade film frames with organic grain, volumetric atmospheric haze, and genuine anamorphic flare geometry.",
    longDescription:
      "Cinematic prompt engineering emulates real motion-picture cinematography. Rather than relying on generic keywords like '4K' or 'cinematic lighting', it leverages precise optical nomenclature: Panavision C-Series anamorphic lenses, horizontal oval bokeh, Kodak Vision3 500T 5219 film emulsions, and controlled volumetric key-to-fill ratios. This creates depth, realism, and dramatic narrative presence in Midjourney, FLUX, and SDXL.",
    heroImage: "/images/visual/cyberpunk-tokyo-alleyway.jpg",
    accentColor: "from-blue-600 to-indigo-700",
    optics: {
      focalLength: "35mm - 50mm Anamorphic",
      lens: "Panavision C-Series 2x Squeeze Anamorphic Prime",
      aperture: "f/2.0 - f/2.8",
      sensorOrFilm: "Kodak Vision3 500T 5219 Color Negative Film, organic 35mm grain",
    },
    lighting: {
      setup: "Volumetric Key with Rim Separation and Atmospheric Smoke",
      direction: "3/4 Backlit or Motivated Practical Neon",
      colorTemperature: "3200K Tungsten Key with 5600K Cool Ambient fill",
      mood: "Moody, narrative, high visual contrast",
    },
    keyTokens: [
      "cinematic 35mm anamorphic still",
      "Panavision C-Series",
      "horizontal blue streak flare",
      "Kodak Vision3 500T",
      "oval bokeh",
      "volumetric haze",
      "motivated practical lighting",
    ],
    recommendedAspectRatios: ["21:9", "16:9", "2.39:1"],
    bestPractices: [
      "Specify camera lens make and squeeze ratio instead of 'cinematic' (e.g. Panavision C-Series anamorphic)",
      "Anchor the lighting to motivated sources in the scene (streetlamp, neon sign, headlights)",
      "Use widescreen aspect ratios such as --ar 21:9 or --ar 16:9 for true cinematic framing",
      "Specify film emulsion (e.g. Kodak Vision3 500T) for authentic color grading without heavy color casts",
    ],
    commonMistakes: [
      "Using empty adjectives like 'hyperrealistic' or 'photorealistic 8k' which degrade prompt weight",
      "Forgetting aspect ratio flags, resulting in default square 1:1 crops unsuited for cinematography",
      "Over-saturating lighting without balance, leading to muddy shadows and blown-out highlights",
    ],
    samplePromptSnippet: {
      title: "Anamorphic Cyberpunk Alleyway",
      prompt:
        "Cinematic 35mm anamorphic still of a solitary courier walking down a rain-soaked narrow alleyway in Neo-Tokyo, towering vertical holographic kanji billboards casting cyan and deep magenta reflections onto puddle-strewn asphalt, steam rising from street manholes, atmospheric volumetric mist, shallow depth of field, natural horizontal blue lens streak flares, Kodak Vision3 500T 5219 film grain texture --v 6.1 --ar 21:9 --stylize 250",
      breakdown:
        "Establishes physical camera medium (35mm anamorphic), specific lens artifacting (blue streak flares), motivated environmental light (holographic billboards), and authentic film stock (Kodak Vision3 500T).",
    },
  },
  {
    slug: "photography",
    name: "Documentary & Portrait Photography",
    shortName: "Photography",
    badge: "Editorial & Prime Optics",
    tagline: "Capture authentic human emotion, tactile skin texture, and Rembrandt portrait lighting",
    description: "Prompt realistic candid portraits, street photography, and documentary scenes with lifelike micro-contrast and tactile realism.",
    longDescription:
      "Documentary and portrait photography prompts excel when grounded in classic portraiture theory. Avoiding plastic, over-smoothed digital faces requires instructing the model with medium-format camera systems (Hasselblad H6D, Leica M11), prime portrait focal lengths (85mm, 50mm f/1.4), tactile skin pores, vellus hair, natural catchlights in pupils, and Rembrandt lighting triangles.",
    heroImage: "/images/visual/rembrandt-lighting-elderly-artisan.jpg",
    accentColor: "from-amber-600 to-orange-700",
    optics: {
      focalLength: "85mm Prime Portrait Lens",
      lens: "Leica Summilux-M 85mm f/1.4",
      aperture: "f/1.8 (creamy shallow depth of field)",
      sensorOrFilm: "Medium format 100MP Hasselblad / Ilford HP5 Plus (B&W) / Kodak Portra 400",
    },
    lighting: {
      setup: "Rembrandt Lighting with North-Facing Window Key",
      direction: "45-degree high side key producing inverted cheek triangle",
      colorTemperature: "4500K Warm Neutral Natural Daylight",
      mood: "Intimate, dignified, deeply authentic human presence",
    },
    keyTokens: [
      "85mm f/1.8 portrait",
      "tactile skin micro-texture",
      "Rembrandt triangle lighting",
      "natural catchlights in irises",
      "Kodak Portra 400",
      "candid documentary photojournalism",
      "subtle depth of field",
    ],
    recommendedAspectRatios: ["4:5", "3:4", "1:1", "16:9"],
    bestPractices: [
      "Specify micro-details like 'tactile skin pores', 'natural vellus hair', and 'iris catchlights' to defeat AI plastic skin",
      "Utilize Kodak Portra 400 or Fujichrome Provia for lifelike skin tones and organic grain",
      "Position single key light sources like north-facing diffused windows for soft, believable rolloff",
      "Avoid extreme wide-angles for close-up portraits to prevent facial perspective distortion",
    ],
    commonMistakes: [
      "Using 'perfect face' or 'beautiful skin' which causes AI to apply heavy plastic denoising filters",
      "Neglecting pupil reflections, resulting in vacant, dead eyes without dimension",
      "Using flash terms without diffusion context, blowing out highlights and flattening textures",
    ],
    samplePromptSnippet: {
      title: "Rembrandt Elderly Watchmaker Portrait",
      prompt:
        "Intimate documentary portrait of a 72-year-old Swiss watchmaker examining a minute mechanical escapement through a brass loupe, deep dignified character lines on weathered hands, natural skin pores and tactile micro-creases, soft north-facing workshop window light creating classic Rembrandt lighting triangle on cheek, dust motes dancing in sunbeams, captured on 85mm f/1.8 lens, subtle creamy background bokeh, Kodak Portra 400 tone --v 6.1 --ar 4:5",
      breakdown:
        "Frames the subject with dignity and realistic physical imperfections, anchored by a known classic lighting scheme (Rembrandt triangle) and authentic portrait focal length (85mm).",
    },
  },
  {
    slug: "architecture",
    name: "Architectural & Spatial Design",
    shortName: "Architecture",
    badge: "Tilt-Shift & Structural",
    tagline: "Design monumental spaces, brutalist facades, and Scandinavian interior sanctuaries",
    description: "Generate structural masterpieces with corrected two-point vertical perspectives, natural circadian sunlight, and honest materials.",
    longDescription:
      "Architectural AI generation demands spatial rigor and perspective control. Prompts should specify tilt-shift lenses (Canon TS-E 24mm) to keep vertical structural lines perfectly parallel, along with material specifications like cast board-formed concrete, terrazzo, weathered Corten steel, and floor-to-ceiling Low-E glazing. Pair these with clear solar geometry and golden hour raking light to articulate volume and shadow.",
    heroImage: "/images/visual/brutalist-concrete-cathedral.jpg",
    accentColor: "from-stone-600 to-zinc-700",
    optics: {
      focalLength: "24mm Architectural Tilt-Shift Lens",
      lens: "Canon TS-E 24mm f/3.5L II (perspective-corrected)",
      aperture: "f/8 - f/11 (edge-to-edge structural sharpness)",
      sensorOrFilm: "Large Format Phase One IQ4 150MP Digital Back",
    },
    lighting: {
      setup: "Circadian Solar Raking Light & Atmospheric Skylight",
      direction: "Low-angle afternoon sun (raking across texture)",
      colorTemperature: "5200K Natural Sun with 6500K Clear Sky Ambient",
      mood: "Monumental, serene, geometrically disciplined",
    },
    keyTokens: [
      "24mm tilt-shift architectural photography",
      "perfect two-point perspective",
      "board-formed concrete texture",
      "floor-to-ceiling glass curtain wall",
      "raking afternoon sun",
      "structural elevation",
      "ArchDaily feature editorial",
    ],
    recommendedAspectRatios: ["16:9", "21:9", "3:2", "4:5"],
    bestPractices: [
      "Always include 'perspective corrected' or 'tilt-shift' to avoid converging vertical walls",
      "Specify realistic building materials (e.g. 'board-formed concrete with visible tie-holes', 'quartered white oak')",
      "Use high f-stops (f/8-f/11) to maintain razor-sharp focus across foreground and background",
      "Leverage natural circadian lighting to reveal tactile facade textures and architectural volumes",
    ],
    commonMistakes: [
      "Leaving perspective unspecified, resulting in disorienting fisheye or converging barrel distortion",
      "Over-cluttering spaces with contradictory architectural styles and floating decor",
      "Forgetting human scale indicators like subtle minimalist silhouettes or furniture",
    ],
    samplePromptSnippet: {
      title: "Monumental Brutalist Cathedral",
      prompt:
        "Architectural editorial photograph of a monumental brutalist concrete cathedral interior, colossal board-formed raw concrete arches soaring into a dramatic triangular ceiling skylight, razor-sharp shafts of volumetric morning sunlight cutting through cool morning mist, polished terrazzo floor with subtle matte reflections, captured on Canon TS-E 24mm tilt-shift lens, perfectly straight vertical lines, high dynamic range, Architectural Digest cover --v 6.1 --ar 16:9 --stylize 180",
      breakdown:
        "Ensures vertical perspective correction via tilt-shift optics, describes specific material texture (board-formed concrete, polished terrazzo), and controls volumetric natural light geometry.",
    },
  },
  {
    slug: "fashion",
    name: "High Fashion & Editorial Studio",
    shortName: "Fashion",
    badge: "Haute Couture & Vogue",
    tagline: "Produce Vogue-worthy editorial spreads, high-contrast studio strobes, and haute couture draping",
    description: "Create high-impact fashion campaigns featuring intricate textile draping, Profoto studio lighting setups, and avant-garde styling.",
    longDescription:
      "Editorial fashion generation merges creative art direction with commercial studio lighting. By directing key variables—such as Profoto giant parabolic reflectors, octa softboxes, and rim kickers—along with specific luxury textile types (duchesse satin, raw silk, organza, sculpted leather), creators achieve cover-worthy imagery with rich tactile fidelity.",
    heroImage: "/images/visual/editorial-studio-fashion-portrait.jpg",
    accentColor: "from-rose-600 to-pink-700",
    optics: {
      focalLength: "70-200mm f/2.8 Telephoto Studio Zoom at 135mm",
      lens: "Sony FE 135mm f/1.8 GM",
      aperture: "f/4.0 - f/5.6 (complete face and garment in sharp focus)",
      sensorOrFilm: "Hasselblad X2D 100C Medium Format / Kodak Ektachrome 100",
    },
    lighting: {
      setup: "High-Key / Dramatic Studio Strobe with Profoto Beauty Dish",
      direction: "Overhead butterfly lighting with silver reflector fill",
      colorTemperature: "5600K Daylight Balanced Studio Flash",
      mood: "High-fashion avant-garde, glamorous, sculptured",
    },
    keyTokens: [
      "high-fashion editorial photography",
      "Profoto beauty dish lighting",
      "Vogue Italia cover style",
      "135mm f/2.8 lens",
      "sculpted textile draping",
      "butterfly lighting",
      "flawless editorial color grading",
    ],
    recommendedAspectRatios: ["4:5", "3:4", "2:3", "9:16"],
    bestPractices: [
      "Specify exact textile properties (e.g. 'sculpted structured organza', 'weighty duchesse satin') for believable fabric folds",
      "Use telephoto focal lengths (100mm-135mm) for flattering fashion proportions without wide-angle distortion",
      "Incorporate commercial studio modifiers like beauty dishes and giant parabolic reflectors",
      "Direct pose dynamics (e.g. 'dynamic contrapposto stance', 'editorial high-angle gaze')",
    ],
    commonMistakes: [
      "Using generic 'fashion model' prompts resulting in bland catalog looks without editorial edge",
      "Shooting too wide (e.g. 24mm) which elongates limbs unnaturally and warps facial anatomy",
      "Ignoring wardrobe styling specifics, causing repetitive generic apparel and flat drapery",
    ],
    samplePromptSnippet: {
      title: "Haute Couture Studio Portrait",
      prompt:
        "High-fashion editorial studio portrait of an avant-garde model adorned in an architectural pleated emerald silk-taffeta gown, dramatic sculptural collar framing cheekbones, illuminated by a single overhead Profoto beauty dish with subtle silver bounce fill, deep charcoal seamless cyclorama background, shot on Hasselblad 100MP with 135mm lens at f/4, crisp textile weave texture, Vogue Italia spread --v 6.1 --ar 4:5 --stylize 300",
      breakdown:
        "Directs specific luxury fabric (emerald silk-taffeta), describes light modifier (Profoto beauty dish with silver bounce), studio backdrop (cyclorama), and telephoto portrait compression.",
    },
  },
  {
    slug: "product",
    name: "Commercial & Product Photography",
    shortName: "Product",
    badge: "Commercial Macro & CPG",
    tagline: "Engineered for luxury CPG, macro chronographs, and cosmetics packshots with clean specular highlights",
    description: "Generate advertising-ready commercial packshots with isolated studio gradient backgrounds, polarizer reflections, and macro focus stacking.",
    longDescription:
      "Commercial product photography requires surgical control over specular highlights, surface gradients, and material refraction. From condensation droplets on cold beverage cans to anti-reflective sapphire crystal coatings on Swiss chronographs, this style focuses on precision lighting with strip softboxes, scrim diffusers, and macro focus stacking.",
    heroImage: "/images/visual/luxury-swiss-chronograph-macro.jpg",
    accentColor: "from-emerald-600 to-teal-700",
    optics: {
      focalLength: "100mm Macro 1:1 Reproduction",
      lens: "Canon RF 100mm f/2.8L Macro IS USM",
      aperture: "f/11 - f/16 (focus stacked for razor-sharp edge definition)",
      sensorOrFilm: "Sony A7R V with High-Res Pixel Shift",
    },
    lighting: {
      setup: "Dual Strip Box Rim with Acrylic Gradient Diffusion Scrim",
      direction: "Overhead 45-degree top light with dual edge strip kickers",
      colorTemperature: "5500K Clean Studio Neutral Daylight",
      mood: "Crisp, pristine, luxury commercial polish",
    },
    keyTokens: [
      "commercial product packshot",
      "100mm macro lens",
      "focus stacked f/11",
      "pristine specular highlight",
      "acrylic diffusion scrim",
      "luxury packaging",
      "flawless reflection on black glass",
    ],
    recommendedAspectRatios: ["1:1", "4:5", "16:9", "9:16"],
    bestPractices: [
      "Specify focus stacking and f/11-f/16 to avoid shallow depth of field obscuring product branding",
      "Use acrylic diffusion scrims and strip boxes to control smooth specular gradients across metallic or glass finishes",
      "Describe material finishes precisely (e.g. 'sandblasted matte aluminum', 'brushed chamfered bevels')",
      "Set clean, controlled backdrops (podiums, water surface, gradient cyclorama)",
    ],
    commonMistakes: [
      "Letting depth of field blur the rear half of the product, destroying commercial utility",
      "Uncontrolled reflections resulting in distracting artifacts across glass or metal surfaces",
      "Neglecting surface micro-details like fine knurling, embossed foil, or condensation beads",
    ],
    samplePromptSnippet: {
      title: "Luxury Swiss Chronograph Macro",
      prompt:
        "Ultra-sharp macro commercial studio packshot of a luxury mechanical chronograph watch with deep sunburst navy dial, intricate skeletonized tourbillon escapement visible through anti-reflective sapphire crystal, brushed stainless steel case with polished beveled chamfers, resting on dark slate surface, dual strip box edge lighting creating razor-sharp clean white specular reflections along bezel, shot on 100mm macro lens at f/11, focus stacked, zero dust, high-end horology advertisement --v 6.1 --ar 1:1",
      breakdown:
        "Dictates macro optics (100mm at f/11 focus stacked), exact materials (sunburst dial, anti-reflective sapphire, brushed steel), and commercial studio lighting (dual strip box edge reflections).",
    },
  },
  {
    slug: "digital-art",
    name: "Digital Art & 3D Concept Renders",
    shortName: "Digital Art",
    badge: "Octane & Isometric 3D",
    tagline: "Craft stylized isometric dioramas, sci-fi concept art, and vibrant Octane/Unreal Engine 5 worlds",
    description: "Build stylized 3D worlds, isometric game dioramas, and imaginative sci-fi concept art with raytraced subsurface scattering and vibrant color theory.",
    longDescription:
      "Digital art and concept rendering bridge the gap between photorealism and creative fantasy. By specifying rendering pipelines (Octane Render, Redshift, Unreal Engine 5 Lumen), camera projection models (orthographic isometric, 35-degree angle), and materials (subsurface scattering resin, emissive neon glow, clay render), creators can generate production-ready key art and 3D assets.",
    heroImage: "/images/visual/isometric-floating-cyberpunk-ramen-shop.jpg",
    accentColor: "from-purple-600 to-fuchsia-700",
    optics: {
      focalLength: "Orthographic Telephoto (Isometric Projection)",
      lens: "Simulated Orthographic Camera with 0-degree vanishing perspective",
      aperture: "Deep Global Focus (f/8 equivalent)",
      sensorOrFilm: "Raytraced Octane Render / Unreal Engine 5 Lumen Global Illumination",
    },
    lighting: {
      setup: "Three-Point Global Illumination with Emissive Neons",
      direction: "Top-down ambient with complementary colored rim lights",
      colorTemperature: "Split complementary (Warm 2700K vs Cool 9000K)",
      mood: "Playful, intricate, imaginative, visually captivating",
    },
    keyTokens: [
      "isometric 3d diorama",
      "Octane render",
      "Unreal Engine 5 Lumen",
      "orthographic view",
      "subsurface scattering resin",
      "detailed miniature scale",
      "claymation texture",
      "vibrant color palette",
    ],
    recommendedAspectRatios: ["1:1", "16:9", "4:3", "9:16"],
    bestPractices: [
      "Specify projection type ('isometric view', 'orthographic camera') to maintain parallel lines without perspective distortion",
      "Mention specific rendering engines (Octane, Redshift, Blender Cycles) to guide material shading",
      "Add tactile physical cues like 'subsurface scattering', 'miniature diorama scale', or 'tilt-shift toy model effect'",
      "Balance vibrant saturated colors with dark or neutral negative space",
    ],
    commonMistakes: [
      "Leaving camera angle ambiguous, resulting in tilted perspective instead of true isometric projection",
      "Cluttering miniature scale scenes without clear visual hierarchy",
      "Missing emissive lighting definitions, making digital renders look flat and unshaded",
    ],
    samplePromptSnippet: {
      title: "Isometric Floating Cyberpunk Ramen Shop",
      prompt:
        "Charming isometric 3D render of a cozy floating cyberpunk ramen noodle shop diorama, glowing orange paper lanterns casting warm light, miniature holographic neon cat sign on tiled roof, steam billowing from simmering broth cauldrons, tiny retro vending machine outside, detailed modular architecture, clean claymation textures with subtle subsurface scattering, rendered in Octane Render, smooth studio gradient background, trending on ArtStation --v 6.1 --ar 1:1 --stylize 200",
      breakdown:
        "Specifies isometric diorama projection, whimsical miniature scale cues, detailed material properties (claymation, subsurface scattering), and Octane rendering engine.",
    },
  },
];
