import React, {useEffect} from 'react';
import {Button, Group, Text, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";


function EmergencyForm({formData,nextStep, prevStep, setFormData}) {

    const form = useForm({
        initialValues: {
            emergencyContactName:"",
            emergencyContactPhone:"",
            emergencyContactRelationship:"",
            allergies:"",
            currentMedications:"",
        },
        validate: {},
    });

    useEffect(() => {
        form.setValues(formData);
    }, [formData]);

    return (

        <div>
            <Text fz="xl" fw="700" mb="2rem" mt="6rem">Enter Emergency Information:</Text>
            <form onSubmit={form.onSubmit((values, event) => {
                console.log("Values: ",values);
                setFormData(values);
                nextStep()
            })
            }>
                <TextInput withAsterisk label="Emergency Contact Name" {...form.getInputProps('emergencyContactName')} size="lg"
                           required/>

                <TextInput withAsterisk label="Emergency Contact Phone Number" {...form.getInputProps('emergencyContactPhone')} size="lg"
                           required/>

                <TextInput withAsterisk label="Emergency Contact Relationship" {...form.getInputProps('emergencyContactRelationship')} size="lg"
                           required/>

                <TextInput withAsterisk label="Allergies" {...form.getInputProps('allergies')} size="lg"
                           required/>
                           
                <TextInput withAsterisk label="Current Medications" {...form.getInputProps('currentMedications')} size="lg"
                           required/>

                <Group position="right" mt="md">
                    <Button name='prevButton' onClick={prevStep}>Back</Button>
                    <Button type="submit" name="nextButton">Next</Button>
                </Group>
            </form>
        </div>
    );
}

export default EmergencyForm;