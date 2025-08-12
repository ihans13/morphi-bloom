import { useState, useCallback } from 'react';

export type ConversationStep = 
  | 'initiation'
  | 'initial_validation' 
  | 'active_listening'
  | 'symptom_gathering'
  | 'resource_introduction'
  | 'resource_presentation'
  | 'post_resource';

export interface Message {
  id: number;
  sender: 'user' | 'morphi';
  content: string;
  timestamp: Date;
  resources?: Resource[];
  showMoreVisible?: boolean;
}

export interface Resource {
  id: string;
  type: 'article' | 'podcast' | 'video' | 'product';
  title: string;
  subtitle: string;
  thumbnail: string;
  link: string;
  relevanceScore: number;
}

export interface ConversationState {
  step: ConversationStep;
  userSymptoms: string[];
  userContext: Record<string, any>;
  exchangeCount: number;
  readyForResources: boolean;
}

const initialState: ConversationState = {
  step: 'initiation',
  userSymptoms: [],
  userContext: {},
  exchangeCount: 0,
  readyForResources: false
};

const mockResources: Resource[] = [
  {
    id: '1',
    type: 'podcast',
    title: 'The Psychological Effects of Perimenopause & Menopause with Dr. Bev Young',
    subtitle: 'Podcast by Morphus | Menopause Reimagined (timestamp: 12:30)',
    thumbnail: '🎧',
    link: '#',
    relevanceScore: 0.9
  },
  {
    id: '2',
    type: 'article',
    title: 'Managing Hot Flashes Naturally',
    subtitle: 'Article by Women\'s Health Collective (6 mins read)',
    thumbnail: '📖',
    link: '#',
    relevanceScore: 0.8
  },
  {
    id: '3',
    type: 'product',
    title: 'Magnesium Complex for Hormonal Balance',
    subtitle: 'Product recommended by Mayo Clinic',
    thumbnail: '💊',
    link: '#',
    relevanceScore: 0.7
  }
];

export const useConversationState = () => {
  const [state, setState] = useState<ConversationState>(initialState);

  const updateState = useCallback((updates: Partial<ConversationState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const analyzeUserMessage = useCallback((message: string): { symptoms: string[], triggers: string[] } => {
    const symptoms: string[] = [];
    const triggers: string[] = [];

    // Symptom detection keywords
    const symptomKeywords = {
      'hot flashes': ['hot flash', 'hot flush', 'heat wave', 'burning up'],
      'headaches': ['headache', 'head pain', 'migraine'],
      'mood changes': ['mood', 'emotional', 'anxious', 'depression', 'irritable'],
      'sleep issues': ['sleep', 'insomnia', 'tired', 'fatigue', 'exhausted'],
      'irregular periods': ['period', 'cycle', 'menstrual', 'bleeding']
    };

    // Check for symptoms
    Object.entries(symptomKeywords).forEach(([symptom, keywords]) => {
      if (keywords.some(keyword => message.toLowerCase().includes(keyword))) {
        symptoms.push(symptom);
      }
    });

    // Check for readiness triggers
    const readinessTriggers = [
      'what should i do',
      'what can help',
      'i need to figure this out',
      'need help',
      'what are my options'
    ];

    readinessTriggers.forEach(trigger => {
      if (message.toLowerCase().includes(trigger)) {
        triggers.push(trigger);
      }
    });

    return { symptoms, triggers };
  }, []);

  const generateBotResponse = useCallback((userMessage: string, currentState: ConversationState): string => {
    const { symptoms, triggers } = analyzeUserMessage(userMessage);
    
    switch (currentState.step) {
      case 'initiation':
        return "That sounds challenging and it's completely understandable to feel uncertain when your body is changing. Thank you for sharing this with me. I'd love to learn more about what you're experiencing.";
      
      case 'initial_validation':
      case 'active_listening':
        let response = '';
        
        // Validation
        if (symptoms.length > 0) {
          response += `Feeling confused about what's happening is so normal - many women experience this uncertainty. According to Morphus research, ${symptoms[0]} affects about 75% of women during perimenopause. `;
        }
        
        // Reflection
        response += `It sounds like you're going through quite a lot right now. `;
        
        // Follow-up question
        if (symptoms.includes('hot flashes')) {
          response += "You mentioned hot flashes - have you noticed if they happen at certain times of day or month?";
        } else if (symptoms.includes('headaches')) {
          response += "You mentioned headaches - how long have you been experiencing these?";
        } else {
          response += "Can you tell me more about how these changes are affecting your daily life?";
        }
        
        return response;
      
      case 'symptom_gathering':
        const questions = [
          "How long have you been experiencing these symptoms?",
          "Do you notice if they happen at certain times of day or month?", 
          "How are these affecting your daily life?",
          "Have you been able to discuss these symptoms with a healthcare practitioner yet?"
        ];
        
        return `Thank you for sharing that. ${questions[Math.floor(Math.random() * questions.length)]}`;
      
      case 'resource_introduction':
        const mentionedSymptoms = symptoms.length > 0 ? symptoms.join(' and ') : 'what you\'ve described';
        return `Based on what you've shared about ${mentionedSymptoms}, I've found some resources that have helped other women with similar experiences. Would you like me to share some suggestions you could explore?`;
      
      default:
        return "I'm here to help you through this journey. What would you like to know more about?";
    }
  }, [analyzeUserMessage]);

  const processMessage = useCallback((userMessage: string) => {
    const { symptoms, triggers } = analyzeUserMessage(userMessage);
    
    // Update symptoms and context
    const newSymptoms = [...new Set([...state.userSymptoms, ...symptoms])];
    const newExchangeCount = state.exchangeCount + 1;
    
    // Determine next step
    let nextStep = state.step;
    let readyForResources = state.readyForResources;
    
    if (triggers.length > 0 || (newExchangeCount >= 4 && symptoms.length > 0)) {
      readyForResources = true;
      nextStep = 'resource_introduction';
    } else if (state.step === 'initiation') {
      nextStep = 'initial_validation';
    } else if (state.step === 'initial_validation') {
      nextStep = 'active_listening';
    } else if (state.step === 'active_listening' && newExchangeCount >= 2) {
      nextStep = 'symptom_gathering';
    }
    
    // Update state
    updateState({
      step: nextStep,
      userSymptoms: newSymptoms,
      exchangeCount: newExchangeCount,
      readyForResources,
      userContext: {
        ...state.userContext,
        lastUserMessage: userMessage,
        detectedSymptoms: symptoms,
        detectedTriggers: triggers
      }
    });
    
    return generateBotResponse(userMessage, { 
      ...state, 
      step: nextStep, 
      userSymptoms: newSymptoms,
      exchangeCount: newExchangeCount,
      readyForResources 
    });
  }, [state, updateState, generateBotResponse, analyzeUserMessage]);

  const confirmResourceInterest = useCallback(() => {
    updateState({ step: 'resource_presentation' });
    return mockResources.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }, [updateState]);

  const continueConversation = useCallback(() => {
    updateState({ step: 'post_resource' });
    return "Is there anything else that might be helpful?";
  }, [updateState]);

  const offerTracking = useCallback(() => {
    return "Would you like me to remind you to track how these suggestions work for you?";
  }, []);

  return {
    state,
    processMessage,
    confirmResourceInterest,
    continueConversation,
    offerTracking,
    updateState
  };
};