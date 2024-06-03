import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const SignInTemplate: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSignin = async () => {
        try {

        } catch (error) {
            Alert.alert("Login process", "Login failed, please try again")
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.loginForm}>
                <Text style={styles.title}>Sign in</Text>
                <View style={styles.inputSection}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Email"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="Password"
                        secureTextEntry={true}
                    />
                    <Pressable
                        style={styles.loginCTA}
                        onPress={handleSignin}
                    >
                        <Text style={styles.loginTitle}>Login</Text>
                    </Pressable>
                    <Link href="/(auth)/register">
                        <Text>Register new account now</Text>
                    </Link>
                </View>
            </View>
        </View>
    )
}

export default SignInTemplate

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#f1f5f9",
    },
    loginForm: {
        gap: 20,
        backgroundColor: "#FFF",
        borderRadius: 8,
        padding: 16
    },
    title: {
        fontSize: 48,
        textAlign: "center",
        fontWeight: "200",
        borderRadius: 8,
        color: "#65a30d"
    },
    input: {
        height: 40,
        overflow: "hidden",
        paddingHorizontal: 8,
        backgroundColor: "#fff",
        color: "#4a4a4a",
        borderBottomColor: "#ddd",
        borderBottomWidth: 1
    },
    inputSection: {
        gap: 20,
        justifyContent: "center",
    },
    loginCTA: {
        backgroundColor: "#65a30d",
        color: "#fff",
        padding: 16,
        borderRadius: 8,
        justifyContent: "center",
        zIndex: 0.5
    },
    loginTitle: {
        fontWeight: "500",
        fontSize: 16,
        color: "#fff",
        textAlign: "center"
    }
})