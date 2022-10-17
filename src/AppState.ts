import { LoadingState } from './store/loading/LoadingState'
import { LoginState } from './store/login/LoginState'

export interface AppState {
    loading: LoadingState
    login: LoginState
}
