const { ApolloServer } = require("apollo-server-cloud-functions");
const functions = require("firebase-functions");
const config = require("./lib/config");

const server = new ApolloServer(config);
const handler = server.createHandler({
    cors: {
        origin: true,
        credentials: true,
    },
});

exports.handler = functions.https.onRequest(handler);
