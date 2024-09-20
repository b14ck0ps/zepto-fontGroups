export interface Font {
    name: string;
}

export interface FontGroup {
    name: string;
    fonts: string[];
}

export interface ApiResponse<T> {
    success: boolean;
    [key: string]: T | boolean;
}
