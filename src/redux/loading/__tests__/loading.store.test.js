import { loadingReducer } from '../loading.reducer'
import { hide, show } from '../loading.actions'
import { createAction } from '@reduxjs/toolkit'

describe('loading redux', () => {
    it('should show be true when when show is used', () => {
        const initialState = { show: false }
        const newState = loadingReducer(initialState, show)

        expect(newState).toEqual({ show: true })
    })
    it('should show be false when when hide is used ', () => {
        const initialState = { show: false }
        const newState = loadingReducer(initialState, hide)

        expect(newState).toEqual({ show: false })
    })
    it('should keep state if action is unknown', () => {
        const initialState = { show: false }
        const action = createAction('unknown')
        const newState = loadingReducer(initialState, action)

        expect(newState).toEqual(initialState)
    })
})
