import { useMutation, useApolloClient } from "@apollo/client"
import { CREATE_USER } from "../graphql/mutations"

const useCreateUser = () => {
  const apolloClient = useApolloClient()
  const [mutate, result] = useMutation(CREATE_USER)

  const createUser = async ({ username, password }) => {
    try {
      const data = await mutate({
        variables: { username, password },
      })
      console.log("create user data:", data)
      apolloClient.resetStore()
      return data
    } catch (e) {
      console.log("createuser error:", e)
      throw e
    }
  }

  return [createUser, result]
}
export default useCreateUser
