import { memo } from 'react';
import { VStack } from '@chakra-ui/react';
import { MealItem } from './MealItem';
import type { MealListProps } from '@/types/dashboard';

export const MealList = memo(({ meals, onRemove }: MealListProps) => {
  return (
    <VStack gap={3} align="stretch">
      {meals.map(meal => (
        <MealItem key={meal.id} meal={meal} onRemove={onRemove} />
      ))}
    </VStack>
  );
});