import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { authentication } from '../../../../firebase'

interface AuthState {
    email: string
    password: string
    isSignedIn?: boolean
}

const initialState: AuthState = {
    email: '', /// email password should be within page state not global
    password: '', /// should incl session id for future use cases
    isSignedIn: false,
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
    },
})

export const { login, logout } = userLoginAndOutReducer.actions
export default userLoginAndOutReducer.reducer
