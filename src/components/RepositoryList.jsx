import { useEffect, useState } from "react"
import { FlatList, View, StyleSheet } from "react-native"
import RepositoryItem from "./RepositoryItem"
import useRepositories from "../hooks/useRepositories"
import Text from "./Text"

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

export const RepositoryListContainer = ({ repositories }) => {
  const repositorynodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={repositorynodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <RepositoryItem
          key={item.key}
          id={item.id}
          fullName={item.fullName}
          description={item.description}
          language={item.language}
          forksCount={item.forksCount}
          stargazersCount={item.stargazersCount}
          ratingAverage={item.ratingAverage}
          reviewCount={item.reviewCount}
          avatar={item.ownerAvatarUrl}
        />
      )}
    />
  )
}

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
  const { repositories, loading } = useRepositories()
  if (loading) {
    return <Text>Loading</Text>
  }

  return <RepositoryListContainer repositories={repositories} />
}

export default RepositoryList
