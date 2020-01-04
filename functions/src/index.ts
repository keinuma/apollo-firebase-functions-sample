import { ApolloServer } from "apollo-server-cloud-functions";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import "firebase-functions";

import typeDefs from "@/schema";

admin.initializeApp();
const db = admin.firestore();

type MovieListInput = {
  lastKey: null | string;
};

const resolvers = {
  Query: {
    popularMovies: async () => {
      const snapshot = await db
        .collection("movies")
        .orderBy("info.rank")
        .limit(10)
        .get();
      console.log(snapshot);
      return snapshot.docs.map(doc => {
        return doc.data();
      });
    },
    movieList: async (_: any, args: MovieListInput) => {
      console.log(args);
      let snapshot;
      const query = db
        .collection("movies")
        .orderBy("info.release_date", "desc");
      if (args.lastKey) {
        snapshot = await query
          .startAfter(args.lastKey)
          .limit(10)
          .get();
      } else {
        snapshot = await query.limit(10).get();
      }
      const movies = snapshot.docs.map(doc => {
        return doc.data();
      });
      let lastKey: string | null = null;
      if (movies.length) {
        lastKey = movies[movies.length - 1].info.release_date;
      }
      return {
        movies,
        lastKey
      };
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

exports.graphql = functions.https.onRequest(server.createHandler());
