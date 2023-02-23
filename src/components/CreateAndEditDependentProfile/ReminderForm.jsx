import React, {useEffect} from 'react';
import {Button, Checkbox, Grid, Group, Popover, Select, Text, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {DatePicker, TimeInput} from "@mantine/dates";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";
import {faCirclePlus, faF, faM, faS, faT, faW} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./ReminderForm.module.css";

const CheckboxIconM = ({indeterminate, className}) =>
    indeterminate ? (
        <FontAwesomeIcon icon={faM} className={className} fontSize="10px"/>
    ) : (<FontAwesomeIcon icon={faM} className={className} fontSize="10px"/>);

const CheckboxIconT = ({indeterminate, className}) =>
    indeterminate ? (
        <FontAwesomeIcon icon={faT} className={className} fontSize="10px"/>
    ) : (<FontAwesomeIcon icon={faT} className={className} fontSize="10px"/>);

const CheckboxIconW = ({indeterminate, className}) =>
    indeterminate ? (
        <FontAwesomeIcon icon={faW} className={className} fontSize="10px"/>
    ) : (<FontAwesomeIcon icon={faW} className={className} fontSize="10px"/>);

const CheckboxIconF = ({indeterminate, className}) =>
    indeterminate ? (
        <FontAwesomeIcon icon={faF} className={className} fontSize="10px"/>
    ) : (<FontAwesomeIcon icon={faF} className={className} fontSize="10px"/>);

const CheckboxIconS = ({indeterminate, className}) =>
    indeterminate ? (
        <FontAwesomeIcon icon={faS} className={className} fontSize="10px"/>
    ) : (<FontAwesomeIcon icon={faS} className={className} fontSize="10px"/>);

const SchedulePopUp = ({form, index}) => {


    return (
        <Popover withArrow shadow="md" position="top-start">

            <Popover.Target>
                <Button
                    variant="outline">{form.values.reminders[index].schedule.weekdays.length === 0 && !form.values.reminders[index].schedule.eventDate ? "Add Schedule" : "Edit Schedule"}</Button>
            </Popover.Target>
            <Popover.Dropdown>
                <Select label="Schedule type" placeholder="Select one"
                        value={form.values.reminders[index].schedule.scheduleType}
                        onChange={(value) => {

                            //clear reminders[index] first
                            form.setFieldValue(
                                `reminders.${index}.schedule.weekdays`,
                                []
                            );
                            form.setFieldValue(
                                `reminders.${index}.schedule.eventDate`,
                                null
                            );


                            //set new value
                            form.setFieldValue(
                                `reminders.${index}.schedule.scheduleType`,
                                value
                            );
                        }


                        }
                        size="md"
                        data={[{value: "recurring", label: "Recurring"}, {
                            value: "oneTime",
                            label: "One-time"
                        }]}
                        clearable
                />

                {form.values.reminders[index].schedule.scheduleType === "recurring" && (
                    <Checkbox.Group label="Repeating on:" size="md"
                                    value={form.values.reminders[index].schedule.weekdays} onChange={(value) =>
                        form.setFieldValue(
                            `reminders.${index}.schedule.weekdays`,
                            value
                        )
                    }>
                        <Checkbox value="Monday" icon={CheckboxIconM} indeterminate/>
                        <Checkbox value="Tuesday" icon={CheckboxIconT} indeterminate/>
                        <Checkbox value="Wednesday" icon={CheckboxIconW} indeterminate/>
                        <Checkbox value="Thursday" icon={CheckboxIconT} indeterminate/>
                        <Checkbox value="Friday" icon={CheckboxIconF} indeterminate/>
                        <Checkbox value="Saturday" icon={CheckboxIconS} indeterminate/>
                        <Checkbox value="Sunday" icon={CheckboxIconS} indeterminate/>
                    </Checkbox.Group>
                )}

                {form.values.reminders[index].schedule.scheduleType === "oneTime" && (
                    <DatePicker label="Event Date" size="md" value={form.values.reminders[index].schedule.eventDate}
                                onChange={(value) =>
                                    form.setFieldValue(
                                        `reminders.${index}.schedule.eventDate`,
                                        value
                                    )
                                }/>
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

    console.log("Reminder form data: ",form.values);
    useEffect(() => {
        form.setValues(formData);
    }, [formData]);

    const handleAddItems = () => {
        form.insertListItem('reminders', {
            time: null,
            taskName: "",
            schedule: {scheduleType: "", eventDate: null, weekdays: []}
        });
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