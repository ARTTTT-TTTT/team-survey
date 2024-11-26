import {
    View,
    Text,
    ScrollView,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useState } from 'react';
import { useCallback } from 'react';
import { Link, router } from 'expo-router';

import { useFocusEffect } from '@react-navigation/native';

import { Form, Button } from '@components/ui';
import { useAuth } from '@context/authContext';
import { login } from '@api/auth';

export default function SignIn() {
    const { handleLoginSuccess, authToken } = useAuth();
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    useFocusEffect(
        useCallback(() => {
            if (authToken) {
                return router.push('/dashboard');
            }
        }, [authToken]),
    );

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
            const response = await login(form.email, form.password);
            await handleLoginSuccess(response.access_token);
        } catch (error) {
            console.error('Error during sign-in', error);
            Alert.alert('Error', 'Failed to sign in user.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-primary h-full"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                    }}
                >
                    <View className="w-full flex justify-center items-center h-full px-4 my-6">
                        <Text className="text-5xl font-semibold text-white mt-10 ">
                            Sign In
                        </Text>

                        <Form
                            title="Email"
                            value={form.email}
                            handleChangeText={(e) =>
                                setForm({ ...form, email: e })
                            }
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
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
