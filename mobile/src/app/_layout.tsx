import { useEffect } from 'react';
import { Alert, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { Stack, SplashScreen } from 'expo-router';

import { AuthProvider } from '@context/authContext';
import '../style/global.css';

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
    const insets = useSafeAreaInsets();

    // === Font ===
    const [fontsLoaded, error] = useFonts({
        'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
        'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
        'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    });
    useEffect(() => {
        if (error) {
            Alert.alert('Error', 'Failed to load fonts', [{ text: 'OK' }]);
            console.error('Font loading error:', error);
        }

        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, error]);

    return (
        <AuthProvider>
            <View
                style={{
                    flex: 1,
                    paddingTop: insets.top,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                    paddingBottom: 0,
                }}
                className="bg-primary h-full"
            >
                <StatusBar style="light" />
                <Stack>
                    <Stack.Screen
                        name="index"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="(auth)"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="(worker)"
                        options={{ headerShown: false }}
                    />
                </Stack>
            </View>
        </AuthProvider>
    );
}
