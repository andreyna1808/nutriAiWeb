import type { Meal } from '@/types';

export interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  iconBg: string;
  badge?: React.ReactNode;
}

export type NameProps = "calories" | "carbs" | "fats" | "protein";

export interface MacroProgressProps {
  name: NameProps;
  current: number;
  target: number;
}

export interface MacroProgressInfoProps {
  label: NameProps;
  unit: string;
  color: string;
  textColor: string;
}

export interface MacroProps {
  calories: MacroProgressInfoProps;
  carbs: MacroProgressInfoProps;
  fats: MacroProgressInfoProps;
  protein: MacroProgressInfoProps;
}

export interface MealItemProps {
  meal: Meal;
  onRemove: (id: string) => void;
}

export interface MealListProps {
  meals: Meal[];
  onRemove: (id: string) => void;
}