import React from 'react';
import {Modal} from "@mantine/core";

const NewAccessModal=({isOpen,handleModalState})=> {
    return (
        <div>

            <Modal
                opened={isOpen}
                onClose={() => handleModalState(false)}
                title="Introduce yourself!"
            >
                {/* Modal content */}
            </Modal>
        </div>
    );
}

export default NewAccessModal;