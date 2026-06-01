import type { MealItemProps } from "@/types/dashboard"
import { formatMealTime, getMealTotals } from "@/utils/dashboard"
import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { memo } from "react"
import { BadgeMacro } from "./BadgeMacro";
import { MdDelete } from "react-icons/md";

export const MealItem = memo(({ meal, onRemove }: MealItemProps) => {
    const { calories, protein, carbs, fats, totalGrams } = getMealTotals(meal);
    const timeLabel = formatMealTime(meal.timestamp);

    return (
        <Box
            bg="app.card"
            borderRadius="xl"
            borderWidth="1px"
            borderColor="app.border"
            overflow="hidden"
            _hover={{ borderColor: "brand.500/20" }}
            transition='all 0.2s'
        >
            <Flex
                p={4}
                align="center"
                justify="space-between"
                gap={4}
            >
                <Flex
                    align='start'
                    gap={4}
                    flex={1}
                    minW={0}
                >
                    {meal.imageUrl && (
                        <img
                            src={meal.imageUrl}
                            alt={meal.name}
                            loading='lazy'
                            decoding='async'
                            style={{
                                width: '56px',
                                height: '56px',
                                objectFit: 'cover',
                                borderRadius: '8px'
                            }}
                        />
                    )}

                    <Box>
                        <Text fontSize="xs" color="app.textMuted" mb={1}>
                            {timeLabel}
                        </Text>
                        <Text
                            fontSize="md"
                            fontWeight="bold"
                            color="app.text"
                            overflow={'hidden'}
                            textOverflow={'ellipsis'}
                            whiteSpace={'nowrap'}
                        >
                            {meal.name}
                        </Text>
                        <Text fontSize="xs" color="app.textMuted" mb={1}>
                            {totalGrams}g estimados
                        </Text>
                    </Box>
                </Flex>

                <HStack>
                    <BadgeMacro name="calories" current={calories} />
                    <BadgeMacro name="protein" current={protein} />
                    <BadgeMacro name="carbs" current={carbs} />
                    <BadgeMacro name="fats" current={fats} />
                    <Button
                        size='xs'
                        bg='transparent'
                        color='red.500'
                        _hover={{ color: 'red.700' }}
                        transition='all 0.2s'
                        onClick={() => onRemove(meal.id)}

                    >
                        <MdDelete />
                    </Button>
                </HStack>
            </Flex>

            {meal.recommendations && (
                <HStack align={'start'} gap={2} flex={1} >
                    <Text fontSize={'lg'}>💡</Text>
                    <Text fontSize={'xs'} color='app.textMuted'>{meal.recommendations}</Text>
                </HStack>
            )}

            {meal.attentionPoints && (
                <HStack align={'start'} gap={2} flex={1} >
                    <Text fontSize={'lg'}>⚠️</Text>
                    <Text fontSize={'xs'} color='app.textMuted'>{meal.attentionPoints}</Text>
                </HStack>
            )}
        </Box>
    )
})