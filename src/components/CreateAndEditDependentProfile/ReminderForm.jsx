import React, {useEffect} from 'react';
import {Button, Group, Input, Select, Text, TextInput} from "@mantine/core";
import InputMask from 'react-input-mask';
import {useForm} from "@mantine/form";
import {DatePicker, TimeInput} from "@mantine/dates";

// const ReminderInput=({})=>{
//
//
// }

const ReminderForm = ({formData, nextStep, setFormData}) => {

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
        const prevReminders=form.values.reminders
        prevReminders.push({time:null,taskName:""})
        form.setFieldValue('reminders',prevReminders)
    }

    const handleRemoveItems=(index)=>{
        const prevReminders=form.values.reminders
        prevReminders.splice(index,1)
        form.setFieldValue('reminders',prevReminders)
    }
    return (

        <div>
        <form>
            {form.values.reminders.map((item,index)=>{
                return (

                    <div>
                        <TimeInput label="Time?" format="12" {...form.getInputProps(`reminders.${index}.time`)}/>
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
        </form>
        </div>
    );
};

export default ReminderForm;