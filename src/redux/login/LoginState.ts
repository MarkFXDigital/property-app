export interface LoginState {
    error: any
    isLoggedIn: boolean
    isLoggingIn: boolean
    isRecoveringPassword: boolean
    hasRecoveredPassword: boolean
    user: any
}
export interface LoggingInInfo {
    email: string
    password: string
    isLoggingIn: boolean
    loggedInSuccess: boolean
    loggedInFail: boolean
}
