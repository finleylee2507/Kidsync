import React, {useEffect} from 'react';
import {Button, Group, Input, Select, Text, TextInput} from "@mantine/core";
import InputMask from 'react-input-mask';
import {useForm} from "@mantine/form";
import {DatePicker} from "@mantine/dates";


function BasicForm({formData, nextStep, setFormData}) {

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
            parentsName: ""
        },
        validate: {
            birthday: (value) => (!value) ? 'Please enter a birthday' : null,
            sex: (value) => (!value) ? 'Please select sex' : null,
            phoneNumber: (value) => (!value) ? 'Please enter a phone number' : null
        },
    });

    useEffect(() => {
        form.setValues(formData);
    }, [formData]);

    return (

        <div>
            <Text fz="xl" fw="700" mb="2rem" mt="6rem">Enter Basic Information:</Text>
            <form onSubmit={form.onSubmit((values, event) => {
                setFormData(values);
                nextStep();
            })
            }>
                <TextInput withAsterisk label="First Name" {...form.getInputProps('firstName')} size="lg"
                           required/>

                <TextInput withAsterisk label="Last Name" {...form.getInputProps('lastName')} size="lg"
                           required/>


                <DatePicker label="Birthday" size="lg"
                            withAsterisk {...form.getInputProps('birthday')}

                />

                <TextInput withAsterisk label="Relationship" {...form.getInputProps('relationship')} size="lg"
                           required/>


                <Select
                    label="Sex"
                    size="lg"
                    data={[
                        {value: 'male', label: 'Male'},
                        {value: 'female', label: 'Female'},
                        {value: 'non-binary', label: 'Non-binary'}
                    ]}
                    {...form.getInputProps('sex')}
                />

                <TextInput withAsterisk label="Address" {...form.getInputProps('address')} size="lg"
                           required/>

                <Input.Wrapper label="Phone Number" size="lg" required error={form.errors.phoneNumber}>
                    <Input component={InputMask} mask="+1 (999) 999-9999"
                           size="lg" {...form.getInputProps('phoneNumber')}/>
                </Input.Wrapper>

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