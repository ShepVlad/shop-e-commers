import axios from 'axios'
import { ApiError, ApiErrorType } from '@/types/ecwid'

const ecwidApi = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_ECWID_STORE_ID}`,
    params: { token: import.meta.env.VITE_ECWID_TOKEN }
})

ecwidApi.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            debugger;
            switch (error.response.status) {
                case 404:
                    throw new ApiError(
                        ApiErrorType.NOT_FOUND,
                        'Resource not found',
                        error
                    )
                case 500:
                    throw new ApiError(
                        ApiErrorType.SERVER_ERROR,
                        'Server error occurred',
                        error
                    )
                case 401:
                    throw new ApiError(
                        ApiErrorType.UNAUTHORIZED,
                        'Authentication failed',
                        error
                    )
                default:
                    throw new ApiError(
                        ApiErrorType.SERVER_ERROR,
                        `HTTP error: ${error.response.status}`,
                        error
                    )
            }
        } else if (error.request) {
            throw new ApiError(
                ApiErrorType.NETWORK_ERROR,
                'Network connection error',
                error
            )
        } else {
            throw error
        }
    }
)

export default ecwidApi