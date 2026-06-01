import { useI18n } from "@/contexts/I18nContext";
import type { UserProfile } from "@/types"
import { Box, VStack, Text, Grid, Button, Input, Select, createListCollection, Portal } from "@chakra-ui/react";
import { inputStylesStepOne } from "./styles";


interface StepOneProps {
    profile: UserProfile;
    updateProfile: (key: string, value: any) => void;
    onNext: () => void
}

export const StepOne = ({ profile, updateProfile, onNext }: StepOneProps) => {
    const { t } = useI18n();

    const genders = createListCollection({
        items: [
            { value: 'male', label: t('male') },
            { value: 'female', label: t('female') },
        ]
    })

    return (
        <VStack gap={5} mt={4} align="stretch">
            <Box>
                <Text fontWeight={'bold'} fontSize={'md'} color={'app.text'}>
                    {t('step1Title')}
                </Text>
                <Text fontSize={'xs'} color={'app.textMuted'} mb={1}>
                    {t('step1Subtitle')}
                </Text>
            </Box>

            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <Box>
                    <Text fontWeight={'bold'} fontSize={'md'} color={'app.text'}>
                        {t('weightKg')}
                    </Text>
                    <Input
                        type="number"
                        min="0"
                        value={profile.weight}
                        onChange={(e) => {
                            const newValue = Number(e.target.value)
                            if (newValue >= 0) {
                                updateProfile('weight', newValue)
                            }
                        }}
                        {...inputStylesStepOne}
                    />

                </Box>
                <Box>
                    <Text fontWeight={'bold'} fontSize={'md'} color={'app.text'}>
                        {t('heightCm')}
                    </Text>
                    <Input
                        type="number"
                        min="0"
                        value={profile.height}
                        onChange={(e) => {
                            const newValue = Number(e.target.value)
                            if (newValue >= 0) {
                                updateProfile('height', newValue)
                            }
                        }}
                        {...inputStylesStepOne}
                    />

                </Box>
                <Box>
                    <Text fontWeight={'bold'} fontSize={'md'} color={'app.text'}>
                        {t('age')}
                    </Text>
                    <Input
                        type="number"
                        min="0"
                        value={profile.age}
                        onChange={(e) => {
                            const newValue = Number(e.target.value)
                            if (newValue >= 0) {
                                updateProfile('age', newValue)
                            }
                        }}
                        {...inputStylesStepOne}
                    />
                </Box>
                <Box>
                    <Text fontWeight={'bold'} fontSize={'md'} color={'app.text'}>
                        {t('biologicalSex')}
                    </Text>
                    <Select.Root
                        value={profile.gender ? [profile.gender] : []}

                        onValueChange={({ value }) => {
                            console.log(value)
                            updateProfile('gender', value[0])
                        }
                        }
                        key={'gender'} size={'md'} collection={genders}>
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
                                    {genders.items.map((item) => (
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
            </Grid>

            <Button
                w="full"
                size="lg"
                bg="brand.500"
                onClick={onNext}
                color="white"
                fontWeight="semibold"
                _hover={{
                    bg: "brand.600",
                }}
                mt={2}
                disabled={!profile.weight || !profile.height || !profile.age || !profile.gender}
            >
                {t('next')}
            </Button>

        </VStack>
    )
}