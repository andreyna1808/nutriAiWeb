import { useMemo, useCallback } from 'react';
import { Box, Grid, VStack, Text, Flex } from '@chakra-ui/react';
import { MdMonitor, MdLocalFireDepartment, MdFitnessCenter } from 'react-icons/md';
import { useI18n } from '@/contexts/I18nContext';
import { usePreferences } from '@/contexts/PreferenceContext';
import { useMeals } from '@/contexts/MealsContext';
import { calculateNutritionTargets, getImcClassification } from '@/utils/nutrition';
import { macros } from '@/utils/dashboard';
import type { AppTab } from '@/types';
import { MetricCard } from './MetricCard';
import { MacroProgress } from './MacroProgress';
import { MealSection } from './MealSection';

interface DashboardPageProps {
  onNavigate: (tab: AppTab) => void;
}

export const DashboardPage = ({ onNavigate }: DashboardPageProps) => {
  const { t } = useI18n();
  const { preferences } = usePreferences();
  const { todayMeals, removeMeal } = useMeals();

  const targets = useMemo(
    () => calculateNutritionTargets(preferences.profile!),
    [preferences.profile]
  );

  const imc = useMemo(() => getImcClassification(targets.imc), [targets.imc]);

  const totals = useMemo(() => {
    return todayMeals.reduce(
      (acc, meal) => {
        meal.items.forEach(item => {
          acc.calories += item.calories;
          acc.protein += item.protein_g;
          acc.carbs += item.carbs_g;
          acc.fats += item.fat_g;
        });
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  }, [todayMeals]);

  const handleRemoveMeal = useCallback((id: string) => {
    const meal = todayMeals.find(m => m.id === id);
    if (meal) removeMeal(meal);
  }, [todayMeals, removeMeal]);

  return (
    <VStack gap={6} align="stretch">
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} gap={4}>
        <MetricCard
          label={t('yourImc')}
          value={targets.imc}
          icon={<MdMonitor />}
          iconBg="purple.500"
          badge={
            <Box
              mt={1}
              px={2} py={0.5}
              borderRadius="full"
              display="inline-block"
              fontSize="2xs"
              fontWeight="bold"
              bg={`${imc.colorScheme}.100`}
              color={`${imc.colorScheme}.700`}
            >
              {imc.label}
            </Box>
          }
        />
        <MetricCard
          label={t('bmrLabel')}
          value={targets.bmr}
          unit="kcal"
          icon={<MdLocalFireDepartment />}
          iconBg="orange.500"
        />
        <MetricCard
          label={t('tdeeLabel')}
          value={targets.tdee}
          unit="kcal"
          icon={<MdFitnessCenter />}
          iconBg="brand.500"
        />
      </Grid>

      <Box
        bg="app.card"
        borderRadius="3xl"
        borderWidth="1px"
        borderColor="app.border"
        p={6}
      >
        <Flex justify="space-between" align="center" mb={6} pb={5} borderBottomWidth="1px" borderColor="app.border">
          <Box>
            <Text fontSize="xs" color="app.textMuted" mb={0.5}>
              {t('todayProgress')}
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="app.text">
              {t('goalTracking')}
            </Text>
          </Box>
          <Box
            px={3} py={1.5}
            bg="brand.500/10"
            borderRadius="xl"
            borderWidth="1px"
            borderColor="brand.500/20"
          >
            <Text fontSize="xs" fontWeight="bold" color="brand.500">
              {t(`goal${preferences.goal.charAt(0).toUpperCase() + preferences.goal.slice(1)}` as any)}
            </Text>
          </Box>
        </Flex>

        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr 1fr' }} gap={4}>
          {(Object.keys(macros) as Array<keyof typeof macros>).map(name => (
            <MacroProgress
              key={name}
              name={name}
              current={totals[name]}
              target={targets[name]}
            />
          ))}
        </Grid>
      </Box>

      <MealSection
        meals={todayMeals}
        onAdd={() => onNavigate('meals')}
        onRemove={handleRemoveMeal}
      />
    </VStack>
  );
};