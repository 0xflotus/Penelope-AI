import { Box, Textarea, Title } from "@mantine/core";
import type { NextPage } from "next";
import { useState } from "react";
import { AIMagicSidebar } from "../components/AiMagicSidebar";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  const [userInputText, setUserInputText] = useState<string | null>(null);

  return (
    <>
      <Box sx={{ height: "calc(100vh - 320px)" }} pt={30}>
        <Box w={1000} sx={{ margin: "0 auto" }}>
          <Title order={1} mb={20} weight={900}>
            Tweet Editor with AI 🤖
          </Title>
        </Box>
        <Box
          component="main"
          sx={{ display: "flex", margin: "0 auto", columnGap: 20 }}
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
            />
          </Box>
          <Box w={400}>
            <AIMagicSidebar userInputText={userInputText ?? ""} />
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
