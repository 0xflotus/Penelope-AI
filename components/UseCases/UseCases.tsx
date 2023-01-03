import { Box, Text, Title } from "@mantine/core";
import { Inter } from "@next/font/google";
import { UseCasesItem } from "./UseCasesItem";

const manrope = Inter({ subsets: ["latin"] });

export const UseCases = () => {
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
          Use Cases
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
          display: "grid",
          gap: 16,
          gridAutoRows: "minmax(0px, 1fr)",
          gridTemplateColumns: "repeat(3, minmax(200px, 1fr))",
          gridTemplateRows: "repeat(2, minmax(0px, 1fr))",
          [theme.fn.smallerThan("md")]: {
            gridTemplateColumns: "repeat(2, minmax(200px, 1fr))",
          },
          [theme.fn.smallerThan("sm")]: {
            gap: 10,
            padding: 20,
            gridTemplateColumns: "repeat(1, minmax(200px, 1fr))",
          },
        })}
      >
        <UseCasesItem />
        <UseCasesItem />
        <UseCasesItem />
        <UseCasesItem />
        <UseCasesItem />
        <UseCasesItem />
      </Box>
    </Box>
  );
};
