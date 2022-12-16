import { Box, Button, Drawer, Text, Textarea } from "@mantine/core";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { AIMagicSidebar } from "../../components/AiMagicSidebar";
import twitter from "twitter-text";
import { HeaderMegaMenu } from "../../components/Header";
import { LoadingPlaceholder } from "../../components/LoadingPlaceholder";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { ApiResponsePlaceholder } from "../../components/ApiResponsePlaceholder";
import { ApiResponseCard } from "../../components/ApiResponseCard";
import axios from "axios";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { MENU_DRAWER_CLOSE } from "../../state/action";
import Head from "next/head";

const Drafts: NextPage<{ authUser: any; checkingAuth: boolean }> = ({
  authUser,
  checkingAuth,
}) => {
  const [userInputText, setUserInputText] = useState<string | null>(null);
  const [savingDraft, setSavingDraft] = useState(false);
  const [drafts, setDrafts] = useState<any[] | null>(null);
  const [creatingFollowing, setCreatingFollowing] = useState(false);
  const [followingStory, setFollowingStory] = useState<string | null>(null);
  const [creatingDraft, setCreatingDraft] = useState(false);
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const dispatch = useDispatch();
  const isMenuDrawerOpen = useSelector(
    (state) => (state as any).isMenuDrawerOpen
  );

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
    const fetchDraft = async () => {
      try {
        const { data, error } = await supabaseClient
          .from("drafts")
          .select()
          .eq("id", router.query.id)
          .single();

        if (error !== null) router.push("/");

        if (!data) return;

        setUserInputText(data.content);
      } catch (err) {
        console.log({ err });
      }
    };

    const fetchDrafts = async () => {
      const { data } = await supabaseClient
        .from("drafts")
        .select()
        .eq("user_id", authUser.id)
        .order("inserted_at", { ascending: false });

      if ((data as any[]).length === 0) return;

      setDrafts(data);
    };

    if (authUser) {
      fetchDrafts();
      setUserInputText(null);
      fetchDraft();
    }
  }, [authUser, router.query.id, router, supabaseClient]);

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
      setCreatingDraft(true);
      const { data } = await axios.post("/api/createDraft");
      router.push(`/drafts/${data.result}`);
    } catch (err) {
      console.log({ err });
    } finally {
      setCreatingDraft(false);
    }
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" key="noindex" />
      </Head>
      <Box sx={{ position: "relative" }}>
        <HeaderMegaMenu authUser={authUser} checkingAuth={checkingAuth} />
        <Drawer
          opened={isMenuDrawerOpen}
          onClose={() => dispatch({ type: MENU_DRAWER_CLOSE })}
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
                    onClick={() => dispatch({ type: MENU_DRAWER_CLOSE })}
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
                      {d.content === "" ? "No Title" : d.content.slice(0, 15)}
                    </Button>
                  </Link>
                );
              })}
            </>
          ) : (
            <Text>No drafts yet.</Text>
          )}
        </Drawer>
        <Box w="100%" pl={20}>
          <Box
            component="main"
            sx={{
              height: "100%",
              minHeight: "calc(100vh - 60px)",
              display: "flex",
              columnGap: 30,
              "@media (max-width: 600px)": {
                flexDirection: "column",
                padding: "0 10px",
                minHeight: "auto",
              },
            }}
          >
            <Box
              pt={20}
              w="60%"
              sx={{
                "@media (max-width: 600px)": {
                  width: "100%",
                  marginBottom: 20,
                },
              }}
            >
              <Box>
                <Textarea
                  styles={{
                    input: {
                      height: "calc(100vh - 185px)",
                      "@media (max-width: 600px)": {
                        height: "auto",
                      },
                    },
                  }}
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
              </Box>

              <Box
                h={36}
                sx={{ display: "flex", alignItems: "center", columnGap: 20 }}
              >
                <Button
                  radius="xl"
                  onClick={saveDraft}
                  loading={savingDraft}
                  variant="light"
                  color="indigo"
                >
                  Save a draft
                </Button>
                <Button
                  radius="xl"
                  onClick={createNew}
                  sx={{ display: "block" }}
                  loading={creatingDraft}
                  color="dark"
                >
                  Create a new Draft
                </Button>
              </Box>

              {creatingFollowing && <ApiResponsePlaceholder />}
              {!creatingFollowing && followingStory && (
                <ApiResponseCard result={followingStory} />
              )}
            </Box>
            <Box
              w="40%"
              p={20}
              sx={(theme) => ({
                backgroundColor: theme.colors.dark[7],
                "@media (max-width: 600px)": {
                  width: "100%",
                },
              })}
            >
              <AIMagicSidebar setUserInputText={setUserInputText} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Drafts;
