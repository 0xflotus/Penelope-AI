import { Box, Button, Text, Textarea } from "@mantine/core";
import type { NextPage } from "next";
import { useState } from "react";
import { AIMagicSidebar } from "../../components/AiMagicSidebar";
import Footer from "../../components/Footer";
import twitter from "twitter-text";
import { HeaderMegaMenu } from "../../components/Header";
import { LoadingPlaceholder } from "../../components/LoadingPlaceholder";
import { useSelector } from "react-redux";
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from "next/router";

const Drafts: NextPage<{ authUser: any; checkingAuth: boolean }> = ({
  authUser,
  checkingAuth,
}) => {
  const [userInputText, setUserInputText] = useState<string | null>(null);
  const [savingDraft, setSavingDraft] = useState(false);
  const isLoggedIn = useSelector((state) => (state as any).isLoggedIn);
  const router = useRouter();

  if (checkingAuth)
    return (
      <LoadingPlaceholder authUser={authUser} checkingAuth={checkingAuth} />
    );

  const saveDraft = async () => {
    setSavingDraft(true);
    const id = router.query.id;

    try {
      await supabase
        .from("tweets")
        .upsert({
          id,
          content: userInputText,
          user_id: authUser.id,
        })
        .eq("id", id);
    } catch (err) {
    } finally {
      setSavingDraft(false);
    }
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
        <Box
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
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Drafts;
