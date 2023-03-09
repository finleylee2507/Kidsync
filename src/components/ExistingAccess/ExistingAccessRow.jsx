import React from "react";

import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Grid,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { updateDependent, updateUser } from "../../utilities/firebase";
import { toast } from "react-toastify";
import { useMediaQuery } from "@mantine/hooks";

const ExistingAccessRow = ({
  allUsers,
  caretaker,
  dependent,
  handleModalState,
}) => {
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

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values.permissions))}>
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
                <Checkbox value="basic" label="Basic" />
                <Checkbox value="reminders" label="Reminders" />
                <Checkbox value="generalCare" label="General Care" />
                <Checkbox value="education" label="Education" />
                <Checkbox value="documents" label="Documents" />
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
              size={isMobileMedium ? "xs" : "sm"}
              onClick={async () => {
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
                  updateDependentResult = await updateDependent(
                    newDependent,
                    dependent.id
                  );
                } catch (error) {
                  console.log(error);
                }
                if (updateDependentResult) {
                  toast.success("Successfully updated access!");
                } else {
                  toast.error(
                    "Hmm...Something went wrong. Please try again or contact the dev team."
                  );
                }
              }}
            >
              {isMobileExtraSmall ? "Update" : "Update Access"}
            </Button>
            <Button
              color="red"
              size={isMobileMedium ? "xs" : "sm"}
              onClick={async () => {
                // submit to db

                //Step 1: Delete dependent from caretaker's client list
                let targetCaretaker = allUsers[caretaker.id];

                //remove the dependent from client array
                let newClientList = targetCaretaker.clients.filter(
                  (client) => client.id !== dependent.id
                );

                let newUserObject = {
                  ...targetCaretaker,
                  clients: newClientList,
                };

                let updateCareTakerResult = false;
                try {
                  updateCareTakerResult = await updateUser(
                    newUserObject,
                    caretaker.id
                  );
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
              }}
            >
              {isMobileExtraSmall ? "Terminate" : "Terminate Access"}
            </Button>
          </Flex>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default ExistingAccessRow;
