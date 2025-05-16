/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
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
import { FaBars, FaTimes } from "react-icons/fa";
import Settings from "../Pages/Settings/Settings";
import Members from "../Pages/Members/Member";
import AddLoanForm from "../Pages/Loan/AddLoanForm";
import Statements from "../Pages/Statements/Statements";
import ExpensesList from "../Pages/Expenses/Expenses";
import ProfileDetails from "../Component/ProfileDetails";
import PropTypes from 'prop-types';
import { useDispatch, connect } from 'react-redux';
import ReportsTab from "../Pages/Reports/Reports";
import { NavLink, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import MemberDetails from '../Pages/Members/MemberDetails'
const Sidebar = ({ state }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch({ type: 'PROFILEDETAILS' });
  }, []);

  useEffect(() => {
    if (state.isLoggedIn) {
      navigate("/dashboard");
    }
  }, [state.isLoggedIn]);

  useEffect(() => {
    if (state.profileDetailsUpdateStatusCode === 200) {
      dispatch({ type: 'PROFILEDETAILS' });
      dispatch({ type: 'CLEAR_PROFILE_DETAILS_UPDATE_ERROR' });
    }
  }, [state.profileDetailsUpdateStatusCode]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleMenuClick = (path) => {
    navigate(path);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: Dashboard, activeIcon: DashboardActive },
    { name: "Members", path: "/members", icon: Member, activeIcon: MemberActive },
    { name: "Loan", path: "/loan", icon: Loan, activeIcon: LoanActive },
    { name: "Expenses", path: "/expenses", icon: Expenses, activeIcon: ExpensesActive },
    { name: "Statements", path: "/statements", icon: Statement, activeIcon: StatementActive },
    { name: "Reports", path: "/reports", icon: Reports, activeIcon: ReportsActive },
    { name: "Settings", path: "/settings", icon: settings, activeIcon: settingsActive },

  ];

  return (
    <div className="flex h-screen overflow-hidden" data-testid='container-main'>
      <button
        data-testid='button-toggle'
        className="md:hidden fixed right-4 top-4 z-50 bg-gray-800 text-white p-2 rounded"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FaTimes size={14} /> : <FaBars size={14} />}
      </button>



      <div
        className={`bg-white text-[#939393] flex flex-col border-r border-gray-300 fixed md:relative h-full z-40 transition-transform duration-300 ease-in-out w-64 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-4 flex items-center gap-2 mt-3 mb-3 ml-2 md:justify-center lg:justify-start">
          <img src={UnityConnectImg} alt="Unity Connect" className="w-5 h-5" />
          <span className="font-Gilroy text-base md:text-sm lg:text-base whitespace-nowrap">Unity Connect</span>
        </div>


        <ul className="flex-1 overflow-y-auto">
          {menuItems.map((menu, i) => (
            <li data-testid={`menu-item-${i}`}
              key={i}>
              <NavLink
                to={menu.path}
                className={({ isActive }) =>
                  `flex justify-between items-center px-4 py-2 ml-2 font-Gilroy cursor-pointer ${isActive ? "text-[#7F00FF]" : "text-gray-500"
                  }`
                }
                onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <img src={location.pathname === menu.path ? menu.activeIcon : menu.icon} alt={menu.name} className="w-4 h-4 rounded-full" />
                  <span className="inline-block">{menu.name}</span>
                </div>
                {location.pathname === menu.path && !menu.isProfile && (
                  <img src={Star} alt="Active" className="w-4 h-4 hidden md:block" />
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="p-2 flex items-center w-full">
          <img
            src={state.profileDetailsList.Profile || Star}
            alt="Profile"
            className="w-12 h-12 rounded-full cursor-pointer ml-2"
            onClick={() => handleMenuClick("Profile")}
          />
          <div className="ml-3 cursor-pointer" onClick={() => handleMenuClick("Profile")}>
            <p className="text-black truncate whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] font-Gilroy text-sm font-medium">
              {state.profileDetailsList.First_Name}
              {state.profileDetailsList.Last_Name ? " " + state.profileDetailsList.Last_Name : ""}
            </p>
            <p className="text-neutral-400 runcate whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] font-normal text-xs leading-tight font-Gilroy">
              {state.profileDetailsList.Email_Id}
            </p>
          </div>
        </div>
      </div>


      <div className="flex-1 overflow-y-auto px-2 bg-white mt-2">
        <Routes>
          <Route path="/dashboard" element={<h1 data-testid='div-dashboard' className="text-center text-xl font-Gilroy font-semibold">Dashboard</h1>} />
          <Route path="/members" element={<Members />} />
          <Route path="/loan" element={<AddLoanForm />} />
          <Route path="/expenses" element={<ExpensesList />} />
          <Route path="/statements" element={<Statements />} />
          <Route path="/reports" element={<ReportsTab />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<ProfileDetails />} />
          <Route path="/member-details/:id" element={<MemberDetails />} />
        </Routes>
      </div>

    </div>
  );
};

const mapsToProps = (stateInfo) => {
  return {
    state: stateInfo.SignIn
  };
};

Sidebar.propTypes = {
  state: PropTypes.object
};

export default connect(mapsToProps)(Sidebar);


