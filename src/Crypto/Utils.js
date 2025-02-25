import CryptoJS from "crypto-js";

const secretKey = "abcd123"; 


export const encryptData = (data) => {
  if (data) {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  }
  return "Invalid Data"
 
};

export const decryptData = (encryptedData) => {
  if (encryptedData) {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, secretKey);

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
 
  return "Invalid Data"
};
