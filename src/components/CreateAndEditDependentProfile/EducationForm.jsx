import React, { useEffect } from "react";
import { Button, Group, NumberInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { TimeInput } from "@mantine/dates";
import styles from "./CreateEditDependentProfileForm.module.css";

const EducationForm = ({ formData, nextStep, prevStep, setFormData }) => {
  const form = useForm({
    initialValues: {
      schoolName: "",
      teacherName: "",
      grade: "",
      startTime: "",
      endTime: "",
      busNumber: "",
      busTime: "",
    },
    validate: {
      grade: (value) => (value > 12 ? "Please enter a valid grade" : null),
    },
  });

  useEffect(() => {
    form.setValues(formData);
  }, [formData]);

  return (
    <div>
      <Text fz="xl" fw="700" mb="2rem" mt="2rem">
        Enter Education Information:
      </Text>
      <form
        onSubmit={form.onSubmit((values, event) => {
          setFormData(values);
          nextStep();
        })}
      >
        <TextInput
          withAsterisk
          label="School Name"
          {...form.getInputProps("schoolName")}
          size="lg"
          required
          radius="md"
        />
        <TextInput
          withAsterisk
          label="Teacher Name"
          {...form.getInputProps("teacherName")}
          size="lg"
          required
          radius="md"
        />

        <NumberInput
          withAsterisk
          label="Grade"
          min="1"
          max="12"
          {...form.getInputProps("grade")}
          size="lg"
          required
          radius="md"
        />

        <TimeInput
          label="School Start Time"
          size="lg"
          format="12"
          {...form.getInputProps("startTime")}
          radius="md"
        />

        <TimeInput
          label="School End Time"
          size="lg"
          format="12"
          {...form.getInputProps("endTime")}
          radius="md"
        />
        <TextInput
          label="Bus Number"
          {...form.getInputProps("busNumber")}
          size="lg"
          radius="md"
        />

        <TimeInput
          label="Bus Time"
          size="lg"
          format="12"
          {...form.getInputProps("busTime")}
          radius="md"
        />
        <Group position="right" mt="md" pb="md">
          <Button
            name="prevButton"
            onClick={prevStep}
            classNames={{ root: styles.backButton }}
          >
            Back
          </Button>
          <Button
            type="submit"
            name="nextButton"
            classNames={{ root: styles.nextButton }}
          >
            Next
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default EducationForm;
