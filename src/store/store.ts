import { configureStore } from '@reduxjs/toolkit'
import { loadingReducer } from './loading/loading.reducer'
import { loginReducer, loggingInReducer } from './login/login.reducers'

export const reducers = {
    loading: loadingReducer,
    login: loginReducer,
    loggingInReducer,
}

export const store = configureStore({
    reducer: reducers,
})
