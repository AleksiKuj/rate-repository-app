import { render } from "@testing-library/react-native"
import { RepositoryListContainer } from "../../components/RepositoryList"

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      }

      // Add your test code here
      const { debug, getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      )
      const repositoryItems = getAllByTestId("repositoryItem")
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems

      const firstRepository = repositories.edges[0].node
      const secondRepository = repositories.edges[1].node

      debug()
      expect(firstRepositoryItem).toHaveTextContent(firstRepository.fullName)
      expect(secondRepositoryItem).toHaveTextContent(secondRepository.fullName)

      expect(firstRepositoryItem).toHaveTextContent(firstRepository.description)
      expect(secondRepositoryItem).toHaveTextContent(
        secondRepository.description
      )

      expect(firstRepositoryItem).toHaveTextContent(firstRepository.language)
      expect(secondRepositoryItem).toHaveTextContent(secondRepository.language)

      expect(firstRepositoryItem).toHaveTextContent("1.6k")
      expect(secondRepositoryItem).toHaveTextContent(
        secondRepository.forksCount
      )

      expect(firstRepositoryItem).toHaveTextContent("21.9k")
      expect(secondRepositoryItem).toHaveTextContent("1.8k")

      expect(firstRepositoryItem).toHaveTextContent(firstRepository.reviewCount)
      expect(secondRepositoryItem).toHaveTextContent(
        secondRepository.reviewCount
      )
    })
  })
})
