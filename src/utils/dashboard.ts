import type { Meal } from '@/types';
import type { MacroProps } from '@/types/dashboard';

export function getMealTotals(meal: Meal) {
  const calories = meal?.items?.reduce((sum, i) => sum + i.calories, 0);
  const protein = meal?.items?.reduce((sum, i) => sum + i.protein_g, 0);
  const carbs = meal?.items?.reduce((sum, i) => sum + i.carbs_g, 0);
  const fats = meal?.items?.reduce((sum, i) => sum + i.fat_g, 0);
  return { calories, protein, carbs, fats, totalGrams: meal.totalGrams };
}

export function formatMealTime(timestamp: number): string {

  if (!timestamp) {
    return '-';
  }

  return new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export const macros: MacroProps = {
  calories: { label: 'calories', unit: 'kcal', color: "orange.500", textColor: "orange.500" },
  carbs: { label: 'carbs', unit: 'g', color: "yellow.400", textColor: "yellow.400" },
  fats: { label: 'fats', unit: 'g', color: "brand.500", textColor: "brand.500" },
  protein: { label: 'protein', unit: 'g', color: "red.400", textColor: "red.400" },
}