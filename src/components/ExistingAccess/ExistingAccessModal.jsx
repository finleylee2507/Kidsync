import React from "react";
import ExistingAccessRow from "./ExistingAccessRow";
import { Group, Modal, Button, Text, Table, SimpleGrid } from "@mantine/core";

const ExistingAccessModal = ({
  allUsers,
  allDependents,
  isOpen,
  handleModalState,
  dependentID,
  dependentName,
}) => {
  const getAccessIndex = (careArray, dependentID) => {
    console.log(careArray);
    console.log(careArray.length);

    for (let i = 0; i < careArray.length; i++) {
      if (careArray[i].id === dependentID) {
        return i;
      }
    }
  };

  return (
    <div>
      <Modal
        opened={isOpen}
        onClose={() => handleModalState(false)}
        title={`Update ${dependentName}'s Access`}
      >
        {allDependents[dependentID]["caretakers"].map((clientID, index) => {
          let accessIndex = getAccessIndex(
            allUsers[clientID].clients,
            dependentID
          );

          return (
            <tr key={index}>
              <td>
                <ExistingAccessRow
                  client={allUsers[clientID]}
                  accessIndex={accessIndex}
                />
              </td>
            </tr>
          );
        })}
      </Modal>
    </div>
  );
};

export default ExistingAccessModal;

// PASS IN allUsers[clientID].clients
