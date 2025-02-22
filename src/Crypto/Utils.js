import CryptoJS from "crypto-js";

const secretKey = "abcd123";


export const encryptPassword = (password) => {
  if (password && password.length > 0) {
    return CryptoJS.AES.encrypt(password, secretKey).toString();
  }
  return "Invalid Password"
};


export const decryptPassword = (encryptedPassword) => {
  if (encryptedPassword && encryptedPassword.length > 0) {
    const decrypted = CryptoJS.AES.decrypt(encryptedPassword, secretKey);

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  return "Invalid Password"
};
