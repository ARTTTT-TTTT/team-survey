import { Theme, ThemeProvider } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import 'react-native-url-polyfill/auto';

import { useColorScheme, NAV_THEME } from '@utils/theme';
import { getItem, setItem } from '@utils/store';

const LIGHT_THEME: Theme = {
    dark: false,
    colors: NAV_THEME.light,
    fonts: {
        regular: {
            fontFamily: 'System',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'System',
            fontWeight: '500',
        },
        bold: {
            fontFamily: 'System',
            fontWeight: '700',
        },
        heavy: {
            fontFamily: 'System',
            fontWeight: '900',
        },
    },
};

const DARK_THEME: Theme = {
    dark: true,
    colors: NAV_THEME.dark,
    fonts: {
        regular: {
            fontFamily: 'System',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'System',
            fontWeight: '500',
        },
        bold: {
            fontFamily: 'System',
            fontWeight: '700',
        },
        heavy: {
            fontFamily: 'System',
            fontWeight: '900',
        },
    },
};

export default function AppLayout() {
    const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
    const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

    // === Font ===
    const [fontsLoaded, error] = useFonts({
        'Poppins-Black': require('@assets/fonts/Poppins-Black.ttf'),
        'Poppins-Bold': require('@assets/assets/fonts/Poppins-Bold.ttf'),
        'Poppins-ExtraBold': require('@assets/assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-ExtraLight': require('@assets/assets/fonts/Poppins-ExtraLight.ttf'),
        'Poppins-Light': require('@assets/assets/fonts/Poppins-Light.ttf'),
        'Poppins-Medium': require('@assets/assets/fonts/Poppins-Medium.ttf'),
        'Poppins-Regular': require('@assets/assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('@assets/assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Thin': require('@assets/assets/fonts/Poppins-Thin.ttf'),
    });
    SplashScreen.preventAutoHideAsync();
    useEffect(() => {
        if (error) throw error;

        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, error]);

    if (!fontsLoaded) {
        return null;
    }

    if (!fontsLoaded && !error) {
        return null;
    }

    // === Theme ===
    useEffect(() => {
        (async () => {
            const theme = getItem('theme');
            if (Platform.OS === 'web') {
                // Adds the background color to the html element to prevent white background on overscroll.
                document.documentElement.classList.add('bg-background');
            }
            if (!theme) {
                setItem('theme', colorScheme);
                setIsColorSchemeLoaded(true);
                return;
            }
            const colorTheme = theme === 'dark' ? 'dark' : 'light';
            if (colorTheme !== colorScheme) {
                setColorScheme(colorTheme);
                setIsColorSchemeLoaded(true);
                return;
            }
            setIsColorSchemeLoaded(true);
        })();
    }, []);

    if (!isColorSchemeLoaded) {
        return null;
    }

    return (
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
            <SafeAreaView>
                <Stack>
                    <Stack.Screen
                        name="index"
                        options={{ headerShown: false }}
                    />
                </Stack>
            </SafeAreaView>
        </ThemeProvider>
    );
}
