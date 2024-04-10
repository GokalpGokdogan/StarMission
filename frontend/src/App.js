import Login from './screens/Login';
import SignUp from "./screens/SignUp";
import PastMissions from "./components/PastMissions";
import MissionApplicant from "./components/MissionApplicant";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from './components/SideBar';
import { useState } from 'react';
import DashboardCompany from './screens/company/DashboardCompany';
import ApplicationsAstronaut from './screens/astronaut/ApplicationsAstronaut';
import MissionPostings from './screens/MissionPostings';
import CreateMission from './screens/CreateMission';
import ApplicationsCompany from './screens/company/ApplicationsCompany';
import SingleEmployee from "./components/SingleEmployee";
import ManageEmployees from "./screens/ManageEmployees";

function App() {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [open, setOpen] = useState(false);
    const [href, setHref] = useState("Login");
    const [active, setActive] = useState("Login");
    const [role, setRole] = useState("astronaut");

    const Auth = ({ allowedRoles }) => {

        return allowedRoles.includes(role) ? (
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
                    }
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
                    }
                ];
            default:
                return [];
        }
    };

    const menu = getMenuForRole(role);


    return (
            <div className="transition-all duration-300 h-screen bg-home-bg">
                <Router>
                    <div className={`fixed inset-y-0 left-0 ${open ? 'w-56' : 'w-0'} transition-all duration-300 z-50 bg-darker-bg`}>
                        <Sidebar open={open} setOpen={setOpen} setHref={setHref} active={active} setActive={setActive} menu={menu} />
                    </div>
                    <div className={`flex flex-col w-full h-full transition-all duration-300 ${open ? 'pl-56' : "pl-0"} `}>
                        <div className='flex-1'>
                            <Routes>
                                <Route path="/" element={<Login />} />
                                <Route path="/sign-up" element={<SignUp />} />
                                <Route path="/past-missions" element={<PastMissions />} />
                                <Route path="/mission-applicant" element={<MissionApplicant />} />
                                <Route path="/create-mission" element={<CreateMission />} />
                                <Route element={<Auth allowedRoles={["company"]} />}>
                                    <Route path="/company-dashboard" element={<DashboardCompany />} />
                                    <Route path="/company-applications" element={<ApplicationsCompany />} />
                                </Route>
                                <Route element={<Auth allowedRoles={["astronaut"]} />}>
                                    <Route path="/dashboard" element={<DashboardCompany />} />
                                    <Route path="/my-applications" element={<ApplicationsAstronaut />} />
                                </Route>
                                <Route path="/mission-postings" element={<MissionPostings />} />
                                <Route path="/manage-employees" element={<ManageEmployees />} />
                            </Routes>
                        </div>
                    </div>
                </Router>
            </div>
    );
}

export default App;
