import {
  createStyles,
  Header,
  Group,
  Button,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT, MODAL_OPEN } from "../state/action";

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export const HeaderMegaMenu = ({
  authUser,
  checkingAuth,
}: {
  authUser: any;
  checkingAuth: boolean;
}) => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => (state as any).isLoggedIn);
  const router = useRouter();
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const signUp = async () => dispatch({ type: MODAL_OPEN });

  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    dispatch({ type: LOGOUT });
    router.push("/");
  };

  return (
    <Box pb={40}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            🤖
          </Link>
          <Group className={classes.hiddenMobile}>
            {checkingAuth ? (
              <Loader />
            ) : isLoggedIn ? (
              <Button variant="default" onClick={signOut} radius="xl">
                Log out
              </Button>
            ) : (
              <Button radius="xl" onClick={signUp} color="indigo">
                Log in / Sign up
              </Button>
            )}
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
          <Group position="center" grow pb="xl" px="md">
            {checkingAuth ? (
              <Loader />
            ) : isLoggedIn ? (
              <Button variant="default" onClick={signOut} radius="xl">
                Log out
              </Button>
            ) : (
              <Button radius="xl" onClick={signUp} color="indigo">
                Log in / Sign up
              </Button>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};
