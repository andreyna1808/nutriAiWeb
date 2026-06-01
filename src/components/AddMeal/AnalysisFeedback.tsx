import { Box, HStack, Text } from "@chakra-ui/react";
import { MdWarning } from "react-icons/md";

interface AnalysisFeedbackProps {
  guardrailMsg: string | null;
  errorMsg: string | null;
}

export const AnalysisFeedback = ({
  guardrailMsg,
  errorMsg,
}: AnalysisFeedbackProps) => {
  if (guardrailMsg) {
    return (
      <HStack
        gap={3}
        p={4}
        bg="orange.500/10"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="orange.500/20"
      >
        <Text fontSize="xl">
          <MdWarning />
        </Text>
        <Text fontSize="sm" color="orange.600">
          {guardrailMsg}
        </Text>
      </HStack>
    );
  }
  if (errorMsg) {
    return (
      <Box
        p={4}
        bg="red.500/10"
        borderRadius="xl"
        borderWidth="1px"
        borderColor="red.500/20"
      >
        <Text fontSize="sm" color="red.500">
          {errorMsg}
        </Text>
      </Box>
    );
  }
  return null;
};
