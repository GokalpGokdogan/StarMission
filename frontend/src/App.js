import Login from './screens/Login';
import SignUp from "./screens/SignUp";
import SimpleList from "./components/SimpleList";
import MissionApplicant from "./components/MissionApplicant";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from './components/SideBar';
import { useState, memo } from 'react';
import DashboardCompany from './screens/company/DashboardCompany';
import ApplicationsAstronaut from './screens/astronaut/ApplicationsAstronaut';
import MissionPostingsAstronaut from './screens/astronaut/MissionPostingsAstronaut';
import MissionPostingsCompany from './screens/company/MissionPostingsCompany';
import CreateMission from './screens/company/CreateMission';
import ApplicationsCompany from './screens/company/ApplicationsCompany';
import LeadingMissions from './screens/company/LeadingMissions';
import PartneredMissions from './screens/company/PartneredMissions';
import PastMissions from './screens/company/PastMissions';
import MissionDetailsCompany from './screens/company/MissionDetailsCompany';
import EmployeeDetailsCompany from './screens/company/EmployeeDetailsCompany';
import ManageEmployees from "./screens/company/ManageEmployees";
import LeadingMissionDetails from './screens/company/LeadingMissionDetails';
import DashboardAstronaut from './screens/astronaut/DashboardAstronaut';
import PastMissionsAstronaut from './screens/astronaut/PastMissionsAstronaut';
import { UserProvider, useUser } from './UserProvider';
import UserContext from './UserProvider';
import { parseUserString } from './UserProvider';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import MissionApplicantCompany from "./screens/company/MissionApplicantCompany";
import MyBidsCompany from './screens/company/MyBidsCompany';
import EditProfileCompany from './screens/company/EditProfileCompany';
import BidDetailsCompany from './screens/company/BidDetailsCompany';
import ProfileCompany from './screens/company/ProfileCompany';
import MissionDetailsAstronaut from './screens/astronaut/MissionDetailsAstronaut';
import DashboardAdmin from './screens/admin/DashboardAdmin';
import CreateReport from './screens/admin/CreateReport';
import Reports from './screens/admin/Reports';
import { ReportDetails } from './screens/admin/ReportDetails';
import AnotherCompanyProfile from './screens/company/AnotherCompanyProfile';

function App() {
    return (
        <AppContent />
    );
}

export default App;

function LayoutWithSidebar() {
    const location = useLocation();
    const { userType, userId } = useUser();
    const showSidebar = userId && !['/', '/sign-up'].includes(location.pathname);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [open, setOpen] = useState(false);
    const [href, setHref] = useState("Login");
    const [active, setActive] = useState("Login");

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
                        link: 'my-bids'
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
                        title: 'My Applications',
                        link: 'my-applications'
                    },
                    {
                        title: 'Past Missions',
                        link: 'astronaut-past-missions'
                    },
                    {
                        title: 'Mission Postings',
                        link: 'mission-postings'
                    }
                ];
            case 'admin':
                return [
                    {
                        title: 'Admin Panel',
                        link: 'admin'
                    },
                    {
                        title: 'Create Report',
                        link: 'create-report'
                    },
                    {
                        title: 'Reports',
                        link: 'reports'
                    }
                ];
            default:
                return [];
        }
    };

    const menu = getMenuForRole(userType);

    return (
        <>
            {showSidebar && (
                <div className="fixed inset-y-0 left-0 z-8 bg-darker-bg" style={{ width: '14rem' }}>
                    <Sidebar open={true} setOpen={setOpen} setHref={setHref} active={active} setActive={setActive} menu={menu} />
                </div>
            )}
            <div className={`flex flex-col w-full h-full transition-all duration-300 ${showSidebar ? 'pl-56' : ''}`}>
                <Outlet />  {/* This will render the child routes */}
            </div>
        </>
    );
}


function AppContent() {

    const Auth = ({ allowedRoles }) => {
        const { userType } = useUser();
        const userId = Cookies.get('user_id'); // Directly check the cookie for user ID

        console.log(userType)


        if (!userId || !allowedRoles.includes(userType)) {
            return <Navigate to="/" replace />;
        }

        return <Outlet />;
    };

    return (
        <div className="transition-all duration-300 h-screen bg-home-bg">
            <Router>
            <div className='flex-1'>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route element={<LayoutWithSidebar />}>
                        <Route path="/mission-applicant" element={<MissionApplicant />} />
                        <Route element={<Auth allowedRoles={["company"]} />}>
                            <Route path="/company-dashboard" element={<DashboardCompany />} />
                            <Route path="/company-applications" element={<ApplicationsCompany />} />
                            <Route path="/company-mission-postings" element={<MissionPostingsCompany />} />
                            <Route path="/leading-missions" element={<LeadingMissions />} />
                            <Route path="/partnered-missions" element={<PartneredMissions />} />
                            <Route path="/mission-details/:missionId/:type" element={<MissionDetailsCompany />} />
                            <Route path="/application-details/:astronautId/:missionId/:appliedDate" element={<MissionApplicantCompany />} />
                            <Route path="/employee-details/:employeeId" element={<EmployeeDetailsCompany />} />
                            <Route path="/manage-employees" element={<ManageEmployees />} />
                            <Route path="/my-bids" element={<MyBidsCompany />} />
                            <Route path="/create-mission" element={<CreateMission />} />
                            <Route path="/leading-mission-details/:missionId" element={<LeadingMissionDetails />} />
                            <Route path="/bid-details/:bidId" element={<BidDetailsCompany />} />
                            <Route path="/edit-company-profile" element={<EditProfileCompany/>} />
                            <Route path="/profile-company" element={<ProfileCompany />} />
                            <Route path="/past-missions" element={<PastMissions />} />
                            <Route path="/company-info/:companyId" element={<AnotherCompanyProfile />} />
                        </Route>
                        <Route element={<Auth allowedRoles={["astronaut"]} />}>
                            <Route path="/dashboard" element={<DashboardAstronaut />} />
                            <Route path="/my-applications" element={<ApplicationsAstronaut />} />
                            <Route path="/mission-postings" element={<MissionPostingsAstronaut />} />
                            <Route path="/apply/:missionId" element={<MissionDetailsAstronaut />} />
                            <Route path="/astronaut-past-missions" element={<PastMissionsAstronaut />} />
                            <Route path="/astronaut-mission-details/:missionId" element={<MissionDetailsAstronaut />} />
                            <Route path="/astronaut-past-mission-details/:missionId" element={<MissionDetailsAstronaut />} />
                        </Route>
                        <Route element={<Auth allowedRoles={["admin"]} />}>
                            <Route path='/admin' element={<DashboardAdmin />} />
                            <Route path='/create-report' element={<CreateReport />} />
                            <Route path='/reports' element={<Reports />} />
                            <Route path='/report-details/:reportId' element={<ReportDetails />} />
                        </Route>
                    </Route>
                </Routes>
                </div>
            </Router>
        </div>

    );
}
