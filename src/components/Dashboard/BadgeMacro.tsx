import { useI18n } from "@/contexts/I18nContext"
import type { NameProps } from "@/types/dashboard"
import { macros } from "@/utils/dashboard"
import { Box, Text } from "@chakra-ui/react"

interface BadgeMacroProps {
    name: NameProps
    current?: number
}

export const BadgeMacro = ({ name, current = 0 }: BadgeMacroProps) => {
    const { t } = useI18n()

    return (
        <Box
            px={2}
            py={1}
            borderRadius="lg"
            bg={macros[name].color}
        >
            <Text fontSize="xs" fontWeight="semibold" color={'black'}>
                {t(macros[name].label)}:  {current}{macros[name].unit}
            </Text>

        </Box>
    )
}