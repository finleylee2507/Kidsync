import data from "../../utilities/Dependents.json";
import DependentCard from "./DependentCard";
import styles from "./DependentsList.module.css";
import { SimpleGrid, Container } from "@mantine/core";
import useNavigate from "react-router-dom";

const useStyles = createStyles(() => ({
  button: {
    position: "relative",
    transition: "background-color 150ms ease",
  },
  label: {
    position: "relative",
    zIndex: 1,
  },
}));

const DependentsList = () => {
  const { classes, theme } = useStyles();
  const navigate = useNavigate();

  const handleAddDependentClick = () => {
    navigate("/create-dependents-profile");
  };

  return (
    <div>
      <Button
        fullWidth
        className={classes.button}
        // onClick={() => (loaded ? setLoaded(false) : !interval.active && interval.start())}
        color={theme.primaryColor}
      >
        <div className={classes.label}>Add Dependent</div>
      </Button>
      <Container py="xl">
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
          {Object.entries(data["dependents"]).map(([id, dependent]) => (
            <DependentCard key={id} dependent={dependent} />
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
};

export default DependentsList;
