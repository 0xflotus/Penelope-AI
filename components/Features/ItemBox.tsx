import { Box, Image, Text, ThemeIcon } from "@mantine/core";
import { Inter } from "@next/font/google";
import type { TablerIcon } from "@tabler/icons";

const inter = Inter({ subsets: ["latin"] });

export const ItemBox = ({
  title,
  icon: Icon,
  description,
}: {
  title: string;
  icon: TablerIcon;
  description: string;
}) => {
  return (
    <Box
      p={32}
      sx={(theme) => ({
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.gray[1],
        boxShadow:
          "rgb(10 0 31 / 72%) 0px 0.60323px 0.60323px -1.25px, rgb(10 0 31 / 64%) 0px 2.29021px 2.29021px -2.5px, rgb(10 0 31 / 25%) 0px 10px 10px -3.75px",
      })}
    >
      <Box sx={{ display: "flex", rowGap: 30, flexDirection: "column" }}>
        <ThemeIcon
          size="lg"
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
          m="0 auto"
        >
          <Icon size={20} stroke={1.5} />
        </ThemeIcon>
        <Box
          ta="center"
          sx={{ display: "flex", flexDirection: "column", rowGap: 10 }}
        >
          <Text
            size={28}
            weight={700}
            className={inter.className}
            sx={(theme) => ({ color: theme.colors.dark[7] })}
          >
            {title}
          </Text>
          <Text
            size={16}
            weight={400}
            className={inter.className}
            sx={(theme) => ({ color: theme.colors.dark[7] })}
          >
            {description}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
