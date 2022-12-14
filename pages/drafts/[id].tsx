import { ActionIcon, Box, Button, Drawer, Text, Textarea } from "@mantine/core";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { AIMagicSidebar } from "../../components/AiMagicSidebar";
import Footer from "../../components/Footer";
import twitter from "twitter-text";
import { HeaderMegaMenu } from "../../components/Header";
import { LoadingPlaceholder } from "../../components/LoadingPlaceholder";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { IconMenu2 } from "@tabler/icons";
import Link from "next/link";
import { v4 } from "uuid";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { ApiResponsePlaceholder } from "../../components/ApiResponsePlaceholder";
import { ApiResponseCard } from "../../components/ApiResponseCard";
import axios from "axios";

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
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const [creatingFollowing, setCreatingFollowing] = useState(false);
  const [followingStory, setFollowingStory] = useState<string | null>(null);

  const fetchDrafts = async () => {
    const { data } = await supabaseClient
      .from("drafts")
      .select()
      .eq("user_id", authUser.id)
      .order("inserted_at", { ascending: false });

    if ((data as any[]).length === 0) return;

    setDrafts(data);
  };

  useEffect(() => {
    const fetchDrafts = async () => {
      const { data } = await supabaseClient
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
      const { data, error } = await supabaseClient
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

  if (!authUser) router.push("/");

  const saveDraft = async () => {
    setSavingDraft(true);
    const id = router.query.id;

    try {
      await supabaseClient
        .from("drafts")
        .update({
          content: userInputText,
        })
        .eq("id", id);

      await fetchDrafts();
    } catch (err) {
    } finally {
      setSavingDraft(false);
    }
  };

  const createNew = async () => {
    try {
      const { data } = await axios.post("/api/createDraft");
      router.push(`/drafts/${data.result}`);
    } catch (err) {
      console.log({ err });
    }
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
                <Link
                  href={`/drafts/${d.id}`}
                  onClick={() => setDrawerOpen(false)}
                  passHref
                  style={{ textDecoration: "none" }}
                  key={d.id}
                >
                  <Button
                    component="span"
                    fullWidth
                    ta="left"
                    radius="md"
                    mb={10}
                    variant="light"
                    sx={{
                      backgroundColor: `rgba(25, 113, 194, ${
                        router.query.id === d.id ? 0.5 : 0.1
                      })`,
                    }}
                    styles={{
                      inner: { justifyContent: "start" },
                      label: { textDecoration: "none" },
                    }}
                  >
                    {d.content.slice(0, 15)}
                  </Button>
                </Link>
              );
            })}
          </>
        ) : (
          <Text>No drafts yet.</Text>
        )}
      </Drawer>
      <Box w="100%" sx={{ maxWidth: 1200, margin: "0 auto" }}>
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
              onKeyUp={async (e) => {
                if (creatingFollowing) return;
                if (
                  userInputText === "" ||
                  !userInputText ||
                  userInputText.replace(/(\s|\n)+/g, "").length === 0
                )
                  return;

                if (e.key === "Enter") {
                  setCreatingFollowing(true);
                  // Call an API to create the following story
                  const res = await fetch("/api/createFollowing", {
                    method: "POST",
                    body: JSON.stringify({ text: userInputText }),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }).then((res) => res.json());

                  setFollowingStory(res.result.replace(/^\s+/, ""));
                  setCreatingFollowing(false);
                }
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

            {creatingFollowing && <ApiResponsePlaceholder />}
            {!creatingFollowing && followingStory && (
              <ApiResponseCard result={followingStory} />
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
