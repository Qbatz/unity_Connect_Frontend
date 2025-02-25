// import { encryptPassword, decryptPassword } from "../Crypto/Utils";
import {encryptData, decryptData} from '../Crypto/Utils'

describe('it should handle encryption and decryption', () => {
    it('it verify the encryption when have some input', () => {
        const password = 'ABCD@1234'
        const encryptedPassword = encryptData(password)
        const decryptedPassword = decryptData(encryptedPassword)
        expect(decryptedPassword).toBe(password)
    })

    it('it should handle the null or empty string cases', () => {
        const encryptedPassword = encryptData('')
        expect(encryptedPassword).toBe('Invalid Data')
    })

    it('it cannot accept undefined', () => {
        const encryptedPassword = encryptData(undefined)
        expect(encryptedPassword).toBe('Invalid Data')
    })

    it('decryption should handle the null or empty string cases', () => {
        const encryptedPassword = decryptData('')
        expect(encryptedPassword).toBe('Invalid Data')
    })

    it('decryption cannot accept undefined', () => {
        const encryptedPassword = decryptData(undefined)
        expect(encryptedPassword).toBe('Invalid Data')
    })
}) 