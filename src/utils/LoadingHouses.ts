export const emptyDeclaration = () => {}
// import React, { ReactElement, useEffect, useState } from 'react'
// import { Animated, Easing, View, Text } from 'react-native'
// import HouseImageSvgr from './house-svg.svg'
// import { FontAwesome } from '@expo/vector-icons'

// import styles, { carrotTopValue } from './loadingHouse.styles'

// interface CarrotProps {
//     topValue: Animated.Value
// }

// export function LoadingAnimation(): ReactElement {
//     const [carrotTopValueOne] = useState(new Animated.Value(carrotTopValue))
//     const [carrotTopValueTwo] = useState(new Animated.Value(carrotTopValue))
//     const [carrotTopValueThree] = useState(new Animated.Value(carrotTopValue))

//     const animationDuration = 300
//     const easeOut = Easing.bezier(0.0, 0.0, 0.58, 1.0)
//     const easeIn = Easing.bezier(0.42, 0.0, 1.0, 1.0)

//     const runAnimationSequence = (
//         value: Animated.Value,
//         delay: number
//     ): Animated.CompositeAnimation => {
//         return Animated.sequence([
//             Animated.timing(value, {
//                 toValue: 0,
//                 duration: animationDuration,
//                 delay: delay,
//                 easing: easeOut,
//                 useNativeDriver: false,
//             }),
//             Animated.timing(value, {
//                 toValue: carrotTopValue,
//                 duration: animationDuration,
//                 easing: easeIn,
//                 useNativeDriver: false,
//             }),
//         ])
//     }

//     const runAnimation = (): void => {
//         Animated.loop(
//             Animated.parallel([
//                 runAnimationSequence(carrotTopValueOne, 0),
//                 runAnimationSequence(carrotTopValueTwo, animationDuration / 2),
//                 runAnimationSequence(carrotTopValueThree, animationDuration),
//             ])
//         ).start()
//     }

//     const Carrot = ({ topValue }: CarrotProps): ReactElement => (
//         <Animated.View style={{ top: topValue }}>
//             <FontAwesome
//                 name="circle"
//                 size={24}
//                 color="black"
//                 style={styles.icon}
//             />
//         </Animated.View>
//     )

//     useEffect(() => {
//         runAnimation()
//     }, [])

//     return (
//         <View style={styles.container}>
//             <View style={styles.carrotContainer}>
//                 <Carrot topValue={carrotTopValueOne} />
//                 <Carrot topValue={carrotTopValueTwo} />
//                 <Carrot topValue={carrotTopValueThree} />
//             </View>
//             <Text style={styles.IconText}>Loading...</Text>
//         </View>
//     )
// }
