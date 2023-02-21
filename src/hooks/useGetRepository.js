import { useState } from "react"
import { useQuery } from "@apollo/client"

import { GET_REPOSITORY } from "../graphql/queries"

const useGetRepository = (repositoryId) => {
  const [repository, setRepository] = useState()
  const { data, error, loading, fetchMore } = useQuery(
    GET_REPOSITORY,
    { variables: repositoryId },
    {
      fetchPolicy: "cache-and-network",
    }
  )

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...repositoryId,
      },
    })
  }

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
  }
}

export default useGetRepository
