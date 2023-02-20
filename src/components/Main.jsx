import { StyleSheet, View } from "react-native"
import { Route, Routes, Navigate } from "react-router-native"

import RepositoryList from "./RepositoryList"
import RepositoryItem from "./RepositoryItem"
import AppBar from "./AppBar"
import SignIn from "./SignIn"
import CreateReview from "./CreateReview"
import CreateUser from "./CreateUser"
import MyReviews from "./MyReviews"
import theme from "../theme"

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="/repository/:id" element={<RepositoryItem />} exact />
        <Route path="/createreview" element={<CreateReview />} exact />
        <Route path="/signup" element={<CreateUser />} exact />
        <Route path="/myreviews" element={<MyReviews />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  )
}

export default Main
