import './post-gig-page.styles.css';

import GigCard from '../../components/gig-card/gig-card.component';
import CenterPopup from '../../components/center-popup/center-popup.component';
import GigFullDisplayPreview from '../../components/gig-full-display-preview/gig-full-display-preview.component';

import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';
import { firestoreDB, firebaseStorage } from '../../firebase/firebase';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginBottom: '20px',
            width: '50ch',
        },
    },
}));

const PostGigPage = () => {
    const classes = useStyles();

    const [fullGigState, setFullGigOpen] = useState(false);
    const fullGigOpen = () => setFullGigOpen(true);
    const fullGigClose = () => setFullGigOpen(false);

    const { name, uid, photoURL } = useSelector(state => state.userReducer.currentUser);
    const [gigData, setGigData] = useState({
        gigUID: uuid(),
        freelancer: name,
        freelancerUID: uid,
        freelancerAvatar: photoURL,
        timesGigBought: 0,
        gigRating: 0,
        freelancerRating: 0,
        gigPostedDate: (new Date()).toDateString(),
        title: '',
        details: '',
        price: '',
        completionTime: 0,
        gigImage: 'image1.png'
    });

    const handleChange = ({ target: { name, value } }) => {
        setGigData(prevData => ({
            ...prevData,
            [name]: value
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
            const gigImageRef = firebaseStorage.child(`gig-files/${gigUID}/gigHeader`);
            await gigImageRef.put(gigImageFile).catch(e => console.error(e));
            const gigImageLink = await gigImageRef.getDownloadURL().catch(e => console.error(e));
            const gigRef = firestoreDB.doc(`gigs/${gigUID}`);
            const gigDataTemp = {
                ...gigData,
                gigImage: gigImageLink
            }
            await gigRef.set({ ...gigDataTemp }).catch(e => console.error(e));
            setGigData({ ...gigDataTemp });
        }
    }

    return (
        <div className='post-gig-page'>
            <form className={clsx(classes.root, 'add-gig-info')} onSubmit={handleSubmit}>
                <TextField variant='filled' onChange={handleChange} name='title' label='Title' />
                <TextField variant='filled' onChange={handleChange} name='details' label='Details'
                    multiline rows={6} />
                <TextField variant='filled' onChange={handleChange} name='price' label='Price' />
                <h3>Completion Time</h3>
                <div className='post-gig-completion-time'>
                    <TextField style={{ width: '10ch' }} variant='outlined' onChange={handleChange}
                        name='completionTime' label='Days' />
                    <h2>Days</h2>
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