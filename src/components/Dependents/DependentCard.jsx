import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Button,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
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

const DependentCard = ({ dependent }) => {
  const { classes, theme } = useStyles();
  return (
    <div style={{ width: "25rem", margin: "auto" }}>
      <Card withBorder radius="md" className={classes.card}>
        <Card.Section className={classes.imageSection}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
            alt="Kid's image"
            width={100}
            height={100}
          />
        </Card.Section>
        <Group position="apart" mt="md">
          <div>
            <Text weight={500}>{dependent.name}</Text>
            <Text size="xs" color="dimmed">
              {dependent.age} years old
            </Text>
          </div>
          <Badge variant="outline">{dependent.relationship}</Badge>
        </Group>

        <Card.Section className={classes.section}>
          <Group spacing={30}>
            <Button radius="xl" style={{ flex: 1 }}>
              Edit Info
            </Button>

            <Button radius="xl" style={{ flex: 1 }}>
              Share Access
            </Button>
          </Group>
        </Card.Section>
      </Card>
    </div>
  );
};

export default DependentCard;
