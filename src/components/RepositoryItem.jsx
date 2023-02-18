import { View, Image, StyleSheet } from "react-native"
import Text from "./Text"
import theme from "../theme"

const Count = ({ value }) => {
  const styles = StyleSheet.create({
    cell: {
      flex: 1,
      textAlign: "center",
    },
  })
  const formatCount = (count) => {
    if (count >= 1000) {
      const formattedCount = (count / 1000).toFixed(1)
      return `${formattedCount}k`
    }
    return count.toString()
  }
  return (
    <Text fontWeight="bold" style={styles.cell}>
      {formatCount(value)}
    </Text>
  )
}

const RepositoryItem = ({
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  reviewCount,
  ratingAverage,
  avatar,
}) => {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      backgroundColor: "white",
    },
    avatar: {
      width: 55,
      height: 55,
      borderRadius: 5,
      margin: 10,
    },
    rowContainer: {
      flexDirection: "row",
    },
    infoContainer: {
      flexDirection: "column",
      marginVertical: 5,
    },
    language: {
      borderRadius: 5,
      alignSelf: "flex-start",
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginTop: 5,
    },
    table: {
      flex: 1,
      backgroundColor: "#fff",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 5,
    },
    cell: {
      flex: 1,
      textAlign: "center",
    },
  })

  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.rowContainer}>
        <Image style={styles.avatar} source={{ uri: avatar }} />
        <View style={styles.infoContainer}>
          <Text color="textPrimary" fontWeight="bold">
            {fullName}
          </Text>
          <Text>{description}</Text>
          <Text color="white" backgroundColor="primary" style={styles.language}>
            {language}
          </Text>
        </View>
      </View>
      <View style={styles.table}>
        <View style={styles.row}>
          <Count value={stargazersCount} />
          <Count value={forksCount} />
          <Count value={reviewCount} />
          <Count value={ratingAverage} />
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Stars</Text>
          <Text style={styles.cell}>Forks </Text>
          <Text style={styles.cell}>Reviews</Text>
          <Text style={styles.cell}>Rating </Text>
        </View>
      </View>
    </View>
  )
}
export default RepositoryItem
