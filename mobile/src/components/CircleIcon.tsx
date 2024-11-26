import { TouchableOpacity, View, Image } from 'react-native';

interface CircleIconProps {
    handlePress: () => void | Promise<void>;
    icon: any;
    containerStyles?: string;
}

export const CircleIcon: React.FC<CircleIconProps> = ({
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
