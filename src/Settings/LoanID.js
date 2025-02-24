import React,{useState,useEffect} from "react";
import { useDispatch, connect } from 'react-redux';

function LoanID ({state})  {
     const dispatch = useDispatch() 
    const [prefix, setPrefix] = useState("");
      const [suffix, setSuffix] = useState("");

      useEffect(() => {
        if (state.Settings.statusCodeLoanID === 200) {
        
            setPrefix('');
            setSuffix('');
            dispatch({ type: 'CLEAR_STATUS_CODE_LOAN_ID' });
           
        }
    }, [state.Settings.statusCodeLoanID]);

      const handleSuffix = (e) => {
        const value = e.target.value;
          if (/^\d*$/.test(value)) {
            setSuffix(value);
          }
      }

      const handleSave = () => {
        const payload = { 
            prefix:prefix,
            suffix:suffix,
        };
    
      
    
        dispatch({
            type: 'SETTINGSLOANID',
            payload: payload
        });
      }
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold font-Gilroy">Loan ID</h1>
      <p className="text-gray-500 font-Gilroy text-sm font-normal mt-4">
        Set up the prefix and suffix for Loan ID
      </p>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-Gilroy font-medium text-gray-700">Prefix</label>
          <input
            className="border p-2 rounded-md w-full"
            placeholder="Prefix"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-Gilroy font-medium text-gray-700">Suffix</label>
          <input
            className="border p-2 rounded-md w-full"
            placeholder="Suffix"
            value={suffix}
            onChange={handleSuffix}
          />
        </div>
        <div>
          <label className="block text-sm font-Gilroy font-medium text-gray-700">Preview</label>
          <input
            className="border p-2 rounded-md w-full bg-gray-100"
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
export default connect(mapsToProps)(LoanID)
