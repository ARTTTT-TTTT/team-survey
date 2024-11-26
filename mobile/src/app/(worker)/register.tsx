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
import * as ImageManipulator from 'expo-image-manipulator';

import { CircleIcon } from '@components/CircleIcon';
import { useAuthRedirect } from '@context/useAuthRedirect';
import { icons } from '@constants/index';
import { uploadIdCardImage } from '@api/scan';

export default function Register() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [sent, setSent] = useState(false);
    const cameraRef = useRef<any>(null);
    useAuthRedirect();

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View className="flex items-center justify-center">
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
            const photo = await cameraRef.current.takePictureAsync();

            // หมุนภาพให้เป็นแนวนอน (90 องศา)
            const rotatedPhoto = await ImageManipulator.manipulateAsync(
                photo.uri,
                [{ rotate: 270 }],
                { compress: 1, format: ImageManipulator.SaveFormat.JPEG }, // รูปแบบภาพ
            );

            setPhotoUri(rotatedPhoto.uri);
            setModalVisible(true);
        }
    };

    const handlePhotoHide = async () => {
        setModalVisible(false);
    };

    const handleSendPhoto = async () => {
        try {
            if (!photoUri) {
                console.error('No photo URI found.');
                alert('Please capture or select a photo before uploading.');
                return;
            }
            setSent(true);

            const result = await uploadIdCardImage(photoUri);

            if (result) {
                const {
                    id_card,
                    address,
                    lastname_en,
                    name_en,
                    name_th,
                    new_address,
                } = result;
                alert(
                    `ID Card: ${id_card}\n` +
                        `Name (TH): ${name_th}` +
                        `First Name (EN): ${name_en}\n` +
                        `Last Name (EN): ${lastname_en}\n` +
                        `Address: ${address}\n` +
                        `New Address: ${new_address}\n`,
                );
            } else {
                alert('No data found in the ID card. Please try again.');
            }

            setModalVisible(false);
            setSent(false);
        } catch (error: any) {
            console.log('Failed to process ID card:', error);
            alert(
                error.message ||
                    'An error occurred while processing the ID card. Please try again.',
            );
        }
    };

    return (
        <>
            {/* Camera */}
            <CameraView
                className="flex h-full w-full"
                facing={facing}
                ref={cameraRef}
            >
                {/* Overlay Frame */}
                <View className="absolute top-[6.85rem] left-12 w-[80%] h-[70%] border-2 border-white rounded-2xl z-10">
                    <View className="absolute top-[73%] left-10 w-[45%] h-[25%] border-2 border-white z-10">
                        <View className="absolute top-11 right-2 w-[40%] h-[40%] border-2 border-white rounded-full z-10" />
                        <View className="absolute top-6 right-[4.75rem] w-[50%] h-[70%] border-2 border-white rounded-r-full z-10" />
                    </View>
                </View>

                {/* Camera Controls */}
                <View className="top-4 justify-end bg-transparent h-full w-full">
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
                    <CircleIcon
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
                            className="w-[90%] h-[85%]"
                            resizeMode="contain"
                        />
                        <View className="w-[100%] h-28 -top-8">
                            <View className="relative">
                                {/* Send */}
                                <View
                                    style={{
                                        position: 'absolute',
                                        left: '50%',
                                        transform: [
                                            { translateX: -38 },
                                            { translateY: 37 },
                                        ],
                                    }}
                                >
                                    {!sent && (
                                        <CircleIcon
                                            icon={icons.send}
                                            handlePress={handleSendPhoto}
                                            containerStyles="-mt-8"
                                        />
                                    )}
                                </View>
                                {/* Close */}
                                <View
                                    style={{
                                        position: 'absolute',
                                        transform: [
                                            { translateX: 28 },
                                            { translateY: 37 },
                                        ],
                                    }}
                                >
                                    <CircleIcon
                                        icon={icons.photoHide}
                                        handlePress={handlePhotoHide}
                                        containerStyles="-mt-8"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </>
    );
}
