import { Box, Text, Textarea } from "@chakra-ui/react";
import { useI18n } from "@/contexts/I18nContext";

interface TextInputModeProps {
  value: string;
  onChange: (value: string) => void;
}

export const TextInputMode = ({ value, onChange }: TextInputModeProps) => {
  const { t } = useI18n();

  return (
    <Box
      bg="app.card"
      borderRadius="3xl"
      borderWidth="1px"
      borderColor="app.border"
      p={6}
      my={2}
    >
      <Text fontWeight="bold" color="app.text" mb={1}>
        {t("inputText")}
      </Text>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("textPlaceholder")}
        rows={5}
        bg="app.bg"
        borderColor="app.border"
        color="app.text"
        borderRadius="xl"
        resize="none"
        _focus={{
          borderColor: "brand.500",
          boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
        }}
      />
    </Box>
  );
};
