import * as functions from "firebase-functions";
import { ApolloServer } from "apollo-server-cloud-functions";
const { app } = require("./app");
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
