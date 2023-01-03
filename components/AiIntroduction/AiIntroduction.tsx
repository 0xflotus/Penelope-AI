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
          sx={(theme) => ({
            color: theme.colors.teal[5],
            textTransform: "uppercase",
          })}
        >
          Write with Penelope
        </Text>
        <Title
          order={2}
          size={46}
          weight={800}
          ta="center"
          className={manrope.className}
        >
          Your writing buddy is here
        </Title>
        <Text
          size={24}
          weight={400}
          ta="center"
          className={manrope.className}
          sx={(theme) => ({
            color: theme.colors.dark[0],
          })}
        >
          Want to rephrase a word? Stop typing?
          <br /> Penelope is always right next to you.
        </Text>
      </Box>
      <Box
        my={40}
        w="100%"
        h={750}
        sx={(theme) => ({
          maxWidth: 1200,
          borderRadius: theme.radius.lg,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundImage:
            "url('https://hjulmtlogrkrcmkvcqmk.supabase.co/storage/v1/object/public/public-images/lp-penelope-image?a=a')",
        })}
      />
    </Box>
  );
};
