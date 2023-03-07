import React, { useEffect } from "react";
import { Button, Group, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { TimeInput } from "@mantine/dates";
import styles from "./CreateDependentProfileForm.module.css";
const GeneralCareForm = ({ formData, nextStep, prevStep, setFormData }) => {
  const form = useForm({
    initialValues: {
      routineNotes: "",
      extracurriculars: "",
      bedTime: "",
      medicationSchedule: "",
      allergies: "",
      currentMedications: "",
    },
    validate: {},
  });

  useEffect(() => {
    form.setValues(formData);
  }, [formData]);

  return (
    <div>
      <Text fz="xl" fw="700" mb="2rem" mt="2rem" className={styles.formHeader}>
        Enter General Care Information:
      </Text>
      <form
        onSubmit={form.onSubmit((values, event) => {
          setFormData(values);
          nextStep();
        })}
      >
        <TextInput
          label="Routine Notes"
          {...form.getInputProps("routineNotes")}
          size="lg"
          classNames={{
            label: styles.inputLabel,
            input: styles.input,
          }}
        />

        <TextInput
          label="Extracurriculars"
          {...form.getInputProps("extracurriculars")}
          size="lg"
          classNames={{
            label: styles.inputLabel,
            input: styles.input,
          }}
        />
        <TextInput
          label="Allergies"
          {...form.getInputProps("allergies")}
          size="lg"
          classNames={{
            label: styles.inputLabel,
            input: styles.input,
          }}
        />

        <TextInput
          label="Current Medications"
          {...form.getInputProps("currentMedications")}
          size="lg"
          classNames={{
            label: styles.inputLabel,
            input: styles.input,
          }}
        />

        <TextInput
          label="Medication Schedule"
          {...form.getInputProps("medicationSchedule")}
          size="lg"
          classNames={{
            label: styles.inputLabel,
            input: styles.input,
          }}
        />

        <TimeInput
          label="Bed Time"
          format="12"
          {...form.getInputProps("bedTime")}
          size="lg"
          classNames={{
            label: styles.inputLabel,
            input: styles.input,
            timeInput: styles.timeInput,
          }}
        />
        <Group position="right" mt="md">
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

export default GeneralCareForm;
