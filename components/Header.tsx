import {
  createStyles,
  Header,
  Group,
  Button,
  Box,
  Burger,
  Drawer,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

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

export const HeaderMegaMenu = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes } = useStyles();

  return (
    <Box pb={40}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          🤖
          {/* <Group className={classes.hiddenMobile}>
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          /> */}
        </Group>
      </Header>

      {/* <Drawer
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
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer> */}
    </Box>
  );
};
