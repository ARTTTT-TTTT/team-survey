import { useCallback } from 'react';
import { router } from 'expo-router';

import { useFocusEffect } from '@react-navigation/native';

import { useAuth } from '@context/authContext';

export const useAuthRedirect = () => {
    const { loading, authToken, checkTokenChange } = useAuth();

    useFocusEffect(
        useCallback(() => {
            if (loading) {
                return;
            }
            if (!loading && !authToken) {
                router.push('/sign-in');
            } else {
                checkTokenChange();
            }
        }, [authToken]),
    );
};
