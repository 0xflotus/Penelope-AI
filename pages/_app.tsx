import type { AppProps } from "next/app";
import { MantineProvider, useMantineTheme } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import Head from "next/head";
import { AuthContainer } from "../components/AuthContainer";
import { wrapper } from "../state/store";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import type { Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { LoginModal } from "../components/LoginModal";
import { Inter } from "@next/font/google";
import { GoogleAnalytics } from "nextjs-google-analytics";

const inter = Inter({ subsets: ["latin"] });

const url = "https://penelope-ai.vercel.app/";
const description =
  "Unleash the power of your writing with the most sophisticated AI writing assistant";
const title =
  "Penelope AI - Unleash the power of your writing with the most sophisticated AI writing assistant";

function MyApp({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const theme = useMantineTheme();
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <>
      <GoogleAnalytics
        trackPageViews={process.env.NEXT_PUBLIC_PROD === "true"}
      />
      <Head>
        <title>{title}</title>
        <meta property="og:type" content="website" key="og-type" />
        <meta
          property="og:image"
          content="https://hjulmtlogrkrcmkvcqmk.supabase.co/storage/v1/object/public/public-images/ogp"
          key="og-image"
        />
        <meta property="og:locale" content="en_US" key="og-locale" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="og:description"
          content={description}
          key="og-description"
        />
        <meta property="og:title" content={title} key="og-title" />
        <meta property="og:url" content={url} key="og-url" />
        <meta name="description" content={description} key="description" />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          globalStyles: (theme) => ({
            body: { backgroundColor: theme.colors.dark[9] },
          }),
          components: {
            Title: {
              styles: {
                root: {
                  color: theme.colors.gray[2],
                },
              },
            },
            Tabs: {
              styles: {
                tabLabel: {
                  color: theme.colors.gray[2],
                },
              },
            },
            Textarea: {
              styles: {
                label: {
                  color: theme.colors.gray[2],
                },
              },
            },
          },
          /** Put your mantine theme override here */
          colorScheme: "dark",
        }}
      >
        <NotificationsProvider position="top-center">
          <SessionContextProvider
            supabaseClient={supabaseClient}
            initialSession={pageProps.initialSession}
          >
            <AuthContainer>
              {(props) => {
                return (
                  <div className={inter.className}>
                    <Component {...pageProps} {...props} />
                  </div>
                );
              }}
            </AuthContainer>
            <LoginModal />
          </SessionContextProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
