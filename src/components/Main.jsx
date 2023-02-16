import Constants from "expo-constants"
import { StyleSheet, View } from "react-native"
import RepositoryList from "./RepositoryList"
import Text from "./Text"
import AppBar from "./AppBar"

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Text fontWeight="bold" fontSize="subheading">
        Rate Repository Application
      </Text>
      <RepositoryList />
    </View>
  )
}

export default Main
