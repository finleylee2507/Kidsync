import React, { useEffect, useState } from "react";
import {
  Anchor,
  Avatar,
  Box,
  Burger,
  Button,
  createStyles,
  Divider,
  Drawer,
  Group,
  Header,
  Image,
  Menu,
  ScrollArea,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { signOut } from "../../utilities/firebase";
import { useNavigate } from "react-router-dom";
import kidSyncLogo from "../../images/KidSync.png";
import { ChevronDown, Logout, Settings } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  logoText: {
    fontFamily: "'Comfortaa'",
    fontSize: "25px",
  },
  dropdownItem: {
    fontWeight: "600",
  },
  hiddenMobile: {
    [`@media (max-width: 800px)`]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [`@media (min-width: 800px)`]: {
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
    "&:hover": {
      backgroundColor: "#6147FF",
      opacity: 0.9,
    },
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

const mainLinksDesktop = [
  { label: "Home", link: "/home" },
  { label: "My Dependents", link: "/dependents" },
  { label: "My Clients", link: "/clients" },
];

const mainLinksMobile = [
  { label: "Home", link: "/home" },
  { label: "My Dependents", link: "/dependents" },
  { label: "My Clients", link: "/clients" },
  { label: "Profile Settings", link: "/profile-settings" },
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

export const Navbar = ({ user }) => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme, cx } = useStyles();
  const [active, setActive] = useState(GetUrlRelativePath());
  const navigate = useNavigate();

  useEffect(() => {
    setActive(GetUrlRelativePath());
  });

  async function signOutUser() {
    await signOut();
    navigate("/");
  }

  const SignOutButton = () => {
    const { classes, theme, cx } = useStyles();

    return (
      <Button onClick={signOutUser} className={classes.signOutButton}>
        Sign out
      </Button>
    );
  };
  const mainItemsDesktop = mainLinksDesktop.map((item) => (
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

  const mainItemsMobile = mainLinksMobile.map((item) => (
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
      pl={20}
    >
      {item.label}
    </Anchor>
  ));

  return (
    <Box>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <Image src={kidSyncLogo} height={45} width={200} fit="contain" />
          <Group
            sx={{ height: "100%" }}
            spacing={30}
            className={classes.hiddenMobile}
          >
            {mainItemsDesktop}
          </Group>
          <Group className={classes.hiddenMobile}>
            <Menu
              withArrow
              width={250}
              classNames={{
                item: classes.dropdownItem,
              }}
            >
              <Menu.Target>
                <UnstyledButton>
                  <Group>
                    <Avatar src={user && user.photoURL} radius="xl" />
                    <div style={{ flex: 1 }}>
                      <Text size="sm" weight={500}>
                        {user && user.displayName}
                      </Text>
                      <Text color="dimmed" size="xs">
                        {user && user.email}
                      </Text>
                    </div>
                    <ChevronDown size={16} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item icon={<Settings size={14} />}>
                  Profile Settings
                </Menu.Item>
                <Menu.Item
                  color="red"
                  icon={<Logout size={14} />}
                  onClick={signOutUser}
                >
                  Sign Out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>
      <Drawer.Root
        opened={drawerOpened}
        onClose={closeDrawer}
        className={classes.hiddenDesktop}
        size="100%"
        padding="md"
        zIndex={1000000}
      >
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>
              <UnstyledButton>
                <Group>
                  <Avatar src={user && user.photoURL} radius="xl" />
                  <div style={{ flex: 1 }}>
                    <Text size="sm" weight={500}>
                      {user && user.displayName}
                    </Text>
                    <Text color="dimmed" size="xs">
                      {user && user.email}
                    </Text>
                  </div>
                </Group>
              </UnstyledButton>
            </Drawer.Title>

            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body>
            <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
              <Divider
                my="sm"
                color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
              />
              {mainItemsMobile}

              <Divider
                my="sm"
                color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
              />

              <Group position="center" grow pb="xl" px="md">
                <SignOutButton />
              </Group>
            </ScrollArea>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
      {/*<Drawer*/}
      {/*  opened={drawerOpened}*/}
      {/*  onClose={closeDrawer}*/}
      {/*  size="100%"*/}
      {/*  padding="md"*/}
      {/*  title="Kidsync"*/}
      {/*  className={classes.hiddenDesktop}*/}
      {/*  zIndex={1000000}*/}
      {/*>*/}
      {/*  <UnstyledButton>*/}
      {/*    <Group>*/}
      {/*      <Avatar src={user && user.photoURL} radius="xl" />*/}
      {/*      <div style={{ flex: 1 }}>*/}
      {/*        <Text size="sm" weight={500}>*/}
      {/*          {user && user.displayName}*/}
      {/*        </Text>*/}
      {/*        <Text color="dimmed" size="xs">*/}
      {/*          {user && user.email}*/}
      {/*        </Text>*/}
      {/*      </div>*/}
      {/*    </Group>*/}
      {/*  </UnstyledButton>*/}
      {/*  <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">*/}
      {/*    <Divider*/}
      {/*      my="sm"*/}
      {/*      color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}*/}
      {/*    />*/}
      {/*    {mainItemsMobile}*/}

      {/*    <Divider*/}
      {/*      my="sm"*/}
      {/*      color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}*/}
      {/*    />*/}

      {/*    <Group position="center" grow pb="xl" px="md">*/}
      {/*      <SignOutButton />*/}
      {/*    </Group>*/}
      {/*  </ScrollArea>*/}
      {/*</Drawer>*/}
    </Box>
  );
};
