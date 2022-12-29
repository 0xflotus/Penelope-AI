import { Box, Paper, Text } from "@mantine/core";
import { CustomCopyButton } from "./CustomCopyButton";

export const ApiResponseCard = ({
  result,
  loading = false,
}: {
  result: string;
  loading?: boolean;
}) => {
  return (
    <Box mt={20}>
      <Paper
        sx={(theme) => ({ backgroundColor: theme.black, display: "flex" })}
        shadow="md"
        radius="md"
        p="md"
      >
        {loading ? (
          <Text>Penelope is thinking...</Text>
        ) : (
          <>
            <Text w="95%">{result}</Text>
            <CustomCopyButton value={result} />
          </>
        )}
      </Paper>
    </Box>
  );
};
