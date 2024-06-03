import { Redirect } from 'expo-router'
import React from 'react'

type Props = {}

const SignInTemplate: React.FC<Props> = (props: Props) => {
    return (
        <Redirect href="/(auth)/sign-in" />
    )
}

export default SignInTemplate 