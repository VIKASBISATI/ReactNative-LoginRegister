import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";
export default class RegistrationScreen extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    errorMessage: null,
  };
  handleSignUp = () => {
    const { email, password, name } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        return userCredentials.user.updateProfile({
          displayName: name,
        });
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.message,
        });
      });
  };
  render() {
    const { errorMessage, email, password, name } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.greeting}>{`Hello!\n Signup to get started`} </Text>
        <View style={styles.errorMessage}>
          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </View>
        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Full Name </Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(name) => this.setState({ name })}
              autoCapitalize="none"
            ></TextInput>
          </View>
          <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(email) => this.setState({ email })}
              autoCapitalize="none"
            ></TextInput>
          </View>
          <View style={{marginTop:32}}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={(password) => this.setState({ password })}
              secureTextEntry
              autoCapitalize="none"
            ></TextInput>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.regLink}>
          <Text style={styles.regLinkText}>
            New to SocialApp?
            <Text style={{ fontWeight: "500", color: "#E9446A" }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },
  regLink: {
    marginTop: 32,
    alignSelf: "center",
  },
  regLinkText: {
    fontSize: 13,
    color: "#414959",
  },
});
