import React, {useEffect} from 'react';
import {Button, Group, Input, Select, Text, TextInput} from "@mantine/core";
import InputMask from 'react-input-mask';
import {useForm} from "@mantine/form";
import {DatePicker, TimeInput} from "@mantine/dates";

// const ReminderInput=({})=>{
//
//
// }

const ReminderForm = ({formData, nextStep, prevStep, setFormData}) => {

    const form = useForm({
        initialValues: {
          reminders:[{time:null,taskName:"abc"}]

        },
        validate: {
        },
    });


    console.log(form.values);
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
            {form.values.reminders.map((item,index)=>{
                return (

                    <div>
                        <Text fw="500">Reminder {index+1}</Text>
                        <TimeInput label="Time" format="12" {...form.getInputProps(`reminders.${index}.time`)}/>
                        <TextInput label="Task Name" {...form.getInputProps(`reminders.${index}.taskName`)}/>
                        {index>0&&(
                            <Button onClick={()=>{
                                handleRemoveItems(index)
                            }}>Remove</Button>
                        )}
                        <hr/>
                    </div>
                )
            })}

            <Button onClick={handleAddItems}>
                Add
            </Button>
            <Group position="right" mt="md" mb="20px">
                <Button name="prevButton" onClick={prevStep}>Back</Button>
                <Button type="submit" name="nextButton">Next</Button>
            </Group>
        </form>
        </div>
    );
};

export default ReminderForm;