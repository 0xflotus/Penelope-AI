import { Box, Image, Text, Title } from "@mantine/core";
import { Inter } from "@next/font/google";
import { ItemBox } from "./ItemBox";

const manrope = Inter({ subsets: ["latin"] });

export const Testimonials = () => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colors.gray[0],
        color: theme.colors.dark[7],
        padding: "40px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      })}
    >
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: 16 }}>
        <Text
          size={14}
          weight={700}
          ta="center"
          className={manrope.className}
          sx={{
            color: "rgb(34, 170, 153)",
            textTransform: "uppercase",
          }}
        >
          Write with Penelope
        </Text>
        <Title
          order={2}
          size={46}
          weight={800}
          ta="center"
          className={manrope.className}
          sx={(theme) => ({
            color: theme.colors.dark[7],
          })}
        >
          You&apos;re in control
        </Title>
        <Text
          size={24}
          weight={400}
          ta="center"
          className={manrope.className}
          sx={(theme) => ({
            color: theme.colors.dark[7],
          })}
        >
          Some use cases that you can boost with Penelope AI
        </Text>
      </Box>
      <Box
        p={40}
        w="100%"
        h="min-content"
        sx={() => ({
          maxWidth: 1200,
          display: "flex",
          gap: 20,
        })}
      >
        <ItemBox />
        <ItemBox />
      </Box>
    </Box>
  );
};
