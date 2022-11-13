import { LoadingState } from './redux/loading/LoadingState'
import { LoggingInInfo, LoginState } from './redux/login/LoginState'

export interface AppState {
    loading: LoadingState
    login: LoginState
    loggingInState: LoggingInInfo
}
