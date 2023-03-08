import React from "react";
import { Grid, Modal, Text } from "@mantine/core";
import ExistingAccessRow from "./ExistingAccessRow";
import { useMediaQuery } from "@mantine/hooks";

const ExistingAccessModal = ({
  allUsers,
  isOpen,
  handleModalState,
  dependent,
}) => {
  const isMobile = useMediaQuery("(max-width:850px)");
  return (
    <div>
      <Modal
        opened={isOpen}
        onClose={() => handleModalState(false)}
        size="80%"
        closeOnClickOutside={false}
        overflow="inside"
        fullScreen={isMobile}
      >
        {/* Check if dependent exists */}
        {dependent && dependent.caretakers ? (
          <div style={{ width: "99%" }}>
            <Text fz="xl" ta="center" c="blue" mb={30} fw={700}>
              {`Currently Sharing ${dependent.basic.firstName} ${dependent.basic.lastName}'s Profile With:`}
            </Text>
            <Grid columns={30}>
              <Grid.Col span={4}>
                <Text fw={700}>Name:</Text>
              </Grid.Col>
              <Grid.Col span={4}>
                <Text fw={700}>Relationship:</Text>
              </Grid.Col>
              <Grid.Col span={10}>
                <Text fw={700}>Access Granted:</Text>
              </Grid.Col>
              <Grid.Col span={12}>
                <Text fw={700}>Options:</Text>
              </Grid.Col>
            </Grid>

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
