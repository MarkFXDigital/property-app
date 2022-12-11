import * as SecureStore from 'expo-secure-store'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { authentication } from '../../../firebase'
import { store } from '../../redux/reducerSlice/store'
import {
    login,
    startLoading,
    stopLoading,
} from '../../redux/reducerSlice/slice'
import { useDispatch } from 'react-redux'

export const checkLoggedIn = async (props: any) => {
    let email: any | null = await SecureStore.getItemAsync('email')
    let password: any | null = await SecureStore.getItemAsync('password')
    store.dispatch(startLoading())
    if (email && password) {
        signInWithEmailAndPassword(authentication, email, password)
            .then(async () => {
                store.dispatch(stopLoading())
                store.dispatch(login())
                props.navigation.navigate('Search')
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                store.dispatch(stopLoading())
            })
    } else {
        store.dispatch(stopLoading())
        props.navigation.navigate('LoginStack', { screen: 'Login' })
    }
}
