import { Pressable, View, StyleSheet } from "react-native"
import { Formik } from "formik"
import * as yup from "yup"
import FormikTextInput from "./FormikTextInput"
import useReview from "../hooks/useCreateReview"
import { useNavigate } from "react-router-native"

import Text from "./Text"

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
}

const styles = StyleSheet.create({
  formContainer: {
    display: "flex",
    padding: 15,
    backgroundColor: "white",
  },
  button: {
    padding: 10,
    textAlign: "center",
    borderRadius: 5,
    marginTop: 10,
  },
})

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <FormikTextInput name="ownerName" placeholder="Repository Owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" />
      <Pressable onPress={onSubmit}>
        <Text backgroundColor="primary" color="white" style={styles.button}>
          Create a review
        </Text>
      </Pressable>
    </View>
  )
}

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup.number().min(0).max(100).required("Rating is required"),
  text: yup.string(),
})

export const ReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const CreateReview = () => {
  const [createReview] = useReview()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values
    try {
      const { data } = await createReview({
        ownerName,
        repositoryName,
        rating,
        text,
      })
      navigate(`/repository/${data.createReview.repositoryId}`)
    } catch (e) {
      console.log(e)
    }
  }

  return <ReviewContainer onSubmit={onSubmit} />
}
export default CreateReview
