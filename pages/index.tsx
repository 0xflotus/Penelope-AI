import { Box, Textarea, Title, useMantineTheme } from "@mantine/core";
import type { NextPage } from "next";
import { useState } from "react";
import { AIMagicSidebar } from "../components/AiMagicSidebar";
import Footer from "../components/Footer";
import twitter from "twitter-text";
import { HeaderMegaMenu } from "../components/Header";

const Home: NextPage = () => {
  const [userInputText, setUserInputText] = useState<string | null>(null);

  return (
    <>
      <Box sx={{ height: "calc(100vh - 320px)" }}>
        <HeaderMegaMenu />
        <Box w={1000} sx={{ margin: "0 auto" }}>
          <Title order={1} mb={30} weight={900}>
            Tweet Editor with AI 🤖
          </Title>
        </Box>
        <Box
          component="main"
          sx={{ display: "flex", margin: "0 auto", columnGap: 30 }}
          w={1000}
        >
          <Box w={600}>
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
          </Box>
          <Box w={400}>
            <AIMagicSidebar setUserInputText={setUserInputText} />
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
