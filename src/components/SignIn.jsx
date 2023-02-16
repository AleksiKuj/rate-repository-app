import { Pressable, View, StyleSheet } from "react-native"
import { Formik } from "formik"
import * as yup from "yup"
import FormikTextInput from "./FormikTextInput"

import Text from "./Text"
import theme from "../theme"

const initialValues = {
  username: "",
  password: "",
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

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Pressable onPress={onSubmit}>
        <Text backgroundColor="primary" color="white" style={styles.button}>
          Sign in
        </Text>
      </Pressable>
    </View>
  )
}

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
})

const SignIn = () => {
  const onSubmit = (values) => {
    const username = values.username
    const password = values.password

    if (username && password) console.log(username, password)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}
export default SignIn
