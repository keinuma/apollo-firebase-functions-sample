import { ApolloServer, gql } from "apollo-server-cloud-functions";
import * as functions from 'firebase-functions';

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];

const resolvers = {
    Query: {
        books: () => books,
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

exports.handler = functions.https.onRequest(server.createHandler());
