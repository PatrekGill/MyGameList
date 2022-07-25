import { makeExecutableSchema } from "@graphql-tools/schema";
import fs from "fs";
import path from "path";
import { DocumentNode } from "graphql";


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
	const schema = {
		resolvers: {},
		typeDefs: [],
	};
	
	const relativePath = "lib/schema/interfaces";
	const folderPath = path.resolve(relativePath);
	const folderNames = fs.readdirSync(folderPath);
	
	for (const folderName of folderNames) {
		const importPath = `./interfaces/${folderName}/${folderName}.graphql.js`;
		
		const importedFile = await import(importPath);
		const importedResolvers: undefined | Object = importedFile["resolvers"];
		if (importedResolvers) {
			Object.assign( 
				schema.resolvers,
				importedResolvers
			);
		}
		
		const importedTypeDefs: undefined | DocumentNode = importedFile["typeDefs"];
		if (importedTypeDefs) {
			schema.typeDefs.push(importedTypeDefs);
		}
	}

	
	return schema;
};

export const getSchema = async () => {
	const schema = await buildSchemaFromFiles();

	return {
		schema: makeExecutableSchema(schema),
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