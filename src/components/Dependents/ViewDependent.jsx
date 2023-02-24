import React from "react";
import styles from "./ViewDependent.module.css";
import {useLocation,useNavigate} from "react-router-dom";
import {Anchor, Container, Paper, SimpleGrid, Text,Button, Table} from "@mantine/core";

const ViewDependent = () => {
    // obtain the data passed by navigate()
    const location = useLocation();
    const dependent = location.state;
    const dependentDocuments = dependent.documents;
    console.log(dependent)
    const navigate = useNavigate();

    return (
        <Container pb={40}>
            <Button onClick={()=>{navigate("/dependents")}} className={styles.backButton}>Back</Button>
            <div className={styles.viewTitle}>

                <Text fz="xl" fw="700" mb="2rem" className={styles.titleText}>
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
                        <Text> {dependent.basic.birthday!=="N/A"?new Date(dependent.basic.birthday).toLocaleDateString():"N/A"}</Text>
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
                        <Text> {dependent.education.startTime!=="N/A"?new Date(dependent.education.startTime).toLocaleTimeString():"N/A"}</Text>
                    </div>

                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            End Time
                        </Text>
                        <Text> {dependent.education.endTime!=="N/A"?new Date(dependent.education.endTime).toLocaleTimeString():"N/A"}</Text>
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
                        <Text> {dependent.education.busTime!=="N/A"?new Date(dependent.education.busTime).toLocaleTimeString():"N/A"}</Text>
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
                            Allergies
                        </Text>
                        <Text> {dependent.generalCare.allergies}</Text>
                    </div>

                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Current Medications
                        </Text>
                        <Text> {dependent.generalCare.currentMedications}</Text>
                    </div>
                    <div>
                        <Text fz="lg" fw="500" mt="2rem">
                            Bed Time
                        </Text>
                        <Text> {dependent.generalCare.bedTime!=="N/A"?new Date(dependent.generalCare.bedTime).toLocaleTimeString():"N/A"}</Text>
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

            <Paper withBorder radius="md" p="lg" mb="lg">
                <Text fz="xl" fw="700">
                    Reminders for Caretakers
                </Text>
                {dependent.reminders==="N/A"?(
                    <Text>N/A</Text>
                ):(
                    <SimpleGrid cols={1} breakpoints={[{maxWidth: "md", cols: 1}]}>
                        {dependent.reminders.length > 0 ? (
                            <Table>
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Time</th>
                                    <th>Schedule</th>
                                </tr>
                                </thead>

                                <tbody>
                                {dependent.reminders.map((item, index) => {
                                    return (

                                        <tr key={index}>
                                            <td><Text>{index + 1}</Text></td>
                                            <td><Text>{item.taskName}</Text></td>
                                            <td><Text>{new Date(item.time).toLocaleTimeString()}</Text></td>
                                            <td><Text>{
                                                item.schedule.scheduleType === "recurring" ? (
                                                    `Weekly on ${item.schedule.weekdays.join(", ")}`
                                                ) : (new Date(item.schedule.eventDate).toLocaleDateString())
                                            }</Text></td>
                                        </tr>

                                    );
                                })}
                                </tbody>
                            </Table>
                        ):(
                            <Text>N/A</Text>
                        )}
                    </SimpleGrid>
                )}


            </Paper>

        </Container>
    );
};

export default ViewDependent;
