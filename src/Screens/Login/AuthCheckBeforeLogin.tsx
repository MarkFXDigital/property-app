import * as SecureStore from 'expo-secure-store'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { authentication } from '../../../firebase'
import { store } from '../../redux/reducerSlice/store'
import { login } from '../../redux/reducerSlice/slice'

export const checkLoggedIn = async (props: any) => {
    let email: any | null = await SecureStore.getItemAsync('email')
    let password: any | null = await SecureStore.getItemAsync('password')
    if (email && password) {
        signInWithEmailAndPassword(authentication, email, password)
            .then(async () => {
                store.dispatch(login())
                props.navigation.navigate('Search')
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                return
            })
    } else {
        await props.navigation.navigate('LoginStack', { screen: 'Login' })
    }
}
