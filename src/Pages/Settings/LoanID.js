import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import PropTypes from 'prop-types';

function LoanID({ state }) {
  const dispatch = useDispatch();
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [error, setError] = useState({ prefix: "", suffix: "" });

  useEffect(() => {
    if (state.Settings.statusCodeLoanID === 200) {
      setPrefix("");
      setSuffix("");
      dispatch({ type: "CLEAR_STATUS_CODE_LOAN_ID" });
    }
  }, [state.Settings.statusCodeLoanID, dispatch]);


  const handlePrefix = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z]*$/.test(value)) {
      setPrefix(value);
      setError((prev) => ({ ...prev, prefix: "" }));
    } else {
      setError((prev) => ({ ...prev, prefix: "Prefix should contain only letters" }));
    }
  };


  const handleSuffix = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setSuffix(value);
      setError((prev) => ({ ...prev, suffix: "" }));
    } else {
      setError((prev) => ({ ...prev, suffix: "Suffix should contain only numbers" }));
    }
  };


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

    if (!hasError) {
      const payload = {
        prefix: prefix,
        suffix: suffix,
      };
      dispatch({
        type: "SETTINGSLOANID",
        payload: payload,
      });
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-xl font-semibold font-Gilroy">Loan ID</h1>
      <p className="text-gray-500 font-Gilroy text-sm font-normal mt-4">
        Set up the prefix and suffix for Loan ID
      </p>
      <div className="mt-4 grid grid-cols-4 gap-[150px]">

        <div className="w-[280px]">
          <label className="block text-sm font-Gilroy font-medium text-gray-700">
            Prefix
          </label>
          <input
            className="border p-2 rounded-xl h-14 mt-2 w-full"
            placeholder="Prefix"
            value={prefix}
            onChange={handlePrefix}
          />
          {error.prefix && (
            <p className="text-red-500 text-sm mt-1">{error.prefix}</p>
          )}
        </div>


        <div className="w-[280px]">
          <label className="block text-sm font-Gilroy font-medium text-gray-700">
            Suffix
          </label>
          <input
            className="border p-2 rounded-xl h-14 mt-2 w-full"
            placeholder="Suffix"
            value={suffix}
            onChange={handleSuffix}
          />
          {error.suffix && (
            <p className="text-red-500 text-sm mt-1">{error.suffix}</p>
          )}
        </div>


        <div className="w-[280px]">
          <label className="block text-sm font-Gilroy font-medium text-gray-700">
            Preview
          </label>
          <input
            className="border p-2 rounded-xl h-14 mt-2 w-full bg-gray-100"
            placeholder="Preview"
            value={`${prefix}${suffix}`}
            disabled
          />
        </div>
      </div>


      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          className="bg-lightgray text-white py-4 px-8 rounded-full text-base font-Gilroy font-medium"
        >
          Save changes
        </button>
      </div>
      {state.Settings.error === "Prefix and Suffix already Exist" && (
        <p className="text-red-500 text-sm text-center font-Gilroy">{state.Settings.error}</p>
      )}
    </div>
  );
}

const mapsToProps = (stateInfo) => {
  return {
    state: stateInfo,
  };
};

LoanID.propTypes = {
  state: PropTypes.object
}
export default connect(mapsToProps)(LoanID);
