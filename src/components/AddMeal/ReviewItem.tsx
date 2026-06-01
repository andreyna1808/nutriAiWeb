import { useI18n } from "@/contexts/I18nContext";
import type { FoodItem } from "@/types";
import { Box, Button, Flex, Grid, Input, Text } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

interface ReviewItemProps {
  item: FoodItem;
  onRemove: (id: string) => void;
  onUpdate: (id: string, key: string, value: FoodItem[keyof FoodItem]) => void;
}

const inputSyles = {
  bg: "app.bg",
  borderColor: "app.border",
  color: "app.text",
  borderRadius: "lg",
  textAlign: "left",
  _focus: {
    borderColor: "brand.500",
    boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
  },
};

export const ReviewItem = ({ item, onRemove, onUpdate }: ReviewItemProps) => {
  const { t } = useI18n();

  const datas = [
    { key: "weight_g", label: t("weight"), color: "app.txt" },
    { key: "protein_g", label: t("protein"), color: "red.400" },
    { key: "carbs_g", label: t("carbs"), color: "yellow.400" },
    { key: "fat_g", label: t("fats"), color: "brand.500" },
    { key: "calories", label: t("calories"), color: "orange.500" },
  ];

  return (
    <Box
      p={4}
      bg-="app.card"
      borderRadius="2xl"
      borderWidth="1px"
      borderColor="app.border"
    >
      <Input
        value={item?.name}
        onChange={(evt) => onUpdate(item.id, "name", evt.target.value)}
        fontWeight="semibold"
        mb={3}
        {...inputSyles}
      />

      <Grid templateColumns="repeat(5, 1fr)" gap={2}>
        {datas.map(({ key, label, color }) => (
          <Box key={key}>
            <Text fontSize="xs" color={color} fontWeight="bold" mb={0.5}>
              {label}
            </Text>
            <Input
              type="number"
              value={item?.[key as keyof FoodItem]}
              onChange={(evt) => onUpdate(item.id, key, evt.target.value)}
              {...inputSyles}
              color={color}
            />
          </Box>
        ))}
      </Grid>

      <Flex justify="flex-end" mt={3}>
        <Button
          bg="transparent"
          color="red.500"
          _hover={{ color: "red.700" }}
          transition="all 0.2s"
          onClick={() => onRemove(item?.id)}
        >
          <MdDelete size={24} />
        </Button>
      </Flex>
    </Box>
  );
};
