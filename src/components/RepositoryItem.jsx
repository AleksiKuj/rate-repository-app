import { View, Image, StyleSheet, Pressable, FlatList } from "react-native"
import Text from "./Text"
import { GET_REPOSITORY } from "../graphql/queries"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router-native"
import * as Linking from "expo-linking"
import theme from "../theme"
import { format } from "date-fns"

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
  linkContainer: {
    borderRadius: 2,
    padding: 10,
    margin: 10,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
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
export const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.rating}>
        <Text color="primary">{review.rating}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text fontWeight={"bold"}>{review.user.username}</Text>
        <Text>{format(new Date(review.createdAt), "dd.MM.yyyy")}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  )
}
const ItemSeparator = () => <View style={styles.separator} />

function RepositoryDetails({ id }) {
  const { loading, error, data } = useQuery(
    GET_REPOSITORY,
    {
      variables: { repositoryId: id },
    },
    { fetchPolicy: "cache-and-network" }
  )
  console.log("data:", data)

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  const reviewNodes = data.repository.reviews
    ? data.repository.reviews.edges.map((edge) => edge.node)
    : []

  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.rowContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: data.repository.ownerAvatarUrl }}
        />
        <View style={styles.infoContainer}>
          <Text color="textPrimary" fontWeight="bold">
            {data.repository.fullName}
          </Text>
          <Text>{data.repository.description}</Text>
          <Text color="white" backgroundColor="primary" style={styles.language}>
            {data.repository.language}
          </Text>
        </View>
      </View>
      <View>
        <View style={styles.row}>
          <Count value={data.repository.stargazersCount} />
          <Count value={data.repository.forksCount} />
          <Count value={data.repository.reviewCount} />
          <Count value={data.repository.ratingAverage} />
        </View>
        <View style={styles.row}>
          <Text style={styles.cell}>Stars</Text>
          <Text style={styles.cell}>Forks </Text>
          <Text style={styles.cell}>Reviews</Text>
          <Text style={styles.cell}>Rating </Text>
        </View>
      </View>
      <Pressable
        onPress={() => Linking.openURL(data.repository.url)}
        style={styles.linkContainer}
      >
        <Text color="white" fontWeight="bold">
          Open in GitHub
        </Text>
      </Pressable>
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
      />
    </View>
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
  const { id } = useParams()

  return id ? (
    <RepositoryDetails id={id} />
  ) : (
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
