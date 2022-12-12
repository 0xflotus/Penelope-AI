import { ActionIcon, Box, Button, Drawer, Text, Textarea } from "@mantine/core";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { AIMagicSidebar } from "../../components/AiMagicSidebar";
import Footer from "../../components/Footer";
import twitter from "twitter-text";
import { HeaderMegaMenu } from "../../components/Header";
import { LoadingPlaceholder } from "../../components/LoadingPlaceholder";
import { useSelector } from "react-redux";
import { supabase } from "../../utils/supabaseClient";
import { useRouter } from "next/router";
import { IconMenu2 } from "@tabler/icons";
import Link from "next/link";
import { v4 } from "uuid";

const Drafts: NextPage<{ authUser: any; checkingAuth: boolean }> = ({
  authUser,
  checkingAuth,
}) => {
  const [userInputText, setUserInputText] = useState<string | null>(null);
  const [savingDraft, setSavingDraft] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drafts, setDrafts] = useState<any[] | null>(null);
  const isLoggedIn = useSelector((state) => (state as any).isLoggedIn);
  const router = useRouter();

  const fetchDrafts = async () => {
    const { data } = await supabase
      .from("drafts")
      .select()
      .eq("user_id", authUser.id)
      .order("inserted_at", { ascending: false });

    if ((data as any[]).length === 0) return;

    setDrafts(data);
  };

  useEffect(() => {
    const fetchDrafts = async () => {
      const { data } = await supabase
        .from("drafts")
        .select()
        .eq("user_id", authUser.id)
        .order("inserted_at", { ascending: false });

      if ((data as any[]).length === 0) return;

      setDrafts(data);
    };

    if (authUser) fetchDrafts();
  }, [authUser]);

  useEffect(() => {
    const fetchDraft = async () => {
      const { data, error } = await supabase
        .from("drafts")
        .select()
        .eq("id", router.query.id)
        .single();

      if (!data) return;

      setUserInputText(data.content);
    };

    if (authUser) {
      setUserInputText(null);
      fetchDraft();
    }
  }, [authUser, router.query.id]);

  if (checkingAuth)
    return (
      <LoadingPlaceholder authUser={authUser} checkingAuth={checkingAuth} />
    );

  const saveDraft = async () => {
    setSavingDraft(true);
    const id = router.query.id;

    try {
      await supabase
        .from("drafts")
        .upsert({
          id,
          content: userInputText,
          user_id: authUser.id,
        })
        .eq("id", id);

      await fetchDrafts();
    } catch (err) {
    } finally {
      setSavingDraft(false);
    }
  };

  const createNew = () => {
    const id = v4();

    router.push(`/drafts/${id}`);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <HeaderMegaMenu authUser={authUser} checkingAuth={checkingAuth} />
      <ActionIcon
        color="lime"
        variant="light"
        sx={{ position: "absolute", left: 20, top: 100 }}
        onClick={() => setDrawerOpen(true)}
      >
        <IconMenu2 size={30} />
      </ActionIcon>
      <Drawer
        opened={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Your Drafts"
        padding="lg"
        size="lg"
      >
        {/* Drawer content */}
        {drafts ? (
          <>
            {drafts.map((d) => {
              return (
                <Text key={d.id}>
                  <Link
                    href={`/drafts/${d.id}`}
                    onClick={() => setDrawerOpen(false)}
                  >
                    {d.content.slice(0, 10)}
                  </Link>
                </Text>
              );
            })}
          </>
        ) : (
          <Text>No drafts yet.</Text>
        )}
      </Drawer>
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
              <>
                <Button
                  radius="xl"
                  color="gray"
                  onClick={saveDraft}
                  loading={savingDraft}
                >
                  Save a draft
                </Button>
                <Button
                  radius="xl"
                  onClick={createNew}
                  sx={{ display: "block" }}
                  mt={20}
                  color="green"
                >
                  Create a new Draft
                </Button>
              </>
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
    </Box>
  );
};

export default Drafts;
