import type { AppProps } from "next/app";
import {
  MantineProvider,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = useMantineTheme();

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
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}

export default MyApp;
