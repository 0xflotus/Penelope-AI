import { Box, Text, Textarea, Title, useMantineTheme } from "@mantine/core";
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
      <HeaderMegaMenu />
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
          sx={(theme) => ({
            display: "flex",
            columnGap: 30,
            "@media (max-width: 600px)": {
              flexDirection: "column",
              padding: "0 10px",
            },
          })}
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
          <Box w={600}>
            <AIMagicSidebar setUserInputText={setUserInputText} />
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
