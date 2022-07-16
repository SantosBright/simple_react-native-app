import { gql } from "@apollo/client";

export const getAllJobs = gql`
  query {
    jobs {
      id
      title
      createdAt
      company {
        name
      }
    }
  }
`;
