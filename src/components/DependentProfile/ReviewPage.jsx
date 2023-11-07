import React from "react";
import {Accordion, Anchor, Button, Container, Group, SimpleGrid, Table, Text,} from "@mantine/core";
import {addNewDependent, getNewDependentKey, updateDependent, uploadFile,} from "../../utilities/firebase";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import styles from "./CreateEditDependentProfileForm.module.css";
import {convertTo12HourFormat} from "../../utilities/helperMethods";

const ReviewPage = ({
                        basicFormData,
                        emergencyFormData,
                        generalCareFormData,
                        educationFormData,
                        documentsFormData,
                        reminderFormData,
                        prevStep,
                        user,
                        allUsers,
                        oldDocumentsFormData,
                        oldBasicFormData,
                        dependentId,
                        isEditMode,
                    }) => {
    const navigate = useNavigate();
    const determineDisplayedTextProfilePic = () => {
        if (basicFormData.profilePic) {
            //the user uploaded a new profile pic
            return (
                <Anchor
                    href={URL.createObjectURL(basicFormData.profilePic)}
                    target="_blank"
                >
                    {basicFormData.profilePic.name}
                </Anchor>
            );
        } else {
            if (isEditMode && oldBasicFormData.profilePic !== "N/A") {
                //the user previously uploaded a picture
                return (
                    <Anchor href={oldBasicFormData.profilePic.fileLink} target="_blank">
                        {oldBasicFormData.profilePic.fileName}
                    </Anchor>
                );
            } else {
                return "Not Uploaded";
            }
        }
    };
    const determineDisplayedTextDocuments = (fieldName) => {
        if (documentsFormData[fieldName]) {
            //the user uploaded a new file
            return (
                <Anchor
                    href={URL.createObjectURL(documentsFormData[fieldName])}
                    target="_blank"
                >
                    {documentsFormData[fieldName].name}
                </Anchor>
            );
        } else {
            if (isEditMode && oldDocumentsFormData[fieldName] !== "N/A") {
                return (
                    <Anchor
                        href={oldDocumentsFormData[fieldName].fileLink}
                        target="_blank"
                    >
                        {oldDocumentsFormData[fieldName].fileName}
                    </Anchor>
                );
            } else {
                return "Not Uploaded";
            }
        }
    };

    const handleFormSubmit = async () => {
        let fileLinks = {};
        const id = toast.loading(
            `${
                isEditMode
                    ? "Updating dependent profile..."
                    : "Creating dependent profile..."
            }`
        );

        let profilePicURL = null;
        let profilePicName = null;
        //upload dependent profile picture
        const acceptedFileTypes = ["image/gif", "image/jpeg", "image/png"];
        if (
            basicFormData.profilePic &&
            acceptedFileTypes.includes(basicFormData.profilePic.type)
        ) {
            //if the user uploaded dependent picture
            profilePicName = basicFormData.profilePic.name;
            let [isUploadProfilePicSuccessful, profilePicLink] = await uploadFile(
                basicFormData.profilePic,
                "dependent-profile-pictures"
            );

            if (isUploadProfilePicSuccessful) {
                profilePicURL = profilePicLink;
            } else {
                toast.error(
                    "Error uploading profile picture. Proceeding without failing."
                );
            }
        }

        //upload dependent files
        for (const [key, file] of Object.entries(documentsFormData)) {
            // console.log("Document key: ",key," Document value: ",file.name);
            if (file) {
                //if the user uploaded a file
                const [isSuccessful, fileLink] = await uploadFile(
                    file,
                    "dependent-files"
                );
                if (isSuccessful) {
                    fileLinks[key] = {fileName: file.name, fileLink: fileLink};
                } else {
                    fileLinks[key] = "N/A";
                    toast.error(
                        `Error uploading ${file.name}. Proceeding without failing.`
                    );
                }
            } else {
                //user didn't upload file
                fileLinks[key] = "N/A";
            }
        }

        //reformat reminders
        let reminderList = reminderFormData.reminders.map((item, index) => {
            //reformat the date object so that it could be properly stored in firebase and retrieved later
            let newDate = item.schedule.eventDate
                ? item.schedule.eventDate.toUTCString()
                : "N/A";
            let newWeekdays =
                item.schedule.weekdays.length === 0 ? "N/A" : item.schedule.weekdays;
            let newTime = item.time;

            return {
                ...item,
                time: newTime,
                schedule: {
                    ...item.schedule,
                    eventDate: newDate,
                    weekdays: newWeekdays,
                },
            };
        });

        if (isEditMode) {
            //if we're editing
            let newProfilePic;
            if (profilePicURL) {
                //if the user successfully uploaded a new profile pic
                newProfilePic = {fileName: profilePicName, fileLink: profilePicURL};
            } else {
                //check if there's an existing profile pic
                if (oldBasicFormData.profilePic !== "N/A") {
                    newProfilePic = oldBasicFormData.profilePic;
                } else {
                    newProfilePic = "N/A";
                }
            }

            let newDocumentObject = {};
            for (const [key, file] of Object.entries(fileLinks)) {
                if (fileLinks[key] === "N/A") {
                    //check if we have uploaded a file previously
                    newDocumentObject[key] =
                        oldDocumentsFormData[key] !== "N/A"
                            ? oldDocumentsFormData[key]
                            : "N/A";
                } else {
                    newDocumentObject[key] = fileLinks[key];
                }
            }
            // Create new dependent object
            let newDependent = {
                id: dependentId,
                creator: user.uid,
                basic: {
                    firstName: basicFormData.firstName,
                    lastName: basicFormData.lastName,
                    birthday: basicFormData.birthday
                        ? basicFormData.birthday.toUTCString()
                        : "N/A",
                    relationship: basicFormData.relationship.trim()
                        ? basicFormData.relationship
                        : "N/A",
                    preferredPronouns: basicFormData.preferredPronouns.trim()
                        ? basicFormData.preferredPronouns
                        : "N/A",
                    sex: basicFormData.sex,
                    address: basicFormData.address.trim() ? basicFormData.address : "N/A",
                    phoneNumber: basicFormData.phoneNumber
                        ? basicFormData.phoneNumber
                        : "N/A",
                    profilePic: newProfilePic,
                },
                emergency: {
                    emergencyContactName: emergencyFormData.emergencyContactName,
                    emergencyContactPhone: emergencyFormData.emergencyContactPhone,
                    emergencyContactRelationship:
                    emergencyFormData.emergencyContactRelationship,
                },
                education: {
                    schoolName: educationFormData.schoolName,
                    teacherName: educationFormData.teacherName,
                    grade: educationFormData.grade,
                    startTime: educationFormData.startTime
                        ? educationFormData.startTime
                        : "N/A",
                    endTime: educationFormData.endTime
                        ? educationFormData.endTime
                        : "N/A",
                    busNumber: educationFormData.busNumber.trim()
                        ? educationFormData.busNumber
                        : "N/A",
                    busTime: educationFormData.busTime
                        ? educationFormData.busTime
                        : "N/A",
                },
                generalCare: {
                    routineNotes: generalCareFormData.routineNotes.trim()
                        ? generalCareFormData.routineNotes
                        : "N/A",
                    extracurriculars: generalCareFormData.extracurriculars.trim()
                        ? generalCareFormData.extracurriculars
                        : "N/A",
                    bedTime: generalCareFormData.bedTime
                        ? generalCareFormData.bedTime
                        : "N/A",
                    currentMedications: generalCareFormData.currentMedications.trim()
                        ? generalCareFormData.currentMedications
                        : "N/A",
                    medicationSchedule: generalCareFormData.medicationSchedule.trim()
                        ? generalCareFormData.medicationSchedule
                        : "N/A",
                    allergies: generalCareFormData.allergies.trim()
                        ? generalCareFormData.allergies
                        : "N/A",
                },
                documents: newDocumentObject,
                reminders: reminderList.length > 0 ? reminderList : "N/A",
            };

            // Add object to database

            let updateResult = await updateDependent(newDependent, dependentId);

            if (updateResult) {
                toast.update(id, {
                    render: "Successfully updated dependent profile! 👌",
                    type: toast.TYPE.SUCCESS,
                    isLoading: false,
                    autoClose: 1000,
                });
                navigate("/dependents");
            } else {
                toast.update(id, {
                    render:
                        "Hmm... Something went wrong. 😢 Please try again or contact the dev team!",
                    type: toast.TYPE.ERROR,
                    isLoading: false,
                    autoClose: 1000,
                });
            }
        } else {
            //if we're creating the dependent for the first time
            // Create a new entry in the dependents table
            let newDependentID = getNewDependentKey();

            // Create new dependent object
            let newDependent = {
                id: newDependentID,
                creator: user.uid,
                basic: {
                    firstName: basicFormData.firstName,
                    lastName: basicFormData.lastName,
                    birthday: basicFormData.birthday
                        ? basicFormData.birthday.toUTCString()
                        : "N/A",
                    relationship: basicFormData.relationship.trim()
                        ? basicFormData.relationship
                        : "N/A",
                    preferredPronouns: basicFormData.preferredPronouns.trim()
                        ? basicFormData.preferredPronouns
                        : "N/A",
                    sex: basicFormData.sex,
                    address: basicFormData.address.trim() ? basicFormData.address : "N/A",
                    phoneNumber: basicFormData.phoneNumber
                        ? basicFormData.phoneNumber
                        : "N/A",
                    profilePic: profilePicURL
                        ? {fileName: profilePicName, fileLink: profilePicURL}
                        : "N/A",
                },
                emergency: {
                    emergencyContactName: emergencyFormData.emergencyContactName,
                    emergencyContactPhone: emergencyFormData.emergencyContactPhone,
                    emergencyContactRelationship:
                    emergencyFormData.emergencyContactRelationship,
                },
                education: {
                    schoolName: educationFormData.schoolName,
                    teacherName: educationFormData.teacherName,
                    grade: educationFormData.grade,
                    startTime: educationFormData.startTime
                        ? educationFormData.startTime
                        : "N/A",
                    endTime: educationFormData.endTime
                        ? educationFormData.endTime
                        : "N/A",
                    busNumber: educationFormData.busNumber.trim()
                        ? educationFormData.busNumber
                        : "N/A",
                    busTime: educationFormData.busTime
                        ? educationFormData.busTime
                        : "N/A",
                },
                generalCare: {
                    routineNotes: generalCareFormData.routineNotes.trim()
                        ? generalCareFormData.routineNotes
                        : "N/A",
                    extracurriculars: generalCareFormData.extracurriculars.trim()
                        ? generalCareFormData.extracurriculars
                        : "N/A",
                    bedTime: generalCareFormData.bedTime
                        ? generalCareFormData.bedTime
                        : "N/A",
                    currentMedications: generalCareFormData.currentMedications.trim()
                        ? generalCareFormData.currentMedications
                        : "N/A",
                    medicationSchedule: generalCareFormData.medicationSchedule.trim()
                        ? generalCareFormData.medicationSchedule
                        : "N/A",
                    allergies: generalCareFormData.allergies.trim()
                        ? generalCareFormData.allergies
                        : "N/A",
                },
                documents: {
                    immunizationFile: fileLinks["immunizationFile"],
                    insuranceCard: fileLinks["insuranceCard"],
                    esaDocuments: fileLinks["esaDocuments"],
                    fsaDocuments: fileLinks["fsaDocuments"],
                },
                reminders: reminderList.length > 0 ? reminderList : "N/A",
            };

            let updatedUserDependents;
            if (!allUsers[user.uid].dependents) {
                updatedUserDependents = {
                    dependents: [newDependentID],
                };
            } else {
                updatedUserDependents = {
                    dependents: [...allUsers[user.uid].dependents, newDependentID],
                };
            }

            // Add object to database
            let addResult = await addNewDependent(
                newDependent,
                updatedUserDependents,
                newDependentID,
                user.uid
            );

            if (addResult) {
                toast.update(id, {
                    render: "Successfully created dependent profile! 👌",
                    type: toast.TYPE.SUCCESS,
                    isLoading: false,
                    autoClose: 2000,
                });
                navigate("/dependents");
            } else {
                toast.update(id, {
                    render:
                        "Hmm... Something went wrong. 🤯 Please try again or contact the dev team!",
                    type: toast.TYPE.ERROR,
                    isLoading: false,
                    autoClose: 2000,
                });
            }
        }
    };

    return (
        <Container pb={40}>
            <div>
                <Text fz="xl" fw="700" mb="2rem" mt="2rem">
                    Review
                </Text>
            </div>

            <Accordion variant="separated" radius="md">
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
                                    {`${basicFormData.firstName} ${basicFormData.lastName}`}
                                </Text>
                            </div>

                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    Profile Picture
                                </Text>
                                <Text c="red"> {determineDisplayedTextProfilePic()}</Text>
                            </div>

                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    Birthday
                                </Text>
                                <Text>
                                    {" "}
                                    {basicFormData.birthday &&
                                        basicFormData.birthday.toLocaleDateString()}
                                </Text>
                            </div>

                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    Relationship
                                </Text>
                                <Text>
                                    {" "}
                                    {basicFormData.relationship.trim() === ""
                                        ? "N/A"
                                        : basicFormData.relationship}
                                </Text>
                            </div>

                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    Preferred Pronouns
                                </Text>
                                <Text>
                                    {" "}
                                    {basicFormData.preferredPronouns.trim() === ""
                                        ? "N/A"
                                        : basicFormData.preferredPronouns}
                                </Text>
                            </div>

                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    Sex
                                </Text>
                                <Text> {basicFormData.sex}</Text>
                            </div>

                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    Address
                                </Text>
                                <Text>
                                    {" "}
                                    {basicFormData.address.trim() === ""
                                        ? "N/A"
                                        : basicFormData.address}
                                </Text>
                            </div>

                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    Phone Number
                                </Text>
                                <Text>
                                    {" "}
                                    {basicFormData.phoneNumber
                                        ? basicFormData.phoneNumber
                                        : "N/A"}
                                </Text>
                            </div>
                        </SimpleGrid>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="emergency">
                    <Accordion.Control>Emergency Information</Accordion.Control>
                    <Accordion.Panel>
                        <SimpleGrid cols={2} breakpoints={[{maxWidth: "md", cols: 1}]}>
                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    Emergency Contact Name
                                </Text>
                                <Text> {emergencyFormData.emergencyContactName}</Text>
                            </div>

                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    Emergency Contact Phone
                                </Text>
                                <Text> {emergencyFormData.emergencyContactPhone}</Text>
                            </div>

                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    Emergency Contact Relationship
                                </Text>
                                <Text> {emergencyFormData.emergencyContactRelationship}</Text>
                            </div>

                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    Current Medications
                                </Text>
                                <Text>
                                    {" "}
                                    {emergencyFormData.currentMedications
                                        ? emergencyFormData.currentMedications
                                        : "N/A"}
                                </Text>
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
                                <Text> {educationFormData.schoolName}</Text>
                            </div>

                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    Teacher Name
                                </Text>
                                <Text> {educationFormData.teacherName}</Text>
                            </div>

                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    Grade
                                </Text>
                                <Text> {educationFormData.grade}</Text>
                            </div>

                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    Start Time
                                </Text>
                                <Text>
                                    {" "}
                                    {educationFormData.startTime
                                        ? convertTo12HourFormat(educationFormData.startTime)
                                        : "N/A"}
                                </Text>
                            </div>

                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    End Time
                                </Text>
                                <Text>
                                    {" "}
                                    {educationFormData.endTime
                                        ? convertTo12HourFormat(educationFormData.endTime)
                                        : "N/A"}
                                </Text>
                            </div>

                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    Bus Number
                                </Text>
                                <Text>
                                    {" "}
                                    {educationFormData.busNumber.trim() === ""
                                        ? "N/A"
                                        : educationFormData.busNumber}
                                </Text>
                            </div>

                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    Bus Time
                                </Text>
                                <Text>
                                    {" "}
                                    {educationFormData.busTime === ""
                                        ? "N/A"
                                        : convertTo12HourFormat(educationFormData.busTime)}
                                </Text>
                            </div>
                        </SimpleGrid>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="generalCare">
                    <Accordion.Control>General Care Information</Accordion.Control>
                    <Accordion.Panel>
                        <SimpleGrid cols={2} breakpoints={[{maxWidth: "md", cols: 1}]}>
                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    Routine Notes
                                </Text>
                                <Text>
                                    {" "}
                                    {generalCareFormData.routineNotes === ""
                                        ? "N/A"
                                        : generalCareFormData.routineNotes}
                                </Text>
                            </div>

                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    Extracurriculars
                                </Text>
                                <Text>
                                    {" "}
                                    {generalCareFormData.extracurriculars === ""
                                        ? "N/A"
                                        : generalCareFormData.extracurriculars}
                                </Text>
                            </div>

                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    Bed Time
                                </Text>
                                <Text>
                                    {" "}
                                    {generalCareFormData.bedTime === ""
                                        ? "N/A"
                                        : convertTo12HourFormat(generalCareFormData.bedTime)}
                                </Text>
                            </div>

                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    Allergies
                                </Text>
                                <Text>
                                    {" "}
                                    {generalCareFormData.allergies === ""
                                        ? "N/A"
                                        : generalCareFormData.allergies}
                                </Text>
                            </div>

                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    Medication Schedule
                                </Text>
                                <Text>
                                    {" "}
                                    {generalCareFormData.medicationSchedule === ""
                                        ? "N/A"
                                        : generalCareFormData.medicationSchedule}
                                </Text>
                            </div>
                        </SimpleGrid>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="documents">
                    <Accordion.Control>Documents</Accordion.Control>
                    <Accordion.Panel>
                        <SimpleGrid cols={2} breakpoints={[{maxWidth: "md", cols: 1}]}>
                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    Immunization File
                                </Text>
                                <Text c="red">
                                    {" "}
                                    {determineDisplayedTextDocuments("immunizationFile")}
                                </Text>
                            </div>

                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    Insurance Card
                                </Text>
                                <Text c="red">
                                    {" "}
                                    {determineDisplayedTextDocuments("insuranceCard")}
                                </Text>
                            </div>

                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    ESA Documents
                                </Text>
                                <Text c="red">
                                    {" "}
                                    {determineDisplayedTextDocuments("esaDocuments")}
                                </Text>
                            </div>

                            <div>
                                <Text fz="lg" fw="500" mt="2rem">
                                    FSA Documents
                                </Text>
                                <Text c="red">
                                    {" "}
                                    {determineDisplayedTextDocuments("fsaDocuments")}
                                </Text>
                            </div>
                        </SimpleGrid>
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="reminders">
                    <Accordion.Control>Reminders</Accordion.Control>
                    <Accordion.Panel>
                        <SimpleGrid cols={1} breakpoints={[{maxWidth: "md", cols: 1}]}>
                            <div>
                                {reminderFormData.reminders.length > 0 ? (
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
                                        {reminderFormData.reminders.map((item, index) => {
                                            // console.log(re)
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
                                                                : item.schedule.eventDate.toLocaleDateString()}
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
                            </div>
                        </SimpleGrid>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            <Group position="right" mt="md">
                <Button
                    name="prevButton"
                    onClick={prevStep}
                    classNames={{root: styles.backButton}}
                >
                    Back
                </Button>
                <Button
                    name="nextButton"
                    onClick={handleFormSubmit}
                    classNames={{root: styles.submitButton}}
                >
                    Submit
                </Button>
            </Group>
        </Container>
    );
};

export default ReviewPage;
