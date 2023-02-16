import { View, Pressable, StyleSheet } from "react-native"
import Text from "./Text"

const styles = StyleSheet.create({
  tab: {
    padding: 10,
  },
})

const AppBarTab = ({ title }) => {
  return (
    <View style={styles.tab}>
      <Pressable onPress={() => console.log("pressed")}>
        <Text color="white" fontWeight="bold" fontSize="subheading">
          {title}
        </Text>
      </Pressable>
    </View>
  )
}

export default AppBarTab
