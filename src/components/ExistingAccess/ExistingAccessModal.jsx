import React from 'react';
import {Group, Modal,Button,Text} from "@mantine/core";

const ExistingAccessModal=({isOpen,handleModalState}) =>{

    return (
        <div>
            <Modal
                opened={isOpen}
                onClose={() => handleModalState(false)}
                title="Introduce yourself!"
            >

            </Modal>

        </div>
    );
}

export default ExistingAccessModal;