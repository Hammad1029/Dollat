import './gig-full-display-preview.styles.css';

import React from 'react';

import { Avatar, Divider, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: red[500],
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
}));

const GigFullDisplayPreview = ({
    freelancer,
    freelancerUid,
    freelancerAvatar,
    timesGigDone,
    gigRating,
    freelancerRating,
    gigPostedDate,
    title,
    details,
    price,
    completionTime,
    gigImage
}) => {
    const classes = useStyles();
    return (
        <div className='gig-full-display-preview'>
            <div className='gig-full-display-details-preview'>
                <h1>{title}</h1>
                <div className='gig-freelancer-info-preview'>
                    <Avatar className={classes.avatar} src={freelancerAvatar}
                        alt={freelancer} />
                    <p>{freelancer}</p>
                </div>
                <Divider style={{ margin: '20px 0px' }} />
                <div className='gig-display-banner-preview'>
                    <img alt={title} src={gigImage} />
                    <div>
                        <p>{details}</p>
                    </div>
                </div>
            </div>
            <div className='gig-buy-preview'>
                <div>
                    <p>Completion Time</p>
                    <p>{`${completionTime} Days`}</p>
                </div>
                <div>
                    <p>Price</p>
                    <p>{price}</p>
                </div>
                <div className='buy-gig-call-to-action-preview'>
                    <Button style={{ padding: '30px', fontSize: '20px' }}
                        variant="contained" color="primary">
                        Buy Gig
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default GigFullDisplayPreview;