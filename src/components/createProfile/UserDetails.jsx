import React, {useEffect} from 'react';
import styles from './UserDetails.module.css';
import {Button, Group, NumberInput, Text, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';


function UserDetails() {
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

    return (

        <div className={styles.userDetailsFormContainer}>

            <Text fz="xl" fw="700" mb="2rem" mt="6rem">Enter Account Information:</Text>
            <form onSubmit={form.onSubmit((values) => {
                console.log("Values: ",values);

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

                <Group position="right" mt="md">
                    <Button type="submit" name="nextButton">Next</Button>
                </Group>
            </form>

        </div>


    );
}

export default UserDetails;