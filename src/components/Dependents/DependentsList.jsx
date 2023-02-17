import data from "../../utilities/Dependents.json";
import DependentCard from "./DependentCard";
import styles from "./DependentsList.module.css";
import { SimpleGrid, Container } from "@mantine/core";

const DependentsList = () => {
  return (
    <Container py="xl">
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
        {Object.entries(data["dependents"]).map(([id, dependent]) => (
          <DependentCard key={id} dependent={dependent} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default DependentsList;
