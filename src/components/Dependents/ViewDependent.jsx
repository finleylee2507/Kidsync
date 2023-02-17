import React from "react";
import styles from "./ViewDependent.module.css";
import {useLocation} from "react-router-dom";
import {Anchor, Container, Paper, SimpleGrid, Text} from "@mantine/core";

const ViewDependent = () => {
    // obtain the data passed by navigate()
    const location = useLocation();
    const dependent = location.state;
    const dependentDocuments = dependent.documents;

    return (
        <Container pb={40}>
            <div className={styles.viewTitle}>
                <Text fz="xl" fw="700" mb="2rem">
                    Dependent Information
                </Text>
            </div>

            {/*basic information*/}
            <Paper withBorder radius="md" p="lg" mb="lg">
                <Text fz="xl" fw="700">
                    Basic Information
                </Text>
                <SimpleGrid cols={2} breakpoints={[{maxWidth: "md", cols: 1}]}>
                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Name
                        </Text>
                        <Text>
                            {" "}
                            {`${dependent.basic.firstName} ${dependent.basic.lastName}`}
                        </Text>
                    </div>

                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Birthday
                        </Text>
                        <Text> {dependent.basic.birthday}</Text>
                    </div>

                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Relationship
                        </Text>
                        <Text> {dependent.basic.relationship}</Text>
                    </div>
                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Preferred Pronouns
                        </Text>
                        <Text> {dependent.basic.preferredPronouns}</Text>
                    </div>
                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Sex
                        </Text>
                        <Text> {dependent.basic.sex}</Text>
                    </div>
                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Address
                        </Text>
                        <Text> {dependent.basic.address}</Text>
                    </div>
                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Phone Number
                        </Text>
                        <Text> {dependent.basic.phoneNumber}</Text>
                    </div>
                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Parent's Name
                        </Text>
                        <Text> {dependent.basic.parentsName}</Text>
                    </div>
                </SimpleGrid>
            </Paper>

            {/*emergency information*/}
            <Paper withBorder radius="md" p="lg" mb="lg">
                <Text fz="xl" fw="700">
                    Emergency Information
                </Text>
                <SimpleGrid cols={2} breakpoints={[{maxWidth: "md", cols: 1}]}>
                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Emergency Contact Name
                        </Text>
                        <Text> {dependent.emergency.emergencyContactName}</Text>
                    </div>

                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Emergency Contact Phone
                        </Text>
                        <Text> {dependent.emergency.emergencyContactPhone}</Text>
                    </div>

                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Emergency Contact Relationship
                        </Text>
                        <Text> {dependent.emergency.emergencyContactRelationship}</Text>
                    </div>

                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Allergies
                        </Text>
                        <Text> {dependent.emergency.allergies}</Text>
                    </div>

                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Current Medications
                        </Text>
                        <Text> {dependent.emergency.currentMedications}</Text>
                    </div>
                </SimpleGrid>
            </Paper>

            {/* education information*/}
            <Paper withBorder radius="md" p="lg" mb="lg">
                <Text fz="xl" fw="700">
                    Education Information
                </Text>
                <SimpleGrid cols={2} breakpoints={[{maxWidth: "md", cols: 1}]}>
                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            School Name
                        </Text>
                        <Text> {dependent.education.schoolName}</Text>
                    </div>

                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Teacher Name
                        </Text>
                        <Text> {dependent.education.teacherName}</Text>
                    </div>

                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Grade
                        </Text>
                        <Text> {dependent.education.grade}</Text>
                    </div>

                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Start Time
                        </Text>
                        <Text> {dependent.education.startTime}</Text>
                    </div>

                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            End Time
                        </Text>
                        <Text> {dependent.education.endTime}</Text>
                    </div>

                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Bus Number
                        </Text>
                        <Text> {dependent.education.busNumber}</Text>
                    </div>

                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Bus Time
                        </Text>
                        <Text> {dependent.education.busTime}</Text>
                    </div>
                </SimpleGrid>
            </Paper>

            {/*general care information*/}
            <Paper withBorder radius="md" p="lg" mb="lg">
                <Text fz="xl" fw="700">
                    General Care Information
                </Text>
                <SimpleGrid cols={2} breakpoints={[{maxWidth: "md", cols: 1}]}>
                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Routine Notes
                        </Text>
                        <Text> {dependent.generalCare.routineNotes}</Text>
                    </div>

                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Extracurriculars
                        </Text>
                        <Text> {dependent.generalCare.extracurriculars}</Text>
                    </div>

                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Bed Time
                        </Text>
                        <Text> {dependent.generalCare.bedTime}</Text>
                    </div>

                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Medication Schedule
                        </Text>
                        <Text> {dependent.generalCare.medicationSchedule}</Text>
                    </div>
                </SimpleGrid>
            </Paper>

            <Paper withBorder radius="md" p="lg" mb="lg">
                <Text fz="xl" fw="700">
                    Documents Upload
                </Text>
                <SimpleGrid cols={2} breakpoints={[{maxWidth: "md", cols: 1}]}>
                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Immunization File
                        </Text>
                        {(dependentDocuments["immunizationFile"] !== "N/A" )?(
                            <Anchor href={dependentDocuments["immunizationFile"]["fileLink"]} target="_blank">
                                {dependentDocuments["immunizationFile"]["fileName"]}
                            </Anchor>
                        ):  <Text c="red"
                        > Not uploaded</Text>}

                    </div>

                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Insurance Card
                        </Text>
                        {(dependentDocuments["insuranceCard"] !== "N/A" )?(
                            <Anchor href={dependentDocuments["insuranceCard"]["fileLink"]} target="_blank">
                                {dependentDocuments["insuranceCard"]["fileName"]}
                            </Anchor>
                        ):  <Text c="red"
                        > Not uploaded</Text>}
                    </div>

                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            ESA Documents
                        </Text>
                        {(dependentDocuments["esaDocuments"] !== "N/A" )?(
                            <Anchor href={dependentDocuments["esaDocuments"]["fileLink"]} target="_blank">
                                {dependentDocuments["esaDocuments"]["fileName"]}
                            </Anchor>
                        ):  <Text c="red"
                        > Not uploaded</Text>}
                    </div>

                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            FSA Documents
                        </Text>
                        {(dependentDocuments["fsaDocuments"] !== "N/A" )?(
                            <Anchor href={dependentDocuments["fsaDocuments"]["fileLink"]} target="_blank">
                                {dependentDocuments["fsaDocuments"]["fileName"]}
                            </Anchor>
                        ):  <Text c="red"
                        > Not uploaded</Text>}
                    </div>
                </SimpleGrid>
            </Paper>
        </Container>
    );
};

export default ViewDependent;
