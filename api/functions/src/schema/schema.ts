import { makeExecutableSchema } from "@graphql-tools/schema";
import * as admin from "firebase-admin";
import { gql } from "apollo-server";
import * as logger from "firebase-functions/logger";
import { getFirestore } from "firebase-admin/firestore";


// const games = [
//     {
//         id: 1,
//         title: "Mass Effect",
//     },
//     {
//         id: 2,
//         title: "Mass Effect 2",
//     },
//     {
//         id: 3,
//         title: "Mass Effect 3",
//     },
// ];

interface Game {
    id: number;
    title: String;
}

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.

// const games = async () => {
//     const games = await admin.firestore().collection("games").get();
//     return games.docs.map((game) => game.data()) as Game[];
// };

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.

const getSchema = (app: admin.app.App) => {
	const firestore = getFirestore(app);
	
	const typeDefs = gql`
	    type Game {
	        id: Int
	        title: String
	    }
	    type Query {
	        games: [Game]
	    }
	`;


	const resolvers = {
		Query: {
			// games: () => games,
			games: async () => {
				const collection = firestore.collection("games").get();
				return (await collection).docs.map(game => game.data());
			}	
		},
	};

	return {
		schema: makeExecutableSchema({
			typeDefs,
			resolvers,
		}),
		// Bonus function, to remove stack trace on production
		// https://www.apollographql.com/docs/apollo-server/features/errors
		formatError: (error: any) => {
			if (process.env.NODE_ENV === "production") {
				delete error.extensions.exception;
			}
			return error;
		},
	}
}

module.exports = {
	getSchema
};