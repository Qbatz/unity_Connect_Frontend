/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import PropTypes from "prop-types";
import { MdError } from "react-icons/md";


function TransactionID({ state }) {


  const dispatch = useDispatch();
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [error, setError] = useState({ prefix: "", suffix: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [id, setId] = useState('');


  useEffect(() => {
    if (state.Settings.statusCodeTransactionID === 200) {

      setErrorMessage("");
      dispatch({ type: "CLEAR_STATUS_CODE_TRANSACTION_ID" });
      ;
    }

    return () => {
      dispatch({ type: "CLEAR_ERROR" });
    };
  }, [state.Settings.statusCodeTransactionID]);


  const handlePrefix = (e) => {
    const value = e.target.value;
    setErrorMessage('')
    if (/^[A-Za-z]*$/.test(value)) {
      setPrefix(value);
      setError((prev) => ({ ...prev, prefix: "" }));
    } else {
      setError((prev) => ({ ...prev, prefix: "Prefix should contain only letters" }));
    }
  };

  const handleSuffix = (e) => {
    const value = e.target.value;
    setErrorMessage('')
    if (/^\d*$/.test(value)) {
      setSuffix(value);
      setError((prev) => ({ ...prev, suffix: "" }));
    } else {
      setError((prev) => ({ ...prev, suffix: "Suffix should contain only numbers" }));
    }
  };

  useEffect(() => {
    const storedPrefix = localStorage.getItem("TransactionIDprefix") || state.Settings?.TransactionIDprefix || "";
    const storedSuffix = localStorage.getItem("TransactionIDsuffix") || state.Settings?.TransactionIDsuffix || "";
    const storedId = localStorage.getItem("TransactionId") || state.Settings?.TransactionId || "";


    setId(storedId)
    setPrefix(storedPrefix);
    setSuffix(storedSuffix);
  }, []);

  useEffect(() => {
    if (state.Settings.statusCodeTransactionID === 200) {


      localStorage.setItem("TransactionId", id);
      localStorage.setItem("TransactionIDprefix", prefix);
      localStorage.setItem("TransactionIDsuffix", suffix);
      dispatch({ type: 'CLEAR_STATUS_CODE_TRANSACTION_ID' });
    }
    return () => {
      dispatch({ type: 'CLEAR_ERROR' });
    };
  }, [state.Settings.statusCodeTransactionID])


  useEffect(() => {
    if (state.SignIn.transactions.length > 0) {
      setId(state.SignIn.transactions[0].Id)
    }
  }, [state.SignIn.transactions])




  const handleSave = () => {
    let newError = { prefix: "", suffix: "" };
    let hasError = false;

    if (!prefix) {
      newError.prefix = "Prefix is required";
      hasError = true;
    }
    if (!suffix) {
      newError.suffix = "Suffix is required";
      hasError = true;
    }

    setError(newError);

    if (hasError) return;
    const storedId = localStorage.getItem("TransactionId") || "";
    const storedPrefix = localStorage.getItem("TransactionIdprefix") || "";
    const storedSuffix = localStorage.getItem("TransactionIdsuffix") || "";


    if (prefix === storedPrefix && suffix === storedSuffix) {
      setErrorMessage("Prefix and Suffix already exist");
      return;
    }
    else {

      setErrorMessage("");
      const payload = { id, prefix, suffix };
      dispatch({ type: "SETTINGSTRANSACTIONID", payload });
      localStorage.setItem("TransactionIdprefix", prefix);
      localStorage.setItem("TransactionIdsuffix", suffix);
      localStorage.setItem("TransactionId", storedId)
    }
  };


  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-xl font-semibold font-Gilroy">Transaction ID</h1>
      <p className="text-lightgray font-Gilroy text-sm font-normal mt-3">
        Set up the prefix and suffix for Transaction ID
      </p>
      <div className="flex justify-center  lg:justify-start">
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1  lg:grid-cols-3 gap-6">
          <div className="w-[280px]">
            <label className="block text-sm font-Gilroy font-medium">Prefix</label>
            <input
              className="border p-2 mt-4  text-sm font-Gilroy rounded-xl w-full h-14"
              placeholder="Prefix"
              value={prefix}
              onChange={handlePrefix}

            />
            {error.prefix && (
              <div className="flex items-center text-red-500 text-sm mt-1">
                <MdError className="mr-1 text-sm" />
                <p>{error.prefix}</p>
              </div>
            )}
          </div>
          <div className="w-[280px]">
            <label className="block text-sm font-Gilroy font-medium">Suffix</label>
            <input
              className="border p-2 mt-4  text-sm font-Gilroy rounded-xl w-full h-14"
              placeholder="Suffix"
              value={suffix}
              onChange={handleSuffix}

            />
            {error.suffix && (
              <div className="flex items-center text-red-500 text-sm mt-1">
                <MdError className="mr-1 text-sm" />
                <p>{error.suffix}</p>
              </div>
            )}
          </div>
          <div className="w-[280px]">
            <label className="block text-sm font-Gilroy font-medium">Preview</label>
            <input
              className="border p-2 rounded-xl  text-sm font-Gilroy mt-4 w-full bg-[#F4F7FF] h-14"
              placeholder="Preview"
              value={`${prefix}${suffix}`}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button onClick={handleSave} className="bg-black text-white py-4 px-8 rounded-full text-base font-Gilroy font-medium">
          Save changes
        </button>
      </div>

      {errorMessage && (
        <p className="text-red-500 text-sm text-center font-Gilroy">{errorMessage}</p>
      )}
    </div>
  );
}

const mapsToProps = (stateInfo) => {
  return {
    state: stateInfo,
  };
};

TransactionID.propTypes = {
  state: PropTypes.object,
};

export default connect(mapsToProps)(TransactionID);
