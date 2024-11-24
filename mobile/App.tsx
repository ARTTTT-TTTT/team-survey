import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import './src/style/global.css';

export default function App() {
    return (
        <SafeAreaView>
            <StatusBar />
            <Slot />
        </SafeAreaView>
    );
}
