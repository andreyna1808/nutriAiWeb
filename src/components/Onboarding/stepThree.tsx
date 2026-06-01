import { useI18n } from "@/contexts/I18nContext";
import type { UserProfile } from "@/types";
import { calculateNutritionTargets, getImcClassification } from "@/utils/nutrition";
import { Box, VStack, Text, Grid, Button, HStack } from "@chakra-ui/react";

interface StepThreeProps {
    profile: UserProfile;
    onFinish: () => void
    onBack: () => void
}

export const StepThree = ({ profile, onFinish, onBack }: StepThreeProps) => {
    const { t } = useI18n();
    const targets = calculateNutritionTargets(profile);
    const imc = getImcClassification(targets.imc);

    const macros = [
        { label: t('protein'), value: `${targets.protein}g`, color: 'blue.400' },
        { label: t('carbs'), value: `${targets.carbs}g`, color: 'orange.400' },
        { label: t('fats'), value: `${targets.fats}g`, color: 'red.400' },
    ];

    return (
        <VStack gap={5} align="stretch">
            <Box textAlign="center">
                <Text fontWeight="bold" fontSize="md" color="app.text">
                    {t('step3Title')}
                </Text>
                <Text fontSize="xs" color="app.textMuted" mt={0.5}>
                    {t('step3Subtitle')}
                </Text>
            </Box>

            <Grid templateColumns="1fr 1fr" gap={3}>
                {/* Card IMC */}
                <Box
                    p={4}
                    textAlign="center"
                    bg="app.bg"
                    borderRadius="2xl"
                    borderWidth="1px"
                    borderColor="app.border"
                >
                    <Text fontSize="xs" color="app.textMuted" fontWeight="bold" mb={1}>
                        {t('yourImc')}
                    </Text>
                    <Text fontSize="2xl" fontWeight="black" color="app.text">
                        {targets.imc}
                    </Text>
                    <Box
                        mt={1}
                        px={2}
                        py={0.5}
                        borderRadius="full"
                        display="inline-block"
                        fontSize="2xs"
                        fontWeight="bold"
                        bg={`${imc.colorScheme}.100`}
                        color={`${imc.colorScheme}.700`}
                    >
                        {imc.label}
                    </Box>
                </Box>

                {/* Card meta calórica (destaque) */}
                <Box p={4} textAlign="center" bg="brand.500" borderRadius="2xl">
                    <Text fontSize="xs" color="whiteAlpha.800" fontWeight="bold" mb={1}>
                        {t('dailyGoal')}
                    </Text>
                    <Text fontSize="2xl" fontWeight="black" color="white">
                        {targets.calories}
                    </Text>
                    <Text fontSize="xs" color="whiteAlpha.700">
                        {t('dailyKcal')}
                    </Text>
                </Box>
            </Grid>

            {/* BMR e TDEE */}
            <Box p={4} bg="app.bg" borderRadius="2xl" borderWidth="1px" borderColor="app.border">
                <HStack justify="space-between" mb={2}>
                    <Text fontSize="xs" color="app.textMuted">
                        {t('bmrLabel')}
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" color="app.text">
                        {targets.bmr} kcal
                    </Text>
                </HStack>
                <HStack justify="space-between">
                    <Text fontSize="xs" color="app.textMuted">
                        {t('tdeeLabel')}
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" color="app.text">
                        {targets.tdee} kcal
                    </Text>
                </HStack>
            </Box>

            {/* Macros em 3 colunas */}
            <Grid templateColumns="1fr 1fr 1fr" gap={3}>
                {macros.map(({ label, value, color }) => (
                    <Box
                        key={label}
                        p={3}
                        textAlign="center"
                        bg="app.bg"
                        borderRadius="xl"
                        borderWidth="1px"
                        borderColor="app.border"
                    >
                        <Text fontSize="2xs" color="app.textMuted" mb={1}>
                            {label}
                        </Text>
                        <Text fontSize="lg" fontWeight="black" color={color}>
                            {value}
                        </Text>
                    </Box>
                ))}
            </Grid>

            <HStack gap={3} mt={2}>
                <Button
                    flex={1}
                    size="lg"
                    bg="app.bg"
                    color="app.text"
                    borderWidth="1px"
                    borderColor="app.border"
                    borderRadius="2xl"
                    _hover={{ bg: 'app.card' }}
                    onClick={onBack}
                >
                    {t('adjustData')}
                </Button>
                <Button
                    flex={1}
                    size="lg"
                    bg="brand.500"
                    color="white"
                    borderRadius="2xl"
                    fontWeight="bold"
                    _hover={{ bg: 'brand.600' }}
                    boxShadow="0 0px 10px 0px var(--chakra-colors-brand-500)"
                    onClick={onFinish}
                >
                    {t('start')}
                </Button>
            </HStack>
        </VStack>
    );
}