import { StyleSheet } from "react-native"
import { useField } from "formik"

import TextInput from "./TextInput"
import Text from "./Text"
import theme from "../theme"

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: "#d73a4a",
  },
  inputField: {
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
  },
  errorBorder: {
    borderColor: "#d73a4a",
  },
})

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name)
  const showError = meta.touched && meta.error
  const inputStyle = [styles.inputField, showError && styles.errorBorder]

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={inputStyle}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  )
}

export default FormikTextInput
