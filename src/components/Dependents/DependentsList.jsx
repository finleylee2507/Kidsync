import data from "../../utilities/Dependents.json";
import DependentCard from "./DependentCard";
import styles from "./DependentsList.module.css";

const DependentsList = () => {
  return (
    <div>
      {Object.entries(data["dependents"]).map(([id, dependent]) => (
        <DependentCard key={id} dependent={dependent} />
      ))}
    </div>
  );
};

export default DependentsList;
