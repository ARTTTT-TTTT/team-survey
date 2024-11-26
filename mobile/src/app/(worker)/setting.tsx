import { Text, View, ScrollView } from 'react-native';

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
                    flexGrow: 1,
                    padding: 16,
                }}
            >
                {/* Header */}
                <Text className="font-semibold text-quaternary text-4xl mb-6 text-center">
                    Setting
                </Text>
                <View className="flex h-[90%] w-full items-center justify-center">
                    <Button
                        title="Sign out"
                        handlePress={() => logout()}
                        containerStyles="w-fit px-10"
                        isLoading={false}
                    />
                </View>
            </ScrollView>
        </View>
    );
}
