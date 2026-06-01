import type { FoodItem } from '@/types';

export interface LocalAnalysisResult {
  totalGrams: number;
  recommendations: string;
  attentionPoints: string;
  items: (FoodItem & { id: string })[];
}