import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyANpu4vYD4XL2uGITMcAFvwfxIJGq3VZI4',
    authDomain: 'property-analyser-react-native.firebaseapp.com',
    projectId: 'property-analyser-react-native',
    storageBucket: 'property-analyser-react-native.appspot.com',
    messagingSenderId: '117823080379',
    appId: '1:117823080379:web:407d80292e0d79bb8fa69e',
}

const app = initializeApp(firebaseConfig)
export const authentication = getAuth(app)
// const analytics = getAnalytics(app)
