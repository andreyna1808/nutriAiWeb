export interface FoodItem {
    id: string
    name: string
    weight_g: number
    protein_g: number
    carbs_g: number
    fat_g: number
    calories: number
}
export interface Meal {
    id: string
    timestamp: number
    name: string
    totalGrams: number
    items: FoodItem[]
    recommendations: string
    attentionPoints: string
    imageUrl?: string
}

export interface UserProfile {
    weight: number
    height: number
    age: number
    gender: 'male' | 'female'
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
    goal: 'lose' | 'gain' | 'maintain'
}

export interface UserPreferences {
    goal: 'lose' | 'gain' | 'maintain'
    theme: 'system' | 'dark' | 'light'
    language: 'pt'
    profile?: UserProfile
}

export interface AnalysisResult {
    totalGrams: number
    items: FoodItem[]
    recommendations: string
    attentionPoints: string
}

export interface NutritionTargets {
    calories: number
    protein: number
    carbs: number
    fats: number
    imc: number
    bmr: number
    tdee: number
}

export type AppTab = "dashboard" | "meals" | "settings";