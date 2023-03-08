import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Grid,
  Group,
  Popover,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePicker, TimeInput } from "@mantine/dates";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
  faCirclePlus,
  faF,
  faM,
  faPlus,
  faS,
  faT,
  faW,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import reminderStyles from "./ReminderForm.module.css";
import { useMediaQuery } from "@mantine/hooks";

const CheckboxIconM = ({ indeterminate, className }) => {
  return indeterminate ? (
    <FontAwesomeIcon icon={faM} className={className} fontSize="10px" />
  ) : (
    <FontAwesomeIcon icon={faM} className={className} fontSize="10px" />
  );
};

const CheckboxIconT = ({ indeterminate, className }) => {
  return indeterminate ? (
    <FontAwesomeIcon icon={faT} className={className} fontSize="10px" />
  ) : (
    <FontAwesomeIcon icon={faT} className={className} fontSize="10px" />
  );
};

const CheckboxIconW = ({ indeterminate, className }) => {
  return indeterminate ? (
    <FontAwesomeIcon icon={faW} className={className} fontSize="10px" />
  ) : (
    <FontAwesomeIcon icon={faW} className={className} fontSize="10px" />
  );
};

const CheckboxIconF = ({ indeterminate, className }) => {
  return indeterminate ? (
    <FontAwesomeIcon icon={faF} className={className} fontSize="10px" />
  ) : (
    <FontAwesomeIcon icon={faF} className={className} />
  );
};

const CheckboxIconS = ({ indeterminate, className }) => {
  return indeterminate ? (
    <FontAwesomeIcon icon={faS} className={className} fontSize="10px" />
  ) : (
    <FontAwesomeIcon icon={faS} className={className} fontSize="10px" />
  );
};

const SchedulePopUp = ({
  form,
  index,
  isOpen,
  handleSetPopoverState,
  isMobile,
}) => {
  return (
    <Popover
      withArrow
      shadow="md"
      position="top-start"
      opened={isOpen}
      onOpen={() => {
        handleSetPopoverState(index, true);
      }}
      onClose={() => {
        handleSetPopoverState(index, false);
      }}
    >
      <Popover.Target>
        {!isMobile ? (
          <Button
            onClick={() => {
              handleSetPopoverState(index, true);
            }}
            variant={
              form.values.reminders[index].schedule.weekdays.length === 0
                ? "light"
                : "outlined"
            }
            leftIcon={
              <FontAwesomeIcon
                icon={
                  form.values.reminders[index].schedule.weekdays.length === 0
                    ? faPlus
                    : faPenToSquare
                }
              />
            }
          >
            {form.values.reminders[index].schedule.weekdays.length === 0 &&
            !form.values.reminders[index].schedule.eventDate
              ? "Add Schedule"
              : "Edit Schedule"}
          </Button>
        ) : form.values.reminders[index].schedule.weekdays.length === 0 &&
          !form.values.reminders[index].schedule.eventDate ? (
          <FontAwesomeIcon
            icon={faPlus}
            size="2xl"
            onClick={() => {
              handleSetPopoverState(index, true);
            }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faPenToSquare}
            size="2xl"
            onClick={() => {
              handleSetPopoverState(index, true);
            }}
          />
        )}
      </Popover.Target>
      <Popover.Dropdown>
        <Select
          label="Schedule type"
          placeholder="Select one"
          {...form.getInputProps(`reminders.${index}.schedule.scheduleType`)}
          onChange={(value) => {
            //clear reminders[index] first
            form.setFieldValue(`reminders.${index}.schedule.weekdays`, []);
            form.setFieldValue(`reminders.${index}.schedule.eventDate`, null);

            //set new value
            form.setFieldValue(
              `reminders.${index}.schedule.scheduleType`,
              value
            );
          }}
          size="md"
          data={[
            { value: "recurring", label: "Recurring" },
            { value: "oneTime", label: "One-time" },
          ]}
          clearable
        />

        {form.getInputProps(`reminders.${index}.schedule.scheduleType`)
          .value === "recurring" && (
          <Checkbox.Group
            label="Repeating on:"
            {...form.getInputProps(`reminders.${index}.schedule.weekdays`)}
            size="md"
          >
            <Checkbox value="Monday" icon={CheckboxIconM} indeterminate />
            <Checkbox value="Tuesday" icon={CheckboxIconT} indeterminate />
            <Checkbox value="Wednesday" icon={CheckboxIconW} indeterminate />
            <Checkbox value="Thursday" icon={CheckboxIconT} indeterminate />
            <Checkbox value="Friday" icon={CheckboxIconF} indeterminate />
            <Checkbox value="Saturday" icon={CheckboxIconS} indeterminate />
            <Checkbox value="Sunday" icon={CheckboxIconS} indeterminate />
          </Checkbox.Group>
        )}

        {form.getInputProps(`reminders.${index}.schedule.scheduleType`)
          .value === "oneTime" && (
          <DatePicker
            label="Event Date"
            size="md"
            {...form.getInputProps(`reminders.${index}.schedule.eventDate`)}
          />
        )}
      </Popover.Dropdown>
    </Popover>
  );
};

