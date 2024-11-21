import React from 'react'

import {
    createStackNavigator,
    StackNavigationOptions,
    TransitionPresets,
} from '@react-navigation/stack'

import { Test1 } from './screens/test1'
import { Test2 } from './screens/test2'
import { RouterName } from '@/routes'

export type TestStackParamList = {
    test1: undefined
    test2: { message: string }
}

const options: StackNavigationOptions = {
    headerShown: true,
    ...TransitionPresets.SlideFromRightIOS,
}

const Stack = createStackNavigator<TestStackParamList>()

export const TestLayout: React.FC = function () {
    return (
        <Stack.Navigator initialRouteName={RouterName.test1} screenOptions={options}>
            <Stack.Screen
                name={RouterName.test1}
                component={Test1}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={RouterName.test2}
                component={Test2}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}
