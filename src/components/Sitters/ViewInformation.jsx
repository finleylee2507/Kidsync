import React from "react";
import styles from "./ViewInformation.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Anchor,
  Container,
  Paper,
  SimpleGrid,
  Text,
  Button,
} from "@mantine/core";

const ViewInformation = () => {
  // obtain the data passed by navigate()
  const location = useLocation();
  const client = location.state;
  const clientDocuments = client.documents;
  const navigate = useNavigate();

  return (
    <Container pb={40}>
      <Button
        onClick={() => {
          navigate("/clients");
        }}
        className={styles.backButton}
      >
        Back
      </Button>
      <div className={styles.viewTitle}>
        <Text fz="xl" fw="700" mb="2rem" className={styles.titleText}>
          Client Information
        </Text>
      </div>

      {/*basic information*/}
      <Paper withBorder radius="md" p="lg" mb="lg">
        <Text fz="xl" fw="700">
          Basic Information
        </Text>
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
          <div>
            <Text fz="lg" fw="500" mt="2rem">
              Name
            </Text>
            <Text> {`${client.basic.firstName} ${client.basic.lastName}`}</Text>
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
      </Paper>

      {/*emergency information*/}
      <Paper withBorder radius="md" p="lg" mb="lg">
        <Text fz="xl" fw="700">
          Emergency Information
        </Text>
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
          <div>
            <Text fz="lg" fw="500" mt="2rem">
              Emergency Contact Name
            </Text>
            <Text> {client.emergency.emergencyContactName}</Text>
          </div>

          <div>
            <Text fz="lg" fw="500" mt="2rem">
              Emergency Contact Phone
            </Text>
            <Text> {client.emergency.emergencyContactPhone}</Text>
          </div>

          <div>
            <Text fz="lg" fw="500" mt="2rem">
              Emergency Contact Relationship
            </Text>
            <Text> {client.emergency.emergencyContactRelationship}</Text>
          </div>
        </SimpleGrid>
      </Paper>

      {/* education information*/}
      <Paper withBorder radius="md" p="lg" mb="lg">
        <Text fz="xl" fw="700">
          Education Information
        </Text>
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
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
                ? new Date(client.education.startTime).toLocaleTimeString()
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
                ? new Date(client.education.endTime).toLocaleTimeString()
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
                ? new Date(client.education.busTime).toLocaleTimeString()
                : "N/A"}
            </Text>
          </div>
        </SimpleGrid>
      </Paper>

      {/*general care information*/}
      <Paper withBorder radius="md" p="lg" mb="lg">
        <Text fz="xl" fw="700">
          General Care Information
        </Text>
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
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
                ? new Date(client.generalCare.bedTime).toLocaleTimeString()
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
      </Paper>

      {/* <Paper withBorder radius="md" p="lg" mb="lg">
        <Text fz="xl" fw="700">
          Documents Upload
        </Text>
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
          <div>
            <Text fz="lg" fw="500" mt="2rem">
              Immunization File
            </Text>
            {clientDocuments["immunizationFile"] !== "N/A" ? (
              <Anchor
                href={clientDocuments["immunizationFile"]["fileLink"]}
                target="_blank"
              >
                {clientDocuments["immunizationFile"]["fileName"]}
              </Anchor>
            ) : (
              <Text c="red"> Not uploaded</Text>
            )}
          </div>

          <div>
            <Text fz="lg" fw="500" mt="2rem">
              Insurance Card
            </Text>
            {clientDocuments["insuranceCard"] !== "N/A" ? (
              <Anchor
                href={clientDocuments["insuranceCard"]["fileLink"]}
                target="_blank"
              >
                {clientDocuments["insuranceCard"]["fileName"]}
              </Anchor>
            ) : (
              <Text c="red"> Not uploaded</Text>
            )}
          </div>

          <div>
            <Text fz="lg" fw="500" mt="2rem">
              ESA Documents
            </Text>
            {clientDocuments["esaDocuments"] !== "N/A" ? (
              <Anchor
                href={clientDocuments["esaDocuments"]["fileLink"]}
                target="_blank"
              >
                {clientDocuments["esaDocuments"]["fileName"]}
              </Anchor>
            ) : (
              <Text c="red"> Not uploaded</Text>
            )}
          </div>

          <div>
            <Text fz="lg" fw="500" mt="2rem">
              FSA Documents
            </Text>
            {clientDocuments["fsaDocuments"] !== "N/A" ? (
              <Anchor
                href={clientDocuments["fsaDocuments"]["fileLink"]}
                target="_blank"
              >
                {clientDocuments["fsaDocuments"]["fileName"]}
              </Anchor>
            ) : (
              <Text c="red"> Not uploaded</Text>
            )}
          </div>
        </SimpleGrid>
      </Paper> */}
    </Container>
  );
};

export default ViewInformation;
