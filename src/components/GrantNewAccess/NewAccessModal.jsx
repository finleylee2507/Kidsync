import React from 'react';
import {Button, Checkbox, Grid, Group, Input, Modal, Radio, TextInput} from "@mantine/core";
import {useForm} from '@mantine/form';
import InputMask from 'react-input-mask';

const NewAccessModal = ({isOpen, handleModalState, dependentName}) => {

    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            phoneNumber: "",
            accessGranted: ['emergency'],
            relationship: '',
            otherRelationship: ''

        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            name: (value) => (!value ? 'This field is required' : null),
            phoneNumber: (value) => (/^\+1 \(\d{3}\) \d{3}-\d{4}$/.test(value) ? null : 'Invalid phone number'),
            relationship: (value) => (!value ? 'This field is required' : null),
            otherRelationship: (value) => ((!value && form.values.relationship === 'other') ? 'This field is required' : null),

        },
    });
    return (
        <div>

            <Modal
                opened={isOpen}
                onClose={() => handleModalState(false)}
                title={`Share ${dependentName}'s Profile With`}
                size='xl'
            >
                <form onSubmit={form.onSubmit((values, event) => {
                    console.log(values);
                })
                }>

                    <Grid gutter="xl" justify="center">
                        <Grid.Col span={6}>
                            <TextInput
                                placeholder="Your name"
                                label="Name"
                                withAsterisk
                                {...form.getInputProps('name')}
                            />
                            <TextInput
                                placeholder="Your email"
                                label="Email"
                                withAsterisk
                                {...form.getInputProps('email')}
                            />
                            <Input.Wrapper label="Phone Number" withAsterisk error={form.errors.phoneNumber}>
                                <Input component={InputMask} mask="+1 (999) 999-9999" {...form.getInputProps('phoneNumber')}/>
                            </Input.Wrapper>
                        </Grid.Col>

                        <Grid.Col span={6}>
                            <Radio.Group
                                name="relationship"
                                label="Relationship"
                                {...form.getInputProps('relationship')}
                                onClick={() => {
                                    //reset otherRelationship everytime we select
                                    form.setFieldValue("otherRelationship", "");
                                }}
                                withAsterisk
                            >
                                <Radio value="coparent" label="Co-Parent"/>
                                <Radio value="doctor" label="Doctor"/>
                                <Radio value="babysitter" label="Babysitter"/>
                                <Radio value="schoolstaff" label="School Staff"/>
                                <Radio value="other" label="Other"/>
                            </Radio.Group>
                            {form.values.relationship === 'other' && <TextInput
                                placeholder="Other"
                                label="Please specify"
                                withAsterisk
                                {...form.getInputProps('otherRelationship')}
                            />}

                            <Checkbox.Group
                                defaultValue={['emergency']}
                                label="Access Granted"
                                withAsterisk
                                {...form.getInputProps('accessGranted')}
                            >
                                <Checkbox value="basic" label="Basic"/>
                                <Checkbox value="reminders" label="Reminders"/>
                                <Checkbox value="generalCare" label="General Care"/>
                                <Checkbox value="emergency" label="Emergency" checked disabled/>
                                <Checkbox value="education" label="Education"/>
                                <Checkbox value="documents" label="Documents"/>
                            </Checkbox.Group>
                        </Grid.Col>


                        <Grid.Col span={10}>

                                <Button type="submit" fullWidth>Grant Access</Button>

                        </Grid.Col>

                    </Grid>

                </form>

            </Modal>
        </div>
    );
};

export default NewAccessModal;