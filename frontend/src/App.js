import Login from './screens/Login';
import SignUp from "./screens/SignUp";
import SimpleList from "./components/SimpleList";
import MissionApplicant from "./components/MissionApplicant";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from './components/SideBar';
import { useState } from 'react';
import DashboardCompany from './screens/company/DashboardCompany';
import ApplicationsAstronaut from './screens/astronaut/ApplicationsAstronaut';
import MissionPostingsAstronaut from './screens/astronaut/MissionPostingsAstronaut';
import MissionPostingsCompany from './screens/company/MissionPostingsCompany';
import CreateMission from './screens/CreateMission';
import ApplicationsCompany from './screens/company/ApplicationsCompany';
import LeadingMissions from './screens/company/LeadingMissions';
import PartneredMissions from './screens/company/PartneredMissions';
import MissionDetailsCompany from './screens/company/MissionDetailsCompany';
import EmployeeDetailsCompany from './screens/company/EmployeeDetailsCompany';
import ManageEmployees from "./screens/company/ManageEmployees";
import DashboardAstronaut from './screens/astronaut/DashboardAstronaut';
import {useUser } from './UserProvider';
import MissionApplicantCompany from "./screens/company/MissionApplicantCompany";

function App() {
    return (
        <AppContent />
    );
}

export default App;


function AppContent() {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [open, setOpen] = useState(false);
    const [href, setHref] = useState("Login");
    const [active, setActive] = useState("Login");
    const { userType } = useUser();

    const Auth = ({ allowedRoles }) => {

        return allowedRoles.includes(userType) ? (
            <Outlet />
        ) : (
            <Navigate to="/" replace />
        );
    };

    const getMenuForRole = (role) => {
        switch (role) {
            case 'company':
                return [
                    {
                        title: 'Dashboard',
                        link: 'company-dashboard'
                    },
                    {
                        title: 'Applications',
                        link: 'company-applications'
                    },                    
                    {
                        title: 'My Bids',
                        link: 'company-dashboard'
                    },
                    {
                        title: 'Manage Employees',
                        link: 'manage-employees'
                    },
                    {
                        title: 'Leading Missions',
                        link: 'leading-missions'
                    },
                    {
                        title: 'Partnered Missions',
                        link: 'partnered-missions'
                    },
                    {
                        title: 'Past Missions',
                        link: 'past-missions'
                    },
                    {
                        title: 'Mission Posts',
                        link: 'company-mission-postings'
                    },
                ];
            case 'astronaut':
                return [
                    {
                        title: 'Dashboard',
                        link: 'dashboard'
                    },
                    {
                        title: 'Applications',
                        link: 'my-applications'
                    },
                    {
                        title: 'Mission Postings',
                        link: 'mission-postings'
                    }
                ];
            default:
                return [];
        }
    };

    const menu = getMenuForRole(userType);


    return (
        <div className="transition-all duration-300 h-screen bg-home-bg">
            <Router>
                <div className={`fixed inset-y-0 left-0 ${open ? 'w-56' : 'w-0'} transition-all duration-300 z-8 bg-darker-bg`}>
                    <Sidebar open={open} setOpen={setOpen} setHref={setHref} active={active} setActive={setActive} menu={menu} />
                </div>
                <div className={`flex flex-col w-full h-full transition-all duration-300 ${open ? 'pl-56' : "pl-0"} `}>
                    <div className='flex-1'>
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/sign-up" element={<SignUp />} />
                            <Route path="/past-missions" element={<SimpleList />} />
                            <Route path="/mission-applicant" element={<MissionApplicant />} />
                            <Route path="/create-mission" element={<CreateMission />} />
                            <Route element={<Auth allowedRoles={["company"]} />}>
                                <Route path="/company-dashboard" element={<DashboardCompany />} />
                                <Route path="/company-applications" element={<ApplicationsCompany />} />
                                <Route path="/company-mission-postings" element={<MissionPostingsCompany />} />
                                <Route path="/leading-missions" element={<LeadingMissions />} />
                                <Route path="/partnered-missions" element={<PartneredMissions />} />
                                <Route path="/mission-details/:missionId" element={<MissionDetailsCompany />} />
                                <Route path="/application-details/:astronautId/:missionId/:appliedDate" element={<MissionApplicantCompany />} />
                                <Route path="/employee-details/:employeeId" element={<EmployeeDetailsCompany />} />
                                <Route path="/manage-employees" element={<ManageEmployees />} />
                            </Route>
                            <Route element={<Auth allowedRoles={["astronaut"]} />}>
                                <Route path="/dashboard" element={<DashboardAstronaut />} />
                                <Route path="/my-applications" element={<ApplicationsAstronaut />} />
                                <Route path="/mission-postings" element={<MissionPostingsAstronaut />} />
                            </Route>
                        </Routes>
                    </div>
                </div>
            </Router>
        </div>

    );
}
