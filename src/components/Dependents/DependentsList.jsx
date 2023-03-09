import React, { useEffect, useState } from "react";
import DependentCard from "./DependentCard";
import styles from "./DependentsList.module.css";
import { Button, Container, Divider, Grid, Modal, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { deleteDependent, updateUser } from "../../utilities/firebase";
import ExistingAccessModal from "../ExistingAccess/ExistingAccessModal";
import NewAccessModal from "../GrantNewAccess/NewAccessModal";
import { toast } from "react-toastify";
import { useMediaQuery } from "@mantine/hooks";

const DependentsList = ({
  user,
  allUsers,
  allDependents,
  emailToIDMapping,
}) => {
  const [allDeps, setAllDeps] = useState(allDependents);
  const [allUSers, setAllUSers] = useState(allUsers);
  const [isOpenExistingModal, setIsOpenExistingModal] = useState(false);
  const [isOpenNewModal, setIsOpenNewModal] = useState(false);
  const [currentDependentName, setCurrentDependentName] = useState("");
  const [currentDependentID, setCurrentDependentID] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:850px)");
  console.log("All deps: ", allDependents);
  useEffect(() => {
    if (allDependents) {
      setAllDeps(allDependents);
    }

    if (allUsers) {
      setAllUSers(allUsers);
    }
  });

  const navigate = useNavigate();

  const handleAddDependentClick = () => {
    navigate("/create-dependents-profile");
  };

  // Pass the information of dependent
  const handleExistingModal = (state) => {
    setIsOpenExistingModal(state);
  };

  const handleModalCancel = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleModalConfirm = async () => {
    console.log("Deleting dependent...");

    //step 1: delete dependent from users' dependent array
    let newDependents = allUsers[user.uid].dependents.filter(
      (dependent) => dependent !== currentDependentID
    );
    let newUserObject = { ...allUsers[user.uid], dependents: newDependents };

    let deleteDependentFromUserResult = true;

    try {
      deleteDependentFromUserResult = await updateUser(newUserObject, user.uid);
    } catch (e) {
      deleteDependentFromUserResult = false;
      console.log("Delete dependent from users error: ", e);
    }

    //Step 2: if the dependent has caretakers, delete the dependent from the caretakers' clients array
    let deleteDependentFromCareTakersResult = true;

    if (allDependents[currentDependentID].caretakers) {
      for (let caretaker of allDependents[currentDependentID].caretakers) {
        let newClients = allUsers[caretaker.id].clients.filter(
          (client) => client.id !== currentDependentID
        );

        let newUserObject = { ...allUsers[caretaker.id], clients: newClients };
        try {
          deleteDependentFromCareTakersResult = await updateUser(
            newUserObject,
            caretaker.id
          );
        } catch (e) {
          deleteDependentFromCareTakersResult = false;
          console.log("Delete dependent from caretakers error: ", e);
        }
      }
    }

    //Step 3: delete the dependent from the dependents array
    let deleteDependentFromDependentsResult = true;
    try {
      deleteDependentFromDependentsResult = await deleteDependent(
        currentDependentID
      );
    } catch (e) {
      deleteDependentFromDependentsResult = false;
      console.log("Delete dependent from dependent results error: ", e);
    }

    if (
      deleteDependentFromUserResult &&
      deleteDependentFromCareTakersResult &&
      deleteDependentFromDependentsResult
    ) {
      toast.success("Successfully deleted dependent!");
      setIsConfirmationModalOpen(false);
    } else {
      toast.error(
        "Hmm...Something went wrong. Please try again or contact the dev team."
      );
    }
  };
  if (
    allDeps == null ||
    allDeps.length == 1 ||
    allUsers[user.uid]["dependents"] == null
  ) {
    return (
      <div>
        <ExistingAccessModal
          allUsers={allUsers}
          isOpen={isOpenExistingModal}
          handleModalState={setIsOpenExistingModal}
          dependent={null}
        />
        <NewAccessModal
          isOpen={isOpenNewModal}
          handleModalState={setIsOpenNewModal}
        />
        <Container>
          <Button
            fullWidth
            className={styles.button}
            onClick={handleAddDependentClick}
          >
            <div className={styles.label}>Add Dependent</div>
          </Button>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <Modal
          title={`You are about to delete ${currentDependentName}`}
          opened={isConfirmationModalOpen}
          onClose={() => setIsConfirmationModalOpen(false)}
          classNames={{
            title: styles.modalTitle,
          }}
          size="lg"
        >
          <Text>
            Do you really want to delete this dependent? Doing so will delete
            the dependent for his/her caretakers as well.
          </Text>

          <Divider my="sm" />
          <div className={styles.modalButtonContainer}>
            <Button
              variant="outline"
              onClick={handleModalCancel}
              classNames={{ root: styles.cancelButton }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleModalConfirm}
              classNames={{
                root: styles.confirmButton,
              }}
            >
              Confirm
            </Button>
          </div>
        </Modal>
        <ExistingAccessModal
          allUsers={allUsers}
          isOpen={isOpenExistingModal}
          handleModalState={setIsOpenExistingModal}
          dependent={
            currentDependentID ? allDependents[currentDependentID] : null
          }
        />

        <NewAccessModal
          user={user}
          allUsers={allUsers}
          allDependents={allDependents}
          emailToIDMapping={emailToIDMapping}
          isOpen={isOpenNewModal}
          handleModalState={setIsOpenNewModal}
          dependentName={currentDependentName}
          dependentID={currentDependentID}
        />
        <Button
          fullWidth
          className={styles.button}
          onClick={handleAddDependentClick}
        >
          <div className={styles.label}>Add Dependent</div>
        </Button>
        <Container py="xl">
          <Grid>
            {Object.entries(allUsers[user.uid]["dependents"]).map(
              ([id, dependentID]) => (
                <Grid.Col span={isMobile ? 12 : 6}>
                  <DependentCard
                    key={id}
                    dependent={allDependents[dependentID]}
                    showAll={true}
                    handleExistingModalState={handleExistingModal}
                    handleNewModalState={setIsOpenNewModal}
                    setCurrentDependentName={setCurrentDependentName}
                    setCurrentDependentID={setCurrentDependentID}
                    setIsConfirmationModalOpen={setIsConfirmationModalOpen}
                  />
                </Grid.Col>
              )
            )}
          </Grid>
        </Container>
      </div>
    );
  }
};

export default DependentsList;
