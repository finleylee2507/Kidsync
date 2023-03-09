import React, { useState, useEffect } from "react";
import {
  createStyles,
  Header,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Anchor,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { signOut } from "../../utilities/firebase";
import { useNavigate } from "react-router-dom";

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

  mainLinkActive: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottomColor:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 6],
  },

  signOutButton: {
    backgroundColor: "#6147FF",
  },
  mainLink: {
    textTransform: "uppercase",
    fontSize: 13,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    padding: `7px ${theme.spacing.sm}px`,
    fontWeight: 700,
    borderBottom: "2px solid transparent",
    transition: "border-color 100ms ease, color 100ms ease",
    height: 60,
    display: "flex",
    alignItems: "center",

    "&:hover": {
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
      textDecoration: "none",
    },
  },
}));

const SignOutButton = () => {
  const { classes, theme, cx } = useStyles();
  const navigate = useNavigate();

  async function signOutUser() {
    await signOut();
    navigate("/");
  }

  return (
    <Button onClick={signOutUser} className={classes.signOutButton}>
      Sign out
    </Button>
  );
};

const mainLinks = [
  { label: "Home", link: "/home" },
  { label: "My Dependents", link: "/dependents" },
  { label: "In My Care", link: "/clients" },
];

function GetUrlRelativePath() {
  let url = document.location.toString();
  let arrUrl = url.split("//");

  let start = arrUrl[1].indexOf("/");
  let relUrl = arrUrl[1].substring(start);

  if (relUrl.indexOf("?") != -1) {
    relUrl = relUrl.split("?")[0];
  }
  return relUrl;
}

export function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme, cx } = useStyles();
  const [active, setActive] = useState(GetUrlRelativePath());
  const navigate = useNavigate();

  useEffect(() => {
    setActive(GetUrlRelativePath());
  });

  const mainItems = mainLinks.map((item) => (
    <Anchor
      href={item.link}
      key={item.label}
      className={cx(classes.mainLink, {
        [classes.mainLinkActive]: item.link === active,
      })}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.link);
        navigate(item.link);
      }}
    >
      {item.label}
    </Anchor>
  ));

  return (
    <Box pb={30}>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          KidSync
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            {mainItems}
          </Group>
          <Group className={classes.hiddenMobile}>
            <SignOutButton />
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
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />
          {mainItems}

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            <SignOutButton />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
