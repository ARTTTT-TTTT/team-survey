import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Dimensions, TextInput } from 'react-native';

export default function Register() {
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View
                    className="w-full flex justify-center h-full px-4 my-6"
                    style={{
                        minHeight: Dimensions.get('window').height - 100,
                    }}
                >
                    <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
                        Sign Up
                    </Text>

                    <TextInput className="flex-1 text-white font-psemibold text-base" />

                    <TextInput className="flex-1 text-white font-psemibold text-base" />

                    <TextInput className="flex-1 text-white font-psemibold text-base" />

                    <View className="flex justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Have an account already?
                        </Text>
                        <Link
                            href="/login"
                            className="text-lg font-psemibold text-secondary"
                        >
                            Sign In
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
