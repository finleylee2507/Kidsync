import React, {useEffect} from 'react';
import {Button, Group, NumberInput, Text, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import { TimeInput } from '@mantine/dates';

function EducationForm({formData,nextStep,prevStep,setFormData}) {

    const form = useForm({
        initialValues: {
          schoolName:"",
            teacherName:"",
            grade:"",
            startTime:"",
            endTime:"",
            busNumber:"",
            busTime:""
        },
        validate: {},
    });

    useEffect(() => {
        form.setValues(formData);
    }, [formData]);

    return (

        <div>
            <Text fz="xl" fw="700" mb="2rem" mt="6rem">Enter Education Information:</Text>
            <form onSubmit={form.onSubmit((values, event) => {
                setFormData(values);
                nextStep()
            })
            }>
                <TextInput withAsterisk label="Teacher Name" {...form.getInputProps('teacherName')} size="lg"
                           required/>

                <NumberInput withAsterisk label="Grade" min="1" max="12" {...form.getInputProps('grade')} size="lg"
                           required/>

                <TimeInput label="School Start Time" size="lg" format="12" {...form.getInputProps('startTime')} />

                <TimeInput label="School End Time" size="lg" format="12" {...form.getInputProps('endTime')}/>
                <TextInput withAsterisk label="Bus Number" {...form.getInputProps('busNumber')} size="lg"
                           required/>
                <Group position="right" mt="md">
                    <Button name='prevButton' onClick={prevStep}>Back</Button>
                    <Button type="submit" name="nextButton">Next</Button>
                </Group>
            </form>
        </div>
    );
}

export default EducationForm;