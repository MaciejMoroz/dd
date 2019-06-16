import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage
} from "react-native";
import BasicButton from "../components/button";
// import { TextInput } from "react-native-gesture-handler";

export default class EditPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: ""
    };
  }
  componentDidMount = async () => {
    try {
      this.setState({
        oldPassword: await AsyncStorage.getItem("password")
      });
    } catch (e) {}
  };
  handleOldPassvordIsValid(passToCheck) {
    if ((passToCheck = this.state.oldPassword)) {
      console.log("poprawen");
    } else {
      console.log("niepoprawne");
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled={Platform.OS === "ios"}
      >
        <Text style={styles.title}> Zaloguj się do aplikacji</Text>
        <TextInput
          style={styles.inputContainer}
          placeholder="stare hasło"
          // value={this.state.password}
          // onChangeText={}
          returnKeyType="next"
          autoCapitalize="none"
          // onChange={e => handleOldPassvordIsValid(e.target.value)}
        />
        <TextInput
          style={[styles.inputContainer]}
          secureTextEntry
          placeholder="nowe hasło"
          // value={this.state.password}
          // onChangeText={}
          returnKeyType="done"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.inputContainer]}
          secureTextEntry
          placeholder="potwierdz hasło"
          // value={this.state.password}
          // onChangeText={this.setAndValidatePassword}
          returnKeyType="done"
          autoCapitalize="none"
        />
        {this.state.isPasswordInvalid && (
          <Text style={styles.invalidPassword}>Hasło jest za krótkie</Text>
        )}
        <BasicButton
          title="potwierdz"
          style={styles.loginButton}
          disabled={!this.state.canSubmit}
          onPress={this.mockLogin}
        />
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 32,
    justifyContent: "center"
  },
  loginButton: {
    marginTop: 16,
    backgroundColor: "#4E00B1"
  },
  inputContainer: {
    margin: 8,
    paddingHorizontal: 8,
    paddingVertical: 16,
    fontSize: 20
  },
  invalidPassword: {
    color: "red"
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    textAlign: "center"
  }
});
