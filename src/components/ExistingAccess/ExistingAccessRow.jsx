import React from "react";

import {
  Group,
  Modal,
  Button,
  Text,
  Checkbox,
  SimpleGrid,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {updateDependent, updateUser} from "../../utilities/firebase";

const ExistingAccessRow = ({ allUsers, caretaker,dependent }) => {
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
      <SimpleGrid cols={4} mb={10}>
        <Text>{allUsers[caretaker.id].displayName}</Text>
        <Text>{caretaker.relationship}</Text>
        <Text>
          <Checkbox.Group {...form.getInputProps("permissions")}>
            <Checkbox value="basic" label="Basic" />
            <Checkbox value="reminders" label="Reminders" />
            <Checkbox value="generalCare" label="General Care" />
            <Checkbox value="emergency" label="Emergency" checked disabled />
            <Checkbox value="education" label="Education" />
            <Checkbox value="documents" label="Documents" />
          </Checkbox.Group>
        </Text>
        <div>
          <Button
            onClick={() => {
              // submit to db
              console.log("Click submit");
            }}
          >
            Update Access
          </Button>
          <Button
            color="red"
            onClick={async () => {

                // submit to db


                //Step 1: Delete dependent from caretaker's client list
                let targetCaretaker = allUsers[caretaker.id]


                //remove the dependent from client array
                let newClientList = targetCaretaker.clients.filter((client) => client.id !== dependent.id)


                let newUserObject = {...targetCaretaker, clients: newClientList}

                let updateCareTakerResult=false
                try {
                    updateCareTakerResult = await updateUser(newUserObject, caretaker.id)

                } catch (error) {
                    console.log(error);
                }

                let updateDependentResult=false
                //Step 2: Go to dependents object, delete caretaker from caretaker list
                let newDependentCaretakers=dependent.caretakers.filter((item)=>item.id!==caretaker.id)
                let newDependentObject={...dependent,caretakers:newDependentCaretakers}
                try{
                    updateDependentResult=await updateDependent(newDependentObject,dependent.id)
                }
                catch(error){
                    console.log(error);
                }

                if(updateCareTakerResult&&updateDependentResult){


                }
                else{

                }


            }}
          >
            Terminate Access
          </Button>
        </div>
      </SimpleGrid>
    </form>
  );
};

export default ExistingAccessRow;
