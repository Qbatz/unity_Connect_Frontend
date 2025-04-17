/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdError } from "react-icons/md";

function MemberID({ state }) {

  const dispatch = useDispatch()

  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [error, setError] = useState({ prefix: "", suffix: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [id, setId] = useState('');
  const [originalPrefix, setOriginalPrefix] = useState("");
  const [originalSuffix, setOriginalSuffix] = useState("");


  const members = state.SignIn.members || [];

  const MemberData = members[0] || {};

  useEffect(() => {
    if (state.Settings.statusCodeMemberID === 200) {
      dispatch({ type: 'PROFILEDETAILS' });

      dispatch({ type: 'CLEAR_STATUS_CODE_MEMBER_ID' });
      setErrorMessage("");
    }
    return () => {
      dispatch({ type: 'CLEAR_ERROR' })
    }
  }, [state.Settings.statusCodeMemberID]);

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
    if (MemberData && (MemberData.Prefix || MemberData.Suffix)) {
      const loadedPrefix = MemberData.Prefix || "";
      const loadedSuffix = MemberData.Suffix || "";

      setPrefix(loadedPrefix);
      setSuffix(loadedSuffix);


      setOriginalPrefix(loadedPrefix);
      setOriginalSuffix(loadedSuffix);

      setId(MemberData.Id || "");
    }
  }, [MemberData]);





  useEffect(() => {
    if (state.SignIn.members?.length > 0) {
      setId(state.SignIn.members[0]?.Id)
    }
  }, [state.SignIn.members])

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

    if (prefix === originalPrefix && suffix === originalSuffix) {
      setErrorMessage("Prefix and Suffix already Exist");
      return;
    }

    setErrorMessage("");
    const payload = { id, prefix, suffix };
    dispatch({ type: "SETTINGSMEMBERID", payload });
    setOriginalPrefix(prefix);
    setOriginalSuffix(suffix);

  };

  useEffect(() => {
    if (state.Settings.error === "Prefix and Suffix already Exist") {
      setErrorMessage(state.Settings.error);

      dispatch({ type: "CLEAR_MEMBER_ID_ERROR" });

    }
  }, [state.Settings.error]);


  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-xl font-semibold font-Gilroy">Member ID</h1>
      <p className="text-lightgray font-Gilroy text-sm font-normal mt-3">
        Set up the prefix and suffix for Member ID
      </p>
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="w-full">
            <label className="block text-sm font-Gilroy font-medium">Prefix</label>
            <input
              className="border p-2 text-sm font-Gilroy mt-4 rounded-xl w-full h-14"
              placeholder="Prefix"
              value={prefix}
              onChange={handlePrefix}
            />
            {error.prefix && (
              <div className="flex items-center text-red-500 text-xs mt-1">
                <MdError className="mr-1 text-sm" />
                <p >{error.prefix}</p>
              </div>
            )}
          </div>
          <div className="w-full">
            <label className="block text-sm font-Gilroy font-medium">Suffix</label>
            <input
              className="border p-2 mt-4 text-sm font-Gilroy rounded-xl w-full h-14"
              placeholder="Suffix"
              value={suffix}
              onChange={handleSuffix}
            />
            {error.suffix && (
              <div className="flex items-center text-red-500 text-xs mt-1">
                <MdError className="mr-1 text-sm" />
                <p>{error.suffix}</p>
              </div>
            )}
          </div>
          <div className="w-full">
            <label className="block text-sm font-Gilroy text-sm font-Gilroy font-medium">Preview</label>
            <input
              className="border p-2 rounded-xl mt-4 w-full bg-[#F4F7FF] h-14"
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

        <div className="flex items-center justify-center text-red-500 text-xs mt-1">
          <MdError className="mr-1 text-sm" />
          <p className="font-Gilroy">{errorMessage}</p>
        </div>

      )}


    </div>

  );
};

const mapsToProps = (stateInfo) => {
  return {
    state: stateInfo
  }
}

MemberID.propTypes = {
  state: PropTypes.object,
};
export default connect(mapsToProps)(MemberID)


