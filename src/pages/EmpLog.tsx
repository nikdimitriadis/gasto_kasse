import React from 'react'
import { useRef } from 'react';

import NavigateBack from '../components/Navigate__Back/NavigateBack';

import { Button, Grid, FormLabel, TextField, FormControl } from "@mui/material";


const EmpLog = () => {
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passRef = useRef<HTMLInputElement | null>(null);
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (usernameRef.current!.value && passRef.current!.value) {
            console.log(usernameRef.current!.value)
            console.log(passRef.current!.value)
            usernameRef.current!.value = ""
            passRef.current!.value = ""
        }
    }

    return (
        <Grid container spacing={3} padding="1rem" justifyContent="flex-end" /*alignItems="center"*/ >
            <NavigateBack title="Employe Log In" />
            <Grid item xs={11} textAlign="center">
                <form onSubmit={submitHandler}>
                    <FormControl>
                        <FormLabel>Employes</FormLabel>
                        <TextField inputRef={usernameRef} margin="normal" required id="outlined-basic" label="Username" variant="outlined" />
                        <TextField inputRef={passRef} margin="normal" required id="outlined-basic" label="Password" variant="outlined" type="password" />
                        <Button size="large" variant="contained" color="success" type='submit'>Submit</Button>
                    </FormControl>
                </form>
            </Grid>
        </Grid>

    )
}

export default EmpLog;