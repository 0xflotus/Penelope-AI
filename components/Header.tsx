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
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { IconLayoutSidebarLeftExpand } from "@tabler/icons";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT, MENU_DRAWER_OPEN, MODAL_OPEN } from "../state/action";
import { Logo } from "./Logo";

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
  const supabaseClient = useSupabaseClient();

  const isHeaderFullWidth = router.pathname === "/drafts/[id]";

  const signUp = async () => dispatch({ type: MODAL_OPEN });

  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    dispatch({ type: LOGOUT });
    router.push("/");
  };

  return (
    <Box>
      <Header
        height={60}
        px="md"
        sx={(theme) => ({ backgroundColor: theme.colors.dark[9] })}
      >
        <Group
          position="apart"
          sx={{
            height: "100%",
            maxWidth: isHeaderFullWidth ? "100%" : 1200,
            margin: "0 auto",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", columnGap: 20 }}>
            {authUser && (
              <ActionIcon
                color="indigo"
                variant="default"
                onClick={() => dispatch({ type: MENU_DRAWER_OPEN })}
              >
                <IconLayoutSidebarLeftExpand size={34} />
              </ActionIcon>
            )}
            <Logo />
          </Box>
          <Group className={classes.hiddenMobile}>
            {checkingAuth ? (
              <Loader />
            ) : isLoggedIn ? (
              <Button variant="default" onClick={signOut} radius="xl">
                Log out
              </Button>
            ) : (
              <Button
                radius="xl"
                onClick={signUp}
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan" }}
                sx={{
                  boxShadow: "none",
                  transition: "box-shadow 200ms",
                  "&:hover": { boxShadow: "0 0 9px 3px #748FFC" },
                }}
              >
                Log in / Sign up for free
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
