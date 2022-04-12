const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    # This "Book" type defines the queryable fields for every book in our data source.
    type Book {
        title: String
        author: String
    }
	type Game {
		title: String
	}
	input GameInput {
		title: String
	}

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        books: [Book]
		games: [Game]
    }

	type Mutation {
		addGame(game: GameInput): [Game]
	}
`;

const fakeDatabase = {
	books: [
		{
			title: "The Awakening",
			author: "Kate Chopin",
		},
		{
			title: "City of Glass",
			author: "Paul Auster",
		},
	],
	games: [
		{
			title: "Mass Effect",
		},
		{
			title: "Mass Effect 2",
		},
		{
			title: "Mass Effect 3",
		},
	]
};


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: () => fakeDatabase.books,
        games: () => fakeDatabase.games,
    },
	Mutation: {
		addGame: (root,args,context,info) => {
			fakeDatabase.games.push(args.game);
			return fakeDatabase.games;
		},
	}
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
