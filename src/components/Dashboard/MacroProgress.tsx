import { useI18n } from "@/contexts/I18nContext"
import type { MacroProgressProps } from "@/types/dashboard"
import { macros } from "@/utils/dashboard"
import { getProgressPercent } from "@/utils/nutrition"
import { Box, Text, HStack, Flex } from "@chakra-ui/react"
import { memo } from "react"

export const MacroProgress = memo(({
    name,
    current,
    target,
}: MacroProgressProps) => {
    const { t } = useI18n();
    const getPercent = getProgressPercent(current, target)

    return (
        <Box
            bg="app.bg"
            borderRadius="2xl"
            borderWidth="1px"
            borderColor="app.border"
            p={5}
        >
            <Text
                fontSize="xs"
                color={macros[name].textColor}
                mb={2}
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="wider"
            >
                {t(macros[name].label)}
            </Text>

            <HStack align="center" gap={1} mb={2}>
                <Text fontSize="xl" fontWeight="bold" color={macros[name].textColor}>{current}</Text>
                <Text fontSize="xs" color='app.textMuted'>/ {target} / {macros[name].unit}</Text>
            </HStack>

            <Box
                w="full"
                h={2}
                bg="app.card"
                borderRadius="full"
                overflow="hidden"
            >

                <Box
                    h="full"
                    bg={macros[name].color}
                    borderRadius="full"
                    style={{
                        width: `${getPercent}%`,
                        transition: 'width 0.5s ease-in-out'
                    }}
                />

                <Flex justify="space-between" mt={2}>
                    <Text
                        fontSize="2xs"
                        color="app.textMuted"
                    >
                        {getPercent.toFixed(0)}%
                    </Text>
                    <Text fontSize="2xs" color="app.textMuted" ml={1}>
                        {Math.max(0, current - target)}{macros[name].unit} restante
                    </Text>
                </Flex>
            </Box>
        </Box>
    )
})