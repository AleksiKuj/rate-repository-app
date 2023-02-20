import { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"

import { GET_REPOSITORIES } from "../graphql/queries"

const useRepositories = (order) => {
  const [repositories, setRepositories] = useState()
  const { data, error, loading } = useQuery(
    GET_REPOSITORIES,
    { variables: order },
    {
      fetchPolicy: "cache-and-network",
    }
  )

  useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [data])

  return {
    repositories: data?.repositories,
    loading,
  }
}

export default useRepositories
