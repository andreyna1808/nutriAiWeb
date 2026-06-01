import { useI18n } from "@/contexts/I18nContext"
import type { Meal } from "@/types"
import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react"
import { MdAdd } from "react-icons/md"
import { MealList } from "./MealList"
import { EmptyMeals } from "./EmptyMeals"

interface MealSectionProps {
    meals: Meal[]
    onRemove: (id: string) => void
    onAdd: () => void
}

export const MealSection = ({ meals, onRemove, onAdd }: MealSectionProps) => {
    const { t } = useI18n();

    return (
        <Box>
            <Flex justify="space-between" align="center" mb={4}>
                <HStack gap={2}>
                    <Text fontSize="lg" fontWeight="bold" color="app.text">
                        {t('mealHistory')}:
                    </Text>
                    <Text
                        fontSize="lg"
                        color="app.textMuted"
                        fontWeight="bold"
                    >
                        {meals?.length} {t('meals')}
                    </Text>
                </HStack>

                <Button
                    size="sm"
                    bg="transparent"
                    color="brand.500"
                    _hover={{ bg: 'brand.500/30' }}
                    onClick={onAdd}
                >
                    <MdAdd /> {t('addMeal')}
                </Button>
            </Flex>

            {meals?.length > 0 ? (
                <MealList meals={meals} onRemove={onRemove} />
            ) : (
                <EmptyMeals onAddMeal={onAdd} />
            )}


        </Box>
    )
}