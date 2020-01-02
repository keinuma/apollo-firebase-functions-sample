import { gql } from "apollo-server-cloud-functions";

export default gql`
  type Movie {
    title: String
    year: Int
    info: MovieInfo
  }

  type MovieInfo {
    directors: [String]
    release_date: String
    rating: Float
    genres: [String]
    image_url: String
    plot: String
    rank: Int
    running_time_secs: Int
    actors: [String]
  }

  type Query {
    latestMovies: [Movie]
  }
`;
