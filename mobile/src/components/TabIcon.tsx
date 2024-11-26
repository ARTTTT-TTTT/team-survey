import { Image, Text, View } from 'react-native';

interface TabIconProps {
    icon: any;
    color: string;
    name: string;
    focused: boolean;
}

export const TabIcon: React.FC<TabIconProps> = ({ icon, color, name, focused }) => {
    return (
        <View className="top-9 flex items-center justify-center">
            <Image
                source={icon}
                resizeMode="contain"
                style={{ tintColor: color }}
                className="w-14 h-14"
            />
            <Text
                className={`${focused ? 'font-semibold' : 'font-regular'} text-center text-sm w-full`}
                style={{ color }}
            >
                {name}
            </Text>
        </View>
    );
};
