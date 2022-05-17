import { makeExecutableSchema } from "@graphql-tools/schema";
import { gql } from "apollo-server";
import { getFirestore } from "firebase-admin/firestore";
import { App } from "firebase-admin/app";


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

const buildSchemaFromFiles = async () => {
	import("./Game/Game.resolvers.js").then(obj => {
		console.log(obj);
	});
	
	return {
	};
};

export const getSchema = (app: App) => {
	try {
		const schema = buildSchemaFromFiles();
		console.log(schema);
		
	} catch (error) {
		console.error(error);
	}
	
	const fireStore = getFirestore(app);
	
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
				const collection = fireStore.collection("games").get();
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

// export const getSchema = (app) => {return {}};