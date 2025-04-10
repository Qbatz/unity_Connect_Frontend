import React, { useState, useEffect } from "react";
import ActiveMember from "./Activemember";
import NonActiveMember from "./NonActivemember";
import AddMemberForm from "./AddMemberForm";
import MemberDetails from "./MemberDetails";
import { useDispatch } from "react-redux";

const Members = () => {
  const [activeTab, setActiveTab] = useState("Active members");
  const [selectedMemberdetails, setSelectedMemberdetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch();

  const handleClickAddMember = () => {

    setShowModal(true);
    setSelectedMember("");

  }

  const handleOnClose = () => {
    setShowModal(false);

  }


  useEffect(() => {
    setLoading(true);

    dispatch({ type: 'MEMBERLIST' });

  }, []);


  return (
    <div className="container mx-auto mt-4">

      {!selectedMemberdetails && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[24px] font-semibold font-Gilroy leading-[28.63px] text-black mb-4">
            Members
          </h2>
          <div data-testid='active-member-div' className="flex justify-end">
            <button
              data-testid="button-add-member"

              className="bg-black text-white py-3 px-6 rounded-full text-base font-Gilroy font-medium"
              onClick={handleClickAddMember}
            >
              + Add Member
            </button>
          </div>
        </div>
      )}

      {!selectedMemberdetails && (
        <div data-testid='members-tab' className="flex overflow-x-auto whitespace-nowrap flex-nowrap gap-8 scrollbar-hide">
          {["Active members", "In active members"].map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              data-testid={`button-tab-${index}`}
              className={`pb-2 text-[16px] font-base font-Gilroy transition-all relative min-w-max ${activeTab === tab ? "text-black font-semibold" : "text-[#939393]"
                }`}
            >
              {tab}
              <span
                className={`absolute left-0 bottom-0 h-[3px] w-full transition-all ${activeTab === tab ? "bg-black" : "bg-transparent"
                  }`}
              ></span>
            </button>
          ))}
        </div>
      )}

      <div className="">
        {!selectedMemberdetails ? (
          activeTab === "Active members" ? (
            <ActiveMember onSelectMember={setSelectedMemberdetails} loading={loading} setLoading={setLoading} />
          ) : (
            <NonActiveMember onSelectMember={setSelectedMemberdetails} loading={loading} setLoading={setLoading} />
          )
        ) : (
          <MemberDetails member={selectedMemberdetails} onBack={() => setSelectedMemberdetails(null)} />

        )
        }

        {showModal && <AddMemberForm memberData={selectedMember} onClose={handleOnClose} />}
      </div>

    </div>
  );
};

export default Members;
