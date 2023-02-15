import React, {useEffect} from 'react';
import {Button, Group, Text, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";


function BasicForm({formData,nextStep,setFormData}) {

    const form = useForm({
        initialValues: {
            firstName:"",
            lastName:"",
            birthday:"",
            relationship:"",
            preferredPronouns:"",
            sex:"",
            address:"",
            phoneNumber:"",
            parentsName:""
        },
        validate: {},
    });

    useEffect(() => {
        form.setValues(formData);
    }, [formData]);

    return (

        <div>
            <Text fz="xl" fw="700" mb="2rem" mt="6rem">Enter Basic Information:</Text>
            <form onSubmit={form.onSubmit((values, event) => {
                console.log("Values: ",values);
                setFormData(values);
                nextStep()
            })
            }>
                <TextInput withAsterisk label="First Name" {...form.getInputProps('firstName')} size="lg"
                           required/>

                <TextInput withAsterisk label="Last Name" {...form.getInputProps('lastName')} size="lg"
                           required/>

            {/*    do birthday*/}

                <TextInput withAsterisk label="Relationship" {...form.getInputProps('relationship')} size="lg"
                           required/>

            {/*    sex select*/}

                <TextInput withAsterisk label="Address" {...form.getInputProps('address')} size="lg"
                           required/>

                <TextInput withAsterisk label="Phone Number" {...form.getInputProps('phoneNumber')} size="lg"
                           required/>

                <TextInput withAsterisk label="Parents Name" {...form.getInputProps('parentsName')} size="lg"
                           required/>

                <Group position="right" mt="md">
                    <Button type="submit" name="nextButton">Next</Button>
                </Group>
            </form>
        </div>
    );
}

export default BasicForm;