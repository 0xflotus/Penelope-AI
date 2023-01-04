import { Box, Text, Modal, Title } from "@mantine/core";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { HeaderMegaMenu } from "../components/Header";
import { LoadingPlaceholder } from "../components/LoadingPlaceholder";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Inter } from "@next/font/google";
import { SignUpButton } from "../components/SignUpButton";
import type { ReduxState } from "../state/store";
import { defaultText } from "../consts";
import { UseCases } from "../components/UseCases/UseCases";
import { Features } from "../components/Features/Features";
import { AiIntroduction } from "../components/AiIntroduction/AiIntroduction";
import { Testimonials } from "../components/Testimonials/Testimonials";
import { CTA } from "../components/CTA/CTA";

const manrope = Inter({ subsets: ["latin"] });

const Home: NextPage<{ authUser: any; checkingAuth: boolean }> = ({
  authUser,
  checkingAuth,
}) => {
  const isLoggedIn = useSelector((state: ReduxState) => state.isLoggedIn);
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserLatestItem = async () => {
      const { data } = await supabaseClient
        .from("drafts")
        .select("id")
        .eq("user_id", authUser.id)
        .order("inserted_at", { ascending: false });

      if (data === null || data.length === 0) {
        setIsModalOpen(true);
        const { data } = await axios.post("/api/createDraft", {
          text: defaultText,
        });
        setIsModalOpen(false);
        router.push(`/drafts/${data.result}`);

        return;
      }

      router.push(`/drafts/${data[0].id}`);
    };

    if (isLoggedIn && authUser && authUser.id) fetchUserLatestItem();
  }, [isLoggedIn, authUser, supabaseClient, router]);

  if (checkingAuth)
    return (
      <LoadingPlaceholder authUser={authUser} checkingAuth={checkingAuth} />
    );

  return (
    <>
      <HeaderMegaMenu authUser={authUser} checkingAuth={checkingAuth} />
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        withCloseButton={false}
        closeOnClickOutside={false}
        centered
        radius="md"
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <Text
          ta="center"
          size="lg"
          weight="bold"
          sx={(theme) => ({ color: theme.colors.gray[2] })}
        >
          Generating a draft...
        </Text>
        {/* Modal content */}
      </Modal>
      <Box w="100%" sx={{ maxWidth: 1200, margin: "0 auto" }} mt={40}>
        <Box
          w="100%"
          sx={(theme) => ({
            maxWidth: 900,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            color: theme.colors.gray[0],
          })}
          px={10}
          mb={40}
          ta="center"
        >
          <Text
            className={manrope.className}
            component="h1"
            weight={900}
            size={57}
            sx={{
              "@media (max-width: 600px)": {
                fontSize: 30,
              },
            }}
          >
            {/* Write at a faster speed */}
            {/* Faster, and more interesting */}
            {/* Write with your best buddy. */}
            Your favorite{" "}
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: "red", to: "indigo", deg: 45 }}
              size={57}
              sx={{
                "@media (max-width: 600px)": {
                  fontSize: 30,
                },
              }}
              ta="center"
              fw={900}
            >
              Markdown
            </Text>{" "}
            editor powered by{" "}
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              size={57}
              sx={{
                "@media (max-width: 600px)": {
                  fontSize: 30,
                },
              }}
              ta="center"
              fw={900}
            >
              AI
            </Text>
          </Text>
          <Text
            size={24}
            className={manrope.className}
            sx={(theme) => ({
              color: theme.colors.gray[2],
            })}
          >
            Unleash the power of your writing with the most sophisticated AI
            writing assistant.
          </Text>
        </Box>
        <Box ta="center" mb={40}>
          <SignUpButton />
        </Box>
        <Box
          component="video"
          w="100%"
          autoPlay
          muted
          loop
          mb={40}
          sx={(theme) => ({ borderRadius: theme.radius.md })}
        >
          <source
            type="video/mp4"
            src="https://hjulmtlogrkrcmkvcqmk.supabase.co/storage/v1/object/public/public-images/demo-video?t=2022-12-19T07%3A36%3A08.614Z"
          />
        </Box>
      </Box>
      <Features />
      <UseCases />
      <AiIntroduction />
      {/* <Testimonials /> */}
      <CTA />
      <Footer />
    </>
  );
};

export default Home;
