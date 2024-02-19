import { Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, Text, Modal, Portal, TextInput, useTheme, RadioButton, ActivityIndicator } from 'react-native-paper';
import Header from '../header/Header';
import globalStyles from '../../../globalstyle';
import { UserContext } from '../../userDetail/Userdetail';
import { deposit } from '../../service/apicalls';
import ShowToast from '../../utility/ShowToast';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';

const Withdrawcoin = ({ navigation }) => {
    const theme = useTheme();
    const { userDetail, setUserDetail } = useContext(UserContext);
    const [coin, setCoin] = useState('100');
    const [error, setError] = useState(false);
    const [checked, setChecked] = useState('upi');
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        upi: { value: "", error: "" },
        account_number: { value: "", error: "" },
        ifsc_code: { value: "", error: "" },
        holder_name: { value: "", error: "" },
    });

    const handleCoinChange = (text) => {
        if (text !== '') {
            setError(false);
        } else {
            setError(true);
        }
        setCoin(text);
    };
    const handleInputChange = (fieldName, value) => {
        // Regex patterns for validation
        const regexPatterns = {
            upi: /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/,
            account_number: /^[0-9]{9,18}$/,
            ifsc_code: /^[A-Z]{4}0[A-Z0-9]{6}$/,
            holder_name: /^[a-zA-Z ]+$/,
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
    const handleInputSubmit = (nextField) => {
        // Focus on the next input field
        if (nextField) {
            nextField.focus();
        } else {
            // If there is no next input field, perform the submit action
            // submitUser();
        }
    };

    const makePayment = () => {
        console.log("user", user)
    };

    return (
        <>
            {loading ? (
                <ActivityIndicator animating={true} size='large' color={globalStyles.backgroundColor.primaryBlue} />
            ) : (
                <>
                    <View style={globalStyles.container}>
                        <Header title="Withdraw Coin" navigation={navigation} />
                        <ScrollView style={[globalStyles.scrollContainer, globalStyles.scrollContainerNoContent]}>
                            <View style={{ marginVertical: 20 }}>
                                <RadioButton.Group onValueChange={(value) => setChecked(value)} value={checked}>
                                    <View style={[styles.paymentMode, { borderColor: checked === "upi" ? "#007AFF" : "transparent" }]} >
                                        <View style={[{ flexDirection: 'row' }, { alignItems: 'center' }, { justifyContent: 'flex-start' }]} >
                                            <RadioButton.Item color="#007AFF" value="upi" style={{ margin: 0, padding: 0 }} />
                                            <Text>Pay With Upi</Text>
                                        </View>
                                        <View>
                                            <Image
                                                source={require('../../../assets/images/upi.png')}
                                                style={{
                                                    width: 85,
                                                    height: 31,
                                                    objectFit: 'contain'
                                                }}
                                            />
                                        </View>
                                    </View>
                                    <View style={[styles.paymentMode, { marginTop: 15 }, { borderColor: checked === "bank" ? "#007AFF" : "transparent" }]}>
                                        <View style={[{ flexDirection: 'row' }, { alignItems: 'center' }, { justifyContent: 'flex-start' }]} >
                                            <RadioButton.Item color="#007AFF" value="bank" style={{ margin: 0, padding: 0 }} />
                                            <Text>Pay With Bank</Text>
                                        </View>
                                        <View>
                                            <Image
                                                source={require('../../../assets/images/netbanking.png')}
                                                style={{
                                                    width: 115,
                                                    height: 31,
                                                    objectFit: 'contain'
                                                }}
                                            />
                                        </View>
                                    </View>
                                </RadioButton.Group>
                            </View>
                            {checked === "upi" &&
                                <View>
                                    <Text variant="titleMedium">Withdraw Coin Using UPI</Text>
                                    <TextInput
                                        keyboardType="numeric"
                                        mode="flat"
                                        value={coin}
                                        onChangeText={(text) => handleCoinChange(text)}
                                        error={error}
                                        outlineColor={theme.colors.gray}
                                        selectionColor={theme.colors.primary}
                                        activeOutlineColor={theme.colors.primary}
                                        style={styles.textInput}
                                    />
                                    <Text style={{ color: 'red', marginBottom: error ? 5 : 0, paddingLeft: 5 }}>{error ? "Coin must be i multiple of 50" : ""} </Text>
                                    <View style={[globalStyles.displayRowbetween, { marginBottom: 10 }]}>
                                        {[50, 100, 200, 500].map((value) => (
                                            <Button
                                                buttonColor='#E2E2E2' textColor='#333333' labelStyle={globalStyles.graySmallButton} style={{ marginRight: 4 }} mode="contained"
                                                key={value}
                                                onPress={() => setCoin(String(value))}
                                            >{`${value}`}</Button>
                                        ))}
                                    </View>
                                    <Text variant="titleMedium" style={{ marginTop: 10 }}>Withdraw Coin Using UPI</Text>
                                    <TextInput
                                        mode="flat"
                                        label="UPI Id"
                                        value={user.upi.value}
                                        onChangeText={(text) => handleInputChange("upi", text)}
                                        error={user.upi.error !== ""}
                                        outlineColor={theme.colors.gray}
                                        selectionColor={theme.colors.primary}
                                        activeOutlineColor={theme.colors.primary}
                                        style={styles.textInput}
                                    />
                                    <Text style={{ color: "red" }}>{user.upi.error}</Text>

                                </View>
                            }
                            {checked === "bank" &&
                                <View>
                                    <Text variant="titleMedium">Withdraw Coin Using Bank</Text>
                                    <TextInput
                                        keyboardType="numeric"
                                        mode="flat"
                                        value={coin}
                                        onChangeText={(text) => handleCoinChange(text)}
                                        error={error}
                                        outlineColor={theme.colors.gray}
                                        selectionColor={theme.colors.primary}
                                        activeOutlineColor={theme.colors.primary}
                                        style={styles.textInput}
                                    />
                                    <Text style={{ color: 'red', marginBottom: error ? 5 : 0, paddingLeft: 5 }}>{error ? "Coin must be i multiple of 50" : ""} </Text>

                                    <View style={[globalStyles.displayRowbetween, { marginBottom: 10 }]}>
                                        {[50, 100, 200, 500].map((value) => (
                                            <Button
                                                buttonColor='#E2E2E2' textColor='#333333' labelStyle={globalStyles.graySmallButton} style={{ marginRight: 4 }} mode="contained"
                                                key={value}
                                                onPress={() => setCoin(String(value))}
                                            >{`${value}`}</Button>
                                        ))}
                                    </View>
                                    <TextInput
                                        keyboardType="numeric"
                                        mode="flat"
                                        label="Account No."
                                        value={user.account_number.value}
                                        onChangeText={(text) => handleInputChange("account_number", text)}
                                        onSubmitEditing={() => handleInputSubmit(ifscInputRef)}
                                        error={user.account_number.error !== ""}
                                        outlineColor={theme.colors.gray}
                                        selectionColor={theme.colors.primary}
                                        activeOutlineColor={theme.colors.primary}
                                        style={styles.textInput}
                                    />
                                    <Text style={{ color: "red" }}>{user.account_number.error}</Text>
                                    <TextInput
                                        mode="flat"
                                        label="IFSC Code"
                                        value={user.ifsc_code.value}
                                        onChangeText={(text) => handleInputChange("ifsc_code", text)}
                                        ref={(ref) => (ifscInputRef = ref)}
                                        onSubmitEditing={() => handleInputSubmit(holderInputRef)}
                                        error={user.ifsc_code.error !== ""}
                                        outlineColor={theme.colors.gray}
                                        selectionColor={theme.colors.primary}
                                        activeOutlineColor={theme.colors.primary}
                                        style={styles.textInput}
                                    />
                                    <Text style={{ color: "red" }}>{user.ifsc_code.error}</Text>
                                    <TextInput
                                        mode="flat"
                                        label="Holder Name"
                                        value={user.holder_name.value}
                                        onChangeText={(text) => handleInputChange("holder_name", text)}
                                        ref={(ref) => (holderInputRef = ref)}
                                        error={user.holder_name.error !== ""}
                                        outlineColor={theme.colors.gray}
                                        selectionColor={theme.colors.primary}
                                        activeOutlineColor={theme.colors.primary}
                                        style={styles.textInput}
                                    />
                                    <Text style={{ color: "red" }}>{user.holder_name.error}</Text>

                                </View>
                            }

                        </ScrollView>
                        <View style={globalStyles.displayRowbetween}>
                            <Button
                                disabled={checked === 'bank' ?
                                    coin == "" ||
                                    user.account_number.value == "" ||
                                    user.account_number.error !== "" ||
                                    user.ifsc_code.value == "" ||
                                    user.ifsc_code.error !== "" ||
                                    user.holder_name.value == "" ||
                                    user.holder_name.error !== ""
                                    :
                                    coin == "" ||
                                    user.upi.value == "" ||
                                    user.upi.error !== ""
                                }

                                style={[{ borderRadius: 0 }, { width: '100%' }]} buttonColor='#CBFFC5' textColor='#000' mode="contained" onPress={makePayment}>
                                Submit
                            </Button>
                        </View>
                    </View>
                </>
            )}
        </>
    )
}

export default Withdrawcoin


const styles = StyleSheet.create({
    coinModal: {
        // paddingVertical: 15,
        paddingHorizontal: 20,
        paddingBottom: 30
    },
    textInput: {
        marginTop: 5,
        height: 56,
        backgroundColor: "#e5e5e88a",
    },
    paymentMode: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#007AFF',
    }
})