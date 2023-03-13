import React from "react";
import styles from "./ViewInformation.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Accordion,
  Anchor,
  Button,
  Container,
  Paper,
  SimpleGrid,
  Table,
  Text,
} from "@mantine/core";

const ViewInformation = () => {
  // obtain the data passed by navigate()
  const location = useLocation();
  const client = location.state.client;
  const permissions = location.state.permissions;
  const showEmergency = location.state.showEmergency;
  // const clientDocuments = client.documents;
  const navigate = useNavigate();

  return (
    <Container fluid style={{ backgroundColor: "#E7E5F4", height: "100vh" }}>
      <Container pb={40}>
        <Button
          onClick={() => {
            navigate("/clients");
          }}
          classNames={{
            root: styles.backButton,
          }}
          mt={10}
        >
          Back
        </Button>
        <div className={styles.viewTitle}>
          <Text fz="xl" fw="700" mb="2rem">
            Client Information
          </Text>
        </div>

        <Accordion variant="separated" defaultValue={["emergency"]} radius="md">
          {permissions.includes("emergency") && showEmergency && (
            <Accordion.Item value="emergency">
              <Accordion.Control>Emergency Information</Accordion.Control>
              <Accordion.Panel>
                <SimpleGrid
                  cols={2}
                  breakpoints={[{ maxWidth: "md", cols: 1 }]}
                >
                  <div>
                    <Text fz="lg" fw="500" mt="2rem" color="red">
                      Emergency Contact Name
                    </Text>
                    <Text> {client.emergency.emergencyContactName}</Text>
                  </div>

                  <div>
                    <Text fz="lg" fw="500" mt="2rem" color="red">
                      Emergency Contact Phone
                    </Text>
                    <Text> {client.emergency.emergencyContactPhone}</Text>
                  </div>

                  <div>
                    <Text fz="lg" fw="500" mt="2rem" color="red">
                      Emergency Contact Relationship
                    </Text>
                    <Text>
                      {" "}
                      {client.emergency.emergencyContactRelationship}
                    </Text>
                  </div>
                </SimpleGrid>
              </Accordion.Panel>
            </Accordion.Item>
          )}

          <Accordion.Item value="basic">
            <Accordion.Control>Basic Information</Accordion.Control>
            <Accordion.Panel>
              {/*basic information*/}
              {permissions.includes("basic") ? (
                <SimpleGrid
                  cols={2}
                  breakpoints={[{ maxWidth: "md", cols: 1 }]}
                >
                  <div>
                    <Text fz="lg" fw="500" mt="2rem">
                      Name
                    </Text>
                    <Text>
                      {" "}
                      {`${client.basic.firstName} ${client.basic.lastName}`}
                    </Text>
                  </div>

                  <div>
                    <Text fz="lg" fw="500" mt="2rem">
                      Birthday
                    </Text>
                    <Text>
                      {" "}
                      {client.basic.birthday !== "N/A"
                        ? new Date(client.basic.birthday).toLocaleDateString()
                        : "N/A"}
                    </Text>
                  </div>

                  <div>
                    <Text fz="lg" fw="500" mt="2rem">
                      Relationship
                    </Text>
                    <Text> {client.basic.relationship}</Text>
                  </div>
                  <div>
                    <Text fz="lg" fw="500" mt="2rem">
                      Preferred Pronouns
                    </Text>
                    <Text> {client.basic.preferredPronouns}</Text>
                  </div>
                  <div>
                    <Text fz="lg" fw="500" mt="2rem">
                      Sex
                    </Text>
                    <Text> {client.basic.sex}</Text>
                  </div>
                  <div>
                    <Text fz="lg" fw="500" mt="2rem">
                      Address
                    </Text>
                    <Text> {client.basic.address}</Text>
                  </div>
                  <div>
                    <Text fz="lg" fw="500" mt="2rem">
                      Phone Number
                    </Text>
                    <Text> {client.basic.phoneNumber}</Text>
                  </div>
                </SimpleGrid>
              ) : (
                <Text fz="xl" fw="700">
                  You do not have access to this information.
                </Text>
              )}
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="education">
            <Accordion.Control>Education Information</Accordion.Control>
            <Accordion.Panel>
              {permissions.includes("education") ? (
                <SimpleGrid
                  cols={2}
                  breakpoints={[{ maxWidth: "md", cols: 1 }]}
                >
                  <div>
                    <Text fz="lg" fw="500" mt="2rem">
                      School Name
                    </Text>
                    <Text> {client.education.schoolName}</Text>
                  </div>

                  <div>
                    <Text fz="lg" fw="500" mt="2rem">
                      Teacher Name
                    </Text>
                    <Text> {client.education.teacherName}</Text>
                  </div>

                  <div>
                    <Text fz="lg" fw="500" mt="2rem">
                      Grade
                    </Text>
                    <Text> {client.education.grade}</Text>
                  </div>

                  <div>
                    <Text fz="lg" fw="500" mt="2rem">
                      Start Time
                    </Text>
                    <Text>
                      {" "}
                      {client.education.startTime !== "N/A"
                        ? new Date(
                            client.education.startTime
                          ).toLocaleTimeString()
                        : "N/A"}
                    </Text>
                  </div>

                  <div>
                    <Text fz="lg" fw="500" mt="2rem">
                      End Time
                    </Text>
                    <Text>
                      {" "}
                      {client.education.endTime !== "N/A"
                        ? new Date(
                            client.education.endTime
                          ).toLocaleTimeString()
                        : "N/A"}
                    </Text>
                  </div>

                  <div>
                    <Text fz="lg" fw="500" mt="2rem">
                      Bus Number
                    </Text>
                    <Text> {client.education.busNumber}</Text>
                  </div>

                  <div>
                    <Text fz="lg" fw="500" mt="2rem">
                      Bus Time
                    </Text>
                    <Text>
                      {" "}
                      {client.education.busTime !== "N/A"
                        ? new Date(
                            client.education.busTime
                          ).toLocaleTimeString()
                        : "N/A"}
                    </Text>
                  </div>
                </SimpleGrid>
              ) : (
                <Text fz="xl" fw="700">
                  You do not have access to this information.
                </Text>
              )}
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="general">
            <Accordion.Control>General Care Information</Accordion.Control>
            <Accordion.Panel>
              {permissions.includes("generalCare") ? (
                <SimpleGrid
                  cols={2}
                  breakpoints={[{ maxWidth: "md", cols: 1 }]}
                >
                  <div>
                    <Text fz="lg" fw="500" mt="2rem">
                      Routine Notes
                    </Text>
                    <Text> {client.generalCare.routineNotes}</Text>
                  </div>

                  <div>
                    <Text fz="lg" fw="500" mt="2rem">
                      Extracurriculars
                    </Text>
                    <Text> {client.generalCare.extracurriculars}</Text>
                  </div>

                  <div>
                    <Text fz="lg" fw="500" mt="2rem">
                      Allergies
                    </Text>
                    <Text> {client.generalCare.allergies}</Text>
                  </div>

                  <div>
                    <Text fz="lg" fw="500" mt="2rem">
                      Current Medications
                    </Text>
                    <Text> {client.generalCare.currentMedications}</Text>
                  </div>
                  <div>
                    <Text fz="lg" fw="500" mt="2rem">
                      Bed Time
                    </Text>
                    <Text>
                      {" "}
                      {client.generalCare.bedTime !== "N/A"
                        ? new Date(
                            client.generalCare.bedTime
                          ).toLocaleTimeString()
                        : "N/A"}
                    </Text>
                  </div>

                  <div>
                    <Text fz="lg" fw="500" mt="2rem">
                      Medication Schedule
                    </Text>
                    <Text> {client.generalCare.medicationSchedule}</Text>
                  </div>
                </SimpleGrid>
              ) : (
                <Text fz="xl" fw="700">
                  You do not have access to this information.
                </Text>
              )}
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="documents">
            <Accordion.Control>Documents</Accordion.Control>
            <Accordion.Panel>
              {permissions.includes("documents") ? (
                <SimpleGrid
                  cols={2}
                  breakpoints={[{ maxWidth: "md", cols: 1 }]}
                >
                  <div>
                    <Text fz="lg" fw="500" mt="2rem">
                      Immunization File
                    </Text>
                    {client.documents["immunizationFile"] !== "N/A" ? (
                      <Anchor
                        href={client.documents["immunizationFile"]["fileLink"]}
                        target="_blank"
                      >
                        {client.documents["immunizationFile"]["fileName"]}
                      </Anchor>
                    ) : (
                      <Text c="red"> Not uploaded</Text>
                    )}
                  </div>

                  <div>
                    <Text fz="lg" fw="500" mt="2rem">
                      Insurance Card
                    </Text>
                    {client.documents["insuranceCard"] !== "N/A" ? (
                      <Anchor
                        href={client.documents["insuranceCard"]["fileLink"]}
                        target="_blank"
                      >
                        {client.documents["insuranceCard"]["fileName"]}
                      </Anchor>
                    ) : (
                      <Text c="red"> Not uploaded</Text>
                    )}
                  </div>

                  <div>
                    <Text fz="lg" fw="500" mt="2rem">
                      ESA Documents
                    </Text>
                    {client.documents["esaDocuments"] !== "N/A" ? (
                      <Anchor
                        href={client.documents["esaDocuments"]["fileLink"]}
                        target="_blank"
                      >
                        {client.documents["esaDocuments"]["fileName"]}
                      </Anchor>
                    ) : (
                      <Text c="red"> Not uploaded</Text>
                    )}
                  </div>

                  <div>
                    <Text fz="lg" fw="500" mt="2rem">
                      FSA Documents
                    </Text>
                    {client.documents["fsaDocuments"] !== "N/A" ? (
                      <Anchor
                        href={client.documents["fsaDocuments"]["fileLink"]}
                        target="_blank"
                      >
                        {client.documents["fsaDocuments"]["fileName"]}
                      </Anchor>
                    ) : (
                      <Text c="red"> Not uploaded</Text>
                    )}
                  </div>
                </SimpleGrid>
              ) : (
                <Text fz="xl" fw="700">
                  You do not have access to this information.
                </Text>
              )}
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="reminders">
            <Accordion.Control>Reminders for Caretakers</Accordion.Control>
            <Accordion.Panel>
              {permissions.includes("reminders") ? (
                <Paper withBorder radius="md" p="lg" mb="lg">
                  {client.reminders === "N/A" ? (
                    <Text>N/A</Text>
                  ) : (
                    <SimpleGrid
                      cols={1}
                      breakpoints={[{ maxWidth: "md", cols: 1 }]}
                    >
                      {client.reminders.length > 0 ? (
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
                            {client.reminders.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>
                                    <Text>{index + 1}</Text>
                                  </td>
                                  <td>
                                    <Text>{item.taskName}</Text>
                                  </td>
                                  <td>
                                    <Text>
                                      {new Date(item.time).toLocaleTimeString()}
                                    </Text>
                                  </td>
                                  <td>
                                    <Text>
                                      {item.schedule.scheduleType ===
                                      "recurring"
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
                </Paper>
              ) : (
                <Text fz="xl" fw="700">
                  You do not have access to this information.
                </Text>
              )}
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Container>
    </Container>
  );
};

export default ViewInformation;
