import React, { useEffect } from "react";
import { Button, Group, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { TimeInput } from "@mantine/dates";
import styles from "./CreateEditDependentProfileForm.module.css";

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
      <Text fz="xl" fw="700" mb="2rem" mt="2rem">
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
        />

        <TextInput
          label="Extracurriculars"
          {...form.getInputProps("extracurriculars")}
          size="lg"
        />
        <TextInput
          label="Allergies"
          {...form.getInputProps("allergies")}
          size="lg"
        />

        <TextInput
          label="Current Medications"
          {...form.getInputProps("currentMedications")}
          size="lg"
        />

        <TextInput
          label="Medication Schedule"
          {...form.getInputProps("medicationSchedule")}
          size="lg"
        />

        <TimeInput
          label="Bed Time"
          format="12"
          {...form.getInputProps("bedTime")}
          size="lg"
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

export default GeneralCareForm;
