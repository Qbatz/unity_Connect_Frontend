import React, { useState, useRef, useEffect } from "react";
import { FaEllipsisH } from "react-icons/fa";
import img1 from "../Images/Memberone.svg";
import img2 from "../Images/Membertwo.svg";
import call from "../Icons/call.svg";
import sms from "../Icons/sms.svg";
import building from "../Icons/buildings.svg";
import editIcon from "../Icons/edit_blue.svg"; 
import deleteIcon from "../Icons/Delete.svg"; 


function ActiveMember() {
  const [openMenu, setOpenMenu] = useState(null);

  const popupRef = useRef(null);

const toggleMenu = (event, index) => {
    event.stopPropagation();
    setOpenMenu(openMenu === index ? null : index);
  };
  
  
  
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setOpenMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const members = [
    {
      id: "ABC001",
      name: "Justin Culhane",
      email: "justinculhane@gmail.com",
      phone: "+91 9876543210",
      address: "203, E block, Nivas Nagar, Chennai 2145602",
      status: "Active",
      subscription: "Subscriber",
      image: img1,
      joined: "Since Feb 2024",
    },
    {
      id: "ABC003",
      name: "Justin Culhane",
      email: "tatina@gmail.com",
      phone: "+91 9876543210",
      address: "105, A block, Nivas Nagar, Chennai 2145602",
      status: "Active",
      subscription: "Non Subscriber",
      image: img2,
      joined: "Since Feb 2024",
    },
    {
        id: "ABC003",
        name: "Alfonso Korsgaard",
        email: "alfonso@gmail.com",
        phone: "+91 9876543210",
        address: "105, A block, Nivas Nagar, Chennai 2145602",
        status: "Active",
        subscription: "Non Subscriber",
        image: img2,
        joined: "Since Feb 2024",
      },
      {
        id: "ABC003",
        name: "Justin Culhane",
        email: "kaylynnk@gmail.com",
        phone: "+91 9876543210",
        address: "105, A block, Nivas Nagar, Chennai 2145602",
        status: "Active",
        subscription: "Non Subscriber",
        image: img2,
        joined: "Since Feb 2024",
      },
      {
        id: "ABC003",
        name: "Justin Culhane",
        email: "justinculhane@gmail.com",
        phone: "+91 9876543210",
        address: "105, A block, Nivas Nagar, Chennai 2145602",
        status: "Active",
        subscription: "Non Subscriber",
        image: img2,
        joined: "Since Feb 2024",
      },
      {
        id: "ABC003",
        name: "Justin Culhane",
        email: "tatina@gmail.com",
        phone: "+91 9876543210",
        address: "105, A block, Nivas Nagar, Chennai 2145602",
        status: "Active",
        subscription: "Non Subscriber",
        image: img2,
        joined: "Since Feb 2024",
      },
  ];

 
  return (
    <>
     <div className="flex justify-end">
        <button
          
          className="bg-black text-white py-4 px-8 rounded-full text-base font-Gilroy font-medium mt-[-60px]"
        >
         + Add Member
        </button>
      </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {members.map((member, index) => (
        <div key={index} className="member-card bg-blue-50 p-4 rounded-3xl shadow-sm relative">
        
         
          <div className="absolute top-4 right-4">
            <FaEllipsisH
              className="text-gray-500 cursor-pointer"
              onClick={(event) => toggleMenu(event, index)}
            />
          </div>

         
          {openMenu === index && (
        <div
        ref={popupRef}
        className="absolute right-4 top-10 bg-white w-40 border border-gray-200 rounded-lg shadow-lg z-10 w-[160px]"
      >
              <button
                className="flex items-center gap-2 w-full px-3 py-2 text-blue-600 rounded-lg"
                onClick={() => console.log("Edit clicked")}
              >
                <img src={editIcon} alt="Edit" className="h-4 w-4" />
                Edit
              </button>
              <button
                className="flex items-center gap-2 w-full px-3 py-2 text-red-600  rounded-lg"
                onClick={() => console.log("Delete clicked")}
              >
                <img src={deleteIcon} alt="Delete" className="h-4 w-4" />
                Delete
              </button>
            </div>
          )}

        
          <div className="flex items-center gap-4">
            <img src={member.image} alt={member.name} className="rounded-full" />
            <div>
              <h3 className="font-semibold text-base font-Gilroy">{member.name}</h3>
              <div className="flex gap-2 text-sm mt-1">
                <span className="bg-blue-100 text-sm font-medium font-Gilroy  px-2 py-1 rounded-xl">
                  {member.id}
                </span>
                <span className="px-2 py-1 rounded-xl text-sm font-medium font-Gilroy bg-yellow-200 ">
                  {member.subscription}
                </span>
                <span
                  className={`px-2 py-1 rounded-xl text-sm font-medium font-Gilroy ${
                    member.status === "Active" ? "bg-green-200" : "bg-pink-200"
                  }`}
                >
                  {member.status}
                </span>
              </div>
            </div>
          </div>

        
          <div className="mt-3 text-sm text-gray-700">
            <div className="flex justify-stretch items-center">
              <p className="flex items-center gap-2 font-Gilroy">
                <img src={sms} className="text-gray-500" alt="sms" />
                {member.email}
              </p>
              <p className="flex items-center gap-2 font-Gilroy">
                <img src={call} className="text-gray-500" alt="call" />
                {member.phone}
              </p>
            </div>
            <p className="flex items-center gap-2 mt-2 font-Gilroy">
              <img src={building} className="text-gray-500" alt="building" />
              {member.address}
            </p>
          </div>

         
          <div className="flex justify-between items-center mt-3">
            <a href="#" className="text-purple-600 font-medium text-sm font-Gilroy">
              View attached documents
            </a>
            <span className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-xl font-Gilroy">
              {member.joined}
            </span>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default ActiveMember;
