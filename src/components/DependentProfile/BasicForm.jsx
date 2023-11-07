import React, {useEffect} from "react";
import {Anchor, Button, FileInput, Group, Input, Select, Text, TextInput,} from "@mantine/core";
import InputMask from "react-input-mask";
import {useForm} from "@mantine/form";
import {DateInput} from "@mantine/dates";
import styles from "./CreateEditDependentProfileForm.module.css";

const BasicForm = ({
                       formData,
                       nextStep,
                       setFormData,
                       isEditMode,
                       oldFormData,
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

    return (
        <div>
            <Text fz="xl" fw="700" mb="2rem" mt="2rem">
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
                    radius="md"
                />

                <TextInput
                    withAsterisk
                    label="Last Name"
                    {...form.getInputProps("lastName")}
                    size="lg"
                    required
                    radius="md"
                />

                <FileInput
                    label="Profile Picture"
                    {...form.getInputProps("profilePic")}
                    accept="image/png,image/jpeg"
                    size="lg"
                    radius="md"
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

                <DateInput
                    label="Birthday"
                    size="lg"
                    withAsterisk
                    radius="md"
                    {...form.getInputProps("birthday")}
                />

                <TextInput
                    label="Relationship"
                    {...form.getInputProps("relationship")}
                    size="lg"
                    radius="md"
                />

                <TextInput
                    label="Preferred Pronouns"
                    {...form.getInputProps("preferredPronouns")}
                    size="lg"
                    radius="md"
                />

                <Select
                    label="Sex"
                    withAsterisk
                    size="lg"
                    data={[
                        {value: "male", label: "Male"},
                        {value: "female", label: "Female"},
                        {value: "non-binary", label: "Non-binary"},
                    ]}
                    {...form.getInputProps("sex")}
                    radius="md"
                />

                <TextInput
                    label="Address"
                    {...form.getInputProps("address")}
                    size="lg"
                    radius="md"
                />

                <Input.Wrapper
                    label="Phone Number"
                    size="lg"
                    error={form.errors.phoneNumber}
                >
                    <Input
                        component={InputMask}
                        mask="+1 (999) 999-9999"
                        size="lg"
                        {...form.getInputProps("phoneNumber")}
                        radius="md"
                    />
                </Input.Wrapper>

                <Group position="right" mt="md" pb="md">
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

export default BasicForm;
