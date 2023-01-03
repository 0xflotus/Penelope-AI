import { Box, Title } from "@mantine/core";

export const UseCasesItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
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
        {title}
      </Title>
      <Box
        sx={(theme) => ({
          color: theme.colors.gray[1],
        })}
      >
        {description}
      </Box>
    </Box>
  );
};
