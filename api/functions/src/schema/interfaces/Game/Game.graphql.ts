import { gql } from "apollo-server-cloud-functions";
import { DocumentNode } from "graphql";
import { fireStore } from "../../../app.js";
import * as functions from "firebase-functions";

export const typeDefs: DocumentNode = gql`
	type Game {
		id: String
		title: String
	}
	type Query {
		games: [Game]
	}
`;

export const resolvers = {
	Query: {
		// games: () => games,
		games: async () => {
			const collection = fireStore.collection("games").get();
			return (await collection).docs.map(game => {
				functions.logger.log("Game Id");
				functions.logger.log(game.id);
				
				return {
					id: game.id,
					...game.data()
				}
			});
		}	
	},
};