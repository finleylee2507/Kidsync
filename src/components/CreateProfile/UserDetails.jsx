import React, { useEffect } from "react";
import styles from "./UserDetails.module.css";
import { Button, Group, NumberInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useAuthState } from "../../utilities/firebase";
import { useNavigate } from "react-router-dom";

const UserDetails = ({ user }) => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      firstName: user ? user.displayName.split(" ")[0] : "",
      lastName: user ? user.displayName.split(" ")[1] : "",
      email: user.email,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <div className={styles.userDetailsFormContainer}>
      <Text fz="xl" fw="700" mb="2rem" mt="6rem">
        Enter Account Information:
      </Text>
      <form
        onSubmit={form.onSubmit((values) => {
          console.log("Values: ", values);
          navigate("/dependents");
        })}
      >
        <TextInput
          withAsterisk
          label="First Name"
          size="lg"
          {...form.getInputProps("firstName")}
          value={form.values.firstName}
          required
        />
        <TextInput
          withAsterisk
          label="Last Name"
          size="lg"
          {...form.getInputProps("lastName")}
          value={form.values.lastName}
          required
        />
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          size="lg"
          {...form.getInputProps("email")}
          value={form.values.email}
          required
        />

        <Group position="right" mt="md">
          <Button type="submit" name="nextButton">
            Confirm Account
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default UserDetails;
