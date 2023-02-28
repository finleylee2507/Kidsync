import { React, useState, useEffect } from "react";
// import clients from "../../utilities/clients.json";
import ClientCard from "./ClientCard";
import { SimpleGrid, Container, createStyles, Button } from "@mantine/core";

const useStyles = createStyles(() => ({
  button: {
    position: "relative",
    transition: "background-color 150ms ease",
    width: "150px",
    margin: "auto",
  },
  label: {
    position: "relative",
    zIndex: 1,
  },
}));

const ClientsList = ({ user, allUsers, allDependents }) => {
  const { classes, theme } = useStyles();

  const [allDeps, setAllDeps] = useState(allDependents);

  useEffect(() => {
    if (allDependents) {
      setAllDeps(allDependents);
    }
  });

  if (
    allDeps == null ||
    allDeps.length == 1 ||
    allUsers[user.uid]["clients"] == null
  ) {
    return (
      <div>
        <h1>You have no clients yet.</h1>
      </div>
    );
  } else {
    return (
      <div>
        <Container py="xl">
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
            {Object.entries(allUsers[user.uid].clients).map(([id, client]) => {
              console.log(client);
              return (
                <ClientCard
                  key={id}
                  client={allDependents[client.id]}
                  permissions={client.permissions}
                />
              );
            })}
          </SimpleGrid>
        </Container>
      </div>
    );
  }
};

export default ClientsList;
