import { Box, Title } from "@mantine/core";

export const UseCasesItem = () => {
  return (
    <Box
      sx={(theme) => ({
        padding: "24px 40px",
        borderRadius: 12,
        backgroundColor: theme.colors.dark[9],
        display: "flex",
        flexDirection: "column",
        rowGap: 8,
        boxShadow:
          "rgb(10 0 31 / 72%) 0px 0.60323px 0.60323px -1.25px, rgb(10 0 31 / 64%) 0px 2.29021px 2.29021px -2.5px, rgb(10 0 31 / 25%) 0px 10px 10px -3.75px",
      })}
    >
      <Box
        sx={(theme) => ({
          color: theme.colors.gray[1],
        })}
      >
        Icon
      </Box>
      <Title
        order={3}
        sx={(theme) => ({
          color: theme.colors.gray[1],
        })}
      >
        Title
      </Title>
      <Box
        sx={(theme) => ({
          color: theme.colors.gray[2],
        })}
      >
        Write blogs & articles faster with the help of AI.
      </Box>
    </Box>
  );
};
