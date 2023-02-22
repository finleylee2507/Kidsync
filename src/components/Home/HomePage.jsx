import React, { useState, useEffect } from "react";
import { SimpleGrid, Container} from "@mantine/core";
import DependentCard from './../Dependents/DependentCard';

const HomePage = ({ user, allUsers, allDependents }) => {
  const [allDeps, setAllDeps] = useState(allDependents);

  useEffect(() => {
    if (allDependents) {
      setAllDeps(allDependents);
    }
  });

  return (
    <React.Fragment>
      <h1>This is home page</h1>
      <h2>This part is my dependents:</h2>
      <Container py="xl">
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
          {!(allDeps == null ||
            allDeps.length == 1 ||
            allUsers[user.uid]["dependents"] == null) &&
            Object.entries(allUsers[user.uid]["dependents"]).map(
              ([id, dependentID]) => (
                <DependentCard
                  key={id}
                  dependent={allDependents[dependentID]}
                />
              )
            )}
        </SimpleGrid>
      </Container>
      <h2>This part is in my care:</h2>
    </React.Fragment>
  );
};

export default HomePage;
