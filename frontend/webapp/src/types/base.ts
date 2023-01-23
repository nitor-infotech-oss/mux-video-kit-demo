export type ServerError = {
    status?: number
    errors: string
}

export type RemoteDataStatus = 'loading' | 'success' | 'failure'

export type SuccessResult<T> = {
    remote: Extract<RemoteDataStatus, 'success'>
    data: T
    error?: ServerError
}

export type ErrorResult = {
    remote: Extract<RemoteDataStatus, 'failure'>
    error: ServerError
}

export type BaseResponse = {
    success: boolean
    message: string
}