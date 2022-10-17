import { LoginState } from './LoginState'
import { createReducer } from '@reduxjs/toolkit'
import {
    recoverPassword,
    recoverPasswordFail,
    recoverPasswordReset,
    recoverPasswordSuccess,
} from './login.actions'
import { AppState } from '../../AppState'
import { AppInitialState } from '../../AppInitialState'

const initialState: LoginState = AppInitialState.login

export const loginReducer = createReducer(initialState, (builder) => {
    builder.addCase(recoverPassword, (currentState) => {
        return {
            ...currentState,
            error: null,
            hasRecoveredPassword: false,
            isRecoveringPassword: true,
        }
    }),
        builder.addCase(recoverPasswordSuccess, (currentState) => {
            return {
                ...currentState,
                error: null,
                hasRecoveredPassword: true,
                isRecoveringPassword: false,
            }
        }),
        builder.addCase(recoverPasswordFail, (currentState, action) => {
            return {
                ...currentState,
                error: action.payload,
                isRecoveringPassword: false,
                hasRecoveredPassword: false,
            }
        })
    builder.addCase(recoverPasswordReset, (currentState) => {
        return {
            ...currentState,
            error: null,
            isRecoveringPassword: false,
            hasRecoveredPassword: false,
        }
    })
})
