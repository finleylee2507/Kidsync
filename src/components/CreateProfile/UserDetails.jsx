import React from "react";
import styles from "./UserDetails.module.css";
import { Button, Group, Input, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { updateUser } from "../../utilities/firebase";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";

const UserDetails = ({ user }) => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      firstName: user ? user.displayName.split(" ")[0] : "",
      lastName: user ? user.displayName.split(" ")[1] : "",
      email: user ? user.email : "",
      phoneNumber: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phoneNumber: (value) => {
        if (value && !/^\+1 \(\d{3}\) \d{3}-\d{4}$/.test(value)) {
          return "Invalid phone number";
        } else if (!value) {
          return "Please enter a phone number";
        } else {
          return null;
        }
      },
    },
  });

  return (
    <div className={styles.userDetailsFormContainer}>
      <Text fz="xl" fw="700" mb="2rem" mt="6rem">
        Enter Account Information:
      </Text>
      <form
        onSubmit={form.onSubmit(async (values) => {
          console.log("Values: ", values);

          const newPhoneNumber = values.phoneNumber.replace(/[+\s()-]/g, "");

          const updatedUser = {
            displayName: `${values.firstName} ${values.lastName}`,
            email: values.email,
            phoneNumber: newPhoneNumber,
          };

          try {
            updateUser(updatedUser, user.uid);
          } catch (error) {
            console.log("Error while creating dbString: ", error);
          }

          navigate("/home");
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

        <Input.Wrapper
          label="Phone Number"
          size="lg"
          error={form.errors.phoneNumber}
          withAsterisk
        >
          <Input
            component={InputMask}
            mask="+1 (999) 999-9999"
            size="lg"
            {...form.getInputProps("phoneNumber")}
          />
        </Input.Wrapper>

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
