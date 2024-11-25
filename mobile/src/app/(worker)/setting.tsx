import { Text, View, ScrollView } from 'react-native';
import { router } from 'expo-router';

import { useAuthRedirect } from '@context/useAuthRedirect';
import { useAuth } from '@context/authContext';
import { Button } from '@components/ui';

export default function Setting() {
    const { logout } = useAuth();
    useAuthRedirect();
    return (
        <View className="bg-primary h-full">
            <ScrollView
                contentContainerStyle={{
                    height: '100%',
                }}
            >
                <View className="w-full h-full flex justify-center items-center ">
                    <Text className="font-semibold text-4xl">Setting</Text>
                    <Button
                        title="Sign out"
                        handlePress={() => logout()}
                        containerStyles="mt-16 w-fit px-10 mt-7"
                        isLoading={false}
                    />
                </View>
            </ScrollView>
        </View>
    );
}
