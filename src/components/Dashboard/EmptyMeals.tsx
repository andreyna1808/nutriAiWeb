import { useI18n } from "@/contexts/I18nContext";
import { Button, Flex, Text } from "@chakra-ui/react";

interface EmptyMealsProps {
    onAddMeal: () => void
}

export const EmptyMeals = ({ onAddMeal }: EmptyMealsProps) => {
    const { t } = useI18n();

    return (
        <Flex
            direction={'column'}
            align={'center'}
            justify={'center'}
            gap={3}
            py={12}
            bg={'app.card'}
            borderRadius={'xl'}
            borderWidth={'1px'}
            borderColor={'app.border'}
            borderStyle={'dashed'}
        >
            <Text fontSize={'3xl'}>
                🍽️
            </Text>
            <Text fontSize={'sm'} color={'app.textMuted'} textAlign={'center'} maxW={'xs'}>
                {t('noMeals')}
            </Text>

            <Button
                size={'sm'}
                bg={'brand.500'}
                color={'white'}
                fontWeight={'semibold'}
                _hover={{ bg: 'brand.600' }}
                onClick={onAddMeal}
            >
                {t('addMeal')}
            </Button>
        </Flex>
    )
}