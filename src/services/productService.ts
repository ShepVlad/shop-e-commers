import ecwidApi from './ecwidApi'
import type { Product, ProductsResponse, ProductSearchParams } from '@/types/ecwid'
import { ApiError, ApiErrorType } from '@/types/ecwid'

export async function getAllProducts(params?: ProductSearchParams): Promise<Product[]> {
    try {
        const response = await ecwidApi.get<ProductsResponse>('/products', { params })
        return response.data.items
    } catch (error) {
        handleProductError(error)
    }
}

export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
    return getAllProducts({ category: categoryId })
}

export async function getProductById(id: number): Promise<Product> {
    try {
        const response = await ecwidApi.get<Product>(`/products/${id}`)
        return response.data
    } catch (error) {
        handleProductError(error, id)
    }
}

function handleProductError(error: unknown, productId?: number): never {
    debugger;
    console.error('[ProductService] Error:', error)

    if (import.meta.env.DEV) {
        console.debug('Error details:', {
            productId,
            error
        })
    }

    if (error instanceof ApiError) {
        switch (error.type) {
            case ApiErrorType.NOT_FOUND:
                throw new Error(productId
                    ? `Product ${productId} not found`
                    : 'Requested product not found')

            case ApiErrorType.UNAUTHORIZED:
                throw new Error('Authentication required')

            default:
                throw error
        }
    }

    throw new Error('Failed to load product. Please try again later')
}

export const productService = {
    getAllProducts,
    getProductsByCategory,
    getProductById
}