import { Box, Text } from "@mantine/core";
import type { NextPage } from "next";
import { useEffect } from "react";
import Footer from "../components/Footer";
import { HeaderMegaMenu } from "../components/Header";
import { LoadingPlaceholder } from "../components/LoadingPlaceholder";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Inter } from "@next/font/google";
import { FeaturesGrid } from "../components/Features";
import { SignUpButton } from "../components/SignUpButton";
import type { ReduxState } from "../state/store";
import { defaultText } from "../consts";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage<{ authUser: any; checkingAuth: boolean }> = ({
  authUser,
  checkingAuth,
}) => {
  const isLoggedIn = useSelector((state: ReduxState) => state.isLoggedIn);
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    const fetchUserLatestItem = async () => {
      const { data } = await supabaseClient
        .from("drafts")
        .select("id")
        .eq("user_id", authUser.id)
        .order("inserted_at", { ascending: false });

      if (data === null || data.length === 0) {
        const { data } = await axios.post("/api/createDraft", {
          text: defaultText,
        });
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
      <Box w="100%" sx={{ maxWidth: 1200, margin: "0 auto" }} mt={40}>
        <Box
          w="100%"
          sx={{
            maxWidth: 900,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
          }}
          px={10}
          mb={40}
          ta="center"
        >
          <Text
            className={inter.className}
            component="h1"
            weight={900}
            size={57}
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            sx={{
              "@media (max-width: 600px)": {
                fontSize: 30,
              },
            }}
          >
            {/* Write at a faster speed */}
            Faster, and more interesting
            {/* Write with your best buddy. */}
          </Text>
          <Text
            size={24}
            className={inter.className}
            sx={(theme) => ({
              color: theme.colors.gray[5],
            })}
          >
            Unleash the power of your writing with the most sophisticated AI
            writing assistant.
          </Text>
        </Box>
        <Box ta="center" mb={40}>
          <SignUpButton />
        </Box>
        <FeaturesGrid
          title="Speed up your writing effortlessly"
          description="Every once in a while, you'll see a Golbat that's missing some fangs. This happens when hunger drives it to try biting a Steel-type Pokémon."
        />
        <Box ta="center">
          <SignUpButton />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
