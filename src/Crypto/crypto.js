import React, { useEffect , useState} from 'react'
import CryptoJS from "crypto-js";



function CryptoComponent() {


  const secretKey = "abcd123";


  const password = "Mathu@1995"
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const [decryptedPassword, setDecryptedPassword] = useState("");

  useEffect(() => {
    const encrypted = CryptoJS.AES.encrypt(password, secretKey).toString();
    setEncryptedPassword(encrypted);

    const decrypted= CryptoJS.AES.decrypt(encrypted, secretKey);
    const decryptedPass = decrypted.toString(CryptoJS.enc.Utf8);
    setDecryptedPassword(decryptedPass);


  }, [password])


  console.log("password",password, "encryptedPassword",encryptedPassword, "decryptedPassword",decryptedPassword)



  return (
    <div>

{/* <h2>welcome</h2> */}


    </div>
  )
}

export default CryptoComponent