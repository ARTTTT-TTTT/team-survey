import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { Link } from 'expo-router';
import { Form, Button } from '@components/ui';

export default function SignIn() {
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const submit = async () => {
        setSubmitting(true);

        try {
            console.log('Signing in', form.email);
        } catch (error) {
            console.error('Error during sign-in', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <View className="bg-primary h-full">
            <ScrollView
                contentContainerStyle={{
                    height: '100%',
                }}
            >
                <View className="w-full flex justify-center items-center h-full px-4 my-6">
                    <Text className="text-2xl font-semibold text-white mt-10 ">
                        Sign In
                    </Text>

                    <Form
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                        placeholder={''}
                    />

                    <Form
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) =>
                            setForm({ ...form, password: e })
                        }
                        otherStyles="mt-7"
                        placeholder={''}
                    />

                    <Button
                        title="Sign In"
                        handlePress={submit}
                        containerStyles="w-fit px-10 mt-7"
                        isLoading={isSubmitting}
                    />

                    <View className="flex justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-regular">
                            Don't have an account?
                        </Text>
                        <Link
                            href="/sign-up"
                            className="text-lg font-semibold text-quinary"
                        >
                            Sign Up
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
