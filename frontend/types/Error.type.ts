export interface ResponseError {
    message: string; 
    error?: string; 
    details?: Record<string, any>; 
}