import { Box, Button, Paper, Text, Textarea, Title } from "@mantine/core";
import type { NextPage } from "next";
import { useState } from "react";
import CustomCopyButton from "../components/CustomCopyButton";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  const [userInputText, setUserInputText] = useState<string | null>(null);
  const [result, setResult] = useState(null);
  const [isParaphrasing, setIsParaphrasing] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isCreatingStory, setIsCreatingStory] = useState(false);

  const paraphrase = async () => {
    setIsParaphrasing(true);

    try {
      const res = await fetch("/api/paraphrase", {
        method: "POST",
        body: JSON.stringify({ text: userInputText }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      setResult(res.result);
    } catch (err) {
    } finally {
      setIsParaphrasing(false);
    }
  };

  const summarize = async () => {
    setIsSummarizing(true);

    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        body: JSON.stringify({ text: userInputText }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      setResult(res.result);
    } catch (err) {
    } finally {
      setIsSummarizing(false);
    }
  };

  const createStory = async () => {
    setIsCreatingStory(true);

    try {
      const res = await fetch("/api/createStory", {
        method: "POST",
        body: JSON.stringify({ text: userInputText }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      setResult(res.result);
    } catch (err) {
    } finally {
      setIsCreatingStory(false);
    }
  };

  return (
    <>
      <Box
        h="100%"
        component="main"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box w={600}>
          <Title order={1} mb={20}>
            Tweet Editor with AI 🤖
          </Title>
          <Textarea
            onChange={(e) => {
              setUserInputText(e.target.value);
            }}
            placeholder="Your Tweet"
            label="Your Tweet"
            radius="md"
            size="md"
            minRows={10}
          />
          <Box mt={20} sx={{ display: "flex", gap: 10 }}>
            <Button
              onClick={paraphrase}
              loading={isParaphrasing}
              color="yellow"
              radius="xl"
              size="md"
            >
              Paraphrase
            </Button>
            <Button
              onClick={summarize}
              loading={isSummarizing}
              color="lime"
              radius="xl"
              size="md"
            >
              Summarize
            </Button>
            <Button
              onClick={createStory}
              loading={isCreatingStory}
              color="grape"
              radius="xl"
              size="md"
            >
              Create a story
            </Button>
          </Box>
          {result && (
            <Box mt={30}>
              <CustomCopyButton value={result} />
              <Paper
                sx={(theme) => ({ backgroundColor: theme.black })}
                shadow="md"
                radius="md"
                p="md"
              >
                <Text>{result}</Text>
              </Paper>
            </Box>
          )}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
