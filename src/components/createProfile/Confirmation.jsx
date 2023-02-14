import React from 'react';

function Confirmation({prevStep,handleChange}) {
    return (
        <div>
            Confirmation
            <button onClick={prevStep}>last</button>
        </div>
    );
}

export default Confirmation;