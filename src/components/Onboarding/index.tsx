import { useI18n } from "@/contexts/I18nContext";
import { usePreferences } from "@/contexts/PreferenceContext";
import type { UserProfile } from "@/types";
import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlineSpa } from "react-icons/md";
import { StepOne } from "./stepOne";
import { StepTwo } from "./stepTwo";
import { StepThree } from "./stepThree";


export const Onboarding = () => {
    const { t } = useI18n();
    const { preferences, setPreferences } = usePreferences();
    const [step, setStep] = useState(1);
    const [profile, setProfile] = useState<UserProfile>({});

    const updateProfile = (key: string, value: any) => {
        setProfile((prev) => ({ ...prev, [key]: value }))
    }

    const onFinish = () => {
        setPreferences({ ...preferences, profile: profile, goal: profile.goal! })
    }

    const onNext = () => {
        return setStep((prev) => Math.min(prev + 1, 3))
    }

    const onBack = () => {
        return setStep((prev) => Math.max(prev - 1, 1))
    }

    return (
        <VStack minH="100vh" bg="app.bg" align='center' justify='center'
            px="4" py="12">

            <Box
                w="full"
                maxW="md"
                bg="app.card"
                borderRadius="xl"
                borderWidth="1px"
                borderColor="app.border"
                overflow="hidden"
                boxShadow="0 25px 50px -12px rgba(21, 218, 38, 0.1)"

            >
                <HStack gap="4" m="6" justify="center" align="center">
                    <Flex
                        w="12" h="12"
                        bg="brand.500"
                        borderRadius="xl"
                        align="center"
                        justify="center"
                        fontSize="2xl"
                        boxShadow="0 2px 18px 2px var(--chakra-colors-brand-500)"

                    >
                        <MdOutlineSpa size={28} color="app.icon" />
                    </Flex>

                    <Box>
                        <Text fontSize="xl" fontWeight="bold" color="app.text" lineHeight="1">
                            {t('appName')}
                        </Text>
                        <Text fontSize="xs" color="app.textMuted" mt='1'>
                            {t('appSubtitle')}
                        </Text>
                    </Box>
                </HStack>

                <Box w="full" h="1.5" bg="app.bg" borderRadius="full" overflow={"hidden"}>
                    <Box
                        w={`${(step / 3) * 100}%`}
                        transition="width 0.4s ease-in-out"
                        h="1.5"
                        bg="brand.500"
                        borderRadius="full"
                    />
                </Box>

            </Box>

            {step == 1 && <StepOne profile={profile} updateProfile={updateProfile} onNext={onNext} />}
            {step == 2 && <StepTwo profile={profile} updateProfile={updateProfile} onNext={onNext} onBack={onBack} />}
            {step == 3 && <StepThree profile={profile} onFinish={onFinish} onBack={onBack} />}


        </VStack>
    )
}