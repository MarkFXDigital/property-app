import { loginReducer } from '../login.reducers'
import {
    recoverPassword,
    recoverPasswordFail,
    recoverPasswordReset,
    recoverPasswordSuccess,
} from '../login.actions'
import { AppInitialState } from '../../../AppInitialState'

describe('Login store', () => {
    const initialState = {
        ...AppInitialState.login,
    }
    it('should be in the process recovering password', () => {
        const newState = loginReducer(initialState, recoverPassword())
        expect(newState).toEqual({
            ...initialState,
            error: null,
            hasRecoveredPassword: false,
            isRecoveringPassword: true,
        })
    })
    it('should have finished and recovered password', () => {
        const initialState = {
            ...AppInitialState.login,
            isRecoveringPassword: false,
        }
        const newState = loginReducer(initialState, recoverPasswordSuccess())
        expect(newState).toEqual({
            ...initialState,
            error: null,
            hasRecoveredPassword: true,
            isRecoveringPassword: false,
        })
    })
    it('should user fail to recover password', () => {
        const initialState = {
            ...AppInitialState.login,
        }
        const error = { message: 'error' }
        const newState = loginReducer(initialState, recoverPasswordFail(error))
        expect(newState).toEqual({
            ...initialState,
            error,
            hasRecoveredPassword: false,
            isRecoveringPassword: false,
        })
    })
    it('should user reset password ', () => {
        const initialState = {
            ...AppInitialState.login,
            error: { error: 'message' },
            hasRecoveredPassword: true,
            isRecoveringPassword: true,
        }
        const error = { message: 'message' }
        const newState = loginReducer(initialState, recoverPasswordReset())

        expect(newState).toEqual({
            ...AppInitialState.login,
        })
    })
})
