import { useMutation, useApolloClient } from "@apollo/client"
import { SIGN_IN } from "../graphql/mutations"

import { useAuthStorage } from "./useAuthStorage"

const useSignIn = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const [mutate, result] = useMutation(SIGN_IN)

  const signIn = async ({ username, password }) => {
    try {
      const data = await mutate({
        variables: { username, password },
      })
      console.log("token", data.data.authenticate.accessToken)
      await authStorage.setAccessToken(data.data.authenticate.accessToken)
      apolloClient.resetStore()
      return data
    } catch (e) {
      console.log("signIn error:", e)
      throw e
    }
  }

  return [signIn, result]
}
export default useSignIn
