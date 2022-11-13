import { configureStore } from '@reduxjs/toolkit'
import { loadingReducer } from '../loading/loading.reducer'
import { loginReducer, loggingInReducer } from '../login/login.reducers'
import userLoginAndOutReducer from './slice/index'

const reducer = {
    userLoginAndOut: userLoginAndOutReducer,
}

export const store = configureStore({
    reducer: {
        userLoginAndOut: userLoginAndOutReducer,
    },
})
