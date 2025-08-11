import { MorphusResearch, Resource } from "./conversationTypes";

export const morphusResearch: MorphusResearch[] = [
  {
    statistic: "75% of women experience hot flashes during perimenopause",
    context: "You're not alone in experiencing hot flashes",
    keywords: ["hot flashes", "flashes", "heat", "sweating", "temperature"]
  },
  {
    statistic: "67% of women report sleep disruption during perimenopause",
    context: "Sleep challenges are incredibly common during this time",
    keywords: ["sleep", "insomnia", "tired", "exhausted", "wake up", "night"]
  },
  {
    statistic: "60% of women experience mood changes during hormonal transitions",
    context: "Mood fluctuations are a normal part of this journey",
    keywords: ["mood", "anxiety", "depression", "irritable", "emotional", "sad", "angry"]
  },
  {
    statistic: "54% of women report brain fog and memory issues",
    context: "Memory and concentration challenges affect many women",
    keywords: ["brain fog", "memory", "concentration", "focus", "forgetful", "confused"]
  },
  {
    statistic: "48% of women experience irregular periods during perimenopause",
    context: "Period changes are one of the earliest signs many women notice",
    keywords: ["periods", "irregular", "cycle", "menstrual", "bleeding", "flow"]
  },
  {
    statistic: "43% of women report weight gain during hormonal changes",
    context: "Weight fluctuations are common as hormones shift",
    keywords: ["weight", "gain", "metabolism", "body", "clothes", "size"]
  },
  {
    statistic: "41% of women experience joint aches and stiffness",
    context: "Joint discomfort is a lesser-known but common symptom",
    keywords: ["joints", "aches", "pain", "stiff", "arthritis", "muscles"]
  },
  {
    statistic: "39% of women report headaches and migraines increase",
    context: "Headache patterns often change during perimenopause",
    keywords: ["headaches", "migraines", "head pain", "pressure"]
  }
];

export const mockResources: Resource[] = [
  {
    id: "1",
    title: "Understanding Hot Flashes: What Really Helps",
    subtitle: "Evidence-based strategies from leading menopause experts",
    thumbnail: "/api/placeholder/60/60",
    type: "article",
    category: "articles",
    keywords: ["hot flashes", "heat", "sweating", "temperature", "relief"],
    relevanceScore: 0
  },
  {
    id: "2", 
    title: "The Menopause Doctor Podcast: Sleep Solutions",
    subtitle: "Episode 45: Practical tips for better sleep during perimenopause",
    thumbnail: "/api/placeholder/60/60",
    type: "podcast",
    category: "articles",
    keywords: ["sleep", "insomnia", "rest", "night", "tired"],
    relevanceScore: 0
  },
  {
    id: "3",
    title: "Cooling Pillow Insert",
    subtitle: "Memory foam pillow with cooling gel technology",
    thumbnail: "/api/placeholder/60/60", 
    type: "product",
    category: "supplements",
    keywords: ["hot flashes", "night sweats", "cooling", "sleep", "temperature"],
    relevanceScore: 0
  },
  {
    id: "4",
    title: "Managing Brain Fog at Work",
    subtitle: "Community discussion with 200+ helpful responses",
    thumbnail: "/api/placeholder/60/60",
    type: "article",
    category: "qna", 
    keywords: ["brain fog", "work", "memory", "concentration", "focus"],
    relevanceScore: 0
  },
  {
    id: "5",
    title: "Magnesium Glycinate for Sleep",
    subtitle: "Highly absorbable form recommended by naturopaths",
    thumbnail: "/api/placeholder/60/60",
    type: "product", 
    category: "supplements",
    keywords: ["sleep", "magnesium", "supplement", "natural", "rest"],
    relevanceScore: 0
  },
  {
    id: "6",
    title: "Yoga for Hormone Balance",
    subtitle: "15-minute daily routine that members love",
    thumbnail: "/api/placeholder/60/60",
    type: "video",
    category: "tried",
    keywords: ["exercise", "yoga", "hormones", "balance", "wellness"],
    relevanceScore: 0
  }
];

export const followUpQuestions = {
  symptoms: [
    "How long have you been experiencing this?",
    "Can you describe what this feels like for you?",
    "Have you noticed any other changes alongside this?",
    "Is this something new or has it been building gradually?",
    "On a scale of 1-10, how would you rate the intensity?",
    "Does this remind you of anything you've experienced before?",
    "What was the first thing you noticed that felt different?",
    "Are there days when it feels better or worse?"
  ],
  patterns: [
    "Do you notice if this happens at certain times of day?",
    "Have you seen any patterns with your menstrual cycle?",
    "Are there any triggers that seem to make it worse?",
    "Does anything seem to help when this happens?",
    "Have you noticed if stress affects this at all?",
    "Does your diet or sleep seem to play a role?",
    "Are there seasonal patterns you've observed?",
    "What about weekends versus weekdays - any difference?"
  ],
  impact: [
    "How is this affecting your daily life?", 
    "Is this impacting your work or relationships?",
    "How are you feeling emotionally about these changes?",
    "What's been the most challenging part for you?",
    "How has this changed your routine or habits?",
    "Are there activities you've had to modify or avoid?",
    "How are the people close to you responding to these changes?",
    "What worries you most about this continuing?"
  ],
  medicalContext: [
    "Have you been able to discuss this with a healthcare provider?",
    "Are you currently taking any medications or supplements?",
    "Do you have any other health conditions we should be aware of?",
    "What does your family history look like for menopause?",
    "Have you tried any treatments or remedies so far?",
    "Are you working with any specific type of healthcare practitioner?",
    "How do you generally prefer to approach health concerns?",
    "What's your experience been like with healthcare for women's issues?"
  ]
};

export const validationResponses = [
  "That sounds really challenging, and it's completely understandable to feel uncertain when your body is changing.",
  "Thank you for sharing this with me - what you're experiencing is so valid.",
  "I hear how frustrating this must be for you. You're not alone in feeling this way.",
  "It takes courage to talk about these changes. I'm here to listen and support you.",
  "What you're describing resonates with so many women going through similar experiences.",
  "I appreciate you opening up about this. Your feelings and experiences matter.",
  "This sounds like it's been really difficult to navigate on your own.",
  "I can hear how much this is affecting you, and that makes complete sense.",
  "Thank you for trusting me with something so personal and important.",
  "Your experience is important, and I'm honored that you're sharing it with me."
];

export const reflectionPhrases = [
  "It sounds like",
  "What I'm hearing is that", 
  "From what you've shared, it seems",
  "I understand that you're experiencing",
  "It seems like you're navigating",
  "What comes through is that",
  "I'm getting a sense that",
  "It appears that you're dealing with",
  "What I'm picking up is that",
  "From your description, it sounds like"
];