import React, {useState} from 'react';
import UserDetails from "./UserDetails";
import Confirmation from "./Confirmation";
import DependentDetails from "./DependentDetails";


function CreateProfileForm({}) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        numberOfDependents: 0
    });

    const [dependentsData, setDependentsData] = useState([]);
    const [step, setStep] = useState(1);
    const numSteps = dependentsData.length+ 2; //the total number of steps in our form


    const initializeDependentsData = (numOfDependents) => {
        console.log("Initializing... ");
        console.log(numOfDependents);
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
        setStep(currStep => currStep - 1);
    };

    //go to the next form step
    const nextStep = () => {
        setStep(currStep => currStep + 1);
    };


    //handle changing user form data
    const handleSetFormData = (fieldName, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: value
        }));

    };
    const handleSetDependentsData = (fieldName, value, currentDependent) => {

        setDependentsData(prevDependentsData => {
            const updatedDependentsData = prevDependentsData.map((item, index) => {
                if (index === currentDependent) {
                    return {...item, [fieldName]: value};
                } else {
                    return item;
                }
            });

            return updatedDependentsData;
        });


        console.log("Dependents: ", dependentsData);
    };


    switch (step) {
        case 1: //for the first step
            return (
                <UserDetails handleSetFormData={handleSetFormData} nextStep={nextStep} formData={formData}
                             initializeDependentsData={initializeDependentsData}/>
            );
        case numSteps: //for the last step (confirmation page)
            return (
                <Confirmation prevStep={prevStep} formData={formData} dependentsData={dependentsData}/>
            );
        default: //all steps in between
            return (
                <DependentDetails handleSetDependentsData={handleSetDependentsData} prevStep={prevStep}
                                  nextStep={nextStep}
                                  formData={dependentsData[step - 2]} currDependent={step - 2}/>
            );

    }

}

export default CreateProfileForm;