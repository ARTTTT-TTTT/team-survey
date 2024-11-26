import { View, Image, ScrollView } from 'react-native';
import { useCallback } from 'react';
import { router } from 'expo-router';

import { useFocusEffect } from '@react-navigation/native';

import { images } from '@constants/index';
import { useAuth } from '@context/authContext';
import { Button } from '@components/ui';

export default function Index() {
    const { authToken } = useAuth();

    useFocusEffect(
        useCallback(() => {
            if (authToken) {
                return router.push('/dashboard');
            }
        }, [authToken]),
    );
    return (
        <View className="bg-primary h-full">
            <ScrollView
                contentContainerStyle={{
                    height: '100%',
                }}
            >
                <View className="w-full h-full flex justify-center items-center ">
                    <Image
                        source={images.logo}
                        className="h-32"
                        resizeMode="contain"
                    />
                    <Button
                        title="Continue with Email"
                        handlePress={() => router.push('/sign-in')}
                        containerStyles="w-[60%] px-10 mt-12"
                        isLoading={false}
                    />
                </View>
            </ScrollView>
        </View>
    );
}
