import { useMutation } from "@apollo/client"
import { SIGN_IN } from "../graphql/mutations"

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN)

  const signIn = async ({ username, password }) => {
    try {
      const data = await mutate({
        variables: { username, password },
      })
      return data
    } catch (e) {
      console.log("signIn error:", e)
      throw e
    }
  }

  return [signIn, result]
}
export default useSignIn
