import { Box, Button, Paper, Text, Textarea, Title } from "@mantine/core";
import { IconBook, IconPencil, IconSignature } from "@tabler/icons";
import { useState } from "react";
import { CustomCopyButton } from "./CustomCopyButton";

export const AIMagicSidebar = () => {
  const [result, setResult] = useState(null);
  const [isParaphrasing, setIsParaphrasing] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isCreatingStory, setIsCreatingStory] = useState(false);
  const [targetText, setTargetText] = useState("");

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
      <Title order={3} sx={(theme) => ({ color: theme.colors.gray[2] })}>
        Magic side bar 🪄
      </Title>
      <Textarea
        onChange={(e) => {
          setTargetText(e.target.value);
        }}
        placeholder="Some text you wanna manipulate with AI"
        label="Some text you wanna manipulate with AI"
        radius="md"
        size="md"
        minRows={5}
      />
      <Box mt={20} sx={{ display: "flex", gap: 10 }}>
        <Button
          onClick={paraphrase}
          loading={isParaphrasing}
          color="yellow"
          radius="xl"
          size="md"
          leftIcon={<IconSignature />}
        >
          Paraphrase
        </Button>
        <Button
          onClick={summarize}
          loading={isSummarizing}
          color="lime"
          radius="xl"
          size="md"
          leftIcon={<IconPencil />}
        >
          Summarize
        </Button>
        <Button
          onClick={createStory}
          loading={isCreatingStory}
          color="grape"
          radius="xl"
          size="md"
          leftIcon={<IconBook />}
        >
          Create a story
        </Button>
      </Box>
      {result && (
        <Box mt={30}>
          <Paper
            sx={(theme) => ({ backgroundColor: theme.black, display: "flex" })}
            shadow="md"
            radius="md"
            p="md"
          >
            <Text w="95%">{result}</Text>
            <CustomCopyButton value={result} />
          </Paper>
        </Box>
      )}
    </>
  );
};
