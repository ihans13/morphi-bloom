export enum ConversationStage {
  INITIATION = "initiation",
  VALIDATION = "validation", 
  ACTIVE_LISTENING = "active_listening",
  SYMPTOM_GATHERING = "symptom_gathering",
  TRANSITION_TRIGGERS = "transition_triggers",
  RESOURCE_INTRO = "resource_intro",
  RESOURCE_PRESENTATION = "resource_presentation",
  POST_RESOURCE = "post_resource"
}

export interface UserContext {
  symptoms: string[];
  patterns: string[];
  impact: string[];
  medicalContext: string[];
  meaningfulExchanges: number;
  gatheringComplete: boolean;
}

export interface ConversationMessage {
  id: number;
  sender: "user" | "morphi";
  content: string;
  timestamp: Date;
  stage?: ConversationStage;
  resources?: Resource[];
  isTyping?: boolean;
}

export interface Resource {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  type: "article" | "podcast" | "video" | "product";
  category: "articles" | "supplements" | "qna" | "tried";
  keywords: string[];
  relevanceScore: number;
  isPinned?: boolean;
}

export interface MorphusResearch {
  statistic: string;
  context: string;
  keywords: string[];
}