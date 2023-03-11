import { React, useEffect, useState } from "react";
// import clients from "../../utilities/clients.json";
import ClientCard from "./ClientCard";
import { Container, createStyles, Grid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

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
  const isMobile = useMediaQuery("(max-width:850px)");
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
      <Container fluid style={{ backgroundColor: "#EEE1C4", height: "100vh" }}>
        <Container py="xl">
          <Grid>
            {Object.entries(allUsers[user.uid].clients).map(([id, client]) => {
              return (
                <Grid.Col span={isMobile ? 12 : 6}>
                  <ClientCard
                    key={id}
                    client={allDependents[client.id]}
                    permissions={client.permissions}
                    creator={allUsers[allDependents[client.id].creator]}
                    currentUser={allUsers[user.uid]}
                    isOnHomePage={false}
                  />
                </Grid.Col>
              );
            })}
          </Grid>
        </Container>
      </Container>
    );
  }
};

export default ClientsList;
