import ecwidApi from './ecwidApi'
import type { Category, CategoriesResponse } from '@/types/ecwid'
import { ApiError, ApiErrorType } from '@/types/ecwid'

export async function getAllCategories(): Promise<Category[]> {
    try {
        const response = await ecwidApi.get<CategoriesResponse>('/categories')
        return response.data.items
    } catch (error) {
        handleCategoryError(error)
    }
}

export async function getCategoryById(id: number): Promise<Category> {
    try {
        const response = await ecwidApi.get<Category>(`/categories/${id}`)
        return response.data
    } catch (error) {
        handleCategoryError(error, id)
    }
}

export async function getSubcategories(parentId: number): Promise<Category[]> {
    try {
        const response = await ecwidApi.get<{ items: Category[] }>('/categories', {
            params: {
                parent: parentId
            }
        })
        return response.data.items
    } catch (error) {
        handleCategoryError(error, parentId)
    }
}

export async function getSubcategoriesFake(_parentId?: number): Promise<Category[]> {

    await new Promise((resolve) => setTimeout(resolve, 300))

    return [
        {
            id: 101,
            parentId: 173497503,
            name: 'T-Shirts',
            thumbnailUrl: 'https://via.placeholder.com/150',
            description: ''
        },
        {
            id: 102,
            parentId: 173495753,
            name: 'Hoodies',
            thumbnailUrl: 'https://via.placeholder.com/150',
            description: ''
        }
    ].filter(x => x.parentId === _parentId);
}

function handleCategoryError(error: unknown, categoryId?: number): never {
    console.error('[CategoryService] Error:', error)

    if (error instanceof ApiError) {
        switch (error.type) {
            case ApiErrorType.NOT_FOUND:
                throw new Error(categoryId
                    ? `Category ${categoryId} not found`
                    : 'Categories not found')
            default:
                throw error
        }
    }

    throw new Error('Failed to load categories')
}

export const categoryService = {
    getAllCategories,
    getCategoryById,
    getSubcategories,
    getSubcategoriesFake
}