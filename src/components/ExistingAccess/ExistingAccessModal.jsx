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
  const isMobileMedium = useMediaQuery("(max-width:1200px)");
  const isMobileExtraSmall = useMediaQuery("(max-width:500px)");
  return (
    <div>
      <Modal
        opened={isOpen}
        onClose={() => handleModalState(false)}
        size="80%"
        closeOnClickOutside={false}
        overflow="inside"
        fullScreen={isMobileMedium}
      >
        {/* Check if dependent exists */}
        {dependent && dependent.caretakers ? (
          <div style={{ width: "99%" }}>
            <Text
              size={isMobileExtraSmall ? "sm" : "xl"}
              ta="center"
              c="blue"
              mb={30}
              fw={700}
            >
              {`Currently Sharing ${dependent.basic.firstName} ${dependent.basic.lastName}'s Profile With:`}
            </Text>
            <Grid columns={30}>
              <Grid.Col span={isMobileExtraSmall ? 5 : 4}>
                <Text fw={700} size={isMobileExtraSmall ? "xs" : "md"}>
                  Name:
                </Text>
              </Grid.Col>
              <Grid.Col span={isMobileExtraSmall ? 6 : 4}>
                <Text fw={700} size={isMobileExtraSmall ? "xs" : "md"}>
                  Relationship:
                </Text>
              </Grid.Col>
              <Grid.Col span={10}>
                <Text fw={700} size={isMobileExtraSmall ? "xs" : "md"}>
                  Access Granted:
                </Text>
              </Grid.Col>
              <Grid.Col span={isMobileExtraSmall ? 9 : 12}>
                <Text fw={700} size={isMobileExtraSmall ? "xs" : "md"}>
                  Options:
                </Text>
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
