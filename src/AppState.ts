import { LoadingState } from './store/loading/LoadingState'
import { LoggingInInfo, LoginState } from './store/login/LoginState'

export interface AppState {
    loading: LoadingState
    login: LoginState
    loggingInState: LoggingInInfo
}
