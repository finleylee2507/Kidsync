import React from "react";
import styles from "./ViewDependent.module.css";
import {useLocation, useNavigate} from "react-router-dom";
import {Accordion, Anchor, Button, Container, SimpleGrid, Table, Text,} from "@mantine/core";
import {DependentImage} from "./DependentImage";
import {convertTo12HourFormat} from "../../utilities/helperMethods";

const ViewDependent = () => {
    // obtain the data passed by navigate()
    const location = useLocation();
    const dependent = location.state;
    const dependentDocuments = dependent.documents;
    const navigate = useNavigate();

    return (
        <Container
            fluid
            sx={{
                backgroundColor: "#E7E5F4",
                height: "100%",
                minHeight: "calc(100vh - 0px)",
            }}
        >
            <Container pb={40}>
                <Button
                    onClick={() => {
                        navigate("/home");
                    }}
                    classNames={{root: styles.backButton}}
                    mt={10}
                >
                    Back
                </Button>

                <div className={styles.viewTitle}>
                    <DependentImage
                        avatar={dependent.basic.profilePic.fileLink}
                        name={`${dependent.basic.firstName} ${dependent.basic.lastName}`}
                        title="Dependent"
                    />
                </div>

                <Accordion variant="separated" radius="md">
                    <Accordion.Item value="emergency">
                        <Accordion.Control>Emergency Information</Accordion.Control>
                        <Accordion.Panel>
                            <SimpleGrid cols={2} breakpoints={[{maxWidth: "md", cols: 1}]}>
                                <div>
                                    <Text fz="lg" fw="500" mt="2rem" color="red">
                                        Emergency Contact Name
                                    </Text>
                                    <Text> {dependent.emergency.emergencyContactName}</Text>
                                </div>

                                <div>
                                    <Text fz="lg" fw="500" mt="2rem" color="red">
                                        Emergency Contact Phone
                                    </Text>
                                    <Text> {dependent.emergency.emergencyContactPhone}</Text>
                                </div>

                                <div>
                                    <Text fz="lg" fw="500" mt="2rem" color="red">
                                        Emergency Contact Relationship
                                    </Text>
                                    <Text>
                                        {" "}
                                        {dependent.emergency.emergencyContactRelationship}
                                    </Text>
                                </div>
                            </SimpleGrid>
                        </Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item value="basic">
                        <Accordion.Control>Basic Information</Accordion.Control>
                        <Accordion.Panel>
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
                                    <Text>
                                        {" "}
                                        {dependent.basic.birthday !== "N/A"
                                            ? new Date(dependent.basic.birthday).toLocaleDateString()
                                            : "N/A"}
                                    </Text>
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
                        </Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item value="education">
                        <Accordion.Control>Education Information</Accordion.Control>
                        <Accordion.Panel>
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
                                    <Text>
                                        {" "}
                                        {convertTo12HourFormat(dependent.education.startTime)}
                                    </Text>
                                </div>

                                <div>
                                    <Text fz="lg" fw="500" mt="2rem">
                                        End Time
                                    </Text>
                                    <Text>
                                        {" "}
                                        {convertTo12HourFormat(dependent.education.endTime)}
                                    </Text>
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
                                    <Text>
                                        {" "}
                                        {convertTo12HourFormat(dependent.education.busTime)}
                                    </Text>
                                </div>
                            </SimpleGrid>
                        </Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item value="general">
                        <Accordion.Control>General Care Information</Accordion.Control>
                        <Accordion.Panel>
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
                                    <Text>
                                        {convertTo12HourFormat(dependent.generalCare.bedTime)}
                                    </Text>
                                </div>

                                <div>
                                    <Text fz="lg" fw="500" mt="2rem">
                                        Medication Schedule
                                    </Text>
                                    <Text> {dependent.generalCare.medicationSchedule}</Text>
                                </div>
                            </SimpleGrid>
                        </Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item value="documents">
                        <Accordion.Control>Documents Upload</Accordion.Control>
                        <Accordion.Panel>
                            <SimpleGrid cols={2} breakpoints={[{maxWidth: "md", cols: 1}]}>
                                <div>
                                    <Text fz="lg" fw="500" mt="2rem">
                                        Immunization File
                                    </Text>
                                    {dependentDocuments["immunizationFile"] !== "N/A" ? (
                                        <Anchor
                                            href={dependentDocuments["immunizationFile"]["fileLink"]}
                                            target="_blank"
                                        >
                                            {dependentDocuments["immunizationFile"]["fileName"]}
                                        </Anchor>
                                    ) : (
                                        <Text c="red"> Not uploaded</Text>
                                    )}
                                </div>

                                <div>
                                    <Text fz="lg" fw="500" mt="2rem">
                                        Insurance Card
                                    </Text>
                                    {dependentDocuments["insuranceCard"] !== "N/A" ? (
                                        <Anchor
                                            href={dependentDocuments["insuranceCard"]["fileLink"]}
                                            target="_blank"
                                        >
                                            {dependentDocuments["insuranceCard"]["fileName"]}
                                        </Anchor>
                                    ) : (
                                        <Text c="red"> Not uploaded</Text>
                                    )}
                                </div>

                                <div>
                                    <Text fz="lg" fw="500" mt="2rem">
                                        ESA Documents
                                    </Text>
                                    {dependentDocuments["esaDocuments"] !== "N/A" ? (
                                        <Anchor
                                            href={dependentDocuments["esaDocuments"]["fileLink"]}
                                            target="_blank"
                                        >
                                            {dependentDocuments["esaDocuments"]["fileName"]}
                                        </Anchor>
                                    ) : (
                                        <Text c="red"> Not uploaded</Text>
                                    )}
                                </div>

                                <div>
                                    <Text fz="lg" fw="500" mt="2rem">
                                        FSA Documents
                                    </Text>
                                    {dependentDocuments["fsaDocuments"] !== "N/A" ? (
                                        <Anchor
                                            href={dependentDocuments["fsaDocuments"]["fileLink"]}
                                            target="_blank"
                                        >
                                            {dependentDocuments["fsaDocuments"]["fileName"]}
                                        </Anchor>
                                    ) : (
                                        <Text c="red"> Not uploaded</Text>
                                    )}
                                </div>
                            </SimpleGrid>
                        </Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item value="reminders">
                        <Accordion.Control>Reminders for Caretakers</Accordion.Control>
                        <Accordion.Panel>
                            {dependent.reminders === "N/A" ? (
                                <Text>N/A</Text>
                            ) : (
                                <SimpleGrid
                                    cols={1}
                                    breakpoints={[{maxWidth: "md", cols: 1}]}
                                >
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
                                                        <td>
                                                            <Text>{index + 1}</Text>
                                                        </td>
                                                        <td>
                                                            <Text>{item.taskName}</Text>
                                                        </td>
                                                        <td>
                                                            <Text>{convertTo12HourFormat(item.time)}</Text>
                                                        </td>
                                                        <td>
                                                            <Text>
                                                                {item.schedule.scheduleType === "recurring"
                                                                    ? `Weekly on ${item.schedule.weekdays.join(
                                                                        ", "
                                                                    )}`
                                                                    : new Date(
                                                                        item.schedule.eventDate
                                                                    ).toLocaleDateString()}
                                                            </Text>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            </tbody>
                                        </Table>
                                    ) : (
                                        <Text>N/A</Text>
                                    )}
                                </SimpleGrid>
                            )}
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </Container>
        </Container>
    );
};

export default ViewDependent;
