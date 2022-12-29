import { Box } from "@mantine/core";
import { ApiResponseCard } from "./ApiResponseCard";

export const AutoCompleteSuggestionBox = ({
  autoComplete,
  loading,
}: {
  autoComplete: string | null;
  loading: boolean;
}) => {
  return (
    <Box bottom={50} left={50} right={50} sx={{ position: "absolute" }}>
      <ApiResponseCard result={autoComplete ?? ""} loading={loading} />
    </Box>
  );
};
