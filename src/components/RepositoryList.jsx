import { FlatList, View, StyleSheet, Pressable } from "react-native"
import RepositoryItem from "./RepositoryItem"
import useRepositories from "../hooks/useRepositories"
import Text from "./Text"
import TextInput from "./TextInput"
import theme from "../theme"

import { useNavigate } from "react-router-native"
import { Picker } from "@react-native-picker/picker"
import { useState, useCallback, memo } from "react"

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  input: {
    height: 40,
    borderColor: theme.colors.background,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    margin: 10,
    backgroundColor: "white",
  },
})

const RepositoryListContainer = memo(function RepositoryListContainer({
  repositories,
  searchKeyword,
  handleSearchKeywordChange,
  orderBy,
  handlePickerValueChange,
  orderDirection,
}) {
  const navigate = useNavigate()
  const repositorynodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <>
      <TextInput
        value={searchKeyword}
        onChangeText={handleSearchKeywordChange}
        placeholder="Search"
        style={styles.input}
      />
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
    </>
  )
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT")
  const [orderDirection, setOrderDirection] = useState("DESC")
  const [searchKeyword, setSearchKeyword] = useState("")

  const variables = {
    orderBy,
    orderDirection,
    searchKeyword,
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
  const handleSearchKeywordChange = useCallback((text) => {
    setSearchKeyword(text)
  }, [])

  if (loading) {
    return <Text>Loading</Text>
  }

  return (
    <>
      <RepositoryListContainer
        repositories={repositories}
        setOrderBy={setOrderBy}
        setOrderDirection={setOrderDirection}
        setSearchKeyword={setSearchKeyword}
        searchKeyword={searchKeyword}
        handleSearchKeywordChange={handleSearchKeywordChange}
        orderDirection={orderDirection}
        handlePickerValueChange={handlePickerValueChange}
        orderBy={orderBy}
      />
    </>
  )
}

export default RepositoryList
