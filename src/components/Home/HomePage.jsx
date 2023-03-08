import React, { useState, useEffect } from "react";
import { SimpleGrid, Container } from "@mantine/core";
import DependentCard from "./../Dependents/DependentCard";
import ClientCard from "../Sitters/ClientCard";
import clients from "../../utilities/clients.json";
import styles from "./HomePage.module.css";

const HomePage = ({ user, allUsers, allDependents }) => {
  const [allDeps, setAllDeps] = useState(allDependents);

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
          {/* <hr className={styles.headerBorder}></hr> */}
        </div>
        <div className={styles.dependentsContainer}>
          {!(
            allDeps == null ||
            allDeps.length == 1 ||
            allUsers[user.uid]["dependents"] == null
          ) &&
            Object.entries(allUsers[user.uid]["dependents"]).map(
              ([id, dependentID]) => (
                <DependentCard
                  key={id}
                  dependent={allDependents[dependentID]}
                  showAll={false}
                />
              )
            )}
        </div>
        <div className={styles.sectionHeaderContainer}>
          <h1 className={styles.sectionHeader}>In My Care</h1>
          {/* <hr className={styles.headerBorder}></hr> */}
        </div>
        <div className={styles.dependentsContainer}>
          {!(
            allDeps == null ||
            allDeps.length == 1 ||
            allUsers[user.uid] == undefined ||
            allUsers[user.uid].clients == null
          ) &&
            Object.entries(allUsers[user.uid].clients).map(([id, client]) => {
              console.log(client);
              return (
                <ClientCard
                  key={id}
                  client={allDependents[client.id]}
                  permissions={client.permissions}
                  creator={allUsers[allDependents[client.id].creator]}
                  currentUser={allUsers[user.uid]}
                />
              );
            })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
