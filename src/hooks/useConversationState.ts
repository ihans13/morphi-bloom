import { useState, useCallback } from "react";
import { ConversationStage, UserContext, Resource } from "@/lib/conversationTypes";
import { morphusResearch, mockResources, followUpQuestions, validationResponses, reflectionPhrases } from "@/lib/morphusData";

export const useConversationState = () => {
  const [stage, setStage] = useState<ConversationStage>(ConversationStage.INITIATION);
  const [userContext, setUserContext] = useState<UserContext>({
    symptoms: [],
    patterns: [],
    impact: [],
    medicalContext: [],
    meaningfulExchanges: 0,
    gatheringComplete: false
  });
  
  const [conversationMemory, setConversationMemory] = useState<string[]>([]);
  const [emotionalTone, setEmotionalTone] = useState<'neutral' | 'concerned' | 'anxious' | 'hopeful'>('neutral');

  const analyzeUserMessage = useCallback((message: string): { 
    category: keyof Omit<UserContext, 'meaningfulExchanges' | 'gatheringComplete'> | null,
    isMeaningful: boolean,
    emotionalIndicators: string[],
    readinessSignals: string[]
  } => {
    const lowerMessage = message.toLowerCase();
    
    // Enhanced meaningful message detection
    const shortResponses = ['yes', 'no', 'maybe', 'ok', 'okay', 'sure', 'alright', 'yeah', 'yep', 'nope'];
    const isMeaningful = message.trim().length > 10 && 
      !shortResponses.includes(message.trim().toLowerCase()) &&
      !/^(thanks?|thank you|got it|i see)\.?$/i.test(message.trim());

    // Detect emotional indicators
    const anxietyWords = ['worried', 'scared', 'anxious', 'nervous', 'panic', 'overwhelmed'];
    const frustrationWords = ['frustrated', 'angry', 'upset', 'annoyed', 'fed up', 'tired of'];
    const hopeWords = ['hope', 'better', 'improve', 'help', 'solution', 'relief'];
    const concernWords = ['concerning', 'worried about', 'strange', 'unusual', 'different'];
    
    const emotionalIndicators = [];
    if (anxietyWords.some(word => lowerMessage.includes(word))) emotionalIndicators.push('anxiety');
    if (frustrationWords.some(word => lowerMessage.includes(word))) emotionalIndicators.push('frustration');
    if (hopeWords.some(word => lowerMessage.includes(word))) emotionalIndicators.push('hope');
    if (concernWords.some(word => lowerMessage.includes(word))) emotionalIndicators.push('concern');

    // Detect readiness for resources/next steps
    const readinessSignals = [];
    const helpSeekingPhrases = ['what should i do', 'what can help', 'need help', 'suggestions', 'advice', 'recommendations'];
    const informationSeeking = ['tell me more', 'learn about', 'understand better', 'explain', 'what is'];
    const actionOriented = ['want to try', 'ready to', 'willing to', 'how do i', 'where do i start'];
    
    if (helpSeekingPhrases.some(phrase => lowerMessage.includes(phrase))) readinessSignals.push('help-seeking');
    if (informationSeeking.some(phrase => lowerMessage.includes(phrase))) readinessSignals.push('information-seeking');
    if (actionOriented.some(phrase => lowerMessage.includes(phrase))) readinessSignals.push('action-oriented');

    // Enhanced categorization with more keywords
    const symptomKeywords = [
      'pain', 'headache', 'migraine', 'hot flash', 'sweating', 'tired', 'exhausted', 'fatigue',
      'sleep', 'insomnia', 'wake up', 'mood', 'depression', 'anxiety', 'irritable', 'emotional',
      'period', 'irregular', 'cycle', 'bleeding', 'flow', 'weight', 'gain', 'metabolism',
      'joint', 'aches', 'stiff', 'brain fog', 'memory', 'concentration', 'focus', 'forgetful'
    ];
    const patternKeywords = [
      'time', 'day', 'night', 'morning', 'evening', 'month', 'cycle', 'when', 'after', 'before', 
      'during', 'always', 'never', 'sometimes', 'often', 'triggers', 'worse', 'better'
    ];
    const impactKeywords = [
      'work', 'job', 'career', 'life', 'relationship', 'family', 'friends', 'feel', 'affect', 
      'difficult', 'challenge', 'struggle', 'embarrassing', 'isolating', 'overwhelming'
    ];
    const medicalKeywords = [
      'doctor', 'physician', 'gynecologist', 'medication', 'supplement', 'treatment', 'therapy',
      'medical', 'healthcare', 'prescription', 'hormone', 'hrt', 'natural', 'alternative'
    ];

    let category = null;
    if (symptomKeywords.some(keyword => lowerMessage.includes(keyword))) {
      category = 'symptoms';
    } else if (patternKeywords.some(keyword => lowerMessage.includes(keyword))) {
      category = 'patterns';
    } else if (impactKeywords.some(keyword => lowerMessage.includes(keyword))) {
      category = 'impact';
    } else if (medicalKeywords.some(keyword => lowerMessage.includes(keyword))) {
      category = 'medicalContext';
    }

    return { category, isMeaningful, emotionalIndicators, readinessSignals };
  }, []);

  const updateUserContext = useCallback((message: string) => {
    const analysis = analyzeUserMessage(message);
    
    // Update conversation memory
    setConversationMemory(prev => [...prev.slice(-4), message]);
    
    // Update emotional tone based on indicators
    if (analysis.emotionalIndicators.length > 0) {
      if (analysis.emotionalIndicators.includes('anxiety')) setEmotionalTone('anxious');
      else if (analysis.emotionalIndicators.includes('concern')) setEmotionalTone('concerned');
      else if (analysis.emotionalIndicators.includes('hope')) setEmotionalTone('hopeful');
      else setEmotionalTone('neutral');
    }
    
    setUserContext(prev => {
      const newContext = { ...prev };
      
      if (analysis.isMeaningful) {
        newContext.meaningfulExchanges += 1;
      }
      
      if (analysis.category && analysis.isMeaningful) {
        const category = analysis.category;
        if (!newContext[category].includes(message)) {
          newContext[category] = [...newContext[category], message];
        }
      }
      
      // Enhanced completion detection based on content richness and readiness signals
      const hasRichContext = Object.values(newContext).some(arr => 
        Array.isArray(arr) && arr.length >= 2
      );
      const hasReadinessSignals = analysis.readinessSignals.length > 0;
      
      newContext.gatheringComplete = 
        (newContext.meaningfulExchanges >= 3 && hasRichContext) || 
        (newContext.meaningfulExchanges >= 5) ||
        hasReadinessSignals;
      
      return newContext;
    });
    
    return analysis;
  }, [analyzeUserMessage]);

  const generateMorphiResponse = useCallback((userMessage: string, analysis: ReturnType<typeof analyzeUserMessage>) => {
    const { category, isMeaningful, emotionalIndicators, readinessSignals } = analysis;
    
    // Enhanced stage progression with smoother transitions
    if (stage === ConversationStage.INITIATION && isMeaningful) {
      setStage(ConversationStage.VALIDATION);
    } else if (stage === ConversationStage.VALIDATION && analysis.emotionalIndicators.length > 0) {
      setStage(ConversationStage.ACTIVE_LISTENING);
    } else if (stage === ConversationStage.VALIDATION && userContext.meaningfulExchanges >= 2) {
      setStage(ConversationStage.ACTIVE_LISTENING);
    } else if (stage === ConversationStage.ACTIVE_LISTENING && (userContext.meaningfulExchanges >= 2 || category === 'symptoms')) {
      setStage(ConversationStage.SYMPTOM_GATHERING);
    } else if (stage === ConversationStage.SYMPTOM_GATHERING && (userContext.gatheringComplete || readinessSignals.length > 0)) {
      setStage(ConversationStage.TRANSITION_TRIGGERS);
    }

    // Generate contextual response with memory integration
    const recentContext = conversationMemory.slice(-2).join(' ');
    
    switch (stage) {
      case ConversationStage.VALIDATION:
        const validationResponses = getValidationResponse(emotionalTone, emotionalIndicators);
        const validation = validationResponses[Math.floor(Math.random() * validationResponses.length)];
        return `${validation} Thank you for trusting me with this. I'd love to understand more about what you're going through.`;
      
      case ConversationStage.ACTIVE_LISTENING:
        const relevantResearch = morphusResearch.find(research => 
          research.keywords.some(keyword => userMessage.toLowerCase().includes(keyword))
        );
        const reflection = getReflectionResponse(recentContext, emotionalTone);
        const researchText = relevantResearch ? 
          ` Research shows that ${relevantResearch.statistic.toLowerCase()}, so ${relevantResearch.context.toLowerCase()}.` : '';
        
        const contextualFollow = getContextualFollowUp(userContext, category);
        return `${reflection}${researchText} ${contextualFollow}`;
      
      case ConversationStage.SYMPTOM_GATHERING:
        if (category && followUpQuestions[category]) {
          const questions = getEnhancedFollowUpQuestions(category, userContext, emotionalTone);
          const question = questions[Math.floor(Math.random() * questions.length)];
          return question;
        }
        return getGenericFollowUp(userContext, emotionalTone);
      
      case ConversationStage.TRANSITION_TRIGGERS:
        return getTransitionResponse(userContext, readinessSignals);
      
      default:
        return getInitialResponse(emotionalTone);
    }
  }, [stage, userContext, conversationMemory, emotionalTone]);

  // Helper functions for enhanced responses
  const getValidationResponse = (tone: string, indicators: string[]) => {
    const base = [
      "That sounds really challenging, and it's completely understandable to feel uncertain when your body is changing.",
      "Thank you for sharing this with me - what you're experiencing is so valid.",
      "I hear how this must be affecting you. You're not alone in feeling this way.",
      "It takes courage to talk about these changes. I'm here to listen and support you.",
      "What you're describing resonates with so many women going through similar experiences.",
      "I appreciate you opening up about this. Your feelings and experiences matter."
    ];
    
    if (indicators.includes('anxiety')) {
      return [...base, "I understand this uncertainty can feel overwhelming. Let's take this one step at a time.", "It's natural to feel anxious when our bodies change in unexpected ways."];
    }
    if (indicators.includes('frustration')) {
      return [...base, "I can hear the frustration in what you're sharing, and that's completely valid.", "It's so understandable to feel frustrated when you don't have clear answers."];
    }
    return base;
  };

  const getReflectionResponse = (context: string, tone: string) => {
    const reflections = [
      "It sounds like", "What I'm hearing is that", "From what you've shared, it seems",
      "I understand that you're experiencing", "It seems like you're navigating",
      "What comes through is that", "I'm getting a sense that"
    ];
    
    const baseReflection = reflections[Math.floor(Math.random() * reflections.length)];
    
    if (tone === 'anxious') {
      return `${baseReflection} you're dealing with some concerning changes, and the uncertainty is weighing on you.`;
    }
    if (tone === 'concerned') {
      return `${baseReflection} these new symptoms have you understandably concerned about what's happening.`;
    }
    return `${baseReflection} you're noticing some significant changes in how you feel.`;
  };

  const getContextualFollowUp = (context: UserContext, category: string | null) => {
    if (context.symptoms.length > 0 && category !== 'symptoms') {
      return "Earlier you mentioned some physical changes - are there other aspects of this experience you'd like to explore?";
    }
    if (context.impact.length > 0 && category !== 'impact') {
      return "I'm curious about how these changes might be affecting other areas of your life.";
    }
    return "What else has been on your mind about all of this?";
  };

  const getEnhancedFollowUpQuestions = (category: string, context: UserContext, tone: string) => {
    const base = followUpQuestions[category as keyof typeof followUpQuestions] || [];
    
    if (tone === 'anxious' && category === 'symptoms') {
      return [...base, "I know it can be scary when our bodies feel different - can you help me understand what's been most concerning?"];
    }
    if (tone === 'hopeful' && category === 'medicalContext') {
      return [...base, "It sounds like you're ready to take some positive steps - what kind of support are you hoping to find?"];
    }
    return base;
  };

  const getGenericFollowUp = (context: UserContext, tone: string) => {
    if (tone === 'anxious') return "I know this feels overwhelming. What would be most helpful for us to talk about right now?";
    if (tone === 'hopeful') return "I can sense you're looking for answers. What aspect of this would you like to explore further?";
    return "Can you tell me more about how this has been affecting you?";
  };

  const getTransitionResponse = (context: UserContext, signals: string[]) => {
    const symptoms = context.symptoms.join(', ') || 'your experiences';
    
    if (signals.includes('help-seeking')) {
      return `I can see you're ready for some guidance. Based on everything you've shared about ${symptoms}, I have some resources that have really helped other women in similar situations. Would you like me to share what I've found?`;
    }
    if (signals.includes('action-oriented')) {
      return `It sounds like you're ready to take some steps forward. I've gathered some practical resources based on what you've told me about ${symptoms}. Shall we explore what might work for you?`;
    }
    return `Thank you for sharing so openly about ${symptoms}. I've found some resources that address exactly what you're experiencing. Would you like me to share some suggestions you could explore?`;
  };

  const getInitialResponse = (tone: string) => {
    if (tone === 'anxious') return "I'm here to listen and help you make sense of what you're experiencing. You're in a safe space to share whatever is on your mind.";
    return "I'm here to listen and support you. Tell me more about what you're experiencing.";
  };

  const getRelevantResources = useCallback((userMessage: string, count: number = 1): Resource[] => {
    const keywords = userMessage.toLowerCase().split(' ');
    
    return mockResources
      .map(resource => ({
        ...resource,
        relevanceScore: resource.keywords.reduce((score, keyword) => {
          return score + (keywords.some(k => k.includes(keyword) || keyword.includes(k)) ? 1 : 0);
        }, 0)
      }))
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, count);
  }, []);

  const checkTransitionTriggers = useCallback((message: string): boolean => {
    const triggers = [
      'what should i do',
      'what can help',
      'need to figure this out',
      'what do you recommend',
      'help me',
      'suggestions'
    ];
    
    return triggers.some(trigger => message.toLowerCase().includes(trigger));
  }, []);

  return {
    stage,
    userContext,
    updateUserContext,
    generateMorphiResponse,
    getRelevantResources,
    checkTransitionTriggers,
    setStage
  };
};