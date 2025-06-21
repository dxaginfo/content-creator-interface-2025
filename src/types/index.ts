export type WritingStyle = 
  | "tim-ferriss" 
  | "tim-ferriss-james-clear" 
  | "shane-parrish" 
  | "mark-manson" 
  | "david-perell";

export interface GeneratedContent {
  id: string;
  timestamp: string;
  prompt: string;
  style: WritingStyle;
  content: string;
}

export interface HistoryItem extends GeneratedContent {}