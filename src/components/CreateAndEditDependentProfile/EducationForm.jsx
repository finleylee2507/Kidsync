import React, { useEffect } from "react";
import { Button, Group, NumberInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { TimeInput } from "@mantine/dates";
import styles from "./CreateDependentProfileForm.module.css";

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
      <Text fz="xl" fw="700" mb="2rem" mt="2rem" className={styles.formHeader}>
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
          classNames={{
            label: styles.inputLabel,
            input: styles.input,
          }}
        />
        <TextInput
          withAsterisk
          label="Teacher Name"
          {...form.getInputProps("teacherName")}
          size="lg"
          required
          classNames={{
            label: styles.inputLabel,
            input: styles.input,
          }}
        />

        <NumberInput
          withAsterisk
          label="Grade"
          min="1"
          max="12"
          {...form.getInputProps("grade")}
          size="lg"
          required
          classNames={{
            label: styles.inputLabel,
            input: styles.input,
          }}
        />

        <TimeInput
          label="School Start Time"
          size="lg"
          format="12"
          {...form.getInputProps("startTime")}
          classNames={{
            label: styles.inputLabel,
            input: styles.input,
            timeInput: styles.timeInput,
          }}
        />

        <TimeInput
          label="School End Time"
          size="lg"
          format="12"
          {...form.getInputProps("endTime")}
          classNames={{
            label: styles.inputLabel,
            input: styles.input,
            timeInput: styles.timeInput,
          }}
        />
        <TextInput
          label="Bus Number"
          {...form.getInputProps("busNumber")}
          size="lg"
          classNames={{
            label: styles.inputLabel,
            input: styles.input,
          }}
        />

        <TimeInput
          label="Bus Time"
          size="lg"
          format="12"
          {...form.getInputProps("busTime")}
          classNames={{
            label: styles.inputLabel,
            input: styles.input,
            timeInput: styles.timeInput,
          }}
        />
        <Group position="right" mt="md" mb="20px">
          <Button
            name="prevButton"
            onClick={prevStep}
            className={styles.backButton}
          >
            Back
          </Button>
          <Button type="submit" name="nextButton" className={styles.nextButton}>
            Next
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default EducationForm;
