import { JSXBase } from '@stencil/core/internal';

interface PickerButton {
    text?: string;
    role?: string;
    cssClass?: string | string[];
    handler?: (value: any) => boolean | void;
}

interface PickerColumn {
    name: string;
    align?: string;
    selectedIndex?: number;
    prevSelected?: number;
    prefix?: string;
    suffix?: string;
    options: PickerColumnOption[];
    cssClass?: string | string[];
    columnWidth?: string;
    prefixWidth?: string;
    suffixWidth?: string;
    optionsWidth?: string;
    refresh?: () => void;
}

interface PickerColumnOption {
    text?: string;
    value?: any;
    disabled?: boolean;
    duration?: number;
    transform?: string;
    selected?: boolean;
}