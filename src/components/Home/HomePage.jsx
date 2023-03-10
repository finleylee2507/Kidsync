import React, { useState, useEffect } from "react";
import { SimpleGrid, Container, Grid } from "@mantine/core";
import DependentCard from "./../Dependents/DependentCard";
import ClientCard from "../Sitters/ClientCard";
import clients from "../../utilities/clients.json";
import styles from "./HomePage.module.css";
import { useMediaQuery } from "@mantine/hooks";

const HomePage = ({ user, allUsers, allDependents }) => {
  const [allDeps, setAllDeps] = useState(allDependents);
  const isMobileSmall = useMediaQuery("(max-width:700px)");
  const isMobileMedium = useMediaQuery("(max-width:1200px)");
  const isBigScreen = useMediaQuery("(min-width:1800px)");

  useEffect(() => {
    if (allDependents) {
      setAllDeps(allDependents);
    }
  });

  if (user && allUsers) {
    console.log("currentlyInCare: ", allUsers[user.uid].currentlyInCare);
  }

  const getPermissions = (clients, clientID) => {
    for (let i = 0; i < clients.length; i++) {
      if (clients[i].id == clientID) {
        return clients[i].permissions;
      }
    }
  };

  return (
    <React.Fragment>
      <div className="wrapper">
        <div className={styles.sectionHeaderContainer}>
          <h1 className={styles.sectionHeader}>My Dependents</h1>
        </div>
        <Container fluid mx={0}>
          {!(
            allDeps == null ||
            allDeps.length == 1 ||
            allUsers[user.uid]["dependents"] == null
          ) && (
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
          )}
        </Container>

        <div className={styles.sectionHeaderContainer}>
          <h1 className={styles.sectionHeader}>In My Care</h1>
        </div>
        <div className={styles.dependentsContainer}>
          {!(
            allDeps == null ||
            allDeps.length == 1 ||
            allUsers[user.uid] == undefined ||
            allUsers[user.uid].currentlyInCare == null
          ) && (
            <Grid>
              {allUsers[user.uid].currentlyInCare.map((clientID) => {
                console.log(clientID);
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
                    />
                  </Grid.Col>
                );

                // return (
                //   <Grid.Col
                //     span={
                //       isBigScreen
                //         ? 3
                //         : isMobileSmall
                //         ? 12
                //         : isMobileMedium
                //         ? 6
                //         : 4
                //     }
                //     key={id}
                //   >
                //     <ClientCard
                //       key={id}
                //       client={allDependents[client.id]}
                //       permissions={client.permissions}
                //       creator={allUsers[allDependents[client.id].creator]}
                //       currentUser={allUsers[user.uid]}
                //     />
                //   </Grid.Col>
                // );
              })}
            </Grid>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
