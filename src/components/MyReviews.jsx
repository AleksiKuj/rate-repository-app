import { View, StyleSheet, FlatList, Pressable, Alert } from "react-native"
import Text from "./Text"

import theme from "../theme"
import { format } from "date-fns"
import useDeleteReview from "../hooks/useDeleteReview"
import { useQuery } from "@apollo/client"
import { ME } from "../graphql/queries"
import { useNavigate } from "react-router-native"

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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 10,
  },
  repositoryButton: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#df3a2f",
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
})

const ReviewItem = ({ review }) => {
  const [deleteReview] = useDeleteReview()

  const handleDelete = async (id) => {
    try {
      console.log(id)
      await deleteReview(id)
    } catch (e) {
      console.log(e)
    }
    console.log(" delete review", id)
  }
  const navigate = useNavigate()

  const deleteAlert = (id) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review",
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancelled delete"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDelete(id),
          style: "ok",
        },
      ],
      {
        cancelable: true,
      }
    )
  }
  const goToRepository = (id) => {
    navigate(`/repository/${id}`)
    console.log("navigate", id)
  }

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
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.deleteButton}
          onPress={() => deleteAlert(review.id)}
        >
          <Text color="white">Delete review</Text>
        </Pressable>
        <Pressable
          style={styles.repositoryButton}
          onPress={() => goToRepository(review.repository.id)}
        >
          <Text color="white">View repository</Text>
        </Pressable>
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
