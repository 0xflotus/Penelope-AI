import { Box, Skeleton } from "@mantine/core";

export const ApiResponsePlaceholder = () => {
  return (
    <Box mt={20}>
      <Skeleton height={8} radius="xl" />
      <Skeleton height={8} radius="xl" mt={6} />
      <Skeleton height={8} radius="xl" mt={6} />
      <Skeleton height={8} radius="xl" mt={6} />
      <Skeleton height={8} radius="xl" mt={6} />
    </Box>
  );
};
