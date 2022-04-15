const functions = require("firebase-functions");

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//     functions.logger.info("Hello logs!", { structuredData: true });
//     response.send("Hello from Firebase!");
// });

const { ApolloServer } = require("apollo-server-cloud-functions");
const schema = require("./src/schema");

const server = new ApolloServer(schema);
const handler = server.createHandler({
    cors: {
        origin: true,
        credentials: true,
    },
});

exports.handler = functions.https.onRequest(handler);

