import { useRef } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { useI18n } from "@/contexts/I18nContext";

interface ImageInputModeProps {
  preview: string | null;
  onImageSelect: (base64WithoutPrefix: string, mimeType: string) => void;
  onClear: () => void;
}

export const ImageInputMode = ({
  preview,
  onImageSelect,
  onClear,
}: ImageInputModeProps) => {
  const { t } = useI18n();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const fullBase64 = reader.result as string;
      const rawBase64 = fullBase64.split(",")[1];
      onImageSelect(rawBase64, file.type);
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => e.preventDefault();
  
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  };

  return (
    <Box
      bg="app.card"
      borderRadius="3xl"
      borderWidth="1px"
      borderColor="app.border"
      p={6}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
        }}
      />
      {preview ? (
        <Box position="relative">
          <img
            src={preview}
            alt="Preview"
            loading="lazy"
            decoding="async"
            style={{
              width: "100%",
              maxHeight: "16rem",
              objectFit: "cover",
              borderRadius: "1rem",
              border: "1px solid var(--chakra-colors-app-border)",
            }}
          />
          <Button
            position="absolute"
            top={2}
            right={2}
            size="sm"
            bg="blackAlpha.700"
            color="white"
            borderRadius="lg"
            _hover={{ bg: "blackAlpha.800" }}
            onClick={onClear}
          >
            <MdClose />
          </Button>
        </Box>
      ) : (
        <Flex
          direction="column"
          align="center"
          justify="center"
          gap={3}
          py={12}
          borderWidth="2px"
          borderStyle="dashed"
          borderColor="app.border"
          borderRadius="2xl"
          cursor="pointer"
          _hover={{ borderColor: "brand.500", bg: "brand.500/5" }}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <Text fontSize="3xl">📸</Text>
          <Text fontSize="sm" color="app.textMuted" textAlign="center">
            {t("dragDrop")}
          </Text>
          <Button
            size="sm"
            bg="brand.500"
            color="white"
            borderRadius="xl"
            _hover={{ bg: "brand.600" }}
          >
            {t("inputPhoto")}
          </Button>
        </Flex>
      )}
    </Box>
  );
};
