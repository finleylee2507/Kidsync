import React, {useEffect} from 'react';
import styles from "./DependentDetails.module.css";
import {Button, Group, Text, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";


function DependentDetails({prevStep, nextStep, formData, handleSetDependentsData, currDependent}) {
    console.log("formData: ", formData);
    const form = useForm({
        initialValues: {
            firstName:"",
            lastName:""
        },
        validate: {},
    });

    useEffect(() => {
        form.setValues(formData);
    }, [formData]);
    return (

        <div className={styles.dependentDetailsFormContainer}>
            <Text fz="xl" fw="700" mb="2rem" mt="6rem">Enter Information for Dependent {currDependent + 1}:</Text>
            <form onSubmit={form.onSubmit((values, event) => {
                for (let key in values) {
                    handleSetDependentsData(key, values[key], currDependent);
                }

                form.reset()

                if (event.nativeEvent.submitter.name === "nextButton") {
                    nextStep();
                }

            })
            }>
                <TextInput withAsterisk label="First Name" {...form.getInputProps('firstName')} size="lg"
                           required/>
                <TextInput withAsterisk label="Last Name" {...form.getInputProps('lastName')} size="lg" required/>

                <Group position="right" mt="md">
                    <Button name="previousButton" onClick={prevStep}>Back</Button>
                    <Button type="submit" name="saveButton">Save</Button>
                    <Button type="submit" name="nextButton">Next</Button>
                </Group>
            </form>


        </div>

    );
}

export default DependentDetails;