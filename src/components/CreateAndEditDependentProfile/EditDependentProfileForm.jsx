import React, { useEffect, useState } from "react";
import BasicForm from "./BasicForm";
import EmergencyForm from "./EmergencyForm";
import GeneralCareForm from "./GeneralCareForm";
import DocumentsForm from "./DocumentsForm";
import EducationForm from "./EducationForm";
import styles from "./CreateDependentProfileForm.module.css";
import { Button, Divider, Modal, Progress, Text } from "@mantine/core";
import ReviewPage from "./ReviewPage";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const EditDependentProfileForm = ({ user, allUsers }) => {
  // obtain the data passed by navigate()
  const location = useLocation();
  const navigate = useNavigate();
  const dependent = location.state;

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

  useEffect(() => {
    setBasicFormData({
      ...dependent.basic,
      birthday: new Date(dependent.basic.birthday),
    });
    setEmergencyFormData(dependent.emergency);
    setEducationFormData({
      ...dependent.education,
      startTime:
        dependent.education.startTime !== "N/A"
          ? new Date(dependent.education.startTime)
          : "",
      endTime:
        dependent.education.endTime !== "N/A"
          ? new Date(dependent.education.endTime)
          : "",
      busTime:
        dependent.education.busTime !== "N/A"
          ? new Date(dependent.education.busTime)
          : "",
    });
    setGeneralCareFormData({
      ...dependent.generalCare,
      bedTime:
        dependent.generalCare.bedTime !== "N/A"
          ? new Date(dependent.generalCare.bedTime)
          : "",
    });

    //NOTE: we don't set documentFormData to what's coming from the database
  }, [dependent]);
  //keeps track of which form we want to display

  const [step, setStep] = useState(dependent.step ? dependent.step : 0);

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
          oldFormData={dependent.documents}
          nextStep={nextStep}
          prevStep={prevStep}
          setFormData={setDocumentsFormData}
          isEditMode={true}
        />
      );
      break;

    case 5:
      renderedElement = (
        <ReviewPage
          basicFormData={basicFormData}
          emergencyFormData={emergencyFormData}
          generalCareFormData={generalCareFormData}
          educationFormData={educationFormData}
          documentsFormData={documentsFormData}
          oldDocumentsFormData={dependent.documents}
          prevStep={prevStep}
          user={user}
          allUsers={allUsers}
          dependentId={dependent.id}
          isEditMode={true}
        />
      );
      break;
    default:
      renderedElement = (
        <ReviewPage
          basicFormData={basicFormData}
          emergencyFormData={emergencyFormData}
          generalCareFormData={generalCareFormData}
          educationFormData={educationFormData}
          documentsFormData={documentsFormData}
          oldDocumentsFormData={dependent.documents}
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
        <Button onClick={handleReturn}>Return</Button>
        <div className={styles.progressBarContainer} title="Progress">
          <Progress
            value={(step / 5) * 100}
            label={`${(step / 5) * 100}%`}
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

export default EditDependentProfileForm;