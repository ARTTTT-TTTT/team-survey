import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
    title: string;
    handlePress: () => void | Promise<void>;
    containerStyles?: string;
    textStyles?: string;
    isLoading: boolean;
}

export const Button = ({
    title,
    handlePress,
    containerStyles,
    textStyles,
    isLoading,
}: ButtonProps) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${
                isLoading ? 'opacity-50' : ''
            }`}
            disabled={isLoading}
        >
            <Text
                className={`text-quaternary font-semibold text-lg text-center ${textStyles}`}
            >
                {title}
            </Text>

            {isLoading && (
                <ActivityIndicator
                    animating={isLoading}
                    color="#fff"
                    size="small"
                    className="ml-2"
                />
            )}
        </TouchableOpacity>
    );
};
