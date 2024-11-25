import { View, Image, ScrollView } from 'react-native';

import { images } from '@constants/index';
import { Button } from '@components/ui';
import { router, Link } from 'expo-router';

export default function Index() {
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
                    <Link
                        href="register"
                        className="mt-7 font-bold text-3xl bg-secondary"
                    >
                        Register
                    </Link>
                </View>
            </ScrollView>
        </View>
    );
}
