import { Stack } from "expo-router";


export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false, animation: "flip" }}>
            <Stack.Screen name="sign-in" />
            <Stack.Screen name="register" />
        </Stack>
    );
}
