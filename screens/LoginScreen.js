import {
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView,
  Pressable,
  Platform,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { auth, signInWithGoogleAsync, db, firebase } from "../firebase";
import { SocialIcon, Text } from "react-native-elements";
import React, { useState } from "react";

const LoginScreen = ({ navigation }) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const [loaderState, setLoaderState] = useState(0);

  const onLogin = () => {
    setLoaderState(1);
    auth
      .signInWithEmailAndPassword(enteredEmail, enteredPassword)
      .then(() => {
        setLoaderState(0);
        navigation.navigate("Start");
      })
      .catch((error) => {
        alert(error.message);
        setLoaderState(0);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.image}>
        <View style={styles.mainContainer}>
          <View style={styles.loginContainer}>
            <Text style={styles.mainTitle}>Login</Text>
            <TextInput
              placeholder="Email Address"
              style={styles.input}
              onChangeText={(targetText) => setEnteredEmail(targetText)}
              value={enteredEmail}
            />
            <TextInput
              placeholder="Password"
              type="password"
              secureTextEntry
              style={styles.input}
              onChangeText={(targetText) => setEnteredPassword(targetText)}
              value={enteredPassword}
            />
            <Pressable style={styles.button}>
              {!loaderState ? (
                <Text style={styles.btnText} onPress={onLogin}>
                  Login
                </Text>
              ) : (
                <ActivityIndicator size="small" color="#fff" />
              )}
            </Pressable>
            <View style={styles.registerContainer}>
              <Text style={styles.toRegister}>To Register with us</Text>
              <Text
                style={styles.registerHere}
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                Click Here
              </Text>
            </View>

            <View style={styles.socialConatiner}>
              <SocialIcon
                style={{ backgroundColor: "#1A4ADA" }}
                onPress={signInWithGoogleAsync}
                type="google"
              />
            </View>
          </View>
        </View>
      </View>
      <StatusBar style="light" />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  loginContainer: {
    backgroundColor: "#fff",
    width: 297,
    height: 450,
    borderRadius: 20,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "grey",
    shadowOpacity: 1.0,
    display: "flex",
    alignItems: "center",
    padding: 30,
  },
  mainContainer: {
    display: "flex",
    alignItems: "center",
  },
  mainTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "700",
    fontSize: 32,
    color: "#1A4ADA",
  },
  input: {
    marginTop: 10,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    width: "100%",
  },
  button: {
    marginTop: 14,
    backgroundColor: "#1A4ADA",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  socialConatiner: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 50,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1,
    marginTop: 20,
  },
  registerContainer: {
    display: "flex",
    alignItems: "center",
  },
  toRegister: {
    marginTop: 20,
  },
  registerHere: {
    color: "#1A4ADA",
    fontWeight: "bold",
  },
});
