import { View, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';

import { images } from '@constants/index';
import { useAuthRedirect } from '@context/useAuthRedirect';
import { Button } from '@components/ui';

export default function Index() {
    useAuthRedirect();
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
                        containerStyles="w-fit px-10 mt-7"
                        isLoading={false}
                    />
                    <Button
                        title="Register"
                        handlePress={() => router.push('/register')}
                        containerStyles="w-fit px-10 mt-7"
                        isLoading={false}
                    />
                </View>
            </ScrollView>
        </View>
    );
}
