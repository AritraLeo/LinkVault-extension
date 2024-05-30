const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.saveUrl = functions.https.onRequest(async (req, res) => {
    const url = req.body.url;

    try {
        const docRef = await admin.firestore().collection('urls').add({ url });
        res.status(200).send({ id: docRef.id });
    } catch (error) {
        res.status(500).send(error);
    }
});
