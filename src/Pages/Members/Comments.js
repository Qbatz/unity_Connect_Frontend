/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import PropTypes from 'prop-types';
import img from '../../Asset/Images/Membertwo.svg';
import moment from "moment";
import { useDispatch, connect } from "react-redux";

function CommentSection({ state, member }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [localComments, setLocalComments] = useState([]);

  const commentSectionRef = useRef(null);

  useEffect(() => {

    if (commentSectionRef.current) {
      commentSectionRef.current.scrollTop = commentSectionRef.current.scrollHeight;
    }
  }, [localComments]);

  useEffect(() => {

    dispatch({ type: "GETCOMMENTS", payload: { id: member.Id } });

  }, []);

  useEffect(() => {
    if (state.Member.getComment) {
      setLocalComments(state.Member.getComment);
    }
  }, [state.Member.getComment]);

  useEffect(() => {
    if (state.Member.statusCodeForAddComment === 200) {

      dispatch({ type: "GETCOMMENTS", payload: { id: member.Id } });


      dispatch({ type: "CLEAR_STATUS_CODE_ADD_COMMENTS" });
    }
  }, [state.Member.statusCodeForAddComment]);






  const handleSubmit = () => {
    if (!comment.trim()) return;

    const newComment = {
      Comment: comment,
      User_Name: member.User_Name,
      Joining_Date: moment().format("DD-MM-YYYY"),
    };

    setLocalComments([newComment, ...localComments]);

    dispatch({
      type: "ADDCOMMENTS",
      payload: { id: member.Id, comment },
    });

    setComment("");
  };

  return (
    <div className="pl-4 mt-2">
      <div ref={commentSectionRef} className="space-y-6 max-h-[230px] overflow-y-auto">
        {localComments.length > 0 &&
          localComments.map((item, index) => (
            <div key={index} className="mt-4 flex items-start gap-4">

              <img src={img} alt="Member" className="w-12 h-12 rounded-full" />


              <div className="flex flex-col">
                <h3 className="font-semibold text-[#222222] font-Gilroy">{member.User_Name}</h3>
                <p className="text-sm font-medium text-[#939393] font-Gilroy mt-1">

                  {moment(item.Created_At).format("DD MMM YYYY . hh:mm A")}
                </p>

                <div style={{ marginLeft: '-70px' }} className="mt-2   p-2  inline-block ">
                  <p className="text-gray-700 font-Gilroy">{item.Comment}</p>
                </div>
              </div>
            </div>
          ))}
      </div>




      <div className="fixed bottom-6 lg:left-[260px] sm:left-[40px] xs:left-[0px] md:left-[300px] right-4 z-50 px-6 py-4"> {/* Adjust left based on sidebar width */}
        <div className="flex items-center bg-white rounded-lg px-4 py-2 border border-gray-200 h-[70px]">
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

    </div>
  );
}

const mapsToProps = (stateInfo) => {
  return {
    state: stateInfo,
  };
};

CommentSection.propTypes = {
  state: PropTypes.object,
  member: PropTypes.object,
};

export default connect(mapsToProps)(CommentSection);
