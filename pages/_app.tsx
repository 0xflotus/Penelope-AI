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

const inter = Inter({ subsets: ["latin"] });

function MyApp({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const theme = useMantineTheme();
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <>
      <Head>
        <title>Tweet Editor with AI 🤖</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🪄</text></svg>"
        />
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
        <NotificationsProvider>
          <SessionContextProvider
            supabaseClient={supabaseClient}
            initialSession={pageProps.initialSession}
          >
            <AuthContainer>
              {(props) => {
                return (
                  <div className={inter.className}>
                    <Component {...pageProps} {...props} />;
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
