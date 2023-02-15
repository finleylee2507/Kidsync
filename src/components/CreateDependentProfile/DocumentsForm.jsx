import React, {useEffect} from 'react';
import {Button, FileInput, Group, Text} from "@mantine/core";
import {useForm} from "@mantine/form";

function DocumentsForm({formData, nextStep, prevStep, setFormData}) {

    const form = useForm({
        initialValues: {
            immunizationFile: null,
            insuranceCard: null,
            esaDocuments: null,
            fsaDocuments: null,
        },
        validate: {},
    });


    useEffect(() => {
        form.setValues(formData);
    }, [formData]);

    return (

        <div>
            <Text fz="xl" fw="700" mb="2rem" mt="2rem">Upload Documents:</Text>
            <form onSubmit={form.onSubmit((values, event) => {
                console.log("Values: ", values);
                setFormData(values);
                nextStep();
            })
            }>
                <FileInput label="Immunization Records" {...form.getInputProps('immunizationFile')} size="lg"/>
                <FileInput label="Insurance Card" {...form.getInputProps('insuranceCard')} size="lg"/>
                <FileInput label="ESA Documents" {...form.getInputProps('esaDocuments')} size="lg"/>
                <FileInput label="FSA Documents" {...form.getInputProps('fsaDocuments')} size="lg"/>


                <Group position="right" mt="md">
                    <Button name="prevButton" onClick={prevStep}>Back</Button>
                    <Button type="submit" name="nextButton">Next</Button>
                </Group>
            </form>
        </div>
    );
}

export default DocumentsForm;