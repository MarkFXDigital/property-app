import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { authentication } from '../../../firebase'

interface loggedInStateWithRedux {
    setIsLoggedIn: boolean
    email: string
    password: string
    navigation: any
}

const initialState = {
    setIsLoggedIn: false,
    email: '',
    password: '',
    navigation: null,
} as loggedInStateWithRedux

const loggedInSlice = createSlice({
    name: 'loggedInWithRedux',
    initialState,
    reducers: {
        logIn(state) {
            signInWithEmailAndPassword(
                authentication,
                state.email,
                state.password
            )
                .then(() => {
                    state.setIsLoggedIn = true
                    state.navigation.navigate('Search')
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                })
        },
    },
})

export const { logIn } = loggedInSlice.actions
export default loggedInSlice.reducer
