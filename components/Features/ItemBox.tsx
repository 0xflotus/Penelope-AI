import { Box, Image, Text } from "@mantine/core";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const ItemBox = () => {
  return (
    <Box
      p={32}
      sx={{
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow:
          "rgb(10 0 31 / 72%) 0px 0.60323px 0.60323px -1.25px, rgb(10 0 31 / 64%) 0px 2.29021px 2.29021px -2.5px, rgb(10 0 31 / 25%) 0px 10px 10px -3.75px",
      }}
    >
      <Box sx={{ display: "flex", rowGap: 30, flexDirection: "column" }}>
        <Image
          src="https://via.placeholder.com/468x60?text=Visit+Blogging.com+NowC/O https://placeholder.com/"
          alt="placeholder"
        />
        <Box
          ta="center"
          sx={{ display: "flex", flexDirection: "column", rowGap: 10 }}
        >
          <Text size={28} weight={700} className={inter.className}>
            Title
          </Text>
          <Text size={16} weight={400} className={inter.className}>
            Description
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
