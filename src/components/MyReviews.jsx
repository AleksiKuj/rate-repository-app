import { View, StyleSheet, FlatList } from "react-native"
import Text from "./Text"

import theme from "../theme"
import { format } from "date-fns"
import { useQuery } from "@apollo/client"
import { ME } from "../graphql/queries"

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    flex: 1,
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.mainBackground,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 5,
    margin: 10,
  },

  infoContainer: {
    flexDirection: "column",
    marginVertical: 5,
  },
  reviewContainer: {
    display: "flex",
    flexDirection: "row",
  },
  rating: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    margin: 10,
    borderWidth: 2,
    color: theme.colors.primary,
    borderColor: theme.colors.primary,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  reviewText: {
    flexWrap: "wrap",
    marginRight: 50,
  },
})

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.reviewContainer}>
        <View style={styles.rating}>
          <Text color="primary">{review.rating}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text fontWeight={"bold"}>{review.repository.fullName}</Text>
          <Text>{format(new Date(review.createdAt), "dd.MM.yyyy")}</Text>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>
    </View>
  )
}
const ItemSeparator = () => <View style={styles.separator} />

const MyReviews = () => {
  const { data, error, loading } = useQuery(ME, {
    variables: { includeReviews: true },
  })
  console.log("data:", data)

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  const reviewNodes = data.me.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} key={item.key} />}
      keyExtractor={({ id }) => id}
    />
  )
}
export default MyReviews
