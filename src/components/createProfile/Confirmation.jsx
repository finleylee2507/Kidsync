import React from 'react';
import {Container, Paper, Text} from "@mantine/core";

function Confirmation({prevStep, handleChange, formData, dependentsData}) {
    return (
        <div>
            <Text fz="xl" fw="700" mb="2rem" mt="6rem">Confirm your Details:</Text>
            <Text fz="lg">Confirm if the following details are correct: </Text>

            <Container >
                <Paper shadow="sm" radius="md" p="lg">
                    <Text>Test</Text>
                </Paper>
            </Container>

            <button onClick={prevStep}>last</button>
        </div>
    );
}

export default Confirmation;