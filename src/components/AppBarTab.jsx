import { View, Pressable, StyleSheet } from "react-native"
import { Link } from "react-router-native"
import Text from "./Text"

const styles = StyleSheet.create({
  tab: {
    padding: 10,
  },
})

const AppBarTab = ({ title, link }) => {
  return (
    <View style={styles.tab}>
      <Link to={link}>
        <Text color="white" fontWeight="bold" fontSize="subheading">
          {title}
        </Text>
      </Link>
    </View>
  )
}

export default AppBarTab
