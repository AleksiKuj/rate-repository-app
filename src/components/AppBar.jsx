import { View, StyleSheet, ScrollView, Pressable } from "react-native"
import { useApolloClient, useQuery } from "@apollo/client"
import { ME } from "../graphql/queries"
import { useAuthStorage } from "../hooks/useAuthStorage"
import Constants from "expo-constants"
import theme from "../theme"
import AppBarTab from "./AppBarTab"
import Text from "./Text"

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background,
    display: "flex",
    flexDirection: "row",
  },
  tabButton: {
    padding: 10,
  },
})

const AppBar = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const { data, error, loading } = useQuery(ME)

  const handleSignOut = async () => {
    try {
      await authStorage.removeAccessToken()
      apolloClient.resetStore()
      console.log("removed token")
    } catch (e) {
      console.log(e)
    }
  }
  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab title="Repositories" link="/" />
        {!data.me ? (
          <>
            <AppBarTab title="Sign in" link="/signin" />
            <AppBarTab title="Sign up" link="/signup" />
          </>
        ) : (
          <>
            <AppBarTab title="Create a review" link="/createreview" />
            <Pressable style={styles.tabButton} onPress={handleSignOut}>
              <Text color="white" fontWeight="bold" fontSize="subheading">
                Sign out
              </Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
