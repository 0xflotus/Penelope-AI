import { Box, Button, Text, Title } from "@mantine/core";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HeaderMegaMenu } from "../../components/Header";
import { LoadingPlaceholder } from "../../components/LoadingPlaceholder";

const ExtensionToken: NextPage<{
  authUser: any;
  checkingAuth: boolean;
}> = ({ authUser, checkingAuth }) => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const [generating, setGenerating] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const generateToken = async () => {
    setGenerating(true);
    const token = `penelope-${crypto.randomUUID()}`;

    // Save it on DB
    const res = await supabaseClient
      .from("users")
      .update({ extension_token: token })
      .eq("id", authUser.id)
      .select("extension_token");

    if (res.data === null) return;

    setHasToken(true);
    setToken(res.data[0].extension_token);

    setGenerating(false);
  };

  useEffect(() => {
    const fetchUsersToken = async () => {
      const { data } = await supabaseClient
        .from("users")
        .select("extension_token")
        .eq("id", authUser.id)
        .single();

      if (data?.extension_token === null || data?.extension_token === "")
        return;

      setToken(data?.extension_token);
      setHasToken(true);
    };

    if (authUser && authUser.id) fetchUsersToken();
  }, [authUser, supabaseClient]);

  if (checkingAuth)
    return (
      <LoadingPlaceholder authUser={authUser} checkingAuth={checkingAuth} />
    );

  if (!authUser) router.push("/");

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
        {hasToken ? (
          <Text sx={(theme) => ({ color: theme.colors.gray[2] })}>{token}</Text>
        ) : (
          <Button
            color="indigo"
            radius="xl"
            size="md"
            onClick={generateToken}
            loading={generating}
          >
            Generate
          </Button>
        )}
      </Box>
    </>
  );
};

export default ExtensionToken;
