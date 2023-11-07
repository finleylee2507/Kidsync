import React, {useEffect} from "react";
import {Anchor, Button, FileInput, Group, Text} from "@mantine/core";
import {useForm} from "@mantine/form";
import styles from "./CreateEditDependentProfileForm.module.css";

const DocumentsForm = ({
                           formData,
                           nextStep,
                           prevStep,
                           setFormData,
                           isEditMode,
                           oldFormData,
                       }) => {
    const form = useForm({
        initialValues: {
            immunizationFile: null,
            insuranceCard: null,
            esaDocuments: null,
            fsaDocuments: null,
        },
        validate: {},
    });

    useEffect(() => {
        form.setValues(formData);
    }, [formData]);

    console.log("Form values: ", form.values);

    return (
        <div>
            <Text fz="xl" fw="700" mb="2rem" mt="2rem">
                Upload Documents:
            </Text>
            <form
                onSubmit={form.onSubmit((values, event) => {
                    setFormData(values);
                    nextStep();
                })}
            >
                <FileInput
                    label="Immunization Records"
                    {...form.getInputProps("immunizationFile")}
                    size="lg"
                    radius="md"
                />
                {isEditMode &&
                    !form.values.immunizationFile &&
                    oldFormData.immunizationFile !== "N/A" && (
                        <Text c="green">
                            Recent upload:
                            <Anchor
                                href={oldFormData.immunizationFile.fileLink}
                                target="_blank"
                                ml="10px"
                            >
                                {oldFormData.immunizationFile.fileName}
                            </Anchor>
                        </Text>
                    )}
                <FileInput
                    label="Insurance Card"
                    {...form.getInputProps("insuranceCard")}
                    size="lg"
                    radius="md"
                />
                {isEditMode &&
                    !form.values.insuranceCard &&
                    oldFormData.insuranceCard !== "N/A" && (
                        <Text c="green">
                            Recent upload:
                            <Anchor
                                href={oldFormData.insuranceCard.fileLink}
                                target="_blank"
                                ml="10px"
                            >
                                {oldFormData.insuranceCard.fileName}
                            </Anchor>
                        </Text>
                    )}
                <FileInput
                    label="ESA Documents"
                    {...form.getInputProps("esaDocuments")}
                    size="lg"
                    radius="md"
                />

                {isEditMode &&
                    !form.values.esaDocuments &&
                    oldFormData.esaDocuments !== "N/A" && (
                        <Text c="green">
                            Recent upload:
                            <Anchor
                                href={oldFormData.esaDocuments.fileLink}
                                target="_blank"
                                ml="10px"
                            >
                                {oldFormData.esaDocuments.fileName}
                            </Anchor>
                        </Text>
                    )}
                <FileInput
                    label="FSA Documents"
                    {...form.getInputProps("fsaDocuments")}
                    size="lg"
                    radius="md"
                />
                {isEditMode &&
                    !form.values.fsaDocuments &&
                    oldFormData.fsaDocuments !== "N/A" && (
                        <Text c="green">
                            Recent upload:
                            <Anchor
                                href={oldFormData.fsaDocuments.fileLink}
                                target="_blank"
                                ml="10px"
                            >
                                {oldFormData.fsaDocuments.fileName}
                            </Anchor>
                        </Text>
                    )}

                <Group position="right" mt="md" pb="md">
                    <Button
                        name="prevButton"
                        onClick={prevStep}
                        classNames={{root: styles.backButton}}
                    >
                        Back
                    </Button>
                    <Button
                        type="submit"
                        name="nextButton"
                        classNames={{root: styles.nextButton}}
                    >
                        Next
                    </Button>
                </Group>
            </form>
        </div>
    );
};

export default DocumentsForm;
