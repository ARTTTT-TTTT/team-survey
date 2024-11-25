import { View, Text, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';

import { Form, Button } from '@components/ui';

export default function SignUp() {
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    // ฟังก์ชันเพื่อตรวจสอบข้อมูลในฟอร์ม
    const validateForm = () => {
        if (!form.email || !form.password) {
            Alert.alert('Error', 'Please fill in all fields.');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(form.email)) {
            Alert.alert('Error', 'Please enter a valid email address.');
            return false;
        }
        if (form.password.length < 4) {
            Alert.alert('Error', 'Password must be at least 4 characters.');
            return false;
        }
        return true;
    };

    const submit = async () => {
        if (!validateForm()) return;

        setSubmitting(true);

        try {
            console.log('Signing Up', form.email);
        } catch (error) {
            console.error('Error during sign-up', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <View className="bg-primary h-full">
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                }}
            >
                <View className="flex items-center px-4 my-6">
                    <Text className="text-2xl font-semibold text-white mt-10">
                        Sign Up
                    </Text>

                    <Form
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                        placeholder="Enter your email"
                    />

                    <Form
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) =>
                            setForm({ ...form, password: e })
                        }
                        otherStyles="mt-7"
                        placeholder="Enter your password"
                        // secureTextEntry // ซ่อนรหัสผ่าน
                    />

                    <Button
                        title="Sign Up"
                        handlePress={submit}
                        containerStyles="w-fit px-10 mt-7"
                        isLoading={isSubmitting}
                    />

                    <View className="flex justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-regular">
                            Have an account already?
                        </Text>
                        <Link
                            href="/sign-in"
                            className="text-lg font-semibold text-quinary"
                        >
                            Sign In
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
