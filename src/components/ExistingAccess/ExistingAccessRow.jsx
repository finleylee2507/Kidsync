import React from "react";

import {
  Group,
  Modal,
  Button,
  Text,
  Checkbox,
  SimpleGrid,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const ExistingAccessRow = ({ allUsers, caretaker }) => {
  const form = useForm({
    initialValues: {
      permissions: caretaker.permissions, // get actual permissions from db
    },
    validate: {
      permissions: (value) =>
        value.length === 0 ? "Please select at least one permission" : null,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values.permissions))}>
      <Divider my="sm" />
      <SimpleGrid cols={4} mb={10}>
        <Text>{allUsers[caretaker.id].displayName}</Text>
        <Text>{caretaker.relationship}</Text>
        <Text>
          <Checkbox.Group {...form.getInputProps("permissions")}>
            <Checkbox value="basic" label="Basic" />
            <Checkbox value="reminders" label="Reminders" />
            <Checkbox value="generalCare" label="General Care" />
            <Checkbox value="emergency" label="Emergency" checked disabled />
            <Checkbox value="education" label="Education" />
            <Checkbox value="documents" label="Documents" />
          </Checkbox.Group>
        </Text>
        <Text>
          <Button
            type="submit"
            onClick={() => {
              // submit to db
              console.log("Click submit");
            }}
          >
            Update Access
          </Button>
        </Text>
      </SimpleGrid>
    </form>
  );
};

export default ExistingAccessRow;
