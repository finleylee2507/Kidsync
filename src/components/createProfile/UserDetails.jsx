import React from 'react';
import {Box, Button, TextField, Typography} from "@mui/material";

function UserDetails({nextStep, handleChange, formData,initializeDependentsData}) {
    return (

        <Box sx={{display: "flex", justifyContent: "center"}}>
            <Box sx={{maxWidth: 400, marginTop: "10rem"}}>


                    <Typography variant="h5">
                        Account Information:
                    </Typography>
                    <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        margin="normal"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}

                    />

                    <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        margin="normal"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}

                    />

                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Phone Number"
                        variant="outlined"
                        margin="normal"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        label="Number of Dependents"
                        name="numberOfDependents"
                        margin="normal"
                        type="number"
                        inputProps={{
                            min: 0,
                            max: 10,
                            step: 1,
                        }}
                        value={formData.numberOfDependents}
                        onChange={(e)=>{
                            handleChange(e)
                            initializeDependentsData(e.target.value)
                        }}
                        variant="outlined"
                    />



                    <Button fullWidth variant="contained" sx={{marginTop: "20px"}} onClick={nextStep}>Next</Button>




            </Box>

        </Box>


    );
}

export default UserDetails;