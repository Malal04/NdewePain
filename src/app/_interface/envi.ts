export const Envi = {
    production: false,
    Url: 'http://127.0.0.1:8000/api/v1'
};

export interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface ApiResponse<T = any> {
    status: boolean;
    message: string;
    data?: T;
    meta?: PaginationMeta;
}