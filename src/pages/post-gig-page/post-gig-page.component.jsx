import './post-gig-page.styles.css';

import GigCard from '../../components/gig-card/gig-card.component';
import CenterPopup from '../../components/center-popup/center-popup.component';
import GigFullDisplayPreview from '../../components/gig-full-display-preview/gig-full-display-preview.component';
import RichTextEditor from '../../components/rich-text-editor/rich-text-editor.component';

import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';
import { useHistory } from 'react-router-dom';
import { convertToRaw } from 'draft-js';

import { TextField, Button, IconButton, Select, MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

import { postGig } from '../../firebase/firebase';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& > *': {
            marginBottom: '20px',
            width: '50ch'
        },
    },
    completionTime: {
        width: 'fit-content'
    },
    select: {
        padding: '10px',
        width: '8ch'
    }
}));

const PostGigPage = () => {
    const classes = useStyles();
    const history = useHistory();

    const [fullGigState, setFullGigOpen] = useState(false);
    const fullGigOpen = () => setFullGigOpen(true);
    const fullGigClose = () => setFullGigOpen(false);

    const { name, uid, photoURL } = useSelector(state => state.userReducer.currentUser);
    const [gigData, setGigData] = useState({
        active: true,
        gigUID: uuid(),
        freelancer: name,
        freelancerUID: uid,
        freelancerAvatar: photoURL,
        gigInstancesCount: 0,
        gigRating: 0,
        freelancerRating: 0,
        gigPostedDate: (new Date()).toDateString(),
        title: '',
        details: '',
        richDetails: '',
        price: '',
        completionTime: 1,
        gigImage: 'image1.png'
    });

    const handleChange = ({ target: { name, value } }) => {
        setGigData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleRichTextChange = e => {
        setGigData(prevData => ({
            ...prevData,
            richDetails: JSON.stringify(convertToRaw(e.getCurrentContent())),
            details: e.getCurrentContent().getPlainText()
        }))
    }

    const inputFile = useRef(null);
    const onAddIconClick = () => inputFile.current.click();
    const [gigImageFile, setGigImageFile] = useState('');
    const handleAddImage = ({ target: { files } }) => {
        const file = files[0];
        if (file.type.split('/')[0] === 'image') {
            setGigImageFile(file);
            setGigData(prevData => ({
                ...prevData,
                gigImage: URL.createObjectURL(file)
            }))
        } else alert('please upload an image');
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const { gigUID, completionTime } = gigData;
        if (completionTime > 30)
            alert("Completion time too long. We're only accepting gigs with completion time less than 30 right now");
        else {
            const postGigResult = await postGig(gigData, gigImageFile);
            if (postGigResult) history.push(`/Gig/${gigUID}`);
        }
    }

    return (
        <div className='post-gig-page'>
            <form className={clsx(classes.root, 'add-gig-info')} onSubmit={handleSubmit}>
                <TextField variant='filled' onChange={handleChange} name='title' label='Title' />
                <RichTextEditor handleChange={handleRichTextChange} />
                <TextField variant='filled' onChange={handleChange} name='price' label='Price' />
                <div className={clsx(classes.completionTime, 'post-gig-completion-time')}>
                    <h2>Completion time in days:</h2>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        name='completionTime'
                        value={gigData.completionTime}
                        onChange={handleChange}
                        className={classes.select}>
                        {[...Array(30)].map((x, idx) => <MenuItem key={idx} value={idx + 1}>{idx + 1}</MenuItem>)}
                    </Select>
                </div>
                <div className='post-gig-add-image'>
                    <h3>Add an image to represent your gig</h3>
                    <IconButton onClick={onAddIconClick}>
                        <input type='file' style={{ display: 'none' }} ref={inputFile} onChange={handleAddImage} />
                        <AddIcon style={{ width: '1em' }} className='add-gig-image' />
                    </IconButton>
                </div>
                <Button variant='contained' color='primary' type='submit'>Post</Button>
            </form>
            <div onClick={fullGigOpen} className='gig-preview'>
                <h1>This is how your gig will look like</h1>
                <GigCard preview {...gigData} />
            </div>
            <CenterPopup state={fullGigState} handleClose={fullGigClose}>
                <GigFullDisplayPreview {...gigData} />
            </CenterPopup>
        </div >
    )
}

export default PostGigPage;