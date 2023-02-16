import { View } from "react-native"
import Text from "./Text"
const RepositoryItem = ({
  fullName,
  description,
  language,
  forksCount,
  stargazersCount,
  reviewCount,
  ratingAverage,
}) => {
  return (
    <View>
      <Text color="textPrimary" fontWeight="bold">
        Full name: {fullName}
      </Text>
      <Text>Description: {description}</Text>
      <Text>Language: {language}</Text>
      <Text>Stars: {stargazersCount}</Text>
      <Text>Forks: {forksCount}</Text>
      <Text>Reviews: {reviewCount}</Text>
      <Text>Rating: {ratingAverage}</Text>
    </View>
  )
}
export default RepositoryItem
