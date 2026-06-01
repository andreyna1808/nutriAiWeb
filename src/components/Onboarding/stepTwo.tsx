import { useI18n } from "@/contexts/I18nContext";
import type { UserProfile } from "@/types";
import { Button, createListCollection, Portal, Select, Text, VStack, Box, HStack } from "@chakra-ui/react";

interface StepTwoProps {
    profile: UserProfile;
    updateProfile: (key: string, value: any) => void;
    onNext: () => void
    onBack: () => void
}

export const StepTwo = ({ profile, updateProfile, onNext, onBack }: StepTwoProps) => {
    const { t } = useI18n();

    const goal = createListCollection({
        items: [
            { value: 'lose', label: t('goalLose') },
            { value: 'maintain', label: t('goalMaintain') },
            { value: 'gain', label: t('goalGain') },
        ]
    })

    const activityLevel = createListCollection({
        items: [
            { value: 'sedentary', label: t('sedentary') },
            { value: 'light', label: t('light') },
            { value: 'moderate', label: t('moderate') },
            { value: 'active', label: t('active') },
            { value: 'very_active', label: t('veryActive') },
        ]
    })

    return (
        <VStack gap={5} mt={4} align="stretch">
            <Box>
                <Text fontWeight={'bold'} fontSize={'md'} color={'app.text'}>
                    {t('step2Title')}
                </Text>
                <Text fontSize={'xs'} color={'app.textMuted'} mb={1}>
                    {t('step2Subtitle')}
                </Text>
            </Box>

            <Box>
                <Text fontSize={'xs'} color={'app.textMuted'} fontWeight={'semibold'}>
                    {t('activityLevel')}
                </Text>

                <Select.Root
                    value={profile.activityLevel ? [profile.activityLevel] : []}
                    onValueChange={({ value }) => {
                        console.log(value)
                        updateProfile('activityLevel', value[0])
                    }
                    }
                    key={'activityLevel'} size={'md'} collection={activityLevel}>
                    <Select.HiddenSelect />
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Select" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content>
                                {activityLevel.items.map((item) => (
                                    <Select.Item item={item} key={item.value}>
                                        {item.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
            </Box>

            <Box>
                <Text fontSize={'xs'} color={'app.textMuted'} fontWeight={'semibold'}>
                    {t('goalLabel')}
                </Text>

                <Select.Root
                    value={profile.goal ? [profile.goal] : []}
                    onValueChange={({ value }) => {
                        console.log(value)
                        updateProfile('goal', value[0])
                    }
                    }
                    key={'goal'} size={'md'} collection={goal}>
                    <Select.HiddenSelect />
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Select" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content>
                                {goal.items.map((item) => (
                                    <Select.Item item={item} key={item.value}>
                                        {item.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
            </Box>


            <HStack>
                <Button
                    size="lg"
                    bg="app.card"
                    onClick={onBack}
                    color="white"
                    fontWeight="semibold"
                    _hover={{
                        bg: "gray.800",
                    }}
                    mt={2}
                >
                    {t('back')}
                </Button>

                <Button
                    size="lg"
                    bg="brand.500"
                    onClick={onNext}
                    color="white"
                    fontWeight="semibold"
                    _hover={{
                        bg: "brand.600",
                    }}
                    mt={2}
                    disabled={!profile.goal || !profile.activityLevel}
                >
                    {t('next')}
                </Button>
            </HStack>
        </VStack>
    )
}