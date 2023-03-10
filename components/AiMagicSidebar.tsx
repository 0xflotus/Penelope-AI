import { Button, Divider, Tabs, Textarea, Title } from "@mantine/core";
import {
  IconBook,
  IconPencil,
  IconSignature,
  IconStackPush,
} from "@tabler/icons";
import { Dispatch, SetStateAction, useState } from "react";
import { ApiResponseCard } from "./ApiResponseCard";
import { ApiResponsePlaceholder } from "./ApiResponsePlaceholder";
import { AutoGeneratedBox } from "./AutoGeneratedBox";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const AIMagicSidebar = ({
  setUserInputText,
  creatingFollowing,
  followingStory,
}: {
  setUserInputText: Dispatch<SetStateAction<string | null>>;
  creatingFollowing: boolean;
  followingStory: string | null;
}) => {
  const [result, setResult] = useState(null);
  const [isParaphrasing, setIsParaphrasing] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isCreatingStory, setIsCreatingStory] = useState(false);
  const [targetText, setTargetText] = useState("");

  const loading = isParaphrasing || isSummarizing || isCreatingStory;

  const pushText = (additionalText: string) => {
    setUserInputText((prev) => {
      if (prev === null || prev === "") {
        return additionalText;
      }
      return `${prev}\n${additionalText}`;
    });
  };

  const paraphrase = async () => {
    setIsParaphrasing(true);
    setResult(null);

    try {
      const res = await fetch("/api/paraphrase", {
        method: "POST",
        body: JSON.stringify({ text: targetText }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      setResult(res.result.replace(/^\s+/, ""));
    } catch (err) {
    } finally {
      setIsParaphrasing(false);
    }
  };

  const summarize = async () => {
    setIsSummarizing(true);
    setResult(null);

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        body: JSON.stringify({ text: targetText }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      setResult(res.result.replace(/^\s+/, ""));
    } catch (err) {
    } finally {
      setIsSummarizing(false);
    }
  };

  const createStory = async () => {
    setIsCreatingStory(true);
    setResult(null);

    try {
      const res = await fetch("/api/createStory", {
        method: "POST",
        body: JSON.stringify({ text: targetText }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      setResult(res.result.replace(/^\s+/, ""));
    } catch (err) {
    } finally {
      setIsCreatingStory(false);
    }
  };

  return (
    <>
      <Title order={3} mb={10} className={inter.className}>
        Penelope is here to help you
      </Title>
      <Tabs radius="lg" defaultValue="gallery">
        <Tabs.List>
          <Tabs.Tab
            value="gallery"
            color="indigo"
            icon={<IconSignature size={14} />}
          >
            Paraphrase
          </Tabs.Tab>
          <Tabs.Tab value="messages" icon={<IconPencil size={14} />}>
            Summarize
          </Tabs.Tab>
          <Tabs.Tab
            value="settings"
            color="violet"
            icon={<IconBook size={14} />}
          >
            Story
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery" pt="xs">
          <Textarea
            onChange={(e) => {
              setTargetText(e.target.value);
            }}
            placeholder="Some text you wanna paraphrase"
            label="Some text you wanna paraphrase"
            radius="md"
            size="sm"
            minRows={5}
            mb={15}
          />

          <Button
            onClick={paraphrase}
            loading={isParaphrasing}
            color="indigo"
            radius="xl"
            size="sm"
            fullWidth
            disabled={
              targetText.replace(/(\s|\n)+/g, "") === "" || targetText === null
            }
          >
            Paraphrase
          </Button>
        </Tabs.Panel>

        <Tabs.Panel value="messages" pt="xs">
          <Textarea
            onChange={(e) => {
              setTargetText(e.target.value);
            }}
            placeholder="Some text you wanna summarize"
            label="Some text you wanna summarize"
            radius="md"
            size="sm"
            minRows={5}
            mb={15}
          />
          <Button
            onClick={summarize}
            loading={isSummarizing}
            radius="xl"
            size="sm"
            fullWidth
            disabled={
              targetText.replace(/(\s|\n)+/g, "") === "" || targetText === null
            }
          >
            Summarize
          </Button>
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt="xs">
          <Textarea
            onChange={(e) => {
              setTargetText(e.target.value);
            }}
            placeholder="Some topic you wanna make a story from"
            label="Some topic you wanna make a story from"
            radius="md"
            size="sm"
            minRows={3}
            mb={15}
          />
          <Button
            onClick={createStory}
            loading={isCreatingStory}
            color="violet"
            radius="xl"
            size="sm"
            fullWidth
            disabled={
              targetText.replace(/(\s|\n)+/g, "") === "" || targetText === null
            }
          >
            Create a story
          </Button>
        </Tabs.Panel>
      </Tabs>

      {result && (
        <>
          <ApiResponseCard result={result} />
          <Button
            leftIcon={<IconStackPush />}
            onClick={() => pushText(result)}
            radius="xl"
            size="sm"
            fullWidth
            mt={10}
            color="dark"
          >
            Add it to the end of your document
          </Button>
        </>
      )}
      {loading && <ApiResponsePlaceholder />}
      <Divider my={40} />
      <AutoGeneratedBox
        setUserInputText={setUserInputText}
        creatingFollowing={creatingFollowing}
        followingStory={followingStory}
      />
    </>
  );
};
