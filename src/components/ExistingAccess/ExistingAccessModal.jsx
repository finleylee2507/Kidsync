import React, { useEffect, useState } from "react";
import {
  Group,
  Modal,
  Button,
  Text,
  Checkbox,
  SimpleGrid,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import ExistingAccessRow from "./ExistingAccessRow";

const ExistingAccessModal = ({
  allUsers,
  isOpen,
  handleModalState,
  dependent,
}) => {
  return (
    <div>
      <Modal
        opened={isOpen}
        onClose={() => handleModalState(false)}
        size="70%"
        closeOnClickOutside={false}
        overflow="inside"
      >
        {/* Check if dependent exists */}
        {dependent && dependent.caretakers ? (
          <div>
            <Text fz="xl" ta="center" c="blue" mb={30} fw={700}>
              {`Currently Sharing ${dependent.basic.firstName} ${dependent.basic.lastName}'s Profile With:`}
            </Text>
            <SimpleGrid cols={4} mb={20}>
              <Text fw={700}>Name:</Text>
              <Text fw={700}>Relationship:</Text>
              <Text fw={700}>Access Granted:</Text>
              <Text fw={700}>Options:</Text>
            </SimpleGrid>
            {
              // dependent.caretakers
              dependent.caretakers.map((caretaker) => {
                console.log(caretaker);
                return (
                  <ExistingAccessRow
                    key={caretaker.id}
                    allUsers={allUsers}
                    caretaker={caretaker}
                    dependent={dependent}
                    handleModalState={handleModalState}
                  />
                );
              })
            }
          </div>
        ) : (
          <Text fz="xl" ta="center" c="blue" mb={30} fw={700}>
            No Caretakers
          </Text>
        )}
      </Modal>
    </div>
  );
};

export default ExistingAccessModal;
