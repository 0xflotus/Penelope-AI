import { useEffect, useState } from "react";
import { createStyles, Navbar, Group, Title, Box, Loader } from "@mantine/core";
import {
  IconLogout,
  IconFile,
  IconFilePlus,
  IconSettings,
} from "@tabler/icons";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { Inter } from "@next/font/google";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { LOGOUT } from "../state/action";
import { useRouter } from "next/router";
import axios from "axios";
import type { ReduxState } from "../state/store";

const inter = Inter({ subsets: ["latin"] });

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
      position: "sticky",
      bottom: 0,
      backgroundColor: theme.colors.dark[7],
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      fontWeight: 500,
      cursor: "pointer",
      borderRadius: 0,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },
    },
  };
});

export const NavbarLeft = ({ drafts }: any) => {
  const supabaseClient = useSupabaseClient();
  const dispatch = useDispatch();
  const router = useRouter();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(router.query.id);
  const isMenuDrawerOpen = useSelector(
    (state: ReduxState) => state.isMenuDrawerOpen
  );
  const [creatingDraft, setCreatingDraft] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const signOut = async () => {
    setIsLoggingOut(true);
    const { error } = await supabaseClient.auth.signOut();
    dispatch({ type: LOGOUT });
    setIsLoggingOut(false);
    router.push("/");
  };

  const createNew = async () => {
    try {
      setCreatingDraft(true);
      const { data } = await axios.post("/api/createDraft");
      router.push(`/drafts/${data.result}`);
    } catch (err) {
      console.log({ err });
    } finally {
      setCreatingDraft(false);
    }
  };

  const links = drafts?.map((d: any) => {
    return (
      <Link
        className={cx(classes.link, {
          [classes.linkActive]: d.id === active,
        })}
        href={`/drafts/${d.id}`}
        key={d.id}
        onClick={() => {
          setActive(d.id);
        }}
      >
        <IconFile className={classes.linkIcon} stroke={1.5} />
        <span>
          {d.content === "" ? "No Title" : `${d.content.slice(0, 20)}...`}
        </span>
      </Link>
    );
  });

  useEffect(() => {
    setActive(router.query.id);
  }, [router.query.id]);

  return (
    <Navbar
      height="100vh"
      pb={0}
      top={0}
      left={0}
      // need this for small devices later
      // w={{ sm: 300 }}
      w={300}
      sx={{
        overflow: "auto",
        transform: `translateX(${isMenuDrawerOpen ? 0 : -100}%)`,
        padding: isMenuDrawerOpen ? 0 : 16,
        transition: "transform 300ms",
        position: "absolute",
      }}
    >
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Title
            order={3}
            size={20}
            className={inter.className}
            px="md"
            pt="md"
          >
            Drafts
          </Title>
        </Group>
        <Box component="a" className={classes.link} onClick={() => createNew()}>
          {creatingDraft ? (
            <Loader size="sm" mr={10} />
          ) : (
            <IconFilePlus className={classes.linkIcon} stroke={1.5} />
          )}
          <span>Create a new draft</span>
        </Box>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer} pb={16}>
        <Link className={classes.link} href="/extension-token">
          <IconSettings className={classes.linkIcon} stroke={1.5} />
          <span>Chrome Extension Token</span>
        </Link>
      </Navbar.Section>

      <Navbar.Section className={classes.footer} pb={16}>
        <a
          className={classes.link}
          onClick={async (event) => {
            event.preventDefault();
            await signOut();
          }}
        >
          {isLoggingOut ? (
            <Loader size="sm" mr={10} />
          ) : (
            <IconLogout className={classes.linkIcon} stroke={1.5} />
          )}
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
};
