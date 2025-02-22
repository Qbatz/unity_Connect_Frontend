import { encryptPassword, decryptPassword } from "../../Crypto/Utils";

describe('it should handle encryption and decryption', () => {
    it('it verify the encryption when have some input', () => {
        const password = 'ABCD@1234'
        const encryptedPassword = encryptPassword(password)
        const decryptedPassword = decryptPassword(encryptedPassword)
        expect(decryptedPassword).toBe(password)
    })

    it('it should handle the null or empty string cases', () => {
        const encryptedPassword = encryptPassword('')
        expect(encryptedPassword).toBe('Invalid Password')
    })

    it('it cannot accept undefined', () => {
        const encryptedPassword = encryptPassword(undefined)
        expect(encryptedPassword).toBe('Invalid Password')
    })

    it('decryption should handle the null or empty string cases', () => {
        const encryptedPassword = decryptPassword('')
        expect(encryptedPassword).toBe('Invalid Password')
    })

    it('decryption cannot accept undefined', () => {
        const encryptedPassword = decryptPassword(undefined)
        expect(encryptedPassword).toBe('Invalid Password')
    })
}) 