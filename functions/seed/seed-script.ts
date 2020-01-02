import * as admin from "firebase-admin";
import MovieData from "./moviedata.json";

admin.initializeApp();

const db = admin.firestore();
MovieData.forEach(async movie => {
  await db.collection("movies").add(movie);
});
