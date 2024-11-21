import React from 'react'
import {Button, View, Text } from 'react-native'

import { RouteProp, useRoute, useNavigation } from '@react-navigation/native'

import { TestStackParamList } from '@/modules/test/_layout'
import { AppNavigationProp, RouterName } from '@/routes'

export const Test2: React.FC = function () {
    const route = useRoute<RouteProp<TestStackParamList, 'test2'>>()
    const navigation = useNavigation<AppNavigationProp>()
    const { message } = route.params

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Test Page 2</Text>
            <Text>Message: {message}</Text>
            <Button
                title="Go to Test1"
                onPress={() =>
                    navigation.navigate(RouterName.test1)
                }
            />
        </View>
    )
}
