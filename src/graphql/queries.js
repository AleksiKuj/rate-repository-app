import { gql } from "@apollo/client"

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          description
          forksCount
          fullName
          language
          ownerAvatarUrl
          reviewCount
          ratingAverage
          stargazersCount
          id
        }
      }
    }
  }
`

export const GET_REPOSITORY = gql`
  query Query($repositoryId: ID!) {
    repository(id: $repositoryId) {
      description
      forksCount
      fullName
      language
      ownerAvatarUrl
      reviewCount
      ratingAverage
      stargazersCount
      id
      url
    }
  }
`

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`
