import React, { useState } from "react";

import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Grid,
  Modal,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { updateDependent, updateUser } from "../../utilities/firebase";
import { toast } from "react-toastify";
import { useMediaQuery } from "@mantine/hooks";
import styles from "./ExistingAccessRow.module.css";

const ExistingAccessRow = ({
  allUsers,
  caretaker,
  dependent,
  handleModalState,
}) => {
  const [isTerminateModalOpen, setIsTerminateModalOpen] = useState(false);
  const isMobileMedium = useMediaQuery("(max-width:1200px)");
  const isMobileSmall = useMediaQuery("(max-width:750px)");
  const isMobileExtraSmall = useMediaQuery("(max-width:500px)");
  const form = useForm({
    initialValues: {
      permissions: caretaker.permissions, // get actual permissions from db
    },
    validate: {
      permissions: (value) =>
        value.length === 0 ? "Please select at least one permission" : null,
    },
  });

  const promptConfirmation = () => {
    setIsTerminateModalOpen(true);
  };
  const handleUpdate = async () => {
    //step 1: update dependent's caretaker's permission
    let newCaretaker = {
      ...caretaker,
      permissions: form.values.permissions,
    };

    let newCareTakers = dependent.caretakers.map((item) => {
      if (item.id === caretaker.id) {
        return newCaretaker;
      } else {
        return item;
      }
    });
    let newDependent = {
      ...dependent,
      caretakers: newCareTakers,
    };

    let updateDependentResult = false;
    try {
      updateDependentResult = await updateDependent(newDependent, dependent.id);
    } catch (error) {
      console.log(error);
    }

    //step 2: update current user's client's permission
    let newClient = null;

    // console.log("Care taker: ", allUsers[caretaker.id]);
    for (let client of allUsers[caretaker.id].clients) {
      if (client.id === dependent.id) {
        newClient = { ...client, permissions: form.values.permissions };
      }
    }

    let newClients = allUsers[caretaker.id].clients.filter(
      (client) => client.id !== dependent.id
    );
    newClients.push(newClient);

    let newCareTaker = { ...allUsers[caretaker.id], clients: newClients };

    let updateUserResult = false;
    try {
      updateUserResult = await updateUser(newCareTaker, caretaker.id);
    } catch (error) {
      console.log(error);
    }
    if (updateDependentResult && updateUserResult) {
      toast.success("Successfully updated access!");
    } else {
      toast.error(
        "Hmm...Something went wrong. Please try again or contact the dev team."
      );
    }
  };
  const handleTerminate = async () => {
    //Step 1: Delete dependent from caretaker's client and currentlyInCare list
    let targetCaretaker = allUsers[caretaker.id];

    //remove the dependent from client array
    let newClientList = targetCaretaker.clients.filter(
      (client) => client.id !== dependent.id
    );

    let newCurrentlyInCareList = targetCaretaker.currentlyInCare.filter(
      (item) => item !== dependent.id
    );

    let newUserObject = {
      ...targetCaretaker,
      clients: newClientList,
      currentlyInCare: newCurrentlyInCareList,
    };

    let updateCareTakerResult = false;
    try {
      updateCareTakerResult = await updateUser(newUserObject, caretaker.id);
    } catch (error) {
      console.log(error);
    }

    let updateDependentResult = false;
    //Step 2: Go to dependents object, delete caretaker from caretaker list
    let newDependentCaretakers = dependent.caretakers.filter(
      (item) => item.id !== caretaker.id
    );
    let newDependentObject = {
      ...dependent,
      caretakers: newDependentCaretakers,
    };
    try {
      updateDependentResult = await updateDependent(
        newDependentObject,
        dependent.id
      );
    } catch (error) {
      console.log(error);
    }

    if (updateCareTakerResult && updateDependentResult) {
      toast.success("Successfully terminated access!");
    } else {
      toast.error(
        "Hmm...Something went wrong. Please try again or contact the dev team."
      );
    }
  };
  return (
    <div>
      <form
        onSubmit={form.onSubmit((values) => console.log(values.permissions))}
      >
        <Divider my="sm" />
        <Grid columns={30} gutter={isMobileSmall ? "xs" : "md"}>
          <Grid.Col span={isMobileExtraSmall ? 5 : 4}>
            <Text size={isMobileExtraSmall ? "xs" : "md"}>
              {allUsers[caretaker.id].displayName}
            </Text>
          </Grid.Col>

          <Grid.Col span={isMobileExtraSmall ? 6 : 4}>
            <Text size={isMobileExtraSmall ? "xs" : "md"}>
              {caretaker.relationship}
            </Text>
          </Grid.Col>
          <Grid.Col span={10}>
            <Text>
              <Checkbox.Group
                {...form.getInputProps("permissions")}
                size={isMobileExtraSmall ? "xs" : "sm"}
              >
                <SimpleGrid cols={isMobileSmall ? 1 : 2}>
                  <Checkbox value="basic" label="Basic" color="indigo" />
                  <Checkbox
                    value="reminders"
                    label="Reminders"
                    color="indigo"
                  />
                  <Checkbox
                    value="generalCare"
                    label="General Care"
                    color="indigo"
                  />
                  <Checkbox
                    value="education"
                    label="Education"
                    color="indigo"
                  />
                  <Checkbox
                    value="documents"
                    label="Documents"
                    color="indigo"
                  />
                  <Checkbox
                    value="emergency"
                    label="Emergency"
                    checked
                    disabled
                  />
                </SimpleGrid>
              </Checkbox.Group>
            </Text>
          </Grid.Col>

          <Grid.Col span={isMobileExtraSmall ? 9 : 12}>
            <Flex
              direction={isMobileSmall ? "column" : "row"}
              gap={isMobileSmall ? "10px" : "2rem"}
            >
              <Button
                variant="outline"
                classNames={{
                  root: styles.updateAccessButton,
                }}
                size={isMobileMedium ? "xs" : "sm"}
                onClick={handleUpdate}
              >
                {isMobileExtraSmall ? "Update" : "Update Access"}
              </Button>
              <Button
                color="red"
                size={isMobileMedium ? "xs" : "sm"}
                onClick={promptConfirmation}
              >
                {isMobileExtraSmall ? "Terminate" : "Terminate Access"}
              </Button>
            </Flex>
          </Grid.Col>
        </Grid>
      </form>

      <Modal
        title="You are about to terminate this access"
        opened={isTerminateModalOpen}
        onClose={() => setIsTerminateModalOpen(false)}
        classNames={{
          title: styles.modalTitle,
        }}
        size="lg"
        centered
      >
        <Text>
          Are you sure you want to terminate this access? This action cannot be
          undone.
        </Text>

        <Divider my="sm" />
        <div className={styles.modalButtonContainer}>
          <Button
            variant="outline"
            onClick={() => {
              setIsTerminateModalOpen(false);
            }}
            classNames={{
              root: styles.cancelButton,
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleTerminate}
            classNames={{ root: styles.confirmButton }}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ExistingAccessRow;
