import { Box, Button, Title } from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { HeaderMegaMenu } from "../../components/Header";

const ExtensionToken: NextPage<{
  authUser: any;
  checkingAuth: boolean;
}> = ({ authUser, checkingAuth }) => {
  const [generating, setGenerating] = useState(false);
  const generateToken = () => {
    setGenerating(true);
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" key="noindex" />
      </Head>
      <HeaderMegaMenu authUser={authUser} checkingAuth={checkingAuth} />
      <Box
        component="main"
        w="100%"
        pt={60}
        sx={(theme) => ({
          maxWidth: 1200,
          margin: "0 auto",
          [theme.fn.smallerThan("md")]: {
            paddingLeft: theme.spacing.sm,
            paddingRight: theme.spacing.sm,
          },
        })}
      >
        <Title
          order={2}
          sx={(theme) => ({ color: theme.colors.gray[2] })}
          mb={20}
        >
          Your token for Penelope AI chrome extension
        </Title>
        <Button
          color="indigo"
          radius="xl"
          size="md"
          onClick={generateToken}
          loading={generating}
        >
          Generate
        </Button>
      </Box>
    </>
  );
};

export default ExtensionToken;
