export interface GeminiResult {
  valid:           boolean
  recusalMessage:  String
  totalGrams:      number
  items: {
    name:      string
    weight_g:  number
    protein_g: number
    carbs_g:   number
    fat_g:     number
    calories:  number
  }[]
  recommendations: string
  attentionPoints: string
}

export type MealInput =
  | { type: 'text';  text: string }
  | { type: 'image'; base64: string; mimeType: string }