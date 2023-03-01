import React from "react";
import {
  Button,
  Checkbox,
  Grid,
  Group,
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

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      name: (value) => (!value ? "This field is required" : null),
      phoneNumber: (value) =>
        /^\+1 \(\d{3}\) \d{3}-\d{4}$/.test(value)
          ? null
          : "Invalid phone number",
      relationship: (value) => (!value ? "This field is required" : null),
      otherRelationship: (value) =>
        !value && form.values.relationship === "other"
          ? "This field is required"
          : null,
    },
  });



  return (
    <div>
      <Modal
        opened={isOpen}
        onClose={() => handleModalState(false)}
        title={`Share ${dependentName}'s Profile With`}
        size="xl"
      >
        <form
          onSubmit={form.onSubmit(async (values, event) => {

            // Get apt user ID from email to ID mapping table
            let clientID = emailToIDMapping[values.email.split("@")[0]];

            // Create entry in clients array in users table (id and perms)
            let updatedUserClients;
            console.log("Test: ",allUsers[user.uid]);
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

            console.log("Add result: ",addResult);
            // Update toast notification
            if (addResult) {
              toast.success("Successfully granted access!")
              //close modal
              handleModalState(false)
              navigate("/dependents");
            } else {
              toast.error("Hmm...Something went wrong. Please try again or contact the dev team.")
              handleModalState(false)
              navigate("/dependents");
            }
          })}
        >
          <Grid gutter="xl" justify="center">
            <Grid.Col span={6}>
              <TextInput
                placeholder="Your name"
                label="Name"
                withAsterisk
                {...form.getInputProps("name")}
              />
              <TextInput
                placeholder="Your email"
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
