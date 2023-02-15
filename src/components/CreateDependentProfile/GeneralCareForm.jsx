import React, {useEffect} from 'react';
import {Button, Group, Text, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import { TimeInput } from '@mantine/dates';

function GeneralCareForm({formData,nextStep, prevStep, setFormData}) {

    const form = useForm({
        initialValues: {
            routineNotes:"",
            extracurriculars:"",
            bedTime:"",
            medicationSchedule:"",
        },
        validate: {},
    });

    useEffect(() => {
        form.setValues(formData);
    }, [formData]);

    return (

        <div>
            <Text fz="xl" fw="700" mb="2rem" mt="6rem">Enter General Care Information:</Text>
            <form onSubmit={form.onSubmit((values, event) => {
                console.log("Values: ",values);
                setFormData(values);
                nextStep()
            })
            }>
                <TextInput withAsterisk label="Routine Notes" {...form.getInputProps('routineNotes')} size="lg"
                           required/>

                <TextInput withAsterisk label="Extracurriculars" {...form.getInputProps('extracurriculars')} size="lg"
                           required/>

                <TimeInput withAsterisk label="Bed Time" format="12" defaultValue={new Date()} required {...form.getInputProps('bedTime')}/>;

                <TextInput withAsterisk label="Medication Schedule" {...form.getInputProps('medicationSchedule')} size="lg"
                           required/>
                           

                <Group position="right" mt="md">
                    <Button name='prevButton' onClick={prevStep}>Back</Button>
                    <Button type="submit" name="nextButton">Next</Button>
                </Group>
            </form>
        </div>
    );
}

export default GeneralCareForm;