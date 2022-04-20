import { ApolloServer } from "apollo-server";
import * as schema from "./schema/schema";

const server = new ApolloServer(schema);
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
