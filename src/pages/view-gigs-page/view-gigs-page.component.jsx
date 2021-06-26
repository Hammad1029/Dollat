import './view-gigs-page.styles.css';

import React, { useState, useEffect } from 'react';
import { firestoreDB } from '../../firebase/firebase';

import GigCard from '../../components/gig-card/gig-card.component';

const ViewGigsPage = () => {
    const [gigs, setGigs] = useState([]);

    useEffect(() => {
        const unsubscribe = firestoreDB.collection('gigs').onSnapshot(querySnapshot => {
            querySnapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    setGigs(prevData => ([
                        ...prevData,
                        change.doc.data()
                    ]))
                }
            });
        }, e => console.error(e));
        return unsubscribe;
    }, [])

    return (
        <div className='view-gigs-page'>
            <div className='view-gigs-page-banner'>
                <h1>PAKISTAN'S PREMIUM <i>freelancing</i> PLATFORM</h1>
                <h3>explore our top talent - unreal work, real freelancers</h3>
            </div>
            <div className='gigs-grid'>
                {gigs.map((gig, idx) => <GigCard key={idx} {...gig} />)}
            </div>
        </div >
    )
}

export default ViewGigsPage;