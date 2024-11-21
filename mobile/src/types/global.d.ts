import type { SvgProps as DefaultSvgProps } from 'react-native-svg';

declare module 'react-native-svg' {
    interface SvgProps extends DefaultSvgProps {
        className?: string;
    }
}

declare module 'react-native-mmkv' {
    // Add minimal types or import necessary parts of the library as needed
    export class MMKV {
        constructor(options?: any);
        set(key: string, value: any): void;
        get<T>(key: string, fallback?: T): T | undefined;
        delete(key: string): void;
        clearAll(): void;
    }
}
