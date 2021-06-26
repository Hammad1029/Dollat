import React, { useState } from 'react';
import { convertToRaw } from 'draft-js';

import { Card, CardContent, Typography, CardActions, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import PaymentIcon from '@material-ui/icons/Payment';
import RichTextEditor from '../rich-text-editor/rich-text-editor.component';
import JazzCash from './jazzcash.svg';

import { buyGig } from '../../firebase/firebase';

const useStyles = makeStyles(theme => ({
    root: {
        width: '75vw',
        display: 'flex',
        padding: '50px',
        justifyContent: 'center'
    },
    enterInfo: {
        width: '50%',
        '&>h1': {
            fontWeight: '100',
            marginBottom: '20px'
        },
    },
    alertInfo: {
        display: 'flex',
        marginTop: '20px',
        '&>h3': {
            fontWeight: '100',
        }
    },
    alert: {
        marginRight: '10px',
        fontSize: '40px',
        color: '#cd2b2b'
    },
    makePayment: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '100px 0px 0px 50px',
        height: 'fit-content',
        padding: '20px'
    },
    cardTitle: {
        fontSize: 14,
    },
    cardPos: {
        marginBottom: 12,
    },
    paymentOptions: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        margin: '20px 0px',
        border: '1px solid black',
        '& *': {
            color: 'black'
        },
        '& svg, & img': {
            marginRight: '5px',
            height: '25px'
        }
    }
}))

const BuyGig = ({ gigUID }) => {
    const classes = useStyles();

    const [details, setDetails] = useState({
        details: '',
        richDetails: ''
    })
    const handleChange = e => {
        setDetails({
            details: e.getCurrentContent().getPlainText(),
            richDetails: convertToRaw(e.getCurrentContent()),
        })
    }

    return (
        <div className={classes.root}>
            <div className={classes.enterInfo}>
                <h1>Please enter information about your requirements</h1>
                <RichTextEditor handleChange={handleChange} />
                <div className={classes.alertInfo}>
                    <AnnouncementIcon className={classes.alert} />
                    <h3>Try to include the most amount of details possible to help
                        the freelancer in providing you with a product that matches your exact requirements</h3>
                </div>
            </div>
            <Paper elevation={10} className={classes.makePayment}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.cardTitle} color="textSecondary" gutterBottom>
                            Your payment is safe with us till you get your product
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Choose one of the options given below
                        </Typography>
                        <Button variant="outlined" className={classes.paymentOptions}
                            onClick={() => buyGig(gigUID, details, 'bank')}>
                            <PaymentIcon />
                            Bank Transfer
                        </Button>
                        <Button variant="outlined" className={classes.paymentOptions}
                            onClick={() => buyGig(gigUID, details, 'jazzcash')}>
                            <img src={JazzCash} alt='jazzcash' />
                            JazzCash
                        </Button>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Contact Us</Button>
                    </CardActions>
                </Card>
            </Paper>
        </div>
    )
}

export default BuyGig;