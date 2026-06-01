import { useI18n } from "@/contexts/I18nContext"
import type { AppTab } from "@/types"
import { Box, Flex, HStack, Text } from "@chakra-ui/react"
import { MdOutlineSpa } from "react-icons/md"



interface HeaderProps {
    activeTab: AppTab
    onTabChange: (tab: AppTab) => void
}

export const Header = ({ activeTab, onTabChange }: HeaderProps) => {
    const { t } = useI18n()

    const tabs: { key: AppTab, label: string }[] = [
        { key: "dashboard", label: t('navDashboard') },
        { key: "meals", label: t('navAddMeal') },
        { key: "settings", label: t('navSettings') }
    ]

    return (
        <Box
            as="header"
            position="sticky"
            top="0"
            zIndex="sticky"
            bg="app.headerBg"
            borderBottom="1px"
            borderColor="app.border"
            backdropFilter="blur(12px)"
        >

            <Flex
                w="full"
                px="6"
                py="4"
                justify="space-between"
            >

                <HStack gap="4">
                    <Flex
                        w="10" h="10"
                        bg="brand.500"
                        borderRadius="xl"
                        align="center"
                        justify="center"
                        fontSize="xl"
                        boxShadow="0 2px 18px 2px var(--chakra-colors-brand-500)"

                    >
                        <MdOutlineSpa size={28} color="app.icon" />
                    </Flex>

                    <Box>
                        <Text
                            fontWeight="black"
                            fontSize="md"
                            color="app.text"
                            lineHeight="1"
                        >
                            {t('appName')}
                        </Text>
                         <Text
                            fontWeight="medium"
                            fontSize="xs"
                            color="app.textMuted"
                            lineHeight="1"
                            mt="1"
                         >
                            {t('appSubtitle')}
                        </Text>
                    </Box>
                </HStack>


                <HStack gap="4">
                    {tabs.map((tab) => (
                        <Text
                            key={tab.key}
                            fontWeight="medium"
                            fontSize="sm"
                            color={activeTab === tab.key ? "brand.500" : "app.textMuted"}
                            lineHeight="1"
                            cursor="pointer"
                            _hover={{ color: "app.text" }}
                            onClick={() => onTabChange(tab.key)}
                        >
                            {tab.label}
                        </Text>
                    ))}
                </HStack>
            </Flex>

        </Box>
    )
}