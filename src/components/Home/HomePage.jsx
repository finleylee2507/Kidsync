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

  useEffect(() => {
    if (allDependents) {
      setAllDeps(allDependents);
    }
  });

  return (
    <React.Fragment>
      <div className="wrapper">
        <div className={styles.sectionHeaderContainer}>
          <h1 className={styles.sectionHeader}>My Dependents</h1>
        </div>
        <Container size="xl" mx={0}>
          {!(
            allDeps == null ||
            allDeps.length == 1 ||
            allUsers[user.uid]["dependents"] == null
          ) && (
            <Grid>
              {Object.entries(allUsers[user.uid]["dependents"]).map(
                ([id, dependentID]) => (
                  <Grid.Col span={isMobileSmall ? 12 : isMobileMedium ? 6 : 4}>
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
            allUsers[user.uid].clients == null
          ) && (
            <Grid>
              {Object.entries(allUsers[user.uid].clients).map(
                ([id, client]) => {
                  return (
                    <Grid.Col
                      span={isMobileSmall ? 12 : isMobileMedium ? 6 : 4}
                    >
                      <ClientCard
                        key={id}
                        client={allDependents[client.id]}
                        permissions={client.permissions}
                        creator={allUsers[allDependents[client.id].creator]}
                        currentUser={allUsers[user.uid]}
                      />
                    </Grid.Col>
                  );
                }
              )}
            </Grid>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
