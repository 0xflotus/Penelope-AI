import { Box } from "@mantine/core";
import { ApiResponseCard } from "./ApiResponseCard";

export const AutoCompleteSuggestionBox = () => {
  return (
    <Box bottom={50} left={50} right={50} sx={{ position: "absolute" }}>
      <ApiResponseCard result={"fhdjsfhjdashfjdshafjdsahlk"} />
    </Box>
  );
};
