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

  const analyzeUserMessage = useCallback((message: string): { 
    category: keyof Omit<UserContext, 'meaningfulExchanges' | 'gatheringComplete'> | null,
    isMeaningful: boolean 
  } => {
    const lowerMessage = message.toLowerCase();
    
    // Check if it's a meaningful message (not just yes/no)
    const isMeaningful = message.trim().length > 10 && 
      !['yes', 'no', 'maybe', 'ok', 'okay', 'sure', 'alright'].includes(message.trim().toLowerCase());

    // Categorize the message
    const symptomKeywords = ['pain', 'headache', 'hot flash', 'sweating', 'tired', 'sleep', 'mood', 'period', 'weight', 'joint', 'brain fog', 'memory'];
    const patternKeywords = ['time', 'day', 'night', 'month', 'cycle', 'when', 'after', 'before', 'during'];
    const impactKeywords = ['work', 'life', 'relationship', 'feel', 'affect', 'difficult', 'challenge', 'struggle'];
    const medicalKeywords = ['doctor', 'medication', 'supplement', 'treatment', 'medical', 'healthcare', 'prescription'];

    if (symptomKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return { category: 'symptoms', isMeaningful };
    }
    if (patternKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return { category: 'patterns', isMeaningful };
    }
    if (impactKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return { category: 'impact', isMeaningful };
    }
    if (medicalKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return { category: 'medicalContext', isMeaningful };
    }

    return { category: null, isMeaningful };
  }, []);

  const updateUserContext = useCallback((message: string) => {
    const analysis = analyzeUserMessage(message);
    
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
      
      // Check if gathering is complete
      newContext.gatheringComplete = newContext.meaningfulExchanges >= 5;
      
      return newContext;
    });
    
    return analysis;
  }, [analyzeUserMessage]);

  const generateMorphiResponse = useCallback((userMessage: string, analysis: ReturnType<typeof analyzeUserMessage>) => {
    const { category, isMeaningful } = analysis;
    
    // Stage progression logic
    if (stage === ConversationStage.INITIATION && isMeaningful) {
      setStage(ConversationStage.VALIDATION);
    } else if (stage === ConversationStage.VALIDATION && isMeaningful) {
      setStage(ConversationStage.ACTIVE_LISTENING);
    } else if (stage === ConversationStage.ACTIVE_LISTENING && userContext.meaningfulExchanges >= 2) {
      setStage(ConversationStage.SYMPTOM_GATHERING);
    } else if (stage === ConversationStage.SYMPTOM_GATHERING && userContext.gatheringComplete) {
      setStage(ConversationStage.TRANSITION_TRIGGERS);
    }

    // Generate response based on stage
    switch (stage) {
      case ConversationStage.VALIDATION:
        const validation = validationResponses[Math.floor(Math.random() * validationResponses.length)];
        return `${validation} Thank you for sharing this with me. I'd love to learn more about what you're experiencing.`;
      
      case ConversationStage.ACTIVE_LISTENING:
        const relevantResearch = morphusResearch.find(research => 
          research.keywords.some(keyword => userMessage.toLowerCase().includes(keyword))
        );
        const reflection = reflectionPhrases[Math.floor(Math.random() * reflectionPhrases.length)];
        const researchText = relevantResearch ? 
          ` According to Morpheus research, ${relevantResearch.statistic.toLowerCase()}.` : '';
        
        return `${reflection} you're going through some significant changes, and ${relevantResearch?.context || 'this is completely understandable'}.${researchText} You mentioned this started recently - anything else you've noticed changing around that time?`;
      
      case ConversationStage.SYMPTOM_GATHERING:
        if (category && followUpQuestions[category]) {
          const questions = followUpQuestions[category];
          const question = questions[Math.floor(Math.random() * questions.length)];
          return question;
        }
        return "Can you tell me more about how this has been affecting you?";
      
      case ConversationStage.TRANSITION_TRIGGERS:
        const userSymptoms = userContext.symptoms.join(', ');
        return `Based on what you've shared about ${userSymptoms || 'your experiences'}, I've found some resources that have helped other women with similar experiences. Would you like me to share some suggestions you could explore?`;
      
      default:
        return "I'm here to listen and support you. Tell me more about what you're experiencing.";
    }
  }, [stage, userContext]);

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