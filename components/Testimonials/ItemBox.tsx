import { Box } from "@mantine/core";

export const ItemBox = () => {
  return (
    <Box
      p={32}
      sx={{
        boxShadow: "rgb(10 0 31 / 5%) 0px 1px 12px 2px",
        borderRadius: 12,
        flex: "1 1 0%",
      }}
    >
      Hello
    </Box>
  );
};
