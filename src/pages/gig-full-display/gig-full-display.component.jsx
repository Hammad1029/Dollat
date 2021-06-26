import './gig-full-display.styles.css';

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestoreDB } from '../../firebase/firebase';

import { Avatar, Divider, Button } from '@material-ui/core';

import BuyGig from '../../components/buy-gig/buy-gig.component';
import CenterPopup from '../../components/center-popup/center-popup.component';
import RichTextEditor from '../../components/rich-text-editor/rich-text-editor.component';

const GigFullDisplay = () => {
    console.log('render');
    const [buyGigShown, setBuyGigShown] = useState(false);
    const handleBuyGigShown = () => {
        setBuyGigShown(!buyGigShown);
    }
    const [gigData, setGigData] = useState(null);
    const { gigUID } = useParams();
    const gigRef = firestoreDB.doc(`gigs/${gigUID}`);
    useEffect(() => {
        gigRef.get().then(doc => {
            if (doc.exists) setGigData(doc.data());
            else setGigData(false);
        })
    }, [])

    if (gigData === null) {
        return (
            <div>
            </div>
        )
    }
    else if (gigData.gigUID === undefined) {
        return (
            <h1>no gig found</h1>
        )
    } else if (gigData.gigUID === gigUID) {
        const {
            freelancer,
            freelancerAvatar,
            gigPostedDate,
            title,
            details,
            richDetails,
            price,
            completionTime,
            gigImage
        } = gigData;
        return (
            <div className='gig-full-display'>
                <div className='gig-full-display-details'>
                    <h1>{title}</h1>
                    <div className='gig-freelancer-info'>
                        <Avatar src={freelancerAvatar} alt={freelancer} />
                        <p>{freelancer}</p>
                    </div>
                    <Divider style={{ margin: '20px 0px' }} />
                    <div className='gig-display-banner'>
                        <img alt={title} src={gigImage} />
                        <RichTextEditor richDetails={richDetails} />
                    </div>
                </div>
                <div className='gig-buy'>
                    <div>
                        <p>Completion Time</p>
                        <p>{completionTime}</p>
                    </div>
                    <div>
                        <p>Price</p>
                        <p>{price}</p>
                    </div>
                    <div className='buy-gig-call-to-action'>
                        <Button style={{ padding: '30px', fontSize: '20px' }}
                            variant="contained" color="primary" onClick={handleBuyGigShown}>
                            Buy Gig
                        </Button>
                    </div>
                    <CenterPopup state={buyGigShown} handleClose={() => handleBuyGigShown()}>
                        <BuyGig gigUID={gigUID} />
                    </CenterPopup>
                </div>
            </div>
        )
    }
}

export default GigFullDisplay;
