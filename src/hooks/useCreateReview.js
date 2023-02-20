import { useMutation, useApolloClient } from "@apollo/client"
import { CREATE_REVIEW } from "../graphql/mutations"

const useReview = () => {
  const apolloClient = useApolloClient()
  const [mutate, result] = useMutation(CREATE_REVIEW)

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    try {
      const data = await mutate({
        variables: {
          repositoryName,
          ownerName,
          rating: parseInt(rating),
          text,
        },
      })
      apolloClient.resetStore()
      return data
    } catch (e) {
      console.log("Review error:", e)
      throw e
    }
  }

  return [createReview, result]
}
export default useReview
