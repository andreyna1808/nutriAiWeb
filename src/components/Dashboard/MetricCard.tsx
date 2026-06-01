import type { MetricCardProps } from "@/types/dashboard"
import { Box, Flex, HStack, Text } from "@chakra-ui/react"
import { memo } from "react"

export const MetricCard = memo(({
    label,
    value,
    unit,
    icon,
    iconBg,
    badge
}: MetricCardProps) => {
    return (
        <Flex
            bg="app.card"
            borderRadius="xl"
            borderWidth="1px"
            borderColor="app.border"
            p={4}
            align="center"
            justify="space-between"
        
        >
            <Box>
                <Text fontSize="xs" color="app.textMuted" mb={1}>
                    {label}
                </Text>
                <HStack>
                    <Text fontSize="xl" fontWeight="bold" color="app.text">
                        {value}
                    </Text>
                    {unit && <Text fontSize="xs" color="app.textMuted">{unit}</Text>}
                </HStack>
                {badge}
            </Box>

            <Flex
                w="40px"
                h="40px"
                bg={iconBg}
                borderRadius="xl"
                align="center"
                justify="center"
                color='white'
                fontSize="lg"
                flexShrink={0}
            >
                {icon}
            </Flex>
        </Flex>
    )
})