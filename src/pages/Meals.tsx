import { AnalysisFeedback } from "@/components/AddMeal/AnalysisFeedback";
import { ImageInputMode } from "@/components/AddMeal/ImageInputMode";
import { ModeSelector } from "@/components/AddMeal/ModeSelector";
import { ReviewScreen } from "@/components/AddMeal/ReviewScreen";
import { TextInputMode } from "@/components/AddMeal/TextInputMode";
import { useI18n } from "@/contexts/I18nContext";
import { useMeals } from "@/contexts/MealsContext";
import { usePreferences } from "@/contexts/PreferenceContext";
import { useMealAnalysis } from "@/contexts/useMealAnalysis";
import type { FoodItem } from "@/types";
import type { LocalAnalysisResult } from "@/types/addMeal";
import type { MealInput } from "@/types/gemini";
import { Button, VStack } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

export const MealsPage = () => {
  const { t } = useI18n();
  const { preferences } = usePreferences();
  const { meals, addMeal, removeMeal } = useMeals();
  const { analyze, reset, isAnalyzing, result, guardrailMsg, errorMsg } =
    useMealAnalysis(preferences);

  const [mode, setMode] = useState<"text" | "image">("text");
  const [textInput, setTextInput] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(
    "image/jpeg",
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editableResult, setEditableResult] =
    useState<LocalAnalysisResult | null>(null);

  useEffect(() => {
    setEditableResult(result);
  }, [result]);

  const onImageSelect = (base64WithoutPrefix: string, mimeType: string) => {
    setImageBase64(base64WithoutPrefix);
    setImageMimeType(mimeType);
    setImagePreview(`data:${mimeType};base64,${base64WithoutPrefix}`);
  };

  const onImageClear = () => {
    setImageBase64(null);
    setImageMimeType(null);
    setImagePreview(null);
  };

  const onAnalyse = useCallback(() => {
    if (
      (mode === "text" && !textInput.trim()) ||
      (mode === "image" && !imageBase64)
    ) {
      return;
    }

    const input: MealInput =
      mode == "text"
        ? { type: "text", text: textInput }
        : {
            type: "image",
            base64: imageBase64 as string,
            mimeType: imageMimeType as string,
          };

    analyze(input);
  }, [mode, textInput, imageBase64, imageMimeType, analyze]);

  const onUpdateItem = (
    id: string,
    key: string,
    value: FoodItem[keyof FoodItem],
  ) => {
    setEditableResult((prev) => {
      if (!prev) return prev;

      const updateItems = prev?.items.map((item) =>
        item.id === id ? { ...item, [key]: value } : item,
      );

      return {
        ...prev,
        items: updateItems,
        totalGrams: updateItems.reduce((sum, item) => sum + item.weight_g, 0),
      };
    });
  };

  const onRemoveItem = (id: string) => {
    setEditableResult((prev) => {
      if (!prev) return prev;

      const updateItems = prev.items.filter((item) => item.id !== id);

      return {
        ...prev,
        items: updateItems,
        totalGrams: updateItems.reduce((sum, item) => sum + item.weight_g, 0),
      };
    });
  };

  const onAddCustomItem = () => {
    const newItem: FoodItem = {
      id: crypto.randomUUID(),
      name: "New",
      weight_g: 200,
      protein_g: 0,
      carbs_g: 0,
      fat_g: 0,
      calories: 0,
    };

    setEditableResult((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        items: [...(prev?.items || []), newItem],
        totalGrams: (prev?.totalGrams || 0) + newItem.weight_g,
      };
    });
  };

  const onSave = useCallback(() => {
    if (!editableResult) return;

    addMeal({
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      name: editableResult.items
        .map((i) => i.name)
        .join(", ")
        .slice(0, 60),
      totalGrams: editableResult.totalGrams,
      items: editableResult.items,
      recommendations: editableResult.recommendations,
      attentionPoints: editableResult.attentionPoints,
      imageUrl: mode === "image" && imagePreview ? imagePreview : undefined,
    });

    reset();
    setEditableResult(null);
    setTextInput("");
    setImageBase64(null);
    setImageMimeType(null);
    setImagePreview(null);
  }, [editableResult, addMeal, reset, mode, imagePreview]);

  const onCancel = useCallback(() => {
    reset();
    setEditableResult(null);
  }, [reset]);

  if (editableResult) {
    return (
      <ReviewScreen
        analysis={editableResult}
        onUpdateItem={onUpdateItem}
        onRemoveItem={onRemoveItem}
        onAddCustomItem={onAddCustomItem}
        onCancel={onCancel}
        onSave={onSave}
      />
    );
  }

  return (
    <VStack gap={5} align="stretch">
      <ModeSelector mode={mode} onChange={setMode} />

      {mode === "text" && (
        <TextInputMode value={textInput} onChange={setTextInput} />
      )}

      {mode === "image" && (
        <ImageInputMode
          preview={imagePreview}
          onImageSelect={onImageSelect}
          onClear={onImageClear}
        />
      )}

      <AnalysisFeedback errorMsg={errorMsg} guardrailMsg={guardrailMsg} />

      <Button
        size="lg"
        bg={isAnalyzing ? "brand.500/70" : "brand.500"}
        color="white"
        borderRadius="lg"
        fontWeight="semibold"
        _hover={{ bg: "brand.600" }}
        disabled={
          isAnalyzing || (mode === "text" ? !textInput.trim() : !imageBase64)
        }
        onClick={onAnalyse}
      >
        {isAnalyzing ? t("analyzing") : t("analyzeBtn")}
      </Button>
    </VStack>
  );
};
