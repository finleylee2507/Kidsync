import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Grid, Group, Popover, Select, Text, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {DatePicker, TimeInput} from "@mantine/dates";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";
import {faCirclePlus,faM,faT,faW,faF,faS} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./ReminderForm.module.css";

const CheckboxIconM=({indeterminate,className})=>
    indeterminate?(
       <FontAwesomeIcon icon={faM} className={className} fontSize="10px"/>
    ):(<FontAwesomeIcon icon={faM} className={className} fontSize="10px"/>)

const CheckboxIconT=({indeterminate,className})=>
    indeterminate?(
        <FontAwesomeIcon icon={faT} className={className} fontSize="10px"/>
    ):(<FontAwesomeIcon icon={faT} className={className} fontSize="10px"/>)

const CheckboxIconW=({indeterminate,className})=>
    indeterminate?(
        <FontAwesomeIcon icon={faW} className={className} fontSize="10px"/>
    ):(<FontAwesomeIcon icon={faW} className={className} fontSize="10px"/>)

const CheckboxIconF=({indeterminate,className})=>
    indeterminate?(
        <FontAwesomeIcon icon={faF} className={className} fontSize="10px"/>
    ):(<FontAwesomeIcon icon={faF} className={className} fontSize="10px"/>)

const CheckboxIconS=({indeterminate,className})=>
    indeterminate?(
        <FontAwesomeIcon icon={faS} className={className} fontSize="10px"/>
    ):(<FontAwesomeIcon icon={faS} className={className} fontSize="10px"/>)

const SchedulePopUp = ({form, index}) => {

    const [scheduleType, setScheduleType] = useState("");

    return (
        <Popover withArrow shadow="md" position="top-start">

            <Popover.Target>
                <Button
                    variant="outline">{!form.values.reminders[index].schedule ? "Add Schedule" : "Edit Schedule"}</Button>
            </Popover.Target>
            <Popover.Dropdown>
                <Select label="Schedule type" placeholder="Select one"
                        value={scheduleType}
                        onChange={setScheduleType}
                        size="md"
                        data={[{value: "recurring", label: "Recurring"}, {
                            value: "oneTime",
                            label: "One-time"
                        }]}/>

                {scheduleType === "recurring" && (
                    <Checkbox.Group label="Repeating on:" size="md">
                        <Checkbox value="monday" icon={CheckboxIconM} indeterminate/>
                        <Checkbox value="tuesday" icon={CheckboxIconT} indeterminate/>
                        <Checkbox value="wednesday" icon={CheckboxIconW} indeterminate/>
                        <Checkbox value="thursday" icon={CheckboxIconT} indeterminate/>
                        <Checkbox value="friday" icon={CheckboxIconF} indeterminate/>
                        <Checkbox value="saturday" icon={CheckboxIconS} indeterminate/>
                        <Checkbox value="sunday" icon={CheckboxIconS} indeterminate/>
                    </Checkbox.Group>
                )}

                {scheduleType==="oneTime"&&(
                    <DatePicker label="Event Date" size="md"/>
                )}
            </Popover.Dropdown>
        </Popover>
    );
};


const ReminderForm = ({formData, nextStep, prevStep, setFormData}) => {

    const form = useForm({
        initialValues: {
            reminders: []

        },
        validate: {},
    });


    useEffect(() => {
        form.setValues(formData);
    }, [formData]);

    const handleAddItems = () => {
        form.insertListItem('reminders', {time: null, taskName: "", schedule: null});
    };

    const handleRemoveItems = (index) => {
        form.removeListItem('reminders', index);
    };
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
                {form.values.reminders.map((item, index) => {
                    return (

                        <div key={index}>

                            <Grid align="center">
                                <Grid.Col span={2}> <TimeInput
                                    format="12" {...form.getInputProps(`reminders.${index}.time`)} size="lg"/>
                                </Grid.Col>
                                <Grid.Col span={5}><TextInput {...form.getInputProps(`reminders.${index}.taskName`)}
                                                              size="lg"/></Grid.Col>
                                <Grid.Col span={4}>
                                    <SchedulePopUp form={form} index={index} key={index}/>
                                </Grid.Col>
                                <Grid.Col span={1}><FontAwesomeIcon icon={faTrashCan} size="lg"
                                                                    className={styles.removeIcon} onClick={() => {
                                    handleRemoveItems(index);
                                }}/></Grid.Col>

                            </Grid>


                        </div>
                    );
                })}

                <Grid>
                    <Grid.Col span={11}>
                        <Button onClick={handleAddItems} variant="outline" fullWidth
                                leftIcon={<FontAwesomeIcon icon={faCirclePlus} size="lg" width="2rem"/>}>
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