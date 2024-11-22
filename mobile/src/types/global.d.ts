/// <reference types="nativewind/types" />

import type { SvgProps as DefaultSvgProps } from 'react-native-svg';

declare module 'react-native-svg' {
    interface SvgProps extends DefaultSvgProps {
        className?: string;
    }
}

declare module 'react-native-mmkv' {
    export class MMKV {
        constructor(options?: unknown);
        set(key: string, value: string | boolean | number): void;
        getString(key: string): string | undefined;
        getBoolean(key: string): boolean | undefined;
        getNumber(key: string): number | undefined;
        delete(key: string): void;
        clearAll(): void;
    }
}
