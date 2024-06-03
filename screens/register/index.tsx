import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Link, useNavigation } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Yup from 'yup';
import db from '@react-native-firebase/database'
const RegisterTemplate: React.FC = () => {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is Required'),
        email: Yup.string().email('Invalid email').required('Email is Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password Required'),
    });

    const nav = useNavigation<NativeStackNavigationProp<any>>();

    const createProfile = async (response: FirebaseAuthTypes.UserCredential, name: string) => {
        db().ref(`/users/${response.user.uid}`).set({ name })
        db().ref(`/users/${response.user.uid}/leaderboard`).set({ totalStep: 0 })
    }

    return (
        <View style={styles.container}>
            <View style={styles.loginForm}>
                <Text style={styles.title}>Register</Text>
                <Formik
                    initialValues={{ email: '', password: '', name: '' }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        const { email, password } = values
                        try {
                            const response = await auth().createUserWithEmailAndPassword(email, password)
                            if (response.user) {
                                await createProfile(response, values.name)
                                nav.replace("(tabs)")
                                Alert.alert("Register process", "Login success")
                            }
                        } catch (error) {
                            Alert.alert("Register", "Register failed, please try again")

                        }

                    }}
                >
                    {({ handleChange, handleSubmit, values, errors, touched }) => (
                        <View style={styles.inputSection}>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('email')}
                                placeholder="Email"
                                value={values.email} 
                            />
                            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('password')}
                                placeholder="Password"
                                secureTextEntry={true}
                                value={values.password} 
                            /> 
                            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
                            <TextInput
                                style={styles.input}
                                onChangeText={handleChange('name')}
                                placeholder="Name"
                                value={values.name}
                            />
                            <Pressable
                                style={styles.loginCTA}
                                onPress={() => handleSubmit()}
                            >
                                <Text style={styles.loginTitle}>Register Now</Text>
                            </Pressable>

                        </View>
                    )}
                </Formik>
            </View>
        </View>
    )
}

export default RegisterTemplate

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
    },
    loginTitle: {
        fontWeight: "500",
        fontSize: 16,
        color: "#fff",
        textAlign: "center"
    }, error: {
        color: 'red',
    }
})