import './sign-in.styles.css';
import DollatLogo from '../../logo.svg';

import React, { useState } from 'react';

import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { signInWithGoogle, authRef } from '../../firebase/firebase';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: '10px 20px',
            width: '50ch'
        },
    },
}));

const SignIn = () => {
    const classes = useStyles();

    const [signInFormData, setSignInFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setSignInFormData((prevData) => {
            return ({
                ...prevData,
                [name]: value
            })
        });
    }

    const handleSignIn = e => {
        e.preventDefault();
        const { email, password } = signInFormData;
        authRef.signInWithEmailAndPassword(email, password)
            .then(() => setSignInFormData({
                email: '',
                password: ''
            })).catch(e => console.error(e));
    }

    return (
        <form className={clsx(classes.root, 'sign-in')} onSubmit={handleSignIn}>
            <img alt='Dollat Logo' src={DollatLogo} />
            <h1>Sign In</h1>
            <TextField variant='outlined' name='email' label='Email' onChange={handleChange} />
            <TextField variant='outlined' name='password' label='Password'
                type='password' onChange={handleChange} />
            <Button variant='contained' color='primary' type='submit'>
                Sign In
            </Button>
            <p>Forgot Password?</p>
            <h2>Or</h2>
            <Button variant='contained' color='primary'
                onClick={signInWithGoogle}>
                Sign In With Google
            </Button>
        </form>
    )
}

export default SignIn;