import { TextInput, Pressable, View, StyleSheet } from "react-native"
import { Formik, useField } from "formik"
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
  inputField: {
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
  },
})

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        style={styles.inputField}
      />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry
        style={styles.inputField}
      />
      <Pressable onPress={onSubmit}>
        <Text backgroundColor="primary" color="white" style={styles.button}>
          Sign in
        </Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const onSubmit = (values) => {
    const username = values.username
    const password = values.password

    if (username && password) console.log(username, password)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}
export default SignIn
