import React from "react";
import {
  Button,
  Checkbox,
  Group,
  Input,
  Modal,
  Radio,
  TextInput,
  Grid,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ExistingAccessRow = ({ client, accessIndex }) => {
  console.log(client);
  console.log(accessIndex);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      accessGranted: client.clients[accessIndex].permissions,
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(async (values, event) => {
        console.log(values);
      })}
    >
      <Grid>
        <Grid.Col>
          <Text>{client.displayName}</Text>
        </Grid.Col>

        <Grid.Col>
          <Text>{client.clients[accessIndex].relationship}</Text>
        </Grid.Col>

        <Grid.Col>
          <Checkbox.Group
            defaultValue={["emergency"]}
            label="Access Granted"
            withAsterisk
            {...form.getInputProps("accessGranted")}
            mt="2rem"
          >
            <Checkbox value="basic" label="Basic" />
            <Checkbox value="reminders" label="Reminders" />
            <Checkbox value="generalCare" label="General Care" />
            <Checkbox value="emergency" label="Emergency" checked disabled />
            <Checkbox value="education" label="Education" />
            <Checkbox value="documents" label="Documents" />
          </Checkbox.Group>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default ExistingAccessRow;
