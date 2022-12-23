import { Tabs, Textarea } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconDeviceTv, IconMarkdown } from "@tabler/icons";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Preview } from "./Preview";

export const EditorAndPreview = ({
  userInput,
  setUserInput,
}: {
  userInput: string;
  setUserInput: Dispatch<SetStateAction<string | null>>;
}) => {
  const [creatingFollowing, setCreatingFollowing] = useState(false);
  const [followingStory, setFollowingStory] = useState<string | null>(null);

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

      <Tabs.Panel value="gallery" pt="xs">
        <Textarea
          styles={{
            input: {
              border: "none",
              borderRadius: 0,
              height: "calc(100vh - 102px)",
              "@media (max-width: 600px)": {
                height: "auto",
              },
            },
          }}
          onChange={(e) => {
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
        <Preview content={"Hello"} />
      </Tabs.Panel>
    </Tabs>
  );
};
