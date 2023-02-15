import React, {useEffect} from 'react';
import styles from './UserDetails.module.css';
import {Button, Group, NumberInput, Text, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';


function UserDetails({nextStep, handleSetFormData, formData, initializeDependentsData}) {
    const form = useForm({
        initialValues: {
            firstName:"",
            lastName:"",
            email:"",
            numberOfDependents:""
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            numberOfDependents: (value) => value < 10 ? null : 'Please enter a valid number of dependents'
        },
    });

    useEffect(() => {
        form.setValues(formData);
    }, [formData]);

    return (

        <div className={styles.userDetailsFormContainer}>

            <Text fz="xl" fw="700" mb="2rem" mt="6rem">Enter Account Information:</Text>
            <form onSubmit={form.onSubmit((values) => {
                console.log("Values: ",values);
                for (let key in values) {
                    handleSetFormData(key, values[key]);
                }

                nextStep();
            })
            }>
                <TextInput withAsterisk label="First Name" size="lg" {...form.getInputProps('firstName')} required/>
                <TextInput withAsterisk label="Last Name" size="lg" {...form.getInputProps('lastName')} required/>
                <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    size="lg"
                    {...form.getInputProps('email')}
                    required
                />
                <NumberInput mt="xl" label="Number of Dependents"
                             max="10"
                             size="lg"
                             {...form.getInputProps('numberOfDependents')}
                            onChange={(value)=>{
                                initializeDependentsData(value)

                                //I guess onChange overrides Mantine's default behavior, so we have to manually set the field value
                                form.setFieldValue('numberOfDependents', value);
                            }}
                />
                <Group position="right" mt="md">
                    <Button type="submit" name="nextButton">Next</Button>
                </Group>
            </form>

        </div>


    );
}

export default UserDetails;