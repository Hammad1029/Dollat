import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyByKX4rk0WPFNCf39y5JIpX5UUDwdI7oE4",
    authDomain: "dollat-f1d41.firebaseapp.com",
    projectId: "dollat-f1d41",
    storageBucket: "dollat-f1d41.appspot.com",
    messagingSenderId: "820913184172",
    appId: "1:820913184172:web:a2949cab4ef0a09d40ae09",
    measurementId: "G-FEZMFL3VHK"
};

firebase.initializeApp(firebaseConfig);

export const authRef = firebase.auth();
export const firestoreDB = firebase.firestore();
export const firebaseStorage = firebase.storage().ref();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => firebase.auth().signInWithPopup(provider)
    .catch(e => console.error(e));

export const createUserDocument = async user => {
    const docRef = firestoreDB.doc(`users/${user.uid}`);
    const doc = await docRef.get();
    if (doc.exists) return doc.data();
    else {
        const userData = {
            name: user.displayName,
            email: user.email,
            uid: user.uid,
            createdAt: (new Date()).toDateString(),
            gigsPosted: 0,
            gigsOnDisplay: 0,
            gigsCompleted: 0,
            gigsBought: 0
        };
        docRef.set(userData).catch(e => console.error(e));
        return userData;
    }
}

export const postGig = async (gigData, gigImageFile) => {
    const { gigUID } = gigData;
    const gigImageRef = firebaseStorage.child(`gig-files/${gigUID}/gigHeader`);
    await gigImageRef.put(gigImageFile).catch(e => console.error(e));
    const gigImageLink = await gigImageRef.getDownloadURL().catch(e => console.error(e));
    const gigRef = firestoreDB.doc(`gigs/${gigUID}`);
    const gigDataTemp = {
        ...gigData,
        gigImage: gigImageLink
    }
    await gigRef.set({ ...gigDataTemp }).catch(e => {
        console.error(e);
        return false;
    });
    return true;
}

export const buyGig = async (gigUID, details, method) => {
    const docRef = firestoreDB.collection(`gigs/${gigUID}/gigInstances`);
    docRef.add({
        active: true,
        paymentMethod: method,
        details: { ...details },
    });
}