// Login page
// <KeyboardAvoidingView behavior="padding" style={styles.mainContainer}>
// <PropertyLogo />
// <View style={styles.inputContainer}>
// <TextInput
//     placeholder="Email"
// //   value={"" }
// onChangeText={(text) => setEmail(text)}
// style={styles.input}
// />
// <TextInput
// placeholder="Password"
// //   value={"" }
// onChangeText={(text) => setPassword(text)}
// style={styles.input}
// secureTextEntry
// />
// <View style={styles.buttonContainer}>
// {isSignedIn === true ? (
//     <TouchableOpacity onPress={handleLogout} style={styles.button}>
// <Text style={styles.buttonText}>Logout</Text>
//     </TouchableOpacity>
// ) : (
//     <View>
//         <TouchableOpacity onPress={handleLogin} style={styles.button}>
// <Text style={styles.buttonText}>Login</Text>
//     </TouchableOpacity>
//     <TouchableOpacity
// onPress={handleSignup}
// style={[styles.button, styles.buttonOutline]}
// >
// <Text style={styles.buttonOutlineText}>Register</Text>
//     </TouchableOpacity>
//     </View>
// )}
// </View>
// </View>
//
//
// </KeyboardAvoidingView>

// use effect login

// useEffect(() => {
//     if (props.loginState.isRecoveringPassword) {
//         props.showLoading()
//         AuthService.recoverPassword(recoveryEmail)
//             .then(() => {
//                 props.recoverPasswordSuccess()
//                 setTimeout(() => {
//                     props.hideLoading()
//                 }, 2000)
//             })
//             .catch((error) => {
//                 props.recoverPasswordFail(error)
//             })
//     } else {
//         props.hideLoading
//     }
// }, [props.loginState.isRecoveringPassword])
//
// const forgotEmailPassword = (email: string) => {
//     setRecoveryEmail(email)
//     props.recoverPassword()
// }
