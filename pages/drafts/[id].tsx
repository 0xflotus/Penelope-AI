import { Box, Button, Text, Textarea } from "@mantine/core";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { AIMagicSidebar } from "../../components/AiMagicSidebar";
import { HeaderMegaMenu } from "../../components/Header";
import { LoadingPlaceholder } from "../../components/LoadingPlaceholder";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Head from "next/head";
import { showNotification } from "@mantine/notifications";
import { NavbarLeft } from "../../components/NavbarLeft";
import { useSelector } from "react-redux";

const Drafts: NextPage<{ authUser: any; checkingAuth: boolean }> = ({
  authUser,
  checkingAuth,
}) => {
  const [userInputText, setUserInputText] = useState<string | null>(null);
  const [savingDraft, setSavingDraft] = useState(false);
  const [drafts, setDrafts] = useState<any[] | null>(null);
  const [creatingFollowing, setCreatingFollowing] = useState(false);
  const [followingStory, setFollowingStory] = useState<string | null>(null);
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
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

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" key="noindex" />
      </Head>
      <Box
        sx={{
          display: "flex",
          transition: "padding 300ms",
          paddingLeft: isMenuDrawerOpen ? 0 : 300,
        }}
      >
        <NavbarLeft drafts={drafts} />
        <Box sx={{ width: "100%" }}>
          <HeaderMegaMenu authUser={authUser} checkingAuth={checkingAuth} />
          <Box
            w="100%"
            pl={20}
            sx={{
              "@media (max-width: 600px)": {
                paddingLeft: 0,
              },
            }}
          >
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
                  position: "relative",
                  "@media (max-width: 600px)": {
                    width: "100%",
                    marginBottom: 20,
                  },
                }}
              >
                <Box>
                  <Text fz="sm">
                    *Penelope will write the followed-up sentence when you hit
                    the enter key. The result will be displayed on the sidebar
                    on the right.
                  </Text>
                  <Textarea
                    mb={15}
                    styles={{
                      input: {
                        height: "calc(100vh - 125px)",
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
                        // Call an API to create the follow-up story
                        const res = await fetch("/api/createFollowing", {
                          method: "POST",
                          body: JSON.stringify({ text: userInputText }),
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }).then((res) => res.json());

                        if (res.result.replace(/^\s+/, "") === "") {
                          showNotification({
                            title: "Bummer!",
                            message:
                              "Sorry, AI couldn't generate the followed-up story. Please try it after rephrasing your text 🤖",
                            color: "yellow",
                            radius: "md",
                          });

                          setCreatingFollowing(false);
                          return;
                        }

                        setFollowingStory(res.result.replace(/^\s+/, ""));
                        setCreatingFollowing(false);
                      }
                    }}
                    radius="md"
                    size="md"
                    minRows={10}
                    value={userInputText ?? ""}
                  />
                </Box>

                <Box
                  h={36}
                  sx={{
                    position: "absolute",
                    bottom: 40,
                    right: 20,
                  }}
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
                </Box>
              </Box>
              <Box
                w="40%"
                p={20}
                sx={(theme) => ({
                  backgroundColor: theme.colors.dark[7],
                  "@media (max-width: 600px)": {
                    width: "100%",
                    marginBottom: 40,
                  },
                })}
              >
                <AIMagicSidebar
                  setUserInputText={setUserInputText}
                  creatingFollowing={creatingFollowing}
                  followingStory={followingStory}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Drafts;
