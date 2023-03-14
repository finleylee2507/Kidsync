import { createStyles, Avatar, Text, Group } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export function DependentImage({ avatar, name, title }) {
  const { classes } = useStyles();
  return (
    <Group noWrap mb={20} mt={20}>
      <Avatar src={avatar} size={94} radius="md" />
      <div>
        <Text fz="sm" tt="uppercase" fw={700} c="dimmed">
          {title}
        </Text>

        <Text fz="xl" fw={500} className={classes.name}>
          {name}
        </Text>
      </div>
    </Group>
  );
}
