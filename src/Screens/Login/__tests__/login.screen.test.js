import LoginScreen from '../LoginScreen'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { loginForm } from '../login.form'
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
import {
    recoverPassword,
    recoverPasswordFail,
    recoverPasswordReset,
    recoverPasswordSuccess,
} from '../../../store/login/login.actions'

describe('Login screen', function () {
    const renderLoginScreen = (navigation) => {
        return (
            <Provider store={store}>
                <LoginScreen navigation={navigation} />
            </Provider>
        )
    }
    it('should go to search screen on login', async () => {
        const navigation = {
            navigate: () => {},
        }
        const spy = jest.spyOn(navigation, 'navigate')

        const page = render(renderLoginScreen(navigation))
        const email = page.getByTestId('email')
        const password = page.getByTestId('password')
        fireEvent.changeText(email, 'valid@email.com')
        fireEvent.changeText(password, 'validPassword')

        const loginButton = page.getByTestId('loginButton')

        fireEvent.press(loginButton)
        await waitFor(() =>
            expect(navigation.navigate).toBeCalledWith('Search')
        )
    })

    it('should go to register page', async () => {
        const navigation = {
            navigate: () => {},
        }
        const spy = jest.spyOn(navigation, 'navigate')

        const page = render(renderLoginScreen(navigation))

        const registerButton = page.getByTestId('registerButton')

        fireEvent.press(registerButton)
        await expect(navigation.navigate).toBeCalledWith('Register')
    })
    it('should form will be invalid if email is empty', () => {
        const formValues = { email: '' }

        expect(loginForm.isValidSync(formValues)).toBeFalsy()
    })

    it('should form will be invalid if email is invalid', () => {
        const formValues = { email: 'anything here' }

        expect(loginForm.isValidSync(formValues)).toBeFalsy()
    })
    it('should form be invalid if password is empty', () => {
        const formValues = { password: '', email: 'valid@email.com' }

        expect(loginForm.isValidSync(formValues)).toBeFalsy()
    })
    it('should form be valid', () => {
        const formValues = {
            password: 'validPassword',
            email: 'valid@email.com',
        }
        expect(loginForm.isValidSync(formValues)).toBeTruthy()
    })
    it('should show error messge if email is touched and it is empty', async () => {
        const page = render(renderLoginScreen())

        const email = page.getByTestId('email')
        fireEvent.changeText(email, '')

        const loginButton = page.getByTestId('loginButton')
        fireEvent.press(loginButton)

        await waitFor(() => page.getByTestId('error-email'))
    })
    it('should hide error message if email has not been touched', async () => {
        const page = render(renderLoginScreen())

        await waitFor(() =>
            expect(page.queryAllByTestId('error-password').length).toEqual(0)
        )
    })
    it('should disable the recovery password button if email is empty', async () => {
        const page = render(renderLoginScreen())

        const recoveryButton = page.getByTestId('recoveryButton')

        await waitFor(() =>
            expect(
                recoveryButton.props.accessibilityState.disabled
            ).toBeTruthy()
        )
    })
    it('should disable the recovery button if email has a error', async () => {
        const page = render(renderLoginScreen())
        const email = page.getByTestId('email')
        fireEvent.changeText(email, 'invalid')
        const recoveryButton = page.getByTestId('recoveryButton')

        await waitFor(() =>
            expect(
                recoveryButton.props.accessibilityState.disabled
            ).toBeTruthy()
        )
    })
    it('should show loading component and recover password on the forgot email/password', () => {
        const screen = render(renderLoginScreen())
        const email = screen.getByTestId('email')
        fireEvent.changeText(email, 'valid@email.com')
        const forgotEmailPasswordButton = screen.getByTestId('recoveryButton')
        fireEvent.press(forgotEmailPasswordButton)

        expect(store.getState().login.isRecoveringPassword).toBeTruthy()
        expect(store.getState().loading.show).toBeTruthy()
    })

    it('should show loading component and recover password on the forgot email/password', async () => {
        const screen = render(renderLoginScreen())
        const email = screen.getByTestId('email')
        fireEvent.changeText(email, 'valid@email.com')
        const forgotEmailPasswordButton = screen.getByTestId('recoveryButton')
        fireEvent.press(forgotEmailPasswordButton)

        await waitFor(() => {
            expect(store.getState().login.hasRecoveredPassword).toBeTruthy()
            // expect(store.getState().loading.show).toBeFalsy()
            screen.getByTestId('recoverPasswordSuccess')
        })
    })
    it('should success message when recover password is false ', async () => {
        const screen = render(<LoginScreen store={store} />)

        store.dispatch(recoverPassword())
        store.dispatch(recoverPasswordSuccess())
        store.dispatch(recoverPasswordReset())

        expect(
            screen.queryAllByTestId('recoverPasswordSuccess').length
        ).toEqual(0)
    })
    it('should hide loading component show error message when user has recovered password with an error', async () => {
        const screen = render(renderLoginScreen())
        const email = screen.getByTestId('email')
        fireEvent.changeText(email, 'error@email.com')
        const forgotEmailPasswordButton = screen.getByTestId('recoveryButton')
        fireEvent.press(forgotEmailPasswordButton)

        await waitFor(() => {
            expect(store.getState().login.hasRecoveredPassword).toBeFalsy()
            expect(store.getState().login.error).not.toBeNull()
            // expect(store.getState().loading.show).toBeFalsy()
            screen.getByTestId('recoverPasswordFail')
        })
    })
    it('should success message when recover password is false ', async () => {
        const screen = render(<LoginScreen store={store} />)

        store.dispatch(recoverPassword())
        store.dispatch(recoverPasswordFail({ error: 'message' }))
        store.dispatch(recoverPasswordReset())

        expect(screen.queryAllByTestId('recoverPasswordFail').length).toEqual(0)
    })
})
