const algoliaSearch = require('algoliasearch').default;
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const firebase = admin.initializeApp();
const storageBucket = firebase.storage().bucket();

const algoliaAppId = functions.config().algolia.appid;
const algoliaApiKey = functions.config().algolia.apikey;
const algoliaClient = algoliaSearch(algoliaAppId, algoliaApiKey);
const collectionIndexName = 'dollat-gigs';
const collectionIndex = algoliaClient.initIndex(collectionIndexName);

/*
const firestoreDB = admin.firestore();
exports.sendGigsCollectionToAlgolia = functions.https.onRequest(async (req, res) => {
    functions.logger.log(`algoliaAppId: ${algoliaAppId} --- algoliaApiKey: ${algoliaApiKey}`);
    const algoliaRecords = [];

    const querySnapshot = await firestoreDB.collection('gigs').get();
    querySnapshot.docs.forEach(doc => {
        const document = doc.data();
        const record = {
            objectID: doc.id,
            freelancer: document.freelancer,
            title: document.title,
            details: document.details
        };
        algoliaRecords.push(record);
    });

    collectionIndex.saveObjects(algoliaRecords, () => {
        res.status(200).send("Collection indexed to algolia");
    });
})
*/

const saveDocumentInAlgolia = async snapshot => {
    if (snapshot.exists) {
        const { freelancer, title, details } = snapshot.data();
        const record = {
            objectID: snapshot.id,
            freelancer: freelancer,
            title: title,
            details: details
        };
        if (record) {
            await collectionIndex.saveObject(record);
        }
    }
}

const updateDocumentInAlgolia = async change => {
    const docBeforeChange = change.before.data()
    const docAfterChange = change.after.data()
    if (docBeforeChange && docAfterChange) await deleteDocumentFromAlgolia(change.after);
}

const deleteDocumentFromAlgolia = async snapshot => {
    if (snapshot.exists) {
        const objectID = snapshot.id;
        await collectionIndex.deleteObject(objectID);
        return storageBucket.deleteFiles({
            prefix: `gig-files/${objectID}`
        }, err => {
            if (err) console.log(err);
            else console.log(`All the Firebase Storage files in users/${userId}/ have been deleted`);
        });
    }
}

exports.gigOnCreate = functions.firestore.document('gigs/{uid}')
    .onCreate(async (snapshot, context) => {
        await saveDocumentInAlgolia(snapshot);
    });

exports.gigOnUpdate = functions.firestore.document('gigs/{uid}')
    .onUpdate(async (change, context) => {
        await updateDocumentInAlgolia(change);
    });

exports.gigOnDelete = functions.firestore.document('gigs/{uid}')
    .onDelete(async (snapshot, context) => {
        await deleteDocumentFromAlgolia(snapshot);
    });
