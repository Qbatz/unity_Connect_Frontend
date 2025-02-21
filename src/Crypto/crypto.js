import React, { useEffect, useState } from "react";
import { encryptPassword, decryptPassword } from "../Crypto/Utils"; 

function CryptoComponent() {
  const password = "Mathu@1995";
  const [encryptedPassword, setEncryptedPassword] = useState("");
  const [decryptedPassword, setDecryptedPassword] = useState("");

  useEffect(() => {
    const encrypted = encryptPassword(password); 
    setEncryptedPassword(encrypted);

    const decryptedPass = decryptPassword(encrypted); 
    setDecryptedPassword(decryptedPass);
  }, [password]);

  console.log(
    "password",
    password,
    "encryptedPassword",
    encryptedPassword,
    "decryptedPassword",
    decryptedPassword
  );

  return <div></div>;
}

export default CryptoComponent;
