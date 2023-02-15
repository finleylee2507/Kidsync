import React, {useEffect, useState} from 'react';
import {Button, Group, Text, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import { FileInput } from '@mantine/core';

function DocumentsForm({formData,nextStep, prevStep, setFormData}) {

    const form = useForm({
        initialValues: {
            immunizationFile:null,
            insuranceCard:null,
            esaDocuments:null,
            fsaDocuments:null,
        },
        validate: {},
    });


    useEffect(() => {
        form.setValues(formData);
    }, [formData]);

    return (

        <div>
            <Text fz="xl" fw="700" mb="2rem" mt="6rem">Enter Documents Information:</Text>
            <form onSubmit={form.onSubmit((values, event) => {
                console.log("Values: ",values);
                setFormData(values);
                nextStep()
            })
            }>
                <FileInput withAsterisk required label="Immunizations" {...form.getInputProps('immunizationFile')} size='lg' />;
                <FileInput withAsterisk required label="Insurance Card" {...form.getInputProps('insuranceCard')} size='lg' />;
                <FileInput withAsterisk required label="ESA Documents" {...form.getInputProps('esaDocuments')} size='lg' />;
                <FileInput withAsterisk required label="FSA Documents" {...form.getInputProps('fsaDocuments')} size='lg' />;


                <Group position="right" mt="md">
                    <Button name='prevButton' onClick={prevStep}>Back</Button>
                    <Button type="submit" name="nextButton">Next</Button>
                </Group>
            </form>
        </div>
    );
}

export default DocumentsForm;