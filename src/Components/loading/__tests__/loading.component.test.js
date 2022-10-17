import LoadingComponent from '../loading.component'
import { render } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
import { hide, show } from '../../../store/loading/loading.actions'

describe('loading effect component', () => {
    it('should hide loading component when not loading state is false', () => {
        const component = render(
            <Provider store={store}>
                <LoadingComponent />
            </Provider>
        )
        store.dispatch(hide())
        const loading = component.queryAllByTestId('loadingComponent')
        expect(loading.length).toEqual(0)
    })
    it('should show loading when component is loading', () => {
        const component = render(
            <Provider store={store}>
                <LoadingComponent />
            </Provider>
        )
        store.dispatch(show())

        const loading = component.queryAllByTestId('loadingComponent')
        expect(loading.length).toEqual(1)
    })
})
