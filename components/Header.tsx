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
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../state/action";
import { supabase } from "../utils/supabaseClient";

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

  const signUp = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    dispatch({ type: LOGOUT });
  };

  return (
    <Box pb={40}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          🤖
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
