import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { TextField, Typography, Grid, Select, InputLabel, FormControl, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';


// import MuiAlert from '@material-ui/lab/Alert';
// import SnackbarContent from '@mui/material/SnackbarContent';

import axios from 'axios';
import { data } from './Data';
//import SendIcon from '@mui/material/SendIcon';





export default function Form() {
    const [open, setOpen] = useState();
    const [formError, setFormError] = useState({
        projectName: '',
        projectPhase: '',
        projectNature: '',
        lastName: '',
        projectExternalCode: '',
        projectDescription: '',
        image: '',
        areaBreakDown: '',
        startedDate: '',
        endDate: '',
    });
    const [loading, setLoading] = useState(false);
    const [addNewCustomer, setAddNewCustomer] = useState({
        firstName: '',
        lastName: '',
        projectExternalCode: '',
        projectPhase: '',
        projectNature: '',
        projectDescription: '',
        projectImage: '',
        startedDate: null,
        endDate: null,
        publish: true,
        createdAt: new Date(),
        updatedAt: new Date(),

    });

    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [country, setCountry] = useState("---Country--")
    const [state, setState] = useState("---States---")
    const [city, setCity] = useState("--City--")



    // function Alert(props) {
    //     return <MuiAlert elevation={6} variant='filled' {...props} />;
    // }
    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }

    //     setOpen(false);

    // };
    function valid() {
        //console.log(validateBreakDown(),"hello validate break")
        const { firstName, projectPhase, projectNature } = addNewCustomer;

        const pattern = /^[a-zA-Z0-9-()\s]+$/;

        if (addNewCustomer.firstName == '' || !pattern.test(addNewCustomer.firstName)) {
            setFormError({
                ...formError,
                firstName:
                    addNewCustomer.firstName == ''
                        ? 'Please fill first Name'
                        : !pattern.test(addNewCustomer.projectName)
                            ? 'Only alphabets, numbers, hyphen, and parentheses are allowed.'
                            : '',
            });
            document.getElementById('firstName').focus();
            document.getElementById('firstName').scrollIntoView();

            return false;
        } else if (addNewCustomer.lastName === "") {
            setFormError({
                ...formError,
                lastName: 'LastName is required',
            });
            document.getElementById('lastName').focus();
            document.getElementById('lastName').scrollIntoView();
            return false;
        }


        return true;
    }
    const changeCountry = (e) => {
        setCountry(e.target.value)
        setStates(data.find(ctr => ctr.country_name === e.target.value).states)

    }
    const changeState = (e) => {
        setState(e.target.value)
        setCities(states.find(str => str.state_name === e.target.value).cities)
    }
    const handleData = (event) => {
        const { name, value } = event.target;

        setAddNewCustomer((prevData) => ({
            ...prevData,
            [name]: value,
        }));


        setFormError({
            ...formError,
            firstName: '',
            lastName: '',
        });
        //for publish user
        //setIsChecked(event.target.checked ? true : false);
    };
    const handleSave = (e) => {
        e.preventDefault();
        if (!valid()) return;
        setLoading(true);

        const form = new FormData();

        form.append('projectName', firstName);
        form.append('lastName', lastName);
        form.append('country', country);
        form.append('state', state);
        form.append('city', city);




        axios({
            url: "postapi/formSubmit",
            method: 'POST',

            data: form,
            //JSON.stringify(addNewCustomer)
        })


            .then((res) => {
                setOpen(1);
            })
            .catch((error) => {
                // setOpen(2);
                console.log(error, 'error');
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const {
        firstName,
        lastName,

    } = addNewCustomer;
    console.log(country, state, cities)
    console.log(states, cities, "77")
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        > <Typography gutterBottom className="labelName">
                Form
            </Typography>
            <div>
                <Grid item md={12} xs={12}>

                    <TextField
                        label='First Name'
                        name='firstName'
                        id='firstName'
                        type='text'
                        fullWidth
                        variant='outlined'
                        required
                        value={firstName}
                        onChange={handleData}
                        autoComplete='Off'
                        error={formError.firstName !== '' ? formError.firstName : ''}
                    />
                    <div style={{ color: 'red' }}>{formError.firstName}</div>


                    {/* <div style={{ color: "red" }}>{error.actionTitle}</div> */}

                    <TextField

                        name='lastName'
                        id='lastName'
                        type='text'
                        fullWidth
                        variant='outlined'
                        required
                        value={lastName}
                        onChange={handleData}
                        autoComplete='Off'
                        error={formError.lastName !== '' ? formError.lastname : ''}
                        label="Last Name"


                    />
                    <div style={{ color: 'red' }}>{formError.lastName}</div>
                    <FormControl variant='outlined' required fullWidth>
                        <InputLabel id='demo-simple-select-label'>Countries</InputLabel>
                        <Select
                            labelId='demo-simple-select-label'
                            id='country'
                            label='Country'
                            name='Country'
                            onChange={changeCountry}

                        >

                            {data && data.map((val, i) => {
                                return (
                                    <MenuItem key={i} value={val.country_name}>
                                        {val.country_name}
                                    </MenuItem>)

                            })}
                        </Select>
                    </FormControl>
                    <FormControl variant='outlined' required fullWidth>
                        <InputLabel id='demo-simple-select-label'>Countries</InputLabel>
                        <Select
                            labelId='demo-simple-select-label'
                            id='State'
                            label='State'
                            name='State'
                            onChange={changeState}

                        >

                            {states.map((val, i) => {
                                return (
                                    <MenuItem key={val.id} value={val.state_name}>
                                        {val.state_name}
                                    </MenuItem>)

                            })}
                        </Select>
                    </FormControl>
                    <FormControl variant='outlined' required fullWidth>
                        <InputLabel id='demo-simple-select-label'>Countries</InputLabel>
                        <Select
                            labelId='demo-simple-select-label'
                            id='City'
                            label='City'
                            name='City'
                            onChange={handleData}

                        >

                            {cities.map((val, i) => {
                                return (
                                    <MenuItem key={i} value={val.city_name}>
                                        {val.city_name}
                                    </MenuItem>)

                            })}
                        </Select>
                    </FormControl>   </Grid>
                {/*    <TextField

                        label="Mail Id"
                        name='firstName'
                        id='firstName'
                        type='text'
                        fullWidth
                        variant='outlined'
                        required
                        value={firstName}
                        onChange={handleData}
                        autoComplete='Off'
                        error={formError.firstName !== '' ? formError.firstName : ''}


                    />

                    <div style={{ color: 'red' }}>{formError.firstName}</div>
                    
                 
                <TextField
                    name='firstName'
                    id='firstName'
                    type='text'
                    fullWidth
                    variant='outlined'
                    required
                    value={firstName}
                    onChange={handleData}
                    autoComplete='Off'
                    error={formError.firstName !== '' ? formError.firstName : ''}

                    label="PAN Number"

                    InputProps={{
                        readOnly: true,
                    }}
                />
                <div style={{ color: 'red' }}>{formError.firstName}</div>
                <TextField
                    name='firstName'
                    id='firstName'
                    type='text'
                    fullWidth
                    variant='outlined'
                    required
                    value={firstName}
                    onChange={handleData}
                    autoComplete='Off'
                    error={formError.firstName !== '' ? formError.firstName : ''}

                    label="Aadhar Card Number"

                />

                <div style={{ color: 'red' }}>{formError.firstName}</div>
                <TextField
                    name='firstName'
                    id='firstName'
                    type='text'
                    fullWidth
                    variant='outlined'
                    required
                    value={firstName}
                    onChange={handleData}
                    autoComplete='Off'
                    error={formError.firstName !== '' ? formError.firstName : ''}

                    label="Is linked with contact Number"
                />
                <div style={{ color: 'red' }}>{formError.firstName}</div>

                <TextField
                    name='firstName'
                    id='firstName'
                    type='text'
                    fullWidth
                    variant='outlined'
                    required
                    value={firstName}
                    onChange={handleData}
                    autoComplete='Off'
                    error={formError.firstName !== '' ? formError.firstName : ''}

                    label="Address"

                />
                <div style={{ color: 'red' }}>{formError.firstName}</div>
                <TextField
                    name='firstName'
                    id='firstName'
                    type='text'
                    fullWidth
                    variant='outlined'
                    required
                    value={firstName}
                    onChange={handleData}
                    autoComplete='Off'
                    error={formError.firstName !== '' ? formError.firstName : ''}

                    label="Nominee"
                />
                <div style={{ color: 'red' }}>{formError.firstName}</div>
                <TextField
                    name='firstName'
                    id='firstName'
                    type='text'
                    fullWidth
                    variant='outlined'
                    required
                    value={firstName}
                    onChange={handleData}
                    autoComplete='Off'
                    error={formError.firstName !== '' ? formError.firstName : ''}

                    label="Nominee Address"


                /> <div style={{ color: 'red' }}>{formError.firstName}</div>
                <TextField

                    label="Nominee Contact Number"
                    name='firstName'
                    id='firstName'
                    type='text'
                    fullWidth
                    variant='outlined'
                    required
                    value={firstName}
                    onChange={handleData}
                    autoComplete='Off'
                    error={formError.firstName !== '' ? formError.firstName : ''}

                /> <div style={{ color: 'red' }}>{formError.firstName}</div>
                <TextField
                    name='firstName'
                    id='firstName'
                    type='text'
                    fullWidth
                    variant='outlined'
                    required
                    value={firstName}
                    onChange={handleData}
                    autoComplete='Off'
                    error={formError.firstName !== '' ? formError.firstName : ''}

                    label="Contact Number "
                /> <div style={{ color: 'red' }}>{formError.firstName}</div>
                <TextField
                    name='firstName'
                    id='firstName'
                    type='text'
                    fullWidth
                    variant='outlined'
                    required
                    value={firstName}
                    onChange={handleData}
                    autoComplete='Off'
                    error={formError.firstName !== '' ? formError.firstName : ''}

                    label="Email Id Of Nominee"
                /> <div style={{ color: 'red' }}>{formError.firstName}</div>

                <TextField
                    name='firstName'
                    id='firstName'
                    type='text'
                    fullWidth
                    variant='outlined'
                    required
                    value={firstName}
                    onChange={handleData}
                    autoComplete='Off'
                    error={formError.firstName !== '' ? formError.firstName : ''}

                    label="Date of Birth"
                /> <div style={{ color: 'red' }}>{formError.firstName}</div>
                <TextField
                    name='firstName'
                    id='firstName'
                    type='text'
                    fullWidth
                    variant='outlined'
                    required
                    value={firstName}
                    onChange={handleData}
                    autoComplete='Off'
                    error={formError.firstName !== '' ? formError.firstName : ''}

                    label="Relationship with Nominee"
                /> <div style={{ color: 'red' }}>{formError.firstName}</div>
                <TextField
                    name='firstName'
                    id='firstName'
                    type='text'
                    fullWidth
                    variant='outlined'
                    required
                    value={firstName}
                    onChange={handleData}
                    autoComplete='Off'
                    error={formError.firstName !== '' ? formError.firstName : ''}

                    label="Proof if Identity Submitted "
                /> <div style={{ color: 'red' }}>{formError.firstName}</div>
                <TextField

                    label="Percentage of allocation"
                    name='firstName'
                    id='firstName'
                    type='text'
                    fullWidth
                    variant='outlined'
                    required
                    value={firstName}
                    onChange={handleData}
                    autoComplete='Off'
                    error={formError.firstName !== '' ? formError.firstName : ''}

                /> <div style={{ color: 'red' }}>{formError.firstName}</div> */}



            </div>
            <div>
                <Button variant="contained" onClick={handleSave}>
                    Send
                </Button></div>

            {/* <Snackbar open={open === 1 || open === 2} autoHideDuration={600} onClose={handleClose}>
                <Alert onClose={handleClose} severity={open === 1 || open === 2 ? 'success' : 'error'}>
                    {open === 1 ? 'Form submitted Successfully' : open === 2 ? 'Failed to Submit' : ''}
                </Alert>
            </Snackbar> */}
        </Box>
    );
}
