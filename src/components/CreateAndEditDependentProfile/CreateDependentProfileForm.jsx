import React, { useState } from "react";
import BasicForm from "./BasicForm";
import EmergencyForm from "./EmergencyForm";
import GeneralCareForm from "./GeneralCareForm";
import DocumentsForm from "./DocumentsForm";
import EducationForm from "./EducationForm";
import styles from "./CreateDependentProfileForm.module.css";
import {
  Button,
  createStyles,
  Divider,
  Modal,
  Progress,
  Text,
} from "@mantine/core";
import ReviewPage from "./ReviewPage";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ReminderForm from "./ReminderForm";

//define custom style for mantine components
const useStyles = createStyles((theme) => ({
  returnButton: {
    "@media (max-width: 600px)": {
      width: "100%",
      height: 60,
      fontSize: 30,
    },
  },
  formHeader: {
    "@media (max-width: 600px)": {
      fontSize: 45,
    },
  },
}));

const CreateDependentProfileForm = ({ user, allUsers }) => {
  const navigate = useNavigate();
  const { classes } = useStyles();
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
          classes={classes}
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
          classes={classes}
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
          classes={classes}
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
          classes={classes}
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
          classes={classes}
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
          classes={classes}
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
          classes={classes}
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
          classes={classes}
        />
      );
      break;
  }

  return (
    <div>
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

        <Divider my="sm" />
        <div className={styles.modalButtonContainer}>
          <Button variant="outline" onClick={handleModalCancel}>
            Cancel
          </Button>
          <Button onClick={handleModalConfirm}>Confirm</Button>
        </div>
      </Modal>

      <div className={styles.formWrapper}>
        <Button onClick={handleReturn} className={classes.returnButton}>
          Return
        </Button>
        <div className={styles.progressBarContainer} title="Progress">
          <Progress
            value={(step / 6) * 100}
            label={`${step}/6`}
            size="xl"
            radius="xl"
            striped
          />
        </div>
        <div className={`${styles.formContent}${step === 5 ? "inReview" : ""}`}>
          {renderedElement}
        </div>
      </div>
    </div>
  );
};

export default CreateDependentProfileForm;
