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





export const encryptLogin = (login) => {
  if (login !== null && login !== undefined) {
    return CryptoJS.AES.encrypt(JSON.stringify(login), secretKey).toString();
  }
  return null;
};

export const decryptLogin = (encryptedLogin) => {
  if (encryptedLogin) {
    try {
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedLogin, secretKey);
      return JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error("Decryption failed:", error);
      return null;
    }
  }
  return null;
};

