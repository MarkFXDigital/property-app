import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { authentication } from '../../../../firebase'

export interface AuthTopLevel {
    userLoginAndOut: {
        email: string
        password: string
        isSignedIn?: boolean
        isLoading: boolean
    }
}
export interface AuthState {
    email: string
    password: string
    isSignedIn?: boolean
    isLoading: boolean
}

const initialState: AuthState = {
    email: '',
    password: '',
    isSignedIn: false,
    isLoading: false,
}

const userLoginAndOutReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<void>) {
            state.isSignedIn = true
        },
        logout(state, action: PayloadAction<void>) {
            state.isSignedIn = false
        },
        startLoading(state, action: PayloadAction<void>) {
            state.isLoading = true
        },
        stopLoading(state, action: PayloadAction<void>) {
            state.isLoading = false
        },
    },
})

export const { login, logout, startLoading, stopLoading } =
    userLoginAndOutReducer.actions
export default userLoginAndOutReducer.reducer
