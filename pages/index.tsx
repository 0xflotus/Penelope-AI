import { Box, Button, Image, Text } from "@mantine/core";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { AIMagicSidebar } from "../components/AiMagicSidebar";
import Footer from "../components/Footer";
import twitter from "twitter-text";
import { HeaderMegaMenu } from "../components/Header";
import { LoadingPlaceholder } from "../components/LoadingPlaceholder";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import { useRouter } from "next/router";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";

const Home: NextPage<{ authUser: any; checkingAuth: boolean }> = ({
  authUser,
  checkingAuth,
}) => {
  const [userInputText, setUserInputText] = useState<string | null>(null);
  const [savingDraft, setSavingDraft] = useState(false);
  const isLoggedIn = useSelector((state) => (state as any).isLoggedIn);
  const router = useRouter();
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  useEffect(() => {
    const fetchUserLatestItem = async () => {
      const { data } = await supabaseClient
        .from("drafts")
        .select("id")
        .eq("user_id", authUser.id)
        .order("inserted_at", { ascending: false });

      if (data === null || data.length === 0) {
        const { data } = await axios.post("/api/createDraft");
        router.push(`/drafts/${data.result}`);

        return;
      }

      router.push(`/drafts/${data[0].id}`);
    };

    if (isLoggedIn && authUser && authUser.id) fetchUserLatestItem();
  }, [isLoggedIn, authUser, supabaseClient, router]);

  if (checkingAuth)
    return (
      <LoadingPlaceholder authUser={authUser} checkingAuth={checkingAuth} />
    );

  const signUp = async () => {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <>
      <HeaderMegaMenu authUser={authUser} checkingAuth={checkingAuth} />
      <Box w="100%" sx={{ maxWidth: 1200, margin: "0 auto" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          mb={80}
          ta="center"
        >
          <Text
            component="h1"
            weight={900}
            size={42}
            variant="gradient"
            gradient={{ from: "yellow", to: "indigo", deg: 45 }}
            sx={{
              "@media (max-width: 600px)": {
                fontSize: 30,
              },
            }}
          >
            Tweet Editor with AI
          </Text>
          <Text
            size={42}
            ml={5}
            sx={{
              "@media (max-width: 600px)": {
                fontSize: 30,
              },
            }}
          >
            🤖
          </Text>
        </Box>
        <Image
          alt=""
          radius="md"
          caption="You can use AI-powered features to write a tweet with hooks"
          src="https://hjulmtlogrkrcmkvcqmk.supabase.co/storage/v1/object/public/public-images/LP-screenshot"
          pb={20}
          mb={70}
          sx={(theme) => ({
            borderRadius: theme.radius.md,
            border: `2px solid ${theme.colors.indigo[7]}`,
          })}
        />
        <Box ta="center">
          <Button onClick={signUp} radius="xl" color="indigo" size="md">
            Try it for free
          </Button>
        </Box>
        {/* <Box
          component="main"
          sx={{
            display: "flex",
            columnGap: 30,
            "@media (max-width: 600px)": {
              flexDirection: "column",
              padding: "0 10px",
            },
          }}
        >
          <Box
            w="50%"
            sx={{
              "@media (max-width: 600px)": {
                width: "100%",
              },
            }}
          >
            <Textarea
              onChange={(e) => {
                setUserInputText(e.target.value);
              }}
              placeholder="Your Tweet"
              label="Your Tweet"
              radius="md"
              size="md"
              minRows={10}
              value={userInputText ?? ""}
            />
            <Box ta="right">
              {twitter.parseTweet(userInputText ?? "").weightedLength}
            </Box>
            {isLoggedIn && (
              <Button radius="xl" onClick={saveDraft} loading={savingDraft}>
                Save a draft
              </Button>
            )}
          </Box>
          <Box
            w="50%"
            sx={{
              "@media (max-width: 600px)": {
                width: "100%",
              },
            }}
          >
            <AIMagicSidebar setUserInputText={setUserInputText} />
          </Box>
        </Box> */}
      </Box>
      <Footer />
    </>
  );
};

export default Home;
