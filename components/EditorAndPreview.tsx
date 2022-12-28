import { Box, Loader, Tabs, Textarea } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconDeviceTv, IconMarkdown } from "@tabler/icons";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Preview } from "./Preview";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export const EditorAndPreview = ({
  userInput,
  setUserInput,
}: {
  userInput: string;
  setUserInput: Dispatch<SetStateAction<string | null>>;
}) => {
  const router = useRouter();
  const [creatingFollowing, setCreatingFollowing] = useState(false);
  const [followingStory, setFollowingStory] = useState<string | null>(null);
  const [needToSave, setNeedToSave] = useState(false);
  const supabaseClient = useSupabaseClient();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const saveDraft = async () => {
      setSaving(true);
      const id = router.query.id;

      try {
        await supabaseClient
          .from("drafts")
          .update({
            content: userInput,
          })
          .eq("id", id);

        setNeedToSave(false);
      } catch (err) {
      } finally {
        setSaving(false);
        setNeedToSave(false);
      }
    };

    if (needToSave) saveDraft();
  }, [needToSave, router.query.id, supabaseClient, userInput]);

  return (
    <Tabs defaultValue="gallery">
      <Tabs.List>
        <Tabs.Tab value="gallery" icon={<IconMarkdown size={14} />}>
          Draft
        </Tabs.Tab>
        <Tabs.Tab value="messages" icon={<IconDeviceTv size={14} />}>
          Preview
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery" pt="xs" sx={{ position: "relative" }}>
        {saving && (
          <Box top={20} right={20} sx={{ position: "absolute", zIndex: 99999 }}>
            <Loader size="sm" color="indigo" />
          </Box>
        )}
        <Textarea
          styles={(theme) => ({
            input: {
              border: "none",
              borderRadius: 0,
              height: "calc(100vh - 148px)",
              backgroundColor: theme.colors.dark[9],
            },
          })}
          onChange={(e) => {
            setNeedToSave(true);
            setUserInput(e.target.value);
          }}
          onKeyUp={async (e) => {
            if (creatingFollowing) return;
            if (
              userInput === "" ||
              !userInput ||
              userInput.replace(/(\s|\n)+/g, "").length === 0
            )
              return;

            if (e.key === "Enter") {
              setCreatingFollowing(true);
              // Call an API to create the follow-up story
              const res = await fetch("/api/createFollowing", {
                method: "POST",
                body: JSON.stringify({ text: userInput }),
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
          size="md"
          minRows={10}
          value={userInput ?? ""}
        />
      </Tabs.Panel>

      <Tabs.Panel value="messages" pt="xs">
        <Preview content={userInput} />
      </Tabs.Panel>
    </Tabs>
  );
};
