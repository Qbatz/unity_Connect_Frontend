/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect } from "react";
import { useDispatch, connect } from 'react-redux';
import PropTypes from 'prop-types';


function MemberID ({state}) {

    const dispatch = useDispatch() 

  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
   const [error, setError] = useState({ prefix: "", suffix: "" });

useEffect(() => {
    if (state.Settings.statusCodeMemberID === 200) {
    
        setPrefix('');
        setSuffix('');
        dispatch({ type: 'CLEAR_STATUS_CODE_MEMBER_ID' });
       
    }
}, [state.Settings.statusCodeMemberID]);

const handlePrefix = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z]*$/.test(value)) {
      setPrefix(value);
      setError((prev) => ({ ...prev, prefix: "" }));
    } else {
      setError((prev) => ({ ...prev, prefix: "Prefix should contain only letters." }));
    }
  };
  const handleSuffix = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setSuffix(value);
      setError((prev) => ({ ...prev, suffix: "" }));
    } else {
      setError((prev) => ({ ...prev, suffix: "Suffix should contain only numbers." }));
    }
  };

  const handleSave = () => {

    let newError = { prefix: "", suffix: "" };
    let hasError = false;

    if (!prefix) {
      newError.prefix = "Prefix is required.";
      hasError = true;
    }
    if (!suffix) {
      newError.suffix = "Suffix is required.";
      hasError = true;
    }

    setError(newError);
    if (!hasError) {
    const payload = { 
        prefix:prefix,
        suffix:suffix,
    };

  

    dispatch({
        type: 'SETTINGSMEMBERID',
        payload: payload
    });
  }
}

  return (
    <div className="container mx-auto mt-10">
        <h1 className="text-xl font-semibold font-Gilroy">Member ID</h1>
      <p className="text-lightgray font-Gilroy text-sm font-normal mt-4">
        Set up the prefix and suffix for Member ID
      </p>
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-Gilroy font-medium">Prefix</label>
          <input
            className="border p-2 mt-4 rounded-xl w-full h-14"
            placeholder="Prefix"
            value={prefix}
            onChange={handlePrefix}
          />
           {error.prefix && (
            <p className="text-red-500 text-sm mt-1">{error.prefix}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-Gilroy font-medium">Suffix</label>
          <input
            className="border p-2 mt-4 rounded-xl w-full h-14"
            placeholder="Suffix"
            value={suffix}
            onChange={handleSuffix}
          />
           {error.suffix && (
            <p className="text-red-500 text-sm mt-1">{error.suffix}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-Gilroy font-medium">Preview</label>
          <input
            className="border p-2 rounded-xl mt-4 w-full bg-gray-100 h-14"
            placeholder="Preview"
            value={`${prefix}${suffix}`}
            disabled
          />
        </div>
      </div>

     
      <div className="mt-6 flex justify-end">
        <button onClick={handleSave} className="bg-lightgray text-white py-4 px-8 rounded-full text-base font-Gilroy font-medium">
          Save changes
        </button>
      </div>
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
