import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {getFirestore} from "firebase-admin/firestore";
import { ApolloServer } from "apollo-server-cloud-functions";
const {getSchema} = require("./schema/schema");

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

/*
const server = new ApolloServer(schema);
const cors = {
    origin: true,
    credentials: true,
};

const apolloHandler = server.createHandler({
    expressGetMiddlewareOptions: { cors },
});

exports.graphql = async function (event, context, next) {
    return apolloHandler(event, context, next);
};
*/
const main = () => {
	process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
	const serviceAccount = require("../private/service-account.json");
	const app = admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: "https://my-game-list-41bd5.firebaseio.com",
	});
	
	const schema = getSchema(app);
	const server = new ApolloServer(schema);
	const cors = {
		origin: true,
		credentials: true,
	};
	
	const apolloHandler = server.createHandler({
		expressGetMiddlewareOptions: { cors },
	});

	module.exports = {
		graphql: functions.https.onRequest(
			(req,resp) => {
				return apolloHandler(req,resp,() => {});
			}
		),
	}
}

main();
