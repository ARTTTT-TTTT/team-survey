import React from 'react'
import { RootSiblingParent } from 'react-native-root-siblings'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { NavigationContainer } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

import { TestLayout, TestStackParamList } from '@/modules/test/_layout'

export type AppParamList = TestStackParamList
export type AppNavigationProp = StackNavigationProp<AppParamList>

type Route = { [key in keyof AppParamList]: keyof AppParamList | any }
export const RouterName: Route = {
    test1: 'test1',
    test2: 'test2',
}

export const AppRoutes: React.FC = function () {
    return (
        <RootSiblingParent>
            <SafeAreaProvider>
                <NavigationContainer>
                    <TestLayout />
                </NavigationContainer>
            </SafeAreaProvider>
        </RootSiblingParent>
    )
}
