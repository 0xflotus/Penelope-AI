import { Box, Text, Title } from "@mantine/core";
import { Inter } from "@next/font/google";
import { SignUpButton } from "../SignUpButton";

const manrope = Inter({ subsets: ["latin"] });

export const CTA = () => {
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
          Write with Penelope for free today
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
          Just try and see if Penelope can help you.
        </Text>
      </Box>
      <Box
        p={40}
        w="100%"
        h="min-content"
        sx={(theme) => ({
          maxWidth: 1200,
        })}
        ta="center"
      >
        <SignUpButton />
      </Box>
    </Box>
  );
};
