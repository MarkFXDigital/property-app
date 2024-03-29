import { AppState } from './AppState'

export const AppInitialState: AppState = {
    loading: {
        show: false,
    },
    login: {
        error: null,
        isLoggingIn: false,
        hasRecoveredPassword: false,
        isRecoveringPassword: false,
        isLoggedIn: false,
        user: null,
    },
    loggingInState: {
        email: '',
        password: '',
        isLoggingIn: false,
        loggedInSuccess: false,
        loggedInFail: false,
    },
}
