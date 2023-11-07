import React, {useEffect, useState} from "react";
import {Container, Grid, Image, Text} from "@mantine/core";
import DependentCard from "./../Dependents/DependentCard";
import ClientCard from "../Sitters/ClientCard";
import styles from "./HomePage.module.css";
import {useMediaQuery} from "@mantine/hooks";
import emptyState1 from "../../images/empty_state1.png";
import emptyState2 from "../../images/empty_state2.png";

const HomePage = ({user, allUsers, allDependents}) => {
    const [allDeps, setAllDeps] = useState(allDependents);
    const isMobileSmall = useMediaQuery("(max-width:700px)");
    const isMobileMedium = useMediaQuery("(max-width:1200px)");
    const isBigScreen = useMediaQuery("(min-width:1800px)");

    useEffect(() => {
        if (allDependents) {
            setAllDeps(allDependents);
        }
    });

    const getPermissions = (clients, clientID) => {
        for (let i = 0; i < clients.length; i++) {
            if (clients[i].id == clientID) {
                return clients[i].permissions;
            }
        }
    };

    return (
        <Container
            fluid
            sx={{
                backgroundColor: "#e7e5f4",
                height: "100%",
                minHeight: "calc(100vh - 0px)",
            }}
        >
            <div className={styles.sectionHeaderContainer}>
                <h1 className={styles.sectionHeader}>My Dependents</h1>
            </div>
            <Container fluid mx={0}>
                {!(
                    allDeps == null ||
                    allDeps.length == 1 ||
                    allUsers[user.uid]["dependents"] == null
                ) ? (
                    <Grid>
                        {Object.entries(allUsers[user.uid]["dependents"]).map(
                            ([id, dependentID]) => (
                                <Grid.Col
                                    span={
                                        isBigScreen
                                            ? 3
                                            : isMobileSmall
                                                ? 12
                                                : isMobileMedium
                                                    ? 6
                                                    : 4
                                    }
                                    key={dependentID}
                                >
                                    <DependentCard
                                        key={id}
                                        dependent={allDependents[dependentID]}
                                        showAll={false}
                                    />
                                </Grid.Col>
                            )
                        )}
                    </Grid>
                ) : (
                    <Grid>
                        <Grid.Col>
                            <Image
                                src={emptyState1}
                                height={300}
                                width={300}
                                fit="contain"
                                alt="No dependent"
                                sx={{opacity: 0.8}}
                                ml={20}
                            />
                        </Grid.Col>

                        <Grid.Col>
                            <Text fz="xl" fw={500} ml={60} mt={-50}>
                                You have no dependent...
                            </Text>
                            <Text fz="md" fw={400} c="#6d757c" mt={10}>
                                When you create a dependent, he/she will show up here.
                            </Text>
                        </Grid.Col>
                    </Grid>
                )}
            </Container>

            <div className={styles.sectionHeaderContainer}>
                <h1 className={styles.sectionHeader}>In My Care</h1>
            </div>
            <Container fluid mx={0}>
                {!(
                    allDeps == null ||
                    allDeps.length == 1 ||
                    allUsers[user.uid] == undefined ||
                    allUsers[user.uid].currentlyInCare == null ||
                    allUsers[user.uid].clients == null
                ) ? (
                    <Grid>
                        {allUsers[user.uid].currentlyInCare.map((clientID) => {
                            return (
                                <Grid.Col
                                    span={
                                        isBigScreen
                                            ? 3
                                            : isMobileSmall
                                                ? 12
                                                : isMobileMedium
                                                    ? 6
                                                    : 4
                                    }
                                    key={clientID}
                                >
                                    <ClientCard
                                        key={clientID}
                                        client={allDependents[clientID]}
                                        permissions={getPermissions(
                                            allUsers[user.uid].clients,
                                            clientID
                                        )}
                                        creator={allUsers[allDependents[clientID].creator]}
                                        currentUser={allUsers[user.uid]}
                                        isOnHomePage={true}
                                    />
                                </Grid.Col>
                            );
                        })}
                    </Grid>
                ) : (
                    <Grid>
                        <Grid.Col>
                            <Image
                                src={emptyState2}
                                height={300}
                                width={300}
                                fit="contain"
                                alt="No one in care"
                                sx={{opacity: 0.8}}
                            />
                        </Grid.Col>

                        <Grid.Col>
                            <Text fz="xl" fw={500} ml={60} mt={-30}>
                                You have no one in your care...
                            </Text>
                            <Text fz="md" fw={400} c="#6d757c" mt={10} mb={20}>
                                When you pick up a client, he/she will show up here.
                            </Text>
                        </Grid.Col>
                    </Grid>
                )}
            </Container>
        </Container>
    );
};

export default HomePage;
