import { gql } from "apollo-server-cloud-functions";
import { DocumentNode } from "graphql";

export const typeDefs: DocumentNode = gql`
	type Platform {
		name: String
	}

	type Game {
		id: String
		title: String
		description: String
		platforms: [Platform]
		tags: [String]
		creationDate: String
	}
	type Query {
		games: [Game]
	}
`;

export const resolvers = {
	Query: {
		// games: () => games,
		games: async () => {
			const {fireStore} = await import("../../../app.js");
			const collection = fireStore.collection("games").get();
			return (await collection).docs.map(async game => {
				const functions = await import("firebase-functions");
				// functions.logger.log("Game Date:");
				// functions.logger.log("Game createTime:");
				// functions.logger.log(game.createTime);

				// functions.logger.log("Game creationDate:");
				// functions.logger.log(game.data().creationDate);

				// functions.logger.log("Game creationDate seconds:");
				// functions.logger.log(game.data().creationDate.seconds);

				functions.logger.log("Game new Date:");
				functions.logger.log(new Date(game.data().creationDate.seconds * 1000).toLocaleTimeString());
				
				return {
					id: game.id,
					...game.data()
				}
			});
		}	
	},
};