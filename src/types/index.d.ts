declare module '*.svg' {
    import React = require('react')
    export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>
    const src: string
    export default src
}

export type PropertyTypes = {
    label: string
    value: string
}
