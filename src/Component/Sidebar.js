import React, { useState } from "react";
import Dashboard from "../Icons/Dashboard.svg";
import DashboardActive from "../Icons/DashboardActive.svg";
import Member from "../Icons/Member.svg";
import MemberActive from "../Icons/MemberActive.svg";
import Loan from "../Icons/Loan.svg";
import LoanActive from "../Icons/LoanActive.svg";
import Expenses from "../Icons/Expenses.svg";
import ExpensesActive from "../Icons/ExpensesActive.svg";
import Statements from "../Icons/Statements.svg";
import StatementActive from "../Icons/StatementActive.svg";
import Reports from "../Icons/Reports.svg";
import ReportsActive from "../Icons/ReportsActive.svg";
import settings from "../Icons/settings.svg";
import settingsActive from "../Icons/settingsActive.svg";
import Star from "../Icons/Star.svg";
import UnityConnectImg from "../Icons/UnityConnectImg.svg";
import ProfileIcon from "../Icons/ProfileIcon.svg";
import { FaBars, FaTimes } from "react-icons/fa";
import { encryptData } from "../Crypto/Utils";
import { useDispatch } from 'react-redux';
import Logout from "../Icons/turn-off.png";
import Settings from "../Settings/Settings";
import Members from "../Members/Member";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState("Members");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [logoutformshow, setLogoutFormShow] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };


  const handleLogout = () => {
    setLogoutFormShow(true);
  }


  const handleCloseLogout = () => setLogoutFormShow(false);

  const handleConfirmLogout = () => {
    dispatch({ type: 'LOGOUT' })

    const encryptDataLogin = encryptData(JSON.stringify(false));
    localStorage.setItem("unity_connect_login", encryptDataLogin.toString());
  }


  return (
    <>
      <div className="flex h-screen" data-testid='container-main'>
        <button
          data-testid='button-toggle'
          className={`md:hidden fixed left-4 mt-1 z-50 bg-gray-800 text-white p-2 rounded transition-transform duration-300 ${isSidebarOpen ? 'translate-x-44 ' : 'mt-7'}`}
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <FaTimes size={10} /> : <FaBars size={10} />}
        </button>

        <div
          className={`md:w-56 bg-white text-[#939393] flex flex-col border-r border-gray-100 fixed md:relative h-full z-40 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <div className="p-4 text-xl font-bold text-black flex items-center gap-2 mt-3 mb-3 ml-2">
            <img src={UnityConnectImg} alt="Unity Connect" className="w-5 h-5" />
            Unity Connect
          </div>

          <ul className="flex-1">
            {[
              { name: "Dashboard", icon: Dashboard, activeIcon: DashboardActive },
              { name: "Members", icon: Member, activeIcon: MemberActive },
              { name: "Loan", icon: Loan, activeIcon: LoanActive },
              { name: "Expenses", icon: Expenses, activeIcon: ExpensesActive },
              { name: "Statements", icon: Statements, activeIcon: StatementActive },
              { name: "Reports", icon: Reports, activeIcon: ReportsActive },
              { name: "Settings", icon: settings, activeIcon: settingsActive }
            ].map((menu, i) => (
              <li
                data-testid={`menu-item-${i}`}
                key={menu.name}
                className={`flex justify-between items-center px-4 py-2 ml-2 font-normal text-base leading-tight cursor-pointer ${activeMenu === menu.name ? "text-[#7F00FF]" : "text-black"}`}
                onClick={() => handleMenuClick(menu.name)}
              >
                <div className="flex items-center gap-3">
                  <img src={activeMenu === menu.name ? menu.activeIcon : menu.icon} alt={menu.name} className="w-4 h-4 mt-0.5" />
                  <span>{menu.name}</span>
                </div>
                {activeMenu === menu.name && <img src={Star} alt="Active" className="w-4 h-4" />}
              </li>
            ))}
          </ul>

          {/* <div className="p-4 flex items-center gap-1 mb-6">
          <img src={ProfileIcon} alt="Profile" className="w-14 h-14 rounded-full" />
          <div className="text-start">
            <p className="text-black font-semibold text-base leading-snug">John Doe</p>
            <p className="text-neutral-400 font-normal text-xs leading-tight">vikramkumar@gmail.com</p>
          </div>
        </div>


        <div className="flex items-center justify-center mb-2" >
        <img onClick={handleLogout}
                    src={Logout}
                    alt="Logout Icon"
                    style={{ width: 24, height: 24 }}
                    data-testid='img-logout'
                  />
        </div> */}
          <div className="p-4 flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <img src={ProfileIcon} alt="Profile" className="w-14 h-14 rounded-full" />
              <div className="text-start">
                <p className="text-black font-semibold text-base leading-snug">John Doe</p>
                <p className="text-neutral-400 font-normal text-xs leading-tight">vikramkumar@gmail.com</p>
              </div>
            </div>
            <img
              onClick={handleLogout}
              src={Logout}
              alt="Logout Icon"
              className="w-6 h-6 cursor-pointer"
              data-testid="img-logout"
            />
          </div>

        </div>

        <div className="flex-1">
          <div className="text-center">

          </div>

          {activeMenu === "Dashboard" && (
            <div data-testid='div-dashboard' className="bg-white mt-2">
              {/* <Dashboard /> */}
            </div>
          )}

          {activeMenu === "Members" && (
            <div data-testid='div-members' className="bg-white mt-2 p-6">
              <Members />
            </div>
          )}

          {activeMenu === "Loan" && (
            <div data-testid='div-loan' className="bg-white mt-2">
              {/* <Loan /> */}
            </div>
          )}

          {activeMenu === "Expenses" && (
            <div data-testid='div-expenses' className="bg-white mt-2">
              {/* <Expenses /> */}
            </div>
          )}

          {activeMenu === "Statements" && (
            <div data-testid='div-statements' className="bg-white mt-2">
              {/* <Statements /> */}
            </div>
          )}

          {activeMenu === "Reports" && (
            <div data-testid='div-reports' className="bg-white mt-2">
              {/* <Reports /> */}
            </div>
          )}

          {activeMenu === "Settings" && (
            <div data-testid='div-settings' className="bg-white mt-2 p-6">
              <Settings />
            </div>
          )}

        </div>
      </div>




      <div
        className={`fixed inset-0 flex items-center justify-center ${logoutformshow ? "visible" : "hidden"
          } bg-black bg-opacity-50`}
      >
        <div className="bg-white rounded-lg shadow-lg w-[388px] h-[200px] p-6">

          <div className="flex justify-center border-b-0">
            <h2 className="text-[18px] font-semibold text-[#222222] text-center flex-1">
              Logout?
            </h2>
          </div>


          <div className="text-center text-[14px] text-[#646464] font-medium mt-[20px]">
            Are you sure you want to Logout?
          </div>


          <div className="flex justify-center border-t-0 mt-[10px] space-x-4">
            <button
              data-testid='button-close-logout'
              className="w-[160px] h-[52px] rounded-lg border border-[#7F00FF] text-[#7F00FF] font-semibold text-[14px] bg-white"
              onClick={handleCloseLogout}
            >
              Cancel
            </button>
            <button
              data-testid='button-logout'
              className="w-[160px] h-[52px] rounded-lg bg-[#7F00FF] text-white font-semibold text-[14px]"
              onClick={handleConfirmLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>













    </>
  );
};

export default Sidebar;