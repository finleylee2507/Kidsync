import { React, useState } from "react";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Button,
  Switch,
  useMantineTheme,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import styles from "./ClientCard.module.css";
import { sendSMS } from "../../utilities/twilio";
// // import { FaCircleCheck } from "@fortawesome/free-solid-svg-icons";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { IconCheck, IconX } from "@tabler/icons";

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
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
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

const ClientCard = ({ client, permissions, creator, currentUser }) => {
  const { classes, theme } = useStyles();
  const navigate = useNavigate();

  // style for the switch
  const switchTheme = useMantineTheme();
  const [checked, setChecked] = useState(false);

  //handle click card
  const handleViewClient = (client) => {
    // use navigate() to pass the data
    let showEmergency = false;
    navigate("/view-information", {
      state: { client, permissions, showEmergency },
    });
  };

  const handleEmergencyClick = (client) => {
    // use navigate() to pass the data
    // Send text notification to creator of dependent
    let showEmergency = true;
    const message = `IMPORTANT: This is an automated message from KidSync. The emergency information for your dependent, ${client.basic.firstName} ${client.basic.lastName}, was just accessed by their caretaker, ${currentUser.displayName}. Please contact them as soon as possible to get more information.`;
    sendSMS(creator.phoneNumber, message);
    navigate("/view-information", {
      state: { client, permissions, showEmergency },
    });
  };

  // try to find out how old is this kid
  const birthday = new Date(client.basic.birthday);
  const age = parseInt(
    (new Date().getTime() - birthday.getTime()) / (1000 * 60 * 60 * 24 * 365)
  );

  return (
    <div className={styles.clientContainer}>
      <Card
        withBorder
        radius="md"
        className={classes.card}
        onClick={() => {
          console.log("View client triggered");
          handleViewClient(client);
        }}
      >
        <Card.Section className={classes.imageSection}>
          <Image
            src={
              client.basic.profilePic && client.basic.profilePic !== "N/A"
                ? client.basic.profilePic.fileLink
                : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
            }
            alt="Kid's image"
            width="100%"
            height={350}
          />
        </Card.Section>
        <Group position="apart" mt="md">
          <div>
            <Text
              weight={500}
            >{`${client.basic.firstName} ${client.basic.lastName}`}</Text>
            <Text size="xs" color="dimmed">
              {age} years old
            </Text>
          </div>
          {/* <Badge variant="outline">{client.basic.relationship}</Badge> */}
        </Group>

        <Card.Section className={classes.section}>
          <Group spacing={30}>
            {/* <Switch
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
              color="teal"
              size="md"
              label="Switch with thumb icon"
              thumbIcon={
                checked ? (
                  <IconCheck
                    size={12}
                    color={
                      switchTheme.colors.teal[switchTheme.fn.primaryShade()]
                    }
                    stroke={3}
                  />
                ) : (
                  <IconX
                    size={12}
                    color={
                      switchTheme.colors.red[switchTheme.fn.primaryShade()]
                    }
                    stroke={3}
                  />
                )
              }
            /> */}

            <Button
              radius="xl"
              style={{
                flex: 1,
                backgroundColor: "#FF7676",
                "&:not([data-disabled])": theme.fn.hover({
                  opacity: 0.7,
                }),
              }}
              onClick={(event) => {
                event.stopPropagation();
                handleEmergencyClick(client);
              }}
            >
              Emergency info
            </Button>
          </Group>
        </Card.Section>
      </Card>
    </div>
  );
};

export default ClientCard;
