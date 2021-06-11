const algoliaSearch = require('algoliasearch').default;
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const firestoreDB = admin.firestore();

const algoliaAppId = functions.config().algolia.appid;
const algoliaApiKey = functions.config().algolia.apikey;
const algoliaClient = algoliaSearch(algoliaAppId, algoliaApiKey);
const collectionIndexName = 'dollat-gigs';
const collectionIndex = algoliaClient.initIndex(collectionIndexName);

exports.sendCollectionToAlgolia = functions.https.onRequest(async (req, res) => {
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
        res.status(200).send("COLLECTION was indexed to Algolia successfully.");
    });
    res.send('hi');
})

exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
    .onCreate((snap, context) => {
        const original = snap.data().original;
        functions.logger.log('Uppercasing', context.params.documentId, original);
        const uppercase = original.toUpperCase();
        return snap.ref.set({ uppercase }, { merge: true });
    });