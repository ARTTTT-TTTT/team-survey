import React, { useState, useRef } from 'react';
import {
    Button,
    Text,
    TouchableOpacity,
    View,
    Image,
    Modal,
} from 'react-native';

import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

import { useAuthRedirect } from '@context/useAuthRedirect';
import { icons } from '@constants/index';

interface TabIconProps {
    handlePress: () => void | Promise<void>;
    icon: any;
    containerStyles?: string;
}

const TabIcon: React.FC<TabIconProps> = ({
    icon,
    containerStyles,
    handlePress,
}) => {
    return (
        <TouchableOpacity
            className={`flex items-center justify-center ${containerStyles}`}
            onPress={handlePress}
            activeOpacity={0.7}
        >
            <View className="flex items-center justify-center rounded-full w-24 h-24 bg-primary">
                <View className="flex items-center justify-center w-20 h-20 bg-transparent border-2 border-quaternary rounded-full">
                    <Image
                        source={icon}
                        resizeMode="contain"
                        style={{ tintColor: '#f4f3ee' }}
                        className="w-14 h-14"
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default function Register() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const cameraRef = useRef<any>(null);
    useAuthRedirect();

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View className="flex justify-center">
                <Text className="text-center pb-3">
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    }

    const handleTakePhoto = async () => {
        if (cameraRef.current) {
            // กำหนด type ของ photo เป็น CameraCapturedPicture
            const photo = await cameraRef.current.takePictureAsync();
            setPhotoUri(photo.uri);
            setModalVisible(true);
        }
    };

    const handleSendPhoto = async () => {
        setModalVisible(false);
    };

    return (
        <>
            {/* Camera */}
            <CameraView
                className="flex h-full w-full"
                facing={facing}
                ref={cameraRef}
            >
                <View className="justify-end bg-transparent h-full w-full gap-2">
                    <TouchableOpacity
                        className="items-center"
                        onPress={toggleCameraFacing}
                        activeOpacity={0.7}
                    >
                        <Text className="font-bold text-3xl color-white">
                            Flip Camera
                        </Text>
                    </TouchableOpacity>
                    {/* Capture */}
                    <TabIcon
                        icon={icons.camera}
                        handlePress={handleTakePhoto}
                        containerStyles="mb-3"
                    />
                    <View
                        style={{
                            borderTopRightRadius: 50, // ตั้งค่าเท่ากับ height
                            borderTopLeftRadius: 50, // ตั้งค่าเท่ากับ height
                        }}
                        className="w-full h-3 bg-primary"
                    ></View>
                </View>
            </CameraView>

            {/* Modal to show the captured photo */}
            {photoUri && (
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="slide"
                >
                    <View className="flex-1 justify-center items-center bg-black bg-opacity-80">
                        <Image
                            source={{ uri: photoUri }}
                            style={{ width: '90%', height: '80%' }}
                            resizeMode="contain"
                        />
                        <View className="relative right-1/2 border border-sky-500">
                            {/* Send */}
                            <View
                                style={{
                                    position: 'absolute',
                                    left: '50%',
                                    transform: [{ translateX: -38 }],
                                }}
                            >
                                <TabIcon
                                    icon={icons.send}
                                    handlePress={handleSendPhoto}
                                    containerStyles="-mt-8"
                                />
                            </View>
                            {/* Close */}
                            <View
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    transform: [{ translateX: 28 }],
                                }}
                            >
                                <TabIcon
                                    icon={icons.photoHide}
                                    handlePress={handleSendPhoto}
                                    containerStyles="-mt-8"
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </>
    );
}
