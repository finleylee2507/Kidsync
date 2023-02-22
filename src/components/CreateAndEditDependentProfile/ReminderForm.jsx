import React, {useEffect} from 'react';
import {Button, Grid, Group, Input, Select, Text, TextInput} from "@mantine/core";
import InputMask from 'react-input-mask';
import {useForm} from "@mantine/form";
import {DatePicker, TimeInput} from "@mantine/dates";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./ReminderForm.module.css"


const ReminderForm = ({formData, nextStep, prevStep, setFormData}) => {

    const form = useForm({
        initialValues: {
          reminders:[]

        },
        validate: {
        },
    });

    
    useEffect(() => {
        form.setValues(formData);
    }, [formData]);

    const handleAddItems=()=>{
        form.insertListItem('reminders',{time:null,taskName:""})
    }

    const handleRemoveItems=(index)=>{
        form.removeListItem('reminders',index);
    }
    return (

        <div>
            <Text fz="xl" fw="700" mb="2rem" mt="2rem">Add Reminders for Caretakers:</Text>
        <form onSubmit={form.onSubmit((values, event) => {
                setFormData(values);
                nextStep();
            })
        }>
            <Grid>
                <Grid.Col span={2}><Text fw="500">Time</Text></Grid.Col>
                <Grid.Col span={9}><Text fw="500">Action</Text></Grid.Col>
            </Grid>
            {form.values.reminders.map((item,index)=>{
                return (

                    <div>

                        <Grid align="center">
                            <Grid.Col span={2}> <TimeInput format="12" {...form.getInputProps(`reminders.${index}.time`)} size="lg"/> </Grid.Col>
                            <Grid.Col span={9}><TextInput {...form.getInputProps(`reminders.${index}.taskName`)} size="lg"/></Grid.Col>
                            <Grid.Col span={1}><FontAwesomeIcon icon={faTrashCan} size="lg" className={styles.removeIcon} onClick={()=>{
                                handleRemoveItems(index)
                            }}/></Grid.Col>
                        </Grid>


                    </div>
                )
            })}

            <Grid>
                <Grid.Col span={11}>
                    <Button onClick={handleAddItems} variant="outline" fullWidth leftIcon={<FontAwesomeIcon icon={faCirclePlus} size="lg" width="2rem"/>}>
                        Add More Actions
                    </Button>
                </Grid.Col>
            </Grid>

            <Group position="right" mt="md" mb="20px">
                <Button name="prevButton" onClick={prevStep}>Back</Button>
                <Button type="submit" name="nextButton">Next</Button>
            </Group>
        </form>
        </div>
    );
};

export default ReminderForm;