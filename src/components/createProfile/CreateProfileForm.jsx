import { React, useState } from "react";
import UserDetails from "./UserDetails";
import Confirmation from "./Confirmation";
import DependentDetails from "./DependentDetails";

const CreateProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    numberOfDependents: 0,
  });

  const [dependentsData, setDependentsData] = useState([]);
  const [step, setStep] = useState(1);
  const numSteps = parseInt(formData.numberOfDependents) + 2; //the total number of steps in our form

  console.log("Num steps: ", numSteps);

  const initializeDependentsData = (numOfDependents) => {
    let result = [];
    for (let i = 0; i < numOfDependents; i++) {
      let newObject = {
        firstName: "",
        lastName: "",
        sex: "",
        birthday: "",
        relationship: "",
      };
      result[i] = newObject;
    }

    setDependentsData(result);
  };

  //go back to the previous form step
  const prevStep = () => {
    setStep((currStep) => currStep - 1);
  };

  //go to the next form step
  const nextStep = () => {
    setStep((currStep) => currStep + 1);
  };

  //handle changing user form data
  const handleChangeUserData = (event) => {
    const { name, value, type, files } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      // [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleChangeDependentsData = (event, currentDependent) => {
    const { name, value, type, files } = event.target;
    const updatedDependentsData = dependentsData.map((item, index) => {
      if (index === currentDependent) {
        return { ...item, [name]: value };
      } else {
        return item;
      }
    });

    setDependentsData(updatedDependentsData);
  };

  switch (step) {
    case 1: //for the first step
      return (
        <UserDetails
          handleChange={handleChangeUserData}
          nextStep={nextStep}
          formData={formData}
          initializeDependentsData={initializeDependentsData}
        />
      );
    case numSteps: //for the last step (confirmation page)
      return (
        <Confirmation handleChange={handleChangeUserData} prevStep={prevStep} />
      );
    default: //all steps in between
      return (
        <DependentDetails
          handleChange={handleChangeDependentsData}
          prevStep={prevStep}
          nextStep={nextStep}
          formData={dependentsData}
          currDependent={step - 2}
        />
      );
  }
};

export default CreateProfileForm;
