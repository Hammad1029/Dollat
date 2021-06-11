import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Divider, Tooltip }
    from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 345,
        display: 'flex',
        flexDirection: 'column',
        '&:hover': { cursor: 'pointer' }
    },
    media: {
        paddingTop: '75%'
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const GigCard = ({
    preview,
    gigUID,
    freelancer,
    freelancerUID,
    freelancerAvatar,
    timesGigBought,
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
    const [elevation, setElevation] = useState(7);
    const history = useHistory();

    const onClick = () => {
        return (
            preview ? null : history.push(`/Gig/${gigUID}`)
        )
    }

    return (
        <Paper style={{ width: 'fit-content' }} elevation={elevation} onMouseEnter={() => setElevation(15)}
            onMouseLeave={() => setElevation(7)} onClick={onClick}>
            <Card className={classes.root}>
                <CardHeader
                    avatar={<Avatar className={classes.avatar} src={freelancerAvatar} alt={freelancer} />}
                    action={
                        <IconButton >
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={
                        <div>
                            <h2 style={{ fontWeight: 300 }}>{freelancer}</h2>
                            <h4 style={{ fontWeight: 100, color: '#434343' }}>{gigPostedDate}</h4>
                        </div>
                    } style={{ paddingBottom: '8px' }} />
                <Divider style={{ width: '90%', alignSelf: 'center', marginBottom: '8px' }} />
                <h3 style={{
                    margin: '10px 20px',
                    fontWeight: 'lighter'
                }}>{title}</h3>
                <CardMedia className={classes.media} image={gigImage} title={title} />
                <CardContent>
                    {
                        details.length > 80
                            ? `${details.substring(0, 80)}...`
                            : details
                    }
                </CardContent>
                <Divider style={{ width: '90%', alignSelf: 'center' }} />
                <CardActions disableSpacing>
                    <Tooltip title='Add to wishlist'>
                        <IconButton>
                            <FavoriteIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Share'>
                        <IconButton>
                            <ShareIcon />
                        </IconButton>
                    </Tooltip>
                    <h2 style={{
                        fontWeight: 300, margin: '0px 20px 0px auto',
                        color: '#1e8b90'
                    }}>{`${price} PKR`}</h2>
                </CardActions>
            </Card >
        </Paper>
    );
}

export default GigCard;