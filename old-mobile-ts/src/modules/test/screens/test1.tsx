import React from 'react'
import { Button, View, Text } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { AppNavigationProp, RouterName } from '@/routes'

export const Test1: React.FC = function () {
    const navigation = useNavigation<AppNavigationProp>()

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Test Page 1</Text>
            <Button
                title="Go to Test2"
                onPress={() =>
                    navigation.navigate(RouterName.test2, { message: 'Hello from Test1!' })
                }
            />
        </View>
    )
}
