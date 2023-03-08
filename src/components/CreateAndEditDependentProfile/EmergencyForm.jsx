import React, { useEffect } from "react";
import { Button, Group, Input, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import InputMask from "react-input-mask";

const EmergencyForm = ({ formData, nextStep, prevStep, setFormData }) => {
  const form = useForm({
    initialValues: {
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelationship: "",
    },
    validate: {
      emergencyContactPhone: (value) =>
        !value ? "Please enter a phone number" : null,
    },
  });

  useEffect(() => {
    form.setValues(formData);
  }, [formData]);

  return (
    <div>
      <Text fz="xl" fw="700" mb="2rem" mt="2rem">
        Enter Emergency Information:
      </Text>
      <form
        onSubmit={form.onSubmit((values, event) => {
          setFormData(values);
          nextStep();
        })}
      >
        <TextInput
          withAsterisk
          label="Emergency Contact Name"
          {...form.getInputProps("emergencyContactName")}
          size="lg"
          required
        />

        <Input.Wrapper
          label="Emergency Contact Phone"
          size="lg"
          required
          error={form.errors.emergencyContactPhone}
        >
          <Input
            component={InputMask}
            mask="+1 (999) 999-9999"
            size="lg"
            {...form.getInputProps("emergencyContactPhone")}
          />
        </Input.Wrapper>

        <TextInput
          withAsterisk
          label="Emergency Contact Relationship"
          {...form.getInputProps("emergencyContactRelationship")}
          size="lg"
          required
        />

        <Group position="right" mt="md">
          <Button name="prevButton" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" name="nextButton">
            Next
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default EmergencyForm;
