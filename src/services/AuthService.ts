class AuthService {
    recoverPassword(email: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (email == 'error@email.com') {
                reject({ message: 'email not found' })
            } else {
                resolve()
            }
        })
    }
}

export default new AuthService()
