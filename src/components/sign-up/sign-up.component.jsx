import './sign-up.styles.css';
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

const SignUp = () => {
    const classes = useStyles();

    const [signUpFormData, setSignUpFormData] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    })

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setSignUpFormData((prevData) => {
            return ({
                ...prevData,
                [name]: value
            })
        })
    }

    const handleSignUp = e => {
        e.preventDefault();
        const { /*name,*/ email, password, repeatPassword } = signUpFormData;
        if (password === repeatPassword) {
            authRef.createUserWithEmailAndPassword(email, password)
                .then(() => setSignUpFormData({
                    name: '',
                    email: '',
                    password: '',
                    repeatPassword: ''
                })).catch(e => console.error(e));
        } else alert('Password Not Same');
    }

    return (
        <form className={clsx(classes.root, 'sign-up')} onSubmit={handleSignUp}>
            <img alt='Dollat Logo' src={DollatLogo} />
            <h1>Sign Up</h1>
            <TextField variant='outlined' name='name' label='Name' onChange={handleChange} />
            <TextField variant='outlined' name='email' label='Email' onChange={handleChange} />
            <TextField variant='outlined' name='password' label='Password'
                type='password' onChange={handleChange} />
            <TextField variant='outlined' name='repeatPassword' label='Repeat Password'
                type='password' onChange={handleChange} />
            <Button variant='contained' color='primary' type='submit'>
                Sign Up
            </Button>
            <h2>Or</h2>
            <Button variant='contained' color='primary'
                onClick={signInWithGoogle}>
                Sign In With Google
            </Button>
        </form>
    )
}

export default SignUp;