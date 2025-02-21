import CryptoJS from "crypto-js";

const secretKey = "abcd123"; 


export const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, secretKey).toString();
};


export const decryptPassword = (encryptedPassword) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
  return decrypted.toString(CryptoJS.enc.Utf8);
};
