import {
  Badge,
  Button,
  Card,
  createStyles,
  Group,
  Image,
  Menu,
  Text,
  ActionIcon,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },

    cursor: "pointer",
  },

  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    alignItems: "start",
    justifyContent: "center",
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  trashIcon: {
    position: "absolute",
    right: "2%",
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: -0.25,
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: 5,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));

const DependentCard = ({
  dependent,
  showAll,
  handleNewModalState,
  handleExistingModalState,
  setCurrentDependentName,
  setCurrentDependentID,
  setIsConfirmationModalOpen,
}) => {
  const { classes, theme } = useStyles();
  const navigate = useNavigate();

  //handle click card
  const handleViewDependent = (dependent) => {
    // use navigate() to pass the data
    navigate("/view-dependent", { state: dependent });
  };

  //handle click edit
  const handleEditDependent = (dependent, event) => {
    event.stopPropagation(); //prevent parent listener from firing
    navigate("/edit-dependents-profile", { state: dependent });
  };
  // try to find out how old is this kid
  const birthday = new Date(dependent.basic.birthday);
  const age = parseInt(
    (new Date().getTime() - birthday.getTime()) / (1000 * 60 * 60 * 24 * 365)
  );

  return (
    <div
      style={
        showAll
          ? { maxWidth: "25rem", margin: "0 auto" }
          : { width: "25rem", margin: "2rem" }
      }
    >
      <Card
        withBorder
        radius="md"
        className={classes.card}
        onClick={() => {
          handleViewDependent(dependent);
        }}
      >
        <Card.Section className={classes.imageSection}>
          <Image
            src={
              dependent.basic.profilePic && dependent.basic.profilePic !== "N/A"
                ? dependent.basic.profilePic.fileLink
                : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
            }
            alt="Kid's image"
            width={100}
            height={100}
          />

          {showAll && (
            <ActionIcon
              className={classes.trashIcon}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentDependentName(
                  `${dependent.basic.firstName} ${dependent.basic.lastName}`
                );
                setCurrentDependentID(`${dependent.id}`);
                setIsConfirmationModalOpen(true);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} size="lg" />
            </ActionIcon>
          )}
        </Card.Section>
        <Group position="apart" mt="md">
          <div>
            <Text
              weight={500}
            >{`${dependent.basic.firstName} ${dependent.basic.lastName}`}</Text>
            <Text size="xs" color="dimmed">
              {age} years old
            </Text>
          </div>
          <Badge variant="outline">{dependent.basic.relationship}</Badge>
        </Group>

        {showAll && (
          <Card.Section className={classes.section}>
            <Group spacing={30}>
              <Button
                style={{ flex: 1 }}
                variant="outline"
                onClick={(event) => {
                  handleEditDependent(dependent, event);
                }}
              >
                Update Info
              </Button>

              {/*share access dropdown*/}
              <Menu
                transition="pop-top-right"
                position="bottom-start"
                withinPortal
              >
                <Menu.Target>
                  <Button
                    styles={(theme) => ({
                      root: {
                        backgroundColor: "#6147FF",
                        "&:not([data-disabled])": theme.fn.hover({
                          opacity: 0.7,
                        }),
                      },
                    })}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentDependentName(
                        `${dependent.basic.firstName} ${dependent.basic.lastName}`
                      );
                      setCurrentDependentID(`${dependent.id}`);
                    }}
                    rightIcon={<FontAwesomeIcon icon={faAngleDown} />}
                  >
                    Manage Access
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExistingModalState(true);
                    }}
                  >
                    Existing Access
                  </Menu.Item>
                  <Menu.Item
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNewModalState(true);
                    }}
                  >
                    Grant New Access
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Card.Section>
        )}
      </Card>
    </div>
  );
};

export default DependentCard;
