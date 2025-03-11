import React, { useState } from "react";
import Dashboard from "../Asset/Icons/Dashboard.svg";
import DashboardActive from "../Asset/Icons/DashboardActive.svg";
import Member from "../Asset/Icons/Member.svg";
import MemberActive from "../Asset/Icons/MemberActive.svg";
import Loan from "../Asset/Icons/Loan.svg";
import LoanActive from "../Asset/Icons/LoanActive.svg";
import Expenses from "../Asset/Icons/Expenses.svg";
import ExpensesActive from "../Asset/Icons/ExpensesActive.svg";
import Statement from "../Asset/Icons/Statement.svg";
import StatementActive from "../Asset/Icons/StatementActive.svg";
import Reports from "../Asset/Icons/Reports.svg";
import ReportsActive from "../Asset/Icons/ReportsActive.svg";
import settings from "../Asset/Icons/settings.svg";
import settingsActive from "../Asset/Icons/settingsActive.svg";
import Star from "../Asset/Icons/Star.svg";
import UnityConnectImg from "../Asset/Icons/UnityConnectImg.svg";
import ProfileIcon from "../Asset/Icons/ProfileIcon.svg";
import { FaBars, FaTimes } from "react-icons/fa";
import { encryptData } from "../Crypto/Utils";
import { useDispatch } from 'react-redux';
import Logout from "../Asset/Icons/turn-off.png";
import Settings from "../Pages/Settings/Settings";
import Members from "../Pages/Members/Member";
import AddLoanForm from "../Pages/Loan/AddLoanForm";
import Statements from "../Pages/Statements/Statements";
import ExpensesList from "../Pages/Expenses/Expenses";

const Sidebar = () => {

  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState("Dashboard");
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
          className={`md:hidden fixed left-4 mt-1 z-50 bg-gray-800 text-white p-2 rounded transition-transform duration-300 ${isSidebarOpen ? 'mx-36' : 'mt-7'}`}
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <FaTimes size={10} /> : <FaBars size={10} />}
        </button>
       


        <div
          className={`md:w-64 bg-white text-[#939393] flex flex-col border-r border-gray-300 fixed md:relative h-full z-40 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >

          <div className="p-4 text-xl font-bold text-black flex md:flex-wrap lg:flex-nowrap items-center gap-2 mt-3 mb-3 ml-2 md:justify-center lg:justify-start">
            <img src={UnityConnectImg} alt="Unity Connect" className="w-5 h-5" />
            <span className="font-Gilroy text-base md:text-sm lg:text-base whitespace-nowrap">Unity Connect</span>
          </div>


          <ul className="flex-1">
            {[
              { name: "Dashboard", icon: Dashboard, activeIcon: DashboardActive },
              { name: "Members", icon: Member, activeIcon: MemberActive },
              { name: "Loan", icon: Loan, activeIcon: LoanActive },
              { name: "Expenses", icon: Expenses, activeIcon: ExpensesActive },
              { name: "Statements", icon: Statement, activeIcon: StatementActive },
              { name: "Reports", icon: Reports, activeIcon: ReportsActive },
              { name: "Settings", icon: settings, activeIcon: settingsActive }
            ].map((menu, i) => (
              <li
                data-testid={`menu-item-${i}`}
                key={menu.name}
                className={`flex justify-between items-center px-4 py-2 ml-2 font-Gilroy md:text-sm lg:text-lg font-normal text-base leading-tight cursor-pointer ${activeMenu === menu.name ? "text-[#7F00FF]" : "text-gray-500"}`}
                onClick={() => handleMenuClick(menu.name)}
              >
                <div className="flex items-center gap-3">
                  <img src={activeMenu === menu.name ? menu.activeIcon : menu.icon} alt={menu.name} className="w-4 h-4 mt-0.5" />
                  <span>{menu.name}</span>
                </div>
                {activeMenu === menu.name && <img src={Star} alt="Active" className="w-4 h-4 block lg:block md:hidden"/>}

              </li>
            ))}
          </ul>



          <div className="p-2 flex items-center justify-between w-full md:flex-wrap lg:flex-nowrap ">
            <div className="flex items-center md:flex-wrap lg:flex-nowrap">
              <img src={ProfileIcon} alt="Profile" className="w-12 h-12 rounded-full lg:ml-0 sm:ml-0 md:ml-7" />
              <div className="md:text-center lg:text-start md:ml-2">
                <p className="text-black font-semibold text-base leading-snug font-Gilroy">John Doe</p>
                <p className="text-neutral-400 font-normal text-xs leading-tight font-Gilroy">vikram@gmail.com</p>
              </div>
            </div>
            <img
              onClick={handleLogout}
              src={Logout}
              alt="Logout Icon"
              className="w-5 h-5 cursor-pointer ml-2 md:ml-12 md:mt-1"
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
             <AddLoanForm/>
            </div>
          )}

          {activeMenu === "Expenses" && (
            <div data-testid='div-expenses' className="bg-white mt-2">
              <ExpensesList />
            </div>
          )}

          {activeMenu === "Statements" && (
            <div data-testid='div-statements' className="bg-white mt-2">
              <Statements />
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