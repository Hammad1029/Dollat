import './view-gigs-page.styles.css';

import React, { useState, useEffect } from 'react';
import { firestoreDB } from '../../firebase/firebase';
import { useLocation } from "react-router-dom";

import GigCard from '../../components/gig-card/gig-card.component';

const useQuery = () => new URLSearchParams(useLocation().search);

const ViewGigsPage = () => {
    const query = useQuery();
    const searchQuery = query.get('search');
    const [gigs, setGigs] = useState([]);
    useEffect(() => {
        if (searchQuery) {
            firestoreDB.collection('gigs').where('title', '==', searchQuery).get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        setGigs(prevData => ([
                            ...prevData,
                            doc.data()
                        ]))
                    })
                }).catch(e => console.error(e));
        } else {
            firestoreDB.collection('gigs').onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        setGigs(prevData => ([
                            ...prevData,
                            change.doc.data()
                        ]))
                    }
                });
            })
        }
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