/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import PropTypes from 'prop-types';
import img from '../../Asset/Images/Membertwo.svg'
import moment from "moment";
import { useDispatch, connect } from "react-redux";


function CommentSection({ state, member }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const Comments = state.Member.getComment;
  const formattedDate = moment(member.Joining_Date).format("DD-MM-YYYY");

  const isApiCalled = useRef(false);

  useEffect(() => {
    if (member?.Id && !isApiCalled.current) {
      dispatch({
        type: "GETCOMMENTS",
        payload: { id: member.Id },
      });
      isApiCalled.current = true;
    }
  }, [member?.Id]);

  useEffect(() => {
    if (state.Member.statusCodeForAddComment === 200) {

      dispatch({ type: 'GETCOMMENTS', payload: { id: member.Id } })
      dispatch({ type: 'CLEAR_STATUS_CODE_GET_COMMENTS' })
    }
  }, [state.Member.statusCodeForAddComment])


  const handleSubmit = () => {
    const payload = {
      id: member.Id,
      comment: comment
    };


    dispatch({ type: "ADDCOMMENTS", payload });
    setComment("")
  }

  return (
    <div className="pl-4 mt-2">

      <div className="space-y-6">

        <div key={member.Id} className="flex gap-4">

          <img
            src={img}
            alt='Member'
            className="w-12 h-12 rounded-full"
          />
          <div>

            <h3 className="font-semibold text-gray-900 font-Gilroy">{member.User_Name}</h3>
            <p className="text-sm text-gray-500 font-Gilroy mt-2">
              {formattedDate}. 9.30AM
            </p>

            <div className="mt-4 h-[150px] overflow-y-auto pr-2">
              {
                Comments && Comments.length > 0 && Comments.map((item, index) => (
                  <p key={index} className="mt-2 text-gray-700 font-Gilroy  p-2 rounded-md">{item.Comment}</p>
                ))
              }
            </div>




          </div>
        </div>

      </div>


      <div className="mt-10  border p-4 rounded-lg flex items-center">
        <input
          type="text"
          placeholder="Add comment..."
          className="w-full bg-transparent outline-none text-gray-700 px-2 font-Gilroy"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleSubmit} className="bg-black text-white p-2 rounded-full">
          <PiPaperPlaneRightFill />
        </button>
      </div>
    </div>
  );
};

const mapsToProps = (stateInfo) => {
  return {
    state: stateInfo,

  }
}
CommentSection.propTypes = {
  state: PropTypes.object,
  member: PropTypes.object
};

export default connect(mapsToProps)(CommentSection);
