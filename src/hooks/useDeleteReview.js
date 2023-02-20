import { useMutation, useApolloClient } from "@apollo/client"
import { DELETE_REVIEW } from "../graphql/mutations"

const useDeleteReview = () => {
  const apolloClient = useApolloClient()
  const [mutate, result] = useMutation(DELETE_REVIEW)

  const deleteReview = async (id) => {
    try {
      const data = await mutate({
        variables: {
          deleteReviewId: id,
        },
      })
      apolloClient.resetStore()
      return data
    } catch (e) {
      console.log("Delete error:", e)
      throw e
    }
  }

  return [deleteReview, result]
}
export default useDeleteReview
