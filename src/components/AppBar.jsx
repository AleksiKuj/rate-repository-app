import { View, StyleSheet, ScrollView } from "react-native"
import Constants from "expo-constants"
import theme from "../theme"
import AppBarTab from "./AppBarTab"

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.background,
    display: "flex",
    flexDirection: "row",
  },
})
const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab style={styles.tab} title="Repositories" link="/" />
        <AppBarTab style={styles.tab} title="Sign in" link="/signin" />
      </ScrollView>
    </View>
  )
}

export default AppBar
