import React from "react";
import clients from "../../utilities/clients.json";
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

const ClientsList = () => {
  const { classes, theme } = useStyles();

  return (
    <div>
      <Container py="xl">
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
          {Object.entries(clients["clients"]).map(([id, client]) => {
            console.log(client);
            return <ClientCard key={id} client={client} />;
          })}
        </SimpleGrid>
      </Container>
    </div>
  );
};

export default ClientsList;
