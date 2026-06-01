import { useI18n } from "@/contexts/I18nContext";
import { Button, HStack } from "@chakra-ui/react";
import { MdCameraAlt, MdTextFields } from "react-icons/md";

interface ModeSelectorProps {
  mode: "text" | "image";
  onChange: (mode: "text" | "image") => void;
}

export const ModeSelector = ({ mode, onChange }: ModeSelectorProps) => {
  const { t } = useI18n();

  return (
    <HStack
      gap={2}
      p={1}
      bg="app.card"
      borderRadius="md"
      borderWidth="1px"
      borderColor="app.border"
    >
      <Button
        flex={1}
        size="md"
        borderRadius={"sm"}
        fontWeight={"semibold"}
        bg={mode === "text" ? "brand.500" : "transparent"}
        color={mode === "text" ? "white" : "app.textMuted"}
        _hover={{
          bg: mode === "text" ? "brand.600" : "app.bg",
          color: mode === "text" ? "white" : "app.text",
        }}
        onClick={() => onChange("text")}
      >
        <MdTextFields /> {t("inputText")}
      </Button>

      <Button
        flex={1}
        size="md"
        borderRadius={"sm"}
        fontWeight={"semibold"}
        bg={mode === "image" ? "brand.500" : "transparent"}
        color={mode === "image" ? "white" : "app.textMuted"}
        _hover={{
          bg: mode === "image" ? "brand.600" : "app.bg",
          color: mode === "image" ? "white" : "app.text",
        }}
        onClick={() => onChange("image")}
      >
        <MdCameraAlt /> {t("inputPhoto")}
      </Button>
    </HStack>
  );
};
