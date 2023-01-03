import { Box, Text, Title } from "@mantine/core";
import { ItemBox } from "./ItemBox";
import { Inter } from "@next/font/google";
import {
  IconBook,
  IconMessageChatbot,
  IconPencil,
  IconSignature,
} from "@tabler/icons";

const manrope = Inter({ subsets: ["latin"] });

export const DATA = [
  {
    icon: IconSignature,
    title: "Paraphrase",
    description: "Find a wow text and tweak it.",
  },
  {
    icon: IconPencil,
    title: "Summarize",
    description: "Quickly and accurately summarize texts in just a second.",
  },
  {
    icon: IconBook,
    title: "Generate a story",
    description: "Create a unique story by inputting just a few key words.",
  },
  {
    icon: IconMessageChatbot,
    title: "AI autocomplete",
    description:
      "Seamlessly continue your stories by automatically generating the next sentence based on the existing sentence.",
  },
];

export const Features = () => {
  return (
    <Box
      sx={(theme) => ({
        color: theme.colors.dark[0],
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
            color: theme.colors.cyan[5],
            textTransform: "uppercase",
          })}
        >
          Tools
        </Text>
        <Title
          order={2}
          size={46}
          weight={800}
          ta="center"
          className={manrope.className}
        >
          Speed up your writing effortlessly
        </Title>
        <Text size={24} weight={400} ta="center" className={manrope.className}>
          Some use cases that you can boost with Penelope AI
        </Text>
      </Box>
      <Box
        p={40}
        w="100%"
        h="min-content"
        sx={(theme) => ({
          maxWidth: 1200,
          display: "grid",
          gap: 16,
          gridAutoRows: "minmax(0px, 1fr)",
          gridTemplateColumns: "repeat(2, minmax(200px, 1fr))",
          gridTemplateRows: "repeat(2, minmax(0px, 1fr))",
          [theme.fn.smallerThan("sm")]: {
            gap: 10,
            padding: 20,
            gridTemplateColumns: "repeat(1, minmax(200px, 1fr))",
          },
        })}
      >
        {DATA.map((d) => {
          return <ItemBox key={d.title} {...d} />;
        })}
      </Box>
    </Box>
  );
};