const ReminderForm = ({ formData, nextStep, prevStep, setFormData }) => {
  const isMobile = useMediaQuery("(max-width:1000px)");
  console.log("Is mobile: ", isMobile);
  const [popOverStates, setPopOverStates] = useState([]); //controls whether the popovers should be displayed
  const handleSetPopoverState = (index, value) => {
    setPopOverStates((prevState) => {
      let newState = [...prevState];
      newState[index] = value;
      return newState;
    });
  };
  const form = useForm({
    initialValues: {
      reminders: [],
    },
    validate: {},
  });

  useEffect(() => {
    form.setValues(formData);
  }, [formData]);

  const handleAddItems = () => {
    form.insertListItem("reminders", {
      time: null,
      taskName: "",
      schedule: { scheduleType: "", eventDate: null, weekdays: [] },
    });
    setPopOverStates((prevState) => {
      return [...prevState, false];
    });
  };

  const handleRemoveItems = (index) => {
    form.removeListItem("reminders", index);

    //remove from popover states
    setPopOverStates((prevState) => {
      let newStates = [
        ...prevState.slice(0, index),
        ...prevState.slice(index + 1),
      ];
      return newStates;
    });
  };

  //Validate form input (custom validator)
  const validateInput = () => {
    const errors = {};

    form.values.reminders.forEach((reminder, index) => {
      if (!reminder.time) {
        errors[`reminders.${index}.time`] = {
          message: "Time is required",
          index: index,
        };
      }

      if (!reminder.taskName) {
        errors[`reminders.${index}.taskName`] = {
          message: "Task name is required",
          index: index,
        };
      }

      if (!reminder.schedule.scheduleType) {
        errors[`reminders.${index}.schedule.scheduleType`] = {
          message: "Schedule type is required",
          index: index,
        };
      } else if (
        reminder.schedule.scheduleType === "recurring" &&
        reminder.schedule.weekdays.length === 0
      ) {
        errors[`reminders.${index}.schedule.weekdays`] = {
          message: "Please select at least one weekday",
          index: index,
        };
      } else if (
        reminder.schedule.scheduleType === "oneTime" &&
        !reminder.schedule.eventDate
      ) {
        errors[`reminders.${index}.schedule.eventDate`] = {
          message: "Event date is required",
          index: index,
        };
      }
    });

    for (const [key, value] of Object.entries(errors)) {
      //set field errors
      form.setFieldError(key, value.message);
      handleSetPopoverState(value.index, true);
    }
    return errors;
  };
  return (
    <div>
      <Text fz="xl" fw="700" mb="2rem" mt="2rem">
        Add Reminders for Caretakers:
      </Text>
      <form
        onSubmit={form.onSubmit((values, event) => {
          let errors = validateInput();
          if (Object.keys(errors).length > 0) {
            //if we've found errors, prevent form from submitting
            event.preventDefault();
            return;
          }

          setFormData(values);
          nextStep();
        })}
      >
        <Grid columns={30}>
          <Grid.Col span={isMobile ? 10 : 5}>
            <Text fw="500">Time</Text>
          </Grid.Col>
          <Grid.Col span={isMobile ? 10 : 25}>
            <Text fw="500">Action</Text>
          </Grid.Col>
        </Grid>
        {form.values.reminders.map((item, index) => {
          return (
            <div key={index}>
              <Grid align="center" columns={30} gutter={isMobile ? "xs" : "md"}>
                <Grid.Col span={isMobile ? 10 : 5}>
                  {" "}
                  <TimeInput
                    format="12"
                    {...form.getInputProps(`reminders.${index}.time`)}
                    size="lg"
                  />
                </Grid.Col>
                <Grid.Col span={isMobile ? 15 : 19}>
                  <TextInput
                    {...form.getInputProps(`reminders.${index}.taskName`)}
                    size="lg"
                  />
                </Grid.Col>
                <Grid.Col span={isMobile ? 3 : 5}>
                  <SchedulePopUp
                    form={form}
                    index={index}
                    key={index}
                    isOpen={popOverStates[index]}
                    handleSetPopoverState={handleSetPopoverState}
                    isMobile={isMobile}
                  />
                </Grid.Col>
                <Grid.Col span={1}>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    size={isMobile ? "2xl" : "lg"}
                    className={reminderStyles.removeIcon}
                    onClick={() => {
                      handleRemoveItems(index);
                    }}
                  />
                </Grid.Col>
              </Grid>
            </div>
          );
        })}

        <Grid>
          <Grid.Col span={12}>
            <Button
              onClick={handleAddItems}
              variant="outline"
              fullWidth
              leftIcon={
                <FontAwesomeIcon icon={faCirclePlus} size="lg" width="2rem" />
              }
            >
              Add More Actions
            </Button>
          </Grid.Col>
        </Grid>

        <Group position="right" mt="md" mb="20px">
          <Button name="prevButton" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" name="nextButton">
            Next
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default ReminderForm;
