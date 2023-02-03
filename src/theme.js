import { DefaultTheme } from 'react-native-paper'

export const theme = {
    //   // fonts
    //   fontFamilyBold: "Oswald-Bold",
    //   fontFamilyRegular: "Oswald-Regular",
    //   fontFamilyLight: "Oswald-Light",
    // };

    // Font.loadAsync({
    //   fontFamilyBold: require("./Assets/fonts/Oswald/Oswald-Bold.ttf"),
    //   fontFamilyRegular: require("./Assets/fonts/Oswald/Oswald-Regular.ttf"),
    //   fontFamilyLight: require("./Assets/fonts/Oswald/Oswald-Light.ttf"),
    ...DefaultTheme,
    mainGold: '#ad974f',
    colors: {
        ...DefaultTheme.colors,
        primary: 'rgb(101,37,131)',
        mainGold: '#ad974f',
        background: 'transparent',
    },
}

// mainGold: "#ad974f",
