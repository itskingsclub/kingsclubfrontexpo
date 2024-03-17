import { Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Button, Text, Modal, Portal, TextInput, useTheme, RadioButton, ActivityIndicator, Divider } from 'react-native-paper';
import Header from '../header/Header';
import globalStyles from '../../../globalstyle';
import { UserContext } from '../../userDetail/Userdetail';
import { deposit, withdraw } from '../../service/apicalls';
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
            // account_number: /^[0-9]{9,18}$/,
            // ifsc_code: /^[A-Z]{4}0[A-Z0-9]{6}$/,
            // holder_name: /^[a-zA-Z ]+$/,
            account_number: /^$|^[0-9]{9,18}$/,
            ifsc_code: /^$|^[A-Z]{4}0[A-Z0-9]{6}$/,
            holder_name: /^$|^[a-zA-Z ]+$/,
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
        setLoading(true)
        data = {
            user_id: userDetail.id,
            amount: Number(coin)
        }
        withdraw(data).then((res) => {
            if (res.status) {
                ShowToast(res?.message)
            } else {
                ShowToast(res?.message)
            }
            setLoading(false)
        })
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
                            <View>
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

                        </ScrollView>
                        <View style={globalStyles.displayRowbetween}>
                            <Button
                                disabled={
                                    coin == "" ||
                                    // user.account_number.value == "" ||
                                    // user.account_number.error !== "" ||
                                    // user.ifsc_code.value == "" ||
                                    // user.ifsc_code.error !== "" ||
                                    // user.holder_name.value == "" ||
                                    // user.holder_name.error !== "" ||
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