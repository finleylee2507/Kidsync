import React,{useState} from 'react';
import BasicForm from "./BasicForm";
import EmergencyForm from './EmergencyForm';
import EducationForm from "./EducationForm";

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

    const [emergencyFormData, setEmergencyFormData] = useState({
        emergencyContactName:"",
        emergencyContactPhone:"",
        emergencyContactRelationship:"",
        allergies:"",
        currentMedications:"",
    })

    const [educationFormData,setEducationFormData]=useState({
        schoolName:"",
        teacherName:"",
        grade:"",
        startTime:"",
        endTime:"",
        busNumber:"",
        busTime:""
    })

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

        case 1:
            return <EmergencyForm formData={emergencyFormData} nextStep={nextStep} prevStep={prevStep} setFormData={setEmergencyFormData}/>

        case 3:
            return <EducationForm formData={educationFormData} nextStep={nextStep} prevStep={prevStep} setFormData={setEducationFormData}/>
        default:
            return (<div>
                Placeholder
                <button onClick={prevStep}>Prev</button>
            </div>)
    }


}

export default CreateDependentProfileForm;