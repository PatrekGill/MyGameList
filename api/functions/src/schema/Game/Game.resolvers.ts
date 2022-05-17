import { fireStore } from "../../app.js";

export const resolvers = {
	Query: {
		// games: () => games,
		games: async () => {
			const collection = fireStore.collection("games").get();
			return (await collection).docs.map(game => game.data());
		}	
	},
};