import { ApolloServer } from "apollo-server-cloud-functions";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import "firebase-functions";

import typeDefs from "@/schema";

admin.initializeApp();
const db = admin.firestore();

const resolvers = {
  Query: {
    latestMovies: async () => {
      const snapshot = await db
        .collection("movies")
        .orderBy("info.release_date", "desc")
        .limit(10)
        .get();
      console.log(snapshot);
      return snapshot.docs.map(doc => {
        return doc.data();
      });
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

exports.graphql = functions.https.onRequest(server.createHandler());
