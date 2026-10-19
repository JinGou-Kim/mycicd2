//src/types/nboard.ts
export interface Nboard {
    NUM: number;
    TITLE: string;
    WRITER: string;
    CONTENT: string | null;
    IMAGE_NAME: string | null;
    IMAGE_URL: string | null;
    REGDATE: string;
}
export interface NboardListResponse {
    success: boolean;
    data: Nboard[];
}
export interface NboardDetailResponse {
    success: boolean;
    data: Nboard;
}
export interface NboardWriteResponse {
    success: boolean;
    message: string;
    rowsAffected: number;
    imageName?: string | null;
}