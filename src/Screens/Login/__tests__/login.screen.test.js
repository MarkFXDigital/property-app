import LoginScreen from '../LoginScreen'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { loginForm } from '../login.form'

describe('Login screen', function () {
    it('should go to search screen on login', async () => {
        const navigation = {
            navigate: () => {},
        }
        const spy = jest.spyOn(navigation, 'navigate')

        const page = render(<LoginScreen navigation={navigation} />)
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

        const page = render(<LoginScreen navigation={navigation} />)

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
        const page = render(<LoginScreen />)

        const email = page.getByTestId('email')
        fireEvent.changeText(email, '')

        const loginButton = page.getByTestId('loginButton')
        fireEvent.press(loginButton)

        await waitFor(() => page.getByTestId('error-email'))
    })
    it('should hide error message if email has not been touched', async () => {
        const page = render(<LoginScreen />)

        await waitFor(() =>
            expect(page.queryAllByTestId('error-password').length).toEqual(0)
        )
    })
    it('should disable the recovery password button if email is empty', async () => {
        const page = render(<LoginScreen />)

        const recoveryButton = page.getByTestId('recoveryButton')

        await waitFor(() =>
            expect(
                recoveryButton.props.accessibilityState.disabled
            ).toBeTruthy()
        )
    })
    it('should disable the recovery button if email has a error', async () => {
        const page = render(<LoginScreen />)
        const email = page.getByTestId('email')
        fireEvent.changeText(email, 'invalid')
        const recoveryButton = page.getByTestId('recoveryButton')

        await waitFor(() =>
            expect(
                recoveryButton.props.accessibilityState.disabled
            ).toBeTruthy()
        )
    })
})
