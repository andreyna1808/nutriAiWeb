import { Box, Button, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { MdAdd, MdClose, MdSave } from "react-icons/md";
import { useI18n } from "@/contexts/I18nContext";
import type { FoodItem } from "@/types";
import { ReviewItem } from "./ReviewItem";
import type { LocalAnalysisResult } from "@/types/addMeal";
import { BadgeMacro } from "../Dashboard/BadgeMacro";

interface ReviewScreenProps {
  analysis: LocalAnalysisResult;
  onUpdateItem: (
    id: string,
    key: string,
    value: FoodItem[keyof FoodItem],
  ) => void;
  onRemoveItem: (id: string) => void;
  onAddCustomItem: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export const ReviewScreen = ({
  analysis,
  onUpdateItem,
  onRemoveItem,
  onAddCustomItem,
  onCancel,
  onSave,
}: ReviewScreenProps) => {
  const { t } = useI18n();
  const totalCals = analysis?.items?.reduce((s, i) => s + i.calories, 0);
  const totalProtein = analysis?.items?.reduce((s, i) => s + i.protein_g, 0);
  const totalCarbs = analysis?.items?.reduce((s, i) => s + i.carbs_g, 0);
  const totalFats = analysis?.items?.reduce((s, i) => s + i.fat_g, 0);

  return (
    <VStack gap={5} align="stretch">
      <Box>
        <Text fontSize="xl" fontWeight="bold" color="app.text">
          {t("reviewTitle")}
        </Text>
        <Text fontSize="sm" color="app.textMuted">
          {t("reviewSubtitle")}
        </Text>
      </Box>

      <Grid templateColumns="repeat(4, 1fr)" gap={3}>
        <BadgeMacro name="calories" current={totalCals} />
        <BadgeMacro name="protein" current={totalProtein} />
        <BadgeMacro name="carbs" current={totalCarbs} />
        <BadgeMacro name="fats" current={totalFats} />
      </Grid>

      {(analysis.recommendations || analysis.attentionPoints) && (
        <Box
          p={4}
          bg="app.card"
          borderRadius="2xl"
          borderWidth="1px"
          borderColor="app.border"
        >
          {analysis.recommendations && (
            <HStack align="start" gap={2} mb={3}>
              <Text fontSize="xl">💡</Text>
              <Text fontSize="sm" color="app.textMuted">
                {analysis.recommendations}
              </Text>
            </HStack>
          )}
          {analysis.attentionPoints && (
            <HStack align="start" gap={2}>
              <Text fontSize="xl">⚠️</Text>
              <Text fontSize="sm" color="app.textMuted">
                {analysis.attentionPoints}
              </Text>
            </HStack>
          )}
        </Box>
      )}

      <VStack gap={3} align="stretch">
        {analysis.items.map((item) => (
          <ReviewItem
            key={item.id}
            item={item}
            onUpdate={onUpdateItem}
            onRemove={onRemoveItem}
          />
        ))}
      </VStack>

      <Button
        variant="outline"
        borderStyle="dashed"
        borderColor="app.border"
        color="app.textMuted"
        borderRadius="xl"
        _hover={{ borderColor: "brand.500", color: "brand.500" }}
        onClick={onAddCustomItem}
      >
        <MdAdd /> {t("addItem")}
      </Button>

      <HStack gap={3}>
        <Button
          flex={1}
          size="lg"
          bg="app.bg"
          color="app.text"
          borderWidth="1px"
          borderColor="app.border"
          borderRadius="2xl"
          _hover={{ bg: "app.card" }}
          onClick={onCancel}
        >
          <MdClose /> {t("cancel")}
        </Button>
        <Button
          flex={2}
          size="lg"
          bg="brand.500"
          color="white"
          borderRadius="2xl"
          fontWeight="bold"
          _hover={{ bg: "brand.600" }}
          boxShadow="0 8px 20px -4px var(--chakra-colors-brand-500)"
          onClick={onSave}
        >
          <MdSave /> {t("saveMeal")}
        </Button>
      </HStack>
    </VStack>
  );
};
