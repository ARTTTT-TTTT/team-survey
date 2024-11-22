import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView } from 'react-native';

/* import { Loader } from '@components/index';
import { useGlobalContext } from '@context/globalContext */

export default function Welcome() {
    /* const { loading, isLogged } = useGlobalContext();

    if (!loading && isLogged) return <Redirect href="/home" />; */

    return (
        <View className="bg-primary h-full">
            {/* <Loader isLoading={loading} /> */}
            <ScrollView
                contentContainerStyle={{
                    height: '100%',
                }}
            >
                <View className="w-full flex justify-center items-center h-full px-4">
                    <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
                        Where Creativity Meets Innovation: Embark on a Journey
                        of Limitless Exploration with Aora
                    </Text>
                </View>
            </ScrollView>

            <StatusBar />
        </View>
    );
}
