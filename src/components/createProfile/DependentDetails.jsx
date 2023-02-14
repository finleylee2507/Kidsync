import React from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";

function DependentDetails({prevStep, nextStep, formData, handleChange, currDependent}) {
    return (


        //might change to this kind of style in the future
        <Box sx={{display: "flex", justifyContent: "center"}}>
            <Box sx={{maxWidth: 400, marginTop: "10rem"}}>


                <Typography variant="h6">
                    Enter Information for Dependent {currDependent+1}:
                </Typography>


                <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    margin="normal"
                    name="firstName"
                    value={formData[currDependent].firstName}
                    onChange={(e) => {
                        handleChange(e, currDependent);
                    }}

                />

                <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    margin="normal"
                    name="lastName"
                    value={formData[currDependent].lastName}
                    onChange={(e) => {
                        handleChange(e, currDependent);
                    }}

                />

                {/*<TextField*/}
                {/*    fullWidth*/}
                {/*    label="Email"*/}
                {/*    variant="outlined"*/}
                {/*    margin="normal"*/}
                {/*    name="email"*/}
                {/*    type="email"*/}
                {/*    value={formData.email}*/}
                {/*    onChange={handleChange}*/}
                {/*/>*/}

                {/*<TextField*/}
                {/*    fullWidth*/}
                {/*    label="Phone Number"*/}
                {/*    variant="outlined"*/}
                {/*    margin="normal"*/}
                {/*    name="phone"*/}
                {/*    value={formData.phone}*/}
                {/*    onChange={handleChange}*/}
                {/*/>*/}

                {/*<TextField*/}
                {/*    fullWidth*/}
                {/*    label="Number of Dependents"*/}
                {/*    name="numberOfDependents"*/}
                {/*    margin="normal"*/}
                {/*    type="number"*/}
                {/*    inputProps={{*/}
                {/*        min: 0,*/}
                {/*        max: 10,*/}
                {/*        step: 1,*/}
                {/*    }}*/}
                {/*    value={formData.numberOfDependents}*/}
                {/*    onChange={handleChange}*/}
                {/*    variant="outlined"*/}
                {/*/>*/}


                <Button fullWidth variant="contained" sx={{marginTop: "20px"}} onClick={nextStep}>Next</Button>

                <Button fullWidth variant="contained" sx={{marginTop: "20px"}} onClick={prevStep}>Last</Button>


            </Box>

        </Box>
    );
}

export default DependentDetails;