import React from 'react';
import { Text, View, ScrollView } from 'react-native';

import { usersMock } from '@mock/index';
import { useAuthRedirect } from '@context/useAuthRedirect';

export default function Dashboard() {
    const stats = {
        green: usersMock.filter((user) => user.status === 'Green').length,
        yellow: usersMock.filter((user) => user.status === 'Yellow').length,
        red: usersMock.filter((user) => user.status === 'Red').length,
    };
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
                    Dashboard
                </Text>

                {/* Stats Section */}
                <View className="bg-quaternary p-4 rounded-lg shadow-md mb-6">
                    <Text className="font-bold text-xl mb-3 text-center">
                        Statistics
                    </Text>
                    <View className="flex flex-row justify-between">
                        <View className="items-center">
                            <Text className="font-bold text-green-600 text-lg">
                                Green
                            </Text>
                            <Text className="font-semibold text-gray-700 text-lg">
                                {stats.green}
                            </Text>
                        </View>
                        <View className="items-center">
                            <Text className="font-bold text-yellow-600 text-lg">
                                Yellow
                            </Text>
                            <Text className="font-semibold text-gray-700 text-lg">
                                {stats.yellow}
                            </Text>
                        </View>
                        <View className="items-center">
                            <Text className="font-bold text-red-600 text-lg">
                                Red
                            </Text>
                            <Text className="font-semibold text-gray-700 text-lg">
                                {stats.red}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Table Section */}
                <View className="bg-quaternary rounded-lg shadow-md">
                    {/* Table Header */}
                    <View className="flex flex-row bg-secondary p-3 rounded-t-lg">
                        <Text className="flex-1 font-bold text-white">
                            Citizen ID
                        </Text>
                        <Text className="flex-1 font-bold text-white">
                            Name
                        </Text>
                        <Text className="flex-1 font-bold text-white">
                            Status
                        </Text>
                    </View>

                    {/* Table Rows */}
                    {usersMock.map((user, index) => (
                        <View
                            key={user.citizen_id}
                            className={`flex flex-row p-3 ${
                                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                            }`}
                        >
                            <Text className="flex-1 text-gray-800">
                                {user.citizen_id}
                            </Text>
                            <Text className="flex-1 text-gray-800">
                                {user.name}
                            </Text>
                            <Text
                                className={`flex-1 text-gray-800 font-bold ${
                                    user.status === 'Green'
                                        ? 'text-green-600'
                                        : user.status === 'Yellow'
                                          ? 'text-yellow-600'
                                          : 'text-red-600'
                                }`}
                            >
                                {user.status}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
