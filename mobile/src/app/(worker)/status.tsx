import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { usersMock } from '@mock/index';
import { Button } from '@components/ui';

export default function Status() {
    const [users, setUsers] = useState(usersMock);
    const [currentEditingId, setCurrentEditingId] = useState<string | null>(
        null,
    );

    const handleStatusChange = (citizen_id: string, newStatus: string) => {
        const updatedUsers = users.map((user) =>
            user.citizen_id === citizen_id
                ? { ...user, status: newStatus }
                : user,
        );
        setUsers(updatedUsers);
        setCurrentEditingId(null);
    };

    return (
        <View className="bg-primary h-full">
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    padding: 16,
                }}
            >
                {/* Header */}
                <View className="flex flex-row items-center justify-between mb-4">
                    <Text className="font-semibold text-quaternary text-4xl text-center flex-1">
                        Status
                    </Text>

                    <Button
                        title="Confirm"
                        handlePress={() => console.log(users)}
                        containerStyles="h-[10%] w-[40%] px-10 "
                        textStyles="text-sm font-light"
                        isLoading={false}
                    />
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
                    {users.map((user, index) => (
                        <View
                            key={user.citizen_id}
                            className={`flex flex-row items-center p-3 ${
                                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                            }`}
                        >
                            <Text className="flex-1 text-gray-800">
                                {user.citizen_id}
                            </Text>
                            <Text className="flex-1 text-gray-800">
                                {user.name}
                            </Text>
                            <View className="flex-1 justify-center right-10">
                                {currentEditingId === user.citizen_id ? (
                                    <Picker
                                        selectedValue={user.status}
                                        onValueChange={(value) =>
                                            handleStatusChange(
                                                user.citizen_id,
                                                value,
                                            )
                                        }
                                    >
                                        <Picker.Item
                                            label="Green"
                                            value="Green"
                                        />
                                        <Picker.Item
                                            label="Yellow"
                                            value="Yellow"
                                        />
                                        <Picker.Item label="Red" value="Red" />
                                    </Picker>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() =>
                                            setCurrentEditingId(user.citizen_id)
                                        }
                                        className="-right-10"
                                    >
                                        <Text
                                            className={`font-bold ${
                                                user.status === 'Green'
                                                    ? 'text-green-600'
                                                    : user.status === 'Yellow'
                                                      ? 'text-yellow-600'
                                                      : 'text-red-600'
                                            }`}
                                        >
                                            {user.status}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
