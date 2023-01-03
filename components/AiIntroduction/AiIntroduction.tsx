import { Box, Image, Text, Title } from "@mantine/core";
import { Inter } from "@next/font/google";

const manrope = Inter({ subsets: ["latin"] });

export const AiIntroduction = () => {
  return (
    <Box
      sx={(theme) => ({
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
        sx={(theme) => ({
          maxWidth: 1200,
        })}
      >
        <Image
          src="https://via.placeholder.com/1200x500?Text=Some+cool+AI+image"
          alt="penelope"
          radius="lg"
        />
      </Box>
    </Box>
  );
};
