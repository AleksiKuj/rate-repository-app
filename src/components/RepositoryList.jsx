import { FlatList, View, StyleSheet, Pressable } from "react-native"
import RepositoryItem from "./RepositoryItem"
import useRepositories from "../hooks/useRepositories"
import Text from "./Text"
import { useNavigate } from "react-router-native"
import { Picker } from "@react-native-picker/picker"
import { useState } from "react"

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate()
  const repositorynodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={repositorynodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem
            key={item.key}
            fullName={item.fullName}
            description={item.description}
            language={item.language}
            forksCount={item.forksCount}
            stargazersCount={item.stargazersCount}
            ratingAverage={item.ratingAverage}
            reviewCount={item.reviewCount}
            avatar={item.ownerAvatarUrl}
          />
        </Pressable>
      )}
    />
  )
}

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT")
  const [orderDirection, setOrderDirection] = useState("DESC")

  const variables = {
    orderBy,
    orderDirection,
  }

  const { repositories, loading } = useRepositories(variables)

  const handlePickerValueChange = (itemValue) => {
    setOrderBy(itemValue)
    if (itemValue === "LOWEST_RATED") {
      setOrderDirection("ASC")
      setOrderBy("RATING_AVERAGE")
    } else {
      setOrderDirection("DESC")
    }
  }

  if (loading) {
    return <Text>Loading</Text>
  }

  return (
    <>
      <Picker selectedValue={orderBy} onValueChange={handlePickerValueChange}>
        <Picker.Item label="Latest Repositories" value="CREATED_AT" />
        <Picker.Item
          label={
            orderDirection === "DESC"
              ? "Highest rated repositories"
              : "Lowest rated repositories"
          }
          value="RATING_AVERAGE"
        />
        <Picker.Item label="Lowest rated repositories" value="LOWEST_RATED" />
      </Picker>
      <RepositoryListContainer repositories={repositories} />
    </>
  )
}

export default RepositoryList
