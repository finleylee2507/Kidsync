import React from 'react';
import {Group, Modal,Button,Text} from "@mantine/core";

const ExistingAccessModal=({isOpen,handleModalState, dependentName}) =>{

    return (
        <div>
            <Modal
                opened={isOpen}
                onClose={() => handleModalState(false)}
                title={`Share ${dependentName}'s Profile With`}
            >

            </Modal>

        </div>
    );
}

export default ExistingAccessModal;