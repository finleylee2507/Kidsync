import React from "react";

import {Button, Checkbox, Divider, Grid, SimpleGrid, Text,} from "@mantine/core";
import {useForm} from "@mantine/form";
import {updateDependent, updateUser} from "../../utilities/firebase";
import {toast} from "react-toastify";

const ExistingAccessRow = ({
                               allUsers,
                               caretaker,
                               dependent,
                               handleModalState,
                           }) => {
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
            <Divider my="sm"/>
        <Grid>

            <Grid.Col span={2}>
                <Text>{allUsers[caretaker.id].displayName}</Text>
            </Grid.Col>

            <Grid.Col span={2}>
                <Text>{caretaker.relationship}</Text>
            </Grid.Col>
           <Grid.Col span={4}>
               <Text>
                   <Checkbox.Group {...form.getInputProps("permissions")}>
                       <SimpleGrid cols={2}>
                           <Checkbox value="basic" label="Basic"/>
                           <Checkbox value="reminders" label="Reminders"/>
                           <Checkbox value="generalCare" label="General Care"/>
                           <Checkbox value="education" label="Education"/>
                           <Checkbox value="documents" label="Documents"/>
                           <Checkbox value="emergency" label="Emergency" checked disabled/>
                       </SimpleGrid>

                   </Checkbox.Group>
               </Text>
           </Grid.Col>

            <Grid.Col span={4}>
                <div>


                    <Button
                        variant="outline"
                        onClick={async () => {
                            let newCaretaker = {
                                ...caretaker,
                                permissions: form.values.permissions,
                            };
                            let newDependent = {...dependent, caretakers: [newCaretaker]};

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
                                handleModalState(false);
                            } else {
                                toast.error(
                                    "Hmm...Something went wrong. Please try again or contact the dev team."
                                );
                            }
                        }}
                    >
                        Update Access
                    </Button>
                    <Button
                        ml="20px"

                        color="red"
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
                        Terminate Access
                    </Button>


                </div>
            </Grid.Col>


        </Grid>


        </form>
    );
};

export default ExistingAccessRow;
