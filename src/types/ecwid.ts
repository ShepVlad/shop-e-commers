export interface Product {
    id: number
    name: string
    price: number
    sku: string
    description?: string
    categories: number[]
    thumbnailUrl?: string
    galleryImages?: string[]
    inStock?: boolean
}

export interface Category {
    id: number
    name: string
    parentId?: number
    thumbnailUrl?: string
    description?: string
    order?: number
}

export interface ProductsResponse {
    items: Product[]
    total: number
    count: number
    offset: number
    limit: number
}

export interface CategoriesResponse {
    items: Category[]
    total: number
}

export interface ProductSearchParams {
    keyword?: string
    category?: number
    offset?: number
    limit?: number
    sortBy?: 'NAME' | 'PRICE' | 'UPDATED'
    sortOrder?: 'ASC' | 'DESC'
}

export enum ApiErrorType {
    NOT_FOUND = 'NOT_FOUND',
    SERVER_ERROR = 'SERVER_ERROR',
    NETWORK_ERROR = 'NETWORK_ERROR',
    UNAUTHORIZED = 'UNAUTHORIZED'
}

export class ApiError extends Error {
    constructor(
        public type: ApiErrorType,
        message: string,
        public originalError?: unknown
    ) {
        super(message)
    }
}