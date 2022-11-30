import { string } from 'yup'

export function createConstants(...constants: any[]) {
    return constants.reduce((acc, constant) => {
        acc[constant] = constant
        return acc
    }, {})
}
