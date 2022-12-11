export default ({ config }) => {
    console.log(config)
    return {
        ...config,
        name: 'Property-Analyser',
        slug: 'Property-Analyser',
        updates: {
            url: 'https://u.expo.dev/a34f1767-6fed-40da-bab7-688f257c7f2e',
        },
        runtimeVersion: {
            policy: 'sdkVersion',
        },
    }
}
