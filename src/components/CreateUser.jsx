import { Pressable, View, StyleSheet } from "react-native"
import { Formik } from "formik"
import * as yup from "yup"
import FormikTextInput from "./FormikTextInput"
import useCreateUser from "../hooks/useCreateuser"
import useSignIn from "../hooks/useSignIn"
import { useNavigate } from "react-router-native"

import Text from "./Text"

const initialValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
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

const CreateUserForm = ({ onSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput
        name="passwordConfirmation"
        placeholder="Password confirmation"
        secureTextEntry
      />
      <Pressable onPress={onSubmit}>
        <Text backgroundColor="primary" color="white" style={styles.button}>
          Sign up
        </Text>
      </Pressable>
    </View>
  )
}

const validationSchema = yup.object().shape({
  username: yup.string().min(1).max(30).required("Username is required"),
  password: yup.string().min(5).max(50).required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords dont match")
    .required("Password confirmation is required"),
})

export const CreateUserContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateUserForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const CreateUser = () => {
  const [createUser] = useCreateUser()
  const [signIn] = useSignIn()
  const navigate = useNavigate()
  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      const { data } = await createUser({ username, password })
      await signIn({ username, password })
      console.log(data)
      navigate("/")
    } catch (e) {
      console.log(e)
    }
  }

  return <CreateUserContainer onSubmit={onSubmit} />
}
export default CreateUser
