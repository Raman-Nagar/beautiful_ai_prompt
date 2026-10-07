import { ModelParameter } from "@/types/parameter";

export const PARAMETERS: ModelParameter[] = [
  {
    slug: "sref",
    name: "Style Reference (--sref)",
    flag: "--sref",
    model: "midjourney",
    modelName: "Midjourney v6.1",
    syntax: "--sref <URL1> <URL2> [--sw <0-1000>]",
    defaultValue: "None",
    range: "1 to 5 Image URLs, Style Weight 0 - 1000",
    shortDescription:
      "Transfers the complete aesthetic palette, color grading, brushstrokes, and visual vibe from reference images onto a new prompt subject without copying the reference subject.",
    detailedExplanation:
      "The Style Reference parameter (--sref) is one of the most powerful features in Midjourney v6.1. By appending one or more public image URLs, Midjourney extracts abstract stylistic features—such as chromatic grading, painterly strokes, lighting intensity, and film grain—and applies them to whatever new subject you describe. Unlike image prompts which influence composition and subject matter, --sref influences aesthetic texture exclusively.",
    recommendedValues: [
      {
        value: "--sref <URL>",
        scenario: "Standard Style Mimicry",
        visualImpact: "Transfers balanced color palette and textural mood from a single reference image.",
      },
      {
        value: "--sref <URL1> <URL2> --sw 250",
        scenario: "Blended Multi-Style Harmony",
        visualImpact: "Harmonizes two contrasting aesthetic references with gentle, non-destructive style weight.",
      },
      {
        value: "--sref <URL> --sw 800",
        scenario: "Aggressive Aesthetic Override",
        visualImpact: "Forces near-total adherence to the reference medium (e.g. vintage risograph, neon ink).",
      },
      {
        value: "--sref random",
        scenario: "Serendipitous Style Discovery",
        visualImpact: "Generates a randomized style seed code from Midjourney's internal aesthetic latent space.",
      },
    ],
    commonMistakes: [
      "Using local file paths instead of publicly accessible direct image URLs (ending in .jpg, .png, .webp).",
      "Passing references with strong subjects expecting the subject to transfer—use character reference (--cref) for faces and subjects instead.",
      "Combining excessively high --sw (e.g. 1000) with complex subjects, which causes subject loss and pure abstract textures.",
    ],
    samplePrompts: [
      "cinematic wide shot of a retrofuturistic space station --sref https://example.com/palette.jpg --ar 16:9 --v 6.1",
      "editorial portrait of an architect in an open gallery --sref https://example.com/mood.jpg --sw 350 --ar 4:5 --v 6.1",
    ],
    faq: [
      {
        question: "How does --sref differ from standard image prompts in Midjourney?",
        answer:
          "Standard image prompts influence composition, geometry, and subject identity. The --sref flag extracts only the aesthetic vibe, color palette, lighting temperature, and medium texture, leaving the new subject completely free.",
      },
      {
        question: "Can I use multiple style references simultaneously?",
        answer:
          "Yes. You can supply multiple URLs separated by spaces (e.g. --sref URL1 URL2). Midjourney will blend their visual styles evenly, or you can apply relative weights like URL1::2 URL2::1.",
      },
    ],
  },
  {
    slug: "cref",
    name: "Character Reference (--cref)",
    flag: "--cref",
    model: "midjourney",
    modelName: "Midjourney v6.1",
    syntax: "--cref <URL> [--cw <0-100>]",
    defaultValue: "None (Character Weight defaults to 100)",
    range: "1 Image URL, Character Weight 0 - 100",
    shortDescription:
      "Maintains facial likeness, hair color, and character identity across multiple scenes, outfits, and camera angles.",
    detailedExplanation:
      "The Character Reference parameter (--cref) solves generative AI's longest-standing problem: persistent character continuity. By supplying an image URL of your character, Midjourney v6.1 locks facial structure, eye shape, and distinctive physical attributes. The companion --cw (Character Weight) flag allows you to preserve just the face (--cw 0) for costume/clothing changes, or preserve face, hair, and clothing together (--cw 100).",
    recommendedValues: [
      {
        value: "--cref <URL> --cw 100",
        scenario: "Total Character & Outfit Lock",
        visualImpact: "Locks face, hairstyle, clothing style, and accessories across scenes.",
      },
      {
        value: "--cref <URL> --cw 0",
        scenario: "Facial Likeness with New Wardrobe",
        visualImpact: "Locks face and facial structure only, allowing complete freedom to describe new clothes, uniforms, or armor.",
      },
      {
        value: "--cref <URL> --cw 50",
        scenario: "Flexible Reinterpretation",
        visualImpact: "Retains facial identity while allowing slight hair variations and contextual accessories.",
      },
    ],
    commonMistakes: [
      "Using real-world photographic celebrity portraits as reference—Midjourney works best with previously generated Midjourney character images.",
      "Leaving --cw at default 100 when you want the character to wear a different outfit.",
      "Using reference images where the character's face is obscured, in extreme shadow, or heavily turned away from the camera.",
    ],
    samplePrompts: [
      "a young female detective walking through a rainy neon market in a yellow raincoat --cref https://example.com/detective.jpg --cw 0 --ar 16:9 --v 6.1",
      "the same character sitting at a wooden cafe table sipping espresso --cref https://example.com/detective.jpg --cw 100 --ar 4:5 --v 6.1",
    ],
    faq: [
      {
        question: "Can I combine --cref and --sref in the same Midjourney prompt?",
        answer:
          "Yes. Combining --cref (for person identity) and --sref (for artistic visual style) is the gold standard for producing cohesive comic books, graphic novels, and brand campaigns in Midjourney.",
      },
      {
        question: "Why is --cw 0 recommended for character costume changes?",
        answer:
          "At --cw 100, Midjourney attempts to replicate the character's clothing and hairstyle from the reference image. Lowering to --cw 0 isolates the facial likeness, giving full weight to your prompt's clothing descriptions.",
      },
    ],
  },
  {
    slug: "stylize",
    name: "Stylize Control (--stylize)",
    flag: "--stylize",
    model: "midjourney",
    modelName: "Midjourney v6.1",
    syntax: "--stylize <0-1000> (or --s <0-1000>)",
    defaultValue: "100",
    range: "0 to 1000",
    shortDescription:
      "Controls how strongly Midjourney's default house aesthetic, artistic flair, and color harmony are applied versus literal prompt adherence.",
    detailedExplanation:
      "Midjourney has an inherent artistic visual bias developed during model fine-tuning. The --stylize parameter (or shorthand --s) calibrates the balance between literal prompt following and artistic embellishment. Low values (--s 0 to 50) produce raw, candid, unembellished results adhering strictly to your text. High values (--s 250 to 750) enhance chromatic saturation, dynamic lighting, and cinematic composition.",
    recommendedValues: [
      {
        value: "--stylize 50",
        scenario: "Literal & Documentary Realism",
        visualImpact: "Strikes minimal artistic embellishment, ideal for technical diagrams, architecture, and raw unedited looks.",
      },
      {
        value: "--stylize 100",
        scenario: "Midjourney Default Baseline",
        visualImpact: "Balanced prompt adherence with standard color depth and compositional polish.",
      },
      {
        value: "--stylize 250",
        scenario: "Editorial Cinema & High Fashion",
        visualImpact: "Enhances lighting contrast, rich shadow gradations, and dramatic perspective without corrupting prompt intent.",
      },
      {
        value: "--stylize 750",
        scenario: "High Artistry & Abstract Illustration",
        visualImpact: "Prioritizes aesthetic beauty and decorative detail over literal adherence to small prompt words.",
      },
    ],
    commonMistakes: [
      "Using --stylize 1000 when specific tiny details must be present—extreme stylization drops secondary prompt tokens.",
      "Believing that --s 0 creates ugly images; --s 0 is frequently the secret to authentic candid photography.",
      "Combining high stylize with --style raw, which fight each other for aesthetic priority.",
    ],
    samplePrompts: [
      "street photograph of a newspaper vendor on a foggy morning in London --stylize 50 --ar 16:9 --v 6.1",
      "mythological warrior riding a spectral stag across celestial meadows --stylize 600 --ar 21:9 --v 6.1",
    ],
    faq: [
      {
        question: "What is the difference between --stylize and --weird?",
        answer:
          "--stylize increases conventional aesthetic beauty, color balance, and artistic polish. --weird introduces unorthodox, surreal, and unconventional compositions.",
      },
      {
        question: "Does --stylize increase image resolution or GPU processing time?",
        answer:
          "No. All stylize values generate images at the identical resolution and take the exact same amount of GPU fast hours.",
      },
    ],
  },
  {
    slug: "chaos",
    name: "Chaos & Initial Variation (--chaos)",
    flag: "--chaos",
    model: "midjourney",
    modelName: "Midjourney v6.1",
    syntax: "--chaos <0-100> (or --c <0-100>)",
    defaultValue: "0",
    range: "0 to 100",
    shortDescription:
      "Controls how varied and divergent the 4 initial image grid outputs are from one another.",
    detailedExplanation:
      "When Midjourney generates a 4-image grid, it uses initial noise patterns. At the default --chaos 0, all four images will have very similar interpretations, lighting setups, and compositions. Increasing --chaos introduces high entropy into the initial diffusion seeds, causing the 4 images to exhibit vastly different angles, styles, and creative viewpoints.",
    recommendedValues: [
      {
        value: "--chaos 0",
        scenario: "Predictable & Controlled Production",
        visualImpact: "All 4 grid images are closely aligned variations of the exact same visual idea.",
      },
      {
        value: "--chaos 15",
        scenario: "Healthy Creative Exploration",
        visualImpact: "Subtle differences in framing, subject pose, and ambient lighting across the 4 quadrants.",
      },
      {
        value: "--chaos 50",
        scenario: "Broad Concept Brainstorming",
        visualImpact: "Wildly divergent compositions, varying from close-ups to wide shots and contrasting palettes.",
      },
      {
        value: "--chaos 85+",
        scenario: "Experimental & Unpredictable Ideation",
        visualImpact: "Extreme divergence; unexpected interpretations and avant-garde compositional shifts.",
      },
    ],
    commonMistakes: [
      "Using high chaos in production pipelines where you need consistent, predictable iterations.",
      "Confusing --chaos with --weird: chaos affects variation *between the 4 images in a grid*, while weird affects the *unconventional character of each image*.",
    ],
    samplePrompts: [
      "isometric architectural blueprint of a subterranean library --chaos 25 --ar 16:9 --v 6.1",
      "abstract glass sculpture capturing quantum entanglement --chaos 75 --ar 1:1 --v 6.1",
    ],
    faq: [
      {
        question: "Does --chaos change image quality?",
        answer:
          "No. Images generated with high chaos have the exact same pixel fidelity, sharpness, and resolution as low chaos images.",
      },
    ],
  },
  {
    slug: "weird",
    name: "Weird Experimental Mode (--weird)",
    flag: "--weird",
    model: "midjourney",
    modelName: "Midjourney v6.1",
    syntax: "--weird <0-3000> (or --w <0-3000>)",
    defaultValue: "0",
    range: "0 to 3000",
    shortDescription:
      "Introduces quirky, surreal, and offbeat aesthetic properties into your generations.",
    detailedExplanation:
      "The --weird parameter (or shorthand --w) pushes Midjourney outside of its conventional latent training manifold. Instead of producing typical stock-photo-like compositions, it explores eccentric, peculiar, and visually surreal territory. It is particularly popular among digital artists, avant-garde illustrators, and creators seeking genuinely unexpected artistic expressions.",
    recommendedValues: [
      {
        value: "--weird 250",
        scenario: "Subtle Eccentric Flair",
        visualImpact: "Adds gentle surrealism, unconventional angles, or unexpected color touches without losing subject recognizability.",
      },
      {
        value: "--weird 750",
        scenario: "Avant-Garde & Dreamlike",
        visualImpact: "Dramatic surrealist distortion, dream-logic architecture, and idiosyncratic character designs.",
      },
      {
        value: "--weird 1500+",
        scenario: "Total Abstract Peculiarity",
        visualImpact: "Deep exploration of surreal visual territory; unexpected textures and bizarre visual metaphors.",
      },
    ],
    commonMistakes: [
      "Using values above 1000 for standard commercial or photorealistic photography prompts.",
      "Not balancing --weird with --stylize: pairing --weird with --stylize creates beautiful strange art, whereas weird alone can become unpolished.",
    ],
    samplePrompts: [
      "baroque porcelain teapot shaped like a sleeping galaxy --weird 400 --stylize 300 --ar 1:1 --v 6.1",
      "editorial portrait of a philosopher contemplating infinity --weird 850 --ar 4:5 --v 6.1",
    ],
    faq: [
      {
        question: "Can I combine --weird with --stylize and --chaos?",
        answer:
          "Yes! The combination of --weird 500 --stylize 400 --chaos 20 is widely regarded as the ultimate formula for generating museum-grade surrealist digital art in Midjourney.",
      },
    ],
  },
  {
    slug: "style-raw",
    name: "Style Raw (--style raw)",
    flag: "--style raw",
    model: "midjourney",
    modelName: "Midjourney v6.1",
    syntax: "--style raw",
    defaultValue: "Standard Model Bias",
    range: "Boolean flag (Enabled or Disabled)",
    shortDescription:
      "Dampens Midjourney's default house aesthetic to render authentic documentary photographic realism, natural skin micropores, and uncandid textures.",
    detailedExplanation:
      "By default, Midjourney applies an artistic glaze: skin appears slightly airbrushed, lighting is perfectly balanced, and compositions have a commercial cinematic sheen. Appending --style raw strips away this default embellishment. It gives your prompt words more direct photographic control, producing natural unretouched skin textures, authentic lens imperfections, and candid documentary compositions.",
    recommendedValues: [
      {
        value: "--style raw",
        scenario: "True Photorealism & Human Portraits",
        visualImpact: "Renders authentic skin microtexture, subtle blemishes, natural eye catchlights, and unretouched epidermal surfaces.",
      },
      {
        value: "--style raw --stylize 50",
        scenario: "Raw Photojournalism & Street Photography",
        visualImpact: "Produces candid, authentic photojournalistic images that look like genuine 35mm film captures.",
      },
    ],
    commonMistakes: [
      "Assuming --style raw makes images lower quality—it actually creates far more convincing photorealism by removing artificial digital gloss.",
      "Pairing --style raw with generic keywords like 'photorealistic, 8k, masterpiece', which triggers old bot-era tokens.",
    ],
    samplePrompts: [
      "candid close-up portrait of a 45-year-old fisherman with wind-weathered skin, sea salt in beard, shot on Leica M11 50mm f/1.4 --style raw --ar 4:5 --v 6.1",
      "documentary photograph of an authentic Italian trattoria kitchen during dinner rush --style raw --ar 16:9 --v 6.1",
    ],
    faq: [
      {
        question: "Why does --style raw look more photorealistic than standard Midjourney?",
        answer:
          "Standard Midjourney adds beautification filters that human eyes subconsciously recognize as AI. --style raw removes this filter, preserving optical lens physics, slight chromatic grain, and natural human skin imperfections.",
      },
    ],
  },
  {
    slug: "guidance-scale",
    name: "FLUX Guidance Scale",
    flag: "guidance_scale",
    model: "flux",
    modelName: "FLUX.1 Dev",
    syntax: "guidance_scale: <1.0 - 10.0>",
    defaultValue: "3.5",
    range: "1.0 to 10.0 (Optimal: 2.5 to 4.0)",
    shortDescription:
      "Calibrates flow-matching transformer guidance strength in FLUX.1 models. Balances prompt compliance against natural contrast and skin tone fidelity.",
    detailedExplanation:
      "Unlike traditional diffusion models that use Classifier-Free Guidance (CFG), FLUX.1 Dev uses flow-matching trajectory guidance. In FLUX, values between 2.5 and 3.5 produce the most natural photographic skin tones and organic depth. Exceeding 4.5 frequently introduces high contrast, harsh edge burn, and plastic skin smoothing artifacts.",
    recommendedValues: [
      {
        value: "guidance_scale: 2.5",
        scenario: "Ultra-Organic Photorealism",
        visualImpact: "Soft natural contrast, gentle film grain, highly authentic skin tones.",
      },
      {
        value: "guidance_scale: 3.5",
        scenario: "Standard FLUX Sweet Spot",
        visualImpact: "Optimal prompt adherence, sharp typographical rendering, balanced dynamic range.",
      },
      {
        value: "guidance_scale: 5.0+",
        scenario: "Complex Typography & Signage",
        visualImpact: "Enforces literal text compliance on signs and logos at the expense of slight saturation boost.",
      },
    ],
    commonMistakes: [
      "Using SDXL-style guidance values (7.0 - 9.0) in FLUX, which severely burns colors and produces plastic artifacts.",
      "Trying to use negative prompts to fix guidance issues—FLUX ignores negative text natively.",
    ],
    samplePrompts: [
      'RAW street photograph of an antique store with a sign reading "TIME TRAVEL VINTAGE", shot on 35mm film, natural light, guidance_scale: 3.0',
    ],
    faq: [
      {
        question: "Why does FLUX guidance scale differ from Stable Diffusion CFG?",
        answer:
          "FLUX uses a rectified flow transformer rather than standard DDPM/U-Net latent diffusion. The mathematical velocity vectors require lower numerical scale coefficients (2.5–3.5 vs SDXL's 6.0–8.0).",
      },
    ],
  },
  {
    slug: "cfg-scale",
    name: "SDXL Classifier-Free Guidance (CFG)",
    flag: "CFG Scale",
    model: "stable-diffusion",
    modelName: "Stable Diffusion XL",
    syntax: "CFG: <1.0 - 20.0>",
    defaultValue: "7.0",
    range: "1.0 to 20.0 (Optimal: 5.0 to 8.0)",
    shortDescription:
      "Controls how aggressively the U-Net latent diffusion denoising steps follow the positive text prompt versus unconditioned generation.",
    detailedExplanation:
      "Classifier-Free Guidance (CFG) in SDXL measures how far the diffusion generation is pushed toward the positive conditioning vector away from the unconditioned (negative) vector at each inference step. A CFG of 5.5 to 7.0 is universally recognized as the sweet spot for photorealism. Values below 4 lead to washed-out dreamscapes; values above 10 result in fried, oversaturated neon artifacts.",
    recommendedValues: [
      {
        value: "CFG: 5.0 - 6.0",
        scenario: "Realistic Human Skin & Soft Light",
        visualImpact: "Subtle gradients, gentle skin tones, zero digital edge clipping.",
      },
      {
        value: "CFG: 7.0",
        scenario: "Balanced Default",
        visualImpact: "Strong prompt adherence, crisp edges, balanced contrast.",
      },
      {
        value: "CFG: 10.0+",
        scenario: "Stylized Graphic Art / 3D Render",
        visualImpact: "Deep punchy shadows and saturated highlights (avoid for human portraits).",
      },
    ],
    commonMistakes: [
      "Setting CFG too high (>9) to 'force' a missing prompt detail—instead, increase inference steps or rephrase the prompt.",
      "Using high CFG with DPM++ 2M SDE Karras samplers, which naturally increase contrast.",
    ],
    samplePrompts: [
      "Positive: RAW photo of an elderly craftsman, natural window lighting, 8k, masterpiece. Negative: blurry, bad anatomy. Parameters: CFG: 6.0, Steps: 30, Sampler: DPM++ 2M Karras",
    ],
    faq: [
      {
        question: "How does inference step count affect CFG in SDXL?",
        answer:
          "Higher CFG scales require slightly more inference steps (35–45) to resolve fine details. Low CFG (5.0) converges smoothly in as few as 25–30 steps.",
      },
    ],
  },
];

export function getAllParameters(): ModelParameter[] {
  return PARAMETERS;
}

export function getParameterBySlug(slug: string): ModelParameter | undefined {
  return PARAMETERS.find((p) => p.slug === slug);
}
