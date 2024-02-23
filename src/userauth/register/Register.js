import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Linking,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import globalStyles from "../../../globalstyle";
import { TextInput, Text, Button, ActivityIndicator } from "react-native-paper";
import { useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerApi } from "../../service/apicalls";
import ShowToast from "../../utility/ShowToast";

const Register = ({ navigation }) => {
  const theme = useTheme();
  const [user, setUser] = useState({
    fullName: { value: "", error: "" },
    emailAddress: { value: "", error: "" },
    mobileNumber: { value: "", error: "" },
    referralCode: { value: "", error: "" },
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (fieldName, value) => {
    // Regex patterns for validation
    const regexPatterns = {
      fullName: /^[a-zA-Z ]*$/,
      emailAddress: /^$|^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      mobileNumber: /^[0-9]{10}$/,
      referralCode: /^[a-zA-Z0-9]*$/,
    };

    // Check if the value matches the regex pattern
    const isValid = regexPatterns[fieldName].test(value);

    setUser((prevUser) => ({
      ...prevUser,
      [fieldName]: {
        value,
        error: isValid ? "" : `Invalid ${fieldName}`,
      },
    }));
  };

  const submitUser = async () => {
    const allFields = Object.keys(user).map((key) => user[key].error);
    if (allFields.some((error) => error !== "")) {
      return;
    }
    setLoading(true);
    const data = {
      name: user.fullName.value,
      mobile: user.mobileNumber.value,
      email: user.emailAddress.value,
      referral_code: user.referralCode.value,
    };
    await registerApi(data)
      .then((res) => {
        if (res.success) {
          AsyncStorage.setItem("mobileNumber", data.mobile);
          ShowToast(res?.message)
          navigation.navigate("otpverify");
        } else {
          console.log(res?.message)
          ShowToast(res?.message)
        }
        setLoading(false);
      })
  };

  const handleLinkPress = (url) => {
    // Linking.openURL(url); // Replace with your URL
  };

  const handleInputSubmit = (nextField) => {
    // Focus on the next input field
    if (nextField) {
      nextField.focus();
    } else {
      // If there is no next input field, perform the submit action
      // submitUser();
    }
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          color={theme.colors.blue}
          style={globalStyles.loading}
        />
      ) : (
        ""
      )}
      <View
        style={[
          styles.container,
          { paddingTop: 0 },
          { paddingBottom: Platform.OS === "ios" ? 10 : 0 },
        ]}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.topContent}>
            <Text variant="titleMedium" style={styles.textHeading}>
              Sign Up
            </Text>
            <TextInput
              mode="flat"
              label="Full Name"
              value={user.fullName.value}
              onChangeText={(text) => handleInputChange("fullName", text)}
              onSubmitEditing={() => handleInputSubmit(mobileInputRef)}
              error={user.fullName.error !== ""}
              outlineColor={theme.colors.gray}
              selectionColor={theme.colors.primary}
              activeOutlineColor={theme.colors.primary}
              style={styles.textInput}
            />
            <Text style={{ color: "red" }}>{user.fullName.error}</Text>
            <TextInput
              keyboardType="numeric"
              mode="flat"
              label="Mobile Number"
              value={user.mobileNumber.value}
              onChangeText={(text) => handleInputChange("mobileNumber", text)}
              ref={(ref) => (mobileInputRef = ref)}
              onSubmitEditing={() => handleInputSubmit(emailInputRef)}
              error={user.mobileNumber.error !== ""}
              outlineColor={theme.colors.gray}
              selectionColor={theme.colors.primary}
              activeOutlineColor={theme.colors.primary}
              style={{ ...styles.textInput, paddingTop: 0, paddingBottom: 0 }}
            />
            <Text style={{ color: "red" }}>{user.mobileNumber.error}</Text>
            <TextInput
              keyboardType="email-address"
              mode="flat"
              label="Email Address"
              value={user.emailAddress.value}
              onChangeText={(text) => handleInputChange("emailAddress", text)}
              ref={(ref) => (emailInputRef = ref)}
              onSubmitEditing={() => handleInputSubmit(invtecodeInputRef)}
              error={user.emailAddress.error !== ""}
              outlineColor={theme.colors.gray}
              selectionColor={theme.colors.primary}
              activeOutlineColor={theme.colors.primary}
              style={styles.textInput}
            />
            <Text style={{ color: "red" }}>{user.emailAddress.error}</Text>
            <TextInput
              mode="flat"
              label="Invite Code (Optional)"
              value={user.referralCode.value}
              onChangeText={(text) => handleInputChange("referralCode", text)}
              ref={(ref) => (invtecodeInputRef = ref)}
              error={false}
              outlineColor={theme.colors.gray}
              selectionColor={theme.colors.primary}
              activeOutlineColor={theme.colors.primary}
              style={styles.textInput}
              labelStyle={{ paddingTop: 0, paddingBottom: 0 }}
            />
          </View>
          <View style={styles.space}>
            <View style={styles.bottomContent}>
              <Text style={styles.text}>
                By selecting Agree and continue , I agree to Dynamic Layers{" "}
                <Text
                  style={styles.linking}
                  onPress={() => handleLinkPress("#3")}
                >
                  {" "}
                  Terms of Service
                </Text>
                ,
                <Text
                  style={styles.linking}
                  onPress={() => handleLinkPress("#1")}
                >
                  {" "}
                  Payments Terms of Service
                </Text>{" "}
                and{" "}
                <Text
                  style={styles.linking}
                  onPress={() => handleLinkPress("#2")}
                >
                  {" "}
                  Notification Policy
                </Text>{" "}
                and acknowledge the
                <Text
                  style={styles.linking}
                  onPress={() => handleLinkPress("#4")}
                >
                  {" "}
                  Privacy Policy{" "}
                </Text>
                .
              </Text>
              <Button
                labelStyle={[styles.mainButton, { borderRadius: 1 }]}
                style={{ borderRadius: 8 }}
                buttonColor={theme.colors.blue}
                disabled={
                  user.fullName.value == "" ||
                  user.mobileNumber.value == "" ||
                  user.fullName.error !== "" ||
                  user.mobileNumber.error !== "" ||
                  user.emailAddress.error !== ""
                }
                loading={false}
                mode="contained"
                onPress={submitUser}
              >
                Agree and continue
              </Button>
              <Text
                style={[styles.text, { textAlign: "center" }, { marginTop: 8 }]}
              >
                Already have an account{" "}
                <Text
                  style={[
                    styles.linking,
                    { textDecorationLine: "underline" },
                    { paddingBottom: 0 },
                  ]}
                  onPress={() => navigation.navigate("login")}
                >
                  Login
                </Text>{" "}
                here
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.backgroundColor.backgroundColor,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 0,
    paddingHorizontal: 16,
  },
  textHeading: {
    textAlign: "center",
    padding: 16,
    color: globalStyles.textColor.blackColor,
  },
  formBox: {
    paddingVertical: 8,
  },
  textInput: {
    marginTop: 8,
    height: 56,
    backgroundColor: "#e5e5e88a",
  },
  mainButton: {
    paddingVertical: 8,
    fontSize: 17,
    fontWeight: "bold",
  },
  text: {
    fontSize: globalStyles.fonts.textSize,
    marginBottom: 16,
  },
  linking: {
    color: globalStyles.textColor.blueCOlor,
    fontWeight: "700",
  },
  topContent: {
    marginTop: 20,
  },
  space: {
    flex: 1,
    justifyContent: "flex-end",
    height: "100%",
  },
  bottomContent: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 10,
  },
});

export default Register;
