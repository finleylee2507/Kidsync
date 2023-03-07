import React, { useEffect } from "react";
import {
  Anchor,
  Button,
  FileInput,
  Group,
  Input,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import InputMask from "react-input-mask";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
import styles from "./CreateDependentProfileForm.module.css";

const BasicForm = ({
  formData,
  nextStep,
  setFormData,
  isEditMode,
  oldFormData,
  classes,
}) => {
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      birthday: "",
      relationship: "",
      preferredPronouns: "",
      sex: "",
      address: "",
      phoneNumber: "",
      profilePic: null,
    },
    validate: {
      birthday: (value) => (!value ? "Please enter a birthday" : null),
      sex: (value) => (!value ? "Please select sex" : null),
      phoneNumber: (value) => {
        if (value && !/^\+1 \(\d{3}\) \d{3}-\d{4}$/.test(value)) {
          return "Invalid phone number";
        } else {
          return null;
        }
      },
    },
  });

  useEffect(() => {
    form.setValues(formData);
  }, [formData]);

  console.log("Old form data: ", oldFormData);
  console.log("Form test: ", form.values.profilePic);
  return (
    <div>
      <Text fz="xl" fw="700" mb="2rem" mt="2rem" className={styles.formHeader}>
        Enter Basic Information:
      </Text>
      <form
        onSubmit={form.onSubmit((values, event) => {
          setFormData(values);
          nextStep();
        })}
      >
        <TextInput
          withAsterisk
          label="First Name"
          {...form.getInputProps("firstName")}
          size="lg"
          required
          classNames={{
            label: styles.inputLabel,
            input: styles.input,
          }}
        />

        <TextInput
          withAsterisk
          label="Last Name"
          {...form.getInputProps("lastName")}
          size="lg"
          required
          classNames={{
            label: styles.inputLabel,
            input: styles.input,
          }}
        />

        <FileInput
          label="Profile Picture"
          {...form.getInputProps("profilePic")}
          accept="image/png,image/jpeg"
          size="lg"
          classNames={{
            label: styles.inputLabel,
            input: styles.input,
          }}
        />

        {isEditMode &&
          !form.values.profilePic &&
          oldFormData.profilePic !== "N/A" && (
            <Text c="green">
              Recent upload:
              <Anchor
                href={oldFormData.profilePic.fileLink}
                target="_blank"
                ml="10px"
              >
                {oldFormData.profilePic.fileName}
              </Anchor>
            </Text>
          )}
        <DatePicker
          label="Birthday"
          size="lg"
          withAsterisk
          {...form.getInputProps("birthday")}
          classNames={{
            label: styles.inputLabel,
            input: styles.input,
          }}
        />

        <TextInput
          label="Relationship"
          {...form.getInputProps("relationship")}
          size="lg"
          classNames={{
            label: styles.inputLabel,
            input: styles.input,
          }}
        />

        <TextInput
          label="Preferred Pronouns"
          {...form.getInputProps("preferredPronouns")}
          size="lg"
          classNames={{
            label: styles.inputLabel,
            input: styles.input,
          }}
        />

        <Select
          label="Sex"
          withAsterisk
          size="lg"
          data={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "non-binary", label: "Non-binary" },
          ]}
          {...form.getInputProps("sex")}
          classNames={{
            label: styles.inputLabel,
            input: styles.input,
            item: styles.selectItem,
          }}
        />

        <TextInput
          label="Address"
          {...form.getInputProps("address")}
          size="lg"
          classNames={{
            label: styles.inputLabel,
            input: styles.input,
          }}
        />

        <Input.Wrapper
          label="Phone Number"
          size="lg"
          error={form.errors.phoneNumber}
          classNames={{
            label: styles.inputLabel,
            input: styles.input,
          }}
        >
          <Input
            component={InputMask}
            mask="+1 (999) 999-9999"
            size="lg"
            {...form.getInputProps("phoneNumber")}
            classNames={{
              label: styles.inputLabel,
              input: styles.input,
            }}
          />
        </Input.Wrapper>

        <Group position="right" mt="md" mb="20px">
          <Button type="submit" name="nextButton" className={styles.nextButton}>
            Next
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default BasicForm;
