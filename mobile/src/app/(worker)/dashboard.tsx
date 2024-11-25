import { Text, View, ScrollView } from 'react-native';

export default function Dashboard() {
    return (
        <View className="bg-primary h-full">
            <ScrollView
                contentContainerStyle={{
                    height: '100%',
                }}
            >
                <View className="w-full h-full flex justify-center items-center ">
                    <Text className="font-semibold text-4xl">Dashboard</Text>
                </View>
            </ScrollView>
        </View>
    );
}
