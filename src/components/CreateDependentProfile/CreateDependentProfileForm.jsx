import React,{useState} from 'react';
import BasicForm from "./BasicForm";

function CreateDependentProfileForm({}) {
    const [basicFormData, setBasicFormData] = useState({
        firstName:"",
        lastName:"",
        birthday:"",
        relationship:"",
        preferredPronouns:"",
        sex:"",
        address:"",
        phoneNumber:"",
        parentsName:""

    });

    //keeps track of which form we want to display
    const [step, setStep] = useState(0);

    //go back to the previous form step
    const prevStep = () => {
        setStep(currStep => currStep - 1);
    };

    //go to the next form step
    const nextStep = () => {
        setStep(currStep => currStep + 1);
    };

    switch(step){
        case 0:
            //display basic form
            return <BasicForm formData={basicFormData} nextStep={nextStep} setFormData={setBasicFormData}/>

        default:
            return (<div>
                Placeholder
                <button onClick={prevStep}>Prev</button>
            </div>)
    }


}

export default CreateDependentProfileForm;