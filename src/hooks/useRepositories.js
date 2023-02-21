import { useState } from "react"
import { useQuery } from "@apollo/client"

import { GET_REPOSITORIES } from "../graphql/queries"

const useRepositories = (order) => {
  const [repositories, setRepositories] = useState()
  const { data, error, loading, fetchMore } = useQuery(
    GET_REPOSITORIES,
    { variables: order },
    {
      fetchPolicy: "cache-and-network",
    }
  )

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...order,
      },
    })
  }

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
  }
}

export default useRepositories
