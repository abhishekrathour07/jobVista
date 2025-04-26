export type SignupFormValue = {
    name: string,
    email: string
    password: string
    role: string

}

export type LoginFormValue = {
    email: string
    password: string
}

export interface loginResponsepayload {
    success: boolean;
    message: string;
    data: Data;
}
export interface Data {
    userId: string;
    name: string;
    role: string;
    profileImage: null;
}
