import { useState, useCallback } from 'react';
import type { UserPreferences } from '@/types';
import type { MealInput } from '@/types/gemini';
import type { LocalAnalysisResult } from '@/types/addMeal';
import { getAnalyseMeal } from '@/services/gemini';

export const useMealAnalysis = (preferences: UserPreferences) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<LocalAnalysisResult | null>(null);
  const [guardrailMsg, setGuardrailMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const analyze = useCallback(async (input: MealInput) => {
    setIsAnalyzing(true);
    setGuardrailMsg(null);
    setErrorMsg(null);
    setResult(null);

    try {
      const geminiResult = await getAnalyseMeal(input, preferences);

      if (!geminiResult.valid) {
        setGuardrailMsg(geminiResult.recusalMessage || '...');
        return;
      }

      const itemsWithId = geminiResult.items.map((item: any) => ({
        ...item,
        id: crypto.randomUUID(),
      }));

      setResult({
        totalGrams: geminiResult.totalGrams,
        recommendations: geminiResult.recommendations,
        attentionPoints: geminiResult.attentionPoints,
        items: itemsWithId,
      });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : '...');
    } finally {
      setIsAnalyzing(false);
    }
  }, [preferences]);

  const reset = useCallback(() => {
    setResult(null);
    setGuardrailMsg(null);
    setErrorMsg(null);
  }, []);

  return { analyze, reset, isAnalyzing, result, guardrailMsg, errorMsg };
}