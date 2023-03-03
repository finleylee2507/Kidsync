import React from "react";
import {
  Button,
  Checkbox,
  Grid,
  Input,
  Modal,
  Radio,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";
import { addNewClient } from "../../utilities/firebase";
import { useNavigate } from "react-router-dom";
import { fromEmailToDbString } from "../../utilities/emailFormatter";
import { sendSMS } from "./../../utilities/twilio";

const NewAccessModal = ({
  user,
  allUsers,
  allDependents,
  emailToIDMapping,
  isOpen,
  handleModalState,
  dependentName,
  dependentID,
}) => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      accessGranted: ["emergency"],
      relationship: "",
      otherRelationship: "",
    },
  });

  //returns an object containing error messages and the clientID if it exists
  const validateForm = async () => {
    const errors = {};

    //validate name
    if (!form.values.name) {
      form.setFieldError("name", "This field is required");
      errors.name = "This field is required";
    }

    //validate phone number
    if (
      !form.values.phoneNumber &&
      !/^\+1 \(\d{3}\) \d{3}-\d{4}$/.test(form.values.phoneNumber)
    ) {
      console.log("phone number");
      form.setFieldError("phoneNumber", "Invalid phone number");
      errors.phoneNumber = "Invalid phone number";
    }

    //validate relationship
    if (!form.values.relationship) {
      form.setFieldError("relationship", "This field is required");
      errors.relationship = "This field is required";
    }

    //validate other relationship
    if (
      !form.values.otherRelationship &&
      form.values.relationship === "other"
    ) {
      form.setFieldError("otherRelationship", "This field is required");
      errors.otherRelationship = "This field is required";
    }

    //validate email
    let emailValue = form.values.email;
    let clientID = null;
    if (!emailValue) {
      form.setFieldError("email", "Please enter an email");
      errors.emailError = "Please enter an email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      form.setFieldError("email", "Please enter a valid email");
      errors.emailError = "Please enter a valid email";
    } else {
      clientID = emailToIDMapping[await fromEmailToDbString(emailValue)];

      //check the to-be-added caretaker already exists
      let alreadyExist = false;
      for (let careTaker of allDependents[dependentID].caretakers) {
        if (careTaker.id === clientID) {
          alreadyExist = true;
        }
      }

      if (alreadyExist) {
        form.setFieldError(
          "email",
          "This person has already been granted access to the dependent."
        );
        errors.emailError =
          "This person has already been granted access to the dependent.";
      }

      if (!allUsers[clientID]) {
        form.setFieldError(
          "email",
          "There's no user registered under this email address"
        );
        errors.emailError =
          "There's no user registered under this email address";
      }
    }

    return [errors, clientID];
  };

  return (
    <div>
      <Modal
        opened={isOpen}
        onClose={() => {
          //clear form
          form.reset();

          //close modal
          handleModalState(false);
        }}
        title={`Share ${dependentName}'s Profile With`}
        size="xl"
        closeOnClickOutside={false}
      >
        <form
          onSubmit={form.onSubmit(async (values, event) => {
            //validate email
            let [errors, clientID] = await validateForm();
            if (Object.keys(errors).length > 0) {
              //prevent the form from submitting if the email field contains errors
              event.preventDefault();
              return;
            }

            // Create entry in clients array in users table (id and perms)
            let updatedUserClients;
            console.log("Test: ", allUsers[user.uid]);
            if (!allUsers[clientID].clients) {
              updatedUserClients = {
                clients: [
                  {
                    id: dependentID,
                    permissions: values.accessGranted,
                    relationship:
                      values.relationship == "other"
                        ? values.otherRelationship
                        : values.relationship,
                  },
                ],
              };
            } else {
              updatedUserClients = {
                clients: [
                  ...allUsers[clientID].clients,
                  {
                    id: dependentID,
                    permissions: values.accessGranted,
                    relationship:
                      values.relationship == "other"
                        ? values.otherRelationship
                        : values.relationship,
                  },
                ],
              };
            }

            // Add client to array of caretakers in this dependents object
            let updatedDependentCaretakers;
            if (!allDependents[dependentID].caretakers) {
              updatedDependentCaretakers = {
                caretakers: [
                  {
                    id: clientID,
                    permissions: values.accessGranted,
                    relationship:
                      values.relationship == "other"
                        ? values.otherRelationship
                        : values.relationship,
                  },
                ],
              };
            } else {
              updatedDependentCaretakers = {
                caretakers: [
                  ...allDependents[dependentID].caretakers,
                  {
                    id: clientID,
                    permissions: values.accessGranted,
                    relationship:
                      values.relationship == "other"
                        ? values.otherRelationship
                        : values.relationship,
                  },
                ],
              };
            }

            // Call firebase function
            let addResult = await addNewClient(
              updatedUserClients,
              updatedDependentCaretakers,
              clientID,
              dependentID
            );

            console.log("Add result: ", addResult);
            // Update toast notification
            if (addResult) {
              toast.success("Successfully granted access!");
              //close modal
              handleModalState(false);
              const message = `This is an automated message from KidSync. ${allDependents[dependentID].basic.firstName} ${allDependents[dependentID].basic.lastName}'s profile has been shared with you.`;
              sendSMS(allUsers[clientID].phoneNumber, message);
              form.reset();
              navigate("/dependents");
            } else {
              toast.error(
                "Hmm...Something went wrong. Please try again or contact the dev team."
              );
            }
          })}
        >
          <Grid gutter="xl" justify="center">
            <Grid.Col span={6}>
              <TextInput
                placeholder="Caretaker name"
                label="Name"
                withAsterisk
                {...form.getInputProps("name")}
              />
              <TextInput
                placeholder="Caretaker email"
                label="Email"
                withAsterisk
                {...form.getInputProps("email")}
                mt="1rem"
              />
              <Input.Wrapper
                label="Phone Number"
                withAsterisk
                error={form.errors.phoneNumber}
                mt="1rem"
              >
                <Input
                  component={InputMask}
                  placeholder="Caretaker phone number"
                  mask="+1 (999) 999-9999"
                  {...form.getInputProps("phoneNumber")}
                />
              </Input.Wrapper>
            </Grid.Col>

            <Grid.Col span={6}>
              <Radio.Group
                name="relationship"
                label="Relationship"
                {...form.getInputProps("relationship")}
                onClick={() => {
                  //reset otherRelationship everytime we select
                  form.setFieldValue("otherRelationship", "");
                }}
                withAsterisk
              >
                <Radio value="coparent" label="Co-Parent" />
                <Radio value="doctor" label="Doctor" />
                <Radio value="babysitter" label="Babysitter" />
                <Radio value="schoolstaff" label="School Staff" />
                <Radio value="other" label="Other" />
              </Radio.Group>
              {form.values.relationship === "other" && (
                <TextInput
                  placeholder="Other"
                  label="Please specify"
                  withAsterisk
                  {...form.getInputProps("otherRelationship")}
                />
              )}

              <Checkbox.Group
                defaultValue={["emergency"]}
                label="Access Granted"
                withAsterisk
                {...form.getInputProps("accessGranted")}
                mt="2rem"
              >
                <Checkbox value="basic" label="Basic" />
                <Checkbox value="reminders" label="Reminders" />
                <Checkbox value="generalCare" label="General Care" />
                <Checkbox
                  value="emergency"
                  label="Emergency"
                  checked
                  disabled
                />
                <Checkbox value="education" label="Education" />
                <Checkbox value="documents" label="Documents" />
              </Checkbox.Group>
            </Grid.Col>

            <Grid.Col span={10}>
              <Button type="submit" fullWidth>
                Grant Access
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Modal>
    </div>
  );
};
export default NewAccessModal;
