import React from "react";
import {Box, Grid, Image, Modal, Text} from "@mantine/core";
import ExistingAccessRow from "./ExistingAccessRow";
import {useMediaQuery} from "@mantine/hooks";
import emptyState from "../../images/empty_state4.png";

const ExistingAccessModal = ({
                                 allUsers,
                                 isOpen,
                                 handleModalState,
                                 dependent,
                             }) => {
    const isMobileMedium = useMediaQuery("(max-width:1200px)");
    const isMobileSmall = useMediaQuery("(max-width:750px)");
    const isMobileExtraSmall = useMediaQuery("(max-width:600px)");
    return (
        <div>
            <Modal
                opened={isOpen}
                onClose={() => handleModalState(false)}
                size="80%"
                closeOnClickOutside={false}
                overflow="inside"
                fullScreen={isMobileMedium}
            >
                {/* Check if dependent exists */}
                {dependent && dependent.caretakers ? (
                    <div style={{width: "99%"}}>
                        <Text
                            size={isMobileExtraSmall ? "sm" : "xl"}
                            ta="center"
                            c="black"
                            mb={30}
                            fw={700}
                        >
                            {`Currently Sharing ${dependent.basic.firstName} ${dependent.basic.lastName}'s Profile With:`}
                        </Text>
                        <Grid columns={30}>
                            <Grid.Col span={isMobileExtraSmall ? 5 : 4}>
                                <Text fw={700} size={isMobileSmall ? "xs" : "md"}>
                                    Name:
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={isMobileExtraSmall ? 6 : 4}>
                                <Text fw={700} size={isMobileSmall ? "xs" : "md"}>
                                    Relationship:
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={10}>
                                <Text fw={700} size={isMobileSmall ? "xs" : "md"}>
                                    Access Granted:
                                </Text>
                            </Grid.Col>
                            <Grid.Col span={isMobileExtraSmall ? 9 : 12}>
                                <Text fw={700} size={isMobileSmall ? "xs" : "md"}>
                                    Options:
                                </Text>
                            </Grid.Col>
                        </Grid>

                        {
                            // dependent.caretakers
                            dependent.caretakers.map((caretaker) => {
                                console.log(caretaker);
                                return (
                                    <ExistingAccessRow
                                        key={caretaker.id}
                                        allUsers={allUsers}
                                        caretaker={caretaker}
                                        dependent={dependent}
                                        handleModalState={handleModalState}
                                    />
                                );
                            })
                        }
                    </div>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            src={emptyState}
                            height={300}
                            width={300}
                            fit="contain"
                            alt="No caretaker"
                            sx={{opacity: 0.8}}
                            mt={-40}
                        />

                        <Text fz="xl" fw={500} mt={-30} ta="center">
                            No caretaker...
                        </Text>
                        <Text fz="md" fw={400} c="#6d757c" mt={10} ta="center">
                            When you create a dependent, he/she will show up here.
                        </Text>
                    </Box>
                )}
            </Modal>
        </div>
    );
};

export default ExistingAccessModal;
