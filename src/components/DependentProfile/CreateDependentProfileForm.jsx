import React, {useState} from "react";
import BasicForm from "./BasicForm";
import EmergencyForm from "./EmergencyForm";
import GeneralCareForm from "./GeneralCareForm";
import DocumentsForm from "./DocumentsForm";
import EducationForm from "./EducationForm";
import styles from "./CreateEditDependentProfileForm.module.css";
import {Button, Container, Divider, Modal, Progress, Text,} from "@mantine/core";
import ReviewPage from "./ReviewPage";
import {useNavigate} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ReminderForm from "./ReminderForm";

const CreateDependentProfileForm = ({user, allUsers}) => {
    const navigate = useNavigate();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const handleReturn = () => {
        setIsOpenModal(true);
    };

    const handleModalConfirm = () => {
        setIsOpenModal(false);
        navigate("/dependents");
    };

    const handleModalCancel = () => {
        setIsOpenModal(false);
    };
    const [basicFormData, setBasicFormData] = useState({
        firstName: "",
        lastName: "",
        birthday: "",
        relationship: "",
        preferredPronouns: "",
        sex: "",
        address: "",
        phoneNumber: "",
        parentsName: "",
        profilePic: null,
    });

    const [emergencyFormData, setEmergencyFormData] = useState({
        emergencyContactName: "",
        emergencyContactPhone: "",
        emergencyContactRelationship: "",
        allergies: "",
        currentMedications: "",
    });

    const [generalCareFormData, setGeneralCareFormData] = useState({
        routineNotes: "",
        extracurriculars: "",
        bedTime: "",
        medicationSchedule: "",
    });

    const [educationFormData, setEducationFormData] = useState({
        schoolName: "",
        teacherName: "",
        grade: "",
        startTime: "",
        endTime: "",
        busNumber: "",
        busTime: "",
    });

    const [documentsFormData, setDocumentsFormData] = useState({
        immunizationFile: null,
        insuranceCard: null,
        esaDocuments: null,
        fsaDocuments: null,
    });

    const [reminderFormData, setReminderFormData] = useState({
        reminders: [],
    });

    //keeps track of which form we want to display
    const [step, setStep] = useState(0);

    //go back to the previous form step
    const prevStep = () => {
        setStep((currStep) => currStep - 1);
    };

    //go to the next form step
    const nextStep = () => {
        setStep((currStep) => currStep + 1);
    };

    let renderedElement;

    switch (step) {
        case 0:
            //display basic form
            renderedElement = (
                <BasicForm
                    formData={basicFormData}
                    nextStep={nextStep}
                    setFormData={setBasicFormData}
                    isEditMode={false}
                    oldFormData={null}
                />
            );
            break;

        case 1:
            renderedElement = (
                <EmergencyForm
                    formData={emergencyFormData}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    setFormData={setEmergencyFormData}
                />
            );
            break;
        case 2:
            renderedElement = (
                <EducationForm
                    formData={educationFormData}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    setFormData={setEducationFormData}
                />
            );

            break;
        case 3:
            renderedElement = (
                <GeneralCareForm
                    formData={generalCareFormData}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    setFormData={setGeneralCareFormData}
                />
            );
            break;
        case 4:
            renderedElement = (
                <DocumentsForm
                    formData={documentsFormData}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    setFormData={setDocumentsFormData}
                    isEditMode={false}
                    oldFormData={null}
                />
            );
            break;
        case 5:
            renderedElement = (
                <ReminderForm
                    formData={reminderFormData}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    setFormData={setReminderFormData}
                />
            );
            break;
        case 6:
            renderedElement = (
                <ReviewPage
                    basicFormData={basicFormData}
                    emergencyFormData={emergencyFormData}
                    generalCareFormData={generalCareFormData}
                    educationFormData={educationFormData}
                    documentsFormData={documentsFormData}
                    reminderFormData={reminderFormData}
                    prevStep={prevStep}
                    user={user}
                    allUsers={allUsers}
                    oldDocumentsFormData={null}
                    dependentId={null}
                    isEditMode={false}
                />
            );
            break;
        default:
            renderedElement = (
                <BasicForm
                    formData={basicFormData}
                    nextStep={nextStep}
                    setFormData={setBasicFormData}
                    isEditMode={false}
                    oldFormData={null}
                />
            );
            break;
    }

    return (
        <Container
            fluid
            sx={{
                backgroundColor: "#E7E5F4",
                height: "100%",
                minHeight: "calc(100vh - 0px)",
            }}
        >
            <Modal
                title="You are about to leave this page"
                opened={isOpenModal}
                onClose={() => setIsOpenModal(false)}
                classNames={{
                    title: styles.modalTitle,
                }}
            >
                <Text>
                    Do you really want to go back? You might lose information that are not
                    saved.
                </Text>

                <Divider my="sm"/>
                <div className={styles.modalButtonContainer}>
                    <Button
                        variant="outline"
                        onClick={handleModalCancel}
                        classNames={{root: styles.cancelButton}}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleModalConfirm}
                        classNames={{root: styles.confirmButton}}
                    >
                        Confirm
                    </Button>
                </div>
            </Modal>

            <div className={styles.formWrapper}>
                <div>
                    <Button
                        onClick={handleReturn}
                        classNames={{root: styles.returnButton}}
                        mt={10}
                    >
                        Return
                    </Button>
                </div>

                <div className={styles.progressBarContainer} title="Progress">
                    <Progress
                        value={(step / 6) * 100}
                        label={`${step}/6`}
                        size="xl"
                        radius="xl"
                        striped
                        color="#6147FF"
                        classNames={{
                            root: styles.progressBar,
                        }}
                    />
                </div>
                <div
                    className={
                        step < 5
                            ? styles.normalContent
                            : step === 5
                                ? styles.reminderContent
                                : styles.reviewContent
                    }
                >
                    {renderedElement}
                </div>
            </div>
        </Container>
    );
};

export default CreateDependentProfileForm;
