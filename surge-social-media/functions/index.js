/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Enable the helloWorld function
exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

// Add any additional functions below as needed

// Example: Firestore trigger
// const { onDocumentCreated } = require("firebase-functions/v2/firestore");
// exports.logNewDocument = onDocumentCreated("/my-collection/{docId}", (event) => {
//   logger.info(`New document created: ${event.data}`);
// });
