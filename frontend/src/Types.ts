export interface Font {
    name: string;
}

export interface GroupFont {
    fontName: string;
    font: string;
    size: number;
    price: number;
}

export interface FontGroup {
    name: string;
    fonts: GroupFont[];
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    [key: string]: T | boolean | undefined;
}
