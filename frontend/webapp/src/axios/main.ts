import { message } from 'antd'
import axios, { AxiosError } from 'axios'
// import { AxiosAuthRefreshRequestConfig } from 'axios-auth-refresh'
import { ErrorResult, SuccessResult } from '../types/base'

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/',
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
})



export const parseResponse = <T>(response: any): SuccessResult<T> | ErrorResult => {
    const data = JSON.parse(response)
    if (data?.errors) {
        return {
            remote: 'failure',
            error: {
                errors: data.errors,
            },
        }
    }
    return {
        remote: 'success',
        data,
        error: { errors: '' },
    }
}

const request = async <T>(
    config: any
): Promise<SuccessResult<T> | ErrorResult> => {
    try {
        const response = await axiosInstance.request<T>({
            ...config,
            transformResponse: (res:any) => {
                const resp = parseResponse<T>(res)
                return resp.remote === 'success' ? resp.data : resp
            },
        })
        return {
            remote: 'success',
            data: response.data,
        }
    } catch (error: any) {
       
        throw error
    }
}

const axiosContainer = { request }
export default axiosContainer
